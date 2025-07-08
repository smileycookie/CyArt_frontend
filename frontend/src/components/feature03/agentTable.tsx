// frontend\src\components\feature03\agentTable.tsx
'use client'

import { useState, useRef } from "react"
import { agents } from "@/lib/mock-agents"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const getCVSSLabel = (score: number) => {
  if (score >= 9.0) return "Critical"
  if (score >= 7.0) return "High"
  if (score >= 4.0) return "Medium"
  return "Low"
}

const getCVSSBadge = (score: number) => {
  const label = getCVSSLabel(score) as "Critical" | "High" | "Medium" | "Low"
  const colorMap: Record<typeof label, string> = {
    Critical: "bg-red-700 text-white",
    High: "bg-red-500 text-white",
    Medium: "bg-yellow-400 text-black",
    Low: "bg-green-500 text-white",
  }
  return <Badge className={colorMap[label]}>{label}</Badge>
}

const exportToCSV = (data: typeof agents) => {
  const header = ["ID", "Name", "IP", "MAC", "OS", "CVSS", "Status"]
  const rows = data.map((a) => [
    a.id,
    a.name,
    a.ip,
    a.mac,
    a.os,
    getCVSSLabel(a.cvss),
    a.status,
  ])
  const csvContent = [header, ...rows].map((r) => r.join(",")).join("\n")
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", "agents.csv")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Function to navigate to agent details on same page
const navigateToAgentDetails = (agentId: string) => {
  // For Next.js routing, you would use:
  // router.push(`/agents/${agentId}`)
  
  // For demonstration, we'll just log the navigation
  console.log(`Navigating to agent details for: ${agentId}`)
  
  // You can also trigger a state change to show the detail view
  // For example, if you have a state management system or parent component
  // that handles showing/hiding different views
}

export default function AgentTable() {
  const [search, setSearch] = useState("")
  const [cvssFilter, setCvssFilter] = useState<"all" | "low" | "medium" | "high" | "critical">("all")

  const filtered = agents.filter((agent) => {
    const matchSearch =
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.ip.includes(search) ||
      agent.mac.includes(search) ||
      agent.os.toLowerCase().includes(search.toLowerCase())
    const label = getCVSSLabel(agent.cvss).toLowerCase()
    const matchCVSS = cvssFilter === "all" || label === cvssFilter
    return matchSearch && matchCVSS
  })

  const handleRowClick = (agent: typeof agents[0]) => {
    // Navigate to agent details on same page
    navigateToAgentDetails(agent.id)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search size={18} />
          <Input
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <select
            value={cvssFilter}
            onChange={(e) => setCvssFilter(e.target.value as any)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="all">All CVSS</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <Button onClick={() => exportToCSV(filtered)}>Export CSV</Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border max-h-[400px] overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-muted">
            <tr>
              <th className="px-2 py-2 text-left">ID</th>
              <th className="px-2 py-2 text-left">Name</th>
              <th className="px-2 py-2 text-left">IP</th>
              <th className="px-2 py-2 text-left">MAC</th>
              <th className="px-2 py-2 text-left">OS</th>
              <th className="px-2 py-2 text-left">CVSS</th>
              <th className="px-2 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((agent) => (
              <tr
                key={agent.id}
                onClick={() => handleRowClick(agent)}
                className="hover:bg-muted cursor-pointer transition"
                title="Click to view agent details"
              >
                <td className="px-2 py-2">{agent.id}</td>
                <td className="px-2 py-2">{agent.name}</td>
                <td className="px-2 py-2">{agent.ip}</td>
                <td className="px-2 py-2">{agent.mac}</td>
                <td className="px-2 py-2">
                  <span className="inline-flex items-center gap-1">
                    {agent.osIcon === "windows" && "🪟"}
                    {agent.osIcon === "linux" && "🐧"}
                    {agent.osIcon === "ubuntu" && "🟠"}
                    {agent.os}
                  </span>
                </td>
                <td className="px-2 py-2">{getCVSSBadge(agent.cvss)}</td>
                <td className="px-2 py-2">
                  <Badge className={agent.status === "online" ? "bg-green-500" : "bg-red-500"}>
                    {agent.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}