import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BugsFilters } from "@/components/bugs/bugs-filters";
import { BugsSearch } from "@/components/bugs/bugs-search";
import { BugsTable } from "@/components/bugs/bugs-table";
import { AppPage } from "@/components/layout/app-page";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { getBugCounts, getBugs, getProjectBySlug } from "@/lib/data";
import { BugIcon, TerminalIcon } from "@/lib/icons";
import type { BugSeverity, BugStatus } from "@/types";

export const metadata: Metadata = { title: "Bugs" };

const STATUSES = new Set(["open", "in_progress", "resolved", "closed"]);
const SEVERITIES = new Set(["low", "medium", "high", "critical"]);

export default async function BugsPage({
  params,
  searchParams,
}: {
  params: Promise<{ project: string }>;
  searchParams: Promise<{ q?: string; severity?: string; status?: string }>;
}) {
  const [{ project: slug }, query] = await Promise.all([params, searchParams]);

  const project = await getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  // Never hand an unvalidated string to an enum column.
  const status =
    query.status && STATUSES.has(query.status)
      ? (query.status as BugStatus)
      : undefined;
  const severity =
    query.severity && SEVERITIES.has(query.severity)
      ? (query.severity as BugSeverity)
      : undefined;

  const [bugs, counts] = await Promise.all([
    getBugs(project.id, { q: query.q, severity, status }),
    getBugCounts(project.id),
  ]);

  const filtered = Boolean(status || severity || query.q);

  return (
    <AppPage
      // A table earns every pixel it is given: more columns stay visible and
      // long report titles stop truncating. The measure cap exists for prose
      // and forms, not for data.
      contentClassName="max-w-none"
      crumbs={[
        { href: `/dashboard/${project.slug}/bugs`, label: project.name },
        { label: "Bugs" },
      ]}
      search={
        // Both read useSearchParams(); the boundaries keep this page
        // prerenderable if it is ever made static.
        <Suspense fallback={<div className="h-7 w-44" />}>
          <BugsSearch />
        </Suspense>
      }
    >
      <div className="space-y-4">
        <Suspense fallback={<div className="h-8" />}>
          <BugsFilters counts={counts} />
        </Suspense>

        {(() => {
          if (bugs.length > 0) {
            return <BugsTable bugs={bugs} projectSlug={project.slug} />;
          }

          // Three different nothings, three different next actions.
          if (filtered) {
            return (
              <EmptyState
                action={
                  <Button
                    nativeButton={false}
                    render={
                      <Link href={`/dashboard/${project.slug}/bugs`}>
                        Clear filters
                      </Link>
                    }
                    size="sm"
                    variant="outline"
                  />
                }
                description="No reports match these filters."
                icon={BugIcon}
                title="Nothing here"
              />
            );
          }

          if (!project.first_report_at) {
            return (
              <EmptyState
                action={
                  <Button
                    nativeButton={false}
                    render={
                      <Link href={`/dashboard/${project.slug}/install`}>
                        Finish installing
                      </Link>
                    }
                    size="sm"
                  />
                }
                description="Lumen hasn't received a report from this project yet. Install the widget and your first report will appear here automatically."
                icon={TerminalIcon}
                title="Waiting for your first report"
              />
            );
          }

          return (
            <EmptyState
              description="Every report has been triaged. Nothing needs your attention."
              icon={BugIcon}
              title="Inbox zero"
            />
          );
        })()}
      </div>
    </AppPage>
  );
}
