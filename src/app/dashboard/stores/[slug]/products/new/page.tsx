"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell } from "@/components/dashboard/feature-page-shell";
import { ProductForm, type ProductFormValues } from "@/components/dashboard/product-form";
import { getStoreProducts, saveStoreProducts, createProduct } from "@/lib/mock/products";
import type { Store } from "@/lib/mock/stores";

export default function NewProductPage() {
  const { slug } = useParams<{ slug: string }>();
  return <StoreScopedPage slug={slug}>{(store) => <NewProductWorkspace store={store} />}</StoreScopedPage>;
}

function NewProductWorkspace({ store }: { store: Store }) {
  const router = useRouter();
  const products = useMemo(() => getStoreProducts(store), [store]);

  const currency = store.currencies[0] ?? "USD";

  const handleSave = (values: ProductFormValues) => {
    saveStoreProducts(store.slug, [...products, createProduct({ ...values, currency })]);
    toast.success("Product added", { description: `${values.name} was added to the catalog.` });
    router.push(`/dashboard/stores/${store.slug}/products`);
  };

  return (
    <FeaturePageShell title="Add product" description="Add a new product to this store's catalog.">
      <ProductForm catalog={products} currency={currency} onSave={handleSave} saveLabel="Add product" />
    </FeaturePageShell>
  );
}
