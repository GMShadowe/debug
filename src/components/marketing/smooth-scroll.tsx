"use client";

import Lenis from "lenis";
import { type ReactNode, useEffect } from "react";

/**
 * Initializes Lenis smooth scrolling for the marketing surface and wires up
 * in-page anchor links to animate through Lenis instead of jumping. Respects
 * the user's reduced-motion preference by not mounting at all.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      return;
    }

    const lenis = new Lenis({
      // Duration + expo easing gives the heavy, buttery glide that reads as
      // "premium" — momentum keeps carrying after the wheel stops instead of
      // snapping to rest like a short lerp would.
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      // Smooth momentum on touch too, so mobile matches the desktop feel.
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchMultiplier: 1.8,
      // Let the inertia express itself on trackpads/wheels without feeling
      // sluggish to start.
      wheelMultiplier: 1.05,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) {
        return;
      }
      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        return;
      }
      const el = document.querySelector(href);
      if (el) {
        event.preventDefault();
        lenis.scrollTo(el as HTMLElement, { duration: 1.6, offset: -80 });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return children;
}
