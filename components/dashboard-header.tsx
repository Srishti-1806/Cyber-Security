"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { NotificationSystem } from "@/components/notification-system"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface DashboardHeaderProps {
  heading: string
  description?: string
}

export function DashboardHeader({ heading, description }: DashboardHeaderProps) {
  const pathname = usePathname()

  const navItems = [
    { name: "Overview", href: "/" },
    { name: "Vulnerabilities", href: "/vulnerabilities" },
    { name: "Attack Map", href: "/attack-map" },
    { name: "CVE Database", href: "/cve-database" },
    { name: "Information", href: "/information" },
  ]

  return (
    <div className="flex flex-col gap-4 pb-4 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <motion.h1
            className="text-2xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {heading}
          </motion.h1>
          {description && (
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {description}
            </motion.p>
          )}
        </div>
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] border-border bg-background pl-8 md:w-[260px]"
            />
          </div>
          <div className="z-50">
            <NotificationSystem />
          </div>
          <Button className="hidden gap-2 sm:flex">
            <Shield className="h-4 w-4" />
            <span>Run Scan</span>
          </Button>
        </motion.div>
      </div>

      {/* Threat Information Navigation */}
      <div className="mt-2 border-b border-border/50">
        <nav className="-mb-px flex space-x-4 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`whitespace-nowrap px-1 py-2 text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:border-b-2 hover:border-primary/50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
