"use client"

import { type ReactNode, useEffect, useState } from "react"
import { MouseGlow } from "@/components/mouse-glow"
import { ThemeDebug } from "@/components/theme-debug"
// Import the TelegramChat component
import { TelegramChat } from "@/components/telegram-chat"

interface EnhancedLayoutProps {
  children: ReactNode
}

export function EnhancedLayout({ children }: EnhancedLayoutProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [showDebug, setShowDebug] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Check if device is touch-based
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    setIsTouchDevice(isTouch)

    // Add keyboard shortcut for debug panel
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+D to toggle debug panel
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        setShowDebug((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!isMounted) return <>{children}</>

  return (
    <>
      {!isTouchDevice && <MouseGlow />}
      {showDebug && <ThemeDebug />}
      <TelegramChat />
      {children}
    </>
  )
}

export default EnhancedLayout
