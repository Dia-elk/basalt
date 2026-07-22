"use client";

import { useParams } from "next/navigation";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { DeploymentsTable } from "@/components/dashboard/deployments-table";
import { deploymentsForStore } from "@/lib/mock/deployments";

export default function StoreDeploymentsPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {() => {
        const items = deploymentsForStore(slug);
        return items.length > 0 ? (
          <DeploymentsTable deployments={items} showStore={false} />
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-14 text-center text-sm text-muted-foreground">
            No deployments yet for this store.
          </div>
        );
      }}
    </StoreScopedPage>
  );
}
