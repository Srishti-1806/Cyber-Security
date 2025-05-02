"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function SecurityStatusSummary() {
  const [securityStatus, setSecurityStatus] = useState<"secure" | "warning" | "critical">("secure")
  const [statusMessage, setStatusMessage] = useState("All systems secure. No active threats detected.")

  useEffect(() => {
    // Simulate changing security status
    const interval = setInterval(() => {
      const random = Math.random()
      if (random > 0.8) {
        setSecurityStatus("critical")
        setStatusMessage("Critical security threats detected! Immediate action required.")
      } else if (random > 0.5) {
        setSecurityStatus("warning")
        setStatusMessage("Potential security threats detected. Investigation recommended.")
      } else {
        setSecurityStatus("secure")
        setStatusMessage("All systems secure. No active threats detected.")
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card
        className={cn(
          "cyber-border overflow-hidden border-2",
          securityStatus === "secure" && "border-primary/50",
          securityStatus === "warning" && "border-amber-500/50",
          securityStatus === "critical" && "border-destructive/50",
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full",
                securityStatus === "secure" && "bg-primary/20",
                securityStatus === "warning" && "bg-amber-500/20",
                securityStatus === "critical" && "bg-destructive/20",
              )}
            >
              {securityStatus === "secure" && <CheckCircle className="h-6 w-6 text-primary" />}
              {securityStatus === "warning" && <AlertTriangle className="h-6 w-6 text-amber-500" />}
              {securityStatus === "critical" && <Shield className="h-6 w-6 text-destructive" />}
            </div>
            <div>
              <h2
                className={cn(
                  "text-xl font-bold",
                  securityStatus === "secure" && "text-primary",
                  securityStatus === "warning" && "text-amber-500",
                  securityStatus === "critical" && "text-destructive",
                )}
              >
                {securityStatus === "secure" && "System Secure"}
                {securityStatus === "warning" && "Security Warning"}
                {securityStatus === "critical" && "Critical Alert"}
              </h2>
              <p className="text-muted-foreground">{statusMessage}</p>
            </div>

            <div className="ml-auto">
              <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
