"use client"

import { type ReactNode, useEffect, useState } from "react"
import { MouseGlow } from "@/components/mouse-glow"
import { ThemeDebug } from "@/components/theme-debug"
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

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    setIsTouchDevice(isTouch)

    const handleKeyDown = (e: KeyboardEvent) => {
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
