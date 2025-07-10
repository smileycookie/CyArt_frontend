// C:\Users\rico\Documents\CyArt_frontend\frontend\src\app\devices\[id]\page.tsx
// src/app/devices/[id]/page.tsx
import AgentDetailView from "@/components/feature03/deviceDetails"
import { agents } from "@/lib/mock-agents"
import { notFound } from "next/navigation"

interface Params {
  params: { id: string }
}

export default function DeviceDetailPage({ params }: Params) {
  const { id } = params

  // Just for route validation, even if not passing data
  const agent = agents.find((a) => a.id === id)
  if (!agent) return notFound()

  // Show static mock UI
  return <AgentDetailView />
}
