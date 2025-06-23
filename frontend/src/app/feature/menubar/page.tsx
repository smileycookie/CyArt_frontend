// app/page.tsx
"use client"

import { MenuBar } from "@/components/feature04/menu-bar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MenuBar />
      <main className="p-6">
      </main>
    </div>
  )
}
