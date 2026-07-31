import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { AnatomyScene } from "@/components/marketing/anatomy-scene";
import { BrowserFrame } from "@/components/marketing/browser-frame";
import { CaptureScene } from "@/components/marketing/capture-scene";
import { ChapterRail } from "@/components/marketing/chapter-rail";
import { Counter } from "@/components/marketing/counter";
import { CtaFinale } from "@/components/marketing/cta-finale";
import { Faq } from "@/components/marketing/faq";
import { FeatureRail } from "@/components/marketing/feature-rail";
import { HeroStage } from "@/components/marketing/hero-stage";
import { InstallScene } from "@/components/marketing/install-scene";
import { Magnetic } from "@/components/marketing/magnetic";
import { DashboardMock } from "@/components/marketing/product-mock";
import { ReportStream } from "@/components/marketing/report-stream";
import { Reveal } from "@/components/marketing/reveal";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { SmoothScroll } from "@/components/marketing/smooth-scroll";
import { TriageScene } from "@/components/marketing/triage-scene";
import { Button } from "@/components/ui/button";

const CAPTURED_FIELDS = [
  "Browser",
  "Engine version",
  "Operating system",
  "Viewport",
  "Device pixel ratio",
  "Page URL",
  "Referrer",
  "Console trail",
  "Network status",
  "Locale",
  "Timezone",
  "Annotated screenshot",
];

const FAQS = [
  {
    answer:
      "Paste one script tag into your HTML. There is no package to install, no build step and no framework integration. It works the same in React, Vue, Svelte, Astro or plain HTML, because it never enters your bundle.",
    question: "How do I add Lumen to my site?",
  },
  {
    answer:
      "No. The widget is a few kilobytes, loads with defer, and runs off your critical path. It is not imported into your JavaScript bundle, so your build output is byte for byte what it was before.",
    question: "Will it slow my site down?",
  },
  {
    answer:
      "An annotated screenshot plus browser, engine version, operating system, viewport, device pixel ratio, page URL, referrer, locale, timezone, network status and the console trail from the sixty seconds before the report was sent.",
    question: "What context gets captured?",
  },
  {
    answer:
      "Reports are scoped per project with row-level security, screenshots are stored privately, and retention is yours to configure. Nothing is shared across projects and nothing is used to train anything.",
    question: "Is my data private?",
  },
  {
    answer:
      "Yes. Every report is available through a typed REST API and can fan out over webhooks, so issues can land in Linear, GitHub or Slack the moment they arrive.",
    question: "Can I pipe reports into my own tools?",
  },
  {
    answer:
      "Reporters choose whether to leave contact details. If they do, the address rides along with the report so you can close the loop; if they do not, the report still carries every technical detail you need.",
    question: "Do reporters need an account?",
  },
];

const PROOF = [
  { label: "Script tags to install", node: <span>1</span> },
  { label: "Added to your bundle", node: <span>0kb</span> },
  {
    label: "Context fields per report",
    node: <Counter suffix="+" value={12} />,
  },
  {
    label: "Seconds to your first report",
    node: <Counter prefix="<" suffix="s" value={60} />,
  },
];

