"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import type { Customer } from "@/lib/mock/customers";
import type { Order } from "@/lib/mock/orders";

type CustomerDraft = { name: string; email: string; location: string };
const EMPTY_CUSTOMER: CustomerDraft = { name: "", email: "", location: "" };

export function CustomerSheet({
  open,
  onOpenChange,
  customer,
  orders,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
  orders: Order[];
  onSave: (values: CustomerDraft) => void;
}) {
  const [values, setValues] = useState<CustomerDraft>(EMPTY_CUSTOMER);

  useEffect(() => {
    if (!open) return;
    setValues(customer ? { name: customer.name, email: customer.email, location: customer.location } : EMPTY_CUSTOMER);
  }, [open, customer]);

  const canSave = values.name.trim().length > 0 && values.email.trim().length > 0;
  const customerOrders = customer ? orders.filter((o) => o.email === customer.email) : [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>{customer ? "Edit customer" : "Add customer"}</SheetTitle>
          <SheetDescription>
            {customer ? "Update this customer's details." : "Add a customer record manually."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Name</Label>
            <Input value={values.name} onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} placeholder="Full name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Email</Label>
            <Input
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              placeholder="name@email.com"
              dir="ltr"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Location</Label>
            <Input
              value={values.location}
              onChange={(e) => setValues((v) => ({ ...v, location: e.target.value }))}
              placeholder="City, Country"
            />
          </div>

          {customer && (
            <>
              <Separator />
              <div>
                <p className="mb-2 text-xs text-muted-foreground">Order history</p>
                {customerOrders.length > 0 ? (
                  <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
                    {customerOrders.map((o) => (
                      <div key={o.id} className="flex items-center justify-between px-3 py-2 text-sm">
                        <span className="font-mono text-xs text-muted-foreground">{o.number}</span>
                        <span dir="ltr">${o.total}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No orders yet from this customer.</p>
                )}
              </div>
            </>
          )}
        </div>

        <SheetFooter>
          <Button
            disabled={!canSave}
            onClick={() => {
              onSave(values);
              onOpenChange(false);
            }}
          >
            {customer ? "Save changes" : "Add customer"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
