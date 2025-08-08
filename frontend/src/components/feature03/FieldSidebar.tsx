// frontend\src\components\feature03\FieldSidebar.tsx
'use client'

import { useState } from 'react'
import { Search, RefreshCw, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'

const popularFields = [
  'timestamp',
  'error_code',
  'user_id',
  'ip_address',
  'status_code'
]

const allAvailableFields = [
  'message',
  'level',
  'service',
  'host',
  'container_id',
  'duration_ms',
  'method',
  'path',
  ...popularFields
]

export default function FieldSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedFields, setSelectedFields] = useState(['_source'])
  const [availableFields, setAvailableFields] = useState(allAvailableFields)
  const [openSections, setOpenSections] = useState({
    selected: true,
    popular: true,
    available: true
  })

  const toggleSection = (section: 'selected' | 'popular' | 'available') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const moveToAvailable = (field: string) => {
    setSelectedFields(prev => prev.filter(f => f !== field))
    if (!availableFields.includes(field)) {
      setAvailableFields(prev => [...prev, field])
    }
  }

  const moveToSelected = (field: string) => {
    setAvailableFields(prev => prev.filter(f => f !== field))
    if (!selectedFields.includes(field)) {
      setSelectedFields(prev => [...prev, field])
    }
  }

  if (isCollapsed) {
    return (
      <div className="w-16 bg-white border-r border-gray-200 h-screen flex flex-col items-center py-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="mb-4"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-72 bg-white border-r border-gray-200 h-screen flex flex-col overflow-hidden">
      {/* Top Controls */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(true)}
          >
            <ChevronDown className="h-4 w-4 rotate-90" />
          </Button>
          <Button variant="ghost" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
          <Input
            placeholder="Search fields"
            className="pl-10"
          />
        </div>
      </div>

      {/* Scrollable Section */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Selected Fields */}
          <Collapsible
            open={openSections.selected}
            onOpenChange={() => toggleSection('selected')}
            className="mb-4"
          >
            <CollapsibleTrigger className="flex items-center text-sm font-medium text-gray-700 mb-2 w-full">
              {openSections.selected ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              Selected fields ({selectedFields.length})
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-5 space-y-1">
              {selectedFields.map((field) => (
                <div 
                  key={field} 
                  className="flex items-center text-sm text-gray-600 py-1 hover:bg-gray-50 rounded px-2 cursor-pointer"
                  onClick={() => moveToAvailable(field)}
                >
                  <span className="w-4 h-4 bg-gray-300 rounded mr-2"></span>
                  {field}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Popular Fields */}
          <Collapsible
            open={openSections.popular}
            onOpenChange={() => toggleSection('popular')}
            className="mb-4"
          >
            <CollapsibleTrigger className="flex items-center text-sm font-medium text-gray-700 mb-2 w-full">
              {openSections.popular ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              Popular fields
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-5 space-y-1">
              {popularFields.map((field) => (
                <div 
                  key={field} 
                  className="flex items-center text-sm text-gray-600 py-1 hover:bg-gray-50 rounded px-2 cursor-pointer"
                  onClick={() => moveToSelected(field)}
                >
                  <span className="w-4 h-4 bg-blue-200 rounded mr-2"></span>
                  {field}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Available Fields */}
          <Collapsible
            open={openSections.available}
            onOpenChange={() => toggleSection('available')}
          >
            <CollapsibleTrigger className="flex items-center text-sm font-medium text-gray-700 mb-2 w-full">
              {openSections.available ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              Available fields ({availableFields.length})
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-5 space-y-1">
              {availableFields.map((field) => (
                <div 
                  key={field} 
                  className="flex items-center text-sm text-gray-600 py-1 hover:bg-gray-50 rounded px-2 cursor-pointer"
                  onClick={() => moveToSelected(field)}
                >
                  <span className="w-4 h-4 bg-gray-200 rounded mr-2"></span>
                  {field}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>
    </div>
  )
}
