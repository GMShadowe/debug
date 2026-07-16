"use client";

import { type ElementType, type ReactNode, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type RevealVariant = "up" | "left" | "right" | "scale";

interface RevealProps {
  /** Element to render as defaults to a div. */
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds before the element animates in. */
  delay?: number;
  /** Direction the element settles from. Defaults to a subtle rise. */
  variant?: RevealVariant;
}

const VARIANT_CLASS: Record<RevealVariant, string> = {
  left: "reveal reveal-left",
  right: "reveal reveal-right",
  scale: "reveal reveal-scale",
  up: "reveal",
};

/**
 * Reveals its children the first time they scroll into view, animating only
 * transform + opacity so the effect stays on the compositor. Uses a single
 * IntersectionObserver per element, unobserving once shown, and falls back to
 * an immediate reveal when the user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      className={cn(VARIANT_CLASS[variant], className)}
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
