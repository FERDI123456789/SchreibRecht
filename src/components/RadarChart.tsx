"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

export const description = "A radar chart with lines only";

interface RadarMode {
  mode: "schreib" | "lesen";
}

const chartData = [
  { month: "January", desktop: 186, mobile: 160 },
  { month: "February", desktop: 185, mobile: 170 },
  { month: "March", desktop: 207, mobile: 180 },
  { month: "April", desktop: 173, mobile: 160 },
  { month: "May", desktop: 160, mobile: 190 },
  { month: "June", desktop: 174, mobile: 204 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartRadarLinesOnly({ mode }: RadarMode) {
  return (
    <Card>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid radialLines={false} />
            <Radar
              dataKey="desktop"
              fill={`hsl(var(${mode === "schreib" ? "--secondary" : "--primary"}))`}
              fillOpacity={0}
              stroke={`hsl(var(${mode === "schreib" ? "--secondary" : "--primary"}))`}
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
