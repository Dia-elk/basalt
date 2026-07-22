"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { WizardData } from "@/lib/wizard-types";

function buildSteps(data: WizardData) {
  const isTemplateFlow = data.startingPoint === "free-template" || data.startingPoint === "premium-template";

  return [
    "Reading your business details",
    isTemplateFlow ? "Loading your template" : "Setting up your store",
    `Turning on ${data.features.length || 0} features`,
    isTemplateFlow ? "Applying your template's branding" : "Applying your branding",
    "Preparing your store's pages",
    `Deploying to ${data.region}`,
    "Running final checks",
    "Publishing your store",
  ];
}

export function DeploymentProgress({
  data,
  slug,
  domain,
  onComplete,
}: {
  data: WizardData;
  slug: string;
  domain: string;
  onComplete?: () => void;
}) {
  const steps = buildSteps(data);
  const [completed, setCompleted] = useState(0);
  const done = completed >= steps.length;

  useEffect(() => {
    if (completed >= steps.length) return;
    const delay = 420 + Math.random() * 320;
    const timer = setTimeout(() => setCompleted((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [completed, steps.length]);

  useEffect(() => {
    if (done) onComplete?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const progressPct = Math.round((completed / steps.length) * 100);

  return (
    <div className="flex flex-col gap-8">
      {!done ? (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Creating {data.name || "your store"}</span>
              <span className="font-mono text-xs text-muted-foreground">{progressPct}%</span>
            </div>
            <Progress value={progressPct} className="h-1.5" />
          </div>

          <div className="flex flex-col gap-1">
            {steps.map((step, i) => {
              const isDone = i < completed;
              const isActive = i === completed;
              return (
                <div
                  key={step}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-opacity ${
                    isDone || isActive ? "opacity-100" : "opacity-35"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="size-4 shrink-0 text-success" strokeWidth={1.5} />
                  ) : isActive ? (
                    <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" strokeWidth={1.5} />
                  ) : (
                    <span className="size-4 shrink-0 rounded-full border border-border" />
                  )}
                  <span className={isDone ? "text-muted-foreground line-through" : "text-foreground"}>{step}</span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 py-6 text-center"
        >
          <div className="glow-success flex size-16 items-center justify-center rounded-full bg-success-muted">
            <CheckCircle2 className="size-8 text-success" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xl font-medium">{data.name || "Your store"} is live</h3>
            <p className="text-sm text-muted-foreground">
              Your store is live at{" "}
              <span className="font-mono text-foreground">{domain}</span>
            </p>
          </div>
          <div className="flex w-full flex-col gap-2.5 sm:flex-row">
            <Button render={<Link href={`/dashboard/stores/${slug}`} />} className="flex-1 gap-1.5">
              Open Dashboard
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </Button>
            <Button render={<Link href="/dashboard" />} variant="outline" className="flex-1">
              Back to Stores
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
