"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { paymentSchema, type PaymentFormData } from "@/lib/schemas/auth";
import type { PricingPlan } from "@/lib/mock/pricing";
import type { BillingPeriod } from "@/components/shared/billing-toggle";

export function PaymentForm({
  plan,
  billingPeriod = "yearly",
}: {
  plan: PricingPlan;
  billingPeriod?: BillingPeriod;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { cardholderName: "", cardNumber: "", expiry: "", cvc: "" },
  });

  const displayPrice = billingPeriod === "yearly" ? plan.yearlyPrice : plan.price;

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    toast.success("Payment method added", {
      description: `You're all set on the ${plan.name} plan — $${displayPrice}/mo${billingPeriod === "yearly" ? ", billed yearly" : ""}.`,
    });
    router.push("/dashboard/stores/new");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="cardholderName">Name on card</Label>
        <Input id="cardholderName" placeholder="Amina Kader" {...register("cardholderName")} />
        {errors.cardholderName && <p className="text-xs text-destructive">{errors.cardholderName.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="cardNumber">Card number</Label>
        <Input id="cardNumber" placeholder="4242 4242 4242 4242" inputMode="numeric" {...register("cardNumber")} />
        {errors.cardNumber && <p className="text-xs text-destructive">{errors.cardNumber.message}</p>}
      </div>

      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="expiry">Expiry</Label>
          <Input id="expiry" placeholder="MM/YY" {...register("expiry")} />
          {errors.expiry && <p className="text-xs text-destructive">{errors.expiry.message}</p>}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input id="cvc" placeholder="123" inputMode="numeric" {...register("cvc")} />
          {errors.cvc && <p className="text-xs text-destructive">{errors.cvc.message}</p>}
        </div>
      </div>

      <Button type="submit" size="lg" disabled={loading} className="mt-2 h-11 gap-2">
        {loading ? (
          <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />
        ) : (
          <>
            Start building
            <ArrowRight className="size-4" strokeWidth={1.5} />
          </>
        )}
      </Button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <Lock className="size-3" strokeWidth={1.5} />
        Payments are encrypted and processed securely.
      </p>
    </form>
  );
}
