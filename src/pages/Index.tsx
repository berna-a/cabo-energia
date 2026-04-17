import { Navbar } from "@/components/brand/Navbar";
import { Footer } from "@/components/brand/Footer";
import { Marquee } from "@/components/brand/Marquee";
import { HeroSection } from "@/components/sections/HeroSection";
import { PainSection } from "@/components/sections/PainSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <Marquee />
        <PainSection />
        <SolutionsSection />
        <HowItWorksSection />
        <TrustSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
