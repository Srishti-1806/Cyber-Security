"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, ShieldAlert, ShieldCheck, Activity, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MetricCards() {
  const [metrics, setMetrics] = useState({
    activeThreats: 0,
    vulnerabilities: 0,
    securityScore: 0,
    attackAttempts: 0,
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setMetrics({
        activeThreats: 12,
        vulnerabilities: 27,
        securityScore: 78,
        attackAttempts: 342,
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  }

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Card className="cyber-border overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeThreats}</div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center text-destructive">
                <TrendingUp className="mr-1 h-3 w-3" />
                +2 from yesterday
              </span>
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full bg-destructive"
                initial={{ width: 0 }}
                animate={{ width: `${(metrics.activeThreats / 20) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="cyber-border overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
            <ShieldAlert className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.vulnerabilities}</div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center text-amber-500">
                <TrendingDown className="mr-1 h-3 w-3" />
                -5 from last scan
              </span>
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full bg-amber-500"
                initial={{ width: 0 }}
                animate={{ width: `${(metrics.vulnerabilities / 50) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="cyber-border overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.securityScore}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center text-primary">
                <TrendingUp className="mr-1 h-3 w-3" />
                +3% from last week
              </span>
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${metrics.securityScore}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="cyber-border overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attack Attempts</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.attackAttempts}</div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center text-blue-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                +28 in last 24h
              </span>
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${(metrics.attackAttempts / 500) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
