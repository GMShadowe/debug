import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageContainerSize = "sm" | "default" | "full";

const SIZE_CLASS: Record<PageContainerSize, string> = {
  default: "max-w-5xl", // lists, tables, detail pages
  full: "max-w-none", // dense horizontal content (logs, charts)
  sm: "max-w-2xl", // settings, forms, focused configuration
};

/**
 * Constrains page content to a max width based on the kind of information it
 * holds — following the Supabase layout pattern where width is chosen by
 * content type, not page type.
 */
export function PageContainer({
  size = "default",
  className,
  children,
}: {
  size?: PageContainerSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 py-8 sm:px-6 lg:px-8",
        SIZE_CLASS[size],
        className
      )}
    >
      {children}
    </div>
  );
}
