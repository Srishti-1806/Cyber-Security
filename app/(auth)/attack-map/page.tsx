import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FullScreenThreatMap } from "@/components/full-screen-threat-map"
import { AttackStatistics } from "@/components/attack-statistics"

export default function AttackMapPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Global Attack Map"
        description="Visualize cyber attacks happening around the world in real-time."
      />
      <div className="grid gap-6">
        <FullScreenThreatMap />
        <AttackStatistics />
      </div>
    </DashboardShell>
  )
}
