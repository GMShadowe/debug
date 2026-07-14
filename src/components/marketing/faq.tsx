"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  answer: string;
  question: string;
}

/**
 * Client boundary for the marketing FAQ. The Base UI accordion primitive relies
 * on React context, so it must render inside a Client Component rather than the
 * Server-Component landing page.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <Accordion className="rounded-xl border border-border bg-card/40 px-5">
      {items.map((faq) => (
        <AccordionItem key={faq.question} value={faq.question}>
          <AccordionTrigger className="py-4 text-foreground text-sm">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-ink-subtle text-sm leading-relaxed">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
