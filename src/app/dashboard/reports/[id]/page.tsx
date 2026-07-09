import {
  ArrowLeft,
  Browser,
  Clock,
  DesktopTower,
  Globe,
  ImageSquare,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageContainer } from "@/components/layout/page-container";
import { SeverityBadge } from "@/components/shared/severity-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { relativeTime } from "@/lib/format";
import { getMockReport } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const report = getMockReport(id);
  return { title: report?.title ?? "Report" };
}

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Browser;
  label: string;
  value: string | null;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-border border-b py-3 last:border-0">
      <span className="flex items-center gap-2 text-ink-subtle text-sm">
        <Icon className="size-4" />
        {label}
      </span>
      <span className="truncate text-foreground text-sm">{value ?? "—"}</span>
    </div>
  );
}

export default async function ReportDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const report = getMockReport(id);

  if (!report) {
    notFound();
  }

  return (
    <PageContainer size="default">
      <div className="space-y-6">
        <Link
          className="inline-flex items-center gap-1.5 text-ink-subtle text-sm transition-colors hover:text-foreground"
          href="/dashboard/reports"
        >
          <ArrowLeft className="size-4" />
          Back to reports
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <SeverityBadge severity={report.severity} />
            <StatusBadge status={report.status} />
            <span className="inline-flex items-center gap-1.5 text-ink-subtle text-xs">
              <Clock className="size-3.5" />
              {relativeTime(report.created_at)}
            </span>
          </div>
          <h1 className="font-heading font-semibold text-2xl text-foreground tracking-tight">
            {report.title}
          </h1>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-medium text-foreground text-sm">Description</h2>
          <p className="mt-2 text-ink-muted text-sm leading-relaxed">
            {report.description ?? "No description provided."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-1 font-medium text-foreground text-sm">
              Context
            </h2>
            <MetaRow icon={Browser} label="Browser" value={report.browser} />
            <MetaRow icon={DesktopTower} label="OS" value={report.os} />
            <MetaRow icon={Globe} label="Page URL" value={report.page_url} />
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-3 font-medium text-foreground text-sm">
              Screenshot
            </h2>
            <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-lg border border-border border-dashed bg-muted/40 text-ink-subtle">
              <ImageSquare className="size-6" />
              <span className="text-xs">No screenshot attached</span>
            </div>
          </div>
        </div>

        <p className="text-center text-ink-subtle text-xs">
          This is placeholder data. Live reports will appear here once the
          widget is installed.
        </p>
      </div>
    </PageContainer>
  );
}
