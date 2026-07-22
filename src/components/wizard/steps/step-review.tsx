import { languageOptions, featureOptions } from "@/lib/mock/wizard-options";
import { templates } from "@/lib/mock/templates";
import type { WizardData } from "@/lib/wizard-types";

const startingPointLabels: Record<WizardData["startingPoint"], string> = {
  ai: "Blank canvas, built with AI",
  "free-template": "Free template",
  "premium-template": "Premium template",
};

export function StepReview({ data }: { data: WizardData }) {
  const languageLabels = data.languages.map((l) => languageOptions.find((o) => o.value === l)?.label ?? l);
  const featureLabels = data.features.map((f) => featureOptions.find((o) => o.value === f)?.label ?? f);
  const selectedTemplate = templates.find((t) => t.id === data.templateId);
  const isTemplateFlow = data.startingPoint === "free-template" || data.startingPoint === "premium-template";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
        <div
          className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10"
          style={{ backgroundColor: data.accentColor + "1A" }}
        >
          {data.logoPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoPreview} alt="Logo" className="size-full object-cover" />
          ) : (
            <span className="text-2xl font-semibold" style={{ color: data.accentColor }}>
              {data.name.trim().charAt(0).toUpperCase() || "?"}
            </span>
          )}
        </div>
        <div>
          <p className="text-base font-medium">{data.name || "Untitled store"}</p>
          <p className="text-sm text-muted-foreground">{data.businessType ?? "No business type selected"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-2.5 text-xs text-muted-foreground">Starting point</p>
          <p className="text-sm">{startingPointLabels[data.startingPoint]}</p>
          {isTemplateFlow && selectedTemplate && (
            <p className="mt-1 text-xs text-muted-foreground">{selectedTemplate.name}</p>
          )}
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-2.5 text-xs text-muted-foreground">Region</p>
          <p className="text-sm">{data.region}</p>
        </div>
      </div>

      {data.description && (
        <p className="rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
          {data.description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-2.5 text-xs text-muted-foreground">Brand</p>
          <div className="flex items-center gap-1.5">
            <span className="size-5 rounded-full border border-white/10" style={{ backgroundColor: data.primaryColor }} />
            <span className="size-5 rounded-full border border-white/10" style={{ backgroundColor: data.secondaryColor }} />
            <span className="size-5 rounded-full border border-white/10" style={{ backgroundColor: data.accentColor }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{data.font}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-2.5 text-xs text-muted-foreground">Languages</p>
          <div className="flex flex-wrap gap-1.5">
            {languageLabels.map((l) => (
              <span key={l} className="rounded-full border border-border bg-background px-2 py-0.5 text-xs">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="mb-2.5 text-xs text-muted-foreground">Currencies</p>
        <div className="flex flex-wrap gap-1.5">
          {data.currencies.map((c) => (
            <span key={c} className="rounded-full border border-border bg-background px-2 py-0.5 text-xs">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="mb-2.5 text-xs text-muted-foreground">
          Features ({featureLabels.length})
        </p>
        <div className="flex flex-wrap gap-1.5">
          {featureLabels.length > 0 ? (
            featureLabels.map((f) => (
              <span key={f} className="rounded-full border border-border bg-background px-2 py-0.5 text-xs">
                {f}
              </span>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">No optional features enabled</span>
          )}
        </div>
      </div>
    </div>
  );
}
