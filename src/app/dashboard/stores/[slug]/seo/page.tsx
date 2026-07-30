"use client";

import { useParams } from "next/navigation";
import { Search, MousePointerClick, TrendingUp } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid, ListCard } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { generateSeoQueries } from "@/lib/mock/store-features";

export default function StoreSeoPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => {
        const queries = generateSeoQueries(store);
        const totalClicks = queries.reduce((sum, q) => sum + q.clicks, 0);
        const avgPosition = queries.reduce((sum, q) => sum + q.position, 0) / queries.length;

        return (
          <FeaturePageShell title="SEO" description="How this store shows up in search, without paying for ads.">
            <div className="flex flex-col gap-5">
              <StatGrid>
                <KpiCard label="Organic clicks" value={totalClicks.toLocaleString()} icon={MousePointerClick} />
                <KpiCard label="Avg. position" value={avgPosition.toFixed(1)} icon={TrendingUp} />
                <KpiCard label="Queries tracked" value={queries.length.toString()} icon={Search} />
              </StatGrid>
              <ListCard>
                {queries.map((q) => (
                  <div key={q.query} className="flex items-center justify-between gap-3 bg-card p-4">
                    <p className="truncate text-sm">{q.query}</p>
                    <div className="flex shrink-0 items-center gap-4 text-xs text-muted-foreground" dir="ltr">
                      <span>{q.clicks} clicks</span>
                      <span>pos. {q.position}</span>
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
