// 📁 /lib/get-agent-by-id.ts
import { agents } from "@/lib/mock-agents"

export function getAgentById(id: string) {
  return agents.find((agent) => agent.id === id)
}
