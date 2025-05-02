"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function DataFlowAnimation() {
  const [dataFlows, setDataFlows] = useState<{ id: number; left: number; delay: number; duration: number }[]>([])

  useEffect(() => {
    // Create initial data flows
    const initialFlows = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }))

    setDataFlows(initialFlows)

    // Add new data flows periodically
    const interval = setInterval(() => {
      setDataFlows((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 100,
          delay: 0,
          duration: Math.random() * 3 + 2,
        },
      ])
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {dataFlows.map((flow) => (
        <motion.div
          key={flow.id}
          className="data-flow absolute"
          style={{ left: `${flow.left}%` }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: "100vh", opacity: [0, 1, 0] }}
          transition={{
            duration: flow.duration,
            delay: flow.delay,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}
