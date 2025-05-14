"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="gap-2">
        <div className="h-4 w-4" />
        <span>Theme</span>
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button variant="outline" size="sm" onClick={() => setTheme(isDark ? "light" : "dark")} className="gap-2">
      {isDark ? (
        <>
          <Sun className="h-4 w-4 text-yellow-500" />
          <span>Light</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-blue-500" />
          <span>Dark</span>
        </>
      )}
    </Button>
  )
}
