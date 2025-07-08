'use client';
import { Card } from "@/components/ui/card";
import LayerPieChart from "@/components/feature04/layer-pie-chart";

export default function LayerPieChartPage() {
  return (
    <div className="p-2 h-screen flex justify-start items-start">
      <Card className="h-[50vh] w-[50vw] p-3 flex flex-col">
        <h2 className="text-md font-bold mb-2 text-center">Device Behavior Analysis</h2>
        <div className="flex-1 min-h-0">
          <LayerPieChart />
        </div>
      </Card>
    </div>
  );
}