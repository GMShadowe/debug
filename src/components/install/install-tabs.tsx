"use client";

import { CodeBlock, CommandLine } from "@/components/install/snippet";
import { InlineCode } from "@/components/install/step";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Two ways to install, one at a time.
 *
 * Stacking both would make every reader skim past the half that doesn't apply
 * to them. Tabs put the choice up front and then hide the road not taken.
 *
 * `displayKey` is the masked form; `apiKey` is what Copy puts on the clipboard.
 */
export function InstallTabs({
  apiKey,
  displayKey,
}: {
  apiKey: string;
  displayKey: string;
}) {
  const scriptTag = (key: string) => `<script
  src="https://cdn.lumen.dev/widget.js"
  data-project="${key}"
  defer
></script>`;

  return (
    <Tabs defaultValue="react">
      <TabsList>
        <TabsTrigger value="react">React</TabsTrigger>
        <TabsTrigger value="script">Script tag</TabsTrigger>
      </TabsList>

      <TabsContent className="mt-4 space-y-4" value="react">
        <div>
          <p className="mb-2 text-[12px] text-ink-tertiary">
            Adds the component to your project, source and all. It is yours to
            edit — there is no package to upgrade.
          </p>
          <CommandLine value="npx shadcn@latest add https://lumen.dev/r/lumen-reporter.json" />
        </div>

        <div>
          <p className="mb-2 text-[12px] text-ink-tertiary">
            Mount it once, near the end of your root layout.
          </p>
          <CodeBlock
            filename="app/layout.tsx"
            value={`import { LumenReporter } from "@/components/lumen-reporter";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <LumenReporter projectKey={process.env.NEXT_PUBLIC_LUMEN_KEY!} />
      </body>
    </html>
  );
}`}
          />
        </div>
      </TabsContent>

      <TabsContent className="mt-4 space-y-4" value="script">
        <div>
          <p className="mb-2 text-[12px] text-ink-tertiary">
            Works on any stack — Rails, Django, plain HTML. Drop it before the
            closing <InlineCode>{"</body>"}</InlineCode> tag.
          </p>
          <CodeBlock
            display={scriptTag(displayKey)}
            filename="index.html"
            value={scriptTag(apiKey)}
          />
        </div>
        <p className="text-[12px] text-ink-tertiary">
          The script registers a global <InlineCode>window.lumen</InlineCode>{" "}
          once loaded, so you can open the reporter yourself with{" "}
          <InlineCode>window.lumen.open()</InlineCode>.
        </p>
      </TabsContent>
    </Tabs>
  );
}
