"use client";

import { useEffect, useRef } from "react";

/**
 * A thin accent bar pinned to the top of the viewport that fills as the page
 * scrolls. Where the browser supports CSS scroll-driven animations the
 * `.scroll-progress-native` class scrubs it on the compositor with no
 * listener at all; otherwise a rAF-throttled scroll listener drives the same
 * cheap `scaleX` transform.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    if (CSS.supports("animation-timeline: scroll(root)")) {
      return; // The CSS timeline owns the bar.
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      node.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="scroll-progress-native pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary/40 via-primary to-primary-hover"
      ref={ref}
    />
  );
}
