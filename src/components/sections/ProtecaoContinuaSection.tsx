
import { useTranslation } from "react-i18next";

const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";
const DARK = "#0D2B1F";
const MUTED = "#6b7280";
const YELLOW = "#F5C842";

type Plan = {
  badge: string;
  badgeHighlight?: boolean;
  price: string;
  name: string;
  features: string[];
  primaryCta?: boolean;
};

// Preço/destaque em código; nome, badge e features vêm das traduções.
const PRICE_META = [
  { price: "2.500 CVE", badgeHighlight: false, primaryCta: false },
  { price: "4.500 CVE", badgeHighlight: true, primaryCta: true },
  { price: "8.000 CVE", badgeHighlight: false, primaryCta: false },
];

function PlanCard({ plan }: { plan: Plan }) {
  const { t } = useTranslation();
  return (
    <article
      className="flex h-full flex-col rounded-2xl p-7"
      style={{
        background: "rgba(255,255,255,0.95)",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <span
        className="inline-block self-start rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
        style={
          plan.badgeHighlight
            ? { background: YELLOW, color: DARK }
            : { background: "rgba(13,43,31,0.06)", color: "rgba(13,43,31,0.45)" }
        }
      >
        {plan.badge}
      </span>

      <h3
        className="mt-6"
        style={{
          color: "#0D2B1F",
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: "clamp(26px, 2.8vw, 34px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        {plan.name}
      </h3>

      <div
        className="mt-5"
        style={{
          color: "#0D2B1F",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: "clamp(22px, 2.2vw, 28px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {plan.price}
      </div>
      <div
        className="mt-1.5"
        style={{ color: "rgba(13,43,31,0.65)", fontSize: 12, letterSpacing: "0.02em" }}
      >
        {t("protecao.perMonth")}
      </div>

      <ul className="mt-5 space-y-2.5">
        {plan.features.map((f) => (
          <li
            key={f}
            style={{ color: "rgba(13,43,31,0.65)", fontSize: 13, lineHeight: 1.5 }}
          >
            <span style={{ color: "#1A5C3A", marginRight: 8 }}>•</span>
            {f}
          </li>
        ))}
      </ul>

    </article>
  );
}

export function ProtecaoContinuaSection() {
  const { t } = useTranslation();
  const content = t("protecao.plans", { returnObjects: true }) as {
    name: string;
    badge: string;
    features: string[];
  }[];
  const plans: Plan[] = content.map((c, i) => ({
    name: c.name,
    badge: c.badge,
    features: c.features,
    price: PRICE_META[i]?.price ?? "",
    badgeHighlight: PRICE_META[i]?.badgeHighlight,
    primaryCta: PRICE_META[i]?.primaryCta,
  }));
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
            {t("protecao.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <PlanCard key={p.name} plan={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProtecaoContinuaSection;
