"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasDimensions()
    window.addEventListener("resize", updateCanvasDimensions)

    // Create lines
    const lineCount = 150
    const lines: {
      x: number
      y: number
      z: number
      length: number
      width: number
      color: string
      speed: number
    }[] = []

    for (let i = 0; i < lineCount; i++) {
      // Glass-like colors for dark mode (white/light blue tints)
      const darkModeColor = `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`

      // Glass-like colors for light mode (blue tints)
      const lightModeColor = `rgba(100, 150, 255, ${Math.random() * 0.15 + 0.05})`

      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 2000,
        length: Math.random() * 100 + 50,
        width: Math.random() * 2 + 1,
        color: isDark ? darkModeColor : lightModeColor,
        speed: Math.random() * 0.5 + 0.2,
      })
    }

    // Animation variables
    let animationFrameId: number

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Constant base speed for steady flow
      const baseSpeed = 0.2

      // Update and draw lines
      lines.forEach((line) => {
        // Move lines at a steady pace
        line.z -= baseSpeed + line.speed

        // Reset lines that go out of bounds
        if (line.z <= 0) {
          line.z = 2000
          line.x = Math.random() * canvas.width
          line.y = Math.random() * canvas.height
        } else if (line.z > 2000) {
          line.z = 0
          line.x = Math.random() * canvas.width
          line.y = Math.random() * canvas.height
        }

        // Calculate perspective
        const scale = 2000 / (2000 + line.z)
        const x2d = (line.x - canvas.width / 2) * scale + canvas.width / 2
        const y2d = (line.y - canvas.height / 2) * scale + canvas.height / 2

        // Calculate end point of line based on perspective
        const endX = x2d + line.length * scale
        const endY = y2d

        // Draw line with glass-like appearance
        ctx.globalAlpha = scale * 0.4
        ctx.beginPath()
        ctx.moveTo(x2d, y2d)
        ctx.lineTo(endX, endY)
        ctx.lineWidth = line.width * scale
        ctx.strokeStyle = line.color

        // Add blur for glass effect
        if (isDark) {
          ctx.shadowColor = "rgba(255, 255, 255, 0.2)"
          ctx.shadowBlur = 5 * scale
        } else {
          ctx.shadowColor = "rgba(100, 150, 255, 0.2)"
          ctx.shadowBlur = 5 * scale
        }

        ctx.stroke()

        // Reset shadow for next line
        ctx.shadowBlur = 0
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", updateCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDark])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
}
