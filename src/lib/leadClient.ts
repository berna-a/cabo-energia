import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";

/**
 * Envio de leads para o AOS (o sistema da ARDO), que cria automaticamente
 * empresa + contacto + oportunidade no pipeline e avisa por email.
 *
 * Substitui o Supabase, que foi desligado. Mesmo padrão dos outros sites da
 * ARDO (moniz-lda, ardo-website).
 *
 * Rede de segurança: se o AOS falhar por qualquer motivo, o site cai para o
 * `/api/notify-lead` (email via Resend). Uma lead nunca deve depender de um
 * único caminho — ver `submitLead()` abaixo.
 */

// URL pública do backend AOS. Não é segredo: o browser chama-a directamente.
const AOS_CONVEX_URL =
  import.meta.env.VITE_AOS_CONVEX_URL ??
  "https://valuable-dove-859.convex.cloud";

const ORG_SLUG = "cabo-energia";

const client = new ConvexHttpClient(AOS_CONVEX_URL);

// Referência à mutation pública, sem precisar do codegen do repo AOS aqui.
const submitLeadMutation = makeFunctionReference<"mutation">("leads:submit");

export interface Lead {
  nome: string;
  telemovel: string;
  /** "residencial" | "empresarial" — segmento do pedido. */
  tipo: string;
  ilha?: string;
  /** De onde no site veio, para o comercial saber o contexto. */
  origem: string;
  /**
   * Dados do simulador de poupança, quando existem: factura mensal, perfil,
   * pacote sugerido, poupança estimada. Ficam em campos próprios no AOS.
   */
  camposExtra?: Record<string, string | number | boolean>;
}

/**
 * Envia a lead. Devolve `true` se pelo menos um dos caminhos a registou.
 *
 * Nunca lança: quem chama decide o que mostrar ao visitante conforme o
 * resultado. Perder uma lead em silêncio é o pior desfecho possível, por isso
 * tentam-se os dois caminhos mesmo que o primeiro já tenha resultado.
 */
export async function submitLead(lead: Lead): Promise<boolean> {
  const camposExtra = {
    ...(lead.ilha ? { Ilha: lead.ilha } : {}),
    ...(lead.camposExtra ?? {}),
  };

  let aosOk = false;
  try {
    await client.mutation(submitLeadMutation, {
      nome: lead.nome,
      telefone: lead.telemovel,
      servico: lead.tipo === "empresarial" ? "empresarial" : "residencial",
      origem: lead.origem,
      org_slug: ORG_SLUG,
      ...(Object.keys(camposExtra).length ? { campos_extra: camposExtra } : {}),
    });
    aosOk = true;
  } catch (err) {
    // Falha silenciosa para o visitante — o email abaixo é a rede de segurança.
    console.error("[lead] AOS falhou:", err);
  }

  let emailOk = false;
  try {
    const res = await fetch("/api/notify-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: lead.nome,
        phone: lead.telemovel,
        client_type: lead.tipo,
        source: lead.origem,
        ilha: lead.ilha,
        ...camposExtra,
      }),
    });
    const data = await res.json().catch(() => ({}));
    emailOk = res.ok && data.emailed === true;
  } catch (err) {
    console.error("[lead] email falhou:", err);
  }

  return aosOk || emailOk;
}
