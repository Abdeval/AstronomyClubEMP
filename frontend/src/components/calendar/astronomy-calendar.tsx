"use client"

import { useState, type SetStateAction } from "react"
import { Calendar, dateFnsLocalizer, type DayPropGetter } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { arDZ } from "date-fns/locale"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, Loader2 } from "lucide-react"
import AddEventDialog from "./add-event-dialog"
import type { AstronomyEvent } from "@/lib/types"
import { useWeather } from "@/hooks/use-weather"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./calendar-styles.css"
import CalendarToolbar from "./calendar-toolbar"
import EventDetailsDialog from "./event-details-dialog"
import { useUser } from "@/hooks"
import { useAstronomyCalendarEvents } from "@/hooks"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Setup localizer for react-big-calendar
const locales = {
  // "en-US": enUS,
  "ar-DZ": arDZ,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function AstronomyCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<AstronomyEvent | null>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [view, setView] = useState("month")
  const [date, setDate] = useState(new Date())
  const { isAdmin } = useUser({})
  const [customEvents, setCustomEvents] = useState<AstronomyEvent[]>([])

  const [location, setLocation] = useState({
    latitude: 35.980821, // Kheir Eddine by default
    longitude: 0.169862,
  })

  // Fetch weather data
  const { data: weatherData } = useWeather({
    latitude: location.latitude,
    longitude: location.longitude,
  })

  // Fetch astronomy events from API
  const {
    events: apiEvents,
    isLoading: isLoadingEvents,
    error: eventsError,
  } = useAstronomyCalendarEvents({
    latitude: location.latitude,
    longitude: location.longitude,
    startDate: new Date(),
    includeStaticEvents: false
  })

  // Combine API events with custom events
  const allEvents = [...(apiEvents || []), ...customEvents]

  // Handle event selection
  const handleSelectEvent = (event: AstronomyEvent) => {
    setSelectedEvent(event)
  }

  // Add a new event (admin only)
  const handleAddEvent = (newEvent: Omit<AstronomyEvent, "id">) => {
    const event: AstronomyEvent = {
      id: `custom-event-${Date.now()}`,
      ...newEvent,
    }
    setCustomEvents([...customEvents, event])
  }

  // Delete an event (admin only)
  const handleDeleteEvent = (eventId: string) => {
    // Only delete custom events, not API-generated ones
    if (eventId.startsWith("custom-event-")) {
      setCustomEvents(customEvents.filter((event) => event.id !== eventId))
    }
    setSelectedEvent(null)
  }

  // Handle location change
  const handleLocationChange = (latitude: number, longitude: number) => {
    setLocation({ latitude, longitude })
  }

  // Custom event styling based on type and weather
  const eventPropGetter = (event: AstronomyEvent) => {
    const eventDate = new Date(event.start)
    const dateStr = format(eventDate, "yyyy-MM-dd")
    const weather = weatherData?.[dateStr]
    const isSuitable = event.isSuitable !== undefined ? event.isSuitable : (weather?.isSuitable ?? true)

    let className = ""

    // Base class by event type
    switch (event.type) {
      case "meteor-shower":
        className = "event-meteor-shower"
        break
      case "planet-viewing":
        className = "event-planet-viewing"
        break
      case "moon-phase":
        className = "event-moon-phase"
        break
      case "eclipse":
        className = "event-eclipse"
        break
      case "deadline":
        className = "event-deadline"
        break
      case "sun-event":
        className = "event-sun"
        break
      default:
        className = "event-default"
    }

    // Add weather-based class
    if (!isSuitable) {
      className += " event-weather-unsuitable"
    }

    return { className }
  }

  // Custom day styling based on weather
  const dayPropGetter: DayPropGetter = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    const weather = weatherData?.[dateStr]

    if (weather) {
      return {
        className: `day-cell ${weather.isSuitable ? "weather-suitable" : "weather-unsuitable"}`,
        style: {
          position: "relative",
        },
      }
    }

    return {}
  }

  // Custom slot styling (time slots in week/day view)
  const slotPropGetter = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    const weather = weatherData?.[dateStr]

    if (weather) {
      return {
        className: `time-slot ${weather.isSuitable ? "weather-suitable" : "weather-unsuitable"}`,
      }
    }

    return {}
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs value={view} onValueChange={setView as any} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              {isLoadingEvents && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading celestial events...
                </div>
              )}
              {isAdmin && (
                <Button onClick={() => setIsAddEventOpen(true)} className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Add Event
                </Button>
              )}
            </div>
          </div>
        </Tabs>
      </div>

      {eventsError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>Error loading astronomy events: {eventsError.message}</AlertDescription>
        </Alert>
      )}

      <Card className="p-4 overflow-hidden rounded-[16px]">
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          views={["month", "week", "day", "agenda"]}
          view={view as any}
          date={date}
          onNavigate={setDate}
          onView={(newView: SetStateAction<string>) => setView(newView)}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventPropGetter}
          dayPropGetter={dayPropGetter}
          slotPropGetter={slotPropGetter}
          components={{
            toolbar: (props) => (
              <CalendarToolbar {...props} weatherData={weatherData} onLocationChange={handleLocationChange} />
            ),
          }}
          popup
        />
      </Card>

      {/* Weather legend */}
      <div className="flex items-center justify-center gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-200 dark:bg-green-800 rounded-full mr-2"></div>
          <span>Good viewing conditions</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-200 dark:bg-red-800 rounded-full mr-2"></div>
          <span>Poor viewing conditions</span>
        </div>
      </div>

      {/* Event type legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
          <span>Meteor Shower</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
          <span>Planet Viewing</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
          <span>Moon Phase</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-500 rounded-full mr-2"></div>
          <span>Eclipse</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span>Deadline</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
          <span>Sun Events</span>
        </div>
      </div>

      {/* Event details dialog */}
      {selectedEvent && (
        <EventDetailsDialog
          event={selectedEvent}
          weatherData={weatherData || {}}
          isAdmin={isAdmin}
          onClose={() => setSelectedEvent(null)}
          onDelete={handleDeleteEvent}
        />
      )}

      {/* Add event dialog (admin only) */}
      {isAdmin && <AddEventDialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen} onAddEvent={handleAddEvent} />}
    </div>
  )
}

