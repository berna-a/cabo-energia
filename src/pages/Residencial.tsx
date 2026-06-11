import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/brand/Navbar";
import { Footer } from "@/components/brand/Footer";
import { Marquee } from "@/components/brand/Marquee";
import { PillButton } from "@/components/brand/PillButton";
import { LigarCaboLabel } from "@/components/brand/LigarCaboLabel";
import { useLeadPanel } from "@/components/brand/LeadPanelContext";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { SolucoesSection } from "@/components/sections/SolucoesSection";
import { CasaPreocupacoesSection } from "@/components/sections/CasaPreocupacoesSection";
import { CasaFaturaSection } from "@/components/sections/CasaFaturaSection";
import { ProtecaoContinuaSection } from "@/components/sections/ProtecaoContinuaSection";
import { RedeProtegidosSection } from "@/components/sections/RedeProtegidosSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import heroResidencial from "@/assets/hero-residencial.webp";

const SOURCE = "website_residencial";

const Residencial = () => {
  const { t } = useTranslation();
  const { openLeadPanel } = useLeadPanel();
  const heroRef = useRevealOnScroll<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* HERO — mesmo tratamento da página principal */}
        <section className="relative isolate min-h-[100svh] overflow-hidden text-white">
          <img
            src={heroResidencial}
            alt="Casa em Cabo Verde com painéis solares ao pôr do sol"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] sm:object-[60%_center] md:object-center"
            loading="eager"
            fetchPriority="high"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 110% 130% at 0% 100%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%)",
            }}
          />

          <div ref={heroRef} className="reveal relative min-h-[100svh]">
            <div className="site-container relative min-h-[100svh] pb-14 md:pb-16">
              <div className="absolute inset-x-5 bottom-14 flex flex-col gap-8 md:inset-x-8 md:bottom-16 md:flex-row md:items-end md:justify-between lg:inset-x-6">
                {/* Esquerda: badge + headline + subtítulo */}
                <div className="max-w-[90%] md:max-w-[62%]">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                    <span className="text-overline text-white/80">
                      {t("pages.residencialBadge")}
                    </span>
                  </div>

                  <h1
                    className="font-display text-white"
                    style={{
                      fontSize: "clamp(3.89rem, 7.2vw, 6.24rem)",
                      lineHeight: 1.05,
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("pages.residencialTitle1")}<br />
                    {t("pages.residencialTitle2")}
                  </h1>

                  <p
                    className="mt-5 max-w-md leading-relaxed text-white/70"
                    style={{ fontSize: "1rem", fontWeight: 400 }}
                  >
                    {t("pages.residencialSubtitle")}
                  </p>
                </div>

                {/* Direita: CTA */}
                <div className="relative flex flex-col gap-3 sm:flex-row md:flex-col md:items-end lg:flex-row lg:items-center">
                  <PillButton
                    size="lg"
                    variant="power"
                    onClick={() =>
                      openLeadPanel({ clientType: "residencial", source: SOURCE })
                    }
                  >
                    <LigarCaboLabel />
                  </PillButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Marquee />

        {/* O que deixa de o preocupar (apagões em casa) */}
        <CasaPreocupacoesSection />

        {/* Container verde-escuro arredondado — assinatura visual da homepage */}
        <div
          style={{
            background: "#0D2B1F",
            borderRadius: 32,
            margin: "48px 24px",
            overflow: "hidden",
          }}
        >
          <SolucoesSection audience="residencial" showToggle={false} />
          <ProtecaoContinuaSection />
        </div>

        {/* Fatura antes/depois + financiamento */}
        <CasaFaturaSection />

        <RedeProtegidosSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Residencial;
