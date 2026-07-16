"use client";

import { type ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * A card whose border and inner light react to the cursor: pointer position
 * is written into --gx/--gy custom properties that the `glow-card` utility's
 * radial gradient reads. Writes are rAF-throttled and style-only, so hover
 * never re-renders React or touches layout.
 */
export function GlowCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || frame.current) {
      return;
    }
    const { clientX, clientY } = event;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--gx", `${clientX - rect.left}px`);
      node.style.setProperty("--gy", `${clientY - rect.top}px`);
    });
  };

  return (
    <div
      className={cn("glow-card", className)}
      onPointerMove={handleMove}
      ref={ref}
    >
      {children}
    </div>
  );
}
