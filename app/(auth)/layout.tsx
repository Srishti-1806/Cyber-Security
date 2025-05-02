import type React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { FloatingChat } from "@/components/floating-chat"
import { NotificationSystem } from "@/components/notification-system"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardLayout>
        {children}
        <FloatingChat />
        <NotificationSystem />
      </DashboardLayout>
    </div>
  )
}
