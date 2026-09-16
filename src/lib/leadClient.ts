export interface Lead {
  nome: string;
  telemovel: string;
  tipo: string;
  ilha?: string;
  origem: string;
  camposExtra?: { chave: string; valor: string | number | boolean }[];
}

// Reuse an identifier on an uncertain retry; never persist PII in localStorage.
const pending = new Map<string, string>();

export async function submitLead(lead: Lead): Promise<boolean> {
  const signature = JSON.stringify(lead);
  let requestId = pending.get(signature);
  if (!requestId) {
    requestId = crypto.randomUUID();
    if (pending.size >= 20) pending.delete(pending.keys().next().value!);
    pending.set(signature, requestId);
  }
  try {
    const response = await fetch("/api/notify-lead", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name:lead.nome, phone:lead.telemovel, client_type:lead.tipo,
        source:lead.origem, ilha:lead.ilha, fields:lead.camposExtra ?? [], request_id:requestId }),
    });
    const result = await response.json();
    const stored = response.ok && result.ok === true && result.stored === true;
    if (stored) pending.delete(signature);
    return stored;
  } catch { return false; }
}
