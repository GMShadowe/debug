import { STATUS_META } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { BugStatus } from "@/types";

export function StatusBadge({ status }: { status: BugStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 font-medium text-[11px]",
        meta.className
      )}
    >
      {meta.label}
    </span>
  );
}
