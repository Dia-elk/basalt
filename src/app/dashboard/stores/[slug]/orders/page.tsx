"use client";

import { useParams } from "next/navigation";
import { DollarSign, ShoppingCart, Receipt, Clock } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { OrdersTable } from "@/components/dashboard/orders-table";
import { EmptyState } from "@/components/shared/empty-state";
import { generateOrders } from "@/lib/mock/orders";

export default function StoreOrdersPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => {
        const orders = store.monthlyRevenue > 0 ? generateOrders(store.id, store.businessType) : [];
        const revenue = orders.reduce((sum, o) => sum + o.total, 0);
        const pending = orders.filter((o) => o.status === "pending").length;
        const avgOrderValue = orders.length > 0 ? Math.round(revenue / orders.length) : 0;

        return (
          <FeaturePageShell title="Orders" description="Every order placed on this store, in one place.">
            {orders.length > 0 ? (
              <div className="flex flex-col gap-5">
                <StatGrid>
                  <KpiCard label="Orders" value={orders.length.toString()} icon={ShoppingCart} />
                  <KpiCard label="Revenue" value={`$${revenue.toLocaleString()}`} icon={DollarSign} />
                  <KpiCard label="Avg. order value" value={`$${avgOrderValue}`} icon={Receipt} />
                  <KpiCard label="Pending" value={pending.toString()} icon={Clock} />
                </StatGrid>
                <OrdersTable orders={orders} />
              </div>
            ) : (
              <EmptyState
                icon={ShoppingCart}
                title="No orders yet"
                description="Orders will show up here as soon as this store makes its first sale."
              />
            )}
          </FeaturePageShell>
        );
      }}
    </StoreScopedPage>
  );
}
