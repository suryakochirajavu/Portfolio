"use client"

import { useEffect, useRef } from "react"

export function ValuesCharacter() {
  const eyesRef = useRef<SVGCircleElement[]>([])
  const weightNumberRef = useRef<SVGTextElement>(null)
  const scaleNeedleRef = useRef<SVGLineElement>(null)
  const characterRef = useRef<SVGGElement>(null)

  useEffect(() => {
    // Eye movement animation
    const eyeMovement = () => {
      if (eyesRef.current.length < 2) return

      const moveEyes = () => {
        // Eyes looking down at the scale
        const xOffset = Math.sin(Date.now() / 2000) * 0.5
        const yOffset = Math.abs(Math.cos(Date.now() / 2000)) * 2 + 1

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

    // Scale animation
    const scaleAnimation = () => {
      if (!weightNumberRef.current || !scaleNeedleRef.current || !characterRef.current) return

      let weight = 70
      let direction = 1
      let time = 0

      const animate = () => {
        time += 0.05

        // Fluctuate weight slightly
        if (time > 1) {
          weight += 0.1 * direction
          if (weight > 72) direction = -1
          if (weight < 70) direction = 1
          time = 0
        }

        // Update weight display
        if (weightNumberRef.current) {
          weightNumberRef.current.textContent = weight.toFixed(1)
        }

        // Move the needle
        if (scaleNeedleRef.current) {
          const angle = (weight - 70) * 10
          scaleNeedleRef.current.style.transform = `rotate(${angle}deg)`
          scaleNeedleRef.current.style.transformOrigin = "120px 120px"
        }

        // Slight bounce for character
        if (characterRef.current) {
          const bounce = Math.sin(time * 10) * 0.5
          characterRef.current.style.transform = `translateY(${bounce}px)`
        }

        requestAnimationFrame(animate)
      }

      animate()
    }

    eyeMovement()
    scaleAnimation()
  }, [])

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <svg width="240" height="160" viewBox="0 0 240 160" className="max-w-full">
        {/* Weighing Scale */}
        <rect x="70" y="120" width="100" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="120" cy="120" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
        <line ref={scaleNeedleRef} x1="120" y1="120" x2="120" y2="110" stroke="currentColor" strokeWidth="1" />
        <text x="110" y="135" fontSize="10" fill="currentColor">
          <tspan ref={weightNumberRef}>70.0</tspan>
          <tspan>kg</tspan>
        </text>

        {/* Character */}
        <g ref={characterRef}>
          {/* Body */}
          <rect x="105" y="70" width="30" height="40" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />

          {/* Head */}
          <circle cx="120" cy="55" r="12" fill="none" stroke="currentColor" strokeWidth="2" />

          {/* Eyes */}
          <circle
            ref={(el) => el && (eyesRef.current[0] = el)}
            data-base-x="115"
            data-base-y="53"
            cx="115"
            cy="53"
            r="2"
            fill="currentColor"
          />
          <circle
            ref={(el) => el && (eyesRef.current[1] = el)}
            data-base-x="125"
            data-base-y="53"
            cx="125"
            cy="53"
            r="2"
            fill="currentColor"
          />

          {/* Mouth */}
          <path d="M115,60 Q120,58 125,60" fill="none" stroke="currentColor" strokeWidth="1" />

          {/* Arms */}
          <path d="M105,80 L95,90" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M135,80 L145,90" fill="none" stroke="currentColor" strokeWidth="2" />

          {/* Legs */}
          <path d="M115,110 L110,120" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M125,110 L130,120" fill="none" stroke="currentColor" strokeWidth="2" />
        </g>
      </svg>
    </div>
  )
}
