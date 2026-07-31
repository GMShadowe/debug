"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * A number that counts up the first time it scrolls into view. The value is
 * held in state and eased by Framer's `animate`, so the odometer respects the
 * same curve as the rest of the page instead of ticking linearly.
 */
export function Counter({
  decimals = 0,
  prefix = "",
  suffix = "",
  value,
}: {
  decimals?: number;
  prefix?: string;
  suffix?: string;
  value: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
