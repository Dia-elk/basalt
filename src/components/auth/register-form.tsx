"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { registerSchema, type RegisterFormData } from "@/lib/schemas/auth";
import type { PricingPlan } from "@/lib/mock/pricing";
import type { BillingPeriod } from "@/components/shared/billing-toggle";

export function RegisterForm({
  plan,
  billingPeriod = "yearly",
}: {
  plan?: PricingPlan | null;
  billingPeriod?: BillingPeriod;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", terms: false },
  });

  const displayPrice = plan ? (billingPeriod === "yearly" ? plan.yearlyPrice : plan.price) : 0;

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (!plan) {
      router.push("/onboarding/plan");
    } else if (plan.price === 0) {
      router.push("/dashboard/stores/new");
    } else {
      router.push(`/onboarding/payment?plan=${plan.id}&billing=${billingPeriod}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {plan && (
        <div className="flex items-center justify-between rounded-xl border border-border bg-card px-3.5 py-2.5">
          <div>
            <p className="text-sm font-medium">{plan.name} plan</p>
            <p className="text-xs text-muted-foreground">
              {plan.price === 0 ? "Free" : `$${displayPrice}/mo`}
            </p>
          </div>
          <Link href="/pricing" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
            Change plan
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" placeholder="Amina Kader" {...register("name")} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@company.com" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2.5">
          <Checkbox
            id="terms"
            checked={watch("terms") === true}
            onCheckedChange={(checked) => setValue("terms", checked === true, { shouldValidate: true })}
            className="mt-0.5"
          />
          <Label htmlFor="terms" className="text-sm leading-snug font-normal text-muted-foreground">
            I agree to the Terms of Service and Privacy Policy
          </Label>
        </div>
        {errors.terms && <p className="text-xs text-destructive">{errors.terms.message}</p>}
      </div>

      <Button type="submit" disabled={loading} className="mt-2 h-10 gap-2">
        {loading ? (
          <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />
        ) : (
          <>
            Create account
            <ArrowRight className="size-4" strokeWidth={1.5} />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-foreground transition-colors hover:text-muted-foreground">
          Sign in
        </Link>
      </p>
    </form>
  );
}
