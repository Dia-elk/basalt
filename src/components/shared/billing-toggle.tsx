"use client";

import { cn } from "@/lib/utils";

export type BillingPeriod = "monthly" | "yearly";

export function BillingToggle({
  value,
  onChange,
}: {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={cn(
          "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
          value === "monthly" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange("yearly")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
          value === "yearly" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        Yearly
        <span className="rounded-full bg-success-muted px-1.5 py-0.5 text-[10px] font-semibold text-success">
          Save 20%
        </span>
      </button>
    </div>
  );
}
