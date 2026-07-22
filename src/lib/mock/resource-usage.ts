import { pricingPlans } from "@/lib/mock/pricing";

export const accountPlanId = "professional";

const planStorageGb: Record<string, number> = {
  free: 5,
  starter: 25,
  professional: 100,
  agency: 500,
};

export interface AccountResourceUsage {
  cpuPercent: number;
  memoryPercent: number;
  storageUsedGb: number;
  storageTotalGb: number;
  bandwidthPercent: number;
  aiCreditsUsed: number;
  deploymentsThisMonth: number;
}

export const accountResourceUsage: AccountResourceUsage = {
  cpuPercent: 42,
  memoryPercent: 58,
  storageUsedGb: 34.5,
  storageTotalGb: planStorageGb[accountPlanId] ?? 50,
  bandwidthPercent: 61,
  aiCreditsUsed: 640,
  deploymentsThisMonth: 28,
};

export const aiCreditsTotal = pricingPlans.find((p) => p.id === accountPlanId)?.includedCredits ?? 1000;

function seedFrom(slug: string, salt: number) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i) + salt) % 1000;
  return h / 1000;
}

export function generateCreditsSeries(days: number) {
  const points: { date: string; credits: number }[] = [];
  let cumulative = 0;
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const daily = Math.round(8 + seedFrom(`credits-${i}`, i) * 22);
    cumulative += daily;
    points.push({ date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }), credits: cumulative });
  }
  return points;
}
