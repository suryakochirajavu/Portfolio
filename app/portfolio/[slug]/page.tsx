import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8">
                <Link
                  href="/portfolio"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Portfolio</span>
                </Link>
              </div>
              <h1 className="text-3xl font-bold mb-4">Project: {params.slug}</h1>
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                <Image
                  src="/placeholder.svg?height=600&width=1200"
                  alt="Project Cover"
                  width={1200}
                  height={600}
                  className="object-cover w-full"
                />
              </div>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-muted-foreground">
                  This is a detailed view of the project. The content would include a description of the project, the
                  challenge, the solution, and the outcome.
                </p>
                <h2>The Challenge</h2>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                  nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
                </p>
                <h2>The Solution</h2>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                  nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
                </p>
                <h2>The Outcome</h2>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                  nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/portfolio">View More Projects</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
