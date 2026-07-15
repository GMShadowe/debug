import {
  ArrowRight,
  Camera,
  ChartLineUp,
  Check,
  Code,
  DiscordLogo,
  Envelope,
  FigmaLogo,
  Gauge,
  GithubLogo,
  GitlabLogo,
  Lightning,
  NotionLogo,
  PlugsConnected,
  PuzzlePiece,
  ShieldCheck,
  X,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ComponentType, CSSProperties, ReactNode } from "react";

import { BrowserFrame } from "@/components/marketing/browser-frame";
import { CodeTyper } from "@/components/marketing/code-typer";
import { Faq } from "@/components/marketing/faq";
import { Magnetic } from "@/components/marketing/magnetic";
import { PageIntro } from "@/components/marketing/page-intro";
import { DashboardMock, WidgetMock } from "@/components/marketing/product-mock";
import { ReportTicker } from "@/components/marketing/report-ticker";
import { Reveal } from "@/components/marketing/reveal";
import { ScrollFX } from "@/components/marketing/scroll-fx";
import { ScrollProgress } from "@/components/marketing/scroll-progress";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { SmoothScroll } from "@/components/marketing/smooth-scroll";
import { Button } from "@/components/ui/button";

interface IconType {
  className?: string;
  weight?: "bold" | "fill" | "regular";
}

