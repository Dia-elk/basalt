"use client";

import { motion } from "framer-motion";
import {
  Package,
  ShoppingCart,
  CreditCard,
  Boxes,
  Tag,
  Star,
  Heart,
  Coins,
  Receipt,
  Truck,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLocale } from "@/lib/i18n/locale-provider";

const icons = [Package, ShoppingCart, CreditCard, Boxes, Tag, Star, Heart, Coins, Receipt, Truck];

export function CommerceEngineSection() {
  const { dict } = useLocale();
  const t = dict.marketing.commerceEngine;

  return (
    <section id="commerce-engine" className="border-t border-border py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
          {t.capabilities.map((label, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 5) * 0.06, ease: "easeOut" }}
                className="flex flex-col items-start gap-3 bg-background p-6 transition-colors hover:bg-card"
              >
                <Icon className="size-5 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-sm font-medium">{label}</span>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
