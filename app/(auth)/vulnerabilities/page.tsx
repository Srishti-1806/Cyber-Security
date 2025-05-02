import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { VulnerabilityScanner } from "@/components/vulnerability-scanner"
import { VulnerabilityResults } from "@/components/vulnerability-results"

export default function VulnerabilitiesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Vulnerability Scanner"
        description="Scan your network and applications for security vulnerabilities."
      />
      <div className="grid gap-6">
        <VulnerabilityScanner />
        <VulnerabilityResults />
      </div>
    </DashboardShell>
  )
}
