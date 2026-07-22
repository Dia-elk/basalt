"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/shared/container";
import { StorePageHeader } from "@/components/dashboard/store-page-header";
import { useStore } from "@/hooks/use-store";
import type { Store } from "@/lib/mock/stores";

export function StoreScopedPage({
  slug,
  children,
}: {
  slug: string;
  children: (store: Store) => React.ReactNode;
}) {
  const { store, loading } = useStore(slug);

  if (loading) {
    return (
      <Container className="max-w-none px-6 py-6 lg:px-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-6 h-40 w-full" />
      </Container>
    );
  }

  if (!store) {
    return (
      <Container className="max-w-none px-6 py-16 text-center lg:px-8">
        <p className="text-lg font-medium">Store not found</p>
        <Button render={<Link href="/dashboard" />} className="mt-6">
          Back to Stores
        </Button>
      </Container>
    );
  }

  return (
    <Container className="max-w-none px-6 py-6 lg:px-8">
      <StorePageHeader store={store} />
      <div className="mt-6">{children(store)}</div>
    </Container>
  );
}
