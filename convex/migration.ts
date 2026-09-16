import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import { leadFields } from "./schema";

export const preserve = internalMutation({
  args: { records: v.array(v.object({ source_deployment: v.string(), source_table: v.string(),
    source_id: v.string(), source_org: v.string(), payload_json: v.string(), sha256: v.string() })) },
  handler: async (ctx, { records }) => {
    let inserted = 0;
    for (const record of records) {
      if (!["p5741gcdekca0dp5seznxpdmdh8bcpzy", "p57ee683t14ta10pqdaed0jw45895c69"].includes(record.source_org)) throw new Error("Unexpected source organization");
      const existing = await ctx.db.query("legacy_records").withIndex("by_source", q =>
        q.eq("source_deployment", record.source_deployment).eq("source_table", record.source_table).eq("source_id", record.source_id)).unique();
      if (existing) { if (existing.sha256 !== record.sha256) throw new Error("Source changed; review required"); continue; }
      await ctx.db.insert("legacy_records", { ...record, imported_at: Date.now() }); inserted++;
    }
    return { inserted };
  },
});

export const manifest = internalQuery({
  args: {}, handler: async ctx => (await ctx.db.query("legacy_records").collect()).map(r => ({
    source_table:r.source_table, source_id:r.source_id, sha256:r.sha256,
  })),
});

export const importLead = internalMutation({
  args: { ...leadFields, legacy_id: v.string(), created_at: v.number(), is_test: v.boolean(), status: v.string() },
  handler: async (ctx, args) => {
    const old = await ctx.db.query("leads").withIndex("by_legacy", q => q.eq("legacy_id", args.legacy_id)).unique();
    if (old) return { id:old._id, inserted:false };
    const id = await ctx.db.insert("leads", { ...args, phone_key:args.phone.replace(/\D/g,""), notification_status:"legacy_not_resent", notification_attempts:0 });
    return { id, inserted:true };
  },
});
