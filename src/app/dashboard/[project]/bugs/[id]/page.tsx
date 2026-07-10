import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { CommentForm } from "@/components/bugs/comment-form";
import { CommentItem } from "@/components/bugs/comment-item";
import { TriageRail } from "@/components/bugs/triage-rail";
import { AppPage } from "@/components/layout/app-page";
import { Icon } from "@/components/ui/icon";
import { SEVERITY_META, STATUS_META } from "@/lib/config";
import {
  getActivity,
  getBug,
  getComments,
  getCurrentUser,
  getProjectBySlug,
} from "@/lib/data";
import { relativeTime } from "@/lib/format";
import { ImageIcon } from "@/lib/icons";
import type { Activity, ConsoleLog } from "@/types";

export const metadata: Metadata = { title: "Report" };

/** How many timeline entries to show before it becomes a wall. */
const ACTIVITY_LIMIT = 5;

export default async function BugDetailPage({
  params,
}: {
  params: Promise<{ id: string; project: string }>;
}) {
  const { id, project: slug } = await params;

  const [project, bug] = await Promise.all([
    getProjectBySlug(slug),
    getBug(id),
  ]);

  if (!(project && bug) || bug.project_id !== project.id) {
    notFound();
  }

  const [comments, activity, user] = await Promise.all([
    getComments(bug.id),
    getActivity(bug.id),
    getCurrentUser(),
  ]);

  const rawLogs = Array.isArray(bug.console_logs)
    ? (bug.console_logs as unknown as ConsoleLog[])
    : [];

  // Console lines carry no id and repeat verbatim, so derive a key from the
  // content plus an occurrence counter rather than the array index.
  const seen = new Map<string, number>();
  const logs = rawLogs.map((log) => {
    const signature = `${log.level}:${log.message}`;
    const occurrence = (seen.get(signature) ?? 0) + 1;
    seen.set(signature, occurrence);
    return { ...log, key: `${signature}#${occurrence}` };
  });

  // Newest first, capped. The full history is rarely what anyone came for.
  const recentActivity = [...activity].reverse().slice(0, ACTIVITY_LIMIT);
  const hiddenActivity = activity.length - recentActivity.length;

  const hasEvidence = Boolean(bug.screenshot_url || bug.session_id);

  return (
    <AppPage
      contentClassName="max-w-none"
      crumbs={[
        { href: `/dashboard/${project.slug}/bugs`, label: project.name },
        { href: `/dashboard/${project.slug}/bugs`, label: "Bugs" },
        { label: bug.title },
      ]}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        {/* Left: the evidence. */}
        <div className="min-w-0 space-y-8">
          <div>
            <h1 className="font-heading font-semibold text-foreground text-xl tracking-[-0.02em]">
              {bug.title}
            </h1>
            <p className="mt-1 text-[12px] text-ink-tertiary">
              Reported {relativeTime(bug.created_at)}
              {bug.reporter_email ? ` by ${bug.reporter_email}` : null}
            </p>
            {bug.description ? (
              <p className="mt-4 whitespace-pre-wrap text-[13px] text-ink-muted leading-relaxed">
                {bug.description}
              </p>
            ) : null}
          </div>

          {/*
           * Absent evidence used to render two full-bleed dashed boxes, so a
           * report with no screenshot and no replay was mostly empty rectangles.
           * Nothing is now stated in one line.
           */}
          {bug.screenshot_url ? (
            <Section title="Screenshot">
              <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-card">
                <Image
                  alt={`Screenshot for: ${bug.title}`}
                  className="object-contain"
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  src={bug.screenshot_url}
                />
              </div>
            </Section>
          ) : null}

          {hasEvidence ? null : (
            <p className="flex items-center gap-2 rounded-md border border-border border-dashed bg-card/40 px-3 py-2.5 text-[12px] text-ink-tertiary">
              <Icon className="size-3.5" icon={ImageIcon} />
              No screenshot or session replay was attached to this report.
            </p>
          )}

          {bug.steps ? (
            <Section title="Steps to reproduce">
              <p className="whitespace-pre-wrap rounded-md border border-border bg-card p-3 text-[13px] text-ink-muted leading-relaxed">
                {bug.steps}
              </p>
            </Section>
          ) : null}

          {logs.length > 0 ? (
            <Section title="Console">
              <div className="overflow-hidden rounded-md border border-border bg-card">
                {logs.map((log) => (
                  <div
                    className="flex gap-3 border-border border-b px-3 py-2 font-mono text-[11px] last:border-0"
                    key={log.key}
                  >
                    <span className="w-10 shrink-0 text-ink-tertiary uppercase">
                      {log.level}
                    </span>
                    <span className="min-w-0 break-all text-ink-muted">
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {/*
           * Notes read newest-first, so the composer sits above the list. With
           * the composer below, a note you just wrote would appear at the top
           * and you would have to go looking for it.
           */}
          <Section title="Notes">
            <div className="space-y-4">
              <CommentForm bugId={bug.id} />
              {comments.length > 0 ? (
                <ul className="space-y-3">
                  {comments.map((comment) => (
                    <CommentItem
                      canDelete={comment.author_id === user?.id}
                      comment={comment}
                      key={comment.id}
                    />
                  ))}
                </ul>
              ) : null}
            </div>
          </Section>
        </div>

        {/* Right: the triage rail. */}
        <aside className="space-y-6">
          <TriageRail bug={bug} />

          <Field label="Environment">
            <dl className="space-y-1.5 text-[12px]">
              <Meta label="Browser" value={bug.browser} />
              <Meta label="OS" value={bug.os} />
              <Meta label="Viewport" value={bug.viewport} />
              <Meta label="Device" value={bug.device} />
              <Meta label="URL" value={bug.page_url} />
            </dl>
          </Field>

          {activity.length > 0 ? (
            <Field label="Activity">
              <ol className="space-y-2">
                {recentActivity.map((event) => (
                  <li className="text-[12px]" key={event.id}>
                    <span className="text-ink-muted">
                      {describeActivity(event)}
                    </span>
                    <span className="block text-[11px] text-ink-tertiary">
                      {relativeTime(event.created_at)}
                    </span>
                  </li>
                ))}
              </ol>
              {hiddenActivity > 0 ? (
                <p className="mt-2 text-[11px] text-ink-tertiary">
                  +{hiddenActivity} earlier
                </p>
              ) : null}
            </Field>
          ) : null}
        </aside>
      </div>
    </AppPage>
  );
}

/**
 * The timeline reads to a human, so it uses the same labels the UI shows —
 * `in_progress` is a column value, not a word anyone says out loud.
 */
function describeActivity(event: Activity): string {
  const data = (event.data ?? {}) as Record<string, string>;

  if (event.type === "status_changed") {
    const from = STATUS_META[data.from as keyof typeof STATUS_META]?.label;
    const to = STATUS_META[data.to as keyof typeof STATUS_META]?.label;
    return `Status changed to ${to ?? data.to}${from ? ` from ${from}` : ""}`;
  }
  if (event.type === "severity_changed") {
    const to = SEVERITY_META[data.to as keyof typeof SEVERITY_META]?.label;
    return `Severity set to ${to ?? data.to}`;
  }
  if (event.type === "assigned") {
    return "Assigned";
  }
  if (event.type === "unassigned") {
    return "Unassigned";
  }
  return event.type;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2.5 font-medium text-[11px] text-ink-tertiary uppercase tracking-wider">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 font-medium text-[11px] text-ink-tertiary">
        {label}
      </p>
      {children}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string | null }) {
  if (!value) {
    return null;
  }
  return (
    <div className="flex gap-2">
      <dt className="w-16 shrink-0 text-ink-tertiary">{label}</dt>
      <dd className="min-w-0 truncate text-ink-muted" title={value}>
        {value}
      </dd>
    </div>
  );
}
