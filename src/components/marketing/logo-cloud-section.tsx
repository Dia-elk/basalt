"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { LogoCloud } from "@/components/shared/logo-cloud";
import { useLocale } from "@/lib/i18n/locale-provider";

export function LogoCloudSection() {
  const { dict } = useLocale();
  const t = dict.marketing.logoCloud;

  return (
    <section className="border-t border-border py-20 sm:py-24">
      <Container className="flex flex-col items-center">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} className="max-w-lg" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-12 w-full max-w-3xl"
        >
          <LogoCloud />
        </motion.div>
      </Container>
    </section>
  );
}
