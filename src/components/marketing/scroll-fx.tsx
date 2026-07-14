"use client";

import { useEffect } from "react";

interface ParallaxItem {
  el: HTMLElement;
  height: number;
  speed: number;
  top: number;
}

/**
 * Drives scroll parallax for every `[data-parallax]` element from one shared,
 * rAF-throttled scroll listener. Element positions are measured once (and on
 * resize), so each frame is pure math plus a single `translate3d` write — no
 * layout reads, only compositor-friendly transforms. Disabled under
 * reduced-motion so nothing moves for users who opt out.
 */
export function ScrollFX() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      return;
    }

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    if (nodes.length === 0) {
      return;
    }

    let items: ParallaxItem[] = [];
    const measure = () => {
      // Clear transforms before reading so the base position is untainted.
      for (const el of nodes) {
        el.style.transform = "";
      }
      const { scrollY } = window;
      items = nodes.map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          el,
          height: rect.height,
          speed: Number.parseFloat(el.dataset.parallax ?? "0"),
          top: rect.top + scrollY,
        };
      });
    };

    let ticking = false;
    const render = () => {
      ticking = false;
      const { scrollY, innerHeight: viewport } = window;
      for (const item of items) {
        // 0 as the element enters the bottom, 1 as it leaves the top.
        const raw = (scrollY + viewport - item.top) / (viewport + item.height);
        const progress = Math.min(1, Math.max(0, raw));
        const y = (progress - 0.5) * item.speed;
        item.el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    };
    const onResize = () => {
      measure();
      render();
    };

    measure();
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
