"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Attack {
  id: number
  source: { lat: number; lng: number }
  target: { lat: number; lng: number }
  type: string
  timestamp: number
}

export function ThreatMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [attacks, setAttacks] = useState<Attack[]>([])

  // Generate random attacks
  useEffect(() => {
    const generateRandomAttacks = () => {
      const newAttacks: Attack[] = []

      for (let i = 0; i < 20; i++) {
        newAttacks.push({
          id: Date.now() + i,
          source: {
            lat: Math.random() * 150 - 75,
            lng: Math.random() * 340 - 170,
          },
          target: {
            lat: Math.random() * 150 - 75,
            lng: Math.random() * 340 - 170,
          },
          type: ["Malware", "DDoS", "Phishing", "Ransomware"][Math.floor(Math.random() * 4)],
          timestamp: Date.now(),
        })
      }

      setAttacks((prev) => [...prev, ...newAttacks].slice(-100))
    }

    generateRandomAttacks()
    const interval = setInterval(generateRandomAttacks, 3000)

    return () => clearInterval(interval)
  }, [])

  // Draw the map
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Draw function
    const draw = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw world map (simplified)
      ctx.beginPath()
      ctx.strokeStyle = "rgba(16, 185, 129, 0.3)"
      ctx.lineWidth = 0.5

      // Draw grid lines
      const gridSize = 20
      const width = canvas.width
      const height = canvas.height

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
      }

      ctx.stroke()

      // Draw continents (very simplified)
      ctx.beginPath()
      ctx.fillStyle = "rgba(16, 185, 129, 0.1)"
      ctx.strokeStyle = "rgba(16, 185, 129, 0.5)"
      ctx.lineWidth = 1

      // North America
      drawContinent(ctx, width * 0.2, height * 0.3, width * 0.15, height * 0.15)

      // South America
      drawContinent(ctx, width * 0.25, height * 0.5, width * 0.1, height * 0.15)

      // Europe
      drawContinent(ctx, width * 0.5, height * 0.3, width * 0.1, height * 0.1)

      // Africa
      drawContinent(ctx, width * 0.5, height * 0.5, width * 0.12, height * 0.15)

      // Asia
      drawContinent(ctx, width * 0.65, height * 0.35, width * 0.15, height * 0.15)

      // Australia
      drawContinent(ctx, width * 0.75, height * 0.6, width * 0.08, height * 0.08)

      ctx.fill()
      ctx.stroke()

      // Draw attacks
      attacks.forEach((attack, index) => {
        const sourceX = mapCoordinateToCanvas(attack.source.lng, -180, 180, 0, canvas.width)
        const sourceY = mapCoordinateToCanvas(attack.source.lat, -90, 90, 0, canvas.height)
        const targetX = mapCoordinateToCanvas(attack.target.lng, -180, 180, 0, canvas.width)
        const targetY = mapCoordinateToCanvas(attack.target.lat, -90, 90, 0, canvas.height)

        // Draw source point
        ctx.beginPath()
        ctx.fillStyle = "rgba(220, 38, 38, 0.8)"
        ctx.arc(sourceX, sourceY, 2, 0, Math.PI * 2)
        ctx.fill()

        // Draw target point
        ctx.beginPath()
        ctx.fillStyle = "rgba(16, 185, 129, 0.8)"
        ctx.arc(targetX, targetY, 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw attack line
        const progress = (Date.now() - attack.timestamp) / 3000
        if (progress < 1) {
          const currentX = sourceX + (targetX - sourceX) * progress
          const currentY = sourceY + (targetY - sourceY) * progress

          ctx.beginPath()
          ctx.strokeStyle = getAttackColor(attack.type)
          ctx.lineWidth = 1
          ctx.setLineDash([2, 2])
          ctx.moveTo(sourceX, sourceY)
          ctx.lineTo(currentX, currentY)
          ctx.stroke()

          // Draw moving dot
          ctx.beginPath()
          ctx.fillStyle = getAttackColor(attack.type)
          ctx.arc(currentX, currentY, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      })
    }

    function drawContinent(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
      // Draw a rounded rectangle for each continent
      const radius = 20
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
    }

    function mapCoordinateToCanvas(coord: number, min: number, max: number, canvasMin: number, canvasMax: number) {
      return ((coord - min) / (max - min)) * (canvasMax - canvasMin) + canvasMin
    }

    function getAttackColor(type: string) {
      switch (type) {
        case "Malware":
          return "rgba(220, 38, 38, 0.8)"
        case "DDoS":
          return "rgba(234, 179, 8, 0.8)"
        case "Phishing":
          return "rgba(59, 130, 246, 0.8)"
        case "Ransomware":
          return "rgba(168, 85, 247, 0.8)"
        default:
          return "rgba(16, 185, 129, 0.8)"
      }
    }

    // Animation loop
    let animationId: number

    const animate = () => {
      draw()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [attacks])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="cyber-border overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Globe className="h-4 w-4 text-primary" />
            Global Threat Map
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="h-4 w-4" />
            <span className="sr-only">Expand</span>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-[300px] w-full overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
            <div className="absolute bottom-2 right-2 rounded bg-background/80 p-2 text-xs backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                <span>Attack Source</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                <span>Target</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
