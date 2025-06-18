"use client"

import { ChevronDown, ChevronRight, Menu, LayoutDashboard, Activity, ShieldAlert, Server, FileSearch, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"

type SectionKeys = 'monitoring' | 'security' | 'systems'

// SidebarItem component
const SidebarItem = ({
  children,
  icon,
  isCollapsed,
  href = "#",
  className
}: {
  children: React.ReactNode
  icon: React.ReactNode
  isCollapsed: boolean
  href?: string
  className?: string
}) => {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full justify-start text-white hover:bg-blue-800",
        isCollapsed ? "justify-center px-0" : "justify-start",
        className
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-2">
          {icon}
          {!isCollapsed && <span>{children}</span>}
        </div>
      </Link>
    </Button>
  )
}

// SidebarSection component
const SidebarSection = ({
  title,
  icon,
  children,
  isCollapsed,
  isOpen,
  onToggle
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  isCollapsed: boolean
  isOpen: boolean
  onToggle: () => void
}) => {
  return (
    <div className="space-y-1">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start text-white hover:bg-blue-800",
          isCollapsed ? "justify-center px-0" : "justify-between"
        )}
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          {icon}
          {!isCollapsed && <span>{title}</span>}
        </div>
        {!isCollapsed && (
          isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
        )}
      </Button>
      {isOpen && !isCollapsed && (
        <div className="ml-6 space-y-1">
          {children}
        </div>
      )}
    </div>
  )
}

// Main Sidebar component
export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openSections, setOpenSections] = useState<Record<SectionKeys, boolean>>({
    monitoring: true,
    security: false,
    systems: false
  })

  const toggleSection = (section: SectionKeys) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className={cn(
      "flex flex-col border-r bg-[#1e3a8a] text-white transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h1 className="text-xl font-bold">Security Monitor</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-blue-800"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          <SidebarSection
            title="Monitoring"
            icon={<Activity className="h-4 w-4" />}
            isCollapsed={isCollapsed}
            isOpen={openSections.monitoring}
            onToggle={() => toggleSection('monitoring')}
          >
            <SidebarItem icon={<FileSearch className="h-4 w-4" />} isCollapsed={isCollapsed}>
              Log Explorer
            </SidebarItem>
            <SidebarItem icon={<Server className="h-4 w-4" />} isCollapsed={isCollapsed}>
              Systems
            </SidebarItem>
          </SidebarSection>
        </div>
      </ScrollArea>
    </div>
  )
}