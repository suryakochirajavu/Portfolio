"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ScrollBackground } from "@/components/scroll-background"
import { TorchCursor } from "@/components/torch-cursor"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

// Sample project data by category
const projectsByCategory = {
  "motion-graphics": [
    {
      id: 1,
      title: "Brand Animation",
      description: "Animated logo reveal for a tech startup",
      year: "2023",
      image: "/placeholder.svg?height=450&width=600",
      slug: "brand-animation",
    },
    {
      id: 2,
      title: "Product Showcase",
      description: "3D animation showcasing product features",
      year: "2023",
      image: "/placeholder.svg?height=450&width=600",
      slug: "product-showcase",
    },
    {
      id: 3,
      title: "Explainer Video",
      description: "Animated explainer for a financial app",
      year: "2022",
      image: "/placeholder.svg?height=450&width=600",
      slug: "explainer-video",
    },
  ],
  branding: [
    {
      id: 1,
      title: "Tech Startup Rebrand",
      description: "Complete brand identity for a tech startup",
      year: "2023",
      image: "/placeholder.svg?height=450&width=600",
      slug: "tech-startup-rebrand",
    },
    {
      id: 2,
      title: "Restaurant Brand Package",
      description: "Brand identity for an upscale restaurant",
      year: "2022",
      image: "/placeholder.svg?height=450&width=600",
      slug: "restaurant-brand",
    },
  ],
  "social-media": [
    {
      id: 1,
      title: "Fashion Campaign",
      description: "Social media campaign for a fashion brand",
      year: "2023",
      image: "/placeholder.svg?height=450&width=600",
      slug: "fashion-campaign",
    },
    {
      id: 2,
      title: "Food Delivery Ads",
      description: "Ad series for a food delivery service",
      year: "2023",
      image: "/placeholder.svg?height=450&width=600",
      slug: "food-delivery-ads",
    },
  ],
  "3d-2d": [
    {
      id: 1,
      title: "Character Design",
      description: "3D character design for a game",
      year: "2023",
      image: "/placeholder.svg?height=450&width=600",
      slug: "character-design",
    },
    {
      id: 2,
      title: "Product Visualization",
      description: "3D product visualization for marketing",
      year: "2022",
      image: "/placeholder.svg?height=450&width=600",
      slug: "product-visualization",
    },
  ],
  "ui-ux": [
    {
      id: 1,
      title: "Mobile App Design",
      description: "UI/UX design for a fitness app",
      year: "2023",
      image: "/placeholder.svg?height=450&width=600",
      slug: "mobile-app-design",
    },
    {
      id: 2,
      title: "E-commerce Website",
      description: "UI/UX design for an e-commerce platform",
      year: "2022",
      image: "/placeholder.svg?height=450&width=600",
      slug: "ecommerce-website",
    },
  ],
}

const categoryNames = {
  "motion-graphics": "Motion Graphics",
  branding: "Branding",
  "social-media": "Social Media Design",
  "3d-2d": "3D/2D",
  "ui-ux": "UI/UX",
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(null)

  const category = params.category
  const categoryName = categoryNames[category as keyof typeof categoryNames] || "Category"
  const projects = projectsByCategory[category as keyof typeof projectsByCategory] || []

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStartX(e.clientX)
  }

  const handleDragEnd = (e: React.MouseEvent) => {
    if (isDragging) {
      const dragDistance = e.clientX - dragStartX

      // If dragged far enough, navigate back to portfolio
      if (dragDistance > 100) {
        router.push("/portfolio")
      }
    }

    setIsDragging(false)
    setDragDirection(null)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const currentX = e.clientX
      const diff = currentX - dragStartX

      if (diff > 50) {
        setDragDirection("right")
      } else if (diff < -50) {
        setDragDirection("left")
      } else {
        setDragDirection(null)
      }
    }
  }

  const handleBackClick = () => {
    router.push("/portfolio")
  }

  // Get all category keys for navigation
  const categoryKeys = Object.keys(categoryNames)
  const currentIndex = categoryKeys.indexOf(category)
  const prevCategory = currentIndex > 0 ? categoryKeys[currentIndex - 1] : null
  const nextCategory = currentIndex < categoryKeys.length - 1 ? categoryKeys[currentIndex + 1] : null

  return (
    <div
      className="flex min-h-screen flex-col bg-background text-foreground"
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleDragEnd}
    >
      <Header />
      <ScrollBackground />
      <TorchCursor onCursorClick={() => {}} resetMode={false} />

      <main className="flex-1 relative z-10 overflow-x-hidden pb-24">
        <section className="w-full py-12 md:py-24 min-h-[calc(100vh-200px)]">
          <div className="container px-4 md:px-6 pb-32">
            <div className="mb-8 flex items-center justify-between">
              <Button variant="glass" size="sm" className="flex items-center gap-2" onClick={handleBackClick}>
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Portfolio</span>
              </Button>

              <div className="text-sm text-muted-foreground">
                {isDragging && dragDirection === "right" ? (
                  <span className="animate-pulse">← Release to go back</span>
                ) : (
                  <span>Drag right to go back</span>
                )}
              </div>
            </div>

            <motion.div
              className="mx-auto max-w-6xl mb-16"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 100 }}
              style={{
                x: isDragging ? (dragDirection === "right" ? dragStartX - dragStartX + 50 : 0) : 0,
              }}
            >
              <h1 className="text-4xl font-bold mb-8">{categoryName}</h1>

              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mb-20">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="bg-card border rounded-lg overflow-hidden shadow-md"
                    whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className="aspect-video relative">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{project.year}</p>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="mt-4 inline-block text-primary hover:underline"
                      >
                        View Project
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {projects.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No projects found in this category.</p>
                </div>
              )}

              <div className="mt-20 pb-16">
                <div className="flex justify-between">
                  {prevCategory && (
                    <Button variant="glass" onClick={() => router.push(`/portfolio/category/${prevCategory}`)}>
                      ← {categoryNames[prevCategory as keyof typeof categoryNames]}
                    </Button>
                  )}

                  <div className="flex-1" />

                  {nextCategory && (
                    <Button variant="glass" onClick={() => router.push(`/portfolio/category/${nextCategory}`)}>
                      {categoryNames[nextCategory as keyof typeof categoryNames]} →
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
