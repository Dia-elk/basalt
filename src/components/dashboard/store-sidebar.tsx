"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, LayoutGrid, Rocket, Globe2, Bot, Users, Settings, ShoppingCart, Blocks } from "lucide-react";
import { cn } from "@/lib/utils";
import { StoreLogo } from "@/components/shared/store-logo";
import { StatusBadge } from "@/components/shared/status-badge";
import { useStore } from "@/hooks/use-store";
import { useLocale } from "@/lib/i18n/locale-provider";
import { featureOptions } from "@/lib/mock/wizard-options";
import { getStoreComposition, featuresFromComposition } from "@/lib/mock/builder";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type StoreSidebarKey = keyof Dictionary["storeSidebar"];

// featureOptions values are kebab-case (e.g. "gift-cards"); dictionary keys are camelCase.
const featureDictKeys: Record<string, StoreSidebarKey> = {
  wishlist: "wishlist",
  reviews: "reviews",
  coupons: "coupons",
  inventory: "inventory",
  referral: "referral",
  loyalty: "loyalty",
  "gift-cards": "giftCards",
  bundles: "bundles",
  analytics: "analytics",
  seo: "seo",
  newsletter: "newsletter",
  blog: "blog",
  faq: "faq",
};

/**
 * Core items every store has, plus one entry per optional feature the store
 * actually enabled (via the wizard's feature step) — see product_vision_two_workspaces memory.
 */
function storeNavItems(slug: string, features: string[]) {
  const base = `/dashboard/stores/${slug}`;
  const core = [
    { href: base, key: "overview" as StoreSidebarKey, icon: LayoutGrid, exact: true },
    { href: `${base}/orders`, key: "orders" as StoreSidebarKey, icon: ShoppingCart },
  ];
  const enabledFeatures = featureOptions
    .filter((f) => features.includes(f.value))
    .map((f) => ({ href: `${base}/${f.value}`, key: featureDictKeys[f.value], icon: f.icon }));
  const platform = [
    { href: `${base}/deployments`, key: "deployments" as StoreSidebarKey, icon: Rocket },
    { href: `${base}/domains`, key: "domains" as StoreSidebarKey, icon: Globe2 },
    { href: `${base}/ai-workspace`, key: "aiWorkspace" as StoreSidebarKey, icon: Bot },
    { href: `${base}/builder`, key: "builder" as StoreSidebarKey, icon: Blocks },
    { href: `${base}/team`, key: "team" as StoreSidebarKey, icon: Users },
    { href: `${base}/settings`, key: "settings" as StoreSidebarKey, icon: Settings },
  ];
  return [...core, ...enabledFeatures, ...platform];
}

function StoreNavLink({
  href,
  label,
  icon: Icon,
  exact,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: typeof LayoutGrid;
  exact?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
      )}
    >
      <Icon className="size-4 shrink-0" strokeWidth={1.5} />
      {label}
    </Link>
  );
}

export function StoreSidebarContent({ slug, onNavigate }: { slug: string; onNavigate?: () => void }) {
  const { store } = useStore(slug);
  const { dict } = useLocale();
  const t: Dictionary["storeSidebar"] = dict.storeSidebar;

  // A feature shows up either because it was picked in the wizard, or because
  // a block that implies it (e.g. "faq", "loyalty-widget") is actually on the
  // store's page — see product_vision_two_workspaces memory.
  const effectiveFeatures = store
    ? Array.from(new Set([...store.features, ...featuresFromComposition(getStoreComposition(store))]))
    : [];

  return (
    <>
      <div className="flex flex-col gap-3 px-5 py-4">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="inline-flex w-fit items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 rtl:rotate-180" strokeWidth={1.5} />
          {t.allStores}
        </Link>
        {store && (
          <div className="flex items-center gap-2.5">
            <StoreLogo businessType={store.businessType} accent={store.accent} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{store.name}</p>
              <p className="text-xs text-muted-foreground">{store.businessType}</p>
            </div>
          </div>
        )}
        {store && <StatusBadge status={store.status} className="w-fit" />}
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
        {storeNavItems(slug, effectiveFeatures).map(({ key, ...item }) => (
          <StoreNavLink key={item.href} {...item} label={t[key]} onNavigate={onNavigate} />
        ))}
      </nav>
    </>
  );
}

export function StoreSidebar({ slug }: { slug: string }) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-e border-sidebar-border bg-sidebar lg:flex">
      <StoreSidebarContent slug={slug} />
    </aside>
  );
}
