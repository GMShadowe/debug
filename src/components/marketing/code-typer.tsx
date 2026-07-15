"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const RESET_DELAY_MS = 2000;

export interface CodeToken {
  className?: string;
  text: string;
}

/**
 * A framed code snippet that "types itself" as the reader scrolls. Progress is
 * read from the nearest `[data-code-scene]` ancestor (a tall wrapper whose
 * inner content is sticky), so the characters land in step with the scroll —
 * scrub back up and the code un-types. Falls back to fully-rendered code when
 * the user prefers reduced motion.
 */
export function CodeTyper({
  filename,
  tokens,
  code,
  className,
}: {
  filename?: string;
  tokens: CodeToken[];
  /** Plain-text version of the snippet, for the copy button. */
  code: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const total = tokens.reduce((sum, token) => sum + token.text.length, 0);
  const [visible, setVisible] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(total);
      return;
    }

    const scene = node.closest("[data-code-scene]") ?? node;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = scene.getBoundingClientRect();
      const viewport = window.innerHeight;
      const scrollable = rect.height - viewport;
      // Inside a sticky scene, progress is how far the scene has been
      // scrolled through; otherwise fall back to viewport-entry progress.
      const raw =
        scrollable > 0
          ? -rect.top / scrollable
          : (viewport * 0.85 - rect.top) / (viewport * 0.55);
      const progress = Math.min(1, Math.max(0, raw));
      setVisible(Math.round(progress * total));
    };
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [total]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), RESET_DELAY_MS);
    } catch {
      setCopied(false);
    }
  };

  // Slice the token stream at the visible character count.
  let remaining = visible;
  const typed = tokens.map((token, index) => {
    const text = token.text.slice(0, Math.max(0, remaining));
    remaining -= token.text.length;
    return (
      <span
        className={token.className}
        // biome-ignore lint/suspicious/noArrayIndexKey: static token stream
        key={index}
      >
        {text}
      </span>
    );
  });

  return (
    <div
      className={cn(
        "panel-highlight overflow-hidden rounded-xl border border-border bg-card",
        className
      )}
      ref={ref}
    >
      <div className="flex items-center justify-between border-border border-b px-4 py-2.5">
        <span className="font-mono text-ink-subtle text-xs">
          {filename ?? "Terminal"}
        </span>
        <button
          aria-label="Copy code"
          className="grid size-6 place-items-center rounded-md text-ink-subtle transition-colors duration-150 hover:bg-muted hover:text-foreground"
          onClick={handleCopy}
          type="button"
        >
          {copied ? (
            <Check className="size-3.5 text-success" weight="bold" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>
      <div className="relative overflow-x-auto px-4 py-4">
        {/* Ghost copy reserves the final layout so nothing jumps while typing. */}
        <pre
          aria-hidden="true"
          className="invisible font-mono text-[13px] leading-relaxed"
        >
          <code>
            {tokens.map((token, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static token stream
              <span key={index}>{token.text}</span>
            ))}
          </code>
        </pre>
        <pre className="absolute inset-0 px-4 py-4 font-mono text-[13px] leading-relaxed">
          <code>
            {typed}
            <span aria-hidden="true" className="text-foreground caret-blink">
              ▍
            </span>
          </code>
        </pre>
        {/* Screen readers get the finished snippet, not the typing theater. */}
        <span className="sr-only">{code}</span>
      </div>
    </div>
  );
}
