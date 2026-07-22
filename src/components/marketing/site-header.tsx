"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#features", key: "features" as const },
  { href: "/#how-it-works", key: "howItWorks" as const },
  { href: "/#included", key: "included" as const },
  { href: "/pricing", key: "pricing" as const },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { dict } = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-xl transition-colors duration-300",
        scrolled ? "border-border" : "border-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {dict.nav[link.key]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <LanguageSwitcher />
          <Link href="/login" className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            {dict.nav.login}
          </Link>
          <Button render={<Link href="/register" />} size="sm" className="ms-1 gap-1.5">
            {dict.nav.getStarted}
            <ArrowRight className="size-3.5" strokeWidth={1.5} />
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {dict.nav[link.key]}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-border pt-4">
              <Button render={<Link href="/login" />} variant="outline" className="flex-1">
                {dict.nav.login}
              </Button>
              <Button render={<Link href="/register" />} className="flex-1">
                {dict.nav.getStarted}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
