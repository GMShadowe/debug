"use client";

import { Bug, Camera, PaperPlaneTilt } from "@phosphor-icons/react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { ReactNode } from "react";

/**
 * Glass UI fragments floating over the hero's product frame — a severity
 * picker, a screenshot chip, and a "report sent" toast, each bobbing on its
 * own tempo and leaning gently toward the cursor via springed mouse
 * parallax. Decorative only (aria-hidden), desktop only, and static under
 * reduced motion.
 */
export function HeroFragments() {
  const prefersReduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 30, stiffness: 120 });
  const sy = useSpring(my, { damping: 30, stiffness: 120 });

  // Three depths: nearer fragments lean further.
  const nearX = useTransform(sx, (v) => v * 22);
  const nearY = useTransform(sy, (v) => v * 22);
  const midX = useTransform(sx, (v) => v * 14);
  const midY = useTransform(sy, (v) => v * 14);
  const farX = useTransform(sx, (v) => v * 8);
  const farY = useTransform(sy, (v) => v * 8);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const float = (delay: number) =>
    prefersReduced
      ? {}
      : {
          animate: { y: [0, -10, 0] },
          transition: {
            delay,
            duration: 5.5 + delay,
            ease: "easeInOut" as const,
            repeat: Number.POSITIVE_INFINITY,
          },
        };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden lg:block"
      onPointerMove={handleMove}
      style={{ pointerEvents: prefersReduced ? "none" : undefined }}
    >
      {/* Report sent — near layer, top right */}
      <motion.div
        className="absolute top-[24%] right-[3%]"
        style={{ x: nearX, y: nearY }}
      >
        <motion.div {...float(0.2)}>
          <Fragment>
            <span className="grid size-6 place-items-center rounded-full bg-success/20 text-success">
              <PaperPlaneTilt className="size-3" weight="bold" />
            </span>
            <span>
              <span className="block font-medium text-foreground">
                Report sent
              </span>
              <span className="block text-[10px] text-ink-subtle">
                Screenshot + environment attached
              </span>
            </span>
          </Fragment>
        </motion.div>
      </motion.div>

      {/* Severity picker — mid layer, left edge */}
      <motion.div
        className="absolute top-[46%] left-[-3%]"
        style={{ x: midX, y: midY }}
      >
        <motion.div {...float(0.8)}>
          <Fragment>
            <span className="font-medium text-foreground">Severity</span>
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-destructive ring-2 ring-foreground/50" />
              <span className="size-3 rounded-full bg-[#e5844a] opacity-50" />
              <span className="size-3 rounded-full bg-warning opacity-50" />
            </span>
          </Fragment>
        </motion.div>
      </motion.div>

      {/* Screenshot chip — far layer, lower right */}
      <motion.div
        className="absolute right-[9%] bottom-[8%]"
        style={{ x: farX, y: farY }}
      >
        <motion.div {...float(1.4)}>
          <Fragment>
            <span className="grid size-6 place-items-center rounded-full bg-primary/20 text-primary-hover">
              <Camera className="size-3" weight="bold" />
            </span>
            <span className="font-medium text-foreground">
              Screenshot captured
            </span>
          </Fragment>
        </motion.div>
      </motion.div>

      {/* Bug marker — far layer, hanging off the top-left corner */}
      <motion.div
        className="absolute top-[-4%] left-[-1.5%]"
        style={{ x: farX, y: farY }}
      >
        <motion.div {...float(2)}>
          <span className="grid size-9 place-items-center rounded-full border border-primary/40 bg-primary/15 text-primary-hover shadow-[0_8px_32px_-8px_rgb(94_106_210/0.5)] backdrop-blur-md">
            <Bug className="size-4" weight="bold" />
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Fragment({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-2.5 rounded-xl border border-hairline-strong/60 bg-card/70 px-3.5 py-2.5 text-xs shadow-[0_16px_48px_-16px_rgb(0_0_0/0.6)] backdrop-blur-md">
      {children}
    </span>
  );
}
