"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { DollarSign, ShoppingCart, Receipt, Clock, Search } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { OrdersTable } from "@/components/dashboard/orders-table";
import { OrderDetailSheet } from "@/components/dashboard/order-detail-sheet";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmptyState } from "@/components/shared/empty-state";
import { getStoreOrders, saveStoreOrders, type Order, type OrderStatus } from "@/lib/mock/orders";
import type { Store } from "@/lib/mock/stores";

export default function StoreOrdersPage() {
  const { slug } = useParams<{ slug: string }>();
  return <StoreScopedPage slug={slug}>{(store) => <OrdersWorkspace store={store} />}</StoreScopedPage>;
}

function OrdersWorkspace({ store }: { store: Store }) {
  const [orders, setOrders] = useState<Order[]>(() => getStoreOrders(store));
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [selected, setSelected] = useState<Order | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const persist = (next: Order[]) => {
    setOrders(next);
    saveStoreOrders(store.slug, next);
  };

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const q = search.toLowerCase();
      const matchesSearch = o.customer.toLowerCase().includes(q) || o.number.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pending = orders.filter((o) => o.status === "pending").length;
  const avgOrderValue = orders.length > 0 ? Math.round(revenue / orders.length) : 0;

  const openOrder = (order: Order) => {
    setSelected(order);
    setSheetOpen(true);
  };

  const handleStatusChange = (order: Order, status: OrderStatus) => {
    persist(orders.map((o) => (o.id === order.id ? { ...o, status } : o)));
    setSelected((prev) => (prev && prev.id === order.id ? { ...prev, status } : prev));
    toast.success("Order updated", { description: `${order.number} marked as ${status}.` });
  };

  return (
    <>
      <FeaturePageShell title="Orders" description="Every order placed on this store, in one place.">
        {orders.length > 0 ? (
          <div className="flex flex-col gap-5">
            <StatGrid>
              <KpiCard label="Orders" value={orders.length.toString()} icon={ShoppingCart} />
              <KpiCard label="Revenue" value={`$${revenue.toLocaleString()}`} icon={DollarSign} />
              <KpiCard label="Avg. order value" value={`$${avgOrderValue}`} icon={Receipt} />
              <KpiCard label="Pending" value={pending.toString()} icon={Clock} />
            </StatGrid>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 start-3 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search orders…"
                  className="ps-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v as "all" | OrderStatus)}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="fulfilled">Fulfilled</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filtered.length > 0 ? (
              <OrdersTable orders={filtered} onSelect={openOrder} />
            ) : (
              <EmptyState icon={ShoppingCart} title="No orders match your search" description="Try a different search or filter." />
            )}
          </div>
        ) : (
          <EmptyState
            icon={ShoppingCart}
            title="No orders yet"
            description="Orders will show up here as soon as this store makes its first sale."
          />
        )}
      </FeaturePageShell>

      <OrderDetailSheet open={sheetOpen} onOpenChange={setSheetOpen} order={selected} onStatusChange={handleStatusChange} />
    </>
  );
}
