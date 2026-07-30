"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { ACCENTS, type Product, type ProductStatus } from "@/lib/mock/products";
import { cn } from "@/lib/utils";

type ProductDraft = Omit<Product, "id" | "currency">;

const EMPTY_PRODUCT: ProductDraft = { name: "", price: 0, stock: 0, status: "active", accent: ACCENTS[0] };

export function ProductSheet({
  open,
  onOpenChange,
  product,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSave: (values: ProductDraft) => void;
}) {
  const [values, setValues] = useState<ProductDraft>(EMPTY_PRODUCT);

  useEffect(() => {
    if (!open) return;
    setValues(
      product
        ? { name: product.name, price: product.price, stock: product.stock, status: product.status, accent: product.accent }
        : EMPTY_PRODUCT
    );
  }, [open, product]);

  const canSave = values.name.trim().length > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>{product ? "Edit product" : "Add product"}</SheetTitle>
          <SheetDescription>
            {product ? "Update this product's details." : "Add a new product to the catalog."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Name</Label>
            <Input
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              placeholder="Product name"
              maxLength={60}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">Price (USD)</Label>
              <Input
                type="number"
                min={0}
                value={values.price}
                onChange={(e) => setValues((v) => ({ ...v, price: Math.max(0, Number(e.target.value) || 0) }))}
                dir="ltr"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">Stock</Label>
              <Input
                type="number"
                min={0}
                value={values.stock}
                onChange={(e) => setValues((v) => ({ ...v, stock: Math.max(0, Number(e.target.value) || 0) }))}
                dir="ltr"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Status</Label>
            <Select
              value={values.status}
              onValueChange={(v) => v && setValues((prev) => ({ ...prev, status: v as ProductStatus }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="out-of-stock">Out of stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Accent color</Label>
            <div className="flex flex-wrap gap-2">
              {ACCENTS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setValues((v) => ({ ...v, accent: color }))}
                  className={cn(
                    "size-7 rounded-full border-2 transition-transform",
                    values.accent === color ? "scale-110 border-foreground" : "border-transparent"
                  )}
                  style={{ backgroundColor: color }}
                  aria-label={color}
                />
              ))}
            </div>
          </div>
        </div>

        <SheetFooter>
          <Button
            disabled={!canSave}
            onClick={() => {
              onSave(values);
              onOpenChange(false);
            }}
          >
            {product ? "Save changes" : "Add product"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
