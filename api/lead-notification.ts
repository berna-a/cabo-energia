import { timingSafeEqual } from "node:crypto";

const esc = (value: unknown) => String(value ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");

// Only the dedicated Convex scheduler may send or inspect notifications.
// Existing Resend credentials remain in the Vercel production secret store.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const actual = Buffer.from(req.headers?.authorization || "");
  const expected = Buffer.from(`Bearer ${process.env.LEAD_INGEST_KEY || ""}`);
  if (!process.env.LEAD_INGEST_KEY || actual.length !== expected.length || !timingSafeEqual(actual, expected)) return res.status(401).json({ ok: false });
  const key = process.env.RESEND_API_KEY;
  if (!key || key === "[SENSITIVE]") return res.status(503).json({ ok: false, error: "Email unavailable" });
  let body;
  try { body = typeof req.body === "string" ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ ok: false }); }
  if (body?.action === "status") {
    if (!/^[a-f0-9-]{36}$/.test(body.email_id || "")) return res.status(400).json({ ok: false });
    const response = await fetch(`https://api.resend.com/emails/${body.email_id}`, { headers: { Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(10000) });
    const data = await response.json();
    return res.status(response.status).json(response.ok ? { last_event: data.last_event } : { ok: false, error: "Delivery verification unavailable" });
  }
  const lead = body?.lead;
  if (body?.action !== "send" || !lead?.request_id || !lead?.name || !lead?.phone) return res.status(400).json({ ok: false });
  const rows: [string, unknown][] = [["Nome",lead.name],["Telefone",lead.phone],["Tipo",lead.client_type],["Ilha",lead.ilha],["Origem",lead.source],
    ...(lead.fields || []).map((f: {chave:string;valor:unknown}) => [f.chave, f.valor]), ["Referência",lead.request_id]];
  const to = process.env.LEAD_NOTIFY_TO || "cabo.energia@ardo.partners";
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", signal: AbortSignal.timeout(10000),
      headers: { Authorization: `Bearer ${key}`, "Content-Type":"application/json", "Idempotency-Key": `cabo-lead-${lead.request_id}` },
      body: JSON.stringify({ from:process.env.LEAD_NOTIFY_FROM || "CABO ENERGIA <onboarding@resend.dev>",to,
        subject:`${lead.is_test ? "[TESTE — NÃO CONTACTAR] " : ""}Nova lead: ${lead.name} (${lead.client_type})`,
        html:`<div style="font-family:Arial,sans-serif;color:#0D2B1F"><h2>Nova lead — CABO ENERGIA</h2><table>${rows.filter(([,v])=>v!==undefined&&v!=="").map(([k,v])=>`<tr><td><strong>${esc(k)}</strong></td><td>${esc(v)}</td></tr>`).join("")}</table><p><a href="https://wa.me/${String(lead.phone).replace(/\D/g,"")}">Responder por WhatsApp</a></p></div>` }),
    });
    const data = await response.json();
    return res.status(response.ok ? 200 : 502).json(response.ok ? { id:data.id } : { ok:false,error:"Email provider rejected request" });
  } catch { return res.status(502).json({ ok:false,error:"Email provider unavailable" }); }
}
