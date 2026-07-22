"use client";

import { businessTypes } from "@/lib/mock/wizard-options";
import type { WizardData } from "@/lib/wizard-types";
import { cn } from "@/lib/utils";

export function StepType({
  data,
  update,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
}) {
  return (
    <div className="grid max-h-96 grid-cols-2 gap-2.5 overflow-y-auto pe-1 sm:grid-cols-3 lg:grid-cols-4">
      {businessTypes.map(({ value, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => update({ businessType: value })}
          className={cn(
            "flex flex-col items-center gap-2.5 rounded-xl border px-3 py-4 text-center transition-colors",
            data.businessType === value ? "border-foreground/30 bg-card" : "border-border hover:bg-card"
          )}
        >
          <Icon className="size-4.5" strokeWidth={1.5} />
          <span className="text-xs leading-tight">{value}</span>
        </button>
      ))}
    </div>
  );
}
