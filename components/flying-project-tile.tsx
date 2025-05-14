"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { useScroll } from "@/hooks/use-scroll"
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
  totalProjects: number
  resetMode: boolean
}

export function FlyingProjectTile({ project, index, totalProjects, resetMode }: FlyingProjectTileProps) {
  const { scrollDirection } = useScroll()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    z: 2000,
    scale: 0.1,
    opacity: 0,
  })

  const tileRef = useRef<HTMLDivElement>(null)

  // Calculate a unique delay based on index
  const delay = index * 0.05

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        if (scrollDirection === "down" && !resetMode) {
          // Flying in animation - coming from far to near
          setPosition({
            x: 0,
            y: 0,
            z: 0,
            scale: 1,
            opacity: 1,
          })
        } else if (resetMode) {
          // Reset animation - going back to distance when user clicks
          setPosition({
            x: 0,
            y: 0,
            z: 2000,
            scale: 0.1,
            opacity: 0,
          })
        }
        // Otherwise, keep tiles in place
      }, delay * 1000)

      return () => clearTimeout(timer)
    } else {
      // Reset when out of view
      setPosition({
        x: 0,
        y: 0,
        z: 2000,
        scale: 0.1,
        opacity: 0,
      })
    }
  }, [inView, scrollDirection, resetMode, delay])

  // Calculate z-index based on z position for proper layering
  const zIndex = Math.round(100 - position.z / 20)

  return (
    <div
      ref={ref}
      className="absolute w-full h-full"
      style={{
        perspective: "1200px",
        perspectiveOrigin: "center",
      }}
    >
      <div
        ref={tileRef}
        className="absolute transition-all duration-1000 ease-out w-full h-full"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px) scale(${position.scale})`,
          opacity: position.opacity,
          zIndex,
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
