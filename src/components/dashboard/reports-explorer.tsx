"use client";

import {
  FunnelSimple,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState } from "react";

import { EmptyState } from "@/components/shared/empty-state";
import { ReportCard } from "@/components/shared/report-card";
import { SEVERITY_META, SEVERITY_ORDER, STATUS_META } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { BugReport, BugSeverity, BugStatus } from "@/types";

type StatusFilter = BugStatus | "all";
type SeverityFilter = BugSeverity | "all";

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { label: "All", value: "all" },
  { label: STATUS_META.open.label, value: "open" },
  { label: STATUS_META.in_progress.label, value: "in_progress" },
  { label: STATUS_META.resolved.label, value: "resolved" },
  { label: STATUS_META.closed.label, value: "closed" },
];

const SEVERITY_FILTERS: { value: SeverityFilter; label: string }[] = [
  { label: "All", value: "all" },
  ...SEVERITY_ORDER.map((severity) => ({
    label: SEVERITY_META[severity].label,
    value: severity,
  })),
];

/**
 * Builds one lowercased haystack per report so a single query can match across
 * title, description, environment, and the human-readable status / severity
 * labels (so typing "critical", "safari", or "open" all work).
 */
function searchIndex(report: BugReport): string {
  return [
    report.title,
    report.description ?? "",
    report.browser ?? "",
    report.os ?? "",
    report.page_url ?? "",
    report.reporter_email ?? "",
    STATUS_META[report.status].label,
    SEVERITY_META[report.severity].label,
  ]
    .join(" ")
    .toLowerCase();
}

function SegmentedFilter<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div
      aria-label={label}
      className="flex items-center gap-0.5 rounded-md border border-border bg-card p-1"
      role="toolbar"
    >
      {options.map((option) => (
        <button
          aria-pressed={value === option.value}
          className={cn(
            "rounded px-2.5 py-1 font-medium text-xs transition-colors duration-150",
            value === option.value
              ? "bg-muted text-foreground"
              : "text-ink-subtle hover:text-foreground"
          )}
          key={option.value}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function ReportsExplorer({ reports }: { reports: BugReport[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [severity, setSeverity] = useState<SeverityFilter>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  // Press "/" anywhere to focus search; Escape blurs/clears from within it.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = reports.filter((report) => {
    const matchesStatus = status === "all" || report.status === status;
    const matchesSeverity = severity === "all" || report.severity === severity;
    const matchesQuery = q === "" || searchIndex(report).includes(q);
    return matchesStatus && matchesSeverity && matchesQuery;
  });

  const hasFilters = q !== "" || status !== "all" || severity !== "all";

  const resetFilters = () => {
    setQuery("");
    setStatus("all");
    setSeverity("all");
  };

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="group relative">
        <MagnifyingGlass className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-subtle transition-colors group-focus-within:text-foreground" />
        <input
          className="h-9 w-full rounded-md border border-border bg-card pr-10 pl-9 text-foreground text-sm transition-[border-color,box-shadow] duration-150 placeholder:text-ink-subtle focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setQuery("");
              inputRef.current?.blur();
            }
          }}
          placeholder="Search by title, browser, severity, status…"
          ref={inputRef}
          type="search"
          value={query}
        />
        {query ? (
          <button
            aria-label="Clear search"
            className="absolute top-1/2 right-2.5 grid size-5 -translate-y-1/2 place-items-center rounded text-ink-subtle transition-colors hover:text-foreground"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            type="button"
          >
            <X className="size-3.5" />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute top-1/2 right-3 hidden h-5 min-w-5 -translate-y-1/2 items-center justify-center rounded border border-border bg-muted px-1.5 font-medium font-mono text-[11px] text-ink-subtle sm:flex">
            /
          </kbd>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <SegmentedFilter
          label="Filter by status"
          onChange={setStatus}
          options={STATUS_FILTERS}
          value={status}
        />
        <SegmentedFilter
          label="Filter by severity"
          onChange={setSeverity}
          options={SEVERITY_FILTERS}
          value={severity}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-ink-subtle text-xs tabular-nums">
          {filtered.length} of {reports.length} report
          {reports.length === 1 ? "" : "s"}
        </p>
        {hasFilters ? (
          <button
            className="font-medium text-ink-subtle text-xs transition-colors hover:text-foreground"
            onClick={resetFilters}
            type="button"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          description="Try a different search term or adjust your filters."
          icon={FunnelSimple}
          title="No matching reports"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
