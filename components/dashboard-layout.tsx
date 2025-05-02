"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DataFlowAnimation } from "@/components/data-flow-animation"
import { AnimatedBugs } from "@/components/animated-bugs"
import { ScannerEffect } from "@/components/scanner-effect"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !user) {
      router.push("/auth/login")
      return
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [authLoading, user, router])

  // Show nothing while checking authentication
  if (authLoading) {
    return null
  }

  // If not authenticated, don't render the dashboard
  if (!user) {
    return null
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="relative min-h-screen bg-background">
        <DataFlowAnimation />
        <AnimatedBugs />
        <ScannerEffect />

        <AnimatePresence>
          {isLoading ? (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-background"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="flex flex-col items-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.h1
                  className="mt-4 text-2xl font-bold text-primary typing-effect"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  CyberShield
                </motion.h1>
                <motion.p
                  className="mt-2 text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Initializing security protocols...
                </motion.p>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="flex min-h-screen">
          <DashboardSidebar />
          <div className="flex-1 overflow-hidden">
            <main className="relative">
              <div className="grid-pattern absolute inset-0 opacity-10" />
              <div className="relative">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
