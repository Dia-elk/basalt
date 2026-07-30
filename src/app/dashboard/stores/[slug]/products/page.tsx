"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Plus, Search, Package, AlertTriangle, XCircle, DollarSign } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ProductsTable } from "@/components/dashboard/products-table";
import { ProductSheet } from "@/components/dashboard/product-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmptyState } from "@/components/shared/empty-state";
import { getStoreProducts, saveStoreProducts, createProduct, type Product, type ProductStatus } from "@/lib/mock/products";
import type { Store } from "@/lib/mock/stores";

export default function StoreProductsPage() {
  const { slug } = useParams<{ slug: string }>();
  return <StoreScopedPage slug={slug}>{(store) => <ProductsWorkspace store={store} />}</StoreScopedPage>;
}

function ProductsWorkspace({ store }: { store: Store }) {
  const [products, setProducts] = useState<Product[]>(() => getStoreProducts(store));
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ProductStatus>("all");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const persist = (next: Product[]) => {
    setProducts(next);
    saveStoreProducts(store.slug, next);
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [products, search, statusFilter]);

  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 10).length;
  const outOfStock = products.filter((p) => p.status === "out-of-stock").length;
  const inventoryValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const openCreate = () => {
    setEditing(null);
    setSheetOpen(true);
  };
  const openEdit = (product: Product) => {
    setEditing(product);
    setSheetOpen(true);
  };

  const handleSave = (values: Omit<Product, "id" | "currency">) => {
    if (editing) {
      persist(products.map((p) => (p.id === editing.id ? { ...p, ...values } : p)));
      toast.success("Product updated");
    } else {
      persist([...products, createProduct(values)]);
      toast.success("Product added");
    }
  };

  const handleDelete = (product: Product) => {
    persist(products.filter((p) => p.id !== product.id));
    toast.info("Product removed", { description: `${product.name} was removed from the catalog.` });
  };

  return (
    <>
      <FeaturePageShell
        title="Products"
        description="Everything in this store's catalog, in one place."
        action={
          <Button className="gap-1.5" onClick={openCreate}>
            <Plus className="size-4" strokeWidth={1.5} />
            Add product
          </Button>
        }
      >
        <div className="flex flex-col gap-5">
          <StatGrid>
            <KpiCard label="Products" value={products.length.toString()} icon={Package} />
            <KpiCard label="Low stock" value={lowStock.toString()} icon={AlertTriangle} />
            <KpiCard label="Out of stock" value={outOfStock.toString()} icon={XCircle} />
            <KpiCard label="Inventory value" value={`$${inventoryValue.toLocaleString()}`} icon={DollarSign} />
          </StatGrid>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 start-3 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="ps-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v as "all" | ProductStatus)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="out-of-stock">Out of stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filtered.length > 0 ? (
            <ProductsTable products={filtered} onEdit={openEdit} onDelete={handleDelete} />
          ) : (
            <EmptyState
              icon={Package}
              title={products.length === 0 ? "No products yet" : "No products match your search"}
              description={
                products.length === 0
                  ? "Add your first product to start building the catalog."
                  : "Try a different search or filter."
              }
            />
          )}
        </div>
      </FeaturePageShell>

      <ProductSheet open={sheetOpen} onOpenChange={setSheetOpen} product={editing} onSave={handleSave} />
    </>
  );
}
