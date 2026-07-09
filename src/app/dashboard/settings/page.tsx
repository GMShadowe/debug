import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { PageContainer } from "@/components/layout/page-container";
import { PageSection } from "@/components/layout/page-section";
import {
  type Preference,
  PreferencesForm,
} from "@/components/settings/preferences-form";
import { ProjectInfoForm } from "@/components/settings/project-info-form";
import {
  SettingsCard,
  SettingsCardBody,
} from "@/components/settings/settings-card";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUserProject } from "@/lib/data";

export const metadata: Metadata = {
  title: "Settings",
};

const WIDGET_PREFERENCES: Preference[] = [
  {
    defaultChecked: true,
    description: "Show the floating report button on your site.",
    id: "enabled",
    label: "Enable widget",
  },
  {
    defaultChecked: true,
    description: "Automatically attach a screenshot to each report.",
    id: "screenshots",
    label: "Capture screenshots",
  },
  {
    description: "Ask reporters for an email so you can follow up.",
    id: "reporter-email",
    label: "Collect reporter email",
  },
];

const NOTIFICATION_PREFERENCES: Preference[] = [
  {
    defaultChecked: true,
    description: "Get an email for every new bug report.",
    id: "new-report",
    label: "New report emails",
  },
  {
    defaultChecked: true,
    description: "Only notify me about critical severity reports.",
    id: "critical",
    label: "Critical alerts",
  },
  {
    description: "A digest of activity delivered every Monday.",
    id: "weekly",
    label: "Weekly summary",
  },
];

export default async function SettingsPage() {
  const project = await getUserProject();
  if (!project) {
    redirect("/onboarding");
  }

  return (
    <PageContainer size="default">
      <div className="space-y-8">
        <PageHeader
          description="Manage your project, widget behavior, and notifications."
          title="Settings"
        />

        <Separator />

        <PageSection
          description="Basic details and credentials for your project."
          id="project"
          orientation="horizontal"
          title="Project information"
        >
          <ProjectInfoForm
            apiKey={project.api_key}
            initialName={project.name}
          />
        </PageSection>

        <Separator />

        <PageSection
          description="Control how the reporting widget behaves on your site."
          id="widget"
          orientation="horizontal"
          title="Widget"
        >
          <PreferencesForm preferences={WIDGET_PREFERENCES} />
        </PageSection>

        <Separator />

        <PageSection
          description="Choose when and how Lumen notifies you."
          id="notifications"
          orientation="horizontal"
          title="Notifications"
        >
          <PreferencesForm preferences={NOTIFICATION_PREFERENCES} />
        </PageSection>

        <Separator />

        <PageSection
          description="Irreversible actions that affect your entire project."
          orientation="horizontal"
          title="Danger zone"
        >
          <SettingsCard className="border-destructive/30">
            <SettingsCardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">
                  Delete this project
                </p>
                <p className="mt-0.5 text-ink-subtle text-sm">
                  Permanently remove this project and all of its reports. This
                  cannot be undone.
                </p>
              </div>
              <Button
                className="h-9 shrink-0 rounded-md"
                disabled
                variant="destructive"
              >
                Delete project
              </Button>
            </SettingsCardBody>
          </SettingsCard>
        </PageSection>
      </div>
    </PageContainer>
  );
}
