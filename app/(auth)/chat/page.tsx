import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { NotaAiChat } from "@/components/nota-ai-chat"

export default function ChatPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Nota AI Assistant"
        description="Get security insights and recommendations from your AI security assistant."
      />
      <div className="grid gap-6">
        <NotaAiChat />
      </div>
    </DashboardShell>
  )
}
