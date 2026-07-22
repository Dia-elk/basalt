"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, LayoutGrid, Rocket, Globe2, Bot, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { StoreLogo } from "@/components/shared/store-logo";
import { StatusBadge } from "@/components/shared/status-badge";
import { useStore } from "@/hooks/use-store";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { Dictionary } from "@/lib/i18n/dictionaries";

function storeNavItems(slug: string) {
  const base = `/dashboard/stores/${slug}`;
  return [
    { href: base, key: "overview" as const, icon: LayoutGrid, exact: true },
    { href: `${base}/deployments`, key: "deployments" as const, icon: Rocket },
    { href: `${base}/domains`, key: "domains" as const, icon: Globe2 },
    { href: `${base}/ai-workspace`, key: "aiWorkspace" as const, icon: Bot },
    { href: `${base}/team`, key: "team" as const, icon: Users },
    { href: `${base}/settings`, key: "settings" as const, icon: Settings },
  ];
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

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {storeNavItems(slug).map(({ key, ...item }) => (
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
