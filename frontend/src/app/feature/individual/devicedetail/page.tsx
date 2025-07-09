import DeviceDetail from "@/components/feature03/deviceDetails"
import { DeviceEventsLineChart } from "@/components/feature04/DeviceEventsLineChart";
import LayerPieChart from "@/components/feature04/layer-pie-chart";

export default function AgentsPage() {
  return (
    <main className="p-1 mb-4">
      <DeviceDetail/>
       <div className="w-full px-4">
        <div className="flex h-[50vh] gap-4">
          <div className="w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <LayerPieChart />
          </div>
          <div className="w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <DeviceEventsLineChart />
          </div>
        </div>
      </div>
    </main>
  )
}