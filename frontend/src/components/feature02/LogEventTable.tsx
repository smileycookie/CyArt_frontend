"use client"

import { useState } from "react"
import { LogEvent } from "@/types/log-event"
import { ChevronDown, ChevronRight } from "lucide-react"

interface LogEventTableProps {
  logs: LogEvent[]
}

export function LogEventTable({ logs }: LogEventTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const toggleRow = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id))
  }

  return (
    <div className="border rounded-md overflow-auto max-h-[600px]">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted text-muted-foreground sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2 w-10"></th>
            <th className="px-4 py-2">Timestamp</th>
            <th className="px-4 py-2">Agent</th>
            <th className="px-4 py-2">Rule ID</th>
            <th className="px-4 py-2">Level</th>
            <th className="px-4 py-2">Decoder</th>
            <th className="px-4 py-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <>
              <tr
                key={log.id}
                className="border-b hover:bg-accent cursor-pointer"
                onClick={() => toggleRow(log.id)}
              >
                <td className="px-4">
                  {expandedRow === log.id ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </td>
                <td className="px-4 py-2">{log.timestamp}</td>
                <td className="px-4 py-2">{log.agentName}</td>
                <td className="px-4 py-2">{log.ruleId}</td>
                <td className="px-4 py-2 font-semibold text-orange-600">
                  {log.level}
                </td>
                <td className="px-4 py-2">{log.decoder}</td>
                <td className="px-4 py-2">{log.location}</td>
              </tr>

              {expandedRow === log.id && (
                <tr className="bg-muted">
                  <td colSpan={7} className="px-4 py-3 border-b">
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Description:</strong> {log.description}
                      </p>
                      <p>
                        <strong>Groups:</strong>{" "}
                        {log.groups?.join(", ") || "N/A"}
                      </p>
                      <p>
                        <strong>HIPAA:</strong>{" "}
                        {log.hipaa?.join(", ") || "N/A"}
                      </p>
                      <p>
                        <strong>PCI-DSS:</strong>{" "}
                        {log.pci_dss?.join(", ") || "N/A"}
                      </p>
                      <p>
                        <strong>Full Log:</strong>{" "}
                        <code className="block bg-background p-2 rounded text-xs whitespace-pre-wrap">
                          {log.fullLog}
                        </code>
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}