const FEATURES: {
  description: string;
  icon: ComponentType<IconType>;
  title: string;
}[] = [
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
      "Drop a single script tag into your site. The floating button appears instantly, with no build step.",
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

const OLD_WAY = [
  "“It’s broken” with no way to reproduce it",
  "Screenshots pasted into three different chat apps",
  "Endless back-and-forth to pin down the browser",
  "Bugs that slip through until a customer churns",
];

const NEW_WAY = [
  "A pixel-accurate screenshot on every report",
  "Browser, OS, and viewport captured automatically",
  "One triage board, sorted by severity and status",
  "Fixed before it ever reaches your churn rate",
];

const INTEGRATIONS: { icon: ComponentType<IconType>; name: string }[] = [
  { icon: GithubLogo, name: "GitHub" },
  { icon: GitlabLogo, name: "GitLab" },
  { icon: DiscordLogo, name: "Discord" },
  { icon: NotionLogo, name: "Notion" },
  { icon: FigmaLogo, name: "Figma" },
  { icon: PlugsConnected, name: "Webhooks" },
  { icon: Envelope, name: "Email" },
  { icon: Code, name: "REST API" },
];

const METRICS = [
  { label: "Script tag to install", value: "1" },
  { label: "Added to your bundle", value: "0 kb" },
  { label: "Context fields per report", value: "12+" },
  { label: "Median time to first report", value: "< 60s" },
];

const SNIPPET_TEXT = `<script
  src="https://cdn.lumen.dev/widget.js"
  data-project="lum_live_a1b2c3d4"
  defer
></script>`;

const SNIPPET_TOKENS = [
  { className: "text-ink-subtle", text: "<script" },
  { text: "\n  " },
  { className: "text-foreground", text: "src" },
  { className: "text-ink-subtle", text: "=" },
  { className: "text-ink-muted", text: '"https://cdn.lumen.dev/widget.js"' },
  { text: "\n  " },
  { className: "text-foreground", text: "data-project" },
  { className: "text-ink-subtle", text: "=" },
  { className: "text-primary-hover", text: '"lum_live_a1b2c3d4"' },
  { text: "\n  " },
  { className: "text-foreground", text: "defer" },
  { text: "\n" },
  { className: "text-ink-subtle", text: "></script>" },
];

const FAQS = [
  {
    answer:
      "Paste one script tag into your HTML. There’s no package to install, no build step, and no framework integration. It works with React, Vue, Svelte, Astro, or plain HTML.",
    question: "How do I add Lumen to my site?",
  },
  {
    answer:
      "The widget script is a few kilobytes, loads with defer, and never blocks your main thread. It adds nothing to your JavaScript bundle because it isn’t imported into it.",
    question: "Will it slow my site down?",
  },
  {
    answer:
      "Every report ships with an annotated screenshot plus browser, OS, viewport, device pixel ratio, page URL, referrer, and a console trail, so you can reproduce without a back-and-forth.",
    question: "What context gets captured?",
  },
  {
    answer:
      "Reports are scoped per project with row-level security, screenshots are stored privately, and you control retention. Nothing is shared across projects, ever.",
    question: "Is my data private?",
  },
  {
    answer:
      "Yes. Every report is available through a typed REST API and can fan out to webhooks, so you can push issues straight into Linear, GitHub, or Slack.",
    question: "Can I pipe reports into my own tools?",
  },
];

function Eyebrow({
  chapter,
  children,
}: {
  chapter?: string;
  children: string;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {chapter ? (
        <>
          <span className="font-mono text-[11px] text-ink-tertiary tabular-nums">
            {chapter}
          </span>
          <span aria-hidden="true" className="h-px w-6 bg-hairline-strong" />
        </>
      ) : null}
      <span className="font-medium text-[13px] text-foreground uppercase tracking-[0.12em]">
        {children}
      </span>
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
    <SmoothScroll>
      <div className="theme-landing bg-background text-foreground">
        <PageIntro />
        <ScrollProgress />
        <ScrollFX />
        <div className="flex min-h-dvh flex-col">
          <a
            className="sr-only rounded-md bg-card px-3 py-2 text-foreground text-sm ring-2 ring-ring focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
            href="#main-content"
          >
            Skip to content
          </a>
          <SiteHeader />

          <main className="flex-1" id="main-content">
            {/* Hero — massive editorial headline over a dark product island */}
            <section className="relative overflow-hidden" id="top">
              <div
                aria-hidden="true"
                className="grid-backdrop pointer-events-none absolute inset-x-0 top-0 h-[640px]"
              />

              <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 sm:pt-40">
                <div data-fade="">
                  <h1 className="text-balance text-display text-foreground tracking-[-0.03em]">
                    <span className="line-mask">
                      <span
                        className="line-rise"
                        style={{ animationDelay: "60ms" }}
                      >
                        Bug reports your
                      </span>
                    </span>
                    <span className="line-mask">
                      <span
                        className="line-rise"
                        style={{ animationDelay: "160ms" }}
                      >
                        users <em>actually</em> send
                        <span aria-hidden="true" className="text-[#5e6ad2]">
                          .
                        </span>
                      </span>
                    </span>
                  </h1>

                  <div className="mt-10 grid items-end gap-8 lg:grid-cols-2">
                    <p
                      className="rise-in max-w-lg text-pretty text-ink-muted text-lg leading-relaxed"
                      style={{ animationDelay: "320ms" }}
                    >
                      Lumen is a drop-in widget that turns vague,
                      screenshot-less bug reports into clean, contextual issues
                      inside your dashboard.
                    </p>
                    <div
                      className="rise-in flex flex-col gap-3 sm:flex-row lg:justify-end"
                      style={{ animationDelay: "420ms" }}
                    >
                      <Magnetic>
                        <Button
                          className="group/button h-11 gap-1.5 rounded-full px-5 text-sm"
                          nativeButton={false}
                          render={
                            <Link href="/auth">
                              Start for free
                              <ArrowRight
                                aria-hidden="true"
                                className="size-4 transition-transform group-hover/button:translate-x-0.5"
                              />
                            </Link>
                          }
                        />
                      </Magnetic>
                      <Magnetic>
                        <Button
                          className="h-11 gap-1.5 rounded-full px-5 text-sm"
                          nativeButton={false}
                          render={<a href="#why">See how it works</a>}
                          variant="outline"
                        />
                      </Magnetic>
                    </div>
                  </div>

                  <p
                    className="rise-in mt-6 font-mono text-ink-subtle text-xs"
                    style={{ animationDelay: "520ms" }}
                  >
                    No credit card · Live in under a minute
                  </p>
                </div>

                {/* The product — a dark island on the light canvas */}
                <div className="parallax mt-14" data-parallax="60">
                  <div className="rise-in" style={{ animationDelay: "300ms" }}>
                    <div className="panel-dark">
                      <BrowserFrame
                        className="shadow-[0_32px_64px_-24px_rgb(0_0_0/0.35)]"
                        url="app.lumen.dev/dashboard"
                      >
                        <DashboardMock />
                      </BrowserFrame>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Live wire — reports streaming in, the product switched on */}
            <section className="border-border border-y bg-card/50">
              <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-10 lg:grid-cols-[minmax(0,300px)_1fr]">
                <div>
                  <p className="font-mono text-[11px] text-ink-subtle uppercase tracking-[0.14em]">
                    Live report stream
                  </p>
                  <p className="mt-2 text-ink-subtle text-sm leading-relaxed">
                    What lands in your dashboard while you work. Screenshot,
                    environment, and severity attached to every row.
                  </p>
                </div>
                <ReportTicker />
              </div>
            </section>

            {/* Chapter 01 — the problem */}
            <Section id="why">
              <Reveal className="mx-auto max-w-3xl text-center">
                <Eyebrow chapter="01">Why Lumen</Eyebrow>
                <h2 className="mt-4 text-balance text-display-2 text-foreground tracking-[-0.03em]">
                  Stop reproducing. Start <em>fixing</em>.
                </h2>
                <p className="mt-4 text-ink-subtle leading-relaxed">
                  The gap between a bug happening and you understanding it is
                  where hours disappear.
                </p>
              </Reveal>

              <div className="mt-14 grid gap-5 md:grid-cols-2">
                <Reveal variant="left">
                  <div className="h-full rounded-xl border border-border bg-card p-7">
                    <span className="font-mono text-ink-subtle text-xs uppercase tracking-[0.12em]">
                      The old way
                    </span>
                    <ul className="mt-6 space-y-4">
                      {OLD_WAY.map((item) => (
                        <li
                          className="flex items-start gap-3 text-ink-muted text-sm leading-relaxed"
                          key={item}
                        >
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-destructive/12 text-destructive">
                            <X
                              aria-hidden="true"
                              className="size-3"
                              weight="bold"
                            />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={90} variant="right">
                  <div className="panel-highlight h-full rounded-xl border border-primary/30 bg-primary/[0.07] p-7">
                    <span className="font-mono text-primary-hover text-xs uppercase tracking-[0.12em]">
                      The Lumen way
                    </span>
                    <ul className="mt-6 space-y-4">
                      {NEW_WAY.map((item) => (
                        <li
                          className="flex items-start gap-3 text-foreground text-sm leading-relaxed"
                          key={item}
                        >
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/20 text-primary-hover">
                            <Check
                              aria-hidden="true"
                              className="size-3"
                              weight="bold"
                            />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </Section>

            {/* Chapter 02 — the path, dealt as a sticky deck */}
            <Section id="how-it-works">
              <Reveal className="max-w-2xl">
                <Eyebrow chapter="02">How it works</Eyebrow>
                <h2 className="mt-4 text-balance text-display-2 text-foreground tracking-[-0.03em]">
                  From report to resolved in three steps
                </h2>
              </Reveal>

              <div className="mt-14">
                {STEPS.map((step, index) => (
                  <div
                    className="stack-card"
                    key={step.number}
                    style={
                      { "--stack-offset": `${index * 28}px` } as CSSProperties
                    }
                  >
                    <div className="mb-8 grid min-h-[15rem] content-center gap-4 rounded-2xl border border-border bg-card p-8 shadow-[0_16px_48px_-28px_rgb(0_0_0/0.35)] sm:grid-cols-[minmax(0,180px)_1fr] sm:items-center sm:gap-10 sm:p-12">
                      <span
                        aria-hidden="true"
                        className="font-bold text-[clamp(3rem,6vw,5rem)] text-hairline-strong tabular-nums leading-none tracking-[-0.04em]"
                      >
                        {step.number}
                      </span>
                      <div>
                        <h3 className="font-semibold text-2xl text-foreground tracking-[-0.02em]">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-ink-subtle leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Chapter 03 — the tool */}
            <Section id="widget">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <Reveal variant="left">
                  <Eyebrow chapter="03">The widget</Eyebrow>
                  <h2 className="mt-4 text-balance text-display-2 text-foreground tracking-[-0.03em]">
                    Reporting that meets users where they are
                  </h2>
                  <p className="mt-4 max-w-md text-ink-muted leading-relaxed">
                    A single floating button, always within reach. Visitors
                    capture the screen, mark severity, and add a note. It lands
                    on your board with the full environment attached.
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
                        <span className="grid size-4 shrink-0 place-items-center rounded-full bg-foreground/10">
                          <span className="size-1.5 rounded-full bg-foreground" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <div className="parallax" data-parallax="60">
                  <Reveal delay={100} variant="right">
                    <div className="panel-dark">
                      <BrowserFrame
                        className="shadow-[0_32px_64px_-24px_rgb(0_0_0/0.35)]"
                        url="acme.com"
                      >
                        <WidgetMock />
                      </BrowserFrame>
                    </div>
                  </Reveal>
                </div>
              </div>
            </Section>

            {/* Context strip — everything captured with every report */}
            <section
              aria-label="Context captured with every report"
              className="border-border border-y bg-card/40 py-6"
            >
              <div
                className="group flex overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
                }}
              >
                {[0, 1].map((copy) => (
                  <div
                    aria-hidden={copy === 1 ? "true" : undefined}
                    className="strip-track flex shrink-0 items-center gap-3 pr-3"
                    key={copy}
                  >
                    {[
                      "Browser",
                      "OS",
                      "Viewport",
                      "Device pixel ratio",
                      "Page URL",
                      "Referrer",
                      "Console trail",
                      "Locale",
                      "Timezone",
                      "Connection",
                    ].map((field) => (
                      <span
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-[11px] text-ink-subtle"
                        key={field}
                      >
                        <span className="size-1 rounded-full bg-primary" />
                        {field}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            {/* Chapter 04 — the upside */}
            <Section id="features">
              <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
                <Reveal
                  className="lg:sticky lg:top-24 lg:self-start"
                  variant="left"
                >
                  <Eyebrow chapter="04">Features</Eyebrow>
                  <h2 className="mt-4 text-balance text-display-2 text-foreground tracking-[-0.03em]">
                    Signal, not <em>noise</em>
                  </h2>
                  <p className="mt-4 text-ink-subtle leading-relaxed">
                    Purpose-built for developers who want to fix bugs, not chase
                    down the details of how to reproduce them.
                  </p>
                </Reveal>

                <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
                  {FEATURES.map((feature, index) => (
                    <Reveal
                      as="div"
                      className="group bg-background p-6 transition-colors duration-200 hover:bg-card"
                      delay={(index % 2) * 80}
                      key={feature.title}
                    >
                      <div className="grid size-9 place-items-center rounded-lg border border-border bg-card text-foreground transition-colors duration-200 group-hover:border-hairline-strong">
                        <feature.icon
                          aria-hidden="true"
                          className="size-4"
                          weight="bold"
                        />
                      </div>
                      <h3 className="mt-4 font-semibold text-base text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-ink-subtle text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Section>

            {/* Chapter 05 — the setup. The snippet types itself as you scroll. */}
            <section
              className="relative h-[200vh]"
              data-code-scene=""
              id="developers"
            >
              <div className="sticky top-0 flex min-h-dvh items-center">
                <div className="mx-auto w-full max-w-6xl px-6">
                  <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="order-2 lg:order-1">
                      <CodeTyper
                        className="panel-dark shadow-[0_32px_64px_-24px_rgb(0_0_0/0.35)]"
                        code={SNIPPET_TEXT}
                        filename="index.html"
                        tokens={SNIPPET_TOKENS}
                      />
                    </div>

                    <Reveal className="order-1 lg:order-2" variant="right">
                      <Eyebrow chapter="05">Developer experience</Eyebrow>
                      <h2 className="mt-4 text-balance text-display-2 text-foreground tracking-[-0.03em]">
                        One tag. Zero dependencies.
                      </h2>
                      <p className="mt-4 max-w-md text-ink-muted leading-relaxed">
                        No SDK to bundle, no framework to fight. Paste the
                        snippet, ship it, and reports start flowing. Everything
                        else is typed and queryable through a clean API.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {[
                          "REST API",
                          "Webhooks",
                          "TypeScript types",
                          "RLS",
                        ].map((tag) => (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full border border-hairline-strong bg-card px-2.5 py-1 font-mono text-[11px] text-ink-subtle"
                            key={tag}
                          >
                            <Code
                              aria-hidden="true"
                              className="size-3 text-foreground"
                              weight="bold"
                            />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>

            {/* Chapter 06 — the reach */}
            <Section id="integrations">
              <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
                <Reveal
                  className="lg:sticky lg:top-24 lg:self-start"
                  variant="left"
                >
                  <Eyebrow chapter="06">Integrations</Eyebrow>
                  <h2 className="mt-4 text-balance text-display-2 text-foreground tracking-[-0.03em]">
                    Plays nicely with your stack
                  </h2>
                  <p className="mt-4 text-ink-subtle leading-relaxed">
                    Route reports wherever your team already works. No glue code
                    required.
                  </p>
                </Reveal>

                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
                  {INTEGRATIONS.map((integration, index) => {
                    return (
                      <Reveal
                        key={integration.name}
                        as="div"
                        className="group flex flex-col items-center gap-3 bg-background px-4 py-8 transition-colors duration-200 hover:bg-card"
                        delay={(index % 4) * 60}
                        variant="scale"
                      >
                        <integration.icon
                          aria-hidden="true"
                          className="size-7 text-ink-subtle transition-colors duration-200 group-hover:text-foreground"
                        />
                        <span className="text-foreground text-sm">
                          {integration.name}
                        </span>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </Section>

            {/* The numbers — a full-bleed dark band */}
            <section className="panel-dark border-border border-y bg-background">
              <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden bg-border md:grid-cols-4">
                {METRICS.map((metric, index) => (
                  <Reveal
                    className="bg-background px-6 py-12 text-center"
                    delay={index * 70}
                    key={metric.label}
                    variant="scale"
                  >
                    <p className="font-bold text-5xl text-foreground tabular-nums tracking-[-0.03em]">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-ink-subtle text-xs leading-relaxed">
                      {metric.label}
                    </p>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <Section id="faq">
              <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
                <Reveal
                  className="lg:sticky lg:top-24 lg:self-start"
                  variant="left"
                >
                  <Eyebrow>FAQ</Eyebrow>
                  <h2 className="mt-4 text-balance text-display-2 text-foreground tracking-[-0.03em]">
                    Everything you need to know
                  </h2>
                  <p className="mt-4 text-ink-subtle leading-relaxed">
                    If your question isn’t covered here, reach out and we’ll
                    answer quickly.
                  </p>
                </Reveal>

                <Reveal variant="right">
                  <Faq items={FAQS} />
                </Reveal>
              </div>
            </Section>

            {/* The close — a dark island finale */}
            <section className="mx-auto max-w-6xl px-6 pb-28" id="arrive">
              <Reveal
                className="panel-dark panel-highlight relative overflow-hidden rounded-2xl border border-border bg-background px-8 py-20 text-center shadow-[0_48px_96px_-32px_rgb(0_0_0/0.45)] sm:px-16"
                variant="scale"
              >
                <div
                  aria-hidden="true"
                  className="hero-glow parallax pointer-events-none absolute inset-x-0 top-0 h-72"
                  data-parallax="90"
                />
                <div className="relative">
                  <h2 className="mx-auto max-w-2xl text-balance text-display-2 text-foreground tracking-[-0.03em]">
                    Put Lumen on your site <em>today</em>.
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-ink-muted leading-relaxed">
                    Create a project, paste one script tag, and the first report
                    can arrive within the minute. Free while in early access.
                  </p>
                  <div className="mt-8 flex justify-center">
                    <Button
                      className="group/button h-11 gap-1.5 rounded-lg px-5 text-sm"
                      nativeButton={false}
                      render={
                        <Link href="/auth">
                          Get started free
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 transition-transform group-hover/button:translate-x-0.5"
                          />
                        </Link>
                      }
                    />
                  </div>
                  <p className="mt-5 font-mono text-ink-subtle text-xs">
                    No credit card required
                  </p>
                </div>
              </Reveal>
            </section>
          </main>

          <SiteFooter />
        </div>
      </div>
    </SmoothScroll>
  );
}
