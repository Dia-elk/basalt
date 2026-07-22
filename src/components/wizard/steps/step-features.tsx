"use client";

import { Check } from "lucide-react";
import { featureOptions } from "@/lib/mock/wizard-options";
import type { WizardData } from "@/lib/wizard-types";
import { cn } from "@/lib/utils";

export function StepFeatures({
  data,
  update,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
}) {
  const toggle = (value: string) => {
    const next = data.features.includes(value)
      ? data.features.filter((f) => f !== value)
      : [...data.features, value];
    update({ features: next });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {featureOptions.map((feature) => {
          const active = data.features.includes(feature.value);
          const Icon = feature.icon;
          return (
            <button
              key={feature.value}
              type="button"
              onClick={() => toggle(feature.value)}
              className={cn(
                "flex flex-col gap-3 rounded-xl border p-4 text-start transition-colors",
                active ? "border-foreground/30 bg-card" : "border-border hover:bg-card"
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg border",
                    active ? "border-success/30 bg-success-muted text-success" : "border-border text-muted-foreground"
                  )}
                >
                  <Icon className="size-4.5" strokeWidth={1.5} />
                </div>
                <div
                  className={cn(
                    "flex size-5 items-center justify-center rounded-full border",
                    active ? "border-success bg-success text-success-foreground" : "border-border"
                  )}
                >
                  {active && <Check className="size-3.5" strokeWidth={2.5} />}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">{feature.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
              <p className="mt-auto text-[11px] text-muted-foreground/80 italic">{feature.helpsWhen}</p>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        {data.features.length} feature{data.features.length === 1 ? "" : "s"} enabled. You can change these anytime
        from Store Settings.
      </p>
    </div>
  );
}
