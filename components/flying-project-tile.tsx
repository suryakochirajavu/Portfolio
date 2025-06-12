"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useRouter } from "next/navigation"

interface FlyingProjectTileProps {
  project: {
    id: number
    title: string
    category: string
    year: string
    image: string
    slug: string
  }
  index: number
  resetMode: boolean
}

export function FlyingProjectTile({ project, index, resetMode }: FlyingProjectTileProps) {
  const router = useRouter()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const [position, setPosition] = useState({
    y: 50,
    scale: 0.8,
    opacity: 0,
  })

  // Calculate a unique delay based on index
  const delay = index * 0.05

  const [blast, setBlast] = useState(false)

  const handleClick = () => {
    setBlast(true)
    setTimeout(() => {
      router.push(`/portfolio/${project.slug}`)
    }, 300)
  }

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        if (!resetMode) {
          // Fade and slide in
          setPosition({
            y: 0,
            scale: 1,
            opacity: 1,
          })
        } else {
          // Fade and slide out when resetting
          setPosition({
            y: 50,
            scale: 0.8,
            opacity: 0,
          })
        }
      }, delay * 1000)

      return () => clearTimeout(timer)
    } else {
      // Reset when out of view
      setPosition({
        y: 50,
        scale: 0.8,
        opacity: 0,
      })
    }
  }, [inView, resetMode, delay])


  return (
    <div ref={ref} className="absolute w-full h-full">
      <div
        className={`absolute transition-all duration-1000 ease-out w-full h-full ${blast ? "tile-blast" : ""}`}
        style={{
          transform: `translateY(${position.y}px) scale(${position.scale})`,
          opacity: position.opacity,
        }}
        onClick={handleClick}
      >
        <div className="glass-surface rounded-lg h-full flex flex-col items-center justify-center text-center cursor-pointer select-none">
          <h3 className="font-semibold text-xl mb-1">{project.title}</h3>
          <p className="text-sm text-muted-foreground">
            {project.category} • {project.year}
          </p>
        </div>
      </div>
    </div>
  )
}
