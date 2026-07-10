import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { ChevronRightIcon } from "@/lib/icons";

export interface Crumb {
  /** Omit on the final crumb — the current page is not a link to itself. */
  href?: string;
  label: string;
}

/**
 * Crumbs are supplied by the page, not derived from the pathname.
 *
 * A URL like /dashboard/resumefn/bugs/8116ff89 cannot tell you that the project
 * is called "resumefn" or that the bug is "Uploads over 5MB silently fail".
 * Only the server component that already loaded those rows knows, so it passes
 * them down rather than the breadcrumb guessing from path segments.
 */
export function PageBreadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex items-center gap-1.5">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li className="flex min-w-0 items-center gap-1.5" key={crumb.label}>
              {index > 0 ? (
                <Icon
                  aria-hidden="true"
                  className="size-3 shrink-0 text-ink-tertiary"
                  icon={ChevronRightIcon}
                />
              ) : null}
              {last || !crumb.href ? (
                <span
                  aria-current="page"
                  className="truncate font-medium text-[13px] text-foreground"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  className="truncate rounded-sm text-[13px] text-ink-subtle transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  href={crumb.href}
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
