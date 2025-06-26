"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import Link from "next/link"
export default function Header() {
  return (
    <Card className="border-b rounded-none sticky top-0 z-10">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Tabs */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center text-white text-sm font-bold">
                Cy
              </div>
              <Tabs defaultValue="Unified">
                <TabsList>
                  <TabsTrigger value="Unified">Unified</TabsTrigger>
                  <TabsTrigger value="Individual">Individual</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          {/* Right side - Navigation Links and User Menu */}
          <div className="flex items-center gap-6">
            {/* Navigation Links - Hidden on mobile */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                href="/dashboard"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="/logs"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Log Monitoring
              </Link>
              <Link
                href="/security"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Security Events
              </Link>
            </nav>
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Mobile Navigation - Shows on small screens below */}
        <nav className="mt-2 flex md:hidden items-center gap-4 text-sm font-medium">
          <Link
            href="/dashboard"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/logs"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Logs
          </Link>
          <Link
            href="/security"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Security
          </Link>
        </nav>
      </div>
    </Card>
  )
}