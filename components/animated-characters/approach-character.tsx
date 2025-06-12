"use client"

import { useEffect, useRef } from "react"

export function ApproachCharacter() {
  const eyesRef = useRef<SVGCircleElement[]>([])
  const characterRef = useRef<SVGGElement>(null)
  const legsRef = useRef<SVGGElement>(null)
  const armsRef = useRef<SVGGElement>(null)

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

    // Running animation
    const runningAnimation = () => {
      if (!characterRef.current || !legsRef.current || !armsRef.current) return

      let position = -50
      const speed = 0.5

      const animate = () => {
        position += speed

        // Stop when reaching the counter
        if (position <= 70) {
          if (characterRef.current) {
            characterRef.current.style.transform = `translateX(${position}px)`
          }

          // Animate legs while running
          if (legsRef.current) {
            const legAngle = Math.sin(position / 2) * 20
            legsRef.current.style.transform = `rotate(${legAngle}deg)`
            legsRef.current.style.transformOrigin = "15px 0px"
          }

          // Animate arms while running
          if (armsRef.current) {
            const armAngle = Math.sin(position / 2 + Math.PI) * 20
            armsRef.current.style.transform = `rotate(${armAngle}deg)`
            armsRef.current.style.transformOrigin = "15px 0px"
          }

          requestAnimationFrame(animate)
        } else {
          // Reset to standing position when stopped
          if (legsRef.current) {
            legsRef.current.style.transform = "rotate(0deg)"
          }
          if (armsRef.current) {
            armsRef.current.style.transform = "rotate(0deg)"
          }
        }
      }

      animate()
    }

    eyeMovement()
    runningAnimation()
  }, [])

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <svg width="240" height="160" viewBox="0 0 240 160" className="max-w-full">
        {/* Reception Counter */}
        <rect x="120" y="70" width="80" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="120" y="60" width="80" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1" />
        <text x="150" y="90" fontSize="8" fill="currentColor">
          RECEPTION
        </text>

        {/* Character */}
        <g ref={characterRef} transform="translate(0, 0)">
          {/* Body */}
          <rect x="0" y="70" width="30" height="40" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />

          {/* Head */}
          <circle cx="15" cy="55" r="12" fill="none" stroke="currentColor" strokeWidth="2" />

          {/* Eyes */}
          <circle
            ref={(el) => {
              if (el) eyesRef.current[0] = el;
            }}
            data-base-x="10"
            data-base-y="53"
            cx="10"
            cy="53"
            r="2"
            fill="currentColor"
          />
          <circle
            ref={(el) => {
              if (el) eyesRef.current[1] = el;
            }}
            data-base-x="20"
            data-base-y="53"
            cx="20"
            cy="53"
            r="2"
            fill="currentColor"
          />

          {/* Mouth */}
          <path d="M10,60 Q15,63 20,60" fill="none" stroke="currentColor" strokeWidth="1" />

          {/* Arms */}
          <g ref={armsRef}>
            <path d="M0,80 L-15,85" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M30,80 L45,85" fill="none" stroke="currentColor" strokeWidth="2" />
          </g>

          {/* Legs */}
          <g ref={legsRef}>
            <path d="M10,110 L5,130" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M20,110 L25,130" fill="none" stroke="currentColor" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  )
}
