"use client"

import { useState, useEffect } from "react"

interface ScrollState {
  scrollY: number
  scrollDirection: "up" | "down" | null
  scrollSpeed: number
  isScrollingFast: boolean
}

export function useScroll(fastScrollThreshold = 15): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: null,
    scrollSpeed: 0,
    isScrollingFast: false,
  })

  useEffect(() => {
    let lastScrollY = window.scrollY
    let lastTimestamp = performance.now()
    let scrollSpeed = 0
    const scrollSpeedHistory: number[] = []

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTimestamp = performance.now()
      const timeDelta = currentTimestamp - lastTimestamp

      // Calculate scroll speed (pixels per millisecond)
      if (timeDelta > 0) {
        scrollSpeed = Math.abs(currentScrollY - lastScrollY) / timeDelta
      }

      // Keep a short history of scroll speeds for smoothing
      scrollSpeedHistory.push(scrollSpeed * 100)
      if (scrollSpeedHistory.length > 5) {
        scrollSpeedHistory.shift()
      }

      // Calculate average scroll speed
      const avgScrollSpeed = scrollSpeedHistory.reduce((sum, speed) => sum + speed, 0) / scrollSpeedHistory.length

      // Determine if scrolling fast based on threshold
      const isScrollingFast = avgScrollSpeed > fastScrollThreshold

      setScrollState({
        scrollY: currentScrollY,
        scrollDirection: currentScrollY > lastScrollY ? "down" : "up",
        scrollSpeed: avgScrollSpeed,
        isScrollingFast,
      })

      lastScrollY = currentScrollY
      lastTimestamp = currentTimestamp
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [fastScrollThreshold])

  return scrollState
}
