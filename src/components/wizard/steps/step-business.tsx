"use client";

import { useRef } from "react";
import { Upload, X, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { regionOptions } from "@/lib/mock/wizard-options";
import type { WizardData } from "@/lib/wizard-types";

export function StepBusiness({
  data,
  update,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update({ logoPreview: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="business-name">Business name</Label>
        <Input
          id="business-name"
          placeholder="Lumière Parfums"
          value={data.name}
          onChange={(e) => update({ name: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="business-description">Description</Label>
        <Textarea
          id="business-description"
          placeholder="A minimal fragrance house for people who wear scent like a signature."
          rows={4}
          value={data.description}
          onChange={(e) => update({ description: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          This is what Basalt reads to configure your store. The more specific, the better.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Logo</Label>
        <div className="flex items-center gap-4">
          <div className="flex size-16 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-card">
            {data.logoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoPreview} alt="Logo preview" className="size-full object-cover" />
            ) : (
              <Upload className="size-5 text-muted-foreground" strokeWidth={1.5} />
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
            >
              Upload logo
            </button>
            {data.logoPreview && (
              <button
                type="button"
                onClick={() => update({ logoPreview: null })}
                className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Remove logo"
              >
                <X className="size-4" strokeWidth={1.5} />
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
        <p className="text-xs text-muted-foreground">PNG or SVG, at least 256×256px. Optional.</p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="business-region">Region</Label>
        <Select value={data.region} onValueChange={(value) => value && update({ region: value })}>
          <SelectTrigger id="business-region" className="w-full">
            <MapPin className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
            <SelectValue placeholder="Choose a region" />
          </SelectTrigger>
          <SelectContent>
            {regionOptions.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          {regionOptions.find((r) => r.value === data.region)?.hint ?? "Pick the location closest to your customers."}
        </p>
      </div>
    </div>
  );
}
