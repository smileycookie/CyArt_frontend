"use client"

import { useState } from "react"
import { DateTimeRangePicker } from "@/app/feature/DateTimeRangePicker"

export default function HomePage() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState("00:00")
  const [endTime, setEndTime] = useState("23:59")

  return (
    <main className="min-h-screen p-10 bg-background text-foreground space-y-6">
      <h1 className="text-2xl font-bold">DateTime Range Picker</h1>

      <DateTimeRangePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
    </main>
  )
}
