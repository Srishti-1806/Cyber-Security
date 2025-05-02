"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bug } from "lucide-react"

interface BugProps {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  duration: number
  delay: number
}

export function AnimatedBugs() {
  const [bugs, setBugs] = useState<BugProps[]>([])
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  })

  useEffect(() => {
    // Update window size on resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    // Generate initial bugs
    const initialBugs = Array.from({ length: 5 }, (_, i) => createRandomBug(i, windowSize.width, windowSize.height))
    setBugs(initialBugs)

    // Add new bugs periodically
    const interval = setInterval(() => {
      setBugs((prevBugs) => {
        // Remove old bugs if there are too many
        if (prevBugs.length > 8) {
          const newBugs = [...prevBugs]
          newBugs.shift()
          return [...newBugs, createRandomBug(Date.now(), windowSize.width, windowSize.height)]
        }
        return [...prevBugs, createRandomBug(Date.now(), windowSize.width, windowSize.height)]
      })
    }, 15000)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {bugs.map((bug) => (
          <motion.div
            key={bug.id}
            initial={{ x: bug.x, y: -20, opacity: 0, rotate: bug.rotation }}
            animate={{
              x: [bug.x, bug.x + (Math.random() * 200 - 100), bug.x + (Math.random() * 400 - 200)],
              y: [0, windowSize.height * 0.3, windowSize.height + 50],
              opacity: [0, 1, 0],
              rotate: [bug.rotation, bug.rotation + 180, bug.rotation + 360],
            }}
            transition={{
              duration: bug.duration,
              delay: bug.delay,
              ease: "linear",
              times: [0, 0.7, 1],
            }}
            style={{ position: "absolute", scale: bug.scale }}
            onAnimationComplete={() => {
              setBugs((prevBugs) => prevBugs.filter((b) => b.id !== bug.id))
            }}
          >
            <Bug className="text-primary/60" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function createRandomBug(id: number, maxWidth: number, maxHeight: number): BugProps {
  return {
    id,
    x: Math.random() * maxWidth,
    y: -20,
    rotation: Math.random() * 360,
    scale: 0.5 + Math.random() * 1.5,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 2,
  }
}
