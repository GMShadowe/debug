"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const ROTATE_MS = 2600;
/** How many rows are visible in the stream at once. */
const WINDOW = 3;

const REPORTS = [
  {
    browser: "Safari 18",
    dot: "bg-destructive",
    title: "Checkout button unresponsive on iPad",
  },
  {
    browser: "Chrome 126",
    dot: "bg-warning",
    title: "Sidebar overlaps content at 1280px",
  },
  {
    browser: "Firefox 128",
    dot: "bg-ink-subtle",
    title: "Typo in onboarding email subject",
  },
  {
    browser: "Edge 126",
    dot: "bg-[#e5844a]",
    title: "Uploads over 5MB silently fail",
  },
  {
    browser: "Chrome 126",
    dot: "bg-destructive",
    title: "Payment form clears on validation error",
  },
  {
    browser: "Safari 18",
    dot: "bg-warning",
    title: "Dark mode flashes white on route change",
  },
  {
    browser: "Arc 1.45",
    dot: "bg-ink-subtle",
    title: "Tooltip clipped inside data table",
  },
];

/**
 * A live stream of incoming reports: every few seconds a new row slides in on
 * top and the oldest fades out, so the product feels switched on. Purely
 * presentational demo data, styled like the dashboard rows. Static under
 * reduced motion.
 */
export function ReportTicker() {
  const [head, setHead] = useState(WINDOW - 1);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    setAnimate(true);
    const timer = setInterval(() => {
      setHead((current) => (current + 1) % REPORTS.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  // Newest first: head, head-1, head-2 …
  const visible = Array.from({ length: WINDOW }, (_, offset) => {
    const index = (head - offset + REPORTS.length * 2) % REPORTS.length;
    return { offset, report: REPORTS[index] };
  });

  return (
    <div aria-hidden="true" className="space-y-2">
      {visible.map(({ offset, report }) => (
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 transition-[opacity] duration-500",
            animate && offset === 0 && "ticker-enter",
            offset === 1 && "opacity-70",
            offset === 2 && "opacity-40"
          )}
          key={report.title}
        >
          <span className={cn("size-2 shrink-0 rounded-full", report.dot)} />
          <span className="min-w-0 flex-1 truncate text-foreground text-xs">
            {report.title}
          </span>
          <span className="hidden shrink-0 font-mono text-[10px] text-ink-subtle sm:inline">
            {report.browser}
          </span>
          <span className="shrink-0 font-mono text-[10px] text-ink-tertiary">
            {["just now", "14s ago", "41s ago"][offset]}
          </span>
        </div>
      ))}
    </div>
  );
}
