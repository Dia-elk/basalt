"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChevronRight, ChevronDown, Check } from "lucide-react";
import { StoreLogo } from "@/components/shared/store-logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { stores } from "@/lib/mock/stores";
import { useStore } from "@/hooks/use-store";
import { useLocale } from "@/lib/i18n/locale-provider";

export function StoreBreadcrumb({ slug }: { slug: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { store } = useStore(slug);
  const { dict } = useLocale();

  if (!store) return null;

  const suffix = pathname.replace(`/dashboard/stores/${slug}`, "");

  return (
    <div className="flex min-w-0 items-center gap-1.5 text-sm">
      <Link href="/dashboard" className="shrink-0 text-muted-foreground transition-colors hover:text-foreground">
        {dict.sidebar.stores}
      </Link>
      <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/50 rtl:rotate-180" strokeWidth={1.5} />
      <DropdownMenu>
        <DropdownMenuTrigger className="group inline-flex min-w-0 items-center gap-1.5 rounded-lg py-1 pe-1.5 ps-1 transition-colors hover:bg-accent">
          <StoreLogo logoUrl={store.logoUrl} name={store.name} size="sm" />
          <span className="truncate font-medium text-foreground">{store.name}</span>
          <ChevronDown
            className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-popup-open:rotate-180"
            strokeWidth={1.5}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{dict.topbar.switchStore}</DropdownMenuLabel>
          </DropdownMenuGroup>
          {stores.map((s) => (
            <DropdownMenuItem
              key={s.id}
              onClick={() => router.push(`/dashboard/stores/${s.slug}${suffix}`)}
              className="justify-between gap-2"
            >
              <span className="flex min-w-0 items-center gap-2">
                <StoreLogo logoUrl={s.logoUrl} name={s.name} size="sm" />
                <span className="truncate">{s.name}</span>
              </span>
              {s.slug === store.slug && <Check className="size-3.5 shrink-0 text-success" strokeWidth={2} />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
