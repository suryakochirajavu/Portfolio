import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2023 Sangeeth P Girish. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Instagram
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Behance
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            LinkedIn
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Twitter
          </Link>
        </div>
      </div>
    </footer>
  )
}
