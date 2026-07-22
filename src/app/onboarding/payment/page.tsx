import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Container } from "@/components/shared/container";
import { PaymentForm } from "@/components/auth/payment-form";
import { pricingPlans } from "@/lib/mock/pricing";

export const metadata: Metadata = {
  title: "Add payment method | Basalt",
};

export default async function OnboardingPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; billing?: string }>;
}) {
  const { plan: planId, billing } = await searchParams;
  const plan = pricingPlans.find((p) => p.id === planId);
  const billingPeriod = billing === "monthly" ? "monthly" : "yearly";

  if (!plan || plan.price === 0) {
    redirect("/onboarding/plan");
  }

  const displayPrice = billingPeriod === "yearly" ? plan.yearlyPrice : plan.price;

  return (
    <Container className="flex max-w-md flex-col items-center px-6 py-10 lg:px-8">
      <Link href="/">
        <Logo />
      </Link>

      <div className="mt-8 flex flex-col items-center text-center">
        <h1 className="text-2xl font-medium">Add a payment method</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          The {plan.name} plan is ${displayPrice}/mo{billingPeriod === "yearly" ? ", billed yearly" : ""}. You won&apos;t be charged until your store goes live.
        </p>
      </div>

      <PaymentForm plan={plan} billingPeriod={billingPeriod} />
    </Container>
  );
}
