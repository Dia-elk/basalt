"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Minus, Plus, Zap, Store, TrendingUp, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";
import { CREDIT_RATE, CREDIT_STEP, CREDIT_MAX, type PricingPlan } from "@/lib/mock/pricing";
import type { BillingPeriod } from "@/components/shared/billing-toggle";

const planIcons: Record<string, typeof Zap> = {
  free: Zap,
  starter: Store,
  professional: TrendingUp,
  agency: Building2,
};

export function PricingCard({
  plan,
  interactive = false,
  className,
  billingPeriod = "yearly",
  getHref = (p) => `/register?plan=${p.id}&billing=${billingPeriod}`,
}: {
  plan: PricingPlan;
  interactive?: boolean;
  className?: string;
  billingPeriod?: BillingPeriod;
  getHref?: (plan: PricingPlan) => string;
}) {
  const { dict } = useLocale();
  const copy = dict.marketing.pricingPlans[plan.id];
  const cardText = dict.marketing.pricingCard;
  const [credits, setCredits] = useState(plan.includedCredits);
  const extraCredits = Math.max(0, credits - plan.includedCredits);
  const extraCost = plan.id === "agency" ? 0 : Math.round(extraCredits * CREDIT_RATE);
  const basePrice = billingPeriod === "yearly" ? plan.yearlyPrice : plan.price;
  const totalPrice = basePrice + extraCost;
  const showDiscount = billingPeriod === "yearly" && plan.yearlyPrice < plan.price;
  const Icon = planIcons[plan.id] ?? Zap;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card",
        plan.highlighted ? "border-success/30 glow-success" : "border-border",
        className
      )}
    >
      {plan.highlighted && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-success/[0.08] to-transparent" />
      )}

      <div className="relative flex flex-1 flex-col gap-6 p-7 lg:p-8">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl border",
                plan.highlighted
                  ? "border-success/30 bg-success-muted text-success"
                  : "border-border bg-muted text-muted-foreground"
              )}
            >
              <Icon className="size-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base font-medium">{copy.name}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{copy.description}</p>
            </div>
          </div>
          {plan.highlighted && (
            <span className="shrink-0 rounded-full border border-success/30 bg-success-muted px-2.5 py-1 text-[11px] font-medium text-success">
              {cardText.mostPopular}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl leading-none font-semibold tracking-tight tabular-nums">${totalPrice}</span>
              <span className="text-sm text-muted-foreground">{cardText.perMonth}</span>
              {showDiscount && (
                <span className="font-mono text-sm text-muted-foreground line-through">${plan.price}</span>
              )}
            </div>
            {billingPeriod === "yearly" && plan.price > 0 && (
              <span className="text-xs text-muted-foreground">Billed ${basePrice * 12}/yr</span>
            )}
          </div>
          <Button
            render={<Link href={getHref(plan)} />}
            size="lg"
            variant={plan.highlighted ? "default" : "outline"}
            className={cn(
              "h-11 w-full px-6 text-[15px] lg:w-auto",
              plan.highlighted && "shadow-lg shadow-success/10"
            )}
          >
            {copy.cta}
          </Button>
        </div>

        {interactive && (
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-background/60 p-4">
            <p className="text-xs text-muted-foreground">{cardText.creditsLabel}</p>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setCredits((c) => Math.max(plan.includedCredits, c - CREDIT_STEP))}
                disabled={credits <= plan.includedCredits}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                aria-label="Decrease AI credits"
              >
                <Minus className="size-4" strokeWidth={1.5} />
              </button>
              <div className="flex min-w-24 flex-col items-center">
                <span className="font-mono text-lg font-semibold tabular-nums">{credits.toLocaleString()}</span>
                <span className="text-[11px] text-muted-foreground">credits / mo</span>
              </div>
              <button
                type="button"
                onClick={() => setCredits((c) => Math.min(CREDIT_MAX, c + CREDIT_STEP))}
                disabled={credits >= CREDIT_MAX}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                aria-label="Increase AI credits"
              >
                <Plus className="size-4" strokeWidth={1.5} />
              </button>
            </div>
            <p className="text-center text-[11px] text-muted-foreground">
              {plan.includedCredits.toLocaleString()} {cardText.includedSuffix}
              {extraCost > 0 &&
                plan.id !== "agency" &&
                `${cardText.extraCostPrefix}${extraCost}${cardText.extraCostMiddle}${extraCredits.toLocaleString()}${cardText.extraCostSuffix}`}
              {plan.id === "agency" && cardText.unlimitedNote}
            </p>
          </div>
        )}

        <ul className="mt-auto grid grid-cols-1 gap-x-6 gap-y-3 border-t border-border pt-6 lg:grid-cols-2">
          {copy.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={2} />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
