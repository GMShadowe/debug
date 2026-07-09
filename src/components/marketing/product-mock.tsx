import {
  Bug,
  GearSix,
  House,
  PaperPlaneTilt,
  Table,
} from "@phosphor-icons/react/dist/ssr";

const STAT_TILES = [
  { label: "Total reports", value: "248" },
  { label: "Open", value: "37" },
  { label: "Critical", value: "5" },
];

const REPORT_ROWS = [
  {
    dot: "bg-destructive",
    meta: "Safari · 42m ago",
    title: "Checkout button unresponsive",
  },
  {
    dot: "bg-[#e5844a]",
    meta: "Edge · 5h ago",
    title: "Uploads over 5MB silently fail",
  },
  {
    dot: "bg-warning",
    meta: "Chrome · 5h ago",
    title: "Sidebar overlaps content at 1280px",
  },
  {
    dot: "bg-ink-subtle",
    meta: "Firefox · 1d ago",
    title: "Typo in onboarding email subject",
  },
];

const RAIL_ICONS = [House, Table, Bug, GearSix];

/**
 * A high-fidelity static capture of the Lumen triage dashboard — the hero's
 * protagonist surface.
 */
export function DashboardMock() {
  return (
    <div className="flex min-h-[380px]">
      {/* Sidebar rail */}
      <div className="hidden w-12 shrink-0 flex-col items-center gap-1 border-border border-r py-4 sm:flex">
        <div className="mb-3 grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
          <Bug className="size-4" weight="bold" />
        </div>
        {RAIL_ICONS.map((Icon, index) => (
          <div
            className={`grid size-8 place-items-center rounded-md ${
              index === 0 ? "bg-muted text-foreground" : "text-ink-subtle"
            }`}
            // biome-ignore lint/suspicious/noArrayIndexKey: static decorative rail
            key={index}
          >
            <Icon className="size-4" />
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="min-w-0 flex-1 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-heading font-semibold text-base text-foreground tracking-tight">
              Overview
            </p>
            <p className="text-[11px] text-ink-subtle">Last 14 days</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2 py-0.5 text-[11px] text-ink-subtle">
            <span className="size-1.5 rounded-full bg-success" />
            Live
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {STAT_TILES.map((tile) => (
            <div
              className="rounded-lg border border-border bg-card p-3"
              key={tile.label}
            >
              <p className="truncate text-[10px] text-ink-subtle">
                {tile.label}
              </p>
              <p className="mt-1.5 font-semibold text-foreground text-lg tabular-nums">
                {tile.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-2">
          {REPORT_ROWS.map((row) => (
            <div
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
              key={row.title}
            >
              <span className={`size-2 shrink-0 rounded-full ${row.dot}`} />
              <span className="flex-1 truncate text-foreground text-xs">
                {row.title}
              </span>
              <span className="hidden shrink-0 font-mono text-[10px] text-ink-subtle sm:inline">
                {row.meta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * A capture of the drop-in reporting widget open over a host page — shows the
 * annotated screenshot, severity, and note fields.
 */
export function WidgetMock() {
  return (
    <div className="relative min-h-[380px] overflow-hidden p-6">
      {/* Faux host-page content behind the widget */}
      <div className="space-y-3 opacity-40">
        <div className="h-6 w-40 rounded bg-hairline-strong" />
        <div className="h-3 w-full max-w-md rounded bg-border" />
        <div className="h-3 w-full max-w-sm rounded bg-border" />
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="h-20 rounded-lg bg-border" />
          <div className="h-20 rounded-lg bg-border" />
          <div className="h-20 rounded-lg bg-border" />
        </div>
      </div>

      {/* Widget panel */}
      <div className="panel-highlight absolute right-6 bottom-20 w-64 rounded-xl border border-hairline-strong bg-card p-3.5 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground text-xs">
            Report a bug
          </span>
          <span className="flex gap-1">
            <span className="size-1.5 rounded-full bg-hairline-strong" />
            <span className="size-1.5 rounded-full bg-hairline-strong" />
          </span>
        </div>

        {/* Screenshot region */}
        <div className="mt-3 grid h-24 place-items-center rounded-lg border border-border border-dashed bg-background">
          <span className="rounded-md bg-primary/15 px-2 py-1 text-[10px] text-primary">
            Screenshot attached
          </span>
        </div>

        {/* Severity */}
        <div className="mt-3 flex items-center gap-1.5">
          {[
            { color: "bg-destructive", on: true },
            { color: "bg-[#e5844a]", on: false },
            { color: "bg-warning", on: false },
            { color: "bg-ink-subtle", on: false },
          ].map((sev) => (
            <span
              className={`size-4 rounded-full ${sev.color} ${
                sev.on
                  ? "ring-2 ring-foreground/60 ring-offset-0"
                  : "opacity-40"
              }`}
              key={sev.color}
            />
          ))}
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="h-2 w-full rounded bg-border" />
          <div className="h-2 w-3/4 rounded bg-border" />
        </div>

        <div className="mt-3 flex items-center justify-end gap-2">
          <span className="rounded-md px-2 py-1 text-[10px] text-ink-subtle">
            Cancel
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 font-medium text-[10px] text-primary-foreground">
            <PaperPlaneTilt className="size-3" weight="bold" />
            Send
          </span>
        </div>
      </div>

      {/* Floating trigger */}
      <div className="absolute right-6 bottom-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 font-medium text-primary-foreground text-xs shadow-lg">
          <Bug className="size-4" weight="bold" />
          Feedback
        </span>
      </div>
    </div>
  );
}
