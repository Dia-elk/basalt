"use client";

import { motion } from "framer-motion";
import { MessageSquareText, Wand2, Eye, Rocket } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLocale } from "@/lib/i18n/locale-provider";

const icons = [MessageSquareText, Wand2, Eye, Rocket];
const indexes = ["01", "02", "03", "04"];

export function HowItWorksSection() {
  const { dict } = useLocale();
  const t = dict.marketing.howItWorks;

  return (
    <section id="how-it-works" className="border-t border-border py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute top-6 left-0 hidden h-px w-full bg-border lg:block" />
          {t.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="relative flex flex-col gap-4"
              >
                <div className="relative z-10 inline-flex size-12 items-center justify-center rounded-full border border-border bg-background">
                  <Icon className="size-5" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{indexes[i]}</span>
                  <h3 className="text-[15px] font-medium">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
