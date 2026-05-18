import { PillButton } from "@/components/brand/PillButton";
import { LigarCaboLabel } from "@/components/brand/LigarCaboLabel";
import { useLeadPanel } from "@/components/brand/useLeadPanel";
import { useAudienceTab, setAudienceTab } from "./audienceTab";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const DARK = "#0D2B1F";
const MUTED = "#6b7280";
const YELLOW = "#F5C842";

type Plan = {
  badge: string;
  badgeHighlight?: boolean;
  name: string;
  metrics: { value: string; label: string }[];
  price: string;
};

const residencial: Plan[] = [
  {
    badge: "Proteção",
    name: "Casa Tranquila",
    metrics: [
      { value: "3k – 5k CVE", label: "Poupança" },
      { value: "5,12 kWh", label: "Backup" },
    ],
    price: "240.000 CVE",
  },
  {
    badge: "Popular",
    badgeHighlight: true,
    name: "Casa Autonomia",
    metrics: [
      { value: "6k – 8k CVE", label: "Poupança" },
      { value: "Até 80%", label: "Redução" },
    ],
    price: "510.000 CVE",
  },
  {
    badge: "Independência",
    name: "Casa Plena",
    metrics: [
      { value: "10k – 15k CVE", label: "Poupança" },
      { value: "10,24 kWh", label: "Autonomia" },
    ],
    price: "730.000 CVE",
  },
];

const negocio: Plan[] = [
  {
    badge: "Eficiência",
    name: "Negócio Essencial",
    metrics: [
      { value: "25k – 40k CVE", label: "Poupança" },
      { value: "15,36 kWh", label: "Proteção" },
    ],
    price: "1.350.000 CVE",
  },
  {
    badge: "Imunidade",
    name: "Negócio Pleno",
    metrics: [
      { value: "À Medida", label: "Retorno" },
      { value: "Selo Oficial", label: "Rede Protegida" },
    ],
    price: "Sob Orçamento",
  },
];

function PlanCard({ plan, onCta }: { plan: Plan; onCta: () => void }) {
  return (
    <article
      className="flex h-full flex-col rounded-3xl p-7 transition-shadow hover:shadow-md"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 2px 14px -6px rgba(15,23,42,0.08)",
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
        className="mt-5"
        style={{
          color: DARK,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 24,
          lineHeight: 1.15,
          margin: 0,
          letterSpacing: "-0.01em",
        }}
      >
        {plan.name}
      </h3>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {plan.metrics.map((m) => (
          <div key={m.label} className="rounded-xl p-4" style={{ background: "#f8fafc" }}>
            <div
              style={{
                color: DARK,
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: "clamp(16px, 1.6vw, 20px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {m.value}
            </div>
            <div
              style={{
                color: MUTED,
                fontSize: 11,
                marginTop: 6,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <div
          style={{
            color: DARK,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 26,
            letterSpacing: "-0.02em",
          }}
        >
          {plan.price}
        </div>

        <PillButton
          size="md"
          variant="power"
          onClick={onCta}
          className="mt-5 w-full"
        >
          <LigarCaboLabel />
        </PillButton>
      </div>
    </article>
  );
}

export function SolucoesSection() {
  const tab = useAudienceTab();
  const { openLeadPanel } = useLeadPanel();
  const plans = tab === "residencial" ? residencial : negocio;

  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{ fontFamily: FONT, padding: "96px 24px" }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-10 text-center">
          <span
            style={{
              display: "inline-block",
              border: `1px solid ${YELLOW}`,
              color: YELLOW,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "6px 20px",
              borderRadius: 50,
              marginBottom: 20,
            }}
          >
            Soluções
          </span>
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
            Escolha o pacote certo para si
          </h2>
        </div>

        <div className="mb-10 flex justify-center">
          <div
            className="inline-flex rounded-full p-1"
            style={{ background: "rgba(13,43,31,0.06)" }}
          >
            {([
              { id: "residencial", label: "Residencial" },
              { id: "negocio", label: "Negócio" },
            ] as const).map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setAudienceTab(t.id)}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold transition-all"
                  style={{
                    background: active ? DARK : "transparent",
                    color: active ? "#ffffff" : DARK,
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          key={tab}
          className={`grid grid-cols-1 gap-6 ${
            tab === "residencial" ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
          style={{ animation: "fadeUp 300ms ease both" }}
        >
          {plans.map((p) => (
            <PlanCard key={p.name} plan={p} onCta={() => openLeadPanel()} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default SolucoesSection;
