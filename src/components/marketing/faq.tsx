"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

import { cn } from "@/lib/utils";

interface FaqItem {
  answer: string;
  question: string;
}

/**
 * Hairline-ruled FAQ. Rows are separated by rules rather than boxed in cards,
 * which keeps the closing act quiet after five set pieces. One row is open at
 * a time; the marker rotates from a plus to a minus rather than swapping icons.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0].question);
  const baseId = useId();

  return (
    <div className="border-border border-t">
      {items.map((item) => {
        const isOpen = open === item.question;
        const panelId = `${baseId}-${item.question.replace(/\W+/g, "-")}`;

        return (
          <div className="border-border border-b" key={item.question}>
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className="group flex w-full items-start justify-between gap-6 py-5 text-left outline-none"
              onClick={() => setOpen(isOpen ? null : item.question)}
              type="button"
            >
              <span
                className={cn(
                  "text-[17px] tracking-tight transition-colors duration-200",
                  isOpen
                    ? "text-foreground"
                    : "text-ink-muted group-hover:text-foreground"
                )}
              >
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className="relative mt-2 size-3 shrink-0 text-ink-tertiary transition-colors duration-200 group-hover:text-foreground"
              >
                <span className="absolute top-1/2 left-0 h-px w-3 bg-current" />
                <span
                  className={cn(
                    "absolute top-1/2 left-0 h-px w-3 bg-current transition-transform duration-300 ease-out",
                    isOpen ? "rotate-0" : "rotate-90"
                  )}
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden"
                  exit={{ height: 0, opacity: 0 }}
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="max-w-2xl pb-6 text-[15px] text-ink-subtle leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
