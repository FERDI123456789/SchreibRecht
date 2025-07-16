"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { date: "2024-04-01", Schreiben: 222, Lesen: 150 },
  { date: "2024-04-02", Schreiben: 97, Lesen: 180 },
  { date: "2024-04-03", Schreiben: 167, Lesen: 120 },
  { date: "2024-04-04", Schreiben: 242, Lesen: 260 },
  { date: "2024-04-05", Schreiben: 373, Lesen: 290 },
  { date: "2024-04-06", Schreiben: 301, Lesen: 340 },
  { date: "2024-04-07", Schreiben: 245, Lesen: 180 },
  { date: "2024-04-08", Schreiben: 409, Lesen: 320 },
  { date: "2024-04-09", Schreiben: 59, Lesen: 110 },
  { date: "2024-04-10", Schreiben: 261, Lesen: 190 },
  { date: "2024-04-11", Schreiben: 327, Lesen: 350 },
  { date: "2024-04-12", Schreiben: 292, Lesen: 210 },
  { date: "2024-04-13", Schreiben: 342, Lesen: 380 },
  { date: "2024-04-14", Schreiben: 137, Lesen: 220 },
  { date: "2024-04-15", Schreiben: 120, Lesen: 170 },
  { date: "2024-04-16", Schreiben: 138, Lesen: 190 },
  { date: "2024-04-17", Schreiben: 446, Lesen: 360 },
  { date: "2024-04-18", Schreiben: 364, Lesen: 410 },
  { date: "2024-04-19", Schreiben: 243, Lesen: 180 },
  { date: "2024-04-20", Schreiben: 89, Lesen: 150 },
  { date: "2024-04-21", Schreiben: 137, Lesen: 200 },
  { date: "2024-04-22", Schreiben: 224, Lesen: 170 },
  { date: "2024-04-23", Schreiben: 138, Lesen: 230 },
  { date: "2024-04-24", Schreiben: 387, Lesen: 290 },
  { date: "2024-04-25", Schreiben: 215, Lesen: 250 },
  { date: "2024-04-26", Schreiben: 75, Lesen: 130 },
  { date: "2024-04-27", Schreiben: 383, Lesen: 420 },
  { date: "2024-04-28", Schreiben: 122, Lesen: 180 },
  { date: "2024-04-29", Schreiben: 315, Lesen: 240 },
  { date: "2024-04-30", Schreiben: 454, Lesen: 380 },
  { date: "2024-05-01", Schreiben: 165, Lesen: 220 },
  { date: "2024-05-02", Schreiben: 293, Lesen: 310 },
  { date: "2024-05-03", Schreiben: 247, Lesen: 190 },
  { date: "2024-05-04", Schreiben: 385, Lesen: 420 },
  { date: "2024-05-05", Schreiben: 481, Lesen: 390 },
  { date: "2024-05-06", Schreiben: 498, Lesen: 520 },
  { date: "2024-05-07", Schreiben: 388, Lesen: 300 },
  { date: "2024-05-08", Schreiben: 149, Lesen: 210 },
  { date: "2024-05-09", Schreiben: 227, Lesen: 180 },
  { date: "2024-05-10", Schreiben: 293, Lesen: 330 },
  { date: "2024-05-11", Schreiben: 335, Lesen: 270 },
  { date: "2024-05-12", Schreiben: 197, Lesen: 240 },
  { date: "2024-05-13", Schreiben: 197, Lesen: 160 },
  { date: "2024-05-14", Schreiben: 448, Lesen: 490 },
  { date: "2024-05-15", Schreiben: 473, Lesen: 380 },
  { date: "2024-05-16", Schreiben: 338, Lesen: 400 },
  { date: "2024-05-17", Schreiben: 499, Lesen: 420 },
  { date: "2024-05-18", Schreiben: 315, Lesen: 350 },
  { date: "2024-05-19", Schreiben: 235, Lesen: 180 },
  { date: "2024-05-20", Schreiben: 177, Lesen: 230 },
  { date: "2024-05-21", Schreiben: 82, Lesen: 140 },
  { date: "2024-05-22", Schreiben: 81, Lesen: 120 },
  { date: "2024-05-23", Schreiben: 252, Lesen: 290 },
  { date: "2024-05-24", Schreiben: 294, Lesen: 220 },
  { date: "2024-05-25", Schreiben: 201, Lesen: 250 },
  { date: "2024-05-26", Schreiben: 213, Lesen: 170 },
  { date: "2024-05-27", Schreiben: 420, Lesen: 460 },
  { date: "2024-05-28", Schreiben: 233, Lesen: 190 },
  { date: "2024-05-29", Schreiben: 78, Lesen: 130 },
  { date: "2024-05-30", Schreiben: 340, Lesen: 280 },
  { date: "2024-05-31", Schreiben: 178, Lesen: 230 },
  { date: "2024-06-01", Schreiben: 178, Lesen: 200 },
  { date: "2024-06-02", Schreiben: 470, Lesen: 410 },
  { date: "2024-06-03", Schreiben: 103, Lesen: 160 },
  { date: "2024-06-04", Schreiben: 439, Lesen: 380 },
  { date: "2024-06-05", Schreiben: 88, Lesen: 140 },
  { date: "2024-06-06", Schreiben: 294, Lesen: 250 },
  { date: "2024-06-07", Schreiben: 323, Lesen: 370 },
  { date: "2024-06-08", Schreiben: 385, Lesen: 320 },
  { date: "2024-06-09", Schreiben: 438, Lesen: 480 },
  { date: "2024-06-10", Schreiben: 155, Lesen: 200 },
  { date: "2024-06-11", Schreiben: 92, Lesen: 150 },
  { date: "2024-06-12", Schreiben: 492, Lesen: 420 },
  { date: "2024-06-13", Schreiben: 81, Lesen: 130 },
  { date: "2024-06-14", Schreiben: 426, Lesen: 380 },
  { date: "2024-06-15", Schreiben: 307, Lesen: 350 },
  { date: "2024-06-16", Schreiben: 371, Lesen: 310 },
  { date: "2024-06-17", Schreiben: 475, Lesen: 520 },
  { date: "2024-06-18", Schreiben: 107, Lesen: 170 },
  { date: "2024-06-19", Schreiben: 341, Lesen: 290 },
  { date: "2024-06-20", Schreiben: 408, Lesen: 450 },
  { date: "2024-06-21", Schreiben: 169, Lesen: 210 },
  { date: "2024-06-22", Schreiben: 317, Lesen: 270 },
  { date: "2024-06-23", Schreiben: 480, Lesen: 730 },
  { date: "2024-06-24", Schreiben: 132, Lesen: 180 },
  { date: "2024-06-25", Schreiben: 141, Lesen: 190 },
  { date: "2024-06-26", Schreiben: 434, Lesen: 380 },
  { date: "2024-06-27", Schreiben: 448, Lesen: 490 },
  { date: "2024-06-28", Schreiben: 149, Lesen: 200 },
  { date: "2024-06-29", Schreiben: 103, Lesen: 160 },
  { date: "2024-06-30", Schreiben: 446, Lesen: 400 },
]

const chartConfig = {
  Richtig: {
    label: "Richtig:",
  },
  Schreiben: {
    label: "Schreiben",
    color: "hsl(var(--chart-1))",
  },
  Lesen: {
    label: "Lesen",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function MyCharteu() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("Schreiben")

  const total = React.useMemo(
    () => ({
      Schreiben: chartData.reduce((acc, curr) => acc + curr.Schreiben, 0),
      Lesen: chartData.reduce((acc, curr) => acc + curr.Lesen, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row ">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Schreiben - Lesen</CardTitle>
        </div>
        <div className="flex">
          {["Schreiben", "Lesen"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t sm:px-4 sm:py-3"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="border-t">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[150px] w-full "
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            
            <XAxis
            className="hidden"
            dataKey="date"
            tick={false}  // Versteckt die Beschriftungen
            tickLine={false}
            axisLine={false}
            tickMargin={1}
            minTickGap={1}
          />
            <ChartTooltip
              content={
                <ChartTooltipContent
                
                  className="w-[150px]"
                  nameKey="Richtig"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
