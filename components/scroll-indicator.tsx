"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export function ScrollIndicator() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(false)
        setScrolled(true)
      } else {
        setVisible(true)
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center animate-pulse">
      <p className="text-sm mb-2 opacity-70">Scroll to explore the gallery</p>
      <ChevronDown className="h-6 w-6" />
    </div>
  )
}
