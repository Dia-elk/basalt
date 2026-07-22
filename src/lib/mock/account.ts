import { pricingPlans } from "@/lib/mock/pricing";

export const CURRENT_PLAN_ID = "professional";

export function getCurrentPlan() {
  return pricingPlans.find((p) => p.id === CURRENT_PLAN_ID) ?? pricingPlans[0];
}