export default function LandingPage() {
  return (
    <SmoothScroll>
      <div className="theme-landing relative bg-background text-foreground">
        <div aria-hidden="true" className="paper-grain" />
        <ChapterRail />

        <div className="relative z-10 flex min-h-dvh flex-col">
          <a
            className="sr-only bg-card px-3 py-2 text-foreground text-sm ring-2 ring-ring focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
            href="#main-content"
          >
            Skip to content
          </a>
          <SiteHeader />

          <main className="flex-1" id="main-content">
            {/* ── Opening. The claim, then the camera settles onto the product. */}
            <section className="relative overflow-hidden" id="top">
              <div className="mx-auto max-w-[1180px] px-6 pt-32 pb-24 sm:pt-40">
                <div className="flex items-center gap-3">
                  <span
                    className="rise-in label-mono text-ink-tertiary"
                    style={{ animationDelay: "80ms" }}
                  >
                    Bug reporting for developers
                  </span>
                  <span
                    aria-hidden="true"
                    className="rise-in h-px flex-1 bg-border"
                    style={{ animationDelay: "80ms" }}
                  />
                </div>

                <h1 className="mt-8 text-balance text-display text-foreground">
                  <span className="line-mask">
                    <span
                      className="line-rise"
                      style={{ animationDelay: "0ms" }}
                    >
                      Bug reports that
                    </span>
                  </span>
                  <span className="line-mask">
                    <span
                      className="line-rise"
                      style={{ animationDelay: "110ms" }}
                    >
                      arrive <em>finished</em>.
                    </span>
                  </span>
                </h1>

                <div className="mt-12 grid items-end gap-8 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
                  <p
                    className="rise-in text-pretty text-ink-muted text-lg leading-relaxed"
                    style={{ animationDelay: "420ms" }}
                  >
                    Lumen is a drop-in widget. The moment a visitor finds a bug
                    it captures the screen they were looking at, the environment
                    they were in and the console trail that led there, then
                    files all of it in your dashboard ready to fix.
                  </p>

                  <div
                    className="rise-in flex flex-col gap-3 sm:flex-row lg:justify-end"
                    style={{ animationDelay: "520ms" }}
                  >
                    <Magnetic>
                      <Button
                        className="group/button h-11 gap-1.5 px-5 text-sm"
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
                        className="h-11 px-5 text-sm"
                        nativeButton={false}
                        render={<a href="#capture">See it happen</a>}
                        variant="outline"
                      />
                    </Magnetic>
                  </div>
                </div>

                <p
                  className="rise-in mt-6 font-mono text-[11px] text-ink-tertiary"
                  style={{ animationDelay: "600ms" }}
                >
                  No credit card · 1 script tag · 0 kb added to your bundle
                </p>

                <div className="mt-20">
                  <HeroStage>
                    <div className="panel-dark island-shadow">
                      <BrowserFrame url="app.lumen.dev/dashboard">
                        <DashboardMock />
                      </BrowserFrame>
                    </div>
                  </HeroStage>
                </div>
              </div>
            </section>

            <ReportStream />

            {/* ── Act 01. The capture, shown rather than described. */}
            <CaptureScene />

            {/* ── Act 02. What a finished report is actually made of. */}
            <AnatomyScene />

            {/* ── Act 03. How little it costs to start. */}
            <InstallScene />

            {/* ── Act 04. The receiving end. */}
            <TriageScene />

            {/* ── Act 05. The horizontal pan across the kit. */}
            <FeatureRail />

            {/* ── The proof band, then everything captured, drifting past. */}
            <section className="border-border border-y">
              <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-px bg-border md:grid-cols-4">
                {PROOF.map((item, index) => (
                  <Reveal
                    className="bg-background px-6 py-14 text-center"
                    delay={index * 70}
                    key={item.label}
                    variant="scale"
                  >
                    <p className="font-semibold text-5xl text-foreground tabular-nums tracking-[-0.04em]">
                      {item.node}
                    </p>
                    <p className="mt-3 text-[12px] text-ink-tertiary leading-relaxed">
                      {item.label}
                    </p>
                  </Reveal>
                ))}
              </div>
            </section>

            <section
              aria-label="Context captured with every report"
              className="border-border border-b py-7"
            >
              <div className="mask-fade-x flex overflow-hidden">
                {[0, 1].map((copy) => (
                  <div
                    aria-hidden={copy === 1 ? "true" : undefined}
                    className="strip-track flex shrink-0 items-center gap-2.5 pr-2.5"
                    key={copy}
                  >
                    {CAPTURED_FIELDS.map((field) => (
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

            {/* ── Act 06. The quiet close. */}
            <section
              className="mx-auto max-w-[1180px] px-6 py-24 sm:py-32"
              id="faq"
            >
              <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-20">
                <Reveal
                  className="lg:sticky lg:top-28 lg:self-start"
                  variant="left"
                >
                  <p className="label-mono text-ink-tertiary">
                    Act 06 · Answers
                  </p>
                  <h2 className="mt-4 text-balance text-display-2 text-foreground">
                    Before you <em>ask</em>.
                  </h2>
                  <p className="mt-5 text-ink-subtle leading-relaxed">
                    If something is not covered here, write to us and a person
                    will answer.
                  </p>
                </Reveal>

                <Reveal variant="right">
                  <Faq items={FAQS} />
                </Reveal>
              </div>
            </section>

            {/* ── Arrival. */}
            <CtaFinale />
          </main>

          <SiteFooter />
        </div>
      </div>
    </SmoothScroll>
  );
}
