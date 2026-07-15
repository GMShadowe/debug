"use client";

import { useEffect } from "react";

interface ParallaxItem {
  el: HTMLElement;
  height: number;
  speed: number;
  top: number;
}

interface FadeItem {
  el: HTMLElement;
  height: number;
  top: number;
}

/**
 * Drives scroll effects from one shared, rAF-throttled scroll listener:
 * `[data-parallax]` elements drift by their speed, and `[data-fade]` elements
 * fade and sink slightly as they scroll off the top (a soft exit that keeps
 * the page feeling alive). Element positions are measured once (and on
 * resize), so each frame is pure math plus compositor-friendly writes only.
 * Disabled under reduced-motion so nothing moves for users who opt out.
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
    const fadeNodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-fade]")
    );
    if (nodes.length === 0 && fadeNodes.length === 0) {
      return;
    }

    let items: ParallaxItem[] = [];
    let fades: FadeItem[] = [];
    const measure = () => {
      // Clear transforms before reading so the base position is untainted.
      for (const el of nodes) {
        el.style.transform = "";
      }
      for (const el of fadeNodes) {
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
      fades = fadeNodes.map((el) => {
        const rect = el.getBoundingClientRect();
        return { el, height: rect.height, top: rect.top + scrollY };
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
      for (const fade of fades) {
        // 0 while fully in view, 1 once the element has scrolled a full
        // three-quarters of its height past the top.
        const gone = Math.min(
          1,
          Math.max(0, (scrollY - fade.top) / (fade.height * 0.75))
        );
        fade.el.style.opacity = (1 - gone * 0.9).toFixed(3);
        fade.el.style.transform = `translate3d(0, ${(gone * -28).toFixed(2)}px, 0) scale(${(1 - gone * 0.04).toFixed(4)})`;
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
