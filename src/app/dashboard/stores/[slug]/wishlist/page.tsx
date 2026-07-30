"use client";

import { useParams } from "next/navigation";
import { Heart, Users, Package } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid, ListCard } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { EmptyState } from "@/components/shared/empty-state";
import { generateWishlist } from "@/lib/mock/store-features";

export default function StoreWishlistPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => {
        const entries = generateWishlist(store);
        const totalSaves = entries.reduce((sum, e) => sum + e.saves, 0);

        return (
          <FeaturePageShell title="Wishlist" description="Products shoppers saved for later instead of leaving for good.">
            {entries.length > 0 ? (
              <div className="flex flex-col gap-5">
                <StatGrid>
                  <KpiCard label="Total saves" value={totalSaves.toLocaleString()} icon={Heart} />
                  <KpiCard label="Products saved" value={entries.length.toString()} icon={Package} />
                  <KpiCard label="Most saved" value={entries[0].productName} icon={Users} />
                </StatGrid>
                <ListCard>
                  {entries.map((entry) => (
                    <div key={entry.productName} className="flex items-center justify-between gap-3 bg-card p-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: entry.accent }} />
                        <p className="truncate text-sm">{entry.productName}</p>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {entry.saves} save{entry.saves === 1 ? "" : "s"}
                      </span>
                    </div>
                  ))}
                </ListCard>
              </div>
            ) : (
              <EmptyState icon={Heart} title="No wishlist activity yet" description="Saved products will show up here once shoppers start using the wishlist." />
            )}
          </FeaturePageShell>
        );
      }}
    </StoreScopedPage>
  );
}
