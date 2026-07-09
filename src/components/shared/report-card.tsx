import { Browser, CaretRight, Clock } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { SeverityBadge } from "@/components/shared/severity-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { relativeTime } from "@/lib/format";
import type { BugReport } from "@/types";

export function ReportCard({ report }: { report: BugReport }) {
  return (
    <Link
      className="card-interactive group block rounded-xl border border-border bg-card p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      href={`/dashboard/reports/${report.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <SeverityBadge severity={report.severity} />
          <StatusBadge status={report.status} />
        </div>
        <CaretRight className="mt-0.5 size-4 shrink-0 text-ink-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>

      <h3 className="mt-3 font-medium text-[15px] text-foreground leading-snug">
        {report.title}
      </h3>
      {report.description ? (
        <p className="mt-1.5 line-clamp-2 text-ink-subtle text-sm">
          {report.description}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-ink-subtle text-xs">
        {report.browser ? (
          <span className="inline-flex items-center gap-1.5">
            <Browser className="size-3.5" />
            {report.browser}
          </span>
        ) : null}
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5" />
          {relativeTime(report.created_at)}
        </span>
      </div>
    </Link>
  );
}
