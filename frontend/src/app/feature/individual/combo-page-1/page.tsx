"use client"

import { DeviceEventsLineChart } from "@/components/feature04/DeviceEventsLineChart";
import LayerPieChart from "@/components/feature04/layer-pie-chart";

export default function ComboPage1() {
  return (
    <div className="w-full h-screen p-4">
      <div className="flex h-[50vh] gap-4">
        {/* Pie Chart */}
        <div className="w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <LayerPieChart />
        </div>

        {/* Line Chart - simplified container */}
        <div className="w-1/2">
          <DeviceEventsLineChart />
        </div>
      </div>
      <div className="h-[50vh]"></div>
    </div>
  ); 
}