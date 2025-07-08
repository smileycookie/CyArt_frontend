// app/agents/page.tsx

import Header from "@/components/feature03/header"
import AgentTable from "@/components/feature02/agenttable"

export default function AgentsPage() {
  return (
    <>
      <Header />
      <main className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Systems Overview </h1>
        <AgentTable />
      </main>
    </>
  )
}
