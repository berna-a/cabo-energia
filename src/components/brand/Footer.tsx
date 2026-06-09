import { MessageCircle, Mail } from "lucide-react";
import { IconBrandInstagram, IconBrandFacebook, IconBrandLinkedin } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { WHATSAPP_URL } from "@/lib/constants";
import { LanguageToggle } from "./LanguageToggle";
import logoCor from "@/assets/logo-cor.webp";
import ardoLogo from "@/assets/ardo-logo.svg";

const DARK = "#0D2B1F";
const MUTED = "rgba(13,43,31,0.45)";
const FONT = "'Montserrat', system-ui, -apple-system, sans-serif";

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: MUTED,
  fontWeight: 600,
};

const linkStyle: React.CSSProperties = {
  fontSize: 13,
  color: "rgba(13,43,31,0.65)",
  textDecoration: "none",
};

function ColumnLinks({
  label,
  links,
}: {
  label: string;
  links: { href: string; text: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <span style={labelStyle}>{label}</span>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.text}>
            <a
              href={l.href}
              style={linkStyle}
              className="transition-colors hover:!text-brand-green"
            >
              {l.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer
      id="contacto"
      className="border-t border-border bg-white"
      style={{ fontFamily: FONT }}
    >
      <div
        className="site-container grid grid-cols-1 gap-12 md:grid-cols-3"
        style={{ paddingTop: 48, paddingBottom: 32 }}
      >
        {/* Column 1 — Brand */}
        <div className="flex flex-col gap-4 max-w-sm">
          <img src={logoCor} alt="CABO ENERGIA" className="h-16 w-auto object-contain" />
          <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>
            {t("footer.tagline")}
          </p>
          <div className="mt-2 flex flex-col gap-2 text-sm">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-brand-green"
              style={{ color: DARK }}
            >
              <MessageCircle className="size-4" /> WhatsApp
            </a>
            <a
              href="mailto:contacto@caboenergia.cv"
              className="inline-flex items-center gap-2 hover:text-brand-green"
              style={{ color: DARK }}
            >
              <Mail className="size-4" /> contacto@caboenergia.cv
            </a>
          </div>

          {/* Social links */}
          <div className="mt-5 flex flex-row gap-3">
            <a
              href="https://www.instagram.com/caboenergia.cv/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full border transition-all duration-200 hover:border-[#F5C842] hover:text-[#F5C842] hover:bg-[rgba(245,200,66,0.08)]"
              style={{
                width: 36,
                height: 36,
                borderColor: "rgba(13,43,31,0.15)",
                color: "rgba(13,43,31,0.55)",
                textDecoration: "none",
              }}
            >
              <IconBrandInstagram size={18} stroke={1.5} />
            </a>
            <a
              href="https://www.facebook.com/people/Cabo-Energia/61587485371472/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full border transition-all duration-200 hover:border-[#F5C842] hover:text-[#F5C842] hover:bg-[rgba(245,200,66,0.08)]"
              style={{
                width: 36,
                height: 36,
                borderColor: "rgba(13,43,31,0.15)",
                color: "rgba(13,43,31,0.55)",
                textDecoration: "none",
              }}
            >
              <IconBrandFacebook size={18} stroke={1.5} />
            </a>
            <a
              href="https://www.linkedin.com/company/cabo-energia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full border transition-all duration-200 hover:border-[#F5C842] hover:text-[#F5C842] hover:bg-[rgba(245,200,66,0.08)]"
              style={{
                width: 36,
                height: 36,
                borderColor: "rgba(13,43,31,0.15)",
                color: "rgba(13,43,31,0.55)",
                textDecoration: "none",
              }}
            >
              <IconBrandLinkedin size={18} stroke={1.5} />
            </a>
          </div>
        </div>

        {/* Column 2 — Soluções */}
        <ColumnLinks
          label={t("footer.solucoes")}
          links={[
            { href: "#solucoes", text: "Casa Autonomia" },
            { href: "#solucoes", text: "Casa Família" },
            { href: "#solucoes", text: "Casa Prestige" },
            { href: "#solucoes", text: "Negócio Essencial" },
            { href: "#solucoes", text: "Negócio Corporativo" },
          ]}
        />

        {/* Column 3 — Empresa */}
        <ColumnLinks
          label={t("footer.empresa")}
          links={[
            { href: "#processo", text: t("footer.comoFunciona") },
            { href: "#protecao", text: t("footer.planosProtecao") },
            { href: "#rede", text: t("footer.rede") },
            { href: "#contacto", text: t("footer.contacto") },
          ]}
        />
      </div>

      <div className="border-t border-border">
        <div className="site-container flex flex-col items-start justify-between gap-2 py-5 text-xs md:flex-row md:items-center" style={{ color: MUTED }}>
          <span className="inline-flex items-center" style={{ fontSize: 12 }}>
            © {new Date().getFullYear()} CABO ENERGIA. {t("footer.rights")}
            <a
              href="https://ardo.media"
              target="_blank"
              rel="noreferrer"
              aria-label="ARDO"
              className="group inline-flex items-center ml-0.5 -mt-[2px]"
            >
              <span
                aria-hidden
                className="inline-block h-[4.4em] w-[4.4em] bg-[#1B3A6B] group-hover:bg-[#1A56DB] transition-colors"
                style={{
                  WebkitMaskImage: `url(${ardoLogo})`,
                  maskImage: `url(${ardoLogo})`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
            </a>
          </span>
          <div className="flex items-center gap-4">
            <LanguageToggle tone="dark" />
            <span style={{ fontSize: 12 }}>Cabo Verde · 238</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
