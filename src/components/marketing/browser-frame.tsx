import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A dark window chrome that frames a product-UI mock — the protagonist surface
 * of the marketing page per the Linear design system. Surface-1 panel with a
 * hairline border and the faint top-edge highlight.
 */
export function BrowserFrame({
  url,
  children,
  className,
}: {
  url?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "panel-highlight overflow-hidden rounded-xl border border-border bg-card",
        className
      )}
    >
      <div className="flex items-center gap-2 border-border border-b px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-hairline-strong" />
          <span className="size-2.5 rounded-full bg-hairline-strong" />
          <span className="size-2.5 rounded-full bg-hairline-strong" />
        </div>
        {url ? (
          <div className="ml-2 flex h-6 max-w-xs flex-1 items-center rounded-md border border-border bg-background px-2.5">
            <span className="truncate font-mono text-[11px] text-ink-subtle">
              {url}
            </span>
          </div>
        ) : null}
      </div>
      <div className="bg-background">{children}</div>
    </div>
  );
}
