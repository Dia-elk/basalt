"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { StoreCard } from "@/components/dashboard/store-card";
import { stores } from "@/lib/mock/stores";
import { useLocale } from "@/lib/i18n/locale-provider";

export default function StoresPage() {
  const activeCount = stores.filter((s) => s.status === "active").length;
  const totalRevenue = stores.reduce((sum, s) => sum + s.monthlyRevenue, 0);
  const { dict } = useLocale();
  const t = dict.dashboardStores;

  return (
    <Container className="max-w-none px-6 py-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-medium">{t.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
            {stores.length} {t.title} · {activeCount} {t.active}
          </p>
        </div>
        <Button render={<Link href="/dashboard/stores/new" />} className="gap-1.5">
          <Plus className="size-4" strokeWidth={1.5} />
          {t.createStore}
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">{t.totalStores}</p>
          <p className="mt-1 text-2xl font-semibold">{stores.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">{t.activeDeployments}</p>
          <p className="mt-1 text-2xl font-semibold text-success">{activeCount}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">{t.combinedRevenue}</p>
          <p className="mt-1 text-2xl font-semibold">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </Container>
  );
}
