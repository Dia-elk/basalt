"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell } from "@/components/dashboard/feature-page-shell";
import { ProductForm, type ProductFormValues } from "@/components/dashboard/product-form";
import { Button } from "@/components/ui/button";
import { getStoreProducts, saveStoreProducts } from "@/lib/mock/products";
import type { Store } from "@/lib/mock/stores";

export default function EditProductPage() {
  const { slug, productId } = useParams<{ slug: string; productId: string }>();
  return (
    <StoreScopedPage slug={slug}>{(store) => <EditProductWorkspace store={store} productId={productId} />}</StoreScopedPage>
  );
}

function EditProductWorkspace({ store, productId }: { store: Store; productId: string }) {
  const router = useRouter();
  const products = useMemo(() => getStoreProducts(store), [store]);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <FeaturePageShell title="Product not found" description="This product may have already been removed.">
        <Button render={<Link href={`/dashboard/stores/${store.slug}/products`} />}>Back to products</Button>
      </FeaturePageShell>
    );
  }

  const handleSave = (values: ProductFormValues) => {
    saveStoreProducts(
      store.slug,
      products.map((p) => (p.id === product.id ? { ...p, ...values } : p))
    );
    toast.success("Product updated");
    router.push(`/dashboard/stores/${store.slug}/products`);
  };

  const handleDelete = () => {
    saveStoreProducts(
      store.slug,
      products.filter((p) => p.id !== product.id)
    );
    toast.info("Product removed", { description: `${product.name} was removed from the catalog.` });
    router.push(`/dashboard/stores/${store.slug}/products`);
  };

  return (
    <FeaturePageShell title={product.name} description="Edit this product's details.">
      <ProductForm
        initial={product}
        catalog={products.filter((p) => p.id !== product.id)}
        currency={product.currency}
        onSave={handleSave}
        onDelete={handleDelete}
        saveLabel="Save changes"
      />
    </FeaturePageShell>
  );
}
