"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import type { Order, OrderStatus } from "@/lib/mock/orders";

export function OrderDetailSheet({
  open,
  onOpenChange,
  order,
  onStatusChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
  onStatusChange: (order: Order, status: OrderStatus) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        {order && (
          <>
            <SheetHeader>
              <SheetTitle dir="ltr">{order.number}</SheetTitle>
              <SheetDescription dir="ltr">{order.date}</SheetDescription>
            </SheetHeader>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
              <div>
                <p className="text-xs text-muted-foreground">Customer</p>
                <p className="mt-1 text-sm font-medium">{order.customer}</p>
                <p className="text-xs text-muted-foreground" dir="ltr">
                  {order.email}
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Items</p>
                  <p className="mt-1 text-sm" dir="ltr">
                    {order.items}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="mt-1 font-mono text-sm" dir="ltr">
                    ${order.total}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-muted-foreground">Status</Label>
                <Select value={order.status} onValueChange={(v) => v && onStatusChange(order, v as OrderStatus)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="fulfilled">Fulfilled</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
