"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { PricingCard } from "@/components/shared/pricing-card";
import { BillingToggle, type BillingPeriod } from "@/components/shared/billing-toggle";
import { useLocale } from "@/lib/i18n/locale-provider";
import { pricingPlans, comparisonRows } from "@/lib/mock/pricing";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PricingPage() {
  const { dict } = useLocale();
  const t = dict.marketing.pricingTeaser;
  const p = dict.marketing.pricingPage;
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("yearly");

  return (
    <div className="flex flex-1 flex-col">
      <SmoothScroll />
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border py-20 sm:py-24">
          <Container>
            <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={p.subtitle} />

            <div className="mt-8 flex justify-center">
              <BillingToggle value={billingPeriod} onChange={setBillingPeriod} />
            </div>

            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
              {pricingPlans.map((plan) => (
                <PricingCard key={plan.id} plan={plan} interactive billingPeriod={billingPeriod} />
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-muted-foreground">{p.disclaimer}</p>
          </Container>
        </section>

        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading eyebrow={p.compareEyebrow} title={p.compareTitle} align="center" />

            <div className="mt-14 overflow-x-auto rounded-2xl border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-40 text-muted-foreground">{p.planColumnLabel}</TableHead>
                    {pricingPlans.map((plan) => (
                      <TableHead key={plan.id} className="min-w-40">
                        <div className="flex items-center gap-2 py-2">
                          <span className="font-medium text-foreground">{dict.marketing.pricingPlans[plan.id].name}</span>
                          {plan.highlighted && (
                            <span className="rounded-full border border-success/30 bg-success-muted px-2 py-0.5 text-[10px] font-medium text-success">
                              {p.popularLabel}
                            </span>
                          )}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonRows.map((row) => (
                    <TableRow key={row.key}>
                      <TableCell className="font-medium text-muted-foreground">{row.label}</TableCell>
                      {pricingPlans.map((plan) => (
                        <TableCell key={plan.id}>{plan.specs[row.key]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">{p.priceRowLabel}</TableCell>
                    {pricingPlans.map((plan) => (
                      <TableCell key={plan.id} className="font-medium text-foreground">
                        ${billingPeriod === "yearly" ? plan.yearlyPrice : plan.price} {p.perMonthSuffix}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Container>
        </section>

        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
