"use client"

import Link from "next/link"
import { PortfolioSwitch } from "./portfolio-switch"

export function WorkSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Selected Work</h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            A curated collection of my recent projects across various mediums and clients.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-lg border bg-card p-8 text-center relative">
            <div className="absolute top-4 right-4">
              <PortfolioSwitch />
            </div>
            <h3 className="text-4xl font-bold mb-4">Portfolio</h3>
            <p className="text-muted-foreground">
              My portfolio showcases a diverse range of creative work including digital art, motion graphics, and brand
              identity projects. Each piece represents my commitment to visual storytelling and innovative design
              solutions.
            </p>
            <div className="mt-6">
              <Link href="/portfolio" className="inline-flex items-center text-primary hover:underline">
                View full portfolio
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
                  className="ml-1 h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
