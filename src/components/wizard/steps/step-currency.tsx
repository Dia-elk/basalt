"use client";

import { Check } from "lucide-react";
import { currencyOptions } from "@/lib/mock/wizard-options";
import type { WizardData } from "@/lib/wizard-types";
import { cn } from "@/lib/utils";

export function StepCurrency({
  data,
  update,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
}) {
  const toggle = (value: string) => {
    if (value === "USD") return;
    const next = data.currencies.includes(value)
      ? data.currencies.filter((c) => c !== value)
      : [...data.currencies, value];
    update({ currencies: next });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid max-h-96 grid-cols-1 gap-2.5 overflow-y-auto pe-1 sm:grid-cols-2">
        {currencyOptions.map((currency) => {
          const active = data.currencies.includes(currency.value);
          const locked = currency.value === "USD";
          return (
            <button
              key={currency.value}
              type="button"
              disabled={locked}
              onClick={() => toggle(currency.value)}
              className={cn(
                "flex items-center justify-between rounded-xl border px-3.5 py-3 text-start transition-colors",
                active ? "border-foreground/30 bg-card" : "border-border hover:bg-card",
                locked && "cursor-not-allowed opacity-70"
              )}
            >
              <div>
                <p className="text-sm font-medium">
                  {currency.value} <span className="text-muted-foreground">· {currency.label}</span>
                </p>
                {locked && <p className="text-xs text-muted-foreground">Default, always included</p>}
              </div>
              <div
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border",
                  active ? "border-success bg-success text-success-foreground" : "border-border"
                )}
              >
                {active && <Check className="size-3.5" strokeWidth={2} />}
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        {data.currencies.length} currenc{data.currencies.length === 1 ? "y" : "ies"} selected. Customers can check
        out in any of these.
      </p>
    </div>
  );
}
