"use client";

import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { Magnetic } from "@/components/marketing/magnetic";
import { Button } from "@/components/ui/button";

/**
 * Arrival. The last dark island starts as a small card on the paper and grows
 * to swallow the viewport as you reach the end, so the journey closes by
 * landing inside the product rather than next to it. Radius counter-scales so
 * the corners stay a constant visual size while the panel grows.
 */
export function CtaFinale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end end"],
    target: ref,
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.75], [0.82, 1]);
  const radius = useTransform(scrollYProgress, [0.1, 0.75], [28, 14]);
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.35, 0.7], [40, 0]);

  return (
    <section className="relative h-[190vh]" ref={ref}>
      <div className="sticky top-0 flex h-dvh items-center px-4 sm:px-6">
        <motion.div
          className="panel-dark island-shadow relative flex h-[82vh] w-full items-center justify-center overflow-hidden border border-border bg-background"
          style={{ borderRadius: radius, scale }}
        >
          <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" />

          <motion.div
            className="relative mx-auto max-w-2xl px-6 text-center"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            <p className="label-mono text-ink-tertiary">
              One script tag from here
            </p>
            <h2 className="mt-6 text-balance text-display-2 text-foreground">
              Ship the fix, not the <em>repro</em>.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-pretty text-ink-muted leading-relaxed">
              Paste the tag, keep working. The next bug someone finds on your
              site arrives with everything you need to close it.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Button
                  className="group/button h-11 gap-1.5 px-6 text-sm"
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
              <Button
                className="h-11 px-6 text-sm"
                nativeButton={false}
                render={<a href="#capture">Watch it work again</a>}
                variant="outline"
              />
            </div>

            <p className="mt-7 font-mono text-[11px] text-ink-tertiary">
              No credit card · 1 script tag · 0 kb added to your bundle
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
