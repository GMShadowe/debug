import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** A bordered card used inside settings sections. */
export function SettingsCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Padded body region of a settings card. */
export function SettingsCardBody({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("p-5 sm:p-6", className)}>{children}</div>;
}

/**
 * Right-aligned footer with a muted surface — hosts Save/Cancel actions, the
 * Supabase settings-card convention.
 */
export function SettingsCardFooter({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 border-border border-t bg-background/40 px-5 py-3 sm:px-6",
        className
      )}
    >
      {children}
    </div>
  );
}
