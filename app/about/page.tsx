import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JourneyCharacter } from "@/components/animated-characters/journey-character";
import { ApproachCharacter } from "@/components/animated-characters/approach-character";
import { ValuesCharacter } from "@/components/animated-characters/values-character";
import { HobbyCharacter } from "@/components/animated-characters/hobby-character";
import { BigPointer } from "@/components/big-pointer";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground relative">
      <Header />
      <main className="flex-1 cursor-none">
        {/* Large 3D-like cursor following the mouse */}
        <BigPointer />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-start justify-center gap-4 pr-[400px] md:pr-[400px]">
              <h1 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                About Me
              </h1>
              <p className="max-w-full leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                I'm a multidisciplinary creative who specializes in digital art,
                motion graphics, and creative direction. Based in New York City,
                I've collaborated with global brands and innovative startups to
                create memorable visual experiences.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 mt-16 pr-0 md:pr-[200px]">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">My Journey</h3>
                <JourneyCharacter />
                <p className="text-muted-foreground">
                  I started my creative journey at the Rhode Island School of
                  Design, where I studied Digital Media. After graduating, I
                  worked at several creative agencies before going independent
                  in 2019. My work has been featured in Communication Arts,
                  Behance, and AIGA.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">My Approach</h3>
                <ApproachCharacter />
                <p className="text-muted-foreground">
                  I believe in the power of visual storytelling to create
                  emotional connections. My process combines strategic thinking
                  with artistic exploration, resulting in work that is both
                  meaningful and visually striking. I'm constantly experimenting
                  with new techniques and technologies.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">My Values</h3>
                <ValuesCharacter />
                <p className="text-muted-foreground">
                  Authenticity, innovation, and attention to detail guide my
                  creative practice. I'm committed to creating work that is
                  inclusive and accessible, and I strive to use my skills to
                  support causes I believe in.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">When I'm Not Creating</h3>
                <HobbyCharacter />
                <p className="text-muted-foreground">
                  You can find me exploring art galleries, hiking in upstate New
                  York, or experimenting with new recipes in my kitchen. I'm
                  also an avid collector of vintage design books and a mentor to
                  emerging artists.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
