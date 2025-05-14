"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function MouseGlow() {
  const outerGlowRef = useRef<HTMLDivElement>(null)
  const innerGlowRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!outerGlowRef.current || !innerGlowRef.current || !highlightRef.current) return

    let rafId: number

    const updateGlowPosition = (e: MouseEvent) => {
      if (!outerGlowRef.current || !innerGlowRef.current || !highlightRef.current) return

      // Cancel any pending animation frame
      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      // Use requestAnimationFrame for smoother updates
      rafId = requestAnimationFrame(() => {
        if (!outerGlowRef.current || !innerGlowRef.current || !highlightRef.current) return

        // Position the outer glow
        outerGlowRef.current.style.transform = `translate3d(${e.clientX - 100}px, ${e.clientY - 100}px, 0)`

        // Position the inner glow with slight offset to create refraction effect
        innerGlowRef.current.style.transform = `translate3d(${e.clientX - 65}px, ${e.clientY - 65}px, 0)`

        // Position the highlight with different offset
        highlightRef.current.style.transform = `translate3d(${e.clientX - 25}px, ${e.clientY - 25}px, 0)`
      })
    }

    // Use passive: true for better performance
    window.addEventListener("mousemove", updateGlowPosition, { passive: true })

    return () => {
      window.removeEventListener("mousemove", updateGlowPosition)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  const isDark = resolvedTheme === "dark"

  return (
    <>
      {/* Outer glow - creates the base of the glass effect */}
      <div
        ref={outerGlowRef}
        className={`pointer-events-none fixed z-50 h-[200px] w-[200px] rounded-full blur-[90px] will-change-transform transition-colors duration-300 ${
          isDark
            ? "bg-gradient-to-br from-red-500/20 to-red-600/15"
            : "bg-gradient-to-br from-blue-400/20 to-blue-600/15"
        }`}
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          backfaceVisibility: "hidden",
        }}
        aria-hidden="true"
      />

      {/* Inner glow - creates the concentrated light effect */}
      <div
        ref={innerGlowRef}
        className={`pointer-events-none fixed z-51 h-[130px] w-[130px] rounded-full blur-[40px] will-change-transform transition-colors duration-300 ${
          isDark
            ? "bg-gradient-to-tr from-red-400/30 to-red-300/25"
            : "bg-gradient-to-tr from-blue-300/30 to-blue-500/25"
        }`}
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          backfaceVisibility: "hidden",
          mixBlendMode: isDark ? "screen" : "multiply",
        }}
        aria-hidden="true"
      />

      {/* Highlight - creates the refracted light point */}
      <div
        ref={highlightRef}
        className={`pointer-events-none fixed z-52 h-[50px] w-[50px] rounded-full blur-[15px] will-change-transform transition-colors duration-300 ${
          isDark ? "bg-gradient-to-r from-white/50 to-red-200/40" : "bg-gradient-to-r from-white/50 to-blue-200/40"
        }`}
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          backfaceVisibility: "hidden",
          mixBlendMode: isDark ? "screen" : "overlay",
        }}
        aria-hidden="true"
      />
    </>
  )
}
