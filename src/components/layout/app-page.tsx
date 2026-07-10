import type { ReactNode } from "react";

import {
  type Crumb,
  PageBreadcrumbs,
} from "@/components/layout/page-breadcrumbs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

/**
 * Fixed top bar plus a single scroll region.
 *
 * The bar carries three things, left to right: where you are (breadcrumbs),
 * how to narrow what you see (search), and what you can do (actions). Search
 * lives here rather than above the table because it applies to the whole page
 * and should not scroll out of reach — and because it leaves the content column
 * free to start at the data.
 */
export function AppPage({
  crumbs,
  search,
  actions,
  children,
  contentClassName,
}: {
  crumbs: Crumb[];
  search?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex h-12 shrink-0 items-center gap-3 border-border border-b px-3">
        <SidebarTrigger className="text-ink-subtle" />
        <div aria-hidden="true" className="h-4 w-px shrink-0 bg-border" />
        <PageBreadcrumbs crumbs={crumbs} />

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {search}
          {actions}
        </div>
      </header>

      {/*
       * Content is left-aligned, never centred. A centred column drifts away
       * from the sidebar as the window widens, so the eye has to re-find the
       * start of every line. Supabase, Vercel, and Linear all anchor left and
       * simply cap the measure.
       */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className={cn("max-w-6xl px-6 py-6", contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}
