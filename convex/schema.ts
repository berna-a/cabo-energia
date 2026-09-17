import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const leadFields = {
  name: v.string(), phone: v.string(), client_type: v.string(),
  source: v.string(), ilha: v.optional(v.string()), request_id: v.string(),
  fields: v.array(v.object({ chave: v.string(), valor: v.union(v.string(), v.number(), v.boolean()) })),
};

export default defineSchema({
  leads: defineTable({
    ...leadFields,
    status: v.string(), phone_key: v.string(), created_at: v.number(),
    notification_status: v.string(), notification_attempts: v.number(),
    notification_id: v.optional(v.string()), notification_error: v.optional(v.string()),
    notified_at: v.optional(v.number()), delivery_status: v.optional(v.string()),
    aos_sync_status: v.optional(v.string()), aos_sync_attempts: v.optional(v.number()),
    aos_sync_error: v.optional(v.string()), aos_synced_at: v.optional(v.number()),
    legacy_id: v.optional(v.string()), is_test: v.optional(v.boolean()),
  }).index("by_request", ["request_id"]).index("by_phone_time", ["phone_key", "created_at"])
    .index("by_created", ["created_at"]).index("by_legacy", ["legacy_id"]),
  // Original identifiers and payloads are preserved for the future AOS import.
  // This table is never exposed by a public query.
  legacy_records: defineTable({
    source_deployment: v.string(), source_table: v.string(), source_id: v.string(),
    source_org: v.string(), payload_json: v.string(), sha256: v.string(), imported_at: v.number(),
  }).index("by_source", ["source_deployment", "source_table", "source_id"]),
});
