"use client";

import { FunnelSimple, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

import { EmptyState } from "@/components/shared/empty-state";
import { ReportCard } from "@/components/shared/report-card";
import { STATUS_META } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { BugReport, BugStatus } from "@/types";

type StatusFilter = BugStatus | "all";

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { label: "All", value: "all" },
  { label: STATUS_META.open.label, value: "open" },
  { label: STATUS_META.in_progress.label, value: "in_progress" },
  { label: STATUS_META.resolved.label, value: "resolved" },
  { label: STATUS_META.closed.label, value: "closed" },
];

export function ReportsExplorer({ reports }: { reports: BugReport[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const q = query.trim().toLowerCase();
  const filtered = reports.filter((report) => {
    const matchesStatus = status === "all" || report.status === status;
    const matchesQuery =
      q === "" ||
      report.title.toLowerCase().includes(q) ||
      (report.description?.toLowerCase().includes(q) ?? false);
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-5">
      {/* Filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <MagnifyingGlass className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-subtle" />
          <input
            className="h-9 w-full rounded-md border border-border bg-card pr-3 pl-9 text-foreground text-sm placeholder:text-ink-subtle focus:border-hairline-strong focus:outline-none focus:ring-2 focus:ring-ring/40"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search reports…"
            type="search"
            value={query}
          />
        </div>

        <div className="flex items-center gap-1 rounded-md border border-border bg-card p-1">
          {STATUS_FILTERS.map((filter) => (
            <button
              className={cn(
                "rounded px-2.5 py-1 font-medium text-xs transition-colors",
                status === filter.value
                  ? "bg-muted text-foreground"
                  : "text-ink-subtle hover:text-foreground"
              )}
              key={filter.value}
              onClick={() => setStatus(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-ink-subtle text-xs">
        {filtered.length} of {reports.length} report
        {reports.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          description="Try a different search term or status filter."
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
