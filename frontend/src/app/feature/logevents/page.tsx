import { LogEventTable } from "@/components/LogEventTable" // adjust path as needed
import { sampleLogEvents } from "@/lib/mock-log-data" // import your mock data

export default function LogEventsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Log Events</h1>
      <LogEventTable logs={sampleLogEvents} />
    </div>
  )
}
