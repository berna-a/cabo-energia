import { PillButton } from "@/components/brand/PillButton";
import { LigarCaboLabel } from "@/components/brand/LigarCaboLabel";
import { useLeadPanel } from "@/components/brand/useLeadPanel";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const DARK = "#0D2B1F";
const MUTED = "#6b7280";
const YELLOW = "#F5C842";

function CertificateSlot() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 24px 60px -28px rgba(13,43,31,0.25)",
        padding: "44px 36px",
        aspectRatio: "4 / 3",
      }}
    >
      {/* Decorative frame */}
      <div
        className="absolute inset-4 rounded-lg pointer-events-none"
        style={{ border: `1px solid ${DARK}1A` }}
      />
      <div
        className="absolute inset-6 rounded-md pointer-events-none"
        style={{ border: `1px dashed ${DARK}26` }}
      />

      <div className="relative flex h-full flex-col items-center justify-between text-center">
        {/* Top: Crest */}
        <div className="flex flex-col items-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{
              background: YELLOW,
              color: DARK,
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: "-0.02em",
              boxShadow: `0 0 0 6px ${YELLOW}33`,
            }}
            aria-hidden
          >
            CE
          </div>
          <div
            className="mt-3"
            style={{
              color: MUTED,
              fontFamily: FONT,
              fontSize: 9,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            Certificado Oficial · 2026
          </div>
        </div>

        {/* Middle: Title */}
        <div className="flex flex-col items-center">
          <div
            style={{
              color: DARK,
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: "clamp(18px, 2vw, 22px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Membro Oficial
          </div>
          <div
            className="mt-2"
            style={{
              color: DARK,
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Empresa Protegida contra Apagões
          </div>
          <div
            className="mt-3 h-px w-20"
            style={{ background: `${DARK}33` }}
          />
          <div
            className="mt-3"
            style={{
              color: DARK,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            Cabo Energia
          </div>
        </div>

        {/* Bottom: Serial */}
        <div className="flex w-full items-end justify-between">
          <div
            style={{
              color: MUTED,
              fontFamily: FONT,
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Nº CE-PT-0001
          </div>
          <div
            style={{
              color: MUTED,
              fontFamily: FONT,
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Cabo Verde
          </div>
        </div>
      </div>
    </div>
  );
}

export function RedeProtegidosSection() {
  const { openLeadPanel } = useLeadPanel();

  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{ fontFamily: FONT, padding: "96px 24px" }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div
          className="rounded-3xl"
          style={{
            background: "#f8fafc",
            border: "1px solid rgba(0,0,0,0.05)",
            padding: "clamp(28px, 5vw, 64px)",
          }}
        >
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
            {/* LEFT — Value comms */}
            <div>
              <span
                style={{
                  display: "inline-block",
                  border: `1px solid ${YELLOW}`,
                  color: YELLOW,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "6px 18px",
                  borderRadius: 50,
                  marginBottom: 20,
                }}
              >
                Rede de Negócios Protegidos
              </span>
              <h2
                style={{
                  color: DARK,
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: "clamp(28px, 3.6vw, 42px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                Uma promessa que a concorrência não pode fazer.
              </h2>
              <p
                className="mt-5"
                style={{
                  color: MUTED,
                  fontSize: 15,
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: 520,
                }}
              >
                O seu estabelecimento entra na Rede de Negócios Protegidos.
                Afixe o certificado na montra — e comunique ao mercado que
                aqui a energia nunca para.
              </p>

              <div className="mt-8">
                <PillButton
                  size="md"
                  variant="power"
                  onClick={() => openLeadPanel()}
                >
                  <LigarCaboLabel />
                </PillButton>
              </div>
            </div>

            {/* RIGHT — Certificate slot */}
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-[460px]">
                <CertificateSlot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RedeProtegidosSection;
