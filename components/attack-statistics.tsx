"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart4, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "@/components/ui/chart"

interface ChartData {
  name: string
  malware: number
  ddos: number
  phishing: number
  ransomware: number
}

export function AttackStatistics() {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    change: 0,
    trend: "up" as "up" | "down",
  })

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const chartData: ChartData[] = []

      // Generate data for the last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)

        chartData.push({
          name: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          malware: Math.floor(Math.random() * 50) + 20,
          ddos: Math.floor(Math.random() * 40) + 10,
          phishing: Math.floor(Math.random() * 30) + 15,
          ransomware: Math.floor(Math.random() * 20) + 5,
        })
      }

      setData(chartData)

      // Calculate total and change
      const today = chartData[chartData.length - 1]
      const yesterday = chartData[chartData.length - 2]

      const todayTotal = today.malware + today.ddos + today.phishing + today.ransomware
      const yesterdayTotal = yesterday.malware + yesterday.ddos + yesterday.phishing + yesterday.ransomware

      const change = Math.round(((todayTotal - yesterdayTotal) / yesterdayTotal) * 100)

      setStats({
        total: todayTotal,
        change: Math.abs(change),
        trend: change >= 0 ? "up" : "down",
      })

      setLoading(false)
    }, 1500)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="cyber-border overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <BarChart4 className="h-4 w-4 text-primary" />
            Attack Statistics
          </CardTitle>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Last 7 Days</span>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex h-[300px] items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Attacks (Today)</p>
                  <h3 className="text-2xl font-bold">{stats.total}</h3>
                </div>
                <div
                  className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                    stats.trend === "up" ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"
                  }`}
                >
                  {stats.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  <span>{stats.change}% from yesterday</span>
                </div>
              </div>

              <div className="h-[300px] w-full">
                <Chart>
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="name"
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="malware" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} name="Malware" />
                        <Bar dataKey="ddos" stackId="a" fill="#eab308" radius={[0, 0, 0, 0]} name="DDoS" />
                        <Bar dataKey="phishing" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} name="Phishing" />
                        <Bar dataKey="ransomware" stackId="a" fill="#a855f7" radius={[4, 4, 0, 0]} name="Ransomware" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-6">
                    <ChartLegend>
                      <ChartLegendItem name="Malware" color="#ef4444" />
                      <ChartLegendItem name="DDoS" color="#eab308" />
                      <ChartLegendItem name="Phishing" color="#3b82f6" />
                      <ChartLegendItem name="Ransomware" color="#a855f7" />
                    </ChartLegend>
                  </div>
                </Chart>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
