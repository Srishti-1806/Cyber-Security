"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ArrowRight, Shield, Globe, Server, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Threat {
  id: string
  type: string
  source: string
  target: string
  severity: "critical" | "high" | "medium" | "low"
  timestamp: string
  status: "active" | "mitigated" | "investigating"
  icon: "server" | "database" | "globe" | "shield"
}

export function RecentThreats() {
  const [threats, setThreats] = useState<Threat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setThreats([
        {
          id: "threat-001",
          type: "SQL Injection",
          source: "185.143.223.12",
          target: "User Database",
          severity: "critical",
          timestamp: "10 minutes ago",
          status: "active",
          icon: "database",
        },
        {
          id: "threat-002",
          type: "DDoS Attack",
          source: "Multiple Sources",
          target: "Web Server",
          severity: "high",
          timestamp: "25 minutes ago",
          status: "investigating",
          icon: "server",
        },
        {
          id: "threat-003",
          type: "Brute Force",
          source: "103.235.46.108",
          target: "Admin Portal",
          severity: "medium",
          timestamp: "1 hour ago",
          status: "mitigated",
          icon: "shield",
        },
        {
          id: "threat-004",
          type: "Phishing Attempt",
          source: "malicious-email.com",
          target: "Employees",
          severity: "high",
          timestamp: "2 hours ago",
          status: "active",
          icon: "globe",
        },
        {
          id: "threat-005",
          type: "Malware Detected",
          source: "Infected Workstation",
          target: "Internal Network",
          severity: "critical",
          timestamp: "3 hours ago",
          status: "investigating",
          icon: "server",
        },
      ])
      setLoading(false)
    }, 1500)
  }, [])

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case "server":
        return <Server className="h-4 w-4" />
      case "database":
        return <Database className="h-4 w-4" />
      case "globe":
        return <Globe className="h-4 w-4" />
      case "shield":
        return <Shield className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-amber-500 text-white"
      case "low":
        return "bg-primary text-primary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-destructive/20 text-destructive border-destructive/50"
      case "investigating":
        return "bg-amber-500/20 text-amber-500 border-amber-500/50"
      case "mitigated":
        return "bg-primary/20 text-primary border-primary/50"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="cyber-border overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Recent Threats
          </CardTitle>
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            <span>View All</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex h-[300px] items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="space-y-4">
              {threats.map((threat) => (
                <motion.div
                  key={threat.id}
                  className="flex items-center gap-4 rounded-lg border border-border/50 p-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  <Avatar className={`${getSeverityColor(threat.severity)} h-8 w-8`}>
                    <AvatarFallback>{getIconComponent(threat.icon)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{threat.type}</p>
                      <Badge variant="outline" className={getStatusColor(threat.status)}>
                        {threat.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>Source: {threat.source}</span>
                      <ArrowRight className="mx-1 h-3 w-3" />
                      <span>Target: {threat.target}</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">{threat.timestamp}</div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
