"use client";

import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/lib/i18n/locale-provider";
import { locales, localeMeta } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "group inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-secondary/40 ps-1 pe-2.5 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/15 hover:bg-accent hover:text-foreground data-popup-open:border-foreground/15 data-popup-open:bg-accent data-popup-open:text-foreground",
          className
        )}
        aria-label="Change language"
      >
        <span className="flex size-5 items-center justify-center rounded-full bg-foreground/10 text-[9px] font-semibold tracking-tight text-foreground/70 group-data-popup-open:bg-success-muted group-data-popup-open:text-success">
          {locale.toUpperCase()}
        </span>
        <span className="hidden sm:inline">{localeMeta[locale].nativeLabel}</span>
        <ChevronDown
          className="size-3 text-muted-foreground transition-transform duration-200 group-data-popup-open:rotate-180"
          strokeWidth={1.75}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Language</DropdownMenuLabel>
        </DropdownMenuGroup>
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => setLocale(l)}
            className="justify-between gap-3 py-1.5"
          >
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full text-[9px] font-semibold tracking-tight",
                  locale === l ? "bg-success-muted text-success" : "bg-muted text-muted-foreground"
                )}
              >
                {l.toUpperCase()}
              </span>
              <span className={locale === l ? "text-foreground" : "text-muted-foreground"}>
                {localeMeta[l].nativeLabel}
              </span>
            </span>
            {locale === l && <Check className="size-3.5 text-success" strokeWidth={2} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
