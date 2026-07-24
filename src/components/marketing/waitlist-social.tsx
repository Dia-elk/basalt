"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

const spots = [
  { avatar: "🖤", name: "Sarah K.", label: "Founder" },
  { avatar: "⚡", name: "Marcus L.", label: "Developer" },
  { avatar: "🔥", name: "Aisha R.", label: "Designer" },
  { avatar: "✨", name: "James T.", label: "Indie maker" },
  { avatar: "🚀", name: "Lina W.", label: "Entrepreneur" },
];

export function WaitlistSocial() {
  return (
    <section className="relative overflow-hidden border-t border-border py-24 sm:py-28">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[26rem] w-[40rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-success/[0.04] blur-3xl" />

      <Container className="relative flex flex-col items-center text-center">
        {/* Avatars row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <div className="flex -space-x-2">
            {spots.map((s) => (
              <div
                key={s.name}
                className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-card text-sm"
                title={s.name}
              >
                {s.avatar}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="size-4" strokeWidth={1.5} />
            <span className="font-medium text-foreground">2,847</span> on the waitlist
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          className="mt-8 max-w-xl text-2xl leading-[1.15] font-medium text-balance sm:text-3xl"
        >
          Don&apos;t miss the launch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mt-4 max-w-md text-sm text-muted-foreground text-balance"
        >
          We&apos;re onboarding waitlist members in batches. The earlier you join,
          the sooner you get in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="mt-8"
        >
          <Button
            render={<Link href="#" />}
            size="lg"
            className="h-11 gap-2 px-7 text-[15px]"
          >
            Join the waitlist
            <ArrowRight className="size-4 rtl:rotate-180" strokeWidth={1.5} />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
