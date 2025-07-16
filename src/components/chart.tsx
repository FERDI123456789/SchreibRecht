"use client"
export const prender = true
import * as React from "react"
import { Area, AreaChart } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

const initialChartData = [
  { date: "2024-04-16", Lesen: 200, Schreiben: 250 },
  { date: "2024-04-17", Lesen: 220, Schreiben: 270 },
  { date: "2024-04-18", Lesen: 240, Schreiben: 290 },
  { date: "2024-04-19", Lesen: 260, Schreiben: 310 },
  { date: "2024-04-20", Lesen: 280, Schreiben: 330 },
  { date: "2024-04-18", Lesen: 300, Schreiben: 350 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Lesen: {
    label: "Lesen",
    color: "hsl(var(--chart-1))",
  },
  Schreiben: {
    label: "Schreiben",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function MyChart() {
  const [chartData, setChartData] = React.useState(initialChartData)
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[400px] w-full p-0 m-0"
    >
      <AreaChart data={filteredData}>
        <defs>
          <linearGradient id="fillLesen" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-Lesen)"
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor="var(--color-Lesen)"
              stopOpacity={1}
            />
          </linearGradient>
          <linearGradient id="fillSchreiben" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="100%"
              stopColor="var(--color-Schreiben)"
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor="var(--color-Schreiben)"
              stopOpacity={1}
            />
          </linearGradient>
        </defs>
        
        <Area
          dataKey="Schreiben"
          type="natural"
          fill="url(#fillSchreiben)"
          stroke="var(--color-Schreiben)"
          stackId="a"
        />
        <Area
          dataKey="Lesen"
          type="natural"
          fill="url(#fillLesen)"
          stroke="var(--color-Lesen)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}
