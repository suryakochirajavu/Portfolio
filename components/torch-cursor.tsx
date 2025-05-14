"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

interface TorchCursorProps {
  onCursorClick: () => void
  resetMode: boolean
}

export function TorchCursor({ onCursorClick, resetMode }: TorchCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleClick = () => {
      setIsClicked(true)

      if (resetMode) {
        onCursorClick()
      }

      // Reset the click animation after a short delay
      setTimeout(() => {
        setIsClicked(false)
      }, 300)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("click", handleClick)
    }
  }, [onCursorClick, resetMode])

  if (!isVisible) return null

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-screen transition-all duration-300"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className={`rounded-full transition-all duration-300 ${
          isClicked ? "scale-150 opacity-90" : "scale-100 opacity-70"
        } ${
          isDark
            ? "bg-gradient-to-r from-red-500/30 to-orange-300/20"
            : "bg-gradient-to-r from-blue-500/30 to-cyan-300/20"
        } ${resetMode ? "animate-pulse" : ""}`}
        style={{
          width: isClicked ? "70px" : "50px",
          height: isClicked ? "70px" : "50px",
          filter: "blur(8px)",
        }}
      />
      {/* Inner cursor dot */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
          isDark ? "bg-red-400" : "bg-blue-400"
        } ${resetMode ? "animate-ping" : ""}`}
        style={{
          width: "6px",
          height: "6px",
          opacity: 0.8,
        }}
      />
      {/* Click instruction text */}
      {resetMode && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
          Click to reset view
        </div>
      )}
    </div>
  )
}
