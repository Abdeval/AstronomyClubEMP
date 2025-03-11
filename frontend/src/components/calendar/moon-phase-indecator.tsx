"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Function to calculate moon phase (0-1)
function getMoonPhase(date: Date) {
  // Algorithm to calculate moon phase (approximate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // Convert the date to Julian date
  const a = Math.floor((14 - month) / 12)
  const y = year + 4800 - a
  const m = month + 12 * a - 3

  const jd =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045

  // Calculate the phase
  let phase = (jd - 2451550.1) / 29.53
  phase = phase - Math.floor(phase)
  if (phase < 0) phase += 1

  return phase
}

// Function to get the name of the moon phase
function getMoonPhaseName(phase: number): string {
  if (phase < 0.03 || phase >= 0.97) return "New Moon"
  if (phase < 0.22) return "Waxing Crescent"
  if (phase < 0.28) return "First Quarter"
  if (phase < 0.47) return "Waxing Gibbous"
  if (phase < 0.53) return "Full Moon"
  if (phase < 0.72) return "Waning Gibbous"
  if (phase < 0.78) return "Last Quarter"
  return "Waning Crescent"
}

interface MoonPhaseIndicatorProps {
  date: Date
  className?: string
  size?: "default" | "small"
}

export function MoonPhaseIndicator({ date, className, size = "default" }: MoonPhaseIndicatorProps) {
  const [moonPhase, setMoonPhase] = useState(0)
  const [phaseName, setPhaseName] = useState("")

  useEffect(() => {
    const phase = getMoonPhase(date)
    setMoonPhase(phase)
    setPhaseName(getMoonPhaseName(phase))
  }, [date])

  // Calculate rotation based on moon phase (0-1)
  // This simplification just rotates a half moon
  const rotation = moonPhase * 360

  // Calculate the illumination gradient
  // For simplicity: full = white, new = black
  const illumination = Math.abs(0.5 - moonPhase) * 2 // 0 = full/new, 1 = quarter

  // Use different gradients for waxing and waning
  const waxing = moonPhase < 0.5

  const gradientDirection = waxing ? "to right" : "to left"

  const fullMoon = moonPhase > 0.47 && moonPhase < 0.53
  const newMoon = moonPhase < 0.03 || moonPhase >= 0.97

  let background
  if (fullMoon) {
    background = "bg-white"
  } else if (newMoon) {
    background = "bg-gray-900"
  } else {
    background = `bg-gradient-to-r from-gray-900 ${waxing ? "to-white" : "from-white to-gray-900"}`
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "relative flex items-center justify-center border border-gray-300 rounded-full overflow-hidden shadow-inner",
              size === "default" ? "size-6" : "size-4",
              className,
            )}
          >
            <div className={cn("absolute inset-0 rounded-full", background)}></div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {phaseName} ({Math.round(moonPhase * 100)}%)
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

