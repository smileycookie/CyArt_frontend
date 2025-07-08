// \\components\feature02\Bargraph.tsx

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
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type TimeRange = "1h" | "24h" | "7d" | "30d" | "90d"

const chartData = [
  { date: "2024-06-30", windows: 420, mac: 150, linux: 90, android: 160 },
  { date: "2024-06-29", windows: 360, mac: 140, linux: 100, android: 120 },
  { date: "2024-06-28", windows: 390, mac: 180, linux: 110, android: 140 },
  { date: "2024-06-27", windows: 460, mac: 190, linux: 120, android: 150 },
  { date: "2024-06-26", windows: 430, mac: 160, linux: 130, android: 170 },
  { date: "2024-06-25", windows: 410, mac: 170, linux: 140, android: 180 },
  { date: "2024-06-24", windows: 370, mac: 160, linux: 100, android: 150 },
  { date: "2024-06-23", windows: 350, mac: 155, linux: 95, android: 145 },
  { date: "2024-06-22", windows: 340, mac: 150, linux: 90, android: 140 },
  { date: "2024-06-21", windows: 360, mac: 145, linux: 100, android: 130 },
  { date: "2024-06-20", windows: 370, mac: 130, linux: 105, android: 135 },
  { date: "2024-06-19", windows: 365, mac: 135, linux: 95, android: 140 },
  { date: "2024-06-18", windows: 375, mac: 140, linux: 100, android: 145 },
  { date: "2024-06-17", windows: 380, mac: 145, linux: 90, android: 150 },
  { date: "2024-06-16", windows: 390, mac: 150, linux: 100, android: 160 },
  { date: "2024-06-15", windows: 400, mac: 155, linux: 95, android: 170 },
  { date: "2024-06-14", windows: 410, mac: 160, linux: 90, android: 180 },
  { date: "2024-06-13", windows: 420, mac: 165, linux: 85, android: 190 },
  { date: "2024-06-12", windows: 430, mac: 170, linux: 80, android: 200 },
  { date: "2024-06-11", windows: 440, mac: 175, linux: 75, android: 210 },
  { date: "2024-06-10", windows: 450, mac: 180, linux: 70, android: 220 },
  { date: "2024-06-09", windows: 460, mac: 185, linux: 65, android: 230 },
  { date: "2024-06-08", windows: 470, mac: 190, linux: 60, android: 240 },
  { date: "2024-06-07", windows: 480, mac: 195, linux: 55, android: 250 },
  { date: "2024-06-06", windows: 490, mac: 200, linux: 50, android: 260 },
  { date: "2024-06-05", windows: 500, mac: 205, linux: 45, android: 270 },
  { date: "2024-06-04", windows: 510, mac: 210, linux: 40, android: 280 },
  { date: "2024-06-03", windows: 520, mac: 215, linux: 35, android: 290 },
  { date: "2024-06-02", windows: 530, mac: 220, linux: 30, android: 300 },
  { date: "2024-06-01", windows: 540, mac: 225, linux: 25, android: 310 },
  { date: "2024-05-31", windows: 550, mac: 230, linux: 20, android: 320 },
  { date: "2024-05-30", windows: 560, mac: 235, linux: 25, android: 300 },
  { date: "2024-05-29", windows: 570, mac: 240, linux: 30, android: 280 },
  { date: "2024-05-28", windows: 580, mac: 245, linux: 35, android: 260 },
  { date: "2024-05-27", windows: 590, mac: 250, linux: 40, android: 240 },
  { date: "2024-05-26", windows: 600, mac: 255, linux: 45, android: 220 },
  { date: "2024-05-25", windows: 610, mac: 260, linux: 50, android: 200 },
  { date: "2024-05-24", windows: 620, mac: 265, linux: 55, android: 180 },
  { date: "2024-05-23", windows: 630, mac: 270, linux: 60, android: 160 },
  { date: "2024-05-22", windows: 640, mac: 275, linux: 65, android: 140 },
  { date: "2024-05-21", windows: 650, mac: 280, linux: 70, android: 120 },
  { date: "2024-05-20", windows: 660, mac: 285, linux: 75, android: 100 },
  { date: "2024-05-19", windows: 670, mac: 290, linux: 80, android: 80 },
  { date: "2024-05-18", windows: 680, mac: 295, linux: 85, android: 60 },
  { date: "2024-05-17", windows: 690, mac: 300, linux: 90, android: 40 },
  { date: "2024-05-16", windows: 700, mac: 305, linux: 95, android: 20 },
  { date: "2024-05-15", windows: 710, mac: 310, linux: 100, android: 10 },
]


const chartConfig = {
  windows: { label: "Windows", color: "var(--chart-1)" },
  mac: { label: "Mac", color: "var(--chart-2)" },
  linux: { label: "Linux", color: "var(--chart-3)" },
  android: { label: "Android", color: "var(--chart-4)" },
} satisfies ChartConfig

const timeLabel: Record<TimeRange, string> = {
  "1h": "Last hour",
  "24h": "Last 24 hours",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 3 months",
}

export function ChartBarInteractive() {
  const [timeRange, setTimeRange] = React.useState<TimeRange>("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") daysToSubtract = 30
    else if (timeRange === "7d") daysToSubtract = 7
    else if (timeRange === "24h") daysToSubtract = 1
    else if (timeRange === "1h") daysToSubtract = 1 // Just for mock structure

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total users by OS for {timeLabel[timeRange]}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
          <SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex" aria-label="Select time range">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="1h">Last hour</SelectItem>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Bar dataKey="windows" stackId="a" fill="var(--color-windows)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="mac" stackId="a" fill="var(--color-mac)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="linux" stackId="a" fill="var(--color-linux)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="android" stackId="a" fill="var(--color-android)" radius={[0, 0, 4, 4]} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
