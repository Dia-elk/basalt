import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StoreLogo } from "@/components/shared/store-logo";
import { StatusBadge } from "@/components/shared/status-badge";
import type { Store } from "@/lib/mock/stores";

export function StorePageHeader({ store }: { store: Store }) {
  return (
    <>
      <Link
        href="/dashboard"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground lg:hidden"
      >
        <ArrowLeft className="size-3.5" strokeWidth={1.5} />
        All stores
      </Link>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <StoreLogo logoUrl={store.logoUrl} name={store.name} size="md" />
          <div>
            <h1 className="text-xl font-medium">{store.name}</h1>
            <p className="text-xs text-muted-foreground">{store.businessType}</p>
          </div>
        </div>
        <StatusBadge status={store.status} />
      </div>
    </>
  );
}
