import {
  ArrowRight,
  Camera,
  ChartLineUp,
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
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

import { BrowserFrame } from "@/components/marketing/browser-frame";
import { CodeTyper } from "@/components/marketing/code-typer";
import { Faq } from "@/components/marketing/faq";
import { GlowCard } from "@/components/marketing/glow-card";
import { GsapFX } from "@/components/marketing/gsap-fx";
import { HeroFragments } from "@/components/marketing/hero-fragments";
import { Magnetic } from "@/components/marketing/magnetic";
import { PageIntro } from "@/components/marketing/page-intro";
import { DashboardMock } from "@/components/marketing/product-mock";
import { ReportTicker } from "@/components/marketing/report-ticker";
import { Reveal } from "@/components/marketing/reveal";
import { ScrollFX } from "@/components/marketing/scroll-fx";
import { ScrollProgress } from "@/components/marketing/scroll-progress";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { SmoothScroll } from "@/components/marketing/smooth-scroll";
import { StickyCompare } from "@/components/marketing/sticky-compare";
import { StickyCta } from "@/components/marketing/sticky-cta";
import { StickyDemo } from "@/components/marketing/sticky-demo";
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
        <GsapFX />
        <div className="flex min-h-dvh flex-col">
          <a
            className="sr-only rounded-md bg-card px-3 py-2 text-foreground text-sm ring-2 ring-ring focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
            href="#main-content"
          >
            Skip to content
          </a>
          <SiteHeader />

          <main className="flex-1" id="main-content">
            {/* SCENE 1 — the signal. Massive type over a living backdrop. */}
            <section className="relative overflow-hidden" id="top">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
              >
                <div className="aurora-blob aurora-a top-[-160px] left-[6%] size-[440px] bg-primary/20" />
                <div className="aurora-blob aurora-b top-[-80px] right-[4%] size-[380px] bg-[#828fff]/12" />
                <div className="grid-backdrop absolute inset-0" />
              </div>
              <div className="noise-overlay" />

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
                    No credit card · 1 script tag · 0 kb added to your bundle
                  </p>
                </div>

                {/* The product, orbited by floating fragments of the flow */}
                <div className="parallax relative mt-14" data-parallax="60">
                  <div className="rise-in" style={{ animationDelay: "300ms" }}>
                    <div className="panel-dark view-rise relative">
                      <BrowserFrame
                        className="shadow-[0_32px_64px_-24px_rgb(0_0_0/0.55)]"
                        url="app.lumen.dev/dashboard"
                      >
                        <DashboardMock />
                      </BrowserFrame>
                      <HeroFragments />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SCENE 2 — the live wire. The product is switched on. */}
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

            {/* SCENE 3 — the problem, then the turn. */}
            <section id="why">
              <div className="mx-auto max-w-3xl px-6 pt-24 pb-8 text-center sm:pt-32">
                <Reveal>
                  <Eyebrow chapter="01">Why Lumen</Eyebrow>
                  <h2 className="mt-4 text-balance text-display-2 text-foreground tracking-[-0.03em]">
                    Stop reproducing. Start <em>fixing</em>.
                  </h2>
                </Reveal>
                <p
                  className="mt-8 text-pretty text-foreground text-xl leading-relaxed sm:text-2xl"
                  data-words=""
                >
                  The gap between a bug happening and you understanding it is
                  where the hours disappear. Lumen closes that gap at the moment
                  the bug is seen.
                </p>
              </div>
              <StickyCompare />
            </section>

            {/* SCENE 4 — the loop. Preview holds still, the story scrolls. */}
            <section id="how-it-works">
              <StickyDemo />
            </section>

            {/* SCENE 5 — the craft. The snippet types itself into the page. */}
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
                        className="panel-dark view-rise shadow-[0_32px_64px_-24px_rgb(0_0_0/0.55)]"
                        code={SNIPPET_TEXT}
                        filename="index.html"
                        tokens={SNIPPET_TOKENS}
                      />
                    </div>

                    <Reveal className="order-1 lg:order-2" variant="right">
                      <Eyebrow chapter="03">Developer experience</Eyebrow>
                      <h2 className="mt-4 text-balance text-display-2 text-foreground tracking-[-0.03em]">
                        One tag. Zero <em>dependencies</em>.
                      </h2>
                      <p
                        className="mt-4 max-w-md text-ink-muted leading-relaxed"
                        data-words=""
                      >
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
                              className="size-3 text-primary-hover"
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

            {/* SCENE 6 — the arsenal. Mouse-reactive glow cards. */}
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

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {FEATURES.map((feature, index) => (
                    <Reveal
                      as="div"
                      delay={(index % 2) * 80}
                      key={feature.title}
                    >
                      <GlowCard className="h-full rounded-xl p-6">
                        <div className="grid size-9 place-items-center rounded-lg border border-border bg-background text-primary-hover">
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
                      </GlowCard>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Section>

            {/* SCENE 7 — the proof. Numbers, then the stack it plays with. */}
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
              <div className="border-border border-t">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6 py-8">
                  <span className="font-mono text-[11px] text-ink-subtle uppercase tracking-[0.14em]">
                    Routes to your stack
                  </span>
                  {INTEGRATIONS.map((integration) => (
                    <span
                      className="flex items-center gap-2 text-ink-subtle text-sm transition-colors duration-200 hover:text-foreground"
                      key={integration.name}
                    >
                      <integration.icon aria-hidden="true" className="size-5" />
                      {integration.name}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* SCENE 8 — the questions. */}
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

            {/* SCENE 9 — arrival. The stage grows to meet you. */}
            <StickyCta />
          </main>

          <SiteFooter />
        </div>
      </div>
    </SmoothScroll>
  );
}
