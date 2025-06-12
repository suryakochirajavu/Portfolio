"use client"

import { useEffect, useRef } from "react"

export function JourneyCharacter() {
  const eyesRef = useRef<SVGCircleElement[]>([])
  const busRef = useRef<SVGGElement>(null)
  const armRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    // Eye movement animation
    const eyeMovement = () => {
      if (eyesRef.current.length < 2) return

      const moveEyes = () => {
        // Random eye movement
        const xOffset = Math.sin(Date.now() / 1000) * 1
        const yOffset = Math.cos(Date.now() / 1500) * 1

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

    // Bus movement animation
    const busMovement = () => {
      if (!busRef.current) return

      let position = 0
      const speed = 0.5
      const amplitude = 2

      const moveBus = () => {
        position += speed
        const yOffset = Math.sin(position / 10) * amplitude

        if (busRef.current) {
          busRef.current.style.transform = `translateY(${yOffset}px)`
        }

        requestAnimationFrame(moveBus)
      }

      moveBus()
    }

    // Arm movement animation (eating)
    const armMovement = () => {
      if (!armRef.current) return

      let direction = 1
      let position = 0

      const moveArm = () => {
        position += 0.5 * direction

        if (position > 5) direction = -1
        if (position < 0) direction = 1

        if (armRef.current) {
          armRef.current.style.transform = `rotate(${position}deg) translateY(${position / 2}px)`
          armRef.current.style.transformOrigin = "25px 20px"
        }

        setTimeout(() => requestAnimationFrame(moveArm), 50)
      }

      moveArm()
    }

    eyeMovement()
    busMovement()
    armMovement()
  }, [])

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <svg width="240" height="160" viewBox="0 0 240 160" className="max-w-full">
        {/* Bus */}
        <g ref={busRef}>
          <rect x="40" y="60" width="160" height="60" rx="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="40" y="40" width="120" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="50" y="70" width="30" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="90" y="70" width="30" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="130" y="70" width="30" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="60" cy="130" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="180" cy="130" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        </g>

        {/* Character */}
        <g transform="translate(100, 80)">
          {/* Body */}
          <rect x="0" y="0" width="30" height="40" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />

          {/* Head */}
          <circle cx="15" cy="-15" r="12" fill="none" stroke="currentColor" strokeWidth="2" />

          {/* Eyes */}
          <circle
            ref={(el) => {
              if (el) eyesRef.current[0] = el;
            }}
            data-base-x="10"
            data-base-y="-17"
            cx="10"
            cy="-17"
            r="2"
            fill="currentColor"
          />
          <circle
            ref={(el) => {
              if (el) eyesRef.current[1] = el;
            }}
            data-base-x="20"
            data-base-y="-17"
            cx="20"
            cy="-17"
            r="2"
            fill="currentColor"
          />

          {/* Mouth */}
          <path d="M10,-10 Q15,-8 20,-10" fill="none" stroke="currentColor" strokeWidth="1" />

          {/* Arms */}
          <path d="M0,10 L-15,15" fill="none" stroke="currentColor" strokeWidth="2" />
          <path ref={armRef} d="M30,10 L45,15 L50,10" fill="none" stroke="currentColor" strokeWidth="2" />

          {/* Food */}
          <rect x="45" y="5" width="10" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1" />

          {/* Legs */}
          <path d="M10,40 L5,55" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M20,40 L25,55" fill="none" stroke="currentColor" strokeWidth="2" />
        </g>
      </svg>
    </div>
  )
}
