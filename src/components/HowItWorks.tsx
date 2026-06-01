import { ClipboardList, MapPin, FileText, Wrench, Shield } from "lucide-react";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const GREEN = "#1A5C3A";
const DARK = "#0D2B1F";
const YELLOW = "#F5C842";

const steps = [
  {
    icon: <ClipboardList size={22} />,
    num: "01",
    title: "Pedido de Estudo",
    desc: "Preencha o formulário no website ou envie mensagem via WhatsApp. Respondemos em até 24h.",
  },
  {
    icon: <MapPin size={22} />,
    num: "02",
    title: "Levantamento Técnico",
    desc: "Visita ao local para avaliar o telhado, consumos e potencial solar. Custo: 5.000 CVE, dedutível no orçamento.",
  },
  {
    icon: <FileText size={22} />,
    num: "03",
    title: "Orçamento Personalizado",
    desc: "Recebe um plano de protecção energética com produção diária, poupança estimada e prazo de retorno.",
  },
  {
    icon: <Wrench size={22} />,
    num: "04",
    title: "Instalação Chave-na-Mão",
    desc: "Equipa certificada instala tudo — painéis, inversor, baterias. Stock local, sem esperas longas.",
  },
  {
    icon: <Shield size={22} />,
    num: "05",
    title: "Suporte Contínuo",
    desc: "Acompanhamento pós-instalação, manutenção preventiva e garantia Suntech incluídos.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      style={{ fontFamily: FONT, background: "#fff", padding: "80px 0" }}
    >
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
            Como funciona
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
            Do primeiro contacto à última etapa.
            <br />
            <span style={{ color: GREEN }}>Sem surpresas.</span>
          </h2>
        </div>

        {/* Desktop: horizontal strip | Mobile: vertical stack */}
        <div className="hidden md:flex gap-0">
          {steps.map((s, i) => (
            <StepCard key={s.num} step={s} isLast={i === steps.length - 1} />
          ))}
        </div>
        <div className="flex flex-col gap-4 md:hidden">
          {steps.map((s) => (
            <StepCardMobile key={s.num} step={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  isLast,
}: {
  step: (typeof steps)[0];
  isLast: boolean;
}) {
  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        borderRadius: 20,
        padding: "28px 20px",
        background: "rgba(26,92,58,0.04)",
        border: "1px solid rgba(26,92,58,0.1)",
        marginRight: isLast ? 0 : 12,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: GREEN,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        {step.icon}
      </div>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: YELLOW,
          textTransform: "uppercase",
        }}
      >
        {step.num}
      </span>
      <h3
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: DARK,
          margin: "6px 0 8px",
          lineHeight: 1.3,
        }}
      >
        {step.title}
      </h3>
      <p style={{ fontSize: 12, color: "rgba(13,43,31,0.6)", lineHeight: 1.6, margin: 0 }}>
        {step.desc}
      </p>
    </div>
  );
}

function StepCardMobile({ step }: { step: (typeof steps)[0] }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: "20px 16px",
        borderRadius: 16,
        background: "rgba(26,92,58,0.04)",
        border: "1px solid rgba(26,92,58,0.1)",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: GREEN,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {step.icon}
      </div>
      <div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: YELLOW,
            textTransform: "uppercase",
          }}
        >
          {step.num}
        </span>
        <h3
          style={{ fontSize: 14, fontWeight: 700, color: DARK, margin: "4px 0 6px", lineHeight: 1.3 }}
        >
          {step.title}
        </h3>
        <p style={{ fontSize: 12, color: "rgba(13,43,31,0.6)", lineHeight: 1.6, margin: 0 }}>
          {step.desc}
        </p>
      </div>
    </div>
  );
}
