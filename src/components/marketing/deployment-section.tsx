"use client";

import { motion } from "framer-motion";
import { Eye, RotateCcw, ScrollText, Loader2, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/container";
import { useLocale } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";

const bulletIcons = [Eye, RotateCcw, ScrollText];
const deploymentMeta = [
  { env: "production" as const, status: "ready" as const, duration: "38s" },
  { env: "preview" as const, status: "ready" as const, duration: "29s" },
  { env: "preview" as const, status: "ready" as const, duration: "33s" },
  { env: "production" as const, status: "building" as const, duration: "-" },
];

export function DeploymentSection() {
  const { dict, dir } = useLocale();
  const t = dict.marketing.deployment;

  return (
    <section id="deployment" className="border-t border-border py-24 sm:py-28">
      <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="order-2 overflow-hidden rounded-2xl border border-border bg-card lg:order-1"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <span className="text-sm font-medium">{t.panelTitle}</span>
            <span className="text-xs text-muted-foreground">lumiere.buildonbasalt.com</span>
          </div>
          <div className="flex flex-col divide-y divide-border">
            {t.feed.map((d, i) => {
              const meta = deploymentMeta[i];
              return (
                <div key={d.message} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <div className="flex min-w-0 items-center gap-3">
                    {meta.status === "ready" ? (
                      <CheckCircle2 className="size-4 shrink-0 text-success" strokeWidth={1.5} />
                    ) : (
                      <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" strokeWidth={1.5} />
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm">{d.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {meta.env === "production" ? t.envProduction : t.envPreview} · {d.time}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">{meta.duration}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="order-1 flex flex-col gap-8 lg:order-2"
        >
          <div className="flex flex-col gap-5">
            <span
              className={cn(
                "text-xs font-medium text-success",
                dir === "ltr" ? "tracking-[0.14em] uppercase" : "tracking-normal"
              )}
            >
              {t.eyebrow}
            </span>
            <h2 className="max-w-md text-2xl leading-[1.15] font-medium text-balance sm:text-3xl">{t.title}</h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{t.subtitle}</p>
          </div>
          <div className="flex flex-col gap-5">
            {t.bullets.map((b, i) => {
              const Icon = bulletIcons[i];
              return (
                <div key={b.title} className="flex gap-4">
                  <div className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                    <Icon className="size-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-medium">{b.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{b.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
