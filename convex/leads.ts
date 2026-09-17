import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { leadFields } from "./schema";
import { leadSchema } from "../shared/leadValidation";

export const submit = mutation({
  args: { ...leadFields, ingest_key: v.string() },
  handler: async (ctx, args) => {
    if (!process.env.LEAD_INGEST_KEY || args.ingest_key !== process.env.LEAD_INGEST_KEY) {
      throw new ConvexError("Unauthorized");
    }
    const parsed = leadSchema.safeParse(args);
    if (!parsed.success) throw new ConvexError("Invalid lead");
    const lead = parsed.data;
    const previous = await ctx.db.query("leads").withIndex("by_request", q => q.eq("request_id", lead.request_id)).unique();
    if (previous) return { ok: true, stored: true, id: previous._id };
    const now = Date.now();
    const phone_key = lead.phone.replace(/\D/g, "");
    const samePhone = await ctx.db.query("leads").withIndex("by_phone_time", q => q.eq("phone_key", phone_key).gte("created_at", now - 3_600_000)).take(5);
    const recent = await ctx.db.query("leads").withIndex("by_created", q => q.gte("created_at", now - 3_600_000)).take(60);
    if (samePhone.length >= 5 || recent.length >= 60) throw new ConvexError("Rate limited");
    const id = await ctx.db.insert("leads", {
      ...lead, fields: lead.fields.map(field => ({ chave: field.chave, valor: field.valor! })),
      phone_key, created_at: now, status: "new_lead",
      notification_status: "pending", notification_attempts: 0,
      is_test: lead.name.startsWith("TESTE TÉCNICO ARDO"),
      aos_sync_status: lead.name.startsWith("TESTE TÉCNICO ARDO") ? "skipped_test" : "pending",
      aos_sync_attempts: 0,
    });
    await ctx.scheduler.runAfter(0, internal.notifications.send, { id });
    if (!lead.name.startsWith("TESTE TÉCNICO ARDO")) {
      await ctx.scheduler.runAfter(0, internal.aosSync.send, { id });
    }
    return { ok: true, stored: true, id };
  },
});

export const getInternal = internalQuery({
  args: { id: v.id("leads") }, handler: (ctx, args) => ctx.db.get(args.id),
});

export const recordNotification = internalMutation({
  args: {
    id: v.id("leads"), status: v.string(), attempt: v.number(),
    providerId: v.optional(v.string()), error: v.optional(v.string()),
    delivery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      notification_status: args.status, notification_attempts: args.attempt,
      ...(args.providerId ? { notification_id: args.providerId, notified_at: Date.now() } : {}),
      ...(args.error ? { notification_error: args.error.slice(0,300) } : {}),
      ...(args.delivery ? { delivery_status: args.delivery } : {}),
    });
  },
});

export const recordAosSync = internalMutation({
  args: {
    id: v.id("leads"), status: v.string(), attempt: v.number(),
    error: v.optional(v.string()), syncedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      aos_sync_status: args.status,
      aos_sync_attempts: args.attempt,
      ...(args.error ? { aos_sync_error: args.error.slice(0, 300) } : { aos_sync_error: undefined }),
      ...(args.syncedAt ? { aos_synced_at: args.syncedAt } : {}),
    });
  },
});

export const verify = internalQuery({
  args: { request_id: v.string() },
  handler: async (ctx, { request_id }) => {
    const lead = await ctx.db.query("leads").withIndex("by_request", q => q.eq("request_id", request_id)).unique();
    return lead ? { id: lead._id, request_id, source: lead.source, fields: lead.fields,
      notification_status: lead.notification_status, notification_id: lead.notification_id,
      notification_attempts: lead.notification_attempts, delivery_status: lead.delivery_status,
      is_test: lead.is_test, notification_error: lead.notification_error,
      aos_sync_status: lead.aos_sync_status, aos_sync_attempts: lead.aos_sync_attempts,
      aos_sync_error: lead.aos_sync_error, aos_synced_at: lead.aos_synced_at } : null;
  },
});
