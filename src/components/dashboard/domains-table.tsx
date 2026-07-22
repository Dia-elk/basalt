"use client";

import Link from "next/link";
import { toast } from "sonner";
import { ShieldCheck, ShieldAlert, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DomainStatusBadge } from "@/components/shared/status-badge";
import type { Domain } from "@/lib/mock/domains";

export function DomainsTable({ domains, showStore = true }: { domains: Domain[]; showStore?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="flex flex-col divide-y divide-border">
        {domains.map((d) => (
          <div key={d.id} className="flex flex-col gap-3 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <DomainStatusBadge status={d.status} />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium">{d.domain}</p>
                  {d.primary && (
                    <span className="rounded-full border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      Primary
                    </span>
                  )}
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                  {showStore && (
                    <Link href={`/dashboard/stores/${d.storeSlug}`} className="hover:text-foreground">
                      {d.storeName}
                    </Link>
                  )}
                  <span className="inline-flex items-center gap-1">
                    {d.ssl === "Active" ? (
                      <ShieldCheck className="size-3" strokeWidth={1.5} />
                    ) : (
                      <ShieldAlert className="size-3" strokeWidth={1.5} />
                    )}
                    {d.ssl === "Active" ? "Secure" : "Securing…"}
                  </span>
                  <span dir="ltr">Renews {d.expiresAt}</span>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 ps-8 sm:ps-0">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => toast.success("Renewal scheduled", { description: `${d.domain} will auto-renew before expiry.` })}
              >
                <RefreshCw className="size-3.5" strokeWidth={1.5} />
                Renew
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
