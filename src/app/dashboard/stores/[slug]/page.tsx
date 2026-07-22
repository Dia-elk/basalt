"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Users, Percent, ShoppingBag, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/shared/container";
import { StoreLogo } from "@/components/shared/store-logo";
import { StatusBadge, AiStatusBadge } from "@/components/shared/status-badge";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { useStore } from "@/hooks/use-store";
import { generateRevenueSeries, generateTrafficBreakdown, generateTopProducts } from "@/lib/mock/analytics";

export default function StoreOverviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const { store, loading } = useStore(slug);

  if (loading) {
    return (
      <Container className="max-w-none px-6 py-6 lg:px-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-6 h-40 w-full" />
      </Container>
    );
  }

  if (!store) {
    return (
      <Container className="max-w-none px-6 py-16 text-center lg:px-8">
        <p className="text-lg font-medium">Store not found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          This store doesn&rsquo;t exist, or your session data was cleared.
        </p>
        <Button render={<Link href="/dashboard" />} className="mt-6">
          Back to Stores
        </Button>
      </Container>
    );
  }

  const hasRevenue = store.monthlyRevenue > 0;
  const revenueSeries = generateRevenueSeries(store.id, 30, store.monthlyRevenue || 8000);
  const traffic = generateTrafficBreakdown(store.id);
  const topProducts = generateTopProducts(store.id, store.businessType);
  const conversionRate = (2.1 + (revenueSeries.length % 7) * 0.15).toFixed(1);
  const avgOrderValue = hasRevenue ? Math.round(store.monthlyRevenue / (store.visitors * 0.03 || 1)) : 0;

  return (
    <Container className="max-w-none px-6 py-6 lg:px-8">
      <Link
        href="/dashboard"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground lg:hidden"
      >
        <ArrowLeft className="size-3.5" strokeWidth={1.5} />
        All stores
      </Link>

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3.5">
          <StoreLogo businessType={store.businessType} accent={store.accent} size="lg" />
          <div>
            <h1 className="text-xl font-medium">{store.name}</h1>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{store.businessType}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" strokeWidth={1.5} />
                {store.region}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={store.status} />
          <AiStatusBadge status={store.aiStatus} />
          <Button
            render={<a href={`https://${store.domain}`} target="_blank" rel="noopener noreferrer" />}
            variant="outline"
            size="sm"
            className="gap-1.5"
          >
            Website
            <ExternalLink className="size-3.5" strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {hasRevenue ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <KpiCard label="Monthly revenue" value={`$${store.monthlyRevenue.toLocaleString()}`} change={store.revenueChange} icon={DollarSign} />
              <KpiCard label="Visitors" value={store.visitors.toLocaleString()} change={4.2} icon={Users} />
              <KpiCard label="Conversion rate" value={`${conversionRate}%`} change={1.1} icon={Percent} />
              <KpiCard label="Avg. order value" value={`$${avgOrderValue}`} change={-0.6} icon={ShoppingBag} />
            </div>

            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Revenue</h3>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </div>
              </div>
              <RevenueChart data={revenueSeries} />
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
              <div className="rounded-2xl border border-border bg-card p-4 lg:col-span-2">
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

              <div className="rounded-2xl border border-border bg-card p-4 lg:col-span-3">
                <h3 className="mb-4 text-sm font-medium">Top products</h3>
                <div className="flex flex-col divide-y divide-border">
                  {topProducts.map((p) => (
                    <div key={p.name} className="flex items-center justify-between py-2.5 text-sm">
                      <div>
                        <p>{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.units} units sold</p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        ${p.revenue.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-card p-14 text-center">
            <p className="text-sm font-medium">No orders yet</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Analytics will appear here as soon as your first sale comes in. Your storefront is live and ready to accept orders.
            </p>
          </div>
        )}

        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-4 text-sm font-medium">Store details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground">Domain</p>
              <p className="mt-1 font-mono text-xs" dir="ltr">{store.domain}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Languages</p>
              <p className="mt-1" dir="ltr">{store.languages.join(", ").toUpperCase()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last deployment</p>
              <p className="mt-1" dir="ltr">{store.lastDeployedAt}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="mt-1" dir="ltr">{store.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
