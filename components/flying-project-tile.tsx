"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import Link from "next/link"

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
        className="absolute transition-all duration-1000 ease-out w-full h-full"
        style={{
          transform: `translateY(${position.y}px) scale(${position.scale})`,
          opacity: position.opacity,
        }}
      >
        <Link href={`/portfolio/${project.slug}`} className="block h-full">
          <div className="bg-card border rounded-lg overflow-hidden h-full shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary/30">
            <div className="aspect-[4/3] overflow-hidden relative">
              <Image
                src={project.image || "/placeholder.svg?height=450&width=600"}
                alt={project.title}
                width={600}
                height={450}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-xl mb-1">{project.title}</h3>
              <p className="text-sm text-muted-foreground">
                {project.category} • {project.year}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
