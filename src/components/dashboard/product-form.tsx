"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ACCENTS,
  generateVariants,
  type Product,
  type ProductStatus,
  type ProductVariant,
  type ProductVariantOption,
} from "@/lib/mock/products";
import { currencySymbol } from "@/lib/currency";
import { cn } from "@/lib/utils";

export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  stock: number;
  status: ProductStatus;
  accent: string;
  images: string[];
  relatedProductIds: string[];
  options: ProductVariantOption[];
  variants: ProductVariant[];
}

export function ProductForm({
  initial,
  catalog,
  currency,
  onSave,
  onDelete,
  saveLabel,
}: {
  initial?: Product;
  catalog: Product[];
  currency: string;
  onSave: (values: ProductFormValues) => void;
  onDelete?: () => void;
  saveLabel: string;
}) {
  const [values, setValues] = useState<ProductFormValues>({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    price: initial?.price ?? 0,
    stock: initial?.stock ?? 0,
    status: initial?.status ?? "active",
    accent: initial?.accent ?? ACCENTS[0],
    images: initial?.images ?? [],
    relatedProductIds: initial?.relatedProductIds ?? [],
    options: initial?.options ?? [],
    variants: initial?.variants ?? [],
  });
  const [imageUrl, setImageUrl] = useState("");
  const [optionName, setOptionName] = useState("");
  const [optionValues, setOptionValues] = useState("");

  const canSave = values.name.trim().length > 0;
  const symbol = currencySymbol(currency);

  const addImage = () => {
    const url = imageUrl.trim();
    if (!url) return;
    setValues((v) => ({ ...v, images: [...v.images, url] }));
    setImageUrl("");
  };
  const removeImage = (index: number) => setValues((v) => ({ ...v, images: v.images.filter((_, i) => i !== index) }));

  const toggleRelated = (id: string) => {
    setValues((v) => ({
      ...v,
      relatedProductIds: v.relatedProductIds.includes(id)
        ? v.relatedProductIds.filter((r) => r !== id)
        : [...v.relatedProductIds, id],
    }));
  };

  const addOption = () => {
    const name = optionName.trim();
    const vals = Array.from(new Set(optionValues.split(",").map((val) => val.trim()).filter(Boolean)));
    if (!name || vals.length === 0 || values.options.some((o) => o.name === name)) return;
    const nextOptions = [...values.options, { name, values: vals }];
    setValues((v) => ({ ...v, options: nextOptions, variants: generateVariants(nextOptions, v.variants) }));
    setOptionName("");
    setOptionValues("");
  };

  const removeOption = (name: string) => {
    const nextOptions = values.options.filter((o) => o.name !== name);
    setValues((v) => ({ ...v, options: nextOptions, variants: generateVariants(nextOptions, v.variants) }));
  };

  const updateVariant = (id: string, patch: Partial<ProductVariant>) => {
    setValues((v) => ({ ...v, variants: v.variants.map((variant) => (variant.id === id ? { ...variant, ...patch } : variant)) }));
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Name</Label>
            <Input
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              placeholder="Product name"
              maxLength={80}
            />
          </div>
          <div className="mt-4 flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Description</Label>
            <Textarea
              value={values.description}
              onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
              placeholder="What makes this product worth buying?"
              rows={5}
              maxLength={600}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <Label className="text-xs text-muted-foreground">Images</Label>
          <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {values.images.map((src, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary merchant-entered URLs, not a next/image-allowlisted host */}
                <img src={src} alt="" className="size-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 end-1 flex size-6 items-center justify-center rounded-md bg-background/90 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                  aria-label="Remove image"
                >
                  <X className="size-3.5" strokeWidth={1.5} />
                </button>
              </div>
            ))}
            <div
              className="aspect-square rounded-lg border border-dashed border-border"
              style={{ background: `linear-gradient(135deg, ${values.accent}, ${values.accent}66)` }}
            />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://…"
              dir="ltr"
              className="h-9 flex-1 text-xs"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addImage();
                }
              }}
            />
            <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={addImage}>
              <Plus className="size-3.5" strokeWidth={1.5} />
              Add
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            The gradient tile is the fallback shown everywhere else while there&apos;s no photo.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <Label className="text-xs text-muted-foreground">Variants</Label>
          <p className="mt-1 text-xs text-muted-foreground">
            Add options like size or color to sell more than one version of this product.
          </p>

          {values.options.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {values.options.map((opt) => (
                <div key={opt.name} className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{opt.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{opt.values.join(", ")}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeOption(opt.name)}
                    className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    aria-label={`Remove ${opt.name}`}
                  >
                    <X className="size-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <Input
              value={optionName}
              onChange={(e) => setOptionName(e.target.value)}
              placeholder="Option (e.g. Size)"
              className="h-9 text-xs sm:w-36"
            />
            <Input
              value={optionValues}
              onChange={(e) => setOptionValues(e.target.value)}
              placeholder="Values, comma separated (S, M, L)"
              className="h-9 flex-1 text-xs"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addOption();
                }
              }}
            />
            <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={addOption}>
              <Plus className="size-3.5" strokeWidth={1.5} />
              Add option
            </Button>
          </div>

          {values.variants.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-3 px-1 pb-1.5 text-xs text-muted-foreground">
                <span className="flex-1">Variant</span>
                <span className="w-20 text-center">Stock</span>
                <span className="w-24 text-center">Price</span>
              </div>
              <div className="overflow-hidden rounded-lg border border-border">
                <div className="flex flex-col divide-y divide-border">
                  {values.variants.map((variant) => (
                    <div key={variant.id} className="flex items-center gap-3 bg-background p-2.5">
                      <p className="min-w-0 flex-1 truncate text-sm">{Object.values(variant.optionValues).join(" / ")}</p>
                      <Input
                        type="number"
                        min={0}
                        value={variant.stock}
                        onChange={(e) => updateVariant(variant.id, { stock: Math.max(0, Number(e.target.value) || 0) })}
                        className="h-8 w-20 text-xs"
                        dir="ltr"
                      />
                      <Input
                        type="number"
                        min={0}
                        value={variant.price ?? ""}
                        onChange={(e) =>
                          updateVariant(variant.id, { price: e.target.value ? Math.max(0, Number(e.target.value)) : undefined })
                        }
                        placeholder={`${symbol}${values.price}`}
                        className="h-8 w-24 text-xs"
                        dir="ltr"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Leave a variant&apos;s price blank to use the base price above.
              </p>
            </div>
          )}
        </div>

        {catalog.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-5">
            <Label className="text-xs text-muted-foreground">Related products</Label>
            <p className="mt-1 text-xs text-muted-foreground">Shown as cross-sells alongside this product.</p>
            <div className="mt-3 flex flex-col gap-0.5">
              {catalog.map((p) => (
                <label
                  key={p.id}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-accent"
                >
                  <input
                    type="checkbox"
                    checked={values.relatedProductIds.includes(p.id)}
                    onChange={() => toggleRelated(p.id)}
                    className="size-4 rounded border-border accent-success"
                  />
                  <span className="size-4 shrink-0 rounded" style={{ backgroundColor: p.accent }} />
                  {p.name}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Price ({currency})</Label>
            <Input
              type="number"
              min={0}
              value={values.price}
              onChange={(e) => setValues((v) => ({ ...v, price: Math.max(0, Number(e.target.value) || 0) }))}
              dir="ltr"
            />
          </div>
          <div className="mt-4 flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Stock</Label>
            <Input
              type="number"
              min={0}
              value={values.stock}
              onChange={(e) => setValues((v) => ({ ...v, stock: Math.max(0, Number(e.target.value) || 0) }))}
              dir="ltr"
            />
          </div>
          <div className="mt-4 flex flex-col gap-1.5">
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
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <Label className="text-xs text-muted-foreground">Accent color</Label>
          <div className="mt-2 flex flex-wrap gap-2">
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

        <Button disabled={!canSave} onClick={() => onSave(values)} className="w-full">
          {saveLabel}
        </Button>
        {onDelete && (
          <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive" onClick={onDelete}>
            <Trash2 className="size-4" strokeWidth={1.5} />
            Delete product
          </Button>
        )}
      </div>
    </div>
  );
}
