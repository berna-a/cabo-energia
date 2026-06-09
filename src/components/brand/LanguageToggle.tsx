import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

export function LanguageToggle({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || "pt").slice(0, 2);

  const base = tone === "light" ? "rgba(255,255,255,0.65)" : "rgba(13,43,31,0.5)";
  const active = tone === "light" ? "#ffffff" : "#0D2B1F";

  return (
    <div
      className="inline-flex items-center"
      role="group"
      aria-label="Idioma"
      style={{ fontSize: 12, fontFamily: "'Montserrat', system-ui, sans-serif" }}
    >
      {LANGS.map((l, i) => {
        const isActive = current === l.code;
        return (
          <span key={l.code} className="inline-flex items-center">
            {i > 0 && (
              <span aria-hidden style={{ color: base, opacity: 0.5, margin: "0 5px" }}>
                ·
              </span>
            )}
            <button
              type="button"
              onClick={() => i18n.changeLanguage(l.code)}
              aria-current={isActive ? "true" : undefined}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                color: isActive ? active : base,
                fontWeight: isActive ? 800 : 600,
                letterSpacing: "0.04em",
                transition: "color 0.15s",
              }}
            >
              {l.label}
            </button>
          </span>
        );
      })}
    </div>
  );
}
