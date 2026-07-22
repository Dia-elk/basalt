"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-provider";

export function CtaSection() {
  const { dict } = useLocale();
  const t = dict.marketing.cta;

  return (
    <section className="relative overflow-hidden border-t border-border py-24 sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[26rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-success/[0.06] blur-3xl" />
      <Container className="relative flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-xl text-2xl leading-[1.15] font-medium text-balance sm:text-3xl"
        >
          {t.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          className="mt-4 max-w-md text-sm text-muted-foreground text-balance"
        >
          {t.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mt-8"
        >
          <Button render={<Link href="/register" />} size="lg" className="h-11 gap-2 px-7 text-[15px]">
            {t.button}
            <ArrowRight className="size-4 rtl:rotate-180" strokeWidth={1.5} />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
