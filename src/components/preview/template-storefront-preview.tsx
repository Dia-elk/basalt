import { Heart, Star } from "lucide-react";
import type { StoreTemplate } from "@/lib/mock/templates";

const genericProducts = [
  { name: "Signature Piece", price: 68 },
  { name: "Best Seller", price: 45 },
  { name: "New Arrival", price: 89 },
  { name: "Everyday Essential", price: 32 },
  { name: "Limited Edition", price: 120 },
  { name: "Customer Favorite", price: 54 },
];

export function TemplateStorefrontPreview({ template }: { template: StoreTemplate }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex items-center justify-center gap-2 border-b border-border bg-card py-1.5 text-[11px] text-muted-foreground">
        <span className="size-1.5 rounded-full" style={{ backgroundColor: template.accent }} />
        Template preview · {template.name}
      </div>

      <header className="flex items-center justify-between border-b border-border px-6 py-4 sm:px-10">
        <div className="flex items-center gap-2.5">
          <div
            className="flex size-8 items-center justify-center rounded-lg text-sm font-semibold"
            style={{ backgroundColor: `${template.accent}26`, color: template.accent }}
          >
            {template.name.charAt(0)}
          </div>
          <span className="text-lg font-semibold">{template.name}</span>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <span>Shop</span>
          <span>Collections</span>
          <span>Journal</span>
        </nav>
      </header>

      <section
        className="px-6 py-14 text-center sm:px-10 sm:py-20"
        style={{ background: `linear-gradient(180deg, ${template.gradient[0]}, transparent)` }}
      >
        <p className="text-xs tracking-wide text-muted-foreground uppercase">{template.category}</p>
        <h1 className="mt-3 text-3xl font-medium text-balance sm:text-5xl">Built with {template.name}</h1>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          A live look at this template&apos;s layout and colors. Nothing here is a real store yet.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 px-6 pb-16 sm:grid-cols-3 sm:px-10">
        {genericProducts.map((p) => (
          <div key={p.name} className="flex flex-col gap-2.5 rounded-xl border border-border bg-card p-3">
            <div
              className="relative aspect-square overflow-hidden rounded-lg"
              style={{ background: `linear-gradient(135deg, ${template.gradient[0]}, ${template.gradient[1]})` }}
            >
              <div className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-background/80">
                <Heart className="size-3.5" strokeWidth={1.5} />
              </div>
            </div>
            <p className="truncate text-sm font-medium">{p.name}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">${p.price}</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="size-3 fill-current" strokeWidth={0} />
                4.9
              </span>
            </div>
          </div>
        ))}
      </section>

      <footer className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground sm:px-10">
        {template.name} template · Built on Basalt
      </footer>
    </div>
  );
}
