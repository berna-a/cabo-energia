const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const DARK = "#0D2B1F";
const MUTED = "#6b7280";

const steps = [
  {
    n: "01",
    title: "Simulação & Contacto",
    copy: "Utilize o simulador no topo da página. A nossa equipa liga de volta em menos de 24 horas.",
  },
  {
    n: "02",
    title: "Levantamento Técnico",
    copy: "Visita cirúrgica ao local para analisar o telhado e os consumos. Custo de 5.000 CVE (100% dedutível no contrato).",
  },
  {
    n: "03",
    title: "Plano de Proteção",
    copy: "Recebe uma proposta final transparente com o cálculo exato da sua produção solar, poupança e retorno.",
  },
  {
    n: "04",
    title: "Instalação & Ligação",
    copy: "Montagem técnica cirúrgica realizada por profissionais certificados e testes de carga ao vivo. A sua vida não para.",
  },
];

export function ProcessoSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "transparent", fontFamily: FONT, padding: "96px 24px" }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-10">
          <h2
            style={{
              color: "#ffffff",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Da simulação à instalação — sem surpresas.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <article
              key={s.n}
              className="rounded-xl p-7"
              style={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div
                style={{
                  color: "#0D2B1F",
                  opacity: 0.30,
                  fontFamily: FONT,
                  fontWeight: 800,
                  fontSize: "clamp(44px, 5vw, 64px)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                {s.n}
              </div>
              <h4
                className="mt-6"
                style={{
                  color: "#0D2B1F",
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 18,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                {s.title}
              </h4>
              <p
                className="mt-3"
                style={{ color: "rgba(13,43,31,0.65)", fontSize: 13, lineHeight: 1.55, margin: 0 }}
              >
                {s.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessoSection;
