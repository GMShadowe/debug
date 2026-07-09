import {
  ArrowRight,
  Camera,
  ChartLineUp,
  Gauge,
  Lightning,
  PuzzlePiece,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ReactNode } from "react";

import { BrowserFrame } from "@/components/marketing/browser-frame";
import { CodeBlock } from "@/components/marketing/code-block";
import { DashboardMock, WidgetMock } from "@/components/marketing/product-mock";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    description:
      "Every report arrives with an annotated screenshot, so you see exactly what the visitor saw.",
    icon: Camera,
    title: "Screenshots on capture",
  },
  {
    description:
      "Browser, OS, viewport, and page URL are attached automatically to every submission.",
    icon: Gauge,
    title: "Rich context, zero effort",
  },
  {
    description:
      "One script tag and the reporting widget is live. No framework lock-in, no heavy SDK.",
    icon: Lightning,
    title: "Drop-in widget",
  },
  {
    description:
      "Sort by severity and status, and watch trends across your project at a glance.",
    icon: ChartLineUp,
    title: "Triage dashboard",
  },
  {
    description:
      "Row-level security keeps every report scoped to the project that owns it.",
    icon: ShieldCheck,
    title: "Private by default",
  },
  {
    description:
      "A clean schema and typed API, ready for webhooks, integrations, and automations.",
    icon: PuzzlePiece,
    title: "Built to extend",
  },
];

const STEPS = [
  {
    description:
      "Drop a single script tag into your site. The floating button appears instantly — no build step.",
    number: "01",
    title: "Install the widget",
  },
  {
    description:
      "Anyone can grab a screenshot and describe the issue in a few seconds, right where it happened.",
    number: "02",
    title: "Visitors report bugs",
  },
  {
    description:
      "Reports land in Lumen with full context, ready to sort, assign, and resolve.",
    number: "03",
    title: "Triage in your dashboard",
  },
];

function Eyebrow({ children }: { children: string }) {
  return (
    <span className="font-medium text-[13px] text-primary uppercase tracking-[0.12em]">
      {children}
    </span>
  );
}

