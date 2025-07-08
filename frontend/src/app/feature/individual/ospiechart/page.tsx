'use client';
import { Card } from "@/components/ui/card";
import OsPieChart from "@/components/feature04/os-pie-chart";

export default function OsDistributionPage() {
  return (
    <div className="p-4 h-[300px] w-[400px]"> {/* Standard test container */}
      <Card className="h-full p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-2 text-center">OS Distribution</h2>
        <p className="text-sm text-gray-500 mb-4 text-center">
          Current operating system distribution
        </p>
        <div className="flex-1">
          <OsPieChart />
        </div>
      </Card>
    </div>
  );
}