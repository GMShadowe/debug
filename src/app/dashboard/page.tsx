import { ArrowRight, Globe } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";

import { CopyButton } from "@/components/dashboard/copy-button";
import { ReportsTrendChart } from "@/components/dashboard/reports-trend-chart";
import { SeverityBreakdown } from "@/components/dashboard/severity-breakdown";
import { PageContainer } from "@/components/layout/page-container";
import { PageSection } from "@/components/layout/page-section";
import { ReportCard } from "@/components/shared/report-card";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserProject } from "@/lib/data";
import {
  MOCK_REPORTS,
  MOCK_SEVERITY_BREAKDOWN,
  MOCK_STATS,
  MOCK_TREND,
} from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const project = await getUserProject();

  const projectName = project?.name ?? "Lumen";
  const widgetUrl = project?.domain
    ? `https://${project.domain}`
    : `https://app.lumen.dev/embed/${(project?.id ?? "demo").slice(0, 8)}`;
  const recent = MOCK_REPORTS.slice(0, 4);

  return (
    <PageContainer className="max-w-6xl" size="full">
      <div className="space-y-10">
        {/* Header */}
        <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <h1 className="font-heading font-semibold text-3xl text-foreground tracking-tight">
                {projectName}
              </h1>
              <Badge variant="outline">Production</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 items-center gap-2 rounded-md border border-border bg-card px-3">
                <Globe className="size-3.5 shrink-0 text-ink-subtle" />
                <span className="truncate font-mono text-ink-subtle text-xs">
                  {widgetUrl}
                </span>
              </div>
              <CopyButton value={widgetUrl} />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-ink-subtle text-xs">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-success" />
              </span>
              Widget live
            </span>
            <Button
              className="h-8 gap-1.5 rounded-md px-3 text-sm"
              nativeButton={false}
              render={
                <Link href="/dashboard/reports">
                  View reports
                  <ArrowRight className="size-3.5 transition-transform group-hover/button:translate-x-0.5" />
                </Link>
              }
              variant="outline"
            />
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        {/* Trend + severity */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="card-interactive rounded-xl border border-border bg-card p-6 lg:col-span-2">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-heading font-medium text-base text-foreground">
                  Reports over time
                </h2>
                <p className="mt-0.5 text-ink-subtle text-xs">
                  Daily submissions across the project
                </p>
              </div>
              <Badge variant="outline">Last 14 days</Badge>
            </div>
            <ReportsTrendChart data={MOCK_TREND} />
          </div>

          <div className="card-interactive rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading font-medium text-base text-foreground">
              By severity
            </h2>
            <p className="mt-0.5 mb-6 text-ink-subtle text-xs">
              Distribution of open reports
            </p>
            <SeverityBreakdown data={MOCK_SEVERITY_BREAKDOWN} />
          </div>
        </div>

        {/* Recent reports */}
        <PageSection
          aside={
            <Button
              className="h-8 gap-1.5 rounded-md px-2.5 text-sm"
              nativeButton={false}
              render={
                <Link href="/dashboard/reports">
                  View all
                  <ArrowRight className="size-3.5 transition-transform group-hover/button:translate-x-0.5" />
                </Link>
              }
              variant="ghost"
            />
          }
          title="Recent reports"
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {recent.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </PageSection>
      </div>
    </PageContainer>
  );
}
