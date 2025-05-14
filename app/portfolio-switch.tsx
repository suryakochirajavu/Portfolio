"use client"

import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function PortfolioSwitch() {
  const router = useRouter()

  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      router.push("/portfolio")
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="portfolio-switch" className="text-sm text-gray-400">
        Enter Portfolio
      </Label>
      <Switch id="portfolio-switch" aria-label="Toggle portfolio view" onCheckedChange={handleSwitchChange} />
    </div>
  )
}
