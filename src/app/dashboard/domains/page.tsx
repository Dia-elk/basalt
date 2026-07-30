"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ShieldCheck, ShieldAlert, RefreshCw, ArrowUpRight, Loader2, Clock } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { StoreLogo } from "@/components/shared/store-logo";
import { DomainStatusBadge } from "@/components/shared/status-badge";
import { domains as initialDomains } from "@/lib/mock/domains";
import { stores } from "@/lib/mock/stores";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-provider";

export default function DomainsPage() {
  const [items, setItems] = useState(initialDomains);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const { dict } = useLocale();
  const t = dict.dashboardDomains;

  const activeCount = items.filter((d) => d.status === "Active").length;
  const pendingCount = items.filter((d) => d.status === "Pending").length;
  const errorCount = items.filter((d) => d.status === "Error").length;

  return (
    <Container className="max-w-none px-6 py-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-medium">{t.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">{t.totalDomains}</p>
          <p className="mt-1 text-2xl font-semibold">{items.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">{t.active}</p>
          <p className="mt-1 text-2xl font-semibold text-success">{activeCount}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">{t.needsAttention}</p>
          <p className="mt-1 text-2xl font-semibold">{pendingCount + errorCount > 0 ? pendingCount + errorCount : 0}</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border">
        <div className="flex flex-col divide-y divide-border">
          {items.map((d) => {
            const store = stores.find((s) => s.slug === d.storeSlug);

            if (d.status === "Pending") {
              const verifying = verifyingId === d.id;
              return (
                <div key={d.id} className="flex flex-col gap-4 bg-card p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      {store && <StoreLogo logoUrl={store.logoUrl} name={store.name} size="sm" />}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <DomainStatusBadge status={d.status} />
                          <p className="truncate text-sm font-medium">{d.domain}</p>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">{d.storeName}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 ps-8 sm:ps-0">
                      <Button
                        size="sm"
                        className="gap-1.5"
                        disabled={verifying}
                        onClick={() => {
                          setVerifyingId(d.id);
                          setTimeout(() => {
                            setItems((prev) =>
                              prev.map((item) =>
                                item.id === d.id ? { ...item, status: "Active", ssl: "Active" } : item
                              )
                            );
                            setVerifyingId(null);
                            toast.success("Domain verified", {
                              description: `${d.domain} is now live and serving ${d.storeName}.`,
                            });
                          }, 1600);
                        }}
                      >
                        {verifying ? (
                          <Loader2 className="size-3.5 animate-spin" strokeWidth={1.5} />
                        ) : (
                          <RefreshCw className="size-3.5" strokeWidth={1.5} />
                        )}
                        {t.verify}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-xl border border-warning/30 bg-warning-muted px-3.5 py-3 text-xs text-warning">
                    <Clock className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
                    <p>{t.waitingForDns}</p>
                  </div>

                  <div className="rounded-xl border border-border bg-background/60 p-4">
                    <p className="mb-3 text-xs font-medium text-muted-foreground">{t.dnsRecordsToAdd}</p>
                    <div className="flex flex-col gap-2 font-mono text-xs" dir="ltr">
                      <div className="grid grid-cols-[60px_1fr_1fr] gap-3 text-muted-foreground">
                        <span>Type</span>
                        <span>Name</span>
                        <span>Value</span>
                      </div>
                      <div className="grid grid-cols-[60px_1fr_1fr] gap-3">
                        <span>A</span>
                        <span>@</span>
                        <span>76.76.21.21</span>
                      </div>
                      <div className="grid grid-cols-[60px_1fr_1fr] gap-3">
                        <span>CNAME</span>
                        <span>www</span>
                        <span>cname.buildonbasalt.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            const expanded = expandedId === d.id;
            return (
              <div key={d.id} className="bg-card">
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setExpandedId(expanded ? null : d.id)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-start"
                  >
                    {store && <StoreLogo logoUrl={store.logoUrl} name={store.name} size="sm" />}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">{d.domain}</p>
                        {d.primary && (
                          <span className="rounded-full border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
                            {t.primary}
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                        <span>{d.storeName}</span>
                        <span className="inline-flex items-center gap-1">
                          {d.ssl === "Active" ? (
                            <ShieldCheck className="size-3" strokeWidth={1.5} />
                          ) : (
                            <ShieldAlert className="size-3" strokeWidth={1.5} />
                          )}
                          {d.ssl === "Active" ? t.secure : t.securing}
                        </span>
                      </div>
                    </div>
                    <DomainStatusBadge status={d.status} className="shrink-0" />
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform",
                        expanded && "rotate-180"
                      )}
                      strokeWidth={1.5}
                    />
                  </button>
                  <div className="flex shrink-0 items-center gap-2 ps-8 sm:ps-0">
                    <Button
                      render={<Link href={`/dashboard/stores/${d.storeSlug}/domains`} />}
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                    >
                      {t.manage}
                      <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                    </Button>
                  </div>
                </div>
                {expanded && (
                  <div className="border-t border-border bg-background/60 p-4">
                    <p className="mb-3 text-xs font-medium text-muted-foreground">{t.dnsRecords}</p>
                    <div className="flex flex-col gap-2 font-mono text-xs" dir="ltr">
                      <div className="grid grid-cols-[60px_1fr_1fr] gap-3 text-muted-foreground">
                        <span>Type</span>
                        <span>Name</span>
                        <span>Value</span>
                      </div>
                      <div className="grid grid-cols-[60px_1fr_1fr] gap-3">
                        <span>A</span>
                        <span>@</span>
                        <span>76.76.21.21</span>
                      </div>
                      <div className="grid grid-cols-[60px_1fr_1fr] gap-3">
                        <span>CNAME</span>
                        <span>www</span>
                        <span>cname.buildonbasalt.com</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
