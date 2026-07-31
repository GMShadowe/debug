"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const VIEWS = [
  {
    body: "Volume, severity mix and the trend line across your whole project, so you know what today looks like before you open a single report.",
    id: "overview",
    label: "Overview",
  },
  {
    body: "Every report in one table, filterable by status and severity. Search hits titles, environments, URLs and reporters at once.",
    id: "queue",
    label: "Queue",
  },
  {
    body: "The full record: annotated screenshot, environment, console trail. Everything you need to reproduce, on one screen.",
    id: "detail",
    label: "Detail",
  },
];

const STATS = [
  { delta: "+12", label: "Reports", value: "248" },
  { delta: "-4", label: "Open", value: "37" },
  { delta: "+1", label: "Critical", value: "5" },
  { delta: "2.4h", label: "Median close", value: "2.4h" },
];

const TREND = [34, 41, 38, 52, 47, 61, 55, 72, 66, 81, 74, 92];

const QUEUE_ROWS = [
  {
    env: "Safari 18 · iOS",
    severity: "critical",
    time: "42m",
    title: "Place order button throws",
  },
  {
    env: "Edge 139 · Win 11",
    severity: "high",
    time: "5h",
    title: "Uploads over 5MB fail silently",
  },
  {
    env: "Chrome 139 · macOS",
    severity: "medium",
    time: "5h",
    title: "Sidebar overlaps content at 1280px",
  },
  {
    env: "Firefox 140 · Linux",
    severity: "low",
    time: "1d",
    title: "Typo in onboarding email subject",
  },
  {
    env: "Chrome 138 · Android",
    severity: "medium",
    time: "1d",
    title: "Date picker opens behind modal",
  },
];

const SEVERITY_TONE: Record<string, string> = {
  critical: "bg-destructive",
  high: "bg-[#e5844a]",
  low: "bg-ink-subtle",
  medium: "bg-warning",
};

/**
 * Act four. The receiving end, driven by clicks rather than scroll — after
 * three pinned scenes the page needs the reader's hands back, and the triage
 * story is genuinely three views rather than one continuous move.
 */
