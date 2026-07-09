import { SEVERITY_META } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { BugSeverity } from "@/types";

export function SeverityBadge({ severity }: { severity: BugSeverity }) {
  const meta = SEVERITY_META[severity];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-medium text-[11px]",
        meta.className
      )}
    >
      <span className={cn("size-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
}
