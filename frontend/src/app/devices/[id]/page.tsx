// C:\Users\rico\Documents\CyArt_frontend\frontend\src\app\devices\[id]\page.tsx
// src/app/devices/[id]/page.tsx
import AgentDetailView from "@/components/feature03/deviceDetails"
import { agents } from "@/lib/mock-agents"
import { notFound } from "next/navigation"
import { DeviceEventsLineChart } from "@/components/feature04/DeviceEventsLineChart"
import LayerPieChart from "@/components/feature04/layer-pie-chart"

interface Params {
  params: { id: string }
}

export default function DeviceDetailPage({ params }: Params) {
  const { id } = params
  const agent = agents.find((a) => a.id === id)
  if (!agent) return notFound()

  return (
    <main className="p-1 mb-4">
          <AgentDetailView agent={agent} />
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