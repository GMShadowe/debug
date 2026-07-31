"use client";

import {
  Camera as CameraIcon,
  ChartLineUp,
  Code,
  Gauge,
  Lightning,
  PlugsConnected,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useCinematic } from "@/hooks/use-cinematic";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    body: "Every report arrives with the frame the visitor saw and the region they circled. No more asking for a screenshot they already closed.",
    icon: CameraIcon,
    meta: "Client-side capture",
    title: "Screenshots on capture",
  },
  {
    body: "Browser, engine, OS, viewport, pixel ratio, URL, referrer, locale, timezone and connection, attached without anyone typing them.",
    icon: Gauge,
    meta: "12+ fields",
    title: "Context you never ask for",
  },
  {
    body: "One deferred script tag. No package, no build step, no framework adapter to keep upgrading through major versions.",
    icon: Lightning,
    meta: "0 kb bundled",
    title: "Drop-in widget",
  },
  {
    body: "Sort by severity, filter by status, search across titles, environments and reporters. The queue tells you what to open next.",
    icon: ChartLineUp,
    meta: "Triage queue",
    title: "A dashboard that ranks",
  },
  {
    body: "Row-level security scopes every report to the project that owns it. Screenshots are stored privately and retention is yours to set.",
    icon: ShieldCheck,
    meta: "RLS by default",
    title: "Private by construction",
  },
  {
    body: "A typed REST API and webhooks on every event, so reports can land in Linear, GitHub or Slack without anyone copying a URL.",
    icon: PlugsConnected,
    meta: "REST · webhooks",
    title: "Built to route onward",
  },
];

/**
 * Act five, the pan. The page pins and the camera tracks sideways across the
 * feature set: vertical scroll is remapped to horizontal travel, so the whole
 * kit reads as one continuous move rather than a grid of boxes.
 *
 * Travel distance is measured rather than guessed, so the last panel always
 * lands flush against the right edge at whatever viewport it is read on.
 */
export function FeatureRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const cinematic = useCinematic();

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: sectionRef,
  });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
  const railProgress = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const measure = () => {
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 48));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  if (!cinematic) {
    return (
      <section className="mx-auto max-w-[1180px] px-6 py-24" id="features">
        <RailHeading />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              feature={feature}
              fluid
              index={index}
              key={feature.title}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[420vh]" id="features" ref={sectionRef}>
      <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <RailHeading />
        </div>

        <motion.div
          className="mt-12 flex gap-5 px-6 lg:px-[max(1.5rem,calc((100vw-1180px)/2))]"
          ref={trackRef}
          style={{ x }}
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard feature={feature} index={index} key={feature.title} />
          ))}
        </motion.div>

        {/* Pan position */}
        <div className="mx-auto mt-12 w-full max-w-[1180px] px-6">
          <div className="h-px w-full overflow-hidden bg-border">
            <motion.div
              className="h-px w-full origin-left bg-foreground"
              style={{ scaleX: railProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function RailHeading() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="label-mono text-ink-tertiary">Act 05 · The kit</p>
        <h2 className="mt-4 max-w-lg text-balance text-display-2 text-foreground">
          Small surface. Deep <em>system</em>.
        </h2>
      </div>
      <p className="max-w-xs text-ink-subtle text-sm leading-relaxed">
        Six things Lumen does properly, instead of forty it does approximately.
      </p>
    </div>
  );
}

function FeatureCard({
  feature,
  fluid = false,
  index,
}: {
  feature: (typeof FEATURES)[number];
  /** Fill the grid cell instead of holding a fixed rail width. */
  fluid?: boolean;
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <article
      className={cn(
        "card-interactive flex flex-col justify-between rounded-xl border border-border bg-card p-6",
        fluid ? "w-full" : "w-[290px] shrink-0 sm:w-[330px]"
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="grid size-9 place-items-center rounded-lg border border-border bg-background text-primary">
            <Icon className="size-4" weight="bold" />
          </span>
          <span className="font-mono text-[10px] text-ink-tertiary tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-5 font-semibold text-[17px] text-foreground tracking-tight">
          {feature.title}
        </h3>
        <p className="mt-2.5 text-[13px] text-ink-subtle leading-relaxed">
          {feature.body}
        </p>
      </div>
      <p className="mt-6 inline-flex w-fit items-center gap-1.5 border-border border-t pt-3 font-mono text-[10px] text-ink-tertiary uppercase tracking-[0.12em]">
        <Code className="size-3" weight="bold" />
        {feature.meta}
      </p>
    </article>
  );
}
