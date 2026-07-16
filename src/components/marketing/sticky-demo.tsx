"use client";

import { Bug, CheckCircle, Code, Kanban } from "@phosphor-icons/react/dist/ssr";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { type ComponentType, useRef, useState } from "react";

import { BrowserFrame } from "@/components/marketing/browser-frame";
import { DashboardMock, WidgetMock } from "@/components/marketing/product-mock";
import { cn } from "@/lib/utils";

interface Beat {
  description: string;
  icon: ComponentType<{ className?: string; weight?: "bold" }>;
  id: string;
  title: string;
}

const BEATS: Beat[] = [
  {
    description:
      "Drop a single script tag into your site. The floating button appears instantly, with no build step.",
    icon: Code,
    id: "install",
    title: "Install the widget",
  },
  {
    description:
      "Anyone can grab a screenshot and describe the issue in a few seconds, right where it happened.",
    icon: Bug,
    id: "report",
    title: "Visitors report bugs",
  },
  {
    description:
      "Reports land with full context: browser, OS, viewport, console trail, and the exact page.",
    icon: Kanban,
    id: "triage",
    title: "Triage in your dashboard",
  },
  {
    description:
      "Sort by severity, assign, and resolve. The loop closes before the bug reaches your churn rate.",
    icon: CheckCircle,
    id: "resolve",
    title: "Ship the fix",
  },
];

const SPRING = { damping: 26, stiffness: 200 } as const;

/** Minimal install snippet card for the first beat. */
function InstallMock() {
  return (
    <div className="grid min-h-[380px] place-items-center p-6">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-5">
        <p className="font-mono text-[11px] text-ink-subtle">index.html</p>
        <pre className="mt-3 overflow-x-auto font-mono text-[13px] leading-relaxed">
          <code>
            <span className="text-ink-subtle">{"<script"}</span>
            {"\n  "}
            <span className="text-foreground">src</span>
            <span className="text-ink-subtle">=</span>
            <span className="text-ink-muted">
              {'"https://cdn.lumen.dev/widget.js"'}
            </span>
            {"\n  "}
            <span className="text-foreground">defer</span>
            {"\n"}
            <span className="text-ink-subtle">{"></script>"}</span>
          </code>
        </pre>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-[11px] text-success">
          <span className="size-1.5 rounded-full bg-success" />
          Widget live
        </p>
      </div>
    </div>
  );
}

/** Dashboard with a resolved banner for the final beat. */
function ResolvedMock() {
  return (
    <div className="relative">
      <DashboardMock />
      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/15 px-3.5 py-1.5 text-success text-xs backdrop-blur-md">
          <CheckCircle className="size-4" weight="bold" />
          Checkout button unresponsive · resolved
        </span>
      </div>
    </div>
  );
}

const PREVIEWS: Record<string, { node: React.ReactNode; url: string }> = {
  install: { node: <InstallMock />, url: "yoursite.com" },
  report: { node: <WidgetMock />, url: "yoursite.com" },
  resolve: { node: <ResolvedMock />, url: "app.lumen.dev/dashboard" },
  triage: { node: <DashboardMock />, url: "app.lumen.dev/dashboard" },
};

/**
 * Pinned product demo: the preview frame holds still while the reader
 * scrolls through four beats. Each beat lights up in the rail and swaps the
 * preview with a springed scale/blur transition. The scroll position is the
 * only controller; reverse scrubbing plays the story backwards.
 */
export function StickyDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: ref,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(BEATS.length - 1, Math.floor(v * BEATS.length)));
  });

  const beat = BEATS[active];

  return (
    <div className="relative h-[380vh]" ref={ref}>
      <div className="sticky top-0 flex min-h-dvh items-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-16">
            {/* Beat rail */}
            <div>
              <span className="inline-flex items-center gap-2.5">
                <span className="font-mono text-[11px] text-ink-tertiary tabular-nums">
                  02
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-hairline-strong"
                />
                <span className="font-medium text-[13px] text-foreground uppercase tracking-[0.12em]">
                  How it works
                </span>
              </span>
              <h2 className="mt-4 text-balance text-display-2 text-foreground tracking-[-0.03em]">
                One loop, four beats
              </h2>

              <div className="mt-10 space-y-1.5">
                {BEATS.map((item, index) => {
                  const on = index === active;
                  return (
                    <div
                      className={cn(
                        "relative rounded-xl px-4 py-3.5 transition-colors duration-300",
                        on ? "bg-card" : "opacity-50"
                      )}
                      key={item.id}
                    >
                      {on ? (
                        <motion.span
                          className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-primary"
                          layoutId="beat-indicator"
                          transition={SPRING}
                        />
                      ) : null}
                      <div className="flex items-center gap-3">
                        <item.icon
                          className={cn(
                            "size-4",
                            on ? "text-primary-hover" : "text-ink-subtle"
                          )}
                          weight="bold"
                        />
                        <span className="font-medium text-foreground text-sm">
                          {item.title}
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {on ? (
                          <motion.p
                            animate={{ height: "auto", opacity: 1 }}
                            className="overflow-hidden pl-7 text-ink-subtle text-sm leading-relaxed"
                            exit={{ height: 0, opacity: 0 }}
                            initial={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                          >
                            <span className="block pt-1.5">
                              {item.description}
                            </span>
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Progress rail */}
              <div className="mt-8 h-1 overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full origin-left bg-primary"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </div>

            {/* Pinned preview */}
            <div className="panel-dark">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  animate={{ filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }}
                  exit={{
                    filter: "blur(8px)",
                    opacity: 0,
                    scale: 0.96,
                    y: -16,
                  }}
                  initial={{
                    filter: "blur(8px)",
                    opacity: 0,
                    scale: 0.96,
                    y: 24,
                  }}
                  key={beat.id}
                  transition={SPRING}
                >
                  <BrowserFrame
                    className="shadow-[0_32px_80px_-24px_rgb(0_0_0/0.55)]"
                    url={PREVIEWS[beat.id].url}
                  >
                    {PREVIEWS[beat.id].node}
                  </BrowserFrame>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
