"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Heart, Star, Sparkles } from "lucide-react";
import { StoreLogo } from "@/components/shared/store-logo";
import { useStore } from "@/hooks/use-store";
import { generateTopProducts } from "@/lib/mock/analytics";

export function StorefrontPreview() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const { store, loading } = useStore(slug);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Loading preview…
      </div>
    );
  }

  if (!store) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2 bg-background text-center">
        <p className="text-lg font-medium">Store not found</p>
        <p className="text-sm text-muted-foreground">This preview link doesn&apos;t match a store.</p>
      </div>
    );
  }

  const version = searchParams.get("v");
  const banner = searchParams.get("banner") || null;
  const accent = searchParams.get("accent") || store.accent;
  const features = (searchParams.get("features") ?? "").split(",").filter(Boolean);
  const hasWishlist = features.includes("wishlist");
  const hasReviews = features.includes("reviews");
  const hasLoyalty = features.includes("loyalty");

  const products = generateTopProducts(store.slug, store.businessType)
    .slice(0, 6)
    .map((p) => ({ name: p.name, price: Math.max(15, Math.round(p.revenue / p.units / 5) * 5) }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex items-center justify-center gap-2 border-b border-border bg-card py-1.5 text-[11px] text-muted-foreground">
        <span className="size-1.5 rounded-full bg-success" />
        Preview{version ? ` · version ${version}` : ""} · not visible to customers yet
      </div>

      <header className="flex items-center justify-between border-b border-border px-6 py-4 sm:px-10">
        <div className="flex items-center gap-2.5">
          <StoreLogo businessType={store.businessType} accent={accent} size="sm" />
          <span className="text-lg font-semibold">{store.name}</span>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <span>Shop</span>
          <span>Collections</span>
          <span>Journal</span>
          {hasLoyalty && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs"
              style={{ borderColor: `${accent}4D`, color: accent }}
            >
              <Sparkles className="size-3" strokeWidth={1.5} />
              Loyalty
            </span>
          )}
        </nav>
      </header>

      {banner && (
        <div
          className="border-b border-white/10 px-6 py-2.5 text-center text-sm sm:px-10"
          style={{ backgroundColor: `${accent}14`, color: accent }}
        >
          {banner}
        </div>
      )}

      <section className="px-6 py-14 text-center sm:px-10 sm:py-20">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">{store.businessType}</p>
        <h1 className="mt-3 text-3xl font-medium text-balance sm:text-5xl">Welcome to {store.name}</h1>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">Quality pieces, thoughtfully chosen.</p>
      </section>

      <section className="grid grid-cols-2 gap-4 px-6 pb-16 sm:grid-cols-3 sm:px-10">
        {products.map((p) => (
          <div key={p.name} className="flex flex-col gap-2.5 rounded-xl border border-border bg-card p-3">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-muted to-secondary">
              {hasWishlist && (
                <div className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-background/80">
                  <Heart className="size-3.5" strokeWidth={1.5} />
                </div>
              )}
            </div>
            <p className="truncate text-sm font-medium">{p.name}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">${p.price}</span>
              {hasReviews && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="size-3 fill-current" strokeWidth={0} />
                  4.9
                </span>
              )}
            </div>
          </div>
        ))}
      </section>

      <footer className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground sm:px-10">
        {store.name} · Built on Basalt
      </footer>
    </div>
  );
}
