"use client"

import { LayoutGrid, Calendar, CalendarDays } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ViewSelectorProps {
  view: "month" | "week" | "day"
  onChange: (view: "month" | "week" | "day") => void
}

export function ViewSelector({ view, onChange }: ViewSelectorProps) {
  return (
    <TooltipProvider>
      <ToggleGroup type="single" value={view} onValueChange={(value) => value && onChange(value as any)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem value="month" aria-label="Month view">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>Month view</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem value="week" aria-label="Week view">
              <CalendarDays className="h-4 w-4" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>Week view</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem value="day" aria-label="Day view">
              <Calendar className="h-4 w-4" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>Day view</TooltipContent>
        </Tooltip>
      </ToggleGroup>
    </TooltipProvider>
  )
}

