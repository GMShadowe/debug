"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const INCOMING = [
  {
    env: "Chrome 139 · macOS",
    severity: "critical",
    title: "Place order button throws on submit",
  },
  {
    env: "Safari 18 · iOS",
    severity: "medium",
    title: "Sticky header jumps on scroll",
  },
  {
    env: "Firefox 140 · Linux",
    severity: "high",
    title: "CSV export truncates at 500 rows",
  },
  {
    env: "Edge 139 · Windows",
    severity: "low",
    title: "Tooltip clipped inside the sidebar",
  },
  {
    env: "Chrome 138 · Android",
    severity: "high",
    title: "Camera permission prompt loops",
  },
  {
    env: "Safari 17 · macOS",
    severity: "medium",
    title: "Date picker opens behind the modal",
  },
];

const SEVERITY_TONE: Record<string, string> = {
  critical: "bg-destructive",
  high: "bg-[#c2662c]",
  low: "bg-ink-tertiary",
  medium: "bg-warning",
};

const ROTATE_MS = 2600;
const VISIBLE = 3;

/**
 * A live band of reports landing, sitting directly under the hero. It exists
 * to make the product feel switched on rather than photographed: something is
 * always arriving, with its environment and severity already attached.
 */
export function ReportStream() {
  const [head, setHead] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      return;
    }
    const timer = setInterval(() => {
      setHead((value) => (value + 1) % INCOMING.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  const rows = Array.from(
    { length: VISIBLE },
    (_, index) => INCOMING[(head + index) % INCOMING.length]
  );

  return (
    <div className="border-border border-y">
      <div className="mx-auto grid max-w-[1180px] items-center gap-8 px-6 py-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
        <div>
          <p className="label-mono flex items-center gap-2 text-ink-tertiary">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-success" />
            </span>
            Live stream
          </p>
          <p className="mt-2.5 text-ink-subtle text-sm leading-relaxed">
            What lands in your dashboard while you are doing something else.
          </p>
        </div>

        <ul className="space-y-1.5">
          {rows.map((row, index) => (
            <li
              className={cn(
                "stream-enter flex items-center gap-3 border-border border-b pb-1.5 last:border-0",
                index === 0 ? "text-foreground" : "text-ink-subtle"
              )}
              key={row.title}
            >
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  SEVERITY_TONE[row.severity]
                )}
              />
              <span className="min-w-0 flex-1 truncate text-[13px]">
                {row.title}
              </span>
              <span className="hidden shrink-0 font-mono text-[10px] text-ink-tertiary sm:inline">
                {row.env}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
