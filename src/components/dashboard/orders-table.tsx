"use client";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Order, OrderStatus } from "@/lib/mock/orders";

const statusVariant: Record<OrderStatus, "secondary" | "outline" | "destructive"> = {
  fulfilled: "secondary",
  pending: "outline",
  refunded: "destructive",
};
const statusLabel: Record<OrderStatus, string> = { fulfilled: "Fulfilled", pending: "Pending", refunded: "Refunded" };

export function OrdersTable({ orders, onSelect }: { orders: Order[]; onSelect: (order: Order) => void }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-4">Order</TableHead>
            <TableHead>Status</TableHead>
            <TableHead dir="ltr">Items</TableHead>
            <TableHead dir="ltr">Total</TableHead>
            <TableHead className="pr-4">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="cursor-pointer" onClick={() => onSelect(order)}>
              <TableCell className="pl-4">
                <p className="font-mono text-xs text-muted-foreground" dir="ltr">
                  {order.number}
                </p>
                <p className="font-medium">{order.customer}</p>
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant[order.status]}>{statusLabel[order.status]}</Badge>
              </TableCell>
              <TableCell dir="ltr">{order.items}</TableCell>
              <TableCell className="font-mono text-xs" dir="ltr">
                ${order.total}
              </TableCell>
              <TableCell className="pr-4 text-muted-foreground" dir="ltr">
                {order.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
