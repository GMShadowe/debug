import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InstallGuide } from "@/components/install/install-guide";
import { InstallListener } from "@/components/install/install-listener";
import { CodeBlock } from "@/components/install/snippet";
import { InlineCode, Step } from "@/components/install/step";
import { AppPage } from "@/components/layout/app-page";
import { getApiKeys, getProjectBySlug } from "@/lib/data";

export const metadata: Metadata = { title: "Install" };

/** Props the reporter accepts, in the order a reader will need them. */
const PROPS = [
  {
    default: "—",
    desc: "Your publishable project key. Required.",
    name: "projectKey",
    type: "string",
  },
  {
    default: '"bottom-right"',
    desc: "Corner the floating button sits in.",
    name: "position",
    type: '"bottom-right" | "bottom-left"',
  },
  {
    default: '"system"',
    desc: "Force the dialog's colour scheme.",
    name: "theme",
    type: '"light" | "dark" | "system"',
  },
  {
    default: "true",
    desc: "Capture a screenshot when the dialog opens.",
    name: "screenshot",
    type: "boolean",
  },
  {
    default: "true",
    desc: "Attach the last 50 console entries.",
    name: "consoleLogs",
    type: "boolean",
  },
  {
    default: "—",
    desc: "Called after a report is delivered.",
    name: "onSubmit",
    type: "(report) => void",
  },
];

export default async function InstallPage({
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
  const apiKey = keys[0]?.key ?? project.api_key;
  const installed = Boolean(project.first_report_at);

  return (
    <AppPage
      contentClassName="max-w-3xl"
      crumbs={[
        { href: `/dashboard/${project.slug}/bugs`, label: project.name },
        { label: "Install" },
      ]}
    >
      <div className="space-y-10">
        <div>
          <h1 className="font-heading font-semibold text-foreground text-xl tracking-[-0.02em]">
            Install Lumen
          </h1>
          <p className="mt-1.5 text-[13px] text-ink-subtle leading-relaxed">
            Add the reporter to your app and bug reports land here
            automatically. Three steps, under a minute.
          </p>
        </div>

        <InstallGuide apiKey={apiKey} />

        <Step
          description="Open your app, click the floating button, and send a test report. This page notices on its own — there is nothing to confirm."
          n={3}
          title="Send your first report"
        >
          <InstallListener alreadyReceived={installed} projectId={project.id} />
        </Step>

        <section className="border-border border-t pt-8">
          <h2 className="font-medium text-[13px] text-foreground">
            What gets captured
          </h2>
          <p className="mt-1 text-[12px] text-ink-tertiary leading-relaxed">
            Alongside the reporter's own description, every report carries the
            browser, OS, viewport, device, page URL, timestamp, and the last 50
            console entries. Nothing else is collected.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-[13px] text-foreground">
            Configuration
          </h2>
          <p className="mt-1 mb-3 text-[12px] text-ink-tertiary">
            Every prop is optional except <InlineCode>projectKey</InlineCode>.
          </p>

          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-border border-b bg-card/40 text-[11px] text-ink-tertiary uppercase tracking-wider">
                  <th className="px-3 py-2 font-medium">Prop</th>
                  <th className="hidden px-3 py-2 font-medium sm:table-cell">
                    Default
                  </th>
                  <th className="px-3 py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {PROPS.map((prop) => (
                  <tr
                    className="border-border border-b last:border-0"
                    key={prop.name}
                  >
                    <td className="px-3 py-2.5 align-top">
                      <code className="font-mono text-[12px] text-foreground">
                        {prop.name}
                      </code>
                      <div className="mt-0.5 font-mono text-[10px] text-ink-tertiary">
                        {prop.type}
                      </div>
                    </td>
                    <td className="hidden px-3 py-2.5 align-top font-mono text-[11px] text-ink-subtle sm:table-cell">
                      {prop.default}
                    </td>
                    <td className="px-3 py-2.5 align-top text-[12px] text-ink-subtle">
                      {prop.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-medium text-[13px] text-foreground">
            Customising
          </h2>
          <p className="mt-1 mb-3 text-[12px] text-ink-tertiary leading-relaxed">
            The component is copied into your repo, so restyle it directly. Use{" "}
            <InlineCode>onSubmit</InlineCode> to hook a delivered report into
            your own analytics or toast.
          </p>
          <CodeBlock
            filename="app/layout.tsx"
            value={`<LumenReporter
  projectKey={process.env.NEXT_PUBLIC_LUMEN_KEY!}
  position="bottom-left"
  theme="dark"
  onSubmit={(report) => toast.success(\`Sent #\${report.id}\`)}
/>`}
          />
        </section>
      </div>
    </AppPage>
  );
}
