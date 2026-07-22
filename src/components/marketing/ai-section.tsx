"use client";

import { motion } from "framer-motion";
import { MessageSquareText, LayoutGrid, Palette, Eye } from "lucide-react";
import { Container } from "@/components/shared/container";
import { useLocale } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";

const icons = [MessageSquareText, LayoutGrid, Palette, Eye];

export function AiSection() {
  const { dict, dir } = useLocale();
  const t = dict.marketing.ai;

  return (
    <section id="ai" className="relative overflow-hidden border-t border-border py-24 sm:py-28">
      <div className="pointer-events-none absolute end-0 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 translate-x-1/3 rounded-full bg-success/[0.08] blur-3xl rtl:-translate-x-1/3" />
      <Container className="relative grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-5"
        >
          <span
            className={cn(
              "text-xs font-medium text-success",
              dir === "ltr" ? "tracking-[0.14em] uppercase" : "tracking-normal"
            )}
          >
            {t.eyebrow}
          </span>
          <h2 className="max-w-md text-2xl leading-[1.15] font-medium text-balance sm:text-3xl">{t.title}</h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {t.capabilities.map((c, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <div className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background">
                  <Icon className="size-4" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-medium">{c.label}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{c.detail}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
