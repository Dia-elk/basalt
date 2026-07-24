import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { WaitlistHero } from "@/components/marketing/waitlist-hero";
import { WaitlistFeatures } from "@/components/marketing/waitlist-features";
import { WaitlistSocial } from "@/components/marketing/waitlist-social";

export const metadata = {
  title: "Coming Soon | Basalt",
  description: "Something big is brewing on Basalt. Join the waitlist to be the first to know.",
};

export default function WaitlistPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <WaitlistHero />
        <WaitlistFeatures />
        <WaitlistSocial />
      </main>
      <SiteFooter />
    </div>
  );
}
