// app/systems/page.tsx
"use client"

import { Sidebar } from "@/components/sections/sidebar"

export default function SystemsPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Systems</h1>
        <p className="text-muted-foreground mb-6">
          View and manage connected systems and their status.
        </p>

        {/* Replace this with your actual feature content */}
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">System monitoring data will appear here.</p>
        </div>
      </main>
    </div>
  )
}
