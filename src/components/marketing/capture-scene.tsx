"use client";

import {
  ArrowUpRight,
  Bug,
  CursorClick,
  PaperPlaneTilt,
} from "@phosphor-icons/react/dist/ssr";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";

import { useCinematic } from "@/hooks/use-cinematic";
import { cn } from "@/lib/utils";

const BEATS = [
  {
    body: "A visitor hits a bug on your checkout. Today this becomes a one-line email you cannot reproduce.",
    kicker: "00:00",
    title: "Something breaks.",
  },
  {
    body: "They click the Lumen bubble. No account, no form, no ticket template to fight with.",
    kicker: "00:04",
    title: "One click, not a form.",
  },
  {
    body: "Lumen captures the screen exactly as they saw it and lets them circle the part that is wrong.",
    kicker: "00:09",
    title: "The screen, captured.",
  },
  {
    body: "Browser, OS, viewport, URL and the console trail leading up to the failure ride along automatically.",
    kicker: "00:12",
    title: "Context, attached.",
  },
];

/** Where the camera pushes in to, per beat. */
const CAMERA_SCALE = [1, 1.06, 1.42, 1.16];

/** Cursor waypoints, in percentages of the stage. */
const CURSOR = [
  { x: 46, y: 63 },
  { x: 84, y: 84 },
  { x: 62, y: 60 },
  { x: 80, y: 88 },
];

const CAPTURED_FIELDS = [
  { label: "URL", value: "/checkout/payment" },
  { label: "Browser", value: "Chrome 139" },
  { label: "OS", value: "macOS 15.2" },
  { label: "Viewport", value: "1440 × 900" },
  { label: "Console", value: "3 errors" },
];

const SPRING = { damping: 26, mass: 0.7, stiffness: 120 } as const;

/**
 * Act one, pinned. Four beats of a real bug report being made, scrubbed by
 * scroll: the page breaks, the widget opens, the screen is captured, the
 * context attaches. Scroll position selects the beat; the beat then drives a
 * spring-based camera push and the layers inside the frame.
 *
 * Beat selection is discrete on purpose — crisp, well-timed motion reads as
 * direction, where scrubbing twenty properties at once reads as noise.
 */
