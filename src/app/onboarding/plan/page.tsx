import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/shared/logo";
import { Container } from "@/components/shared/container";
import { OnboardingPlanGrid } from "@/components/auth/onboarding-plan-grid";

export const metadata: Metadata = {
  title: "Choose your plan | Basalt",
};

export default function OnboardingPlanPage() {
  return (
    <Container className="flex max-w-4xl flex-col items-center px-6 py-10 lg:px-8">
      <Link href="/">
        <Logo />
      </Link>

      <div className="mt-8 flex flex-col items-center text-center">
        <h1 className="text-2xl font-medium">Choose your plan</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Pick the plan that fits your store. You can change this anytime from Billing.
        </p>
      </div>

      <OnboardingPlanGrid />

      <Link
        href="/dashboard/stores/new"
        className="mt-8 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        Skip for now, choose later
      </Link>
    </Container>
  );
}
