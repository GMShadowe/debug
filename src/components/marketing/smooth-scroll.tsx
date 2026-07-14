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
      lerp: 0.12,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
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
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
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
