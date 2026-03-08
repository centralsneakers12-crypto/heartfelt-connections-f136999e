import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Particles from "@/components/Particles";
import HeroSection from "@/components/HeroSection";
import DemoVideoSection from "@/components/DemoVideoSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import MotivationSection from "@/components/MotivationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import BonusSection from "@/components/BonusSection";
import FinalCTASection from "@/components/FinalCTASection";
import WhatsAppButton from "@/components/WhatsAppButton";
import SupportCard from "@/components/SupportCard";
import SocialProofNotification from "@/components/SocialProofNotification";


const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <WhatsAppButton />
      <Particles />
      <TopBanner />
      <Navbar />
      <HeroSection />
      <DemoVideoSection />
      
      <WhyChooseSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <FreeTrialButton />
      <TargetAudienceSection />
      <GuaranteeSection />
      <MotivationSection />
      <TestimonialsSection />
      <FAQSection />
      <BonusSection />
      <SupportCard />
      <FinalCTASection />

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground relative z-10">
        <div className="container mx-auto px-4">
          <p>© 2024 LovaZero. Todos os direitos reservados.</p>
        </div>
      </footer>
      <SocialProofNotification />
    </div>
  );
};

export default Index;
