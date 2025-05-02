"use client"

import type React from "react"

import { motion } from "framer-motion"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <motion.div
      className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative">
        <div className="scan-line" />
        {children}
      </div>
    </motion.div>
  )
}
