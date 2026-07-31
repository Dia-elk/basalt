import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { WaitlistHero } from "@/components/marketing/waitlist-hero";
import { WaitlistFeatures } from "@/components/marketing/waitlist-features";
import { WaitlistSocial } from "@/components/marketing/waitlist-social";
import { GLSLHills } from "@/components/ui/glsl-hills";

export const metadata = {
  title: "Coming Soon | Basalt",
  description: "Something big is brewing on Basalt. Join the waitlist to be the first to know.",
};

export default function WaitlistPage() {
  return (
    <div className="relative flex min-h-screen flex-1 flex-col">
      <GLSLHills className="pointer-events-none fixed inset-0" />
      <SiteHeader transparent />
      <main className="flex-1">
        <WaitlistHero />
        <WaitlistFeatures />
        <WaitlistSocial />
      </main>
      <SiteFooter />
    </div>
  );
}
