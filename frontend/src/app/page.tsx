'use client'

import { useState } from "react"

import { Sidebar } from "@/components/feature04/sidebar"
import Header from "@/components/feature03/header"
import SearchBar from "@/components/feature03/searchbar"
import { DateTimeRangePicker } from "@/components/feature02/DateTimeRangePicker"
import { ChartBarInteractive } from "@/components/feature02/Bargraph"
import { LogEventTable } from "@/components/feature02/LogEventTable"
import { sampleLogEvents } from "@/lib/mock-log-data"

export default function SOCDashboardPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState("00:00")
  const [endTime, setEndTime] = useState("23:59")

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Tabs Header */}
        <Header />

        {/* Inner content */}
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Search + Quick Time */}
          <SearchBar />

          {/* Absolute Range Picker */}
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

          {/* Bar Chart */}
          <ChartBarInteractive />

          {/* Log Table */}
          <LogEventTable logs={sampleLogEvents} />
        </div>
      </div>
    </div>
  )
}
