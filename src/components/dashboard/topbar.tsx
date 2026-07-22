"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Settings, User as UserIcon, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { SidebarContent } from "@/components/dashboard/sidebar-nav";
import { StoreSidebarContent } from "@/components/dashboard/store-sidebar";
import { StoreBreadcrumb } from "@/components/dashboard/store-breadcrumb";
import { useLocale } from "@/lib/i18n/locale-provider";

export function Topbar({ storeSlug }: { storeSlug?: string | null }) {
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { dict } = useLocale();

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4 sm:px-6">
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <button
          onClick={() => setMobileNavOpen(true)}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" strokeWidth={1.5} />
        </button>
        <SheetContent side="left" className="w-64 bg-sidebar p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">Dashboard navigation menu</SheetDescription>
          {storeSlug ? (
            <StoreSidebarContent slug={storeSlug} onNavigate={() => setMobileNavOpen(false)} />
          ) : (
            <SidebarContent onNavigate={() => setMobileNavOpen(false)} />
          )}
        </SheetContent>
      </Sheet>

      {storeSlug && <StoreBreadcrumb slug={storeSlug} />}

      <div className="flex flex-1 items-center justify-end gap-1.5">
        <LanguageSwitcher />

        <Link
          href="/dashboard/notifications"
          className="relative inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Bell className="size-4" strokeWidth={1.5} />
          <span className="absolute top-1.5 end-1.5 size-1.5 rounded-full bg-success" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="ms-1 inline-flex size-8 items-center justify-center rounded-full border border-border bg-secondary text-xs font-medium text-foreground transition-colors hover:bg-accent">
            AK
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex flex-col gap-0.5 px-2 py-1.5">
                <span className="text-sm font-medium text-foreground">Amina Kader</span>
                <span className="text-xs text-muted-foreground">amina@lumiereparfums.com</span>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
              <UserIcon />
              {dict.topbar.myProfile}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
              <Settings />
              {dict.sidebar.settings}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => router.push("/")}>
              <LogOut />
              {dict.topbar.logOut}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
