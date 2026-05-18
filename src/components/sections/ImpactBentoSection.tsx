import impactProtecao from "@/assets/impact-protecao.jpg";
import impactFatura from "@/assets/impact-fatura.jpg";
import impactIndependencia from "@/assets/impact-independencia.jpg";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const DARK = "#0D2B1F";
const MUTED = "rgba(255,255,255,0.75)";

const glassPanel: React.CSSProperties = {
  background: "rgba(26,92,58,0.32)",
  border: "1px solid rgba(255,255,255,0.18)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 20px 50px -20px rgba(13,43,31,0.35)",
};

export function ImpactBentoSection() {
  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{ fontFamily: FONT, padding: "96px 24px" }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-12 max-w-2xl">
          <span
            style={{
              display: "inline-block",
              border: "1px solid #F5C842",
              color: "#F5C842",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "6px 20px",
              borderRadius: 50,
              marginBottom: 20,
            }}
          >
            Impacto Real
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
            O que muda na sua vida
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1 — PROTEÇÃO */}
          <article
            className="group relative md:col-span-2 overflow-hidden rounded-3xl"
            style={{ minHeight: 420 }}
          >
            <img
              src={impactProtecao}
              alt="Casa moderna em Cabo Verde iluminada à noite"
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(13,43,31,0.55) 0%, rgba(13,43,31,0.25) 45%, rgba(13,43,31,0.05) 100%)",
              }}
            />
            <div className="relative z-10 flex h-full w-full items-center p-6 md:p-10">
              <div
                className="flex w-full md:w-1/2 flex-col rounded-2xl p-6 md:p-7"
                style={glassPanel}
              >
                <h3
                  style={{ color: "#ffffff", fontFamily: FONT, fontWeight: 700, fontSize: 24, lineHeight: 1.2, margin: 0 }}
                >
                  A rede desliga. A sua casa não.
                </h3>
                <p
                  className="mt-3"
                  style={{ color: MUTED, fontSize: 14, lineHeight: 1.55, margin: 0 }}
                >
                  Proteção instantânea. O frigorífico, o Wi-Fi, a sua vida, não para.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Conforto", "Zero Interrupções", "Sempre Ligado"].map((p) => (
                    <span
                      key={p}
                      className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                      style={{
                        color: "#ffffff",
                        background: "rgba(255,255,255,0.12)",
                        borderColor: "rgba(255,255,255,0.25)",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* CARD 2 — FATURA */}
          <article
            className="group relative overflow-hidden rounded-3xl"
            style={{ minHeight: 420 }}
          >
            <img
              src={impactFatura}
              alt="Painéis solares premium sob o sol de Cabo Verde"
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(13,43,31,0.15) 0%, rgba(13,43,31,0.35) 100%)",
              }}
            />
            <div className="relative z-10 flex h-full items-center justify-center p-6">
              <div
                className="rounded-3xl p-6 text-center"
                style={{ ...glassPanel, maxWidth: 280 }}
              >
                <div
                  style={{
                    color: DARK,
                    fontFamily: FONT,
                    fontWeight: 900,
                    fontSize: "clamp(44px, 6.5vw, 72px)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  Até 80%
                </div>
                <h4
                  className="mt-3"
                  style={{ color: DARK, fontFamily: FONT, fontWeight: 600, fontSize: 18, lineHeight: 1.25, margin: 0 }}
                >
                  Deixe que o sol pague a conta.
                </h4>
                <p
                  className="mt-2"
                  style={{ color: MUTED, fontSize: 13, lineHeight: 1.5, margin: 0 }}
                >
                  Reduza drasticamente a sua fatura mensal.
                </p>
              </div>
            </div>
          </article>

          {/* CARD 3 — INDEPENDÊNCIA */}
          <article
            className="group relative md:col-span-3 overflow-hidden rounded-3xl"
            style={{ minHeight: 360 }}
          >
            <img
              src={impactIndependencia}
              alt="Moradia moderna integrada na paisagem de Cabo Verde"
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(13,43,31,0.05) 0%, rgba(13,43,31,0.25) 60%, rgba(13,43,31,0.55) 100%)",
              }}
            />
            <div className="relative z-10 flex h-full w-full items-end p-6 md:p-8">
              <div
                className="w-full rounded-2xl px-6 py-5 md:px-8 md:py-6"
                style={glassPanel}
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-8">
                  <h3
                    style={{ color: DARK, fontFamily: FONT, fontWeight: 700, fontSize: "clamp(20px, 2.6vw, 28px)", lineHeight: 1.2, margin: 0 }}
                  >
                    A sua casa, a sua própria rede.
                  </h3>
                  <p
                    style={{ color: MUTED, fontSize: 14, lineHeight: 1.55, margin: 0, maxWidth: 460 }}
                  >
                    Produza a sua energia e faça parte do futuro sustentável das nossas ilhas.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default ImpactBentoSection;
