"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, History, Eye, TrendingUp, Clock } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLocale } from "@/lib/i18n/locale-provider";

const icons = [ShieldCheck, Sparkles, History, Eye, TrendingUp, Clock];

export function ArchitectureSection() {
  const { dict } = useLocale();
  const t = dict.marketing.included;

  return (
    <section id="included" className="border-t border-border py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="relative mx-auto mt-16 max-w-2xl">
          <div className="absolute top-2 bottom-2 start-8 w-px bg-border" />
          <div className="flex flex-col gap-2">
            {t.items.map((item, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
                  className="group relative flex gap-5 rounded-xl p-3 transition-colors hover:bg-card"
                >
                  <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-foreground/25">
                    <Icon className="size-4.5" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-1 flex-col gap-1 pt-1 pb-2">
                    <h3 className="text-[15px] font-medium">{item.title}</h3>
                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
