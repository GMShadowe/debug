import type { BugSeverity, BugStatus } from "@/types";

interface SeverityMeta {
  /** Tailwind classes for the severity badge. */
  className: string;
  dot: string;
  label: string;
}

export const SEVERITY_META: Record<BugSeverity, SeverityMeta> = {
  critical: {
    className: "border-transparent bg-destructive/10 text-destructive",
    dot: "bg-destructive",
    label: "Critical",
  },
  high: {
    className: "border-transparent bg-[#e5844a]/10 text-[#e5844a]",
    dot: "bg-[#e5844a]",
    label: "High",
  },
  low: {
    className: "border-hairline bg-muted text-ink-subtle",
    dot: "bg-ink-subtle",
    label: "Low",
  },
  medium: {
    className: "border-transparent bg-warning/10 text-warning",
    dot: "bg-warning",
    label: "Medium",
  },
};

interface StatusMeta {
  className: string;
  label: string;
}

export const STATUS_META: Record<BugStatus, StatusMeta> = {
  closed: {
    className: "border-hairline bg-muted text-ink-subtle",
    label: "Closed",
  },
  in_progress: {
    className: "border-transparent bg-warning/10 text-warning",
    label: "In progress",
  },
  open: {
    className: "border-transparent bg-primary/10 text-[#98a2ff]",
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
