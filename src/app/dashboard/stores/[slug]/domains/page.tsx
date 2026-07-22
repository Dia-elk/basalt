"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Search, ChevronDown, ShieldCheck, ShieldAlert, RefreshCw, Globe2, Loader2, Clock } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DomainStatusBadge } from "@/components/shared/status-badge";
import { domainsForStore, type Domain } from "@/lib/mock/domains";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-provider";

export default function StoreDomainsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [items, setItems] = useState<Domain[]>(() => domainsForStore(slug));
  const [connectValue, setConnectValue] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const { dict } = useLocale();
  const t = dict.dashboardDomains;

  return (
    <StoreScopedPage slug={slug}>
      {() => (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-lg font-medium">{t.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t.storeSubtitle}</p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3">
              <Globe2 className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
              <Input
                placeholder={t.connectPlaceholder}
                value={connectValue}
                onChange={(e) => setConnectValue(e.target.value)}
                className="border-none bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={!connectValue.trim()}
                onClick={() => {
                  const domain = connectValue.trim();
                  const id = `dom-pending-${Date.now()}`;
                  setItems((prev) => [
                    { id, storeSlug: slug, storeName: "", domain, status: "Pending", ssl: "Provisioning", primary: false, expiresAt: "-" },
                    ...prev,
                  ]);
                  setExpandedId(id);
                  toast.success("Domain added", {
                    description: `Add the DNS records below at your provider to finish connecting ${domain}.`,
                  });
                  setConnectValue("");
                }}
              >
                {t.connect}
              </Button>
              <Button render={<Link href={`/dashboard/stores/${slug}/domains/buy`} />} className="gap-1.5">
                <Search className="size-4" strokeWidth={1.5} />
                {t.buyDomain}
              </Button>
            </div>
          </div>

          {items.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="flex flex-col divide-y divide-border">
                {items.map((d) => {
                  if (d.status === "Pending") {
                    const verifying = verifyingId === d.id;
                    return (
                      <div key={d.id} className="flex flex-col gap-4 bg-card p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex min-w-0 flex-1 items-center gap-3">
                            <DomainStatusBadge status={d.status} />
                            <p className="truncate text-sm font-medium">{d.domain}</p>
                          </div>
                          <div className="flex shrink-0 items-center gap-2 ps-8 sm:ps-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground"
                              onClick={() => setItems((prev) => prev.filter((item) => item.id !== d.id))}
                            >
                              {t.remove}
                            </Button>
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
                                    description: `${d.domain} is now live and serving your storefront.`,
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
                          <DomainStatusBadge status={d.status} />
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
                              <span className="inline-flex items-center gap-1">
                                {d.ssl === "Active" ? (
                                  <ShieldCheck className="size-3" strokeWidth={1.5} />
                                ) : (
                                  <ShieldAlert className="size-3" strokeWidth={1.5} />
                                )}
                                {d.ssl === "Active" ? t.secure : t.securing}
                              </span>
                              <span dir="ltr">
                                {t.renews} {d.expiresAt}
                              </span>
                            </div>
                          </div>
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
                            variant="outline"
                            size="sm"
                            className="gap-1.5"
                            onClick={() =>
                              toast.success("Renewal scheduled", {
                                description: `${d.domain} will auto-renew before expiry.`,
                              })
                            }
                          >
                            <RefreshCw className="size-3.5" strokeWidth={1.5} />
                            {t.renew}
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
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-14 text-center text-sm text-muted-foreground">
              {t.emptyState}
            </div>
          )}
        </div>
      )}
    </StoreScopedPage>
  );
}
