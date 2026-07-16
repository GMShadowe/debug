"use client";

import { Check, X } from "@phosphor-icons/react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

const PAIRS = [
  {
    new: "A pixel-accurate screenshot on every report",
    old: "“It’s broken” with no way to reproduce it",
  },
  {
    new: "Browser, OS, and viewport captured automatically",
    old: "Screenshots pasted into three different chat apps",
  },
  {
    new: "One triage board, sorted by severity and status",
    old: "Endless back-and-forth to pin down the browser",
  },
  {
    new: "Fixed before it ever reaches your churn rate",
    old: "Bugs that slip through until a customer churns",
  },
];

const SPRING = { damping: 26, stiffness: 220 } as const;

/**
 * Pinned comparison scene: while the reader scrolls through the tall outer
 * wrapper, the old workflow strikes itself out line by line and the Lumen
 * workflow resolves in its place, pair by pair. The stage stays pinned; the
 * scroll is the scrubber.
 */
export function StickyCompare() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: ref,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // 0 → nothing resolved yet; PAIRS.length → all resolved.
    setStep(Math.min(PAIRS.length, Math.floor(v * (PAIRS.length + 1))));
  });

  return (
    <div className="relative h-[320vh]" ref={ref}>
      <div className="sticky top-0 flex min-h-dvh items-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid items-stretch gap-5 md:grid-cols-2">
            {/* The old way — struck out pair by pair */}
            <div className="rounded-2xl border border-border bg-card/60 p-7 sm:p-9">
              <span className="font-mono text-ink-subtle text-xs uppercase tracking-[0.12em]">
                The old way
              </span>
              <ul className="mt-7 space-y-5">
                {PAIRS.map((pair, index) => {
                  const done = index < step;
                  return (
                    <li className="flex items-start gap-3" key={pair.old}>
                      <motion.span
                        animate={{ scale: done ? 0.9 : 1 }}
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full transition-colors duration-300",
                          done
                            ? "bg-muted text-ink-tertiary"
                            : "bg-destructive/12 text-destructive"
                        )}
                        transition={SPRING}
                      >
                        <X
                          aria-hidden="true"
                          className="size-3"
                          weight="bold"
                        />
                      </motion.span>
                      <motion.span
                        animate={{ opacity: done ? 0.35 : 1 }}
                        className={cn(
                          "text-sm leading-relaxed transition-colors duration-300",
                          done
                            ? "text-ink-tertiary line-through decoration-ink-tertiary/60"
                            : "text-ink-muted"
                        )}
                        transition={{ duration: 0.4 }}
                      >
                        {pair.old}
                      </motion.span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* The Lumen way — resolving in step */}
            <div className="panel-highlight rounded-2xl border border-primary/30 bg-primary/[0.07] p-7 sm:p-9">
              <span className="font-mono text-primary-hover text-xs uppercase tracking-[0.12em]">
                The Lumen way
              </span>
              <ul className="mt-7 space-y-5">
                {PAIRS.map((pair, index) => {
                  const on = index < step;
                  return (
                    <li className="flex items-start gap-3" key={pair.new}>
                      <motion.span
                        animate={{
                          opacity: on ? 1 : 0.25,
                          scale: on ? 1 : 0.7,
                        }}
                        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/25 text-primary-hover"
                        transition={SPRING}
                      >
                        <Check
                          aria-hidden="true"
                          className="size-3"
                          weight="bold"
                        />
                      </motion.span>
                      <motion.span
                        animate={{
                          opacity: on ? 1 : 0.3,
                          x: on ? 0 : 14,
                        }}
                        className="text-foreground text-sm leading-relaxed"
                        transition={SPRING}
                      >
                        {pair.new}
                      </motion.span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Progress ticks */}
          <div className="mt-8 flex justify-center gap-2">
            {PAIRS.map((pair, index) => (
              <motion.span
                animate={{
                  backgroundColor:
                    index < step ? "var(--primary)" : "var(--border)",
                  scaleX: index < step ? 1 : 0.6,
                }}
                className="h-1 w-10 origin-left rounded-full"
                key={pair.old}
                transition={SPRING}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
