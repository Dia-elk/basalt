"use client";

import { Check } from "lucide-react";
import { languageOptions } from "@/lib/mock/wizard-options";
import type { WizardData } from "@/lib/wizard-types";
import { cn } from "@/lib/utils";

export function StepLanguages({
  data,
  update,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
}) {
  const toggle = (value: string) => {
    if (value === "en") return;
    const next = data.languages.includes(value)
      ? data.languages.filter((l) => l !== value)
      : [...data.languages, value];
    update({ languages: next });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid max-h-96 grid-cols-1 gap-2.5 overflow-y-auto pe-1 sm:grid-cols-2">
        {languageOptions.map((lang) => {
          const active = data.languages.includes(lang.value);
          const locked = lang.value === "en";
          return (
            <button
              key={lang.value}
              type="button"
              disabled={locked}
              onClick={() => toggle(lang.value)}
              className={cn(
                "flex items-center justify-between rounded-xl border px-3.5 py-3 text-start transition-colors",
                active ? "border-foreground/30 bg-card" : "border-border hover:bg-card",
                locked && "cursor-not-allowed opacity-70"
              )}
            >
              <div>
                <p className="text-sm font-medium">{lang.label}</p>
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
      <p className="text-xs text-muted-foreground">{data.languages.length} language{data.languages.length === 1 ? "" : "s"} selected. Select as many as you need.</p>
    </div>
  );
}
