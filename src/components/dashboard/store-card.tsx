"use client";

import Link from "next/link";
import { ExternalLink, MapPin, Globe, TrendingUp, TrendingDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoreLogo } from "@/components/shared/store-logo";
import { StatusBadge, AiStatusBadge } from "@/components/shared/status-badge";
import type { Store } from "@/lib/mock/stores";
import { useLocale } from "@/lib/i18n/locale-provider";

const visitorFormatter = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });

export function StoreCard({ store }: { store: Store }) {
  const isRevenueUp = store.revenueChange >= 0;
  const TrendIcon = isRevenueUp ? TrendingUp : TrendingDown;
  const { dict } = useLocale();
  const t = dict.dashboardStores;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/15">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.12]"
        style={{ background: `linear-gradient(180deg, ${store.accent}, transparent)` }}
      />

      <div className="relative flex flex-col gap-5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <StoreLogo logoUrl={store.logoUrl} name={store.name} size="lg" />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[15px] font-medium">{store.name}</h3>
              <p className="text-xs text-muted-foreground">{store.businessType}</p>
            </div>
          </div>
          <StatusBadge status={store.status} className="shrink-0" />
        </div>

        <div className="flex items-center gap-5 rounded-xl border border-border bg-background/60 px-4 py-3">
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-[11px] text-muted-foreground">{t.monthlyRevenue}</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-lg font-semibold tabular-nums">
                ${store.monthlyRevenue.toLocaleString()}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                  isRevenueUp ? "text-success" : "text-destructive"
                }`}
              >
                <TrendIcon className="size-3" strokeWidth={2} />
                {Math.abs(store.revenueChange)}%
              </span>
            </div>
          </div>
          <div className="h-8 w-px shrink-0 bg-border" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-muted-foreground">{t.visitors}</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-lg font-semibold tabular-nums">
              <Users className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
              {visitorFormatter.format(store.visitors)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Globe className="size-3.5" strokeWidth={1.5} />
            {store.domain}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" strokeWidth={1.5} />
            {store.region}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-muted-foreground">{t.lastDeployment}</span>
            <span className="text-xs" dir="ltr">{store.lastDeployedAt}</span>
          </div>
          <AiStatusBadge status={store.aiStatus} />
        </div>

        <div className="flex items-center gap-2">
          <Button render={<Link href={`/dashboard/stores/${store.slug}`} />} size="sm" className="flex-1">
            {t.openDashboard}
          </Button>
          <Button
            render={<a href={`https://${store.domain}`} target="_blank" rel="noopener noreferrer" />}
            size="sm"
            variant="outline"
            className="gap-1.5"
          >
            {t.website}
            <ExternalLink className="size-3.5" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
}
