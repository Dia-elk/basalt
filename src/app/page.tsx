import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { HeroSection } from "@/components/marketing/hero-section";
import { LogoCloudSection } from "@/components/marketing/logo-cloud-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { ArchitectureSection } from "@/components/marketing/architecture-section";
import { AiSection } from "@/components/marketing/ai-section";
import { DeploymentSection } from "@/components/marketing/deployment-section";
import { CommerceEngineSection } from "@/components/marketing/commerce-engine-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { PricingTeaserSection } from "@/components/marketing/pricing-teaser-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SmoothScroll />
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ArchitectureSection />
        <AiSection />
        <DeploymentSection />
        <CommerceEngineSection />
        <TestimonialsSection />
        <PricingTeaserSection />
        <FaqSection />
        <LogoCloudSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
