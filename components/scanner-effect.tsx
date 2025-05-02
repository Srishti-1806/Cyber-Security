"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ScannerEffect() {
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    // Start scanning after a delay
    const timer = setTimeout(() => {
      setIsScanning(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isScanning) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      <motion.div
        className="absolute w-full h-[2px] bg-primary/40 blur-[1px]"
        initial={{ top: 0, opacity: 0.7 }}
        animate={{
          top: ["0%", "100%"],
          opacity: [0.7, 0.3, 0.7],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          times: [0, 0.5, 1],
        }}
      />

      <motion.div
        className="absolute w-full h-[1px] bg-primary/60"
        initial={{ top: 0, opacity: 0.9 }}
        animate={{
          top: ["0%", "100%"],
          opacity: [0.9, 0.5, 0.9],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          times: [0, 0.5, 1],
          delay: 0.2,
        }}
      />

      {/* Horizontal scan lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-primary/20"
          style={{ width: "100%", top: `${i * 10}%` }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Vertical scan lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-[1px] bg-primary/20"
          style={{ height: "100%", left: `${i * 10}%` }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.3, 0.2] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}
