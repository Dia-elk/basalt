import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { pricingPlans } from "@/lib/mock/pricing";

export const metadata: Metadata = {
  title: "Start building | Basalt",
  description: "Create your Basalt account and deploy your first store in minutes.",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; billing?: string }>;
}) {
  const { plan: planId, billing } = await searchParams;
  const plan = pricingPlans.find((p) => p.id === planId) ?? null;
  const billingPeriod = billing === "monthly" ? "monthly" : "yearly";

  return (
    <AuthShell
      title="Start building free"
      subtitle={
        plan
          ? `Create your account to continue with the ${plan.name} plan.`
          : "No credit card required to deploy your first store."
      }
    >
      <RegisterForm plan={plan} billingPeriod={billingPeriod} />
    </AuthShell>
  );
}
