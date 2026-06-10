import { useTranslation } from "react-i18next";
import { PillButton } from "@/components/brand/PillButton";
import { LigarCaboLabel } from "@/components/brand/LigarCaboLabel";
import { useLeadPanel } from "@/components/brand/useLeadPanel";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const DARK = "#0D2B1F";
const MUTED = "#6b7280";

export function FinalCtaSection() {
  const { t } = useTranslation();
  const { openLeadPanel } = useLeadPanel();

  return (
    <section
      className="relative overflow-hidden bg-white w-full"
      style={{ fontFamily: FONT, paddingTop: 120, paddingBottom: 120 }}
    >
      <div className="site-container text-center">
        <div className="mx-auto max-w-2xl">
          <h2
            style={{
              color: DARK,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "clamp(30px, 4.4vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {t("finalCta.title")}
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl"
            style={{ color: MUTED, fontSize: 16, lineHeight: 1.6 }}
          >
            {t("finalCta.subtitle")}
          </p>
          <div className="mt-9 flex justify-center">
            <PillButton
              size="lg"
              variant="power"
              onClick={() => openLeadPanel({ source: "final_cta" })}
            >
              <LigarCaboLabel />
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCtaSection;
