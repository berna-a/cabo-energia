import { MessageCircle } from "lucide-react";
import { PillButton } from "@/components/brand/PillButton";
import { useLeadPanel } from "@/components/brand/LeadPanelContext";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { WHATSAPP_URL } from "@/lib/constants";
import heroImage from "@/assets/hero-bg.png";

export function HeroSection() {
  const { openLeadPanel } = useLeadPanel();
  const ref = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden text-white">
      {/* Background image */}
      <img
        src={heroImage}
        alt="Família em casa com painéis solares"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />

      {/* Overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      <div
        ref={ref}
        className="reveal relative min-h-[100svh] px-6 pb-14 md:px-12 md:pb-16"
      >
        <div className="absolute inset-x-6 bottom-14 flex flex-col gap-8 md:inset-x-12 md:bottom-16 md:flex-row md:items-end md:justify-between">

          {/* Esquerda: badge + headline + subtítulo */}
          <div className="max-w-[90%] md:max-w-[62%]">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
              <span className="text-overline text-white/80">
                Energia Solar · Cabo Verde
              </span>
            </div>

            {/* Headline — duas linhas, Montserrat Black 900, all caps */}
            <h1
              className="font-display text-white"
              style={{
                fontSize: "clamp(3.2rem, 7.5vw, 6.5rem)",
                lineHeight: 0.91,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
              }}
            >
              Cabo Verde<br />
              Sempre Ligado.
            </h1>

            {/* Subtítulo */}
            <p
              className="mt-5 max-w-md leading-relaxed text-white/70"
              style={{ fontSize: "1rem", fontWeight: 400 }}
            >
              Soluções completas para casas e negócios — stock local,
              instalação profissional, suporte incluído.
            </p>
          </div>

          {/* Direita: CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end lg:flex-row lg:items-center">
            <PillButton size="lg" variant="white" onClick={() => openLeadPanel()}>
              Pedir Estudo de Poupança
            </PillButton>
            <PillButton size="lg" variant="outline-light" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </PillButton>
          </div>

        </div>
      </div>
    </section>
  );
}
