"use client";

import { useParams } from "next/navigation";
import { Mail, Users, MousePointerClick } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid, ListCard } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { generateCampaigns } from "@/lib/mock/store-features";

export default function StoreNewsletterPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => {
        const campaigns = generateCampaigns(store);
        const subscribers = Math.round(store.visitors * 0.12);
        const avgOpenRate = Math.round(campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length);

        return (
          <FeaturePageShell title="Newsletter" description="Emails collected at checkout and on-site, and how they perform.">
            <div className="flex flex-col gap-5">
              <StatGrid>
                <KpiCard label="Subscribers" value={subscribers.toLocaleString()} icon={Users} />
                <KpiCard label="Avg. open rate" value={`${avgOpenRate}%`} icon={Mail} />
                <KpiCard label="Campaigns sent" value={campaigns.length.toString()} icon={MousePointerClick} />
              </StatGrid>
              <ListCard>
                {campaigns.map((campaign) => (
                  <div key={campaign.subject} className="flex items-center justify-between gap-3 bg-card p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm">{campaign.subject}</p>
                      <p className="text-xs text-muted-foreground" dir="ltr">
                        Sent {campaign.sentAt}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4 text-xs text-muted-foreground" dir="ltr">
                      <span>{campaign.openRate}% open</span>
                      <span>{campaign.clickRate}% click</span>
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
