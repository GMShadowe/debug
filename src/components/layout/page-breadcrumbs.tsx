"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  reports: "Reports",
  settings: "Settings",
};

interface Crumb {
  current: boolean;
  href: string;
  label: string;
}

function buildCrumbs(pathname: string): Crumb[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: Crumb[] = [];
  let href = "";

  for (const [index, segment] of segments.entries()) {
    href += `/${segment}`;
    const isLast = index === segments.length - 1;
    // Unknown segment (e.g. a report id) — label it generically.
    const label = SEGMENT_LABELS[segment] ?? "Report";
    crumbs.push({ current: isLast, href, label });
  }

  return crumbs;
}

/**
 * Breadcrumb trail derived from the pathname. Rendered inside the dashboard
 * header next to the sidebar trigger (Supabase / sidebar-08 convention).
 */
export function PageBreadcrumbs() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <div className="contents" key={crumb.href}>
            <BreadcrumbItem
              className={index === 0 ? "hidden md:block" : undefined}
            >
              {crumb.current ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink render={<Link href={crumb.href} />}>
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {crumb.current ? null : (
              <BreadcrumbSeparator
                className={index === 0 ? "hidden md:block" : undefined}
              />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
