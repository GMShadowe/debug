import { SEVERITY_META } from "@/lib/config";
import type { MOCK_SEVERITY_BREAKDOWN } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Breakdown = typeof MOCK_SEVERITY_BREAKDOWN;

export function SeverityBreakdown({ data }: { data: Breakdown }) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <ul className="space-y-4">
      {data.map((item) => {
        const meta = SEVERITY_META[item.severity];
        const pct = total === 0 ? 0 : Math.round((item.count / total) * 100);
        return (
          <li key={item.severity}>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-ink-muted">
                <span className={cn("size-2 rounded-full", meta.dot)} />
                {meta.label}
              </span>
              <span className="text-foreground tabular-nums">
                {item.count}
                <span className="ml-1.5 text-ink-subtle text-xs">{pct}%</span>
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full", meta.dot)}
                style={{ width: `${pct}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
