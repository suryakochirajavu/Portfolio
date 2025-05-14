"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function PortraitInteractionHint() {
  const [isVisible, setIsVisible] = useState(false)
  const [interaction, setInteraction] = useState<"rotate" | "zoom" | null>(null)

  useEffect(() => {
    const handleMouseDown = () => {
      setInteraction("rotate")
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 2000)
    }

    const handleWheel = () => {
      setInteraction("zoom")
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 2000)
    }

    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("wheel", handleWheel)

    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("wheel", handleWheel)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-8 right-8 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border z-50"
        >
          {interaction === "rotate" ? (
            <p className="text-sm">Drag to rotate • Auto-resets after 5s</p>
          ) : (
            <p className="text-sm">Scroll to zoom • Auto-resets after 5s</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
