"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface CategoryNavigationProps {
  className?: string
}

export function CategoryNavigation({ className = "" }: CategoryNavigationProps) {
  const router = useRouter()
  const [dragging, setDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    { id: "motion-graphics", name: "Motion Graphics" },
    { id: "branding", name: "Branding" },
    { id: "social-media", name: "Social Media Design" },
    { id: "3d-2d", name: "3D/2D" },
    { id: "ui-ux", name: "UI/UX" },
  ]

  const handleDragStart = (e: React.MouseEvent, categoryId: string) => {
    setDragging(true)
    setDragStartX(e.clientX)
    setSelectedCategory(categoryId)
  }

  const handleDragEnd = (e: React.MouseEvent) => {
    if (dragging && selectedCategory) {
      const dragDistance = e.clientX - dragStartX

      // If dragged far enough, navigate to the category page
      if (Math.abs(dragDistance) > 100) {
        router.push(`/portfolio/category/${selectedCategory}`)
      }
    }

    setDragging(false)
    setSelectedCategory(null)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    // This is just for visual feedback during dragging
    // The actual navigation happens on drag end
  }

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/portfolio/category/${categoryId}`)
  }

  return (
    <div className={`${className}`}>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className={`px-6 py-3 rounded-full border cursor-grab active:cursor-grabbing transition-all ${
              selectedCategory === category.id ? "bg-primary text-primary-foreground" : "bg-background hover:bg-accent"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseDown={(e) => handleDragStart(e, category.id)}
            onMouseUp={handleDragEnd}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleDragEnd}
            onClick={() => handleCategoryClick(category.id)}
            drag={dragging && selectedCategory === category.id}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.2}
          >
            {category.name}
            {selectedCategory === category.id && <span className="ml-2 text-xs opacity-70">← Drag →</span>}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
