import Link from "next/link";

import { StatusBadge } from "@/components/shared/status-badge";
import { Icon } from "@/components/ui/icon";
import { SEVERITY_META } from "@/lib/config";
import { relativeTime } from "@/lib/format";
import { BrowserIcon, ImageIcon, OsIcon, ReplayIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { BugReport } from "@/types";

/**
 * A GitHub/Linear-style list: one row per report, aligned columns, no cards.
 *
 * There is no Evidence column. It was blank on almost every row — a header
 * reserving width to say nothing — so the screenshot and replay indicators moved
 * inline beside the title, where they appear only when the report actually has
 * them.
 *
 * Cards force the eye to re-anchor on every item; rows let it scan a single
 * column. Severity is a 6px dot rather than a coloured pill, so a screen of
 * criticals doesn't turn into a wall of red.
 */
export function BugsTable({
  bugs,
  projectSlug,
}: {
  bugs: BugReport[];
  projectSlug: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-border border-b bg-card/40 text-[11px] text-ink-tertiary uppercase tracking-wider">
            <th className="py-2 pr-3 pl-4 font-medium">Report</th>
            <th className="hidden w-28 px-3 py-2 font-medium sm:table-cell">
              Status
            </th>
            <th className="hidden w-40 px-3 py-2 font-medium lg:table-cell">
              Environment
            </th>
            <th className="w-28 py-2 pr-4 pl-3 text-right font-medium">Age</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => {
            const severity = SEVERITY_META[bug.severity];
            return (
              <tr
                className="group border-border border-b transition-colors last:border-0 hover:bg-card/60"
                key={bug.id}
              >
                <td className="py-2.5 pr-3 pl-4">
                  <div className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-1.5 size-1.5 shrink-0 rounded-full",
                        severity.dot
                      )}
                    />
                    <div className="min-w-0">
                      <div className="flex min-w-0 items-center gap-1.5">
                        <Link
                          className="truncate rounded-sm font-medium text-[13px] text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          href={`/dashboard/${projectSlug}/bugs/${bug.id}`}
                        >
                          {bug.title}
                        </Link>
                        {bug.screenshot_url ? (
                          <Icon
                            aria-label="Has screenshot"
                            className="size-3 shrink-0 text-ink-tertiary"
                            icon={ImageIcon}
                          />
                        ) : null}
                        {bug.session_id ? (
                          <Icon
                            aria-label="Has session replay"
                            className="size-3 shrink-0 text-ink-tertiary"
                            icon={ReplayIcon}
                          />
                        ) : null}
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-ink-tertiary">
                        <span className="sr-only">Severity: </span>
                        {severity.label}
                        {bug.reporter_email ? ` · ${bug.reporter_email}` : null}
                        {bug.page_url ? ` · ${bug.page_url}` : null}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="hidden px-3 py-2.5 sm:table-cell">
                  <StatusBadge status={bug.status} />
                </td>

                <td className="hidden px-3 py-2.5 lg:table-cell">
                  <div className="flex items-center gap-3 text-[11px] text-ink-subtle">
                    {bug.browser ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Icon className="size-3.5" icon={BrowserIcon} />
                        <span className="truncate">{bug.browser}</span>
                      </span>
                    ) : null}
                    {bug.os ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Icon className="size-3.5" icon={OsIcon} />
                        <span className="truncate">{bug.os}</span>
                      </span>
                    ) : null}
                  </div>
                </td>

                <td className="whitespace-nowrap py-2.5 pr-4 pl-3 text-right text-[11px] text-ink-tertiary tabular-nums">
                  {relativeTime(bug.created_at)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
