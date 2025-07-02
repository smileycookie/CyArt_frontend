// app/agents/[id]/page.tsx

interface AgentDetailPageProps {
  params: {
    id: string
  }
}

export default function AgentDetailPage({ params }: AgentDetailPageProps) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Agent Detail</h1>
      <p className="mt-2">You selected Agent ID: <strong>{params.id}</strong></p>
    </main>
  )
}
