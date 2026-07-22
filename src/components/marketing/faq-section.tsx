"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLocale } from "@/lib/i18n/locale-provider";

export function FaqSection() {
  const { dict } = useLocale();
  const t = dict.marketing.faq;

  return (
    <section className="border-t border-border py-24 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />

        <Accordion className="mt-12 w-full">
          {t.items.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-start text-[15px] font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
