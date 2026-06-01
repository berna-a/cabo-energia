import { useEffect } from "react";
import { Navbar } from "@/components/brand/Navbar";
import { Footer } from "@/components/brand/Footer";
import { Marquee } from "@/components/brand/Marquee";
import { HeroSection } from "@/components/sections/HeroSection";
import SimuladorSection from "@/components/sections/SimuladorSection";
import { ImpactBentoSection } from "@/components/sections/ImpactBentoSection";
import { SolucoesSection } from "@/components/sections/SolucoesSection";
import { ImpactoDiaSection } from "@/components/sections/ImpactoDiaSection";
import { ProcessoSection } from "@/components/sections/ProcessoSection";
import { ProtecaoContinuaSection } from "@/components/sections/ProtecaoContinuaSection";
import { RedeProtegidosSection } from "@/components/sections/RedeProtegidosSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

const Index = () => {
  // Salta para a secção indicada no URL (ex.: /#como-funciona), mesmo vindo de outra página.
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    const t = window.setTimeout(scrollToHash, 150);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <Marquee />
        <ImpactBentoSection />
        <div
          style={{
            background: "#0D2B1F",
            borderRadius: 32,
            margin: "48px 24px",
            overflow: "hidden",
          }}
        >
          <SimuladorSection />
          <SolucoesSection />
          <ImpactoDiaSection />
          <ProcessoSection />
          <ProtecaoContinuaSection />
        </div>
        <RedeProtegidosSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
