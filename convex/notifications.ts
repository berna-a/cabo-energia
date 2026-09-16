import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

export const send = internalAction({
  args: { id: v.id("leads"), attempt: v.optional(v.number()) },
  handler: async (ctx, { id, attempt = 1 }) => {
    const lead = await ctx.runQuery(internal.leads.getInternal, { id });
    if (!lead || lead.notification_status === "accepted") return;
    try {
      const response = await fetch(`${process.env.NOTIFICATION_BASE_URL}/api/lead-notification`, {
        method: "POST", signal: AbortSignal.timeout(15000),
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.LEAD_INGEST_KEY}` },
        body: JSON.stringify({ action: "send", lead }),
      });
      const result = await response.json();
      if (!response.ok || !result.id) throw new Error(`Notification failed (${response.status})`);
      await ctx.runMutation(internal.leads.recordNotification, { id, status: "accepted", attempt, providerId: result.id });
      await ctx.scheduler.runAfter(30_000, internal.notifications.checkDelivery, { id });
    } catch (error) {
      await ctx.runMutation(internal.leads.recordNotification, {
        id, status: attempt < 4 ? "retrying" : "failed", attempt,
        error: error instanceof Error ? error.message : "Notification failed",
      });
      if (attempt < 4) await ctx.scheduler.runAfter([60_000, 300_000, 900_000][attempt-1], internal.notifications.send, { id, attempt: attempt + 1 });
    }
  },
});

export const checkDelivery = internalAction({
  args: { id: v.id("leads") },
  handler: async (ctx, { id }) => {
    const lead = await ctx.runQuery(internal.leads.getInternal, { id });
    if (!lead?.notification_id) return;
    const response = await fetch(`${process.env.NOTIFICATION_BASE_URL}/api/lead-notification`, {
      method: "POST", signal: AbortSignal.timeout(15000),
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.LEAD_INGEST_KEY}` },
      body: JSON.stringify({ action: "status", email_id: lead.notification_id }),
    });
    const result = await response.json();
    await ctx.runMutation(internal.leads.recordNotification, { id, status: lead.notification_status,
      attempt: lead.notification_attempts, delivery: response.ok ? result.last_event || "unknown" : "verification_unavailable" });
  },
});
