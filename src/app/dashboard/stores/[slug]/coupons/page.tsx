"use client";

import { useParams } from "next/navigation";
import { Tag, Percent, Ticket } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid, ListCard } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { generateCoupons } from "@/lib/mock/store-features";
import { cn } from "@/lib/utils";

export default function StoreCouponsPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => {
        const coupons = generateCoupons(store);
        const active = coupons.filter((c) => c.status === "active").length;
        const redemptions = coupons.reduce((sum, c) => sum + c.redemptions, 0);

        return (
          <FeaturePageShell title="Coupons" description="Promo codes and discounts running on this store.">
            <div className="flex flex-col gap-5">
              <StatGrid>
                <KpiCard label="Active coupons" value={active.toString()} icon={Tag} />
                <KpiCard label="Redemptions" value={redemptions.toLocaleString()} icon={Ticket} />
                <KpiCard label="Total codes" value={coupons.length.toString()} icon={Percent} />
              </StatGrid>
              <ListCard>
                {coupons.map((coupon) => (
                  <div key={coupon.code} className="flex items-center justify-between gap-3 bg-card p-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="rounded-lg border border-border bg-muted px-2 py-1 font-mono text-xs">{coupon.code}</span>
                      <p className="text-sm text-muted-foreground">
                        {coupon.type === "percent" ? `${coupon.value}% off` : `$${coupon.value} off`}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-xs text-muted-foreground" dir="ltr">
                        {coupon.redemptions} / {coupon.limit} used
                      </span>
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                          coupon.status === "active"
                            ? "border-success/30 bg-success-muted text-success"
                            : "border-border bg-muted text-muted-foreground"
                        )}
                      >
                        {coupon.status === "active" ? "Active" : "Expired"}
                      </span>
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