function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`mx-auto max-w-6xl px-6 py-20 sm:py-28 ${className ?? ""}`}
      id={id}
    >
      {children}
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div className="rise-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-ink-subtle text-xs">
                <span className="size-1.5 rounded-full bg-success" />
                Now in early access
              </div>
              <h1 className="mt-6 text-balance font-heading font-semibold text-[2.75rem] text-foreground leading-[1.02] tracking-[-0.03em] sm:text-6xl">
                Bug reports your users actually send.
              </h1>
              <p className="mt-6 max-w-lg text-balance text-ink-muted text-lg leading-relaxed">
                Lumen is a drop-in widget that turns vague, screenshot-less bug
                reports into clean, contextual issues — right inside your
                dashboard.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="h-10 gap-1.5 rounded-md px-4 text-sm"
                  nativeButton={false}
                  render={
                    <Link href="/auth">
                      Start for free
                      <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
                    </Link>
                  }
                />
                <Button
                  className="h-10 gap-1.5 rounded-md px-4 text-sm"
                  render={<a href="#how-it-works">See how it works</a>}
                  variant="outline"
                />
              </div>
              <p className="mt-8 font-mono text-ink-subtle text-xs">
                No credit card · Live in under a minute
              </p>
            </div>

            <div className="rise-in [animation-delay:120ms]">
              <BrowserFrame url="app.lumen.dev/dashboard">
                <DashboardMock />
              </BrowserFrame>
            </div>
          </div>
        </section>

        {/* How it works */}
        <Section id="how-it-works">
          <div className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 font-heading font-semibold text-3xl text-foreground tracking-[-0.02em] sm:text-4xl">
              From report to resolved in three steps
            </h2>
          </div>

          <div className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            <div className="absolute top-3 right-0 left-0 hidden h-px bg-border md:block" />
            {STEPS.map((step) => (
              <div className="relative" key={step.number}>
                <div className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full border border-hairline-strong bg-card font-mono text-[11px] text-primary">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-5 font-heading font-medium text-foreground text-lg tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-2 text-ink-subtle text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Features — editorial split layout */}
        <Section id="features">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>Features</Eyebrow>
              <h2 className="mt-4 font-heading font-semibold text-3xl text-foreground tracking-[-0.02em] sm:text-4xl">
                Signal, not noise
              </h2>
              <p className="mt-4 text-ink-subtle leading-relaxed">
                Purpose-built for developers who want to fix bugs, not chase
                down the details of how to reproduce them.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <div
                  className="group bg-background p-6 transition-colors duration-200 hover:bg-card"
                  key={feature.title}
                >
                  <div className="grid size-9 place-items-center rounded-lg border border-border bg-card text-primary transition-colors duration-200 group-hover:border-hairline-strong">
                    <feature.icon className="size-4" weight="bold" />
                  </div>
                  <h3 className="mt-4 font-medium text-base text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-ink-subtle text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Widget preview */}
        <Section id="widget">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>The widget</Eyebrow>
              <h2 className="mt-4 font-heading font-semibold text-3xl text-foreground tracking-[-0.02em] sm:text-4xl">
                Reporting that meets users where they are
              </h2>
              <p className="mt-4 max-w-md text-ink-muted leading-relaxed">
                A single floating button, always within reach. Visitors capture
                the screen, mark severity, and add a note — then it's on your
                board with the full environment attached.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Annotated screenshot capture",
                  "Automatic environment metadata",
                  "Themeable to match your product",
                ].map((item) => (
                  <li
                    className="flex items-center gap-3 text-foreground text-sm"
                    key={item}
                  >
                    <span className="grid size-4 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                      <span className="size-1.5 rounded-full bg-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <BrowserFrame url="acme.com">
              <WidgetMock />
            </BrowserFrame>
          </div>
        </Section>

        {/* Developer experience */}
        <Section id="developers">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <CodeBlock
                code={`<script
  src="https://cdn.lumen.dev/widget.js"
  data-project="lum_live_a1b2c3d4"
  defer
></script>`}
                filename="index.html"
              >
                <span className="text-ink-subtle">{"<script"}</span>
                {"\n  "}
                <span className="text-foreground">src</span>
                <span className="text-ink-subtle">=</span>
                <span className="text-ink-muted">
                  {'"https://cdn.lumen.dev/widget.js"'}
                </span>
                {"\n  "}
                <span className="text-foreground">data-project</span>
                <span className="text-ink-subtle">=</span>
                <span className="text-primary">{'"lum_live_a1b2c3d4"'}</span>
                {"\n  "}
                <span className="text-foreground">defer</span>
                {"\n"}
                <span className="text-ink-subtle">{"></script>"}</span>
              </CodeBlock>
            </div>

            <div className="order-1 lg:order-2">
              <Eyebrow>Developer experience</Eyebrow>
              <h2 className="mt-4 font-heading font-semibold text-3xl text-foreground tracking-[-0.02em] sm:text-4xl">
                One tag. Zero dependencies.
              </h2>
              <p className="mt-4 max-w-md text-ink-muted leading-relaxed">
                No SDK to bundle, no framework to fight. Paste the snippet, ship
                it, and reports start flowing. Everything else is typed and
                queryable through a clean API.
              </p>
              <p className="mt-6 font-mono text-ink-subtle text-xs leading-relaxed">
                {"// works with any stack — React, Vue, Svelte, or plain HTML"}
              </p>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <div className="panel-highlight relative overflow-hidden rounded-2xl border border-border bg-card px-8 py-16 text-center sm:px-16">
            <h2 className="mx-auto max-w-xl font-heading font-semibold text-3xl text-foreground tracking-[-0.02em] sm:text-4xl">
              Ship with confidence.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-ink-muted leading-relaxed">
              Create your project and start collecting contextual bug reports in
              minutes.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                className="h-10 gap-1.5 rounded-md px-4 text-sm"
                nativeButton={false}
                render={
                  <Link href="/auth">
                    Get started free
                    <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
                  </Link>
                }
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
