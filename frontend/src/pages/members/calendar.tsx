import { AstronomyCalendarView } from "@/components/calendar/astronomy-calendar-view"

export default function CalendarPage() {
  return (
    <div className="container mx-auto py-4 px-2 h-full relative">
      <h1 className="text-4xl font-bold mb-2 text-foreground">Astronomy Research Calendar</h1>
      <p className="text-muted-foreground mb-8">Manage observations, research deadlines, and team events</p>
      <AstronomyCalendarView />
    </div>
  )
}

