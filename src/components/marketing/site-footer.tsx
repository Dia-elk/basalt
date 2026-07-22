"use client";

import Link from "next/link";
import { Mail, MessageCircle, Rss } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { useLocale } from "@/lib/i18n/locale-provider";

const columnHrefs = [
  ["/#features", "/#how-it-works", "/#included", "/pricing", "#"],
  ["/#ai", "/#deployment", "/#commerce-engine", "#"],
  ["#", "#", "#", "#"],
  ["#", "#", "#"],
];

export function SiteFooter() {
  const { dict } = useLocale();
  const t = dict.marketing.footer;

  return (
    <footer className="border-t border-border">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-4 lg:col-span-2">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">{t.tagline}</p>
            <div className="flex items-center gap-2">
              {[Mail, MessageCircle, Rss].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="size-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {t.columns.map((col, ci) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-sm font-medium">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((label, li) => (
                  <li key={label}>
                    <Link
                      href={columnHrefs[ci][li]}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>{t.copyright.replace("{year}", String(new Date().getFullYear()))}</p>
          <div className="flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-success" />
            </span>
            {t.statusLabel}
          </div>
        </div>
      </Container>
    </footer>
  );
}
