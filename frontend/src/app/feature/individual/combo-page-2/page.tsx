// individual04/combo-page-2/page.tsx
'use client';
import { Card } from "@/components/ui/card";
import StatusPieChart from "@/components/feature04/status-pie-chart";
import OsPieChart from "@/components/feature04/os-pie-chart";
import PerformanceGauge from "@/components/feature04/performance-gauge";

export default function ComboPage2() {
  return (
    <div className="w-full h-screen p-6 flex flex-col">
      <div className="flex h-1/2 gap-6">
        {/* Status Pie Chart */}
        <Card className="flex-1 p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-center">Device Status</h2>
          <div className="flex-1 flex items-center justify-center p-2">
            <StatusPieChart />
          </div>
        </Card>

        {/* OS Pie Chart */}
        <Card className="flex-1 p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-center">OS Distribution</h2>
          <div className="flex-1 flex items-center justify-center p-2">
            <OsPieChart />
          </div>
        </Card>

        {/* Performance Gauge - Adjusted positioning */}
        <Card className="flex-1 p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-1 text-center">Performance</h2> {/* Reduced mb-2 to mb-1 */}
          <div className="flex-1 flex items-center justify-center pt-0"> {/* Removed padding-top */}
            <PerformanceGauge />
          </div>
        </Card>
      </div>
    </div>
  );
}