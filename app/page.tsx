"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { WorkSection } from "./work-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const imageContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageContainerRef.current) return
      const rect = imageContainerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const el = imageContainerRef.current
    el?.addEventListener("mousemove", handleMouseMove)
    return () => el?.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Hi, I'm Sangeeth P Girish
                  </h1>
                  <p className="text-xl text-muted-foreground">Digital Artist & Creative Director</p>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-lg">
                    I create immersive digital experiences that blend art and technology. With over 8 years of
                    experience, I've helped brands tell their stories through compelling visuals and interactive
                    designs.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="/portfolio">View My Work</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Contact Me</Link>
                  </Button>
                </div>
              </div>

              {/* Right Image with Glow */}
              <div
                ref={imageContainerRef}
                className="relative mx-auto aspect-square overflow-hidden rounded-xl sm:w-full lg:order-last"
              >
                {/* Glow */}
                <div
                  className="pointer-events-none absolute w-72 h-72 rounded-full bg-purple-500 opacity-30 blur-2xl transition-transform duration-200 ease-out"
                  style={{
                    left: mousePos.x - 144,
                    top: mousePos.y - 144,
                  }}
                />
                {/* Image */}
                <Image
                  alt="Sangeeth P Girish"
                  className="z-10 relative"
                  src="/profile.png"
                  width={600}
                  height={600}
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </section>
        <WorkSection />
      </main>
      <Footer />
    </div>
  )
}
