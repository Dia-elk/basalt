import { LayoutTemplate } from "lucide-react";
import { generateTopProducts } from "@/lib/mock/analytics";
import { generateReviews, generateFaqEntries } from "@/lib/mock/store-features";
import { BLOCK_LIBRARY, type Block } from "@/lib/mock/builder";
import type { Store } from "@/lib/mock/stores";
import { cn } from "@/lib/utils";

function alignClasses(align: "start" | "center" | undefined) {
  return align === "start" ? "items-start text-start" : "items-center text-center";
}

function HeroBlock({ block, store }: { block: Block; store: Store }) {
  const { heading, subheading, ctaLabel, imageUrl, backgroundColor, textColor, textAlign } = block.content;
  return (
    <div
      className={cn("flex flex-col gap-3 bg-cover bg-center px-6 py-20 @md:px-10", alignClasses(textAlign))}
      style={{
        color: textColor,
        backgroundImage: imageUrl
          ? `linear-gradient(0deg, rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${imageUrl})`
          : !backgroundColor
            ? `linear-gradient(180deg, ${store.accent}1F, transparent)`
            : undefined,
      }}
    >
      <h2 className="max-w-lg text-2xl font-semibold text-balance @md:text-3xl">{heading}</h2>
      {subheading && (
        <p className={cn("max-w-sm text-sm", !textColor && "text-muted-foreground")}>{subheading}</p>
      )}
      {ctaLabel && (
        <span
          className="mt-2 rounded-lg px-5 py-2.5 text-sm font-medium"
          style={{ backgroundColor: store.accent, color: "#0A0A0B" }}
        >
          {ctaLabel}
        </span>
      )}
    </div>
  );
}

function ProductGridBlock({ block, store }: { block: Block; store: Store }) {
  const products = generateTopProducts(store.id, store.businessType).slice(0, block.content.itemLimit ?? 4);
  return (
    <div className="px-6 py-14 @md:px-10">
      {block.content.heading && <h3 className="mb-6 text-center text-lg font-medium">{block.content.heading}</h3>}
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 @md:grid-cols-4">
        {products.map((p) => (
          <div key={p.name} className="flex flex-col gap-2.5">
            <div className="aspect-square rounded-lg bg-gradient-to-br from-muted to-secondary" />
            <p className="truncate text-sm">{p.name}</p>
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
  const reviews = generateReviews(store).slice(0, block.content.itemLimit ?? 2);
  return (
    <div className="px-6 py-14 @md:px-10">
      {block.content.heading && <h3 className="mb-6 text-center text-lg font-medium">{block.content.heading}</h3>}
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 @md:grid-cols-2">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">&ldquo;{r.quote}&rdquo;</p>
            <p className="mt-2.5 text-sm font-medium">{r.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqBlock({ block, store }: { block: Block; store: Store }) {
  const entries = generateFaqEntries(store).slice(0, block.content.itemLimit ?? 3);
  return (
    <div className="px-6 py-14 @md:px-10">
      {block.content.heading && <h3 className="mb-6 text-center text-lg font-medium">{block.content.heading}</h3>}
      <div className="mx-auto flex max-w-2xl flex-col divide-y divide-border rounded-xl border border-border">
        {entries.map((e) => (
          <div key={e.question} className="p-4">
            <p className="text-sm font-medium">{e.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsletterBlock({ block, store }: { block: Block; store: Store }) {
  const { heading, body, backgroundColor, textColor, textAlign } = block.content;
  return (
    <div
      className={cn("flex flex-col gap-3 px-6 py-16 @md:px-10", alignClasses(textAlign))}
      style={{ color: textColor, backgroundColor: backgroundColor ? undefined : `${store.accent}14` }}
    >
      <h3 className="text-xl font-medium">{heading}</h3>
      {body && <p className={cn("max-w-sm text-sm", !textColor && "text-muted-foreground")}>{body}</p>}
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
  const { heading, ctaLabel, backgroundColor, textColor, textAlign } = block.content;
  return (
    <div
      className={cn("flex flex-col gap-3 px-6 py-16 @md:px-10", alignClasses(textAlign))}
      style={{ color: textColor, backgroundColor: backgroundColor ? undefined : `${store.accent}14` }}
    >
      <h3 className="text-xl font-medium">{heading}</h3>
      {ctaLabel && (
        <span
          className="rounded-lg px-5 py-2.5 text-sm font-medium"
          style={{ backgroundColor: store.accent, color: "#0A0A0B" }}
        >
          {ctaLabel}
        </span>
      )}
    </div>
  );
}

function GenericBlock({ block }: { block: Block }) {
  const meta = BLOCK_LIBRARY.find((b) => b.type === block.type);
  const Icon = meta?.icon ?? LayoutTemplate;
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
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
