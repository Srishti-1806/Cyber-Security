"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Bug, Globe, Home, Info, MessageSquare, ShieldAlert } from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}

export function DashboardSidebar({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent" : "transparent",
            "justify-start",
          )}
        >
          <item.icon className={cn("mr-2 h-4 w-4")} />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}

export const dashboardNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Vulnerabilities",
    href: "/vulnerabilities",
    icon: Bug,
  },
  {
    title: "Attack Map",
    href: "/attack-map",
    icon: Globe,
  },
  {
    title: "CVE Database",
    href: "/cve-database",
    icon: ShieldAlert,
  },
  {
    title: "Security Info",
    href: "/information",
    icon: Info,
  },
  {
    title: "AI Assistant",
    href: "/chat",
    icon: MessageSquare,
  },
]
