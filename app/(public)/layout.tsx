import type React from "react"
import { PublicNavbar } from "@/components/public-navbar"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicNavbar />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      {children}
    </div>
  )
}
