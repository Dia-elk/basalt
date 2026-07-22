"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLocale } from "@/lib/i18n/locale-provider";

const people = [
  { name: "Amina Kader", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "Marcus Reyes", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
  { name: "Sara Haddad", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
];

export function TestimonialsSection() {
  const { dict } = useLocale();
  const t = dict.marketing.testimonials;

  return (
    <section className="border-t border-border py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const person = people[i];
            return (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-7"
              >
                <Quote className="size-6 text-muted-foreground" strokeWidth={1.5} />
                <p className="flex-1 text-[15px] leading-relaxed text-balance">{item.quote}</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    width={40}
                    height={40}
                    className="size-10 rounded-full object-cover grayscale"
                  />
                  <div>
                    <p className="text-sm font-medium">{person.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
