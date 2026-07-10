import type { ReactNode } from "react";

import { Icon, type IconSvgElement } from "@/components/ui/icon";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  action?: ReactNode;
  className?: string;
  description?: string;
  icon?: IconSvgElement;
  title: string;
}

export function EmptyState({
  icon: iconSvg,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-border border-dashed bg-card/40 px-6 py-14 text-center",
        className
      )}
    >
      {iconSvg ? (
        <div className="mb-4 grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
          <Icon className="size-4.5" icon={iconSvg} strokeWidth={2} />
        </div>
      ) : null}
      <h3 className="font-heading font-semibold text-base text-foreground tracking-[-0.02em]">
        {title}
      </h3>
      {description ? (
        <p className="mt-1.5 max-w-sm text-[13px] text-ink-subtle leading-relaxed">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
