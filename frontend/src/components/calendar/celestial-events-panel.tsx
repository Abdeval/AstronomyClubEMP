"use client"
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isFuture, isPast, isToday } from "date-fns"
import { Star, Calendar } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { CELESTIAL_EVENTS } from "@/lib/data"
import { cn } from "@/lib/utils"

interface CelestialEventsPanelProps {
  currentMonth: Date
}

export function CelestialEventsPanel({ currentMonth }: CelestialEventsPanelProps) {
  // Get all days in the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  // Filter celestial events for the current month
  const eventsInMonth = CELESTIAL_EVENTS.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate >= startOfMonth(currentMonth) && eventDate <= endOfMonth(currentMonth)
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="space-y-3">
      {eventsInMonth.length > 0 ? (
        <ScrollArea className="h-[180px] pr-3">
          {eventsInMonth.map((event, index) => {
            const eventDate = new Date(event.date)
            const isUpcoming = isFuture(eventDate)
            const isPastEvent = isPast(eventDate) && !isToday(eventDate)

            return (
              <div
                key={index}
                className={cn("mb-3 pb-3 border-b last:border-b-0 last:mb-0 last:pb-0", isPastEvent && "opacity-60")}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={cn(
                      "size-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                      isUpcoming ? "bg-purple-100" : "bg-slate-100",
                    )}
                  >
                    <Star className="size-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{event.name}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Calendar className="size-3" />
                      {format(eventDate, "MMMM d, yyyy")}
                      {isToday(eventDate) && (
                        <Badge
                          variant="outline"
                          className="ml-1 text-[10px] h-4 px-1 py-0 bg-green-50 text-green-700 border-green-200"
                        >
                          Today
                        </Badge>
                      )}
                    </div>
                    {event.description && <p className="mt-1 text-xs text-muted-foreground">{event.description}</p>}
                  </div>
                </div>
              </div>
            )
          })}
        </ScrollArea>
      ) : (
        <div className="text-sm text-muted-foreground text-center py-8">No celestial events this month</div>
      )}
    </div>
  )
}

