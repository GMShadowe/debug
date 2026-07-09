import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A labeled content block. With `orientation="horizontal"` the label and
 * description sit in a narrow left column and the content (usually a Card) fills
 * a wider right column — the Supabase settings/billing pattern.
 */
export function PageSection({
  id,
  title,
  description,
  aside,
  orientation = "vertical",
  className,
  children,
}: {
  id?: string;
  title?: string;
  description?: string;
  aside?: ReactNode;
  orientation?: "vertical" | "horizontal";
  className?: string;
  children: ReactNode;
}) {
  if (orientation === "horizontal") {
    return (
      <section
        className={cn(
          "grid scroll-mt-20 grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-3",
          className
        )}
        id={id}
      >
        {Boolean(title || description) && (
          <div className="lg:col-span-1">
            {title ? (
              <h2 className="font-heading font-medium text-base text-foreground">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-1 text-ink-subtle text-sm leading-relaxed">
                {description}
              </p>
            ) : null}
            {aside ? <div className="mt-3">{aside}</div> : null}
          </div>
        )}
        <div className="lg:col-span-2">{children}</div>
      </section>
    );
  }

  return (
    <section className={cn("scroll-mt-20 space-y-4", className)} id={id}>
      {Boolean(title || description || aside) && (
        <div className="flex items-end justify-between gap-4">
          <div>
            {title ? (
              <h2 className="font-heading font-medium text-base text-foreground">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-1 text-ink-subtle text-sm">{description}</p>
            ) : null}
          </div>
          {aside ? <div className="shrink-0">{aside}</div> : null}
        </div>
      )}
      {children}
    </section>
  );
}
