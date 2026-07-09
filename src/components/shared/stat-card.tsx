import { TrendDown, TrendUp } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";
import type { StatCard as StatCardType } from "@/types";

export function StatCard({ stat }: { stat: StatCardType }) {
  const hasDelta = typeof stat.delta === "number";
  const isPositive = (stat.delta ?? 0) >= 0;

  return (
    <div className="card-interactive rounded-xl border border-border bg-card p-5">
      <p className="text-ink-subtle text-xs">{stat.label}</p>
      <div className="mt-3 flex items-end justify-between gap-2">
        <span className="font-heading font-semibold text-2xl text-foreground tabular-nums tracking-tight">
          {stat.value}
        </span>
        {hasDelta ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-medium text-[11px]",
              isPositive
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {isPositive ? (
              <TrendUp className="size-3" weight="bold" />
            ) : (
              <TrendDown className="size-3" weight="bold" />
            )}
            {Math.abs(stat.delta ?? 0)}%
          </span>
        ) : null}
      </div>
      {stat.hint ? (
        <p className="mt-1 text-ink-subtle text-xs">{stat.hint}</p>
      ) : null}
    </div>
  );
}
