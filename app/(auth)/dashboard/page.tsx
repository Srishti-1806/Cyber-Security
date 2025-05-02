import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { MetricCards } from "@/components/metric-cards"
import { ThreatMap } from "@/components/threat-map"
import { RecentThreats } from "@/components/recent-threats"
import { VulnerabilityOverview } from "@/components/vulnerability-overview"
import { SecurityStatusSummary } from "@/components/security-status-summary"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Security Tracker"
        description="Monitor your security posture and active threats in real-time."
      />
      <div className="grid gap-6">
        <SecurityStatusSummary />
        <MetricCards />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ThreatMap />
          <VulnerabilityOverview />
        </div>
        <RecentThreats />
      </div>
    </DashboardShell>
  )
}
