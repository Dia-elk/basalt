"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ACCENTS, type Product, type ProductStatus } from "@/lib/mock/products";
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
}

export function ProductForm({
  initial,
  catalog,
  onSave,
  onDelete,
  saveLabel,
}: {
  initial?: Product;
  catalog: Product[];
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
  });
  const [imageUrl, setImageUrl] = useState("");

  const canSave = values.name.trim().length > 0;

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
            <Label className="text-xs text-muted-foreground">Price (USD)</Label>
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
