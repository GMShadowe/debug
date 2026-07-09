"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { TrendPoint } from "@/lib/mock-data";

const chartConfig = {
  reports: {
    // Single-series magnitude — the brand lavender accent.
    color: "var(--primary)",
    label: "Reports",
  },
} satisfies ChartConfig;

function formatDay(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

export function ReportsTrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <ChartContainer className="aspect-auto h-56 w-full" config={chartConfig}>
      <AreaChart data={data} margin={{ left: 4, right: 12, top: 8 }}>
        <defs>
          <linearGradient id="fillReports" x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-reports)"
              stopOpacity={0.35}
            />
            <stop
              offset="95%"
              stopColor="var(--color-reports)"
              stopOpacity={0.02}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="date"
          minTickGap={24}
          tickFormatter={formatDay}
          tickLine={false}
          tickMargin={10}
        />
        <YAxis
          allowDecimals={false}
          axisLine={false}
          tickLine={false}
          tickMargin={8}
          width={28}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent labelFormatter={(label) => formatDay(label)} />
          }
          cursor={{ stroke: "var(--border)" }}
        />
        <Area
          dataKey="reports"
          fill="url(#fillReports)"
          stroke="var(--color-reports)"
          strokeWidth={2}
          type="monotone"
        />
      </AreaChart>
    </ChartContainer>
  );
}
