import * as React from "react"
import { cn } from "@/lib/utils"

export interface LegendProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Legend = React.forwardRef<HTMLDivElement, LegendProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex flex-wrap items-center gap-4", className)} {...props} />
})
Legend.displayName = "Legend"

export interface LegendItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  color: string
  value?: string
}

export const LegendItem = React.forwardRef<HTMLDivElement, LegendItemProps>(
  ({ className, name, color, value, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
        <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
        <span className="text-sm">{name}</span>
        {value && <span className="text-sm text-muted-foreground">{value}</span>}
      </div>
    )
  },
)
LegendItem.displayName = "LegendItem"
