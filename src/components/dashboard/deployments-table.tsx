"use client";

import Link from "next/link";
import { RotateCcw, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DeployStatusBadge } from "@/components/shared/status-badge";
import type { Deployment } from "@/lib/mock/deployments";

export function DeploymentsTable({ deployments, showStore = true }: { deployments: Deployment[]; showStore?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="flex flex-col divide-y divide-border">
        {deployments.map((d) => (
          <div key={d.id} className="flex flex-col gap-3 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <DeployStatusBadge status={d.status} />
              <div className="min-w-0">
                <p className="truncate text-sm">{d.message}</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                  {showStore && (
                    <Link href={`/dashboard/stores/${d.storeSlug}`} className="hover:text-foreground">
                      {d.storeName}
                    </Link>
                  )}
                  <span>{d.env}</span>
                  <span dir="ltr">{d.time}</span>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3 ps-8 sm:ps-0">
              <span className="font-mono text-xs text-muted-foreground">{d.duration}</span>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() =>
                  toast.info("Rolled back", { description: `${d.storeName} reverted to a previous version.` })
                }
                aria-label="Rollback"
              >
                <RotateCcw className="size-3.5" strokeWidth={1.5} />
              </Button>
              <Button variant="ghost" size="icon-sm" render={<a href="#" onClick={(e) => e.preventDefault()} />} aria-label="Open">
                <ExternalLink className="size-3.5" strokeWidth={1.5} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