export function CaptureScene() {
  const ref = useRef<HTMLElement>(null);
  const cinematic = useCinematic();
  const [beat, setBeat] = useState(0);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: ref,
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.max(
      0,
      Math.min(BEATS.length - 1, Math.floor(value * 4.4))
    );
    setBeat(next);
  });

  // Unpinned, the scene has nowhere to play, so it shows its finished state
  // and the beats are read as a list instead of watched.
  const activeBeat = cinematic ? beat : BEATS.length - 1;
  const current = BEATS[activeBeat];

  return (
    <section
      className={cinematic ? "relative h-[400vh]" : "relative"}
      id="capture"
      ref={ref}
    >
      <div
        className={cn(
          "flex items-center",
          cinematic ? "sticky top-0 h-dvh overflow-hidden" : "py-24"
        )}
      >
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
            {/* Narration */}
            <div className="lg:pb-8">
              <p className="label-mono text-ink-tertiary">
                Act 01 · The capture
              </p>

              {cinematic ? (
                <>
                  <div className="mt-6 min-h-[188px] sm:min-h-[176px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        initial={{ opacity: 0, y: 14 }}
                        key={current.title}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="font-mono text-[11px] text-primary tabular-nums">
                          {current.kicker}
                        </span>
                        <h2 className="mt-2 text-balance text-display-3 text-foreground">
                          {current.title}
                        </h2>
                        <p className="mt-3 max-w-sm text-ink-subtle text-sm leading-relaxed">
                          {current.body}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Beat scrubber */}
                  <div className="mt-2 flex items-center gap-2">
                    {BEATS.map((item, index) => (
                      <span
                        className={cn(
                          "h-0.5 rounded-full transition-all duration-500 ease-out",
                          index === activeBeat
                            ? "w-8 bg-foreground"
                            : "w-3 bg-hairline-strong"
                        )}
                        key={item.title}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <ol className="mt-6 space-y-5">
                  {BEATS.map((item) => (
                    <li className="flex gap-3" key={item.title}>
                      <span className="mt-1 shrink-0 font-mono text-[11px] text-primary tabular-nums">
                        {item.kicker}
                      </span>
                      <span>
                        <span className="block font-semibold text-[17px] text-foreground tracking-tight">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-ink-subtle text-sm leading-relaxed">
                          {item.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* Stage */}
            <div className="panel-dark island-shadow overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 border-border border-b px-4 py-2.5">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-hairline-strong" />
                  <span className="size-2.5 rounded-full bg-hairline-strong" />
                  <span className="size-2.5 rounded-full bg-hairline-strong" />
                </span>
                <span className="ml-2 flex h-6 max-w-[220px] flex-1 items-center rounded-md border border-border bg-background px-2.5">
                  <span className="truncate font-mono text-[11px] text-ink-subtle">
                    acme.store/checkout
                  </span>
                </span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden bg-background">
                <motion.div
                  animate={{ scale: CAMERA_SCALE[activeBeat] }}
                  className="absolute inset-0"
                  style={{ transformOrigin: "64% 66%" }}
                  transition={SPRING}
                >
                  <HostPage beat={activeBeat} />
                </motion.div>

                {/* Cursor rides above the camera so it stays legible at any zoom */}
                <motion.span
                  animate={{
                    left: `${CURSOR[activeBeat].x}%`,
                    top: `${CURSOR[activeBeat].y}%`,
                  }}
                  className="pointer-events-none absolute z-20 text-foreground"
                  transition={{
                    damping: 22,
                    mass: 0.8,
                    stiffness: 90,
                    type: "spring",
                  }}
                >
                  <CursorClick
                    className="size-5 drop-shadow-lg"
                    weight="fill"
                  />
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The visitor's screen: a checkout that fails, then the widget over it. */
function HostPage({ beat }: { beat: number }) {
  return (
    <div className="absolute inset-0 p-4 sm:p-6">
      {/* Faux storefront */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-[13px] text-foreground tracking-tight">
          ACME
        </span>
        <span className="flex gap-3">
          {["Shop", "Orders", "Cart"].map((item) => (
            <span className="text-[10px] text-ink-subtle" key={item}>
              {item}
            </span>
          ))}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_140px] gap-4">
        <div className="space-y-2.5">
          <div className="h-2.5 w-28 rounded-full bg-hairline-strong" />
          <div className="h-2 w-full rounded-full bg-border" />
          <div className="h-2 w-4/5 rounded-full bg-border" />
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <div className="h-9 rounded-md border border-border bg-card" />
            <div className="h-9 rounded-md border border-border bg-card" />
            <div className="col-span-2 h-9 rounded-md border border-border bg-card" />
          </div>

          {/* The failure */}
          <div className="relative pt-2">
            <div className="flex h-9 w-40 items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 font-medium text-[11px] text-destructive">
              Place order
            </div>

            <p className="mt-2 font-mono text-[9px] text-destructive">
              TypeError: t.submit is not a function
            </p>

            {/* Annotation drawn over the broken control */}
            <AnimatePresence>
              {beat >= 2 ? (
                <motion.svg
                  animate={{ opacity: 1 }}
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-1 -left-2 h-16 w-48 overflow-visible"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  <motion.rect
                    animate={{ pathLength: 1 }}
                    fill="none"
                    height="52"
                    initial={{ pathLength: 0 }}
                    rx="8"
                    stroke="#e5484d"
                    strokeWidth="1.5"
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    width="176"
                    x="1"
                    y="1"
                  />
                </motion.svg>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-2 rounded-lg border border-border bg-card p-3">
          <div className="h-2 w-16 rounded-full bg-hairline-strong" />
          <div className="h-2 w-full rounded-full bg-border" />
          <div className="h-2 w-2/3 rounded-full bg-border" />
        </div>
      </div>

      {/* The Lumen widget */}
      <AnimatePresence>
        {beat >= 1 ? (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="panel-highlight absolute right-4 bottom-14 w-[188px] rounded-xl border border-hairline-strong bg-card p-3 shadow-2xl sm:right-6 sm:w-[210px]"
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            initial={{ opacity: 0, scale: 0.9, y: 14 }}
            transition={{ damping: 24, stiffness: 220, type: "spring" }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-[11px] text-foreground">
                Report a bug
              </span>
              <span className="font-mono text-[9px] text-ink-tertiary">
                esc
              </span>
            </div>

            {/* Screenshot region */}
            <div className="relative mt-2.5 h-16 overflow-hidden rounded-md border border-border bg-background">
              <AnimatePresence>
                {beat >= 2 ? (
                  <motion.div
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 grid place-items-center"
                    initial={{ opacity: 0 }}
                    key="captured"
                    transition={{ duration: 0.45 }}
                  >
                    <span className="absolute inset-1.5 rounded border border-destructive/40 border-dashed" />
                    <span className="relative rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[8px] text-primary-hover">
                      screen captured
                    </span>
                  </motion.div>
                ) : (
                  <motion.span
                    className="absolute inset-0 grid place-items-center font-mono text-[8px] text-ink-tertiary"
                    exit={{ opacity: 0 }}
                    key="idle"
                  >
                    capturing…
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Context that attaches itself */}
            <div className="mt-2.5 space-y-1">
              <AnimatePresence>
                {beat >= 3
                  ? CAPTURED_FIELDS.map((field, index) => (
                      <motion.div
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between gap-2"
                        initial={{ opacity: 0, x: -8 }}
                        key={field.label}
                        transition={{ delay: index * 0.07, duration: 0.35 }}
                      >
                        <span className="font-mono text-[8px] text-ink-tertiary uppercase">
                          {field.label}
                        </span>
                        <span className="truncate font-mono text-[8px] text-ink-muted">
                          {field.value}
                        </span>
                      </motion.div>
                    ))
                  : null}
              </AnimatePresence>
            </div>

            <div className="mt-2.5 flex justify-end">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded px-2 py-1 font-medium text-[9px] transition-colors duration-300",
                  beat >= 3
                    ? "bg-success text-success-foreground"
                    : "bg-primary text-primary-foreground"
                )}
              >
                {beat >= 3 ? (
                  <>
                    <ArrowUpRight className="size-2.5" weight="bold" />
                    Sent
                  </>
                ) : (
                  <>
                    <PaperPlaneTilt className="size-2.5" weight="bold" />
                    Send
                  </>
                )}
              </span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Trigger bubble */}
      <motion.span
        animate={{ scale: beat === 1 ? 0.92 : 1 }}
        className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1.5 font-medium text-[10px] text-primary-foreground shadow-lg sm:right-6"
        transition={{ damping: 18, stiffness: 300, type: "spring" }}
      >
        <Bug className="size-3.5" weight="bold" />
        Feedback
      </motion.span>
    </div>
  );
}
