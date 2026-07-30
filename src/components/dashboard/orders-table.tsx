import type { Order, OrderStatus } from "@/lib/mock/orders";
import { cn } from "@/lib/utils";

const statusStyles: Record<OrderStatus, string> = {
  fulfilled: "text-success bg-success-muted border-success/30",
  pending: "text-warning bg-warning-muted border-warning/30",
  refunded: "text-muted-foreground bg-muted border-border",
};

const statusLabels: Record<OrderStatus, string> = {
  fulfilled: "Fulfilled",
  pending: "Pending",
  refunded: "Refunded",
};

export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="flex flex-col divide-y divide-border">
        {orders.map((order) => (
          <div key={order.id} className="flex flex-col gap-3 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <span className={cn("shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium", statusStyles[order.status])}>
                {statusLabels[order.status]}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm">
                  <span className="font-mono text-xs text-muted-foreground">{order.number}</span> {order.customer}
                </p>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                  <span>
                    {order.items} item{order.items === 1 ? "" : "s"}
                  </span>
                  <span dir="ltr">{order.date}</span>
                </div>
              </div>
            </div>
            <div className="shrink-0 ps-8 sm:ps-0">
              <span className="font-mono text-sm">${order.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
