import impactProtecao from "@/assets/impact-protecao.png";
import impactFatura from "@/assets/impact-fatura.jpg";
import impactIndependencia from "@/assets/impact-independencia.png";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const DARK = "#0D2B1F";
const MUTED = "rgba(255,255,255,0.75)";

const glassPanel: React.CSSProperties = {
  background: "rgba(13, 43, 31, 0.06)",
  backdropFilter: "none",
  WebkitBackdropFilter: "none",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  position: "relative",
  overflow: "hidden",
  boxShadow: "none",
};

const glassPanelNight: React.CSSProperties = {
  background: "rgba(10, 20, 40, 0.07)",
  backdropFilter: "none",
  WebkitBackdropFilter: "none",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  position: "relative",
  overflow: "hidden",
  boxShadow: "none",
};

const LeftCatchLight = () => (
  <span
    aria-hidden
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: 1,
      height: "100%",
      background:
        "linear-gradient(180deg, rgba(255,228,135,0.60) 0%, rgba(255,228,135,0.25) 30%, rgba(255,228,135,0.08) 60%, transparent 100%)",
      zIndex: 3,
      pointerEvents: "none",
    }}
  />
);

const LeftCatchLightLunar = () => (
  <span
    aria-hidden
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: 1,
      height: "100%",
      background:
        "linear-gradient(180deg, rgba(210,228,255,0.55) 0%, rgba(210,228,255,0.20) 25%, rgba(210,228,255,0.06) 55%, transparent 100%)",
      zIndex: 3,
      pointerEvents: "none",
    }}
  />
);

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
            A Sua Vida com Cabo Energia
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
            O antes e o depois.
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
                className="impacto-card-night flex w-full md:w-1/2 flex-col rounded-2xl p-6 md:p-7"
                style={{ ...glassPanelNight, marginTop: 15 }}
              >
                <LeftCatchLightLunar />
                <h3
                  style={{ color: "#ffffff", fontFamily: FONT, fontWeight: 700, fontSize: 24, lineHeight: 1.2, margin: 0 }}
                >
                  Apagão na zona,<br />Luz na sua Casa.
                </h3>
                <p
                  className="mt-5"
                  style={{ color: MUTED, fontSize: 14, lineHeight: 1.55, margin: 0 }}
                >
                  A cozinha, o Wi-Fi, a sua vida, não pára.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(0, 0, 0, 0.35)",
                      border: "1px solid rgba(255, 255, 255, 0.20)",
                      borderRadius: 50,
                      padding: "6px 14px 6px 8px",
                      fontSize: 12,
                      fontWeight: 500,
                      color: "white",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#F5C842",
                        flexShrink: 0,
                      }}
                    />
                    Sempre Ligado
                  </span>
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
                className="impacto-card impacto-card--static rounded-3xl p-6 text-center"
                style={{ ...glassPanel, maxWidth: 280 }}
              >
                <LeftCatchLight />
                <div
                  style={{
                    color: "#F5C842",
                    fontFamily: FONT,
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  <span style={{ display: "block", fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 700, letterSpacing: "0.02em", marginBottom: 4, color: "#ffffff" }}>
                    POUPE ATÉ
                  </span>
                  <span style={{ fontSize: "clamp(44px, 6.5vw, 72px)" }}>80%</span>
                </div>
                <h4
                  style={{ color: "#ffffff", fontFamily: FONT, fontWeight: 600, fontSize: 14, lineHeight: 1.25, margin: 0, marginTop: 17, whiteSpace: "nowrap" }}
                >
                  Deixe que o sol pague a conta.
                </h4>
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
                className="impacto-card impacto-card--slow w-full rounded-2xl px-6 py-5 md:px-8 md:py-6"
                style={glassPanel}
              >
                <LeftCatchLight />
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-8">
                  <h3
                    style={{ color: "#ffffff", fontFamily: FONT, fontWeight: 700, fontSize: "clamp(20px, 2.6vw, 28px)", lineHeight: 1.2, margin: 0 }}
                  >
                    A sua casa, a sua própria rede.
                  </h3>
                  <p
                    style={{ color: MUTED, fontSize: 14, lineHeight: 1.55, margin: 0, maxWidth: 460 }}
                  >
                    Produza a sua energia e faça parte<br />
                    do futuro sustentável de Cabo Verde
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <style>{`
        .impacto-card > *:not(span[aria-hidden]),
        .impacto-card-night > *:not(span[aria-hidden]) {
          position: relative;
          z-index: 2;
        }
        .impacto-card::before {
          content: '';
          position: absolute;
          top: -120%;
          left: -120%;
          width: 340%;
          height: 340%;
          background: linear-gradient(
            128deg,
            transparent 0%,
            transparent 28%,
            rgba(255, 222, 140, 0.03) 36%,
            rgba(255, 230, 155, 0.10) 43%,
            rgba(255, 235, 160, 0.20) 48%,
            rgba(255, 238, 168, 0.26) 50%,
            rgba(255, 235, 160, 0.20) 52%,
            rgba(255, 230, 155, 0.10) 57%,
            rgba(255, 222, 140, 0.03) 64%,
            transparent 72%,
            transparent 100%
          );
          animation: solarSweep 16s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 1;
        }
        .impacto-card--static::before {
          animation: none;
        }
        .impacto-card--slow::before {
          animation-duration: 80s;
        }
        .impacto-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 230, 140, 0.75) 0%,
            rgba(255, 235, 160, 0.55) 20%,
            rgba(255, 240, 180, 0.30) 45%,
            rgba(255, 255, 255, 0.10) 70%,
            transparent 100%
          );
          z-index: 3;
          pointer-events: none;
        }
        .impacto-card-night::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(210, 228, 255, 0.60) 0%,
            rgba(215, 230, 255, 0.40) 18%,
            rgba(220, 235, 255, 0.20) 40%,
            rgba(255, 255, 255, 0.06) 65%,
            transparent 100%
          );
          z-index: 3;
          pointer-events: none;
        }
        @keyframes solarSweep {
          0%   { transform: translate(-12%, -10%); opacity: 0.5; }
          25%  { opacity: 0.9; }
          50%  { opacity: 1; }
          75%  { opacity: 0.85; }
          100% { transform: translate(12%, 10%); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}

export default ImpactBentoSection;
