import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function Sidebar() {
  return (
    <Card className="w-72 border-r rounded-none h-screen overflow-y-auto">
      <div className="p-4">
        <div className="mb-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              type="text"
              placeholder="Search fields"
              className="w-full pl-10"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}