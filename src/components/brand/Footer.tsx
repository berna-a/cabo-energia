import { MessageCircle, Mail } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";
import logoCor from "@/assets/logo-cor.png";
import ardoLogo from "@/assets/ardo-logo.svg";

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-border bg-white">
      <div className="container flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3 max-w-sm">
          <img src={logoCor} alt="CABO ENERGIA" className="h-16 w-auto object-contain" />
          <p className="text-sm text-ink-soft">
            Energia solar para casas e negócios em Cabo Verde. Stock local,
            processo claro, acompanhamento incluído.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="text-overline text-ink-muted">Contacto</span>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-ink hover:text-brand-green"
          >
            <MessageCircle className="size-4" /> WhatsApp
          </a>
          {/* TODO: substituir pelo email real da CABO ENERGIA */}
          <a
            href="mailto:contacto@caboenergia.cv"
            className="inline-flex items-center gap-2 text-ink hover:text-brand-green"
          >
            <Mail className="size-4" /> contacto@caboenergia.cv
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container flex flex-col items-start justify-between gap-2 py-5 text-xs text-ink-muted md:flex-row md:items-center">
          <span className="inline-flex items-center gap-1">
            © {new Date().getFullYear()} CABO ENERGIA. Todos os direitos reservados. Website by{" "}
            <a
              href="https://ardo.media"
              target="_blank"
              rel="noreferrer"
              aria-label="ARDO"
              className="inline-flex items-center hover:opacity-70 transition-opacity"
            >
              <img src={ardoLogo} alt="ARDO" className="h-[1em] w-auto inline-block" />
            </a>
          </span>
          <span>Cabo Verde · 238</span>
        </div>
      </div>
    </footer>
  );
}
