"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { updateBugSeverity, updateBugStatus } from "@/app/actions/bugs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import {
  SEVERITY_META,
  SEVERITY_ORDER,
  STATUS_META,
  STATUS_ORDER,
} from "@/lib/config";
import { CheckIcon, ChevronDownIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { BugReport, BugSeverity, BugStatus } from "@/types";

/**
 * One control per axis, not eight buttons.
 *
 * The labels read "Set status", not "Status": next to a value like "Closed", a
 * bare noun looks like a caption for read-only data, and the reader has no
 * reason to try clicking it.
 *
 * A row of segmented buttons makes the reader scan four labels to learn one
 * fact — the current value. A menu states it, and still costs a single click to
 * change. Triage happens often, so there is no confirm step and no save button:
 * the transition reconciles against the server action.
 */
export function TriageRail({ bug }: { bug: BugReport }) {
  const [pending, startTransition] = useTransition();

  function setStatus(next: BugStatus) {
    startTransition(async () => {
      const result = await updateBugStatus(bug.id, next);
      if ("error" in result) {
        toast.error(result.error);
      }
    });
  }

  function setSeverity(next: BugSeverity) {
    startTransition(async () => {
      const result = await updateBugSeverity(bug.id, next);
      if ("error" in result) {
        toast.error(result.error);
      }
    });
  }

  const status = STATUS_META[bug.status];
  const severity = SEVERITY_META[bug.severity];

  return (
    <div
      className={cn("space-y-4", pending && "pointer-events-none opacity-60")}
    >
      <Field label="Set status">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<SelectTrigger aria-label="Set status" />}
          >
            <span
              className={cn(
                "inline-flex h-5 items-center rounded-sm border px-1.5 font-medium text-[11px]",
                status.className
              )}
            >
              {status.label}
            </span>
            <Icon
              className="ml-auto size-3 text-ink-tertiary"
              icon={ChevronDownIcon}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44 rounded-md">
            {STATUS_ORDER.map((value) => (
              <DropdownMenuItem key={value} onClick={() => setStatus(value)}>
                {STATUS_META[value].label}
                {bug.status === value ? (
                  <Icon className="ml-auto size-3.5" icon={CheckIcon} />
                ) : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </Field>

      <Field label="Set severity">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<SelectTrigger aria-label="Set severity" />}
          >
            <span
              aria-hidden="true"
              className={cn("size-1.5 rounded-full", severity.dot)}
            />
            <span className="text-[13px] text-foreground">
              {severity.label}
            </span>
            <Icon
              className="ml-auto size-3 text-ink-tertiary"
              icon={ChevronDownIcon}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44 rounded-md">
            {SEVERITY_ORDER.map((value) => (
              <DropdownMenuItem key={value} onClick={() => setSeverity(value)}>
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 rounded-full",
                    SEVERITY_META[value].dot
                  )}
                />
                {SEVERITY_META[value].label}
                {bug.severity === value ? (
                  <Icon className="ml-auto size-3.5" icon={CheckIcon} />
                ) : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </Field>
    </div>
  );
}

function SelectTrigger(props: React.ComponentProps<"button">) {
  return (
    <button
      className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-2.5 text-left transition-colors hover:border-hairline-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
      type="button"
      {...props}
    />
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 font-medium text-[11px] text-ink-tertiary">
        {label}
      </p>
      {children}
    </div>
  );
}
