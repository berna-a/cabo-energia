import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const DARK = "#0D2B1F";
const MUTED = "#5b6b64";
const YELLOW = "#F5C842";

type Plan = {
  tag: string;
  tagHighlight?: boolean;
  name: string;
  hook: string;
  metrics: { value: string; label: string }[];
  price: string;
  cta: string;
  primaryCta?: boolean;
  specs: string;
};

const particularPlans: Plan[] = [
  {
    tag: "Proteção Essencial",
    name: "Casa Tranquila",
    hook: "Energia contínua para apartamentos.",
    metrics: [
      { value: "3.000 a 5.000 CVE", label: "/ mês poupados" },
      { value: "5,12 kWh", label: "de bateria para apagões" },
    ],
    price: "240.000 CVE",
    cta: "Pedir Estudo Gratuito",
    specs:
      "Inversor Híbrido 2,5kW Sunwaytech · Bateria LFP 5,12kWh · Instalação chave-na-mão incluída · Sistema sem painéis solares.",
  },
  {
    tag: "O Mais Escolhido",
    tagHighlight: true,
    name: "Casa Autonomia",
    hook: "O sol paga a sua conta de luz.",
    metrics: [
      { value: "6.000 a 8.000 CVE", label: "/ mês poupados" },
      { value: "Até 80%", label: "de redução na fatura" },
    ],
    price: "510.000 CVE",
    cta: "Pedir Estudo Gratuito",
    primaryCta: true,
    specs:
      "6× Painéis Solares 585Wp Sunwaytech · Inversor Híbrido 5kW · Bateria LFP 5,12kWh · Estrutura e instalação incluídas.",
  },
  {
    tag: "Independência Total",
    name: "Casa Plena",
    hook: "A sua casa, a sua própria rede.",
    metrics: [
      { value: "10.000 a 15.000 CVE", label: "/ mês poupados" },
      { value: "10,24 kWh", label: "autonomia dia e noite" },
    ],
    price: "730.000 CVE",
    cta: "Pedir Estudo Gratuito",
    specs:
      "8× Painéis Solares 585Wp Sunwaytech · Inversor Híbrido 6kW · 2× Baterias LFP 5,12kWh (10,24kWh total) · Suporta expansão de bateria.",
  },
];

const empresaPlans: Plan[] = [
  {
    tag: "Proteção + Eficiência",
    name: "Negócio Essencial",
    hook: "O seu negócio não para. A sua fatura baixa.",
    metrics: [
      { value: "25.000 a 40.000 CVE", label: "/ mês poupados" },
      { value: "15,36 kWh", label: "proteção para sistemas críticos" },
    ],
    price: "1.350.000 CVE",
    cta: "Pedir Plano de Backup",
    primaryCta: true,
    specs:
      "12× Painéis Solares 585Wp Sunwaytech · 2× Inversores Híbridos Trifásicos 4kW · 1× Bateria HV 15,36kWh + BMS · Projeto elétrico e licenciamento incluídos.",
  },
  {
    tag: "Imunidade Energética",
    tagHighlight: true,
    name: "Negócio Pleno",
    hook: "Diga aos seus clientes: aqui nunca paramos.",
    metrics: [
      { value: "Sob Orçamento", label: "retorno sob medida" },
      { value: "Selo Oficial", label: '"Rede de Negócios Protegidos" para a montra' },
    ],
    price: "Sob Consulta (Após levantamento)",
    cta: "Falar com um Consultor",
    specs:
      "Engenharia e dimensionamento personalizado · Configuração escalável de alta capacidade com inversores trifásicos HV (10-50kW) e baterias modulares conforme o perfil do negócio.",
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const [open, setOpen] = useState(false);
  return (
    <article
      className="flex h-full flex-col rounded-3xl p-7 transition-shadow hover:shadow-md"
      style={{
        background: "#f8fafc",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 2px 12px -4px rgba(15,23,42,0.06)",
      }}
    >
      <span
        className="inline-block self-start rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
        style={
          plan.tagHighlight
            ? { background: YELLOW, color: DARK }
            : { background: "rgba(13,43,31,0.06)", color: DARK }
        }
      >
        {plan.tag}
      </span>

      <h3
        className="mt-5"
        style={{ color: DARK, fontFamily: FONT, fontWeight: 700, fontSize: 26, lineHeight: 1.15, margin: 0 }}
      >
        {plan.name}
      </h3>
      <p className="mt-2" style={{ color: MUTED, fontSize: 14, lineHeight: 1.5, margin: 0 }}>
        {plan.hook}
      </p>

      <div className="mt-6 space-y-4">
        {plan.metrics.map((m) => (
          <div key={m.value}>
            <div
              style={{
                color: DARK,
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: "clamp(20px, 2vw, 24px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {m.value}
            </div>
            <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-7">
        <div
          className="pt-5"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div style={{ color: MUTED, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            A partir de
          </div>
          <div
            className="mt-1"
            style={{ color: DARK, fontFamily: FONT, fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}
          >
            {plan.price}
          </div>
        </div>

        <button
          className="mt-5 w-full rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          style={
            plan.primaryCta
              ? { background: DARK, color: "#ffffff" }
              : { background: "transparent", color: DARK, border: `1px solid ${DARK}` }
          }
        >
          {plan.cta}
        </button>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-4 flex w-full items-center justify-between text-[12px] font-medium"
          style={{ color: MUTED }}
          aria-expanded={open}
        >
          <span>Ver especificações técnicas</span>
          <ChevronDown
            size={14}
            style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 200ms" }}
          />
        </button>
        <div
          style={{
            maxHeight: open ? 240 : 0,
            overflow: "hidden",
            transition: "max-height 300ms ease",
          }}
        >
          <p
            className="mt-3"
            style={{ color: MUTED, fontSize: 12, lineHeight: 1.6, margin: 0 }}
          >
            {plan.specs}
          </p>
        </div>
      </div>
    </article>
  );
}

export function SolucoesSection() {
  const [tab, setTab] = useState<"particular" | "empresa">("particular");
  const plans = tab === "particular" ? particularPlans : empresaPlans;

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
              { id: "particular", label: "Particular (Casa)" },
              { id: "empresa", label: "Empresa (Negócio)" },
            ] as const).map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
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
            tab === "particular" ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
          style={{ animation: "fadeUp 300ms ease both" }}
        >
          {plans.map((p) => (
            <PlanCard key={p.name} plan={p} />
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
