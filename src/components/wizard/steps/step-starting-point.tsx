"use client";

import { useState } from "react";
import { Sparkles, LayoutTemplate, Gem, Check, Grid2x2, ExternalLink } from "lucide-react";
import { templates, type StoreTemplate } from "@/lib/mock/templates";
import type { StartingPoint, WizardData } from "@/lib/wizard-types";
import { cn } from "@/lib/utils";
import { TemplatePreview } from "@/components/wizard/template-preview";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const options: {
  value: StartingPoint;
  icon: typeof Sparkles;
  title: string;
  description: string;
  badge: string;
}[] = [
  {
    value: "ai",
    icon: Sparkles,
    title: "Blank canvas, built with AI",
    description: "Describe your business in plain language and Basalt configures everything for you.",
    badge: "Recommended · uses AI credits",
  },
  {
    value: "free-template",
    icon: LayoutTemplate,
    title: "Start from a free template",
    description: "Pick a professionally designed template and customize it yourself.",
    badge: "No AI credits needed",
  },
  {
    value: "premium-template",
    icon: Gem,
    title: "Browse premium templates",
    description: "Unlock advanced, designer-made templates for a one-time fee.",
    badge: "One-time purchase",
  },
];

function TemplateCard({
  template,
  active,
  onSelect,
}: {
  template: StoreTemplate;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-2.5 overflow-hidden rounded-xl border text-start transition-colors",
        active ? "border-foreground/30" : "border-border hover:border-foreground/20"
      )}
    >
      <button type="button" onClick={onSelect} className="contents">
        <TemplatePreview template={template} />
        <div className="flex items-center justify-between px-3 pb-3">
          <div>
            <p className="text-xs font-medium">{template.name}</p>
            <p className="text-[11px] text-muted-foreground">{template.category}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground">
              {template.price === 0 ? "Free" : `$${template.price}`}
            </span>
            {active && <Check className="size-4 shrink-0 text-success" strokeWidth={2} />}
          </div>
        </div>
      </button>
      <a
        href={`/templates/${template.id}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 end-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[10px] font-medium text-foreground opacity-0 shadow-sm ring-1 ring-border transition-opacity group-hover:opacity-100"
        aria-label={`Preview ${template.name} in a new tab`}
      >
        <ExternalLink className="size-3" strokeWidth={1.5} />
        Preview
      </a>
    </div>
  );
}

export function StepStartingPoint({
  data,
  update,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
}) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const isTemplateFlow = data.startingPoint === "free-template" || data.startingPoint === "premium-template";
  const visibleTemplates = templates.filter((t) =>
    data.startingPoint === "free-template" ? t.price === 0 : t.price > 0
  );

  function selectTemplate(template: StoreTemplate) {
    update({
      templateId: template.id,
      startingPoint: template.price === 0 ? "free-template" : "premium-template",
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {options.map(({ value, icon: Icon, title, description, badge }) => {
          const active = data.startingPoint === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => update({ startingPoint: value, templateId: null })}
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
                {active && (
                  <div className="flex size-5 items-center justify-center rounded-full border border-success bg-success text-success-foreground">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{description}</p>
              </div>
              <span className="mt-auto text-[11px] text-muted-foreground">{badge}</span>
            </button>
          );
        })}
      </div>

      {isTemplateFlow && (
        <div className="flex flex-col gap-3 border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Choose a template</p>
            <button
              type="button"
              onClick={() => setGalleryOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Grid2x2 className="size-3.5" strokeWidth={1.5} />
              See all {templates.length} templates
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {visibleTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                active={data.templateId === template.id}
                onSelect={() => selectTemplate(template)}
              />
            ))}
          </div>
        </div>
      )}

      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>All templates</DialogTitle>
            <DialogDescription>
              Browse every free and premium template. Preview one in a new tab, or pick it to update your selection
              above.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                active={data.templateId === template.id}
                onSelect={() => {
                  selectTemplate(template);
                  setGalleryOpen(false);
                }}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
