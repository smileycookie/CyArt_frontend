// app/charttest/page.tsx (or wherever you want to test it)
"use client"

import { ChartPieStacked } from "@/components/feature02/ChartPieStacked" // adjust the path as needed

export default function ChartTestPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Test: Double-Layer Donut Chart</h1>
      <ChartPieStacked />
    </main>
  )
}
