"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import {
  SEVERITY_META,
  SEVERITY_ORDER,
  STATUS_META,
  STATUS_ORDER,
} from "@/lib/config";
import type { BugCounts } from "@/lib/data";
import { CheckIcon, ChevronDownIcon, CloseIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * Two orthogonal axes, two distinct controls.
 *
 * Status is single-select and exhaustive, so it gets a segmented control where
 * "All" genuinely means "any status". Severity is an independent dimension, so
 * it gets its own dropdown — rendering them as one flat row of chips implied
 * that picking a severity would deselect a status, which was never true.
 *
 * Search lives in the top bar, not here: it applies to the page, not to this row.
 */
export function BugsFilters({ counts }: { counts: BugCounts }) {
  const pathname = usePathname();
  const params = useSearchParams();

  const status = params.get("status");
  const severity = params.get("severity");
  const anyFilter = Boolean(status || severity || params.get("q"));

  function hrefWith(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    const query = next.toString();
    return query ? `${pathname}?${query}` : pathname;
  }

  const activeSeverity = severity
    ? SEVERITY_META[severity as keyof typeof SEVERITY_META]
    : null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/*
       * Links, not buttons: each segment is a distinct, shareable URL.
       *
       * The row never wraps. On a phone it scrolls horizontally instead —
       * "In progress" was breaking across two lines and pushing the whole
       * control taller than its neighbours.
       */}
      <nav
        aria-label="Filter by status"
        className="-mx-1 flex max-w-full items-center overflow-x-auto rounded-md border border-border p-0.5 px-1 sm:mx-0 sm:inline-flex sm:px-0.5"
      >
        <SegmentLink active={!status} href={hrefWith("status", null)}>
          All
          <Count value={counts.total} />
        </SegmentLink>
        {STATUS_ORDER.map((value) => (
          <SegmentLink
            active={status === value}
            href={hrefWith("status", value)}
            key={value}
          >
            {STATUS_META[value].shortLabel ?? STATUS_META[value].label}
            <Count value={counts.byStatus[value]} />
          </SegmentLink>
        ))}
      </nav>

      {/* Severity — an independent axis, so an independent control. */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              className={cn(
                "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border px-2.5 font-medium text-[12px] transition-colors",
                activeSeverity
                  ? "border-hairline-strong bg-accent text-foreground"
                  : "border-border text-ink-subtle hover:text-foreground"
              )}
              type="button"
            >
              {activeSeverity ? (
                <span
                  aria-hidden="true"
                  className={cn("size-1.5 rounded-full", activeSeverity.dot)}
                />
              ) : null}
              Severity
              {activeSeverity ? (
                <span className="text-ink-muted">{activeSeverity.label}</span>
              ) : null}
              <Icon
                className="size-3 text-ink-tertiary"
                icon={ChevronDownIcon}
              />
            </button>
          }
        />
        <DropdownMenuContent align="start" className="w-44 rounded-md">
          {SEVERITY_ORDER.map((value) => (
            <DropdownMenuItem
              key={value}
              render={
                <Link href={hrefWith("severity", value)} scroll={false} />
              }
            >
              <span
                aria-hidden="true"
                className={cn(
                  "size-1.5 rounded-full",
                  SEVERITY_META[value].dot
                )}
              />
              {SEVERITY_META[value].label}
              {severity === value ? (
                <Icon className="ml-auto size-3.5" icon={CheckIcon} />
              ) : null}
            </DropdownMenuItem>
          ))}
          {severity ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                render={
                  <Link href={hrefWith("severity", null)} scroll={false} />
                }
              >
                <Icon className="size-3.5" icon={CloseIcon} />
                Any severity
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Only offered when there is something to reset. */}
      {anyFilter ? (
        <Link
          className="ml-1 rounded-sm text-[12px] text-ink-subtle underline decoration-hairline-strong underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          href={pathname}
          scroll={false}
        >
          Reset
        </Link>
      ) : null}
    </div>
  );
}

function SegmentLink({
  active,
  href,
  children,
}: {
  active: boolean;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      aria-current={active ? "true" : undefined}
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm px-2.5 font-medium text-[12px] transition-colors",
        active
          ? "bg-accent text-foreground"
          : "text-ink-subtle hover:text-foreground"
      )}
      href={href}
      scroll={false}
    >
      {children}
    </Link>
  );
}

/** Zero is rendered as an empty slot: a "0" badge is noise, not information. */
function Count({ value }: { value: number }) {
  if (value === 0) {
    return null;
  }
  return (
    <span className="text-[11px] text-ink-tertiary tabular-nums">{value}</span>
  );
}
