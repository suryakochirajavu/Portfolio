import type React from "react"
export const metadata = {
  title: "Portfolio - Sangeeth P Girish",
  description: "View my creative portfolio showcasing digital art, motion graphics, and brand identity projects.",
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
