// \components\feature02\ChartPieStacked.tsx

"use client"

import * as React from "react"
import { Pie, PieChart, Tooltip, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

// ✅ Inner Ring – System Metadata (extended)
const innerData = [
  { name: "Ubuntu 22.04", value: 1, color: "#FFA500", category: "OS" },
  { name: "DMZ", value: 1, color: "#00BFFF", category: "Zone" },
  { name: "Server", value: 1, color: "#9370DB", category: "Host Type" },
  { name: "Log Collection Enabled", value: 1, color: "#32CD32", category: "Log Collection" },
  { name: "EDR/AV Enabled", value: 1, color: "#FF8C00", category: "EDR/AV" },
  { name: "Disk Encryption", value: 1, color: "#4682B4", category: "Encryption" },
  { name: "Hardening Applied", value: 1, color: "#DA70D6", category: "Hardening" },
]

// 🔴 Outer Ring – Risk Indicators
const outerData = [
  { name: "Medium Severity", value: 5, color: "#FFD700", category: "Severity" },
  { name: "High Severity", value: 3, color: "#FF4500", category: "Severity" },
  { name: "Outdated Patches", value: 1, color: "#A9A9A9", category: "Patch" },
  { name: "Many Open Ports", value: 1, color: "#FFC0CB", category: "Open Ports" },
  { name: "AV Enabled", value: 1, color: "#20B2AA", category: "AV Status" },
]

export function ChartPieStacked() {
  return (
    <Card className="flex flex-col items-center">
      <CardHeader className="items-center pb-0">
        <CardTitle>Agent-001: System Overview</CardTitle>
        <CardDescription className="text-center">
          Double-layer donut chart: System Metadata & Security Indicators
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-6">
        {/* Pie Chart */}
        <PieChart width={300} height={300}>
          {/* Outer Ring */}
          <Pie
            data={outerData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={70}
            paddingAngle={2}
            label
          >
            {outerData.map((entry, index) => (
              <Cell key={`outer-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* Inner Ring */}
          <Pie
            data={innerData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            paddingAngle={1}
          >
            {innerData.map((entry, index) => (
              <Cell key={`inner-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>

        {/* Legend – Color Indicators Only */}
        <div className="grid grid-cols-2 gap-2 text-sm text-center font-medium">
          {/* Inner Ring Parameters */}
          {innerData.map((item, idx) => (
            <div key={`legend-inner-${idx}`} className="flex items-center justify-center gap-2">
              <span className="h-3 w-3 rounded-full inline-block" style={{ backgroundColor: item.color }} />
              {item.category}
            </div>
          ))}

          {/* Outer Ring Parameters */}
          {outerData.map((item, idx) => (
            <div key={`legend-outer-${idx}`} className="flex items-center justify-center gap-2">
              <span className="h-3 w-3 rounded-full inline-block" style={{ backgroundColor: item.color }} />
              {item.category}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
