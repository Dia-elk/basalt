import { LayoutTemplate } from "lucide-react";
import { generateTopProducts } from "@/lib/mock/analytics";
import { generateReviews, generateFaqEntries } from "@/lib/mock/store-features";
import { BLOCK_LIBRARY, type Block } from "@/lib/mock/builder";
import type { Store } from "@/lib/mock/stores";

function HeroBlock({ block, store }: { block: Block; store: Store }) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-xl px-6 py-14 text-center"
      style={{ background: `linear-gradient(180deg, ${store.accent}1F, transparent)` }}
    >
      <h2 className="max-w-md text-2xl font-semibold text-balance">{block.content.heading}</h2>
      {block.content.subheading && <p className="max-w-sm text-sm text-muted-foreground">{block.content.subheading}</p>}
      {block.content.ctaLabel && (
        <span
          className="mt-2 rounded-lg px-4 py-2 text-sm font-medium"
          style={{ backgroundColor: store.accent, color: "#0A0A0B" }}
        >
          {block.content.ctaLabel}
        </span>
      )}
    </div>
  );
}

function ProductGridBlock({ block, store }: { block: Block; store: Store }) {
  const products = generateTopProducts(store.id, store.businessType).slice(0, 4);
  return (
    <div className="px-6 py-8">
      {block.content.heading && <h3 className="mb-4 text-sm font-medium">{block.content.heading}</h3>}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {products.map((p) => (
          <div key={p.name} className="flex flex-col gap-2 rounded-lg border border-border bg-card p-2.5">
            <div className="aspect-square rounded-md bg-gradient-to-br from-muted to-secondary" />
            <p className="truncate text-xs">{p.name}</p>
            <p className="text-xs text-muted-foreground" dir="ltr">
              ${Math.round(p.revenue / p.units / 5) * 5}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsBlock({ block, store }: { block: Block; store: Store }) {
  const reviews = generateReviews(store).slice(0, 2);
  return (
    <div className="px-6 py-8">
      {block.content.heading && <h3 className="mb-4 text-center text-sm font-medium">{block.content.heading}</h3>}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-lg border border-border bg-card p-3.5">
            <p className="text-xs text-muted-foreground">&ldquo;{r.quote}&rdquo;</p>
            <p className="mt-2 text-xs font-medium">{r.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqBlock({ block, store }: { block: Block; store: Store }) {
  const entries = generateFaqEntries(store).slice(0, 3);
  return (
    <div className="px-6 py-8">
      {block.content.heading && <h3 className="mb-4 text-sm font-medium">{block.content.heading}</h3>}
      <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
        {entries.map((e) => (
          <div key={e.question} className="p-3">
            <p className="text-xs font-medium">{e.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsletterBlock({ block, store }: { block: Block; store: Store }) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-xl px-6 py-10 text-center"
      style={{ backgroundColor: `${store.accent}14` }}
    >
      <h3 className="text-lg font-medium">{block.content.heading}</h3>
      {block.content.body && <p className="max-w-sm text-xs text-muted-foreground">{block.content.body}</p>}
      <div className="mt-1 flex w-full max-w-xs items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
        <span className="flex-1 text-start text-xs text-muted-foreground">you@email.com</span>
        <span
          className="shrink-0 rounded-md px-2.5 py-1 text-xs font-medium"
          style={{ backgroundColor: store.accent, color: "#0A0A0B" }}
        >
          Join
        </span>
      </div>
    </div>
  );
}

function CtaBannerBlock({ block, store }: { block: Block; store: Store }) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-xl px-6 py-10 text-center"
      style={{ backgroundColor: `${store.accent}14` }}
    >
      <h3 className="text-lg font-medium">{block.content.heading}</h3>
      {block.content.ctaLabel && (
        <span
          className="rounded-lg px-4 py-2 text-sm font-medium"
          style={{ backgroundColor: store.accent, color: "#0A0A0B" }}
        >
          {block.content.ctaLabel}
        </span>
      )}
    </div>
  );
}

function GenericBlock({ block }: { block: Block }) {
  const meta = BLOCK_LIBRARY.find((b) => b.type === block.type);
  const Icon = meta?.icon ?? LayoutTemplate;
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
      <div className="flex size-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
        <Icon className="size-4" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-medium">{block.content.heading ?? meta?.name ?? block.type}</p>
      <p className="text-xs text-muted-foreground">Preview coming soon for this block type.</p>
    </div>
  );
}

export function BlockRenderer({ block, store }: { block: Block; store: Store }) {
  switch (block.type) {
    case "hero":
      return <HeroBlock block={block} store={store} />;
    case "product-grid":
      return <ProductGridBlock block={block} store={store} />;
    case "testimonials":
      return <TestimonialsBlock block={block} store={store} />;
    case "faq":
      return <FaqBlock block={block} store={store} />;
    case "newsletter":
      return <NewsletterBlock block={block} store={store} />;
    case "cta-banner":
      return <CtaBannerBlock block={block} store={store} />;
    default:
      return <GenericBlock block={block} />;
  }
}
