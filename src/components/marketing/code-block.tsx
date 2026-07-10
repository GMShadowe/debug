"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

const RESET_DELAY_MS = 2000;

/**
 * A framed mono code snippet with a filename tab and copy affordance. `code` is
 * the plain text copied to the clipboard; `children` is the (optionally
 * highlighted) rendered version.
 */
export function CodeBlock({
  filename,
  code,
  children,
  className,
}: {
  filename?: string;
  code: string;
  children: ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), RESET_DELAY_MS);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={cn(
        "panel-highlight overflow-hidden rounded-2xl border border-border bg-card",
        className
      )}
    >
      <div className="flex items-center justify-between border-border border-b px-4 py-2.5">
        <span className="font-mono text-ink-subtle text-xs">
          {filename ?? "Terminal"}
        </span>
        <button
          aria-label="Copy code"
          className="grid size-7 place-items-center rounded-md text-ink-subtle transition-colors duration-150 hover:bg-muted hover:text-foreground"
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
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}
