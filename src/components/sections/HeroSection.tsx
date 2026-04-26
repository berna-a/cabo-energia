import * as React from "react";
import { PillButton } from "@/components/brand/PillButton";
import { LigarCaboLabel } from "@/components/brand/LigarCaboLabel";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import heroImage from "@/assets/hero-bg.png";

export function HeroSection() {
  const ref = useRevealOnScroll<HTMLDivElement>();
  const [igniting, setIgniting] = React.useState(false);

  const handleIgnite = () => {
    if (igniting) return;
    setIgniting(true);
    window.setTimeout(() => {
      const el = document.getElementById("simulador");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 520);
    window.setTimeout(() => setIgniting(false), 1100);
  };

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden text-white">
      {/* Background image */}
      <img
        src={heroImage}
        alt="Família em casa com painéis solares"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] sm:object-[60%_center] md:object-center"
        loading="eager"
        fetchPriority="high"
      />

      {/* Overlay — radial elliptical fade from bottom-left */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 110% 130% at 0% 100%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div
        ref={ref}
        className="reveal relative min-h-[100svh]"
      >
        <div className="relative mx-auto min-h-[100svh] w-full max-w-[1350px] px-6 pb-14 md:px-6 md:pb-16">
          <div className="absolute inset-x-6 bottom-14 flex flex-col gap-8 md:inset-x-6 md:bottom-16 md:flex-row md:items-end md:justify-between">

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
                  fontSize: "clamp(2.56rem, 6vw, 5.2rem)",
                  lineHeight: 1.05,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
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
                Painéis e backup chave-na-mão para casas e negócios em todas as ilhas.
                Nunca mais ficar às escuras.
              </p>
            </div>

            {/* Direita: CTA */}
            <div className="relative flex flex-col gap-3 sm:flex-row md:flex-col md:items-end lg:flex-row lg:items-center">
              {/* Soft yellow glow halo behind CTA (always visible at rest) */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-brand-yellow/50 blur-3xl"
              />
              <PillButton
                size="lg"
                variant="power"
                onClick={handleIgnite}
                data-ignite={igniting ? "true" : undefined}
                aria-label="Ligar Cabo — começar a sua simulação"
                className="group"
              >
                <span
                  aria-hidden
                  className={
                    "pointer-events-none absolute inset-y-0 left-0 w-1/3 " +
                    "bg-[linear-gradient(110deg,transparent,hsl(var(--brand-yellow)/0.6),transparent)] " +
                    "opacity-0 " +
                    (igniting
                      ? "animate-spark-sweep "
                      : "group-hover:opacity-100 group-hover:animate-spark-sweep")
                  }
                />
              <LigarCaboLabel />
              </PillButton>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
