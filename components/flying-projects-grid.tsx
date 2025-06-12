"use client"

import { useState, useEffect } from "react"
import { FlyingProjectTile } from "./flying-project-tile"
import { useScroll } from "@/hooks/use-scroll"

interface Project {
  id: number
  title: string
  category: string
  year: string
  image: string
  slug: string
}

interface FlyingProjectsGridProps {
  projects: Project[]
  resetMode: boolean
  onResetComplete: () => void
}

export function FlyingProjectsGrid({ projects, resetMode, onResetComplete }: FlyingProjectsGridProps) {
  const { scrollDirection } = useScroll()
  const [shuffledProjects, setShuffledProjects] = useState<Project[]>([])
  const [gridDimensions, setGridDimensions] = useState({
    cols: 3,
    rows: Math.ceil(projects.length / 3),
  })

  // Update grid dimensions on window resize
  useEffect(() => {
    const updateGridDimensions = () => {
      let cols = 3
      if (window.innerWidth < 768) {
        cols = 1
      } else if (window.innerWidth < 1024) {
        cols = 2
      } else if (window.innerWidth < 1440) {
        cols = 3
      } else {
        cols = 4 // Use 4 columns on very large screens
      }

      setGridDimensions({
        cols,
        rows: Math.ceil(projects.length / cols),
      })
    }

    updateGridDimensions()
    window.addEventListener("resize", updateGridDimensions)
    return () => window.removeEventListener("resize", updateGridDimensions)
  }, [projects.length])

  // Shuffle projects when reset mode changes
  useEffect(() => {
    if (!resetMode && scrollDirection === "down") {
      // Create a new shuffled array when coming in
      const shuffled = [...projects].sort(() => Math.random() - 0.5)
      setShuffledProjects(shuffled)
    } else if (resetMode) {
      // When resetting, wait for animation to complete then notify parent
      const timer = setTimeout(() => {
        onResetComplete()
      }, 1000) // Match the duration of the tile animation
      return () => clearTimeout(timer)
    } else if (shuffledProjects.length === 0) {
      // Initialize with projects
      setShuffledProjects([...projects])
    }
  }, [resetMode, scrollDirection, projects, shuffledProjects.length, onResetComplete])

  return (
    <div className="relative min-h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full h-full max-w-6xl mx-auto px-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {shuffledProjects.map((project, index) => {
                const col = index % gridDimensions.cols
                const row = Math.floor(index / gridDimensions.cols)

                // Calculate position based on grid dimensions
                // Adjust the multipliers to ensure proper spacing
                const horizontalSpacing = window.innerWidth < 768 ? 0 : 380
                const verticalSpacing = 450

                // Calculate total grid size
                const totalWidth = (gridDimensions.cols - 1) * horizontalSpacing
                const totalHeight = Math.min(gridDimensions.rows - 1, 2) * verticalSpacing

                // Center the grid and calculate position for each tile
                const leftOffset = col * horizontalSpacing - totalWidth / 2

                // Adjust vertical positioning to ensure all rows are visible
                // Limit to 3 rows maximum in view
                const visibleRows = Math.min(gridDimensions.rows, 3)
                const topOffset = row * verticalSpacing - totalHeight / 2

                // Skip rendering tiles beyond the 3rd row if there are too many
                if (row >= 3) return null

                return (
                  <div
                    key={project.id}
                    className="absolute"
                    style={{
                      width: "360px",
                      height: "420px",
                      transform: `translate(${leftOffset}px, ${topOffset}px)`,
                    }}
                  >
                    <FlyingProjectTile
                      project={project}
                      index={index}
                      resetMode={resetMode}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
