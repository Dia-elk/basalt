"use client";

import { useParams } from "next/navigation";
import { Percent, LogOut, Clock, Repeat } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { generateEngagementStats } from "@/lib/mock/store-features";
import { generateTrafficBreakdown } from "@/lib/mock/analytics";

export default function StoreAnalyticsPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => {
        const engagement = generateEngagementStats(store);
        const traffic = generateTrafficBreakdown(store.id);

        return (
          <FeaturePageShell title="Analytics" description="How shoppers actually behave once they land on this store.">
            <div className="flex flex-col gap-5">
              <StatGrid>
                <KpiCard label="Conversion rate" value={`${engagement.conversionRate}%`} icon={Percent} />
                <KpiCard label="Bounce rate" value={`${engagement.bounceRate}%`} icon={LogOut} />
                <KpiCard label="Avg. session" value={engagement.avgSession} icon={Clock} />
                <KpiCard label="Returning visitors" value={`${engagement.returningVisitors}%`} icon={Repeat} />
              </StatGrid>

              <div className="rounded-2xl border border-border bg-card p-4">
                <h3 className="mb-4 text-sm font-medium">Traffic by channel</h3>
                <div className="flex flex-col gap-4">
                  {traffic.map((t) => (
                    <div key={t.channel} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span>{t.channel}</span>
                        <span className="text-muted-foreground">{t.value}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-success" style={{ width: `${t.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FeaturePageShell>
        );
      }}
    </StoreScopedPage>
  );
}
