import {
  ArrowRight,
  Camera,
  ChartLineUp,
  Check,
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
  return <span className="chip">{children}</span>;
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
      className={`mx-auto max-w-6xl px-6 py-24 sm:py-32 ${className ?? ""}`}
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
        {/* Hero — centred, display-scale type, product shot below the fold line */}
        <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center sm:pt-28">
          <div className="rise-in flex flex-col items-center">
            <span className="chip">
              <span className="size-1.5 rounded-full bg-success" />
              Now in early access
            </span>
            <h1 className="mt-8 max-w-4xl text-balance font-heading font-semibold text-[length:var(--text-display)] text-foreground leading-[0.94] tracking-[-0.045em]">
              Bug reports your users actually send.
            </h1>
            <p className="mt-7 max-w-xl text-balance text-ink-muted text-lg leading-relaxed sm:text-xl">
              Lumen is a drop-in widget that turns vague, screenshot-less bug
              reports into clean, contextual issues — right inside your
              dashboard.
            </p>
            <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Button
                nativeButton={false}
                render={
                  <Link href="/auth">
                    Start for free
                    <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
                  </Link>
                }
                size="lg"
              />
              <Button
                nativeButton={false}
                render={<a href="#how-it-works">See how it works</a>}
                size="lg"
                variant="outline"
              />
            </div>
            <p className="mt-8 text-ink-tertiary text-sm">
              No credit card · Live in under a minute
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rise-in [animation-delay:120ms]">
            <BrowserFrame url="app.lumen.dev/dashboard">
              <DashboardMock />
            </BrowserFrame>
          </div>
        </section>

        {/* How it works */}
        <Section id="how-it-works">
          <div className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-6 text-balance font-heading font-semibold text-[length:var(--text-display-sm)] text-foreground leading-[1] tracking-[-0.04em]">
              From report to resolved in three steps
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
            {STEPS.map((step) => (
              <div
                className="card-interactive rounded-lg border border-border bg-card p-8"
                key={step.number}
              >
                <span className="grid size-9 place-items-center rounded-md bg-primary font-semibold text-primary-foreground text-sm tabular-nums">
                  {step.number}
                </span>
                <h3 className="mt-6 font-heading font-semibold text-foreground text-xl tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-ink-subtle leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Features — editorial split layout */}
        <Section id="features">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>Features</Eyebrow>
              <h2 className="mt-6 text-balance font-heading font-semibold text-[length:var(--text-display-sm)] text-foreground leading-[1] tracking-[-0.04em]">
                Signal, not noise
              </h2>
              <p className="mt-5 text-ink-subtle text-lg leading-relaxed">
                Purpose-built for developers who want to fix bugs, not chase
                down the details of how to reproduce them.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <div
                  className="card-interactive group rounded-lg border border-border bg-card p-7"
                  key={feature.title}
                >
                  <div className="grid size-10 place-items-center rounded-md bg-primary text-primary-foreground">
                    <feature.icon className="size-5" weight="bold" />
                  </div>
                  <h3 className="mt-6 font-heading font-semibold text-foreground text-lg tracking-[-0.02em]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-ink-subtle text-sm leading-relaxed">
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
              <h2 className="mt-6 text-balance font-heading font-semibold text-[length:var(--text-display-sm)] text-foreground leading-[1] tracking-[-0.04em]">
                Reporting that meets users where they are
              </h2>
              <p className="mt-5 max-w-md text-ink-muted text-lg leading-relaxed">
                A single floating button, always within reach. Visitors capture
                the screen, mark severity, and add a note — then it's on your
                board with the full environment attached.
              </p>
              <ul className="mt-9 space-y-4">
                {[
                  "Annotated screenshot capture",
                  "Automatic environment metadata",
                  "Themeable to match your product",
                ].map((item) => (
                  <li className="flex items-center gap-3.5" key={item}>
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3.5" weight="bold" />
                    </span>
                    <span className="text-foreground">{item}</span>
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
              <h2 className="mt-6 text-balance font-heading font-semibold text-[length:var(--text-display-sm)] text-foreground leading-[1] tracking-[-0.04em]">
                One tag. Zero dependencies.
              </h2>
              <p className="mt-5 max-w-md text-ink-muted text-lg leading-relaxed">
                No SDK to bundle, no framework to fight. Paste the snippet, ship
                it, and reports start flowing. Everything else is typed and
                queryable through a clean API.
              </p>
              <p className="mt-7 font-mono text-ink-tertiary text-xs leading-relaxed">
                {"// works with any stack — React, Vue, Svelte, or plain HTML"}
              </p>
            </div>
          </div>
        </Section>

        {/* CTA — inverted slab: the page's one white surface */}
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <div className="relative overflow-hidden rounded-lg bg-primary px-8 py-20 text-center sm:px-16 sm:py-24">
            <h2 className="mx-auto max-w-2xl text-balance font-heading font-semibold text-[length:var(--text-display-sm)] text-primary-foreground leading-[0.98] tracking-[-0.04em]">
              Ship with confidence.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-primary-foreground/70 leading-relaxed">
              Create your project and start collecting contextual bug reports in
              minutes.
            </p>
            <div className="mt-10 flex justify-center">
              <Button
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/85 focus-visible:ring-primary-foreground focus-visible:ring-offset-primary active:bg-primary-foreground/75"
                nativeButton={false}
                render={
                  <Link href="/auth">
                    Get started free
                    <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
                  </Link>
                }
                size="lg"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
