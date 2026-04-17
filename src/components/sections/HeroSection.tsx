import { MessageCircle } from "lucide-react";
import { PillButton } from "@/components/brand/PillButton";
import { useLeadPanel } from "@/components/brand/LeadPanelContext";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { WHATSAPP_URL } from "@/lib/constants";
import heroImage from "@/assets/hero-living.jpg";

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
      {/* Light bottom-only overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.0) 50%)",
        }}
      />

      <div
        ref={ref}
        className="reveal relative min-h-[100svh] px-6 pb-14 md:px-12 md:pb-14"
      >
        {/* Bottom-anchored two-column layout */}
        <div className="absolute inset-x-6 bottom-14 flex flex-col gap-10 md:inset-x-12 md:flex-row md:items-end md:justify-between md:gap-12">
          {/* Left: headline */}
          <div className="max-w-[85%] lg:max-w-[55%]">
            <h1
              className="font-extrabold text-white"
              style={{
                fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                lineHeight: 0.92,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                whiteSpace: "normal",
                wordBreak: "normal",
                fontFamily:
                  "'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              Cabo Verde não pode parar.
            </h1>
          </div>

          {/* Right: CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end lg:flex-row">
            <PillButton size="lg" variant="white" onClick={() => openLeadPanel()}>
              Pedir Estudo de Poupança
            </PillButton>
            <PillButton size="lg" variant="outline-light" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle />
                Falar no WhatsApp
              </a>
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