export function TriageScene() {
  const [view, setView] = useState(VIEWS[0].id);
  const active = VIEWS.find((item) => item.id === view) ?? VIEWS[0];

  return (
    <section className="mx-auto max-w-[1180px] px-6 py-24 sm:py-32" id="triage">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="label-mono text-ink-tertiary">Act 04 · The triage</p>
          <h2 className="mt-4 max-w-xl text-balance text-display-2 text-foreground">
            Everything lands somewhere <em>useful</em>.
          </h2>
        </div>
        <p className="max-w-sm text-ink-muted leading-relaxed">
          Reports arrive already triaged by severity and grouped by project.
          Open one and the reproduction is already written for you.
        </p>
      </div>

      {/* View switcher */}
      <div className="mt-10 flex flex-wrap items-center gap-1 border-border border-b">
        {VIEWS.map((item) => (
          <button
            className={cn(
              "relative px-4 py-3 text-sm transition-colors duration-200",
              view === item.id
                ? "text-foreground"
                : "text-ink-subtle hover:text-foreground"
            )}
            key={item.id}
            onClick={() => setView(item.id)}
            type="button"
          >
            {item.label}
            {view === item.id ? (
              <motion.span
                className="absolute inset-x-0 -bottom-px h-px bg-foreground"
                layoutId="triage-tab"
                transition={{ damping: 30, stiffness: 380, type: "spring" }}
              />
            ) : null}
          </button>
        ))}
      </div>

      <p className="mt-5 max-w-lg text-ink-subtle text-sm leading-relaxed">
        {active.body}
      </p>

      <div className="panel-dark island-shadow view-rise mt-8 overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2 border-border border-b px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-hairline-strong" />
            <span className="size-2.5 rounded-full bg-hairline-strong" />
            <span className="size-2.5 rounded-full bg-hairline-strong" />
          </span>
          <span className="ml-2 flex h-6 max-w-[240px] flex-1 items-center rounded-md border border-border bg-background px-2.5">
            <span className="truncate font-mono text-[11px] text-ink-subtle">
              app.lumen.dev/{view === "overview" ? "dashboard" : "reports"}
            </span>
          </span>
        </div>

        <div className="min-h-[400px] bg-background p-5 sm:min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: 10 }}
              key={view}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              {view === "overview" ? <OverviewView /> : null}
              {view === "queue" ? <QueueView /> : null}
              {view === "detail" ? <DetailView /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function OverviewView() {
  const peak = Math.max(...TREND);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {STATS.map((stat) => (
          <div
            className="rounded-lg border border-border bg-card p-3.5"
            key={stat.label}
          >
            <p className="text-[11px] text-ink-subtle">{stat.label}</p>
            <p className="mt-1.5 font-semibold text-2xl text-foreground tabular-nums tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-border bg-card p-4">
        <p className="text-[11px] text-ink-subtle">Reports · last 12 weeks</p>
        <div className="mt-4 flex h-32 items-end gap-1.5">
          {TREND.map((point, index) => (
            <motion.span
              animate={{ height: `${(point / peak) * 100}%` }}
              className={cn(
                "flex-1 rounded-t-sm",
                index === TREND.length - 1 ? "bg-primary" : "bg-accent"
              )}
              initial={{ height: 0 }}
              key={point}
              transition={{
                delay: index * 0.035,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function QueueView() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 pb-1">
        <span className="flex h-7 flex-1 items-center rounded-md border border-border bg-card px-2.5 font-mono text-[11px] text-ink-tertiary">
          Search reports…
        </span>
        {["All", "Open", "Critical"].map((chip, index) => (
          <span
            className={cn(
              "rounded-md border px-2.5 py-1 text-[11px]",
              index === 0
                ? "border-hairline-strong bg-accent text-foreground"
                : "border-border text-ink-subtle"
            )}
            key={chip}
          >
            {chip}
          </span>
        ))}
      </div>

      {QUEUE_ROWS.map((row, index) => (
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 rounded-lg border border-border bg-card px-3.5 py-3 transition-colors duration-200 hover:border-hairline-strong"
          initial={{ opacity: 0, x: -12 }}
          key={row.title}
          transition={{ delay: index * 0.05, duration: 0.4 }}
        >
          <span
            className={cn(
              "size-2 shrink-0 rounded-full",
              SEVERITY_TONE[row.severity]
            )}
          />
          <span className="min-w-0 flex-1 truncate text-[13px] text-foreground">
            {row.title}
          </span>
          <span className="hidden shrink-0 font-mono text-[10px] text-ink-subtle sm:inline">
            {row.env}
          </span>
          <span className="shrink-0 font-mono text-[10px] text-ink-tertiary tabular-nums">
            {row.time}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function DetailView() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] text-ink-tertiary">RPT-4128</p>
            <h3 className="mt-1 font-semibold text-foreground text-lg tracking-tight">
              Place order button throws
            </h3>
          </div>
          <span className="shrink-0 rounded-full border border-destructive/40 bg-destructive/10 px-2.5 py-1 font-medium text-[11px] text-destructive">
            Critical
          </span>
        </div>

        <div className="relative mt-4 h-44 overflow-hidden rounded-lg border border-border bg-card">
          <div className="absolute inset-0 p-4">
            <div className="h-2.5 w-24 rounded-full bg-hairline-strong" />
            <div className="mt-3 h-2 w-full rounded-full bg-border" />
            <div className="mt-2 h-2 w-3/4 rounded-full bg-border" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="h-10 rounded bg-background" />
              <div className="h-10 rounded bg-background" />
              <div className="h-10 rounded bg-background" />
            </div>
          </div>
          <span className="absolute bottom-4 left-4 h-9 w-36 rounded-md border-2 border-destructive/70 border-dashed" />
        </div>

        <div className="mt-3 rounded-lg border border-border bg-card p-3">
          <p className="font-mono text-[9px] text-ink-tertiary uppercase tracking-[0.1em]">
            Console trail
          </p>
          <p className="mt-1.5 font-mono text-[11px] text-destructive">
            TypeError: t.submit is not a function
          </p>
          <p className="font-mono text-[11px] text-ink-subtle">
            at Checkout.tsx:214:19
          </p>
          <p className="font-mono text-[11px] text-warning">
            [warn] payment intent retried (2)
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {[
          { label: "Status", value: "Open" },
          { label: "Browser", value: "Safari 18" },
          { label: "OS", value: "iOS 18.2" },
          { label: "Viewport", value: "390 × 844" },
          { label: "Reporter", value: "dana@acme.co" },
        ].map((row) => (
          <div
            className="rounded-lg border border-border bg-card px-3 py-2"
            key={row.label}
          >
            <p className="font-mono text-[9px] text-ink-tertiary uppercase tracking-[0.1em]">
              {row.label}
            </p>
            <p className="mt-0.5 truncate text-[12px] text-foreground">
              {row.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
