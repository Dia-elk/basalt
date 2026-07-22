"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { colorPresets, fontPairings } from "@/lib/mock/wizard-options";
import type { WizardData } from "@/lib/wizard-types";
import { cn } from "@/lib/utils";

export function StepBrand({
  data,
  update,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
}) {
  const activePreset = colorPresets.find(
    (p) => p.primary === data.primaryColor && p.secondary === data.secondaryColor && p.accent === data.accentColor
  );

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Label>Brand palette</Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() =>
                update({ primaryColor: preset.primary, secondaryColor: preset.secondary, accentColor: preset.accent })
              }
              className={cn(
                "flex flex-col gap-2.5 rounded-xl border p-3 text-start transition-colors",
                activePreset?.name === preset.name
                  ? "border-foreground/30 bg-card"
                  : "border-border hover:bg-card"
              )}
            >
              <div className="flex items-center gap-1.5">
                <span className="size-6 rounded-full border border-white/10" style={{ backgroundColor: preset.primary }} />
                <span className="size-6 rounded-full border border-white/10" style={{ backgroundColor: preset.secondary }} />
                <span className="size-6 rounded-full border border-white/10" style={{ backgroundColor: preset.accent }} />
                {activePreset?.name === preset.name && (
                  <Check className="ms-auto size-4 text-success" strokeWidth={1.5} />
                )}
              </div>
              <span className="text-xs text-muted-foreground">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <ColorField label="Primary" value={data.primaryColor} onChange={(v) => update({ primaryColor: v })} />
        <ColorField label="Secondary" value={data.secondaryColor} onChange={(v) => update({ secondaryColor: v })} />
        <ColorField label="Accent" value={data.accentColor} onChange={(v) => update({ accentColor: v })} />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Typography</Label>
        <div className="flex flex-col gap-2">
          {fontPairings.map((pairing) => (
            <button
              key={pairing.name}
              type="button"
              onClick={() => update({ font: pairing.name })}
              className={cn(
                "flex items-center justify-between rounded-xl border px-4 py-3 text-start transition-colors",
                data.font === pairing.name ? "border-foreground/30 bg-card" : "border-border hover:bg-card"
              )}
            >
              <div>
                <p className="text-base" style={{ fontFamily: pairing.heading }}>
                  {pairing.name.split(" / ")[1]}
                </p>
                <p className="text-xs text-muted-foreground" style={{ fontFamily: pairing.body }}>
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>
              {data.font === pairing.name && <Check className="size-4 shrink-0 text-success" strokeWidth={1.5} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const isValid = HEX_PATTERN.test(draft);

  useEffect(() => setDraft(value), [value]);

  const commit = () => {
    if (isValid) onChange(draft);
    else setDraft(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border bg-card px-2 py-1.5 transition-colors",
          isValid ? "border-border focus-within:border-foreground/30" : "border-destructive/50"
        )}
      >
        <label className="relative size-6 shrink-0 overflow-hidden rounded-full border border-white/10">
          <input
            type="color"
            value={isValid ? draft : value}
            onChange={(e) => {
              setDraft(e.target.value);
              onChange(e.target.value);
            }}
            className="absolute -top-1 -start-1 size-8 cursor-pointer"
          />
        </label>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && commit()}
          spellCheck={false}
          maxLength={7}
          className="w-full min-w-0 bg-transparent font-mono text-xs text-foreground uppercase outline-none placeholder:text-muted-foreground"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
