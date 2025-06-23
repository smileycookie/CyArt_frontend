// components/Header.tsx
'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function Header() {
  return (
    <Card className="border-b rounded-none">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo or Initial */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center text-white text-sm font-bold">
                Cy
              </div>

              {/* View Mode Tabs */}
              <Tabs defaultValue="Unified">
                <TabsList>
                  <TabsTrigger value="Unified">Unified</TabsTrigger>
                  <TabsTrigger value="Individual">Individual</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
