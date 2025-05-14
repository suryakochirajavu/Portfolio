"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeDebug() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
      <div className="space-y-2 text-sm">
        <p>
          <strong>Theme:</strong> {theme}
        </p>
        <p>
          <strong>Resolved Theme:</strong> {resolvedTheme}
        </p>
        <div className="flex gap-2 mt-2">
          <button onClick={() => setTheme("light")} className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded">
            Set Light
          </button>
          <button onClick={() => setTheme("dark")} className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded">
            Set Dark
          </button>
          <button onClick={() => setTheme("system")} className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded">
            Set System
          </button>
        </div>
      </div>
    </div>
  )
}
