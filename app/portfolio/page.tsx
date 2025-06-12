"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ScrollBackground } from "@/components/scroll-background"
import { FlyingProjectsGrid } from "@/components/flying-projects-grid"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { TorchCursor } from "@/components/torch-cursor"
import { Button } from "@/components/ui/button"
import { CategoryNavigation } from "@/components/category-navigation"

// Sample project data
const allProjects = [
  {
    id: 1,
    title: "Digital Artwork 1",
    category: "Digital Art",
    year: "2023",
    image: "/placeholder.svg?height=450&width=600",
    slug: "digital-artwork-1",
  },
  {
    id: 2,
    title: "Motion Project 1",
    category: "Motion Graphics",
    year: "2023",
    image: "/placeholder.svg?height=450&width=600",
    slug: "motion-project-1",
  },
  {
    id: 3,
    title: "Brand Identity",
    category: "Branding",
    year: "2022",
    image: "/placeholder.svg?height=450&width=600",
    slug: "brand-identity",
  },
  {
    id: 4,
    title: "UI Design System",
    category: "UI/UX",
    year: "2023",
    image: "/placeholder.svg?height=450&width=600",
    slug: "ui-design-system",
  },
  {
    id: 5,
    title: "3D Character",
    category: "3D Modeling",
    year: "2022",
    image: "/placeholder.svg?height=450&width=600",
    slug: "3d-character",
  },
  {
    id: 6,
    title: "Photo Manipulation",
    category: "Digital Art",
    year: "2023",
    image: "/placeholder.svg?height=450&width=600",
    slug: "photo-manipulation",
  },
  {
    id: 7,
    title: "Animation Reel",
    category: "Motion Graphics",
    year: "2022",
    image: "/placeholder.svg?height=450&width=600",
    slug: "animation-reel",
  },
  {
    id: 8,
    title: "Product Packaging",
    category: "Branding",
    year: "2023",
    image: "/placeholder.svg?height=450&width=600",
    slug: "product-packaging",
  },
  {
    id: 9,
    title: "Concept Art",
    category: "Digital Art",
    year: "2022",
    image: "/placeholder.svg?height=450&width=600",
    slug: "concept-art",
  },
]

export default function PortfolioPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [resetMode, setResetMode] = useState(false)
  const [showResetHint, setShowResetHint] = useState(false)
  const projectsPerPage = 9
  const totalPages = Math.ceil(allProjects.length / projectsPerPage)

  // Get current projects
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = allProjects.slice(indexOfFirstProject, indexOfLastProject)

  // Show reset hint after user has scrolled a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowResetHint(true)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle cursor click to reset view
  const handleCursorClick = () => {
    if (showResetHint) {
      setResetMode(true)
    }
  }

  // Handle reset completion
  const handleResetComplete = () => {
    setResetMode(false)
    setShowResetHint(false)
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <ScrollBackground />
      <TorchCursor onCursorClick={handleCursorClick} resetMode={showResetHint} />
      <ScrollIndicator />
      <main className="flex-1 relative z-10">
        <section className="w-full py-12 md:py-24">
          <div className="container max-w-7xl px-4 md:px-6 mb-16">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl mb-4">3D Portfolio Gallery</h1>
              <p className="max-w-[90%] leading-normal text-muted-foreground sm:text-xl sm:leading-7">
                Scroll to fly through my interactive project gallery. Use your mouse like a torch to illuminate the
                path.
              </p>

              <CategoryNavigation className="mt-8" />

              <p className="text-sm text-muted-foreground mt-2">Click or drag a category to explore specific work</p>
            </div>
          </div>

          <FlyingProjectsGrid projects={currentProjects} resetMode={resetMode} onResetComplete={handleResetComplete} />

          {totalPages > 1 && (
            <div className="container flex justify-center mt-8 sticky bottom-8 z-20">
              <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border">
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Button
                      key={index}
                      variant="glass"
                      size="sm"
                      onClick={() => setCurrentPage(index + 1)}
                      className="w-8 h-8 p-0"
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
