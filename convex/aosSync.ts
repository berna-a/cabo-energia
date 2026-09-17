import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";

const RETRY_DELAYS = [60_000, 300_000, 900_000];

/**
 * Mirrors a successfully persisted Cabo Energia lead into the AOS CRM.
 * The dedicated Cabo database remains the source of truth; this worker is a
 * retried operational projection so sales can work the lead in the AOS.
 */
export const send = internalAction({
  args: { id: v.id("leads"), attempt: v.optional(v.number()) },
  handler: async (ctx, { id, attempt = 1 }) => {
    const lead = await ctx.runQuery(internal.leads.getInternal, { id });
    if (!lead || lead.is_test || lead.aos_sync_status === "synced") return;

    try {
      const url = process.env.AOS_CONVEX_URL;
      if (!url) throw new Error("AOS_CONVEX_URL not configured");

      const client = new ConvexHttpClient(url);
      const camposExtra = [
        ...(lead.ilha ? [{ chave: "Ilha", valor: lead.ilha }] : []),
        ...lead.fields,
        { chave: "Pedido de origem", valor: lead.request_id },
      ];
      const result = await client.mutation(
        makeFunctionReference<"mutation">("leads:submit"),
        {
          nome: lead.name,
          telefone: lead.phone,
          servico: lead.client_type,
          origem: lead.source,
          campos_extra: camposExtra,
          org_slug: "cabo-energia",
        }
      );
      if (!result || (result as { ok?: boolean }).ok !== true) {
        throw new Error("AOS lead mutation did not acknowledge success");
      }
      await ctx.runMutation(internal.leads.recordAosSync, {
        id, status: "synced", attempt, syncedAt: Date.now(),
      });
    } catch (error) {
      const retry = attempt < 4;
      await ctx.runMutation(internal.leads.recordAosSync, {
        id,
        status: retry ? "retrying" : "failed",
        attempt,
        error: error instanceof Error ? error.message : "AOS sync failed",
      });
      if (retry) {
        await ctx.scheduler.runAfter(RETRY_DELAYS[attempt - 1], internal.aosSync.send, {
          id, attempt: attempt + 1,
        });
      }
    }
  },
});
