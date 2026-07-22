"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { PricingCard } from "@/components/shared/pricing-card";
import { BillingToggle, type BillingPeriod } from "@/components/shared/billing-toggle";
import { useLocale } from "@/lib/i18n/locale-provider";
import { pricingPlans } from "@/lib/mock/pricing";

export function PricingTeaserSection() {
  const { dict } = useLocale();
  const t = dict.marketing.pricingTeaser;
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("yearly");

  return (
    <section id="pricing" className="border-t border-border py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-8 flex justify-center">
          <BillingToggle value={billingPeriod} onChange={setBillingPeriod} />
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <PricingCard plan={plan} billingPeriod={billingPeriod} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.compareLink}
            <ArrowRight className="size-3.5 rtl:rotate-180" strokeWidth={1.5} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
