"use client";

import { useParams } from "next/navigation";
import { Boxes, Package, TrendingUp } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid, ListCard } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { EmptyState } from "@/components/shared/empty-state";
import { generateBundles } from "@/lib/mock/store-features";

export default function StoreBundlesPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => {
        const bundles = generateBundles(store);
        const unitsSold = bundles.reduce((sum, b) => sum + b.unitsSold, 0);
        const revenue = bundles.reduce((sum, b) => sum + b.unitsSold * b.bundlePrice, 0);

        return (
          <FeaturePageShell title="Bundles" description="Products grouped together at a discount to raise order value.">
            {bundles.length > 0 ? (
              <div className="flex flex-col gap-5">
                <StatGrid>
                  <KpiCard label="Active bundles" value={bundles.length.toString()} icon={Boxes} />
                  <KpiCard label="Units sold" value={unitsSold.toString()} icon={Package} />
                  <KpiCard label="Bundle revenue" value={`$${revenue.toLocaleString()}`} icon={TrendingUp} />
                </StatGrid>
                <ListCard>
                  {bundles.map((bundle) => (
                    <div key={bundle.name} className="flex items-center justify-between gap-3 bg-card p-4">
                      <div className="min-w-0">
                        <p className="text-sm">{bundle.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{bundle.items.join(" + ")}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3 text-sm" dir="ltr">
                        <span className="text-xs text-muted-foreground line-through">${bundle.regularPrice}</span>
                        <span className="font-mono">${bundle.bundlePrice}</span>
                      </div>
                    </div>
                  ))}
                </ListCard>
              </div>
            ) : (
              <EmptyState icon={Boxes} title="Not enough products to bundle yet" description="Add at least two products to this store to start building bundles." />
            )}
          </FeaturePageShell>
        );
      }}
    </StoreScopedPage>
  );
}
