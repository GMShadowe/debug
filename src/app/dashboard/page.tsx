import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";

import { ReportsTrendChart } from "@/components/dashboard/reports-trend-chart";
import { SeverityBreakdown } from "@/components/dashboard/severity-breakdown";
import { PageContainer } from "@/components/layout/page-container";
import { PageSection } from "@/components/layout/page-section";
import { PageHeader } from "@/components/shared/page-header";
import { ReportCard } from "@/components/shared/report-card";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MOCK_REPORTS,
  MOCK_SEVERITY_BREAKDOWN,
  MOCK_STATS,
  MOCK_TREND,
} from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  const recent = MOCK_REPORTS.slice(0, 4);

  return (
    <PageContainer size="default">
      <div className="space-y-8">
        <PageHeader
          actions={<Badge variant="secondary">Last 14 days</Badge>}
          description="A snapshot of bug reports flowing in from your widget."
          title="Overview"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-heading font-medium text-base text-foreground">
                  Reports over time
                </h2>
                <p className="text-ink-subtle text-xs">
                  Daily submissions, last 14 days
                </p>
              </div>
            </div>
            <ReportsTrendChart data={MOCK_TREND} />
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-heading font-medium text-base text-foreground">
              By severity
            </h2>
            <p className="mb-5 text-ink-subtle text-xs">
              Distribution of open reports
            </p>
            <SeverityBreakdown data={MOCK_SEVERITY_BREAKDOWN} />
          </div>
        </div>

        <PageSection
          aside={
            <Button
              className="h-8 gap-1.5 rounded-md px-2.5 text-sm"
              render={
                <Link href="/dashboard/reports">
                  View all
                  <ArrowRight className="size-3.5" />
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
