"use client"

import { useRef, useEffect, useState } from "react"
import { useScroll } from "@/hooks/use-scroll"
import { useTheme } from "next-themes"

export function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollY, scrollDirection } = useScroll()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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
      highlightColor: string
      speed: number
    }[] = []

    for (let i = 0; i < lineCount; i++) {
      // Glass-like colors for dark mode (white/light blue tints)
      const darkModeColor = `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`
      const darkModeHighlight = `rgba(220, 240, 255, ${Math.random() * 0.4 + 0.2})`

      // Glass-like colors for light mode (blue tints)
      const lightModeColor = `rgba(100, 150, 255, ${Math.random() * 0.15 + 0.05})`
      const lightModeHighlight = `rgba(70, 130, 255, ${Math.random() * 0.4 + 0.2})`

      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 2000,
        length: Math.random() * 100 + 50,
        width: Math.random() * 2 + 1,
        color: isDark ? darkModeColor : lightModeColor,
        highlightColor: isDark ? darkModeHighlight : lightModeHighlight,
        speed: Math.random() * 1 + 0.5, // Slower, more consistent speed
      })
    }

    // Animation variables
    let animationFrameId: number
    let lastScrollY = scrollY

    // Torch/spotlight properties
    const torchRadius = 250
    const torchIntensity = 1.0

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate scroll delta for this frame
      const scrollDelta = scrollY - lastScrollY
      lastScrollY = scrollY

      // Constant base speed for steady flow
      const baseSpeed = 0.5

      // Update and draw lines
      lines.forEach((line) => {
        // Move lines at a steady pace regardless of mouse movement
        if (scrollDirection === "down") {
          line.z -= baseSpeed + line.speed * 0.5
        } else if (scrollDirection === "up") {
          line.z += baseSpeed + line.speed * 0.5
        } else {
          // Slight movement even when not scrolling for ambient effect
          line.z -= line.speed * 0.2
        }

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

        // Calculate distance from mouse to line center
        const lineCenterX = (x2d + endX) / 2
        const lineCenterY = (y2d + endY) / 2
        const dx = mousePosition.x - lineCenterX
        const dy = mousePosition.y - lineCenterY
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Calculate brightness based on distance from mouse (torch effect)
        let brightness = 0
        if (distance < torchRadius) {
          // Inverse square falloff for realistic light
          brightness = Math.pow(1 - distance / torchRadius, 2) * torchIntensity
        }

        // Interpolate between base and highlight color based on brightness
        const color = brightness > 0 ? line.highlightColor : line.color

        // Draw line with glass-like appearance
        ctx.globalAlpha = scale * (0.3 + brightness * 0.7)
        ctx.beginPath()
        ctx.moveTo(x2d, y2d)
        ctx.lineTo(endX, endY)
        ctx.lineWidth = line.width * scale * (1 + brightness * 0.5)
        ctx.strokeStyle = color

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
  }, [scrollY, scrollDirection, isDark, mousePosition])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
}
