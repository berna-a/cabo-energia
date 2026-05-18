
const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const DARK = "#0D2B1F";
const MUTED = "#6b7280";
const YELLOW = "#F5C842";

type Plan = {
  badge: string;
  badgeHighlight?: boolean;
  price: string;
  name: string;
  features: string[];
  primaryCta?: boolean;
};

const plans: Plan[] = [
  {
    badge: "Vigilância",
    price: "2.500 CVE",
    name: "Plano Seguro",
    features: [
      "Monitorização remota do sistema 24/7",
      "Relatório mensal de performance",
      "Alertas automáticos de falha",
      "Resposta técnica em 48h",
    ],
  },
  {
    badge: "Recomendado",
    badgeHighlight: true,
    price: "4.500 CVE",
    name: "Plano Tranquilo",
    features: [
      "Tudo o que está incluído no Seguro",
      "2× Limpezas profissionais de painéis por ano",
      "1× Visita técnica de auditoria anual",
      "Resposta técnica prioritária em 24h",
    ],
    primaryCta: true,
  },
  {
    badge: "Imunidade Total",
    price: "8.000 CVE",
    name: "Plano Pleno",
    features: [
      "Tudo o que está incluído no Tranquilo",
      "4× Limpezas profissionais de painéis por ano",
      "Atualizações prioritárias de software",
      "Resposta em 4h com substituição imediata em avaria",
    ],
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className="flex h-full flex-col rounded-2xl p-7"
      style={{
        background: "#f8fafc",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <span
        className="inline-block self-start rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
        style={
          plan.badgeHighlight
            ? { background: YELLOW, color: DARK }
            : { background: "rgba(13,43,31,0.06)", color: DARK }
        }
      >
        {plan.badge}
      </span>

      <h3
        className="mt-6"
        style={{
          color: DARK,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: "clamp(26px, 2.8vw, 34px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        {plan.name}
      </h3>

      <div
        className="mt-5"
        style={{
          color: DARK,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: "clamp(22px, 2.2vw, 28px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {plan.price}
      </div>
      <div
        className="mt-1.5"
        style={{ color: MUTED, fontSize: 12, letterSpacing: "0.02em" }}
      >
        por mês · faturado anualmente
      </div>

      <ul className="mt-5 space-y-2.5">
        {plan.features.map((f) => (
          <li
            key={f}
            style={{ color: MUTED, fontSize: 13, lineHeight: 1.5 }}
          >
            <span style={{ color: DARK, marginRight: 8 }}>•</span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <PillButton size="md" variant="power" onClick={onCta} className="w-full">
          <LigarCaboLabel />
        </PillButton>
      </div>
    </article>
  );
}

export function ProtecaoContinuaSection() {
  const { openLeadPanel } = useLeadPanel();

  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{ fontFamily: FONT, padding: "96px 24px" }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-10">
          <h2
            style={{
              color: DARK,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Planos de Proteção Contínua
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <PlanCard key={p.name} plan={p} onCta={() => openLeadPanel()} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProtecaoContinuaSection;
