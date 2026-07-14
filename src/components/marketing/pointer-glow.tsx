"use client";

import { useEffect, useRef } from "react";

/**
 * A radial highlight that tracks the pointer across its nearest positioned
 * ancestor. Renders an absolutely-filled, non-interactive layer and writes the
 * cursor position into CSS custom properties the `pointer-glow` utility reads.
 * Inert on touch/no-hover devices and under reduced motion.
 */
export function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    const parent = node?.parentElement;
    if (!(node && parent)) {
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
        const rect = parent.getBoundingClientRect();
        node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        node.style.setProperty("--my", `${event.clientY - rect.top}px`);
        node.style.opacity = "1";
      });
    };
    const handleLeave = () => {
      node.style.opacity = "0";
    };

    parent.addEventListener("pointermove", handleMove);
    parent.addEventListener("pointerleave", handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      parent.removeEventListener("pointermove", handleMove);
      parent.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
      ref={ref}
    />
  );
}
