// 📁 /lib/mock-agents.ts

import { Agent } from "@/types/agents"

export const agents: Agent[] = Array.from({ length: 120 }, (_, i) => {
  const id = String(i + 1).padStart(3, "0")

  const osOptions: { os: string; icon: "windows" | "ubuntu" | "linux" }[] = [
    { os: "Windows 11", icon: "windows" },
    { os: "Ubuntu 22.04", icon: "ubuntu" },
    { os: "Linux Mint", icon: "linux" },
    { os: "Windows Server 2019", icon: "windows" },
  ]

  const { os, icon } = osOptions[i % osOptions.length]

  return {
    id,
    name: `Agent-${id}`,
    ip: `192.168.1.${(i % 255) + 1}`,
    mac: `00:1A:2B:${(i + 10).toString(16).padStart(2, "0")}:4D:${(i + 50).toString(16).padStart(2, "0")}`,
    os,
    osIcon: icon,
    cvss: +(Math.random() * 10).toFixed(1),
    status: Math.random() > 0.4 ? "online" : "offline" // ✅ Status inside the return object
  }
})
