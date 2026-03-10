import { lazy, Suspense } from "react";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Particles from "@/components/Particles";
import HeroSection from "@/components/HeroSection";

// Lazy load heavy sections below the fold
const DemoVideoSection = lazy(() => import("@/components/DemoVideoSection"));
const WhyChooseSection = lazy(() => import("@/components/WhyChooseSection"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const TargetAudienceSection = lazy(() => import("@/components/TargetAudienceSection"));
const GuaranteeSection = lazy(() => import("@/components/GuaranteeSection"));
const MotivationSection = lazy(() => import("@/components/MotivationSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const BonusSection = lazy(() => import("@/components/BonusSection"));
const FinalCTASection = lazy(() => import("@/components/FinalCTASection"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const SupportCard = lazy(() => import("@/components/SupportCard"));
const SocialProofNotification = lazy(() => import("@/components/SocialProofNotification"));

const SectionFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
      <Particles />
      <TopBanner />
      <Navbar />
      <HeroSection />
      
      <Suspense fallback={<SectionFallback />}>
        <DemoVideoSection />
        <WhyChooseSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <TargetAudienceSection />
        <GuaranteeSection />
        <MotivationSection />
        <TestimonialsSection />
        <FAQSection />
        <BonusSection />
        <SupportCard />
        <FinalCTASection />
      </Suspense>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground relative z-10">
        <div className="container mx-auto px-4">
          <p>© 2024 LovaZero — Extensão Lovable Ilimitado | Lovable Sem Gastar Créditos. Todos os direitos reservados.</p>
        </div>
      </footer>
      
      <Suspense fallback={null}>
        <SocialProofNotification />
      </Suspense>
    </div>
  );
};

export default Index;
