import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  /** Right-aligned actions (buttons, badges). */
  actions?: ReactNode;
  className?: string;
  description?: string;
  title: string;
}

/**
 * Page title block with optional description and aside actions — the Supabase
 * PageHeader-with-meta pattern.
 */
export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="space-y-1.5">
        <h1 className="font-heading font-semibold text-2xl text-foreground tracking-tight">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-ink-subtle text-sm leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
