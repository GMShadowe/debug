import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  action?: ReactNode;
  className?: string;
  description?: string;
  icon?: Icon;
  title: string;
}

export function EmptyState({
  icon: IconComponent,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-border border-dashed bg-card/40 px-6 py-16 text-center",
        className
      )}
    >
      {IconComponent ? (
        <div className="mb-4 grid size-11 place-items-center rounded-full border border-border bg-muted text-ink-subtle">
          <IconComponent className="size-5" />
        </div>
      ) : null}
      <h3 className="font-heading font-medium text-base text-foreground">
        {title}
      </h3>
      {description ? (
        <p className="mt-1 max-w-sm text-ink-subtle text-sm">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
