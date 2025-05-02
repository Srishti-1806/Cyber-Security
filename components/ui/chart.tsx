import type React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Legend, LegendItem } from "@/components/ui/legend"
import {
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid as RechartsCartesianGrid,
  ResponsiveContainer as RechartsResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie as RechartsPie,
  Cell as RechartsCell,
} from "recharts"

export const Chart = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <div className="w-full">{children}</div>
    </TooltipProvider>
  )
}

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>
}

export const ChartTooltip = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent />
    </Tooltip>
  )
}

export const ChartTooltipContent = () => {
  return <TooltipContent className="text-xs">Tooltip Content</TooltipContent>
}

export const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return <Legend>{children}</Legend>
}

export const ChartLegendItem = ({ name, color, value }: { name: string; color: string; value?: string }) => {
  return <LegendItem name={name} color={color} value={value} />
}

// Export recharts components with our naming convention
export const BarChart = RechartsBarChart
export const Bar = RechartsBar
export const XAxis = RechartsXAxis
export const YAxis = RechartsYAxis
export const CartesianGrid = RechartsCartesianGrid
export const ResponsiveContainer = RechartsResponsiveContainer
export const PieChart = RechartsPieChart
export const Pie = RechartsPie
export const Cell = RechartsCell
