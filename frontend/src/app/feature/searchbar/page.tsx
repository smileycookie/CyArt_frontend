'use client'

import { useState } from 'react'
import { Search, Calendar, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SearchBar() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <Input
            type="text"
            placeholder="Search"
            className="w-full pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Quick Select
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {['Last 1 hour', 'Last 12 hours', 'Last 24 hours', 'Last 3 days', 'Last 7 days'].map((label) => (
              <DropdownMenuItem key={label}>{label}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="text-orange-600 hover:bg-orange-50">
              Show dates
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 space-y-4">
            <div className="space-y-2">
              <Label>Absolute date & time</Label>
              <Input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Relative date & time</Label>
              <Input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button className="w-full">Apply</Button>
          </PopoverContent>
        </Popover>

        <Button variant="ghost" className="text-orange-600 hover:bg-orange-50">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>
    </div>
  )
}