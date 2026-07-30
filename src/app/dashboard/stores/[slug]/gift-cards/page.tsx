"use client";

import { useParams } from "next/navigation";
import { Gift, Wallet, CheckCircle2 } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid, ListCard } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { generateGiftCards } from "@/lib/mock/store-features";
import { cn } from "@/lib/utils";

const statusStyles = {
  active: "border-success/30 bg-success-muted text-success",
  redeemed: "border-border bg-muted text-muted-foreground",
  expired: "border-destructive/30 bg-destructive/10 text-destructive",
};
const statusLabels = { active: "Active", redeemed: "Redeemed", expired: "Expired" };

export default function StoreGiftCardsPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => {
        const cards = generateGiftCards(store);
        const activeBalance = cards.filter((c) => c.status === "active").reduce((sum, c) => sum + c.balance, 0);
        const redeemed = cards.filter((c) => c.status === "redeemed").length;

        return (
          <FeaturePageShell title="Gift Cards" description="Value shoppers bought upfront, ready to redeem later.">
            <div className="flex flex-col gap-5">
              <StatGrid>
                <KpiCard label="Cards sold" value={cards.length.toString()} icon={Gift} />
                <KpiCard label="Active balance" value={`$${activeBalance.toLocaleString()}`} icon={Wallet} />
                <KpiCard label="Fully redeemed" value={redeemed.toString()} icon={CheckCircle2} />
              </StatGrid>
              <ListCard>
                {cards.map((card) => (
                  <div key={card.code} className="flex items-center justify-between gap-3 bg-card p-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="rounded-lg border border-border bg-muted px-2 py-1 font-mono text-xs">{card.code}</span>
                      <p className="text-xs text-muted-foreground" dir="ltr">
                        ${card.balance} of ${card.initialValue} left
                      </p>
                    </div>
                    <span className={cn("shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium", statusStyles[card.status])}>
                      {statusLabels[card.status]}
                    </span>
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
