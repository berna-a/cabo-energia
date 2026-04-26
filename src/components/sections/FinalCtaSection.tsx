import { MessageCircle } from "lucide-react";
import { PillButton } from "@/components/brand/PillButton";
import { LigarCaboLabel } from "@/components/brand/LigarCaboLabel";
import { useLeadPanel } from "@/components/brand/LeadPanelContext";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { WHATSAPP_URL } from "@/lib/constants";

export function FinalCtaSection() {
  const { openLeadPanel } = useLeadPanel();
  const ref = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="bg-white py-20 md:py-28">
      <div
        ref={ref}
        className="reveal container flex flex-col items-center gap-7 text-center"
      >
        <span className="text-overline text-brand-green">O próximo passo é simples</span>
        <h2 className="text-headline max-w-3xl text-ink">
          Proteja a sua casa ou negócio ainda este ano.
        </h2>
        <p className="text-body-lg max-w-xl text-ink-soft">
          Fale connosco hoje. O estudo de poupança é gratuito e sem compromisso.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <PillButton size="lg" variant="power" onClick={() => openLeadPanel()}>
            <LigarCaboLabel />
          </PillButton>
          <PillButton size="lg" variant="ghost-dark" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <MessageCircle />
              Falar no WhatsApp
            </a>
          </PillButton>
        </div>
      </div>
    </section>
  );
}
