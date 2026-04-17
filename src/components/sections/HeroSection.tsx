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
      {/* Soft bottom-weighted overlay so the photo breathes in the upper half */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--brand-green-deep) / 0.75) 0%, hsl(var(--brand-green-deep) / 0.15) 60%, hsl(var(--brand-green-deep) / 0.05) 100%)",
        }}
      />

      <div ref={ref} className="reveal relative min-h-[100svh]">
        {/* Headline — bottom-left */}
        <h1
          className="absolute left-6 right-6 bottom-40 text-white font-extrabold md:left-12 md:right-auto md:bottom-28 md:max-w-[14ch]"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 6rem)",
            lineHeight: 0.95,
            fontWeight: 800,
            letterSpacing: "-0.035em",
          }}
        >
          Cabo Verde<br />não pode parar.
        </h1>

        {/* CTAs — bottom-right on desktop, stacked under headline on mobile */}
        <div className="absolute left-6 right-6 bottom-20 flex flex-col gap-3 md:left-auto md:right-12 md:bottom-28 md:items-end md:max-w-[420px]">
          <p className="hidden md:block text-right text-white/85 text-body-lg">
            A CABO ENERGIA protege a sua casa e o seu negócio com soluções
            solares completas, stock local e processo claro.
          </p>
          <p className="md:hidden text-white/85 text-body-lg">
            A CABO ENERGIA protege a sua casa e o seu negócio com soluções
            solares completas.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-row md:justify-end">
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

        {/* Trust pills — full-width centered just above the fold */}
        <div className="absolute inset-x-0 bottom-6 flex flex-wrap items-center justify-center gap-2.5 px-6 md:gap-3">
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
