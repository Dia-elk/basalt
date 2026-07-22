"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Search, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/shared/container";
import { useStore } from "@/hooks/use-store";

interface Suggestion {
  domain: string;
  price: number;
  highlight?: string;
}

const TLDS: { ext: string; price: number; highlight?: string }[] = [
  { ext: ".com", price: 14, highlight: "Most popular" },
  { ext: ".store", price: 9, highlight: "Built for ecommerce" },
  { ext: ".shop", price: 19 },
  { ext: ".co", price: 24 },
];

function slugifyQuery(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\.[a-z]+$/i, "")
    .replace(/[^a-z0-9-]/g, "");
}

export default function BuyDomainPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { store } = useStore(slug);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[] | null>(null);
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const [purchasing, setPurchasing] = useState(false);

  function handleSearch() {
    const base = slugifyQuery(query);
    if (!base) return;
    setSelected(null);
    setResults(TLDS.map((t) => ({ domain: `${base}${t.ext}`, price: t.price, highlight: t.highlight })));
  }

  function handlePurchase() {
    if (!selected) return;
    setPurchasing(true);
    setTimeout(() => {
      toast.success("Domain purchased", {
        description: `${selected.domain} is now connected to ${store?.name ?? "your store"}.`,
      });
      router.push(`/dashboard/stores/${slug}/domains`);
    }, 900);
  }

  return (
    <Container className="flex max-w-2xl flex-col px-6 py-10 lg:px-8">
      <Link
        href={`/dashboard/stores/${slug}/domains`}
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" strokeWidth={1.5} />
        Domains
      </Link>

      <div className="mt-8 flex flex-col items-center text-center">
        <h1 className="text-2xl font-medium">Buy a domain</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Search for a domain and it will be connected to {store?.name ?? "your store"} automatically as soon as
          you buy it.
        </p>
      </div>

      <div className="mt-8 flex gap-2">
        <Input
          autoFocus
          placeholder="yourbrand"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="h-11 flex-1"
        />
        <Button size="lg" className="h-11 gap-1.5" disabled={!query.trim()} onClick={handleSearch}>
          <Search className="size-4" strokeWidth={1.5} />
          Search
        </Button>
      </div>

      {results && (
        <div className="mt-8 flex flex-col gap-2">
          {results.map((r) => {
            const active = selected?.domain === r.domain;
            return (
              <button
                key={r.domain}
                type="button"
                onClick={() => setSelected(r)}
                className={
                  "flex items-center justify-between rounded-xl border p-4 text-start transition-colors " +
                  (active ? "border-foreground/30 bg-card" : "border-border hover:bg-card")
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className={
                      "flex size-5 items-center justify-center rounded-full border " +
                      (active ? "border-success bg-success text-success-foreground" : "border-border")
                    }
                  >
                    {active && <Check className="size-3" strokeWidth={2.5} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{r.domain}</p>
                    {r.highlight && <p className="text-xs text-muted-foreground">{r.highlight}</p>}
                  </div>
                </div>
                <span className="font-mono text-sm text-muted-foreground">${r.price}/yr</span>
              </button>
            );
          })}
        </div>
      )}

      {selected && (
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{selected.domain}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">1 year registration · auto-renews</p>
            </div>
            <span className="font-mono text-lg font-semibold">${selected.price}</span>
          </div>
          <Button size="lg" className="gap-2" onClick={handlePurchase} disabled={purchasing}>
            {purchasing ? (
              <>
                <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />
                Completing purchase…
              </>
            ) : (
              `Buy ${selected.domain} for $${selected.price}`
            )}
          </Button>
        </div>
      )}
    </Container>
  );
}
