import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WorkSection } from "./work-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function Home() {
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
              <div className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <Image
                  alt="Creator Portrait"
                  className="aspect-square object-cover"
                  height={600}
                  src="/placeholder.svg?height=600&width=600"
                  width={600}
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
