import { MessageCircle, Mail } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";
import logoCor from "@/assets/logo-cor.png";
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
            Energia à prova de apagões.
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
        </div>

        {/* Column 2 — Soluções */}
        <ColumnLinks
          label="Soluções"
          links={[
            { href: "#solucoes", text: "Casa Tranquila" },
            { href: "#solucoes", text: "Casa Autonomia" },
            { href: "#solucoes", text: "Casa Plena" },
            { href: "#solucoes", text: "Negócio Essencial" },
            { href: "#solucoes", text: "Negócio Pleno" },
          ]}
        />

        {/* Column 3 — Empresa */}
        <ColumnLinks
          label="Empresa"
          links={[
            { href: "#processo", text: "Como funciona" },
            { href: "#protecao", text: "Planos de Proteção" },
            { href: "#rede", text: "Rede de Negócios Protegidos" },
            { href: "#contacto", text: "Contacto" },
          ]}
        />
      </div>

      <div className="border-t border-border">
        <div className="site-container flex flex-col items-start justify-between gap-2 py-5 text-xs md:flex-row md:items-center" style={{ color: MUTED }}>
          <span className="inline-flex items-center" style={{ fontSize: 12 }}>
            © {new Date().getFullYear()} CABO ENERGIA. Todos os direitos reservados. Website by
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
          <span style={{ fontSize: 12 }}>Cabo Verde · 238</span>
        </div>
      </div>
    </footer>
  );
}
