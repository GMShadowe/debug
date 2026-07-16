"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WHITESPACE = /\s+/;

/** Split a node's plain text into word spans, returning the spans. */
function splitWords(el: HTMLElement): HTMLSpanElement[] {
  const words = (el.textContent ?? "").trim().split(WHITESPACE);
  el.textContent = "";
  const spans: HTMLSpanElement[] = [];
  for (const [index, word] of words.entries()) {
    const span = document.createElement("span");
    span.textContent = word;
    el.append(span);
    if (index < words.length - 1) {
      el.append(" ");
    }
    spans.push(span);
  }
  return spans;
}

/**
 * GSAP ScrollTrigger set piece: `[data-words]` paragraphs brighten word by
 * word as the reader scrolls through them — dimmed ink resolving into full
 * contrast. Registered inside gsap.matchMedia gated on reduced-motion, and
 * useGSAP tears all triggers down on unmount.
 */
export function GsapFX() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      for (const el of gsap.utils.toArray<HTMLElement>("[data-words]")) {
        const spans = splitWords(el);
        gsap.fromTo(
          spans,
          { opacity: 0.16 },
          {
            ease: "none",
            opacity: 1,
            scrollTrigger: {
              end: "top 30%",
              scrub: true,
              start: "top 82%",
              trigger: el,
            },
            stagger: 0.05,
          }
        );
      }
    });
  });

  return null;
}
