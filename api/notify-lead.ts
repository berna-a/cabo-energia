/**
 * Vercel Serverless Function — envia um email por cada lead nova, via Resend.
 *
 * A RESEND_API_KEY é SECRETA e vive nas Environment Variables da Vercel
 * (nunca no código nem no bundle do site).
 *
 * Variáveis de ambiente usadas (definir na Vercel):
 *   RESEND_API_KEY    (obrigatória) — chave da conta Resend
 *   LEAD_NOTIFY_TO    (opcional)    — destino; default cabo.energia@ardo.partners
 *   LEAD_NOTIFY_FROM  (opcional)    — remetente; default onboarding@resend.dev
 *
 * Se a RESEND_API_KEY não estiver definida, a função não falha — apenas
 * ignora o envio (o site continua a funcionar normalmente).
 */

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO || "cabo.energia@ardo.partners";
  const from = process.env.LEAD_NOTIFY_FROM || "CABO ENERGIA <onboarding@resend.dev>";

  // Sem chave configurada → não bloqueia o site, apenas não envia.
  if (!apiKey) {
    res.status(200).json({ ok: true, emailed: false, reason: "RESEND_API_KEY ausente" });
    return;
  }

  // O body pode chegar como objeto (Vercel parseia JSON) ou string.
  const lead = typeof req.body === "string" ? safeParse(req.body) : req.body || {};

  const nome = esc(lead.name);
  const tel = esc(lead.phone);
  if (!nome || !tel) {
    res.status(400).json({ ok: false, error: "name e phone são obrigatórios" });
    return;
  }

  const linhas: Array<[string, unknown]> = [
    ["Nome", lead.name],
    ["Telefone", lead.phone],
    ["Tipo de cliente", lead.client_type],
    ["Ilha", lead.ilha],
    ["Perfil", lead.perfil],
    ["Pacote recomendado", lead.pacote_recomendado],
    ["Fatura mensal (CVE)", lead.fatura_mensal],
    ["Poupança estimada (CVE)", lead.poupanca_estimada],
    ["Origem", lead.source],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0D2B1F">
      <h2 style="color:#1A5C3A;margin:0 0 12px">Nova lead — CABO ENERGIA</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${linhas
          .filter(([, v]) => v !== undefined && v !== null && v !== "")
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 12px 4px 0;color:#5b6b63"><strong>${esc(k)}</strong></td><td style="padding:4px 0">${esc(v)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="margin:16px 0 0">
        <a href="https://wa.me/${tel.replace(/\D/g, "")}" style="color:#1A5C3A">Responder por WhatsApp</a>
      </p>
    </div>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `Nova lead: ${nome} (${esc(lead.client_type) || "?"})`,
        html,
        reply_to: to,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      res.status(502).json({ ok: false, emailed: false, status: r.status, detail });
      return;
    }
    res.status(200).json({ ok: true, emailed: true });
  } catch (err: any) {
    res.status(500).json({ ok: false, emailed: false, error: String(err?.message || err) });
  }
}

function safeParse(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
