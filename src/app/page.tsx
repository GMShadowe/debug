import {
  ArrowRight,
  Bug,
  Camera,
  ChartLineUp,
  Code,
  Gauge,
  Lightning,
  PuzzlePiece,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    description:
      "Every report arrives with an annotated screenshot so you see exactly what the visitor saw.",
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
      "A clean schema and typed API ready for webhooks, integrations, and automations.",
    icon: PuzzlePiece,
    title: "Built to extend",
  },
];

const STEPS = [
  {
    description:
      "Add a single script tag to your site. The floating button appears instantly.",
    number: "01",
    title: "Install the widget",
  },
  {
    description:
      "Anyone can capture a screenshot and describe the issue in a few seconds.",
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
    <span className="font-medium text-[13px] text-primary uppercase tracking-[0.08em]">
      {children}
    </span>
  );
}

const PREVIEW_STATS = [
  { label: "Total reports", value: "248" },
  { label: "Open bugs", value: "37" },
  { label: "Critical", value: "5" },
  { label: "Fixed", value: "196" },
];

const PREVIEW_ROWS = [
  { title: "Checkout button unresponsive on Safari", tone: "critical" },
  { title: "Sidebar overlaps content at 1280px", tone: "medium" },
  { title: "Uploads over 5MB silently fail", tone: "high" },
];

function DashboardPreview() {
  return (
    <div className="rounded-2xl border border-border bg-card p-2 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]">
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="flex items-center gap-1.5 border-border border-b px-4 py-3">
          <span className="size-2.5 rounded-full bg-hairline-strong" />
          <span className="size-2.5 rounded-full bg-hairline-strong" />
          <span className="size-2.5 rounded-full bg-hairline-strong" />
          <span className="ml-3 text-ink-subtle text-xs">
            app.lumen.dev/dashboard
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4">
          {PREVIEW_STATS.map((stat) => (
            <div
              className="rounded-lg border border-border bg-card p-4 text-left"
              key={stat.label}
            >
              <p className="text-[11px] text-ink-subtle">{stat.label}</p>
              <p className="mt-2 font-semibold text-foreground text-lg tabular-nums">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
        <div className="space-y-2.5 px-5 pb-6">
          {PREVIEW_ROWS.map((row) => (
            <div
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
              key={row.title}
            >
              <Bug className="size-4 text-ink-subtle" />
              <span className="flex-1 truncate text-left text-foreground text-sm">
                {row.title}
              </span>
              <span className="hidden text-[11px] text-ink-subtle sm:inline">
                {row.tone}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 text-center sm:pt-28">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-ink-subtle text-xs">
            <span className="size-1.5 rounded-full bg-success" />
            Now in early access
          </div>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance font-heading font-semibold text-4xl text-foreground leading-[1.05] tracking-tight sm:text-6xl">
            Bug reports your users actually send.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-ink-muted text-lg leading-relaxed">
            Lumen is a drop-in widget that turns messy bug reports into clean,
            contextual issues — right inside your dashboard.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              className="h-10 w-full gap-1.5 rounded-md px-4 text-sm sm:w-auto"
              render={
                <Link href="/auth">
                  Start for free
                  <ArrowRight className="size-4" />
                </Link>
              }
            />
            <Button
              className="h-10 w-full gap-1.5 rounded-md px-4 text-sm sm:w-auto"
              render={
                <a href="#how-it-works">
                  <Code className="size-4" />
                  See how it works
                </a>
              }
              variant="outline"
            />
          </div>

          <div className="mt-16">
            <DashboardPreview />
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-6 py-20" id="features">
          <div className="max-w-2xl">
            <Eyebrow>Features</Eyebrow>
            <h2 className="mt-3 font-heading font-semibold text-3xl text-foreground tracking-tight">
              Everything you need to squash bugs
            </h2>
            <p className="mt-3 text-ink-subtle">
              Purpose-built for developers who want signal, not noise.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-hairline-strong"
                key={feature.title}
              >
                <div className="grid size-9 place-items-center rounded-lg border border-border bg-muted text-primary">
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
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-6 py-20" id="how-it-works">
          <div className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-3 font-heading font-semibold text-3xl text-foreground tracking-tight">
              Live in three steps
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {STEPS.map((step) => (
              <div
                className="rounded-xl border border-border bg-card p-6"
                key={step.number}
              >
                <span className="font-heading font-semibold text-2xl text-primary tabular-nums">
                  {step.number}
                </span>
                <h3 className="mt-4 font-medium text-base text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-ink-subtle text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 pt-4 pb-24">
          <div className="rounded-2xl border border-border bg-card px-8 py-14 text-center">
            <h2 className="mx-auto max-w-xl font-heading font-semibold text-3xl text-foreground tracking-tight">
              Ship with confidence.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-subtle">
              Create your project and start collecting bug reports in minutes.
            </p>
            <div className="mt-7 flex justify-center">
              <Button
                className="h-10 gap-1.5 rounded-md px-4 text-sm"
                render={
                  <Link href="/auth">
                    Get started free
                    <ArrowRight className="size-4" />
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
