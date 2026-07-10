import type { BugSeverity, BugStatus } from "@/types";

interface SeverityMeta {
  /** Solid dot colour — the only place severity is allowed to use hue. */
  dot: string;
  label: string;
  /** Muted text colour for the label beside the dot. */
  text: string;
}

/**
 * Severity is what the reporter observed. It is expressed as a small coloured
 * dot plus neutral text, never a filled pill: a table of coloured pills is the
 * fastest way to make a dense list unreadable.
 */
export const SEVERITY_META: Record<BugSeverity, SeverityMeta> = {
  critical: {
    dot: "bg-destructive",
    label: "Critical",
    text: "text-foreground",
  },
  high: { dot: "bg-[#e5844a]", label: "High", text: "text-foreground" },
  low: { dot: "bg-ink-tertiary", label: "Low", text: "text-ink-subtle" },
  medium: { dot: "bg-warning", label: "Medium", text: "text-ink-muted" },
};

interface StatusMeta {
  /** Badge classes. Status is the one axis worth a filled chip. */
  className: string;
  label: string;
  /**
   * One word, for tight rows like the filter segments. Only `in_progress`
   * differs; the rest fall back to `label` so a caller never has to ask which
   * statuses happen to have a short form.
   */
  shortLabel?: string;
}

export const STATUS_META: Record<BugStatus, StatusMeta> = {
  closed: {
    className: "border-border bg-transparent text-ink-tertiary",
    label: "Closed",
  },
  in_progress: {
    className: "border-transparent bg-warning/10 text-warning",
    label: "In progress",
    shortLabel: "Progress",
  },
  open: {
    className: "border-transparent bg-foreground/10 text-foreground",
    label: "Open",
  },
  resolved: {
    className: "border-transparent bg-success/10 text-success",
    label: "Resolved",
  },
};

export const SEVERITY_ORDER: BugSeverity[] = [
  "critical",
  "high",
  "medium",
  "low",
];

export const STATUS_ORDER: BugStatus[] = [
  "open",
  "in_progress",
  "resolved",
  "closed",
];
