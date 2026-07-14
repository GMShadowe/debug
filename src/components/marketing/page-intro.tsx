"use client";

import { useEffect, useState } from "react";

type Phase = "loading" | "exit" | "done";

const EXIT_AT_MS = 1150;
const DONE_AT_MS = 1900;

/**
 * A one-shot page-load curtain: the Lumen aperture mark scales in over a filling
 * progress line, then the whole overlay wipes upward to reveal the page. Scroll
 * is locked while it plays. Skipped entirely under reduced-motion so nothing
 * blocks content for those users.
 */
export function PageIntro() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setPhase("done");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const toExit = setTimeout(() => setPhase("exit"), EXIT_AT_MS);
    const toDone = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = previousOverflow;
    }, DONE_AT_MS);

    return () => {
      clearTimeout(toExit);
      clearTimeout(toDone);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "done") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] grid place-items-center bg-background transition-transform duration-[750ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
      style={{
        transform: phase === "exit" ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div className="flex flex-col items-center gap-7">
        <div className="intro-mark relative grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.14)_inset]">
          <span className="intro-ring absolute inset-0 rounded-2xl border border-primary" />
          <svg
            aria-hidden="true"
            className="size-7"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Zm0 4.2a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Z"
              fill="currentColor"
              opacity="0.9"
            />
            <circle cx="12" cy="12" fill="currentColor" r="2.4" />
          </svg>
        </div>
        <div className="h-px w-32 overflow-hidden bg-border">
          <span className="intro-bar block h-full w-full bg-primary" />
        </div>
      </div>
    </div>
  );
}
