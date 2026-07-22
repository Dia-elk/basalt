"use client";

import { motion } from "framer-motion";
import { Bot, LayoutTemplate, Rocket, Globe2, BarChart3, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLocale } from "@/lib/i18n/locale-provider";

const icons = [Bot, LayoutTemplate, Rocket, Globe2, BarChart3, ShieldCheck];

export function FeaturesSection() {
  const { dict } = useLocale();
  const t = dict.marketing.features;

  return (
    <section id="features" className="border-t border-border py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((f, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
                className="group flex flex-col gap-4 bg-background p-7 transition-colors hover:bg-card"
              >
                <div className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card transition-colors group-hover:border-foreground/20">
                  <Icon className="size-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-[15px] font-medium">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
