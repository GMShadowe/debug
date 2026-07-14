import {
  ArrowRight,
  Camera,
  CaretDown,
  ChartLineUp,
  Check,
  Code,
  DiscordLogo,
  Envelope,
  FigmaLogo,
  Flag,
  Gauge,
  GithubLogo,
  GitlabLogo,
  Lightning,
  NotionLogo,
  PlugsConnected,
  PuzzlePiece,
  Quotes,
  ShieldCheck,
  X,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

import { BrowserFrame } from "@/components/marketing/browser-frame";
import { CodeBlock } from "@/components/marketing/code-block";
import { Faq } from "@/components/marketing/faq";
import { LogoMarquee } from "@/components/marketing/logo-marquee";
import { PageIntro } from "@/components/marketing/page-intro";
import { PointerGlow } from "@/components/marketing/pointer-glow";
import { DashboardMock, WidgetMock } from "@/components/marketing/product-mock";
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
  { label: "Median time to first report", value: "< 60s" },
  { label: "Added to your bundle", value: "0 kb" },
  { label: "Context fields per report", value: "12+" },
  { label: "Reports captured", value: "1.2M+" },
];

const FAQS = [
  {
    answer:
      "Paste one script tag into your HTML. There’s no package to install, no build step, and no framework integration — it works with React, Vue, Svelte, Astro, or plain HTML.",
    question: "How do I add Lumen to my site?",
  },
  {
    answer:
      "The widget script is a few kilobytes, loads with defer, and never blocks your main thread. It adds nothing to your JavaScript bundle because it isn’t imported into it.",
    question: "Will it slow my site down?",
  },
  {
    answer:
      "Every report ships with an annotated screenshot plus browser, OS, viewport, device pixel ratio, page URL, referrer, and a console trail — so you can reproduce without a back-and-forth.",
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
      <span className="font-medium text-[13px] text-primary uppercase tracking-[0.12em]">
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
          {/* Hero — the invitation */}
          <section className="relative overflow-hidden" id="top">
            {/* Animated aurora + grid backdrop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[620px] overflow-hidden"
            >
              <div className="hero-glow absolute inset-x-0 top-0 h-full" />
              <div
                className="aurora-blob parallax absolute top-[-120px] left-[8%] size-[420px] bg-primary/25"
                data-parallax="-220"
              />
              <div
                className="aurora-blob parallax absolute top-[-60px] right-[6%] size-[360px] bg-[#828fff]/20"
                data-parallax="-140"
              />
              <div className="grid-backdrop absolute inset-0" />
            </div>
            <PointerGlow />

            <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-16 sm:pt-24">
              <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
                <div>
                  <div
                    className="rise-in inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-ink-subtle text-xs backdrop-blur"
                    style={{ animationDelay: "1250ms" }}
                  >
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                    </span>
                    Now in early access
                  </div>
                  <h1 className="mt-6 font-heading font-semibold text-[2.75rem] text-foreground leading-[1.02] tracking-[-0.03em] sm:text-6xl">
                    <span className="line-mask">
                      <span
                        className="line-rise"
                        style={{ animationDelay: "1300ms" }}
                      >
                        Bug reports your
                      </span>
                    </span>
                    <span className="line-mask">
                      <span
                        className="line-rise text-primary"
                        style={{ animationDelay: "1400ms" }}
                      >
                        users actually send.
                      </span>
                    </span>
                  </h1>
                  <p
                    className="rise-in mt-6 max-w-lg text-balance text-ink-muted text-lg leading-relaxed"
                    style={{ animationDelay: "1550ms" }}
                  >
                    Lumen is a drop-in widget that turns vague, screenshot-less
                    bug reports into clean, contextual issues — right inside
                    your dashboard.
                  </p>
                  <div
                    className="rise-in mt-8 flex flex-col gap-3 sm:flex-row"
                    style={{ animationDelay: "1650ms" }}
                  >
                    <Button
                      className="group/button h-10 gap-1.5 rounded-md px-4 text-sm"
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
                    <Button
                      className="h-10 gap-1.5 rounded-md px-4 text-sm"
                      render={<a href="#why">See how it works</a>}
                      variant="outline"
                    />
                  </div>
                  <p
                    className="rise-in mt-8 font-mono text-ink-subtle text-xs"
                    style={{ animationDelay: "1750ms" }}
                  >
                    No credit card · Live in under a minute
                  </p>
                </div>

                <div className="parallax" data-parallax="70">
                  <div className="rise-in" style={{ animationDelay: "1500ms" }}>
                    <BrowserFrame url="app.lumen.dev/dashboard">
                      <DashboardMock />
                    </BrowserFrame>
                  </div>
                </div>
              </div>

              {/* Scroll cue — begin the journey */}
              <div
                className="rise-in mt-14 flex justify-center"
                style={{ animationDelay: "2000ms" }}
              >
                <a
                  className="group flex flex-col items-center gap-2 rounded-md text-ink-subtle outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
                  href="#why"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
                    Begin the tour
                  </span>
                  <CaretDown
                    aria-hidden="true"
                    className="cue-nudge size-4"
                    weight="bold"
                  />
                </a>
              </div>
            </div>
          </section>

          {/* Social proof */}
          <section className="border-border/60 border-y bg-card/30">
            <div className="mx-auto max-w-6xl px-6 py-10">
              <p className="mb-8 text-center font-mono text-[11px] text-ink-subtle uppercase tracking-[0.14em]">
                Trusted by teams who ship fast
              </p>
              <LogoMarquee />
            </div>
          </section>

          {/* Chapter 01 — the problem */}
          <Section id="why">
            <Reveal className="mx-auto max-w-2xl text-center">
              <Eyebrow chapter="01">Why Lumen</Eyebrow>
              <h2 className="mt-4 font-heading font-semibold text-3xl text-foreground tracking-[-0.02em] sm:text-4xl">
                Stop reproducing. Start fixing.
              </h2>
              <p className="mt-4 text-ink-subtle leading-relaxed">
                The gap between a bug happening and you understanding it is
                where hours disappear. Follow the path — here’s how Lumen closes
                it.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              <Reveal variant="left">
                <div className="h-full rounded-xl border border-border bg-card/40 p-7">
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
                <div className="panel-highlight h-full rounded-xl border border-primary/30 bg-primary/[0.06] p-7">
                  <span className="font-mono text-primary text-xs uppercase tracking-[0.12em]">
                    The Lumen way
                  </span>
                  <ul className="mt-6 space-y-4">
                    {NEW_WAY.map((item) => (
                      <li
                        className="flex items-start gap-3 text-foreground text-sm leading-relaxed"
                        key={item}
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
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

          {/* Chapter 02 — the path */}
          <Section id="how-it-works">
            <Reveal className="max-w-2xl">
              <Eyebrow chapter="02">How it works</Eyebrow>
              <h2 className="mt-4 font-heading font-semibold text-3xl text-foreground tracking-[-0.02em] sm:text-4xl">
                From report to resolved in three steps
              </h2>
            </Reveal>

            <div className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              <div
                aria-hidden="true"
                className="absolute top-3 right-0 left-0 hidden h-px bg-border md:block"
              />
              {STEPS.map((step, index) => (
                <Reveal
                  className="relative"
                  delay={index * 90}
                  key={step.number}
                >
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
                </Reveal>
              ))}
            </div>
          </Section>

          {/* Chapter 03 — the tool */}
          <Section id="widget">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal variant="left">
                <Eyebrow chapter="03">The widget</Eyebrow>
                <h2 className="mt-4 font-heading font-semibold text-3xl text-foreground tracking-[-0.02em] sm:text-4xl">
                  Reporting that meets users where they are
                </h2>
                <p className="mt-4 max-w-md text-ink-muted leading-relaxed">
                  A single floating button, always within reach. Visitors
                  capture the screen, mark severity, and add a note — then it’s
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
                      <span className="grid size-4 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                        <span className="size-1.5 rounded-full bg-primary" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <div className="parallax" data-parallax="60">
                <Reveal delay={100} variant="right">
                  <BrowserFrame url="acme.com">
                    <WidgetMock />
                  </BrowserFrame>
                </Reveal>
              </div>
            </div>
          </Section>

          {/* Chapter 04 — the upside */}
          <Section id="features">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
              <Reveal
                className="lg:sticky lg:top-24 lg:self-start"
                variant="left"
              >
                <Eyebrow chapter="04">Features</Eyebrow>
                <h2 className="mt-4 font-heading font-semibold text-3xl text-foreground tracking-[-0.02em] sm:text-4xl">
                  Signal, not noise
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
                    <div className="grid size-9 place-items-center rounded-lg border border-border bg-card text-primary transition-colors duration-200 group-hover:border-hairline-strong">
                      <feature.icon
                        aria-hidden="true"
                        className="size-4"
                        weight="bold"
                      />
                    </div>
                    <h3 className="mt-4 font-medium text-base text-foreground">
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

          {/* Chapter 05 — the setup */}
          <Section id="developers">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal className="order-2 lg:order-1" variant="left">
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
              </Reveal>

              <Reveal className="order-1 lg:order-2" variant="right">
                <Eyebrow chapter="05">Developer experience</Eyebrow>
                <h2 className="mt-4 font-heading font-semibold text-3xl text-foreground tracking-[-0.02em] sm:text-4xl">
                  One tag. Zero dependencies.
                </h2>
                <p className="mt-4 max-w-md text-ink-muted leading-relaxed">
                  No SDK to bundle, no framework to fight. Paste the snippet,
                  ship it, and reports start flowing. Everything else is typed
                  and queryable through a clean API.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["REST API", "Webhooks", "TypeScript types", "RLS"].map(
                    (tag) => (
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[11px] text-ink-subtle"
                        key={tag}
                      >
                        <Code
                          aria-hidden="true"
                          className="size-3 text-primary"
                          weight="bold"
                        />
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </Reveal>
            </div>
          </Section>

          {/* Chapter 06 — the reach */}
          <Section id="integrations">
            <Reveal className="mx-auto max-w-2xl text-center">
              <Eyebrow chapter="06">Integrations</Eyebrow>
              <h2 className="mt-4 font-heading font-semibold text-3xl text-foreground tracking-[-0.02em] sm:text-4xl">
                Plays nicely with your stack
              </h2>
              <p className="mt-4 text-ink-subtle leading-relaxed">
                Route reports wherever your team already works — no glue code
                required.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
              {INTEGRATIONS.map((integration, index) => (
                <Reveal
                  as="div"
                  className="group flex flex-col items-center gap-3 bg-background px-4 py-8 transition-colors duration-200 hover:bg-card"
                  delay={(index % 4) * 60}
                  key={integration.name}
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
              ))}
            </div>
          </Section>

          {/* The payoff — metrics */}
          <section className="border-border border-y bg-card/30">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
              {METRICS.map((metric, index) => (
                <Reveal
                  className="bg-background px-6 py-10 text-center"
                  delay={index * 70}
                  key={metric.label}
                  variant="scale"
                >
                  <p className="font-heading font-semibold text-4xl text-foreground tabular-nums tracking-[-0.03em]">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-ink-subtle text-xs leading-relaxed">
                    {metric.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* The payoff — testimonial */}
          <Section className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="parallax pointer-events-none absolute top-6 left-1/2 -ml-[220px] size-[440px] rounded-full bg-primary/10 blur-[90px]"
              data-parallax="160"
            />
            <Reveal
              className="relative mx-auto max-w-3xl text-center"
              variant="scale"
            >
              <Quotes
                aria-hidden="true"
                className="mx-auto size-8 text-primary"
                weight="fill"
              />
              <blockquote className="mt-6 text-balance font-heading font-medium text-2xl text-foreground leading-snug tracking-[-0.01em] sm:text-3xl">
                “We deleted an entire Notion doc of bug-triage rituals. Reports
                now land with the screenshot and the browser already attached —
                our team fixes instead of interrogating.”
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-9 place-items-center rounded-full bg-primary/15 font-medium text-primary text-sm"
                >
                  JR
                </span>
                <span className="text-left">
                  <span className="block font-medium text-foreground text-sm">
                    Jordan Rivera
                  </span>
                  <span className="block text-ink-subtle text-xs">
                    Staff Engineer, Northwind
                  </span>
                </span>
              </figcaption>
            </Reveal>
          </Section>

          {/* FAQ */}
          <Section id="faq">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
              <Reveal
                className="lg:sticky lg:top-24 lg:self-start"
                variant="left"
              >
                <Eyebrow>FAQ</Eyebrow>
                <h2 className="mt-4 font-heading font-semibold text-3xl text-foreground tracking-[-0.02em] sm:text-4xl">
                  Everything you need to know
                </h2>
                <p className="mt-4 text-ink-subtle leading-relaxed">
                  Still curious? Reach the team any time — we answer fast.
                </p>
              </Reveal>

              <Reveal variant="right">
                <Faq items={FAQS} />
              </Reveal>
            </div>
          </Section>

          {/* Arrival — the destination */}
          <section className="mx-auto max-w-6xl px-6 pb-28" id="arrive">
            <Reveal
              className="panel-highlight relative overflow-hidden rounded-2xl border border-border bg-card px-8 py-16 text-center sm:px-16"
              variant="scale"
            >
              <div
                aria-hidden="true"
                className="hero-glow parallax pointer-events-none absolute inset-x-0 top-0 h-64"
                data-parallax="90"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-ink-subtle text-xs backdrop-blur">
                  <Flag
                    aria-hidden="true"
                    className="size-3 text-primary"
                    weight="fill"
                  />
                  Journey’s end — free while in early access
                </span>
                <h2 className="mx-auto mt-6 max-w-xl font-heading font-semibold text-3xl text-foreground tracking-[-0.02em] sm:text-4xl">
                  You’ve seen the path. Now ship it.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-ink-muted leading-relaxed">
                  Create your project and start collecting contextual bug
                  reports in minutes.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    className="group/button h-10 gap-1.5 rounded-md px-4 text-sm"
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
                  <Button
                    className="h-10 gap-1.5 rounded-md px-4 text-sm"
                    render={<a href="#top">Back to the start</a>}
                    variant="outline"
                  />
                </div>
              </div>
            </Reveal>
          </section>
        </main>

        <SiteFooter />
      </div>
    </SmoothScroll>
  );
}
