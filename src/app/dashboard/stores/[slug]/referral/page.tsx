"use client";

import { useParams } from "next/navigation";
import { Share2, Users, DollarSign } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid, ListCard } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { generateReferrers } from "@/lib/mock/store-features";

export default function StoreReferralPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => {
        const referrers = generateReferrers(store);
        const totalInvites = referrers.reduce((sum, r) => sum + r.invites, 0);
        const totalRewards = referrers.reduce((sum, r) => sum + r.rewardEarned, 0);

        return (
          <FeaturePageShell title="Referral" description="Customers who brought in friends, and what they earned for it.">
            <div className="flex flex-col gap-5">
              <StatGrid>
                <KpiCard label="Active referrers" value={referrers.length.toString()} icon={Share2} />
                <KpiCard label="Invites sent" value={totalInvites.toString()} icon={Users} />
                <KpiCard label="Rewards paid" value={`$${totalRewards.toLocaleString()}`} icon={DollarSign} />
              </StatGrid>
              <ListCard>
                {referrers.map((referrer) => (
                  <div key={referrer.email} className="flex items-center justify-between gap-3 bg-card p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm">{referrer.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{referrer.email}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4 text-xs text-muted-foreground" dir="ltr">
                      <span>{referrer.converted} / {referrer.invites} converted</span>
                      <span className="font-mono text-foreground">${referrer.rewardEarned}</span>
                    </div>
                  </div>
                ))}
              </ListCard>
            </div>
          </FeaturePageShell>
        );
      }}
    </StoreScopedPage>
  );
}
