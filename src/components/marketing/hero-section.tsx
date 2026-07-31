"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Heart, Star } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { GLSLHills } from "@/components/ui/glsl-hills";
import { CountUp } from "@/components/shared/count-up";
import { GlitchText } from "@/components/shared/glitch-text";
import { useLocale } from "@/lib/i18n/locale-provider";

const products = [
  { name: "Amber Nocturne", price: "$128" },
  { name: "Neroli & Oud", price: "$145" },
  { name: "Vetiver Homme", price: "$98" },
  { name: "Rose Absolute", price: "$165" },
  { name: "Oud Intense", price: "$135" },
  { name: "Santal Blanc", price: "$110" },
];

export function HeroSection() {
  const [step, setStep] = useState(0);
  const { dict } = useLocale();
  const t = dict.marketing.hero;

  const stats = [
    { label: t.statLabels.storesCreated, value: 4218 },
    { label: t.statLabels.timeToLive, value: 41, suffix: "s" },
    { label: t.statLabels.uptime, value: 99.98, decimals: 2, suffix: "%" },
  ];

  const chatScript = [
    { role: "user", text: t.mockup.userMessage },
    { role: "ai", text: t.mockup.aiMessage1 },
    { role: "ai", text: t.mockup.aiMessage2, done: true },
    { role: "ai", text: t.mockup.publishing, progress: true },
  ];

  useEffect(() => {
    if (step >= chatScript.length) return;
    const delay = step === 0 ? 700 : 1400;
    const timer = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const featuresLive = step >= 3;
  const previewLive = step >= 4;

  return (
    <section className="relative overflow-hidden">
      <GLSLHills className="pointer-events-none absolute inset-0" />

      <Container className="relative flex flex-col items-center pt-24 pb-24 sm:pt-32 sm:pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="max-w-3xl text-center text-3xl leading-[1.1] font-medium text-balance sm:text-5xl"
        >
          {t.headingLine1}
          <br />
          <GlitchText
            className="font-bold text-success"
            text={t.headingBold}
            style={{ "--glitch-duration-a": "0.9s", "--glitch-duration-b": "1.15s" } as React.CSSProperties}
          />{" "}
          {t.headingRest}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-6 max-w-xl text-center text-sm text-muted-foreground text-balance sm:text-base"
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button render={<Link href="/register" />} size="lg" className="h-11 gap-2 px-6 text-[15px]">
            {t.ctaPrimary}
            <ArrowRight className="size-4 rtl:rotate-180" strokeWidth={1.5} />
          </Button>
          <Button render={<Link href="#ai" />} size="lg" variant="outline" className="h-11 px-6 text-[15px]">
            {t.ctaSecondary}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-12 flex items-center gap-8 text-sm sm:gap-12"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <CountUp
                value={s.value}
                decimals={s.decimals}
                suffix={s.suffix}
                delay={0.4}
                className="text-xl font-semibold tabular-nums sm:text-2xl"
              />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="mt-16 w-full max-w-5xl"
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/40">
            <div className="flex h-10 items-center gap-1.5 border-b border-border px-4">
              <span className="size-2.5 rounded-full bg-muted" />
              <span className="size-2.5 rounded-full bg-muted" />
              <span className="size-2.5 rounded-full bg-muted" />
              <span className="ms-3 rounded-md bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
                lumiere.buildonbasalt.com
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="flex flex-col gap-3 border-border p-4 md:col-span-2 md:border-e">
                {chatScript.slice(0, step).map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={
                      m.role === "user"
                        ? "ms-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-secondary px-3.5 py-2.5 text-sm text-foreground"
                        : "me-auto max-w-[90%] rounded-2xl rounded-tl-sm border border-border bg-background px-3.5 py-2.5 text-sm text-muted-foreground"
                    }
                  >
                    <p>{m.text}</p>
                    {m.done && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-success">
                        <CheckCircle2 className="size-3.5" strokeWidth={1.5} />
                        {t.mockup.featuresTurnedOn}
                      </div>
                    )}
                    {m.progress && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        {previewLive ? (
                          <>
                            <CheckCircle2 className="size-3.5 text-success" strokeWidth={1.5} />
                            {t.mockup.live}
                          </>
                        ) : (
                          <>
                            <Loader2 className="size-3.5 animate-spin" strokeWidth={1.5} />
                            {t.mockup.almostReady}
                          </>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="relative flex flex-col bg-background p-4 pb-16 md:col-span-3">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-semibold">Lumière</span>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>{t.mockup.shop}</span>
                    <span>{t.mockup.collections}</span>
                    <span>{t.mockup.journal}</span>
                  </div>
                </div>

                <AnimatePresence>
                  {featuresLive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="overflow-hidden rounded-lg border border-white/10 bg-[color-mix(in_oklch,var(--foreground),transparent_92%)] p-3"
                    >
                      <p className="text-xs font-medium" style={{ color: "#D4AF6A" }}>
                        {t.mockup.newFeatureBanner}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {products.map((product) => (
                    <div
                      key={product.name}
                      className="relative flex flex-col gap-2 rounded-xl border border-border bg-card p-2.5"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-muted to-secondary">
                        <AnimatePresence>
                          {featuresLive && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.6 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="absolute top-1.5 right-1.5 z-10 flex size-5 items-center justify-center rounded-full bg-background/80"
                            >
                              <Heart className="size-3" strokeWidth={1.5} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <p className="truncate text-xs font-medium">{product.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{product.price}</span>
                        <AnimatePresence>
                          {featuresLive && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="inline-flex items-center gap-0.5 text-muted-foreground"
                            >
                              <Star className="size-2.5 fill-current" strokeWidth={0} />
                              <span className="text-[10px]">4.9</span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className={
                    "absolute end-5 bottom-5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors " +
                    (previewLive
                      ? "border-success/30 bg-success-muted text-success"
                      : "border-border bg-muted text-muted-foreground")
                  }
                >
                  <span className={"size-1.5 rounded-full " + (previewLive ? "bg-success" : "bg-muted-foreground")} />
                  {previewLive ? t.mockup.previewLive : t.mockup.buildingPreview}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
