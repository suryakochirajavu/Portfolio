import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function SkillsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Skills & Expertise</h1>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                My diverse skill set allows me to tackle creative challenges from multiple angles.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    <path d="M12 2v2" />
                    <path d="M12 22v-2" />
                    <path d="m17 20.66-1-1.73" />
                    <path d="M11 10.27 7 3.34" />
                    <path d="m20.66 17-1.73-1" />
                    <path d="m3.34 7 1.73 1" />
                    <path d="M22 12h-2" />
                    <path d="M2 12h2" />
                    <path d="m20.66 7-1.73 1" />
                    <path d="m3.34 17 1.73-1" />
                    <path d="m17 3.34-1 1.73" />
                    <path d="m7 20.66 1-1.73" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Digital Art</h3>
                <ul className="space-y-2 text-center text-muted-foreground">
                  <li>Illustration</li>
                  <li>Digital Painting</li>
                  <li>Photo Manipulation</li>
                  <li>3D Modeling</li>
                  <li>Concept Art</li>
                </ul>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="m22 8-6 4 6 4V8Z" />
                    <rect width="14" height="12" x="2" y="6" rx="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Motion & Video</h3>
                <ul className="space-y-2 text-center text-muted-foreground">
                  <li>Animation</li>
                  <li>Motion Graphics</li>
                  <li>Video Editing</li>
                  <li>Visual Effects</li>
                  <li>Compositing</li>
                </ul>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 3v12" />
                    <path d="M6 7.5 12 3l6 4.5" />
                    <path d="M6 16.5 12 21l6-4.5" />
                    <path d="M6 12 12 7.5 18 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Design & Direction</h3>
                <ul className="space-y-2 text-center text-muted-foreground">
                  <li>Brand Identity</li>
                  <li>UI/UX Design</li>
                  <li>Art Direction</li>
                  <li>Creative Strategy</li>
                  <li>Typography</li>
                </ul>
              </div>
            </div>
            <div className="mx-auto mt-16 max-w-5xl">
              <h3 className="mb-6 text-center text-xl font-bold">Software & Tools</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  "Photoshop",
                  "Illustrator",
                  "After Effects",
                  "Cinema 4D",
                  "Blender",
                  "Figma",
                  "Procreate",
                  "Premiere Pro",
                  "DaVinci Resolve",
                ].map((tool) => (
                  <div key={tool} className="rounded-full border bg-card px-4 py-2 text-sm font-medium">
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
