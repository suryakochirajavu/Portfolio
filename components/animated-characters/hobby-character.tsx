"use client"

import { useEffect, useRef } from "react"

export function HobbyCharacter() {
  const eyesRef = useRef<SVGCircleElement[]>([])
  const screenRef = useRef<SVGRectElement>(null)
  const popcornRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    // Eye movement animation
    const eyeMovement = () => {
      if (eyesRef.current.length < 2) return

      const moveEyes = () => {
        // Eyes watching the screen
        const xOffset = Math.sin(Date.now() / 1000) * 1
        const yOffset = Math.sin(Date.now() / 1500) * 1 - 1

        eyesRef.current.forEach((eye) => {
          if (eye) {
            eye.setAttribute("cx", `${Number.parseFloat(eye.getAttribute("data-base-x") || "0") + xOffset}`)
            eye.setAttribute("cy", `${Number.parseFloat(eye.getAttribute("data-base-y") || "0") + yOffset}`)
          }
        })

        requestAnimationFrame(moveEyes)
      }

      moveEyes()
    }

    // Screen flicker animation
    const screenAnimation = () => {
      if (!screenRef.current) return

      const flicker = () => {
        const brightness = 0.7 + Math.random() * 0.3

        if (screenRef.current) {
          screenRef.current.style.opacity = brightness.toString()
        }

        setTimeout(flicker, 500 + Math.random() * 1000)
      }

      flicker()
    }

    // Popcorn animation
    const popcornAnimation = () => {
      if (!popcornRef.current) return

      let position = 0

      const animate = () => {
        position += 0.05

        if (popcornRef.current) {
          const yOffset = Math.sin(position) * 2
          popcornRef.current.style.transform = `translateY(${yOffset}px)`
        }

        requestAnimationFrame(animate)
      }

      animate()
    }

    eyeMovement()
    screenAnimation()
    popcornAnimation()
  }, [])

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <svg width="240" height="160" viewBox="0 0 240 160" className="max-w-full">
        {/* Movie Screen */}
        <rect x="40" y="30" width="160" height="60" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect ref={screenRef} x="45" y="35" width="150" height="50" fill="currentColor" opacity="0.7" />

        {/* Theater Seats */}
        <rect x="60" y="110" width="30" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="105" y="110" width="30" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="150" y="110" width="30" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1" />

        {/* Character */}
        <g transform="translate(120, 100)">
          {/* Body */}
          <rect x="-15" y="0" width="30" height="30" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />

          {/* Head */}
          <circle cx="0" cy="-15" r="12" fill="none" stroke="currentColor" strokeWidth="2" />

          {/* Eyes */}
          <circle
            ref={(el) => {
              if (el) eyesRef.current[0] = el;
            }}
            data-base-x="-5"
            data-base-y="-17"
            cx="-5"
            cy="-17"
            r="2"
            fill="currentColor"
          />
          <circle
            ref={(el) => {
              if (el) eyesRef.current[1] = el;
            }}
            data-base-x="5"
            data-base-y="-17"
            cx="5"
            cy="-17"
            r="2"
            fill="currentColor"
          />

          {/* Mouth */}
          <path d="M-5,-10 Q0,-8 5,-10" fill="none" stroke="currentColor" strokeWidth="1" />

          {/* Arms */}
          <path d="M-15,10 L-25,20" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M15,10 L25,0" fill="none" stroke="currentColor" strokeWidth="2" />

          {/* Legs */}
          <path d="M-5,30 L-10,40" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M5,30 L10,40" fill="none" stroke="currentColor" strokeWidth="2" />

          {/* Popcorn */}
          <path ref={popcornRef} d="M25,-5 L30,-10 L35,-5 L30,0 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M30,-10 L30,0" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M27,-7 L33,-7" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M27,-5 L33,-5" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  )
}
