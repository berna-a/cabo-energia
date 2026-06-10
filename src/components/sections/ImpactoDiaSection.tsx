import { Refrigerator, Wifi, Sun, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const DARK = "#0D2B1F";
const MUTED = "#6b7280";

const ICONS: LucideIcon[] = [Refrigerator, Wifi, Sun];

export function ImpactoDiaSection() {
  const { t } = useTranslation();
  const items = (t("impactoDia.items", { returnObjects: true }) as { title: string; copy: string }[]).map(
    (it, i) => ({ ...it, icon: ICONS[i] })
  );
  const cols = "md:grid-cols-3";

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
            {t("impactoDia.title")}
          </h2>
        </div>

        <div
          className={`grid grid-cols-1 gap-6 ${cols}`}
          style={{ animation: "fadeUp 300ms ease both" }}
        >
          {items.map(({ icon: Icon, title, copy }) => (
            <article
              key={title}
              className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: "rgba(13,43,31,0.06)", color: "#1A5C3A", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <h3
                className="mt-6"
                style={{
                  color: "#0D2B1F",
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: "clamp(20px, 2vw, 26px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                {title}
              </h3>
              <p
                className="mt-3"
                style={{ color: "rgba(13,43,31,0.65)", fontSize: 14, lineHeight: 1.55, margin: 0 }}
              >
                {copy}
              </p>
            </article>
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

export default ImpactoDiaSection;
