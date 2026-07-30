"use client";

import { useParams } from "next/navigation";
import { Package, AlertTriangle, XCircle } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid, ListCard } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { generateProducts, type ProductStatus } from "@/lib/mock/products";
import { cn } from "@/lib/utils";

const statusStyles: Record<ProductStatus, string> = {
  active: "border-success/30 bg-success-muted text-success",
  draft: "border-border bg-muted text-muted-foreground",
  "out-of-stock": "border-destructive/30 bg-destructive/10 text-destructive",
};
const statusLabels: Record<ProductStatus, string> = {
  active: "In stock",
  draft: "Draft",
  "out-of-stock": "Out of stock",
};

export default function StoreInventoryPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => {
        const products = generateProducts(store);
        const lowStock = products.filter((p) => p.stock > 0 && p.stock < 10).length;
        const outOfStock = products.filter((p) => p.status === "out-of-stock").length;

        return (
          <FeaturePageShell title="Inventory" description="Stock levels across every product, tracked automatically.">
            <div className="flex flex-col gap-5">
              <StatGrid>
                <KpiCard label="SKUs tracked" value={products.length.toString()} icon={Package} />
                <KpiCard label="Low stock" value={lowStock.toString()} icon={AlertTriangle} />
                <KpiCard label="Out of stock" value={outOfStock.toString()} icon={XCircle} />
              </StatGrid>
              <ListCard>
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between gap-3 bg-card p-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: product.accent }} />
                      <div className="min-w-0">
                        <p className="truncate text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground" dir="ltr">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-xs text-muted-foreground" dir="ltr">
                        {product.stock} in stock
                      </span>
                      <span className={cn("rounded-full border px-2.5 py-1 text-[11px] font-medium", statusStyles[product.status])}>
                        {statusLabels[product.status]}
                      </span>
                    </div>
                  </div>
                ))}
              </ListCard>
            </div>
          </FeaturePageShell>
        );
      }}
    </StoreScopedPage>
  );
}
