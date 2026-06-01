import { Sun, Zap, Building2, Factory } from "lucide-react";
import { useLeadPanel } from "@/components/brand/useLeadPanel";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const GREEN = "#1A5C3A";
const DARK = "#0D2B1F";
const YELLOW = "#F5C842";

interface Kit {
  icon: React.ReactNode;
  name: string;
  type: "Residencial" | "Empresarial";
  popular?: boolean;
  prodDiaria: string;
  poupancaMensal: string;
  payback: string;
  preco: number;
  precoTabela: number;
  componentes: string[];
}

const kits: Kit[] = [
  {
    icon: <Sun size={20} />,
    name: "Casa Basic",
    type: "Residencial",
    prodDiaria: "4 kWh/d",
    poupancaMensal: "3.000–5.000 CVE",
    payback: "6–8 anos",
    preco: 469926,
    precoTabela: 520000,
    componentes: [
      "2× Painel Suntech 410W",
      "Inversor híbrido 3kW",
      "Bateria LiFePO4 5kWh",
      "Estrutura e cablagem",
      "Instalação e comissionamento",
    ],
  },
  {
    icon: <Sun size={20} />,
    name: "Casa Plus",
    type: "Residencial",
    popular: true,
    prodDiaria: "8 kWh/d",
    poupancaMensal: "6.000–9.000 CVE",
    payback: "5–7 anos",
    preco: 772028,
    precoTabela: 850000,
    componentes: [
      "4× Painel Suntech 410W",
      "Inversor híbrido 5kW",
      "Bateria LiFePO4 10kWh",
      "Estrutura e cablagem",
      "Instalação e comissionamento",
      "Monitorização remota",
    ],
  },
  {
    icon: <Building2 size={20} />,
    name: "Business Basic",
    type: "Empresarial",
    prodDiaria: "16 kWh/d",
    poupancaMensal: "12.000–18.000 CVE",
    payback: "4–6 anos",
    preco: 1206763,
    precoTabela: 1350000,
    componentes: [
      "8× Painel Suntech 410W",
      "Inversor trifásico 8kW",
      "Bateria LiFePO4 20kWh",
      "Estrutura industrial",
      "Instalação e comissionamento",
      "Monitorização remota",
    ],
  },
  {
    icon: <Factory size={20} />,
    name: "Business Plus",
    type: "Empresarial",
    popular: true,
    prodDiaria: "32 kWh/d",
    poupancaMensal: "25.000–40.000 CVE",
    payback: "3–5 anos",
    preco: 2342895,
    precoTabela: 2600000,
    componentes: [
      "16× Painel Suntech 410W",
      "Inversor trifásico 15kW",
      "Bateria LiFePO4 40kWh",
      "Estrutura industrial",
      "Instalação e comissionamento",
      "Monitorização remota 24/7",
      "Contrato de manutenção 1 ano",
    ],
  },
];

function formatCVE(value: number) {
  return value.toLocaleString("pt-PT") + " CVE";
}

export function PricingKits() {
  const { openLeadPanel } = useLeadPanel();

  const residencial = kits.filter((k) => k.type === "Residencial");
  const empresarial = kits.filter((k) => k.type === "Empresarial");

  return (
    <section style={{ fontFamily: FONT, padding: "80px 0", background: "#fff" }} id="kits">
      <div className="site-container">
        <div className="mb-12 text-center">
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: GREEN,
            }}
          >
            Planos de protecção
          </span>
          <h2
            style={{
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 800,
              color: DARK,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginTop: 8,
            }}
          >
            Escolha o kit certo
            <br />
            <span style={{ color: GREEN }}>para a sua vida.</span>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(13,43,31,0.55)", marginTop: 12 }}>
            Todos os preços incluem instalação. Financiamento disponível.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Residencial */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: GREEN,
              }}
            >
              <Sun size={14} /> Residencial
            </div>
            <div className="flex flex-col gap-4">
              {residencial.map((kit) => (
                <KitCard key={kit.name} kit={kit} onCta={() => openLeadPanel({ source: "pricing_kits" })} />
              ))}
            </div>
          </div>

          {/* Empresarial */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: GREEN,
              }}
            >
              <Building2 size={14} /> Empresarial
            </div>
            <div className="flex flex-col gap-4">
              {empresarial.map((kit) => (
                <KitCard key={kit.name} kit={kit} onCta={() => openLeadPanel({ source: "pricing_kits" })} />
              ))}
            </div>
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 32,
            fontSize: 12,
            color: "rgba(13,43,31,0.45)",
          }}
        >
          Preços válidos por 30 dias · Condições: 50% no contrato + 50% após instalação
        </p>
      </div>
    </section>
  );
}

function KitCard({ kit, onCta }: { kit: Kit; onCta: () => void }) {
  return (
    <div
      style={{
        borderRadius: 20,
        border: kit.popular ? `2px solid ${GREEN}` : "1px solid rgba(26,92,58,0.15)",
        padding: "24px",
        position: "relative",
        background: kit.popular ? "rgba(26,92,58,0.03)" : "#fff",
      }}
    >
      {kit.popular && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: 24,
            background: YELLOW,
            color: DARK,
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "4px 12px",
            borderRadius: 999,
          }}
        >
          Mais Popular
        </div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: GREEN, marginBottom: 6 }}>
            {kit.icon}
            <span style={{ fontSize: 16, fontWeight: 800, color: DARK }}>{kit.name}</span>
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: GREEN,
              textTransform: "uppercase",
            }}
          >
            {kit.prodDiaria} produção
          </div>
        </div>

        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div
            style={{
              fontSize: 12,
              color: "rgba(13,43,31,0.4)",
              textDecoration: "line-through",
            }}
          >
            {formatCVE(kit.precoTabela)}
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: DARK, lineHeight: 1.1 }}>
            {formatCVE(kit.preco)}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          margin: "16px 0",
          padding: "12px 0",
          borderTop: "1px solid rgba(26,92,58,0.1)",
          borderBottom: "1px solid rgba(26,92,58,0.1)",
        }}
      >
        <Metric label="Poupança/mês" value={kit.poupancaMensal} />
        <Metric label="Retorno" value={kit.payback} />
      </div>

      <ul style={{ margin: "0 0 16px", padding: 0, listStyle: "none" }}>
        {kit.componentes.map((c) => (
          <li
            key={c}
            style={{
              fontSize: 12,
              color: "rgba(13,43,31,0.65)",
              padding: "3px 0",
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <span style={{ color: GREEN, marginTop: 2, flexShrink: 0 }}>✓</span>
            {c}
          </li>
        ))}
      </ul>

      <button
        onClick={onCta}
        style={{
          width: "100%",
          padding: "12px 0",
          borderRadius: 999,
          background: kit.popular ? GREEN : "transparent",
          color: kit.popular ? "#fff" : GREEN,
          border: `2px solid ${GREEN}`,
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: FONT,
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = GREEN;
          (e.currentTarget as HTMLButtonElement).style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          if (!kit.popular) {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = GREEN;
          }
        }}
      >
        Pedir Estudo Gratuito
      </button>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(13,43,31,0.4)" }}>
        {label}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: DARK }}>{value}</div>
    </div>
  );
}
