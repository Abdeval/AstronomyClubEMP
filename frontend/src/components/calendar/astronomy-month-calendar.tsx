"use client"

import { useMemo } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  differenceInMinutes,
  addMinutes,
  isPast,
} from "date-fns"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import type { AstronomyEvent } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { EVENT_TYPES } from "@/lib/data"
import { MoonPhaseIndicator } from "./moon-phase-indecator"

interface AstronomyMonthCalendarProps {
  date: Date
  events: AstronomyEvent[]
  onEventClick: (event: AstronomyEvent) => void
}

export function AstronomyMonthCalendar({ date, events, onEventClick }: AstronomyMonthCalendarProps) {
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }, [date])

  const weeks = useMemo(() => {
    const weeks = []
    let week = []

    for (let i = 0; i < calendarDays.length; i++) {
      week.push(calendarDays[i])
      if (week.length === 7 || i === calendarDays.length - 1) {
        weeks.push([...week])
        week = []
      }
    }

    return weeks
  }, [calendarDays])

  const getDayEvents = (day: Date) => {
    return events
      .filter((event) => {
        const eventStart = new Date(event.startDate)
        const eventEnd = event.endDate ? new Date(event.endDate) : eventStart

        const startOfDay = new Date(day)
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date(day)
        endOfDay.setHours(23, 59, 59, 999)

        return eventStart <= endOfDay && eventEnd >= startOfDay
      })
      .sort((a, b) => {
        // Sort by start time
        const aStart = new Date(a.startDate)
        const bStart = new Date(b.startDate)
        return aStart.getTime() - bStart.getTime()
      })
  }

  const getEventIcon = (event: AstronomyEvent) => {
    const eventType = EVENT_TYPES.find((type) => type.id === event.eventType)
    if (eventType?.icon) {
      const Icon = eventType.icon
      return <Icon className="size-3 flex-shrink-0" />
    }
    return null
  }

  const getEventTimeString = (event: AstronomyEvent) => {
    const start = new Date(event.startDate)
    const hasEndDate = !!event.endDate
    const end = hasEndDate ? new Date(event.endDate) : start

    // If it's an all-day event or spans multiple days
    if (event.isAllDay || (hasEndDate && differenceInMinutes(end, start) >= 24 * 60)) {
      return "All day"
    }

    return format(start, "h:mm a")
  }

  const getEventStatusBadge = (event: AstronomyEvent) => {
    const now = new Date()
    const start = new Date(event.startDate)
    const end = event.endDate ? new Date(event.endDate) : addMinutes(start, 60) // Default 1 hour

    if (now > end) {
      return null // Past event, no badge needed
    }

    if (now >= start && now <= end) {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 text-[10px] px-1 py-0">
          Now
        </Badge>
      )
    }

    // Upcoming but very soon (within 24 hours)
    const hoursTillStart = differenceInMinutes(start, now) / 60
    if (hoursTillStart < 24) {
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 text-[10px] px-1 py-0">
          Soon
        </Badge>
      )
    }

    return null
  }

  const getEventClasses = (event: AstronomyEvent) => {
    const eventType = EVENT_TYPES.find((type) => type.id === event.eventType)
    const isExpired = isPast(new Date(event.endDate || event.startDate))

    return cn(
      "text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity",
      isExpired && "opacity-60",
      event.eventType === "observation" && "bg-indigo-100 text-indigo-800 border border-indigo-200",
      event.eventType === "meeting" && "bg-emerald-100 text-emerald-800 border border-emerald-200",
      event.eventType === "deadline" && "bg-red-100 text-red-800 border border-red-200",
      event.eventType === "celestial" && "bg-purple-100 text-purple-800 border border-purple-200",
      event.eventType === "maintenance" && "bg-amber-100 text-amber-800 border border-amber-200",
    )
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 text-center">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="py-2 font-medium text-sm">
            {day}
          </div>
        ))}
      </div>

      <div className="border-t">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 border-b last:border-b-0">
            {week.map((day, dayIndex) => {
              const dayEvents = getDayEvents(day)
              const isCurrentMonth = isSameMonth(day, date)

              return (
                <div
                  key={dayIndex}
                  className={cn(
                    "min-h-[130px] p-1 border-r last:border-r-0",
                    isCurrentMonth ? "bg-background" : "bg-muted/30",
                  )}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1">
                      <span
                        className={cn(
                          "text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full",
                          isToday(day) && "bg-primary text-primary-foreground",
                          !isCurrentMonth && "text-muted-foreground",
                        )}
                      >
                        {format(day, "d")}
                      </span>
                      <MoonPhaseIndicator date={day} size="small" />
                    </div>

                    {isCurrentMonth && dayEvents.length > 0 && (
                      <span className="text-xs text-muted-foreground">{dayEvents.length}</span>
                    )}
                  </div>

                  <div className="space-y-1 max-h-[100px] overflow-y-auto pr-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <TooltipProvider key={event.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className={getEventClasses(event)} onClick={() => onEventClick(event)}>
                              <div className="flex items-center gap-1 justify-between">
                                <div className="flex items-center gap-1 truncate">
                                  {getEventIcon(event)}
                                  <span className="truncate">{event.title}</span>
                                </div>
                                {getEventStatusBadge(event)}
                              </div>
                              <div className="flex items-center text-[10px] opacity-80 mt-0.5">
                                <Clock className="size-2.5 mr-0.5" />
                                {getEventTimeString(event)}
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="max-w-[260px]">
                              <div className="flex items-center gap-1 mb-1">
                                {getEventIcon(event)}
                                <p className="font-medium">{event.title}</p>
                              </div>

                              <div className="text-xs flex items-center gap-1 mb-1">
                                <Clock className="size-3" />
                                {format(new Date(event.startDate), "MMM d, h:mm a")}
                                {event.endDate &&
                                  ` - ${format(new Date(event.endDate), differenceInMinutes(new Date(event.endDate), new Date(event.startDate)) > 24 * 60 ? "MMM d, h:mm a" : "h:mm a")}`}
                              </div>

                              {event.location && (
                                <p className="text-xs text-muted-foreground mb-1">📍 {event.location}</p>
                              )}

                              {event.telescopeId && (
                                <p className="text-xs text-muted-foreground mb-1">🔭 {event.telescopeName}</p>
                              )}

                              {event.description && (
                                <p className="text-xs mt-1 text-muted-foreground line-clamp-2">{event.description}</p>
                              )}

                              {event.teamMembers && event.teamMembers.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {event.teamMembers.slice(0, 3).map((member) => (
                                    <Badge key={member.id} variant="secondary" className="text-[10px] h-4 px-1">
                                      <span
                                        className="size-1.5 rounded-full mr-1"
                                        style={{ backgroundColor: member.color }}
                                      />
                                      {member.name}
                                    </Badge>
                                  ))}
                                  {event.teamMembers.length > 3 && (
                                    <Badge variant="secondary" className="text-[10px] h-4 px-1">
                                      +{event.teamMembers.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}

                    {dayEvents.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{dayEvents.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

