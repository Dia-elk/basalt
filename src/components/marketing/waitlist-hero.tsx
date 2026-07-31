"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { GlitchText } from "@/components/shared/glitch-text";
import { Input } from "@/components/ui/input";

const perks = [
  "Priority access before public launch",
  "Early-bird pricing locked in forever",
  "Direct channel to the founding team",
  "Shape the product with your feedback",
];

export function WaitlistHero() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    // Simulated — replace with real API call
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("done");
  }

  return (
    <section>
      <Container className="relative flex flex-col items-center pt-28 pb-20 sm:pt-36 sm:pb-28">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-success" />
          </span>
          Coming Soon
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="mt-6 max-w-3xl text-center text-3xl leading-[1.1] font-medium text-balance sm:text-5xl"
        >
          Something big is brewing on{" "}
          <GlitchText className="font-bold text-success" text="Basalt" />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-5 max-w-lg text-center text-sm text-muted-foreground text-balance sm:text-base"
        >
          A new experience is being crafted behind the scenes. Be the first to
          know when it drops and get exclusive early access.
        </motion.p>

        {/* Email form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="mt-9 w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-success/20 bg-success-muted p-6 text-center"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-success/20">
                  <CheckCircle2 className="size-5 text-success" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-foreground">
                  You&apos;re on the list
                </p>
                <p className="text-xs text-muted-foreground">
                  We&apos;ll reach out to <span className="text-foreground">{email}</span> when
                  it&apos;s time.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="flex gap-2"
              >
                <Input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "submitting"}
                  className="h-11 flex-1 rounded-lg border-border bg-card/60 px-4 text-sm backdrop-blur-sm placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                  className="h-11 gap-2 px-6 text-[15px]"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />
                      Joining…
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" strokeWidth={1.5} />
                      Join Waitlist
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          {status !== "done" && (
            <p className="mt-3 text-center text-xs text-muted-foreground/70">
              No spam, ever. Unsubscribe in one click.
            </p>
          )}
        </motion.div>

        {/* Perks list */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-col items-center gap-2.5 text-sm text-muted-foreground sm:mt-12"
        >
          {perks.map((perk) => (
            <motion.li
              key={perk}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="size-3.5 shrink-0 text-success" strokeWidth={1.5} />
              {perk}
            </motion.li>
          ))}
        </motion.ul>

        {/* Or browse the product */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
          className="mt-12"
        >
          <Button
            render={<Link href="/" />}
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground"
          >
            Explore what we&apos;ve already built
            <ArrowRight className="size-3.5 rtl:rotate-180" strokeWidth={1.5} />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
