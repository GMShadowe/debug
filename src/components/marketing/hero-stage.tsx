"use client";

import {
  Camera,
  Monitor,
  Terminal,
  WarningOctagon,
} from "@phosphor-icons/react/dist/ssr";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";

/**
 * Fragments of a real report, parked around the product island. Each carries a
 * depth factor: nearer chips travel further under the cursor, which is what
 * sells the parallax as depth rather than as jitter.
 */
const FRAGMENTS = [
  {
    depth: 1.5,
    icon: Camera,
    label: "Screenshot",
    position: "-top-5 -left-4 sm:-left-10",
    value: "region annotated",
  },
  {
    depth: 1,
    icon: Monitor,
    label: "Environment",
    position: "-right-4 top-16 sm:-right-12",
    value: "Chrome 139 · macOS",
  },
  {
    depth: 2,
    icon: Terminal,
    label: "Console",
    position: "-left-4 bottom-20 sm:-left-14",
    value: "3 errors captured",
  },
  {
    depth: 1.2,
    icon: WarningOctagon,
    label: "Severity",
    position: "-bottom-4 -right-2 sm:-right-8",
    value: "critical",
  },
];

const SPRING = { damping: 26, mass: 0.6, stiffness: 140 } as const;
/** Pixels of chip travel at the far edge of the stage, before depth scaling. */
const PARALLAX_RANGE = 14;

/**
 * The hero camera. The product island is held on a perspective stage, leaning
 * back as if seen from above; scrolling levels it out and pushes the camera
 * through it. Report fragments float in front of the glass and drift under the
 * cursor on springs, each at its own depth.
 *
 * Every transform here is owned by Framer Motion — nothing else animates these
 * nodes.
 */
export function HeroStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    target: stageRef,
  });

  // The dolly: lean back, level out at 45% through, then push in and lift away.
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [15, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.9, 1, 1.04]);
  const y = useTransform(scrollYProgress, [0, 0.45, 1], [64, 0, -70]);

  // Cursor parallax, normalised to [-1, 1] across the stage and springed so it
  // trails the pointer instead of snapping to it.
  const pointerX = useSpring(0, SPRING);
  const pointerY = useSpring(0, SPRING);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) {
      return;
    }
    const canHover = window.matchMedia("(hover: hover)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!(canHover && !prefersReduced)) {
      return;
    }

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) {
        return;
      }
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
      });
    };
    const onLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [pointerX, pointerY]);

  return (
    <div className="stage-3d relative" ref={stageRef}>
      <motion.div
        className="relative"
        style={{ rotateX, scale, transformStyle: "preserve-3d", y }}
      >
        {children}

        {FRAGMENTS.map((fragment, index) => (
          <Fragment
            fragment={fragment}
            index={index}
            key={fragment.label}
            pointerX={pointerX}
            pointerY={pointerY}
          />
        ))}
      </motion.div>
    </div>
  );
}

function Fragment({
  fragment,
  index,
  pointerX,
  pointerY,
}: {
  fragment: (typeof FRAGMENTS)[number];
  index: number;
  pointerX: ReturnType<typeof useSpring>;
  pointerY: ReturnType<typeof useSpring>;
}) {
  const travel = PARALLAX_RANGE * fragment.depth;
  const x = useTransform(pointerX, [-0.5, 0.5], [travel, -travel]);
  const y = useTransform(pointerY, [-0.5, 0.5], [travel, -travel]);
  const Icon = fragment.icon;

  return (
    <motion.div
      aria-hidden="true"
      className={`rise-in pointer-events-none absolute hidden items-center gap-2.5 rounded-lg border border-border bg-popover py-2 pr-3.5 pl-2.5 shadow-[0_10px_30px_-12px_rgb(11_12_14/0.35)] sm:flex ${fragment.position}`}
      style={{
        animationDelay: `${700 + index * 110}ms`,
        translateX: x,
        translateY: y,
      }}
    >
      <span className="grid size-7 place-items-center rounded-md bg-muted text-primary">
        <Icon className="size-3.5" weight="bold" />
      </span>
      <span className="leading-tight">
        <span className="block font-mono text-[9px] text-ink-tertiary uppercase tracking-[0.12em]">
          {fragment.label}
        </span>
        <span className="block font-medium text-[12px] text-foreground">
          {fragment.value}
        </span>
      </span>
    </motion.div>
  );
}
