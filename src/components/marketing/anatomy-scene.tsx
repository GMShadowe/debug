"use client";

import {
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import { useCinematic } from "@/hooks/use-cinematic";
import { cn } from "@/lib/utils";

const LEFT_PARTS = [
  {
    body: "The exact frame the visitor saw, with the broken region circled by the person who found it.",
    label: "Annotated screenshot",
  },
  {
    body: "Browser, engine version, operating system, viewport and device pixel ratio.",
    label: "Environment",
  },
  {
    body: "The page they were on, where they came from, and the route that rendered it.",
    label: "Location",
  },
];

const RIGHT_PARTS = [
  {
    body: "Every console error and warning in the sixty seconds before they hit report.",
    label: "Console trail",
  },
  {
    body: "Set by the reporter, refined by you, and sortable the moment it lands.",
    label: "Severity",
  },
  {
    body: "Who sent it and how to reach them, only when they choose to say.",
    label: "Reporter",
  },
];

/**
 * Act two. A technical drawing of a single report: the record sits pinned in
 * the centre while its parts are called out to either side, each connector
 * ruling itself outward as you scroll. The point of the scene is that a Lumen
 * report is complete on arrival — the callouts are the proof.
 */
export function AnatomyScene() {
  const ref = useRef<HTMLElement>(null);
  const cinematic = useCinematic();
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: ref,
  });

  const cardScale = useTransform(scrollYProgress, [0, 0.45], [0.94, 1]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.45], [-2.5, 0]);

  return (
    <section
      className={cinematic ? "relative h-[260vh]" : "relative"}
      id="anatomy"
      ref={ref}
    >
      <div
        className={cn(
          "flex flex-col justify-center",
          cinematic ? "sticky top-0 h-dvh overflow-hidden py-16" : "py-24"
        )}
      >
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <header className="text-center">
            <p className="label-mono text-ink-tertiary">Act 02 · The report</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance text-display-2 text-foreground">
              One report. <em>Everything</em> you would have asked for.
            </h2>
          </header>

          <div className="mt-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)_minmax(0,1fr)] lg:gap-8">
            <div className="flex flex-col gap-7">
              {LEFT_PARTS.map((part, index) => (
                <Callout
                  cinematic={cinematic}
                  index={index}
                  key={part.label}
                  part={part}
                  progress={scrollYProgress}
                  side="left"
                />
              ))}
            </div>

            <motion.div
              className="panel-dark island-shadow order-first overflow-hidden rounded-xl border border-border bg-card lg:order-none"
              style={
                cinematic ? { rotate: cardRotate, scale: cardScale } : undefined
              }
            >
              <ReportRecord />
            </motion.div>

            <div className="flex flex-col gap-7">
              {RIGHT_PARTS.map((part, index) => (
                <Callout
                  cinematic={cinematic}
                  index={index}
                  key={part.label}
                  part={part}
                  progress={scrollYProgress}
                  side="right"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Stagger window per callout, walking down the left column then the right. */
const STAGGER_START = 0.12;
const STAGGER_STEP = 0.09;
const STAGGER_SPAN = 0.22;

function Callout({
  cinematic,
  part,
  index,
  side,
  progress,
}: {
  cinematic: boolean;
  index: number;
  part: { body: string; label: string };
  progress: MotionValue<number>;
  side: "left" | "right";
}) {
  const order = side === "left" ? index : index + 0.5;
  const start = STAGGER_START + order * STAGGER_STEP;
  const opacity = useTransform(progress, [start, start + STAGGER_SPAN], [0, 1]);
  const shift = useTransform(
    progress,
    [start, start + STAGGER_SPAN],
    [side === "left" ? -20 : 20, 0]
  );
  const rule = useTransform(progress, [start, start + STAGGER_SPAN], [0, 1]);

  return (
    <motion.div
      className={cn(side === "right" ? "lg:text-left" : "lg:text-right")}
      style={cinematic ? { opacity, x: shift } : undefined}
    >
      <h3 className="font-medium text-[15px] text-foreground tracking-tight">
        {part.label}
      </h3>
      <p
        className={cn(
          "mt-1.5 text-[13px] text-ink-subtle leading-relaxed",
          side === "right" ? "lg:mr-auto" : "lg:ml-auto",
          "lg:max-w-[248px]"
        )}
      >
        {part.body}
      </p>
      <motion.span
        aria-hidden="true"
        className={cn(
          "mt-3 hidden h-px bg-hairline-strong lg:block",
          side === "right" ? "origin-left" : "ml-auto origin-right"
        )}
        style={cinematic ? { scaleX: rule, width: 64 } : { width: 64 }}
      />
    </motion.div>
  );
}

const META_ROWS = [
  { label: "Browser", value: "Chrome 139 · Blink" },
  { label: "OS", value: "macOS 15.2" },
  { label: "Viewport", value: "1440 × 900 @2x" },
  { label: "URL", value: "/checkout/payment" },
];

/** A high-fidelity capture of a single report detail view. */
function ReportRecord() {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[10px] text-ink-tertiary">RPT-4128</p>
          <h3 className="mt-1 truncate font-semibold text-[15px] text-foreground tracking-tight">
            Place order button throws
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-destructive/40 bg-destructive/10 px-2 py-0.5 font-medium text-[10px] text-destructive">
          Critical
        </span>
      </div>

      <div className="relative mt-3 h-32 overflow-hidden rounded-lg border border-border bg-background">
        <div className="absolute inset-0 p-3">
          <div className="h-2 w-20 rounded-full bg-hairline-strong" />
          <div className="mt-2 h-1.5 w-full rounded-full bg-border" />
          <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-border" />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="h-6 rounded bg-card" />
            <div className="h-6 rounded bg-card" />
          </div>
        </div>
        <span className="absolute right-6 bottom-3 left-3 h-8 rounded-md border border-destructive/60 border-dashed" />
        <span className="absolute top-2 right-2 rounded bg-background/80 px-1.5 py-0.5 font-mono text-[8px] text-ink-subtle backdrop-blur-sm">
          annotated
        </span>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
        {META_ROWS.map((row) => (
          <div key={row.label}>
            <dt className="font-mono text-[9px] text-ink-tertiary uppercase tracking-[0.1em]">
              {row.label}
            </dt>
            <dd className="truncate font-mono text-[11px] text-ink-muted">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 rounded-lg border border-border bg-background p-2.5">
        <p className="font-mono text-[9px] text-ink-tertiary uppercase tracking-[0.1em]">
          Console
        </p>
        <p className="mt-1 font-mono text-[10px] text-destructive leading-relaxed">
          TypeError: t.submit is not a function
        </p>
        <p className="font-mono text-[10px] text-ink-subtle leading-relaxed">
          at Checkout.tsx:214:19
        </p>
      </div>
    </div>
  );
}
