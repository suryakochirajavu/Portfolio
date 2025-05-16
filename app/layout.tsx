import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { EnhancedLayout } from "./enhanced-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sangeeth P Girish - Digital Artist & Creative Director",
  description:
    "Portfolio of Sangeeth P Girish, a digital artist and creative director specializing in digital art, motion graphics, and brand identity.",
  generator: 'v0.dev',
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <EnhancedLayout>{children}</EnhancedLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
