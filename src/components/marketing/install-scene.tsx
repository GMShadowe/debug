"use client";

import { Check, Copy } from "@phosphor-icons/react/dist/ssr";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

import { Reveal } from "@/components/marketing/reveal";
import { useCinematic } from "@/hooks/use-cinematic";
import { cn } from "@/lib/utils";

const SNIPPET = `<script
  src="https://cdn.lumen.dev/widget.js"
  data-project="lum_live_a1b2c3d4"
  defer
></script>`;

/** The snippet, pre-split into syntax spans so typing stays a single slice. */
const TOKENS: { className?: string; text: string }[] = [
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

/**
 * Pre-resolve each token's offset into the snippet once, at module scope, so
 * rendering a frame of the typing is a pure slice per token rather than a
 * counter mutated while React is rendering.
 */
const TOKEN_SPANS = (() => {
  let cursor = 0;
  return TOKENS.map((token) => {
    const start = cursor;
    cursor += token.text.length;
    return { ...token, start };
  });
})();

const TOTAL_CHARS = TOKENS.reduce((sum, token) => sum + token.text.length, 0);

const FACTS = [
  { label: "Script tags to install", value: "1" },
  { label: "Added to your bundle", value: "0 kb" },
  { label: "Frameworks required", value: "none" },
];

/**
 * Act three. The snippet types itself out of the scroll: progress through the
 * pinned scene maps to characters revealed, so the reader's own motion is what
 * writes the install. The whole install is four lines, and the scene is over
 * as fast as the real thing is.
 */
export function InstallScene() {
  const ref = useRef<HTMLElement>(null);
  const cinematic = useCinematic();
  const [typed, setTyped] = useState(0);
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: ref,
  });
  const characters = useTransform(
    scrollYProgress,
    [0.08, 0.62],
    [0, TOTAL_CHARS]
  );

  useMotionValueEvent(characters, "change", (value) => {
    const next = Math.round(Math.max(0, Math.min(TOTAL_CHARS, value)));
    setTyped((previous) => (previous === next ? previous : next));
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Without a stage to pin to, the snippet is simply already written.
  const revealed = cinematic ? typed : TOTAL_CHARS;

  return (
    <section
      className={cinematic ? "relative h-[240vh]" : "relative"}
      id="install"
      ref={ref}
    >
      <div
        className={cn(
          "flex items-center",
          cinematic ? "sticky top-0 h-dvh overflow-hidden" : "py-24"
        )}
      >
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="left">
              <p className="label-mono text-ink-tertiary">
                Act 03 · The install
              </p>
              <h2 className="mt-4 text-balance text-display-2 text-foreground">
                Four lines. Then <em>never</em> think about it again.
              </h2>
              <p className="mt-5 max-w-md text-ink-muted leading-relaxed">
                No package to install, no build step, no framework integration
                to keep upgrading. Paste the tag into your HTML and reports
                start arriving. It loads deferred, off the main thread, and adds
                nothing to your JavaScript bundle because it is never imported
                into it.
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden border border-border bg-border">
                {FACTS.map((fact) => (
                  <div className="bg-background px-3 py-4" key={fact.label}>
                    <dt className="sr-only">{fact.label}</dt>
                    <dd>
                      <span className="block font-semibold text-2xl text-foreground tabular-nums tracking-tight">
                        {fact.value}
                      </span>
                      <span className="mt-1 block text-[11px] text-ink-tertiary leading-tight">
                        {fact.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <div className="panel-dark island-shadow overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-border border-b px-4 py-2.5">
                <span className="font-mono text-[11px] text-ink-subtle">
                  index.html
                </span>
                <button
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 font-mono text-[10px] text-ink-subtle transition-colors duration-200 hover:border-hairline-strong hover:text-foreground"
                  onClick={handleCopy}
                  type="button"
                >
                  {copied ? (
                    <Check className="size-3 text-success" weight="bold" />
                  ) : (
                    <Copy className="size-3" weight="bold" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-[1.9] sm:text-[13px]">
                <code>
                  {TOKEN_SPANS.map((token) => {
                    const visible = Math.max(
                      0,
                      Math.min(token.text.length, revealed - token.start)
                    );
                    if (visible === 0) {
                      return null;
                    }
                    return (
                      <span className={token.className} key={token.start}>
                        {token.text.slice(0, visible)}
                      </span>
                    );
                  })}
                  <span
                    className={cn(
                      "ml-px inline-block h-[1.1em] w-[7px] translate-y-[2px] bg-primary-hover",
                      revealed >= TOTAL_CHARS && "caret-blink"
                    )}
                  />
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
