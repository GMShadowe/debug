"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const CHAPTERS = [
  { id: "capture", label: "The capture" },
  { id: "anatomy", label: "The report" },
  { id: "install", label: "The install" },
  { id: "triage", label: "The triage" },
  { id: "features", label: "The kit" },
  { id: "faq", label: "Answers" },
];

/**
 * The journey spine. A fixed hairline column down the left edge with one tick
 * per act; the tick for the act you are inside extends, brightens and names
 * itself. Doubles as the page's reading-progress indicator, so no separate
 * progress bar is needed.
 *
 * Chapter tracking is a single IntersectionObserver over the act sections
 * (widest visible section wins) and progress is a rAF-throttled scroll read —
 * neither touches layout during scroll.
 */
export function ChapterRail() {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const ratios = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const sections = CHAPTERS.map((chapter) =>
      document.getElementById(chapter.id)
    ).filter((el): el is HTMLElement => el !== null);

    const seen = ratios.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          seen.set(entry.target.id, entry.intersectionRatio);
        }
        let best: string | null = null;
        let bestRatio = 0.05;
        for (const [id, ratio] of seen) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(best);
      },
      { threshold: [0, 0.08, 0.25, 0.5, 0.75] }
    );

    for (const section of sections) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(read);
      }
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <aside
      aria-label="Page chapters"
      className="pointer-events-none fixed top-1/2 left-5 z-30 hidden -translate-y-1/2 min-[1380px]:block"
    >
      <div className="flex flex-col gap-5">
        {CHAPTERS.map((chapter, index) => {
          const isActive = active === chapter.id;
          return (
            <a
              className="group pointer-events-auto relative flex items-center gap-3 outline-none"
              href={`#${chapter.id}`}
              key={chapter.id}
            >
              <span className="w-5 shrink-0 font-mono text-[10px] text-ink-tertiary tabular-nums transition-colors duration-300 group-hover:text-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "h-px shrink-0 transition-all duration-500 ease-out",
                  isActive
                    ? "w-8 bg-foreground"
                    : "w-4 bg-hairline-strong group-hover:w-6 group-hover:bg-foreground"
                )}
              />
              <span
                className={cn(
                  "absolute left-full ml-3 whitespace-nowrap text-[11px] tracking-tight transition-all duration-500 ease-out",
                  isActive
                    ? "translate-x-0 text-foreground opacity-100"
                    : "-translate-x-1 text-ink-tertiary opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                )}
              >
                {chapter.label}
              </span>
            </a>
          );
        })}
      </div>

      {/* Overall progress, read as ink filling a hairline gauge. */}
      <div className="mt-7 ml-[6px] flex items-center gap-3">
        <div className="h-16 w-px overflow-hidden bg-hairline-strong">
          <div
            className="w-px origin-top bg-foreground"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
        <span className="font-mono text-[10px] text-ink-tertiary tabular-nums">
          {String(Math.round(progress * 100)).padStart(3, "0")}
        </span>
      </div>
    </aside>
  );
}
