// \frontend\src\app\page.tsx
'use client'

import { useState } from "react"
import Sidebar from "@/components/feature03/FieldSidebar"
import Header from "@/components/feature03/header"
import SearchBar from "@/components/feature03/searchbar"
import { ChartBarInteractive } from "@/components/feature02/Bargraph"
import { LogEventTable } from "@/components/feature02/LogEventTable"
import { sampleLogEvents } from "@/lib/mock-log-data"

export default function SOCDashboardPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState("00:00")
  const [endTime, setEndTime] = useState("23:59")

  return (
    <div className="flex flex-col h-screen">
      {/* Top Header - spans full width */}
      <Header />
      
      {/* Content area with sidebar and main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="overflow-y-auto">
          <Sidebar />
        </div>
        
        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Inner content */}
          <div className="p-4 space-y-6 overflow-y-auto">
            {/* Search + Quick Time */}
            <SearchBar />
            {/* Bar Chart */}
            <ChartBarInteractive />
            
            {/* Log Table */}
            <LogEventTable logs={sampleLogEvents} />
          </div>
        </div>
      </div>
    </div>
  )
}