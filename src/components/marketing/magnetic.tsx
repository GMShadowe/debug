"use client";

import { type ReactNode, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/** Fraction of the cursor offset the element follows. */
const PULL = 0.35;
/** Hard cap on travel, in pixels, so the snap stays tight. */
const MAX_TRAVEL = 10;

/**
 * Magnetic hover: the child is pulled toward the cursor while it is over the
 * wrapper, then springs back on leave. Movement is written straight to the
 * transform inside rAF (no transition mid-follow, so it feels snappy) and a
 * spring-out transition is enabled only for the release. Inert on touch
 * devices and under reduced motion.
 */
export function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!(wrap && inner)) {
      return;
    }
    const canHover = window.matchMedia("(hover: hover)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!canHover || prefersReduced) {
      return;
    }

    let frame = 0;
    const handleMove = (event: PointerEvent) => {
      if (frame) {
        return;
      }
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = wrap.getBoundingClientRect();
        const dx = (event.clientX - rect.left - rect.width / 2) * PULL;
        const dy = (event.clientY - rect.top - rect.height / 2) * PULL;
        const x = Math.max(-MAX_TRAVEL, Math.min(MAX_TRAVEL, dx));
        const y = Math.max(-MAX_TRAVEL, Math.min(MAX_TRAVEL, dy));
        inner.style.transition = "none";
        inner.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
    };
    const handleLeave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      inner.style.transition = "transform 0.45s cubic-bezier(0.2, 1.6, 0.3, 1)";
      inner.style.transform = "translate3d(0, 0, 0)";
    };

    wrap.addEventListener("pointermove", handleMove);
    wrap.addEventListener("pointerleave", handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      wrap.removeEventListener("pointermove", handleMove);
      wrap.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div className={cn("inline-block", className)} ref={wrapRef}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
