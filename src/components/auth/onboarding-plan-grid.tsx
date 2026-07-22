"use client";

import { PricingCard } from "@/components/shared/pricing-card";
import { pricingPlans } from "@/lib/mock/pricing";

export function OnboardingPlanGrid() {
  return (
    <div className="mt-10 grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
      {pricingPlans.map((plan) => (
        <PricingCard
          key={plan.id}
          plan={plan}
          getHref={(p) => (p.price === 0 ? "/dashboard/stores/new" : `/onboarding/payment?plan=${p.id}`)}
        />
      ))}
    </div>
  );
}
