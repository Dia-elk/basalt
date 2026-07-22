"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { StepStartingPoint } from "@/components/wizard/steps/step-starting-point";
import { StepBusiness } from "@/components/wizard/steps/step-business";
import { StepBrand } from "@/components/wizard/steps/step-brand";
import { StepType } from "@/components/wizard/steps/step-type";
import { StepLanguages } from "@/components/wizard/steps/step-languages";
import { StepCurrency } from "@/components/wizard/steps/step-currency";
import { StepFeatures } from "@/components/wizard/steps/step-features";
import { StepReview } from "@/components/wizard/steps/step-review";
import { DeploymentProgress } from "@/components/wizard/deployment-progress";
import { initialWizardData, type WizardData } from "@/lib/wizard-types";
import { slugify, saveSessionStore, getSessionStore } from "@/lib/mock/session-store";
import { cn } from "@/lib/utils";

type StepKey = "start" | "business" | "brand" | "type" | "languages" | "currency" | "features" | "review";

const stepMeta: Record<StepKey, { label: string; title: string; subtitle: string }> = {
  start: {
    label: "Start",
    title: "How do you want to start?",
    subtitle: "Choose how Basalt should set up your store's foundation.",
  },
  business: {
    label: "Business",
    title: "Tell us about your business",
    subtitle: "Basalt reads this to set up your store's foundations.",
  },
  brand: {
    label: "Brand",
    title: "Define your brand",
    subtitle: "Colors and typography carried through your entire storefront.",
  },
  type: {
    label: "Type",
    title: "What are you selling?",
    subtitle: "This determines which features are suggested by default.",
  },
  languages: {
    label: "Languages",
    title: "Choose your languages",
    subtitle: "Every store comes with full right-to-left support for Arabic, built in.",
  },
  currency: {
    label: "Currency",
    title: "Choose your currencies",
    subtitle: "Customers can check out in any currency you support.",
  },
  features: {
    label: "Features",
    title: "Enable features",
    subtitle: "You can turn any of these on or off later from Store Settings.",
  },
  review: {
    label: "Review",
    title: "Review & create",
    subtitle: "Everything looks good? Basalt will set up and publish your store.",
  },
};

export default function NewStorePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(initialWizardData);
  const [deploying, setDeploying] = useState(false);
  const [slug, setSlug] = useState("");

  const update = (patch: Partial<WizardData>) => setData((prev) => ({ ...prev, ...patch }));

  const domain = useMemo(() => `${slug || "your-store"}.buildonbasalt.com`, [slug]);

  const isTemplateFlow = data.startingPoint === "free-template" || data.startingPoint === "premium-template";

  const steps: StepKey[] = useMemo(() => {
    const arr: StepKey[] = ["start", "business"];
    if (!isTemplateFlow) arr.push("brand");
    arr.push("type", "languages", "currency", "features", "review");
    return arr;
  }, [isTemplateFlow]);

  const currentKey = steps[step];

  const canContinue = (() => {
    if (currentKey === "start") {
      if (isTemplateFlow) return data.templateId !== null;
      return true;
    }
    if (currentKey === "business") return data.name.trim().length > 0;
    if (currentKey === "type") return data.businessType !== null;
    return true;
  })();

  const handleCreateStore = () => {
    let newSlug = slugify(data.name);
    if (getSessionStore(newSlug)) newSlug = `${newSlug}-${Math.floor(Math.random() * 900 + 100)}`;
    setSlug(newSlug);

    saveSessionStore({
      id: newSlug,
      slug: newSlug,
      name: data.name || "Untitled Store",
      domain: `${newSlug}.buildonbasalt.com`,
      businessType: data.businessType ?? "Other",
      region: data.region,
      status: "building",
      aiStatus: "idle",
      lastDeployedAt: "Setting up now",
      languages: data.languages,
      accent: data.accentColor,
      monthlyRevenue: 0,
      revenueChange: 0,
      visitors: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    });

    setDeploying(true);
  };

  const handleDeployComplete = () => {
    const stored = getSessionStore(slug);
    if (stored) {
      saveSessionStore({ ...stored, status: "active", lastDeployedAt: "Just now" });
    }
  };

  return (
    <Container className="max-w-2xl px-6 py-10 lg:px-8">
      {!deploying && (
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" strokeWidth={1.5} />
          Cancel
        </button>
      )}

      {!deploying && (
        <div className="mb-10 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              Step {step + 1} of {steps.length}
            </span>
            <span className="font-medium text-foreground">{stepMeta[currentKey].label}</span>
          </div>
          <div className="flex gap-1.5">
            {steps.map((key, i) => (
              <div
                key={key}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-300",
                  i <= step ? "bg-success" : "bg-border"
                )}
              />
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
        {deploying ? (
          <DeploymentProgress data={data} slug={slug} domain={domain} onComplete={handleDeployComplete} />
        ) : (
          <>
            <motion.div
              key={currentKey}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="mb-6">
                <h2 className="text-lg font-medium">{stepMeta[currentKey].title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{stepMeta[currentKey].subtitle}</p>
              </div>

              {currentKey === "start" && <StepStartingPoint data={data} update={update} />}
              {currentKey === "business" && <StepBusiness data={data} update={update} />}
              {currentKey === "brand" && <StepBrand data={data} update={update} />}
              {currentKey === "type" && <StepType data={data} update={update} />}
              {currentKey === "languages" && <StepLanguages data={data} update={update} />}
              {currentKey === "currency" && <StepCurrency data={data} update={update} />}
              {currentKey === "features" && <StepFeatures data={data} update={update} />}
              {currentKey === "review" && <StepReview data={data} />}
            </motion.div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
              <Button
                variant="outline"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                Back
              </Button>
              {step < steps.length - 1 ? (
                <Button onClick={() => setStep((s) => s + 1)} disabled={!canContinue}>
                  Continue
                </Button>
              ) : (
                <Button onClick={handleCreateStore}>Create Store</Button>
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
