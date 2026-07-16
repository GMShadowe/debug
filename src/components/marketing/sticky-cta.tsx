"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { Magnetic } from "@/components/marketing/magnetic";
import { Button } from "@/components/ui/button";

/**
 * The finale: as the reader scrolls into the last scene, the dark panel
 * grows from a card into a near-full-bleed stage while the lavender bloom
 * behind it intensifies — arrival as a physical sensation. Springed scale
 * and opacity only, so the morph stays on the compositor.
 */
export function StickyCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end end"],
    target: ref,
  });
  const eased = useSpring(scrollYProgress, { damping: 30, stiffness: 90 });

  const scale = useTransform(eased, [0, 1], [0.82, 1]);
  const radius = useTransform(eased, [0, 1], [40, 24]);
  const glow = useTransform(eased, [0.2, 1], [0.25, 1]);
  const textY = useTransform(eased, [0.3, 1], [40, 0]);
  const textOpacity = useTransform(eased, [0.3, 0.9], [0, 1]);

  return (
    <div className="relative h-[180vh]" id="arrive" ref={ref}>
      <div className="sticky top-0 flex min-h-dvh items-center px-4 py-6 sm:px-6">
        <motion.div
          className="panel-dark relative mx-auto w-full max-w-6xl overflow-hidden border border-border bg-background px-8 py-24 text-center shadow-[0_48px_96px_-32px_rgb(0_0_0/0.6)] sm:px-16 sm:py-32"
          style={{ borderRadius: radius, scale }}
        >
          {/* Morphing bloom */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ opacity: glow }}
          >
            <div className="aurora-blob aurora-a top-[-30%] left-[15%] size-[480px] bg-primary/30" />
            <div className="aurora-blob aurora-b top-[-10%] right-[10%] size-[380px] bg-[#828fff]/20" />
          </motion.div>
          <div className="noise-overlay" />

          <motion.div
            className="relative"
            style={{ opacity: textOpacity, y: textY }}
          >
            <h2 className="mx-auto max-w-2xl text-balance text-display-2 text-foreground tracking-[-0.03em]">
              Put Lumen on your site <em>today</em>.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-ink-muted leading-relaxed">
              Create a project, paste one script tag, and the first report can
              arrive within the minute. Free while in early access.
            </p>
            <div className="mt-9 flex justify-center">
              <Magnetic>
                <Button
                  className="group/button h-12 gap-1.5 rounded-full px-6 text-sm"
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
              </Magnetic>
            </div>
            <p className="mt-5 font-mono text-ink-subtle text-xs">
              No credit card required
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
