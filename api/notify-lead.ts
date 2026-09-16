import { randomUUID } from "node:crypto";
import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { leadSchema } from "../shared/leadValidation.js";

// Compatibility endpoint. Success now means persisted in Cabo Energia's database.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const origin = req.headers?.origin;
  const allowed = ["https://www.caboenergia.cv", "https://caboenergia.cv", process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`];
  if (origin && !allowed.includes(origin)) return res.status(403).json({ ok: false });
  let body;
  try { body = typeof req.body === "string" ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ ok: false, error: "Pedido inválido" }); }
  if (!body || JSON.stringify(body).length > 12_000) return res.status(400).json({ ok: false });
  const fields = body.fields ?? Object.entries(body)
    .filter(([key]) => !["name", "phone", "client_type", "source", "ilha", "request_id"].includes(key))
    .map(([chave, valor]) => ({ chave, valor }));
  const parsed = leadSchema.safeParse({ ...body, fields, request_id: body.request_id || randomUUID() });
  if (!parsed.success) return res.status(400).json({ ok: false, error: "Verifique o nome e o telefone." });
  const url = process.env.CABO_CONVEX_URL;
  const key = process.env.LEAD_INGEST_KEY;
  if (!url || !key) return res.status(503).json({ ok: false, error: "Serviço temporariamente indisponível" });
  try {
    const client = new ConvexHttpClient(url);
    const result = await client.mutation(makeFunctionReference<"mutation">("leads:submit"), { ...parsed.data, ingest_key: key });
    return res.status(200).json({ ok: result.ok === true, stored: result.stored === true, request_id: parsed.data.request_id });
  } catch (error) {
    const limited = String(error).includes("Rate limited");
    console.error("[lead] persistence failed", limited ? "rate limited" : "backend unavailable");
    return res.status(limited ? 429 : 503).json({ ok: false, error: "Não foi possível guardar o pedido. Tente novamente." });
  }
}
