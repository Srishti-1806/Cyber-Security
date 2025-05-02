import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SecurityInformation } from "@/components/security-information"

export default function InformationPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Security Information"
        description="Learn about common security threats and how to protect your systems."
      />
      <div className="grid gap-6">
        <SecurityInformation />
      </div>
    </DashboardShell>
  )
}
