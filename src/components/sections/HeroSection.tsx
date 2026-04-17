import { MessageCircle } from "lucide-react";
import { PillButton } from "@/components/brand/PillButton";
import { TrustBadge } from "@/components/brand/TrustBadge";
import { useLeadPanel } from "@/components/brand/LeadPanelContext";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { WHATSAPP_URL } from "@/lib/constants";
import heroImage from "@/assets/hero-living.jpg";

const trustPills = [
  "Stock em Cabo Verde",
  "Contacto em 24 horas",
  "Processo 100% claro",
];

export function HeroSection() {
  const { openLeadPanel } = useLeadPanel();
  const ref = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden text-white">
      <img
        src={heroImage}
        alt="Família em casa com painéis solares visíveis na propriedade vizinha"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      {/* Overlay reforçado à esquerda para legibilidade do headline branco */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(100deg, hsl(var(--brand-green-deep) / 0.85) 0%, hsl(var(--brand-green-deep) / 0.55) 45%, hsl(var(--brand-green-deep) / 0.2) 100%)",
        }}
      />

      <div className="container flex min-h-[100svh] flex-col justify-between pt-28 pb-10 md:pt-32 md:pb-14">
        <div ref={ref} className="reveal flex max-w-[680px] flex-col gap-7 pt-8 md:pt-16">
          <TrustBadge tone="light">Energia Solar em Cabo Verde</TrustBadge>

          <h1 className="text-display text-white">
            Cabo Verde<br />não pode parar.
          </h1>

          <p className="text-body-lg max-w-[520px] text-white/85">
            A CABO ENERGIA protege a sua casa e o seu negócio com soluções
            solares completas, stock local e processo claro.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <PillButton size="lg" variant="primary" onClick={() => openLeadPanel()}>
              Pedir Estudo de Poupança
            </PillButton>
            <PillButton size="lg" variant="ghost-light" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle />
                Falar no WhatsApp
              </a>
            </PillButton>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-12 md:gap-3">
          {trustPills.map((p) => (
            <TrustBadge key={p} tone="light">
              {p}
            </TrustBadge>
          ))}
        </div>
      </div>
    </section>
  );
}
