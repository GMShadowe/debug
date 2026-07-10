import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppPage } from "@/components/layout/app-page";
import { ApiKeyField } from "@/components/settings/api-key-field";
import { ProjectInfoForm } from "@/components/settings/project-info-form";
import { Button } from "@/components/ui/button";
import { getApiKeys, getProjectBySlug } from "@/lib/data";
import { relativeTime } from "@/lib/format";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const keys = await getApiKeys(project.id);

  return (
    <AppPage
      contentClassName="max-w-3xl"
      crumbs={[
        { href: `/dashboard/${project.slug}/bugs`, label: project.name },
        { label: "Settings" },
      ]}
    >
      <div className="space-y-10">
        <Section description="Basic details for this project." title="Project">
          <ProjectInfoForm initialName={project.name} />
        </Section>

        <Section
          description="Publishable keys used by the widget to send reports. These ship in your client bundle and are safe to expose; restrict them by origin rather than hiding them."
          title="API keys"
        >
          <div className="space-y-3">
            {keys.map((key) => (
              <div
                className="rounded-lg border border-border bg-card p-4"
                key={key.id}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-[13px] text-foreground">
                      {key.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-ink-tertiary">
                      {key.environment} ·{" "}
                      {key.last_used_at
                        ? `last used ${relativeTime(key.last_used_at)}`
                        : "never used"}
                    </p>
                  </div>
                </div>
                <ApiKeyField apiKey={key.key} />
              </div>
            ))}
          </div>
        </Section>

        <Section
          description="Irreversible actions that affect this project and every report in it."
          title="Danger zone"
        >
          <div className="flex flex-col gap-4 rounded-lg border border-destructive/30 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-[13px] text-foreground">
                Delete this project
              </p>
              <p className="mt-0.5 text-[12px] text-ink-tertiary">
                Permanently removes the project and all of its reports.
              </p>
            </div>
            <Button disabled size="sm" variant="destructive">
              Delete project
            </Button>
          </div>
        </Section>
      </div>
    </AppPage>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
      <div>
        <h2 className="font-medium text-[13px] text-foreground">{title}</h2>
        <p className="mt-1 text-[12px] text-ink-tertiary leading-relaxed">
          {description}
        </p>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
