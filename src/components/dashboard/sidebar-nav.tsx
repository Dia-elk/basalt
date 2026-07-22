"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, Globe, Gauge, CreditCard, Bell, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const navItems = [
  { href: "/dashboard", key: "stores" as const, icon: Store, exact: true },
  { href: "/dashboard/domains", key: "domains" as const, icon: Globe },
  { href: "/dashboard/resource-usage", key: "resourceUsage" as const, icon: Gauge },
];

const bottomItems = [
  { href: "/dashboard/billing", key: "billing" as const, icon: CreditCard },
  { href: "/dashboard/notifications", key: "notifications" as const, icon: Bell },
  { href: "/dashboard/settings", key: "settings" as const, icon: Settings },
  { href: "/dashboard/profile", key: "profile" as const, icon: User },
];

export function NavLink({
  href,
  label,
  icon: Icon,
  onNavigate,
  exact,
}: {
  href: string;
  label: string;
  icon: typeof Store;
  onNavigate?: () => void;
  exact?: boolean;
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

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { dict } = useLocale();
  const t: Dictionary["sidebar"] = dict.sidebar;

  return (
    <>
      <div className="flex h-14 items-center px-5">
        <Link href="/dashboard" onClick={onNavigate}>
          <Logo />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {navItems.map(({ key, ...item }) => (
          <NavLink key={item.href} {...item} label={t[key]} onNavigate={onNavigate} />
        ))}

        <div className="my-3 border-t border-sidebar-border" />

        {bottomItems.map(({ key, ...item }) => (
          <NavLink key={item.href} {...item} label={t[key]} onNavigate={onNavigate} />
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-muted-foreground">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-success" />
          </span>
          All systems operational
        </div>
      </div>
    </>
  );
}

export function SidebarNav() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-e border-sidebar-border bg-sidebar lg:flex">
      <SidebarContent />
    </aside>
  );
}
