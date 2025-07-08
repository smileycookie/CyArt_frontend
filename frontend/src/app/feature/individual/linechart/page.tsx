"use client"

import { DeviceEventsLineChart } from "@/components/feature04/DeviceEventsLineChart";

export default function LineChartPage() {
  return (
    <div className="relative w-full h-full p-4">
      <DeviceEventsLineChart isStandalone={true} />
    </div>
  );
}