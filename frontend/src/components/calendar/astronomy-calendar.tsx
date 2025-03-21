import { useState, useEffect, SetStateAction } from "react"
import { Calendar, dateFnsLocalizer, DayPropGetter } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { enUS } from "date-fns/locale"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import AddEventDialog from "./add-event-dialog"
import { getAstronomyEvents } from "@/lib/data"
import { getWeatherData } from "@/lib/data"
import type { AstronomyEvent, WeatherData } from "@/lib/types"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./calendar-styles.css"
import CalendarToolbar from "./calendar-toolbar"
import EventDetailsDialog from "./event-details-dialog"

// Setup localizer for react-big-calendar
const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function AstronomyCalendar() {
  const [events, setEvents] = useState<AstronomyEvent[]>([])
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({})
  const [selectedEvent, setSelectedEvent] = useState<AstronomyEvent | null>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [view, setView] = useState("month")
  const [date, setDate] = useState(new Date())
  const [isAdmin, setIsAdmin] = useState(true) // In a real app, this would come from auth

  // Fetch astronomy events and weather data
  useEffect(() => {
    const astronomyEvents = getAstronomyEvents()
    setEvents(astronomyEvents)

    const weather = getWeatherData()
    setWeatherData(weather)
  }, [])

  // Handle event selection
  const handleSelectEvent = (event: AstronomyEvent) => {
    setSelectedEvent(event)
  }

  // Add a new event (admin only)
  const handleAddEvent = (newEvent: Omit<AstronomyEvent, "id">) => {
    const event: AstronomyEvent = {
      id: `event-${Date.now()}`,
      ...newEvent,
    }
    setEvents([...events, event])
  }

  // Delete an event (admin only)
  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
    setSelectedEvent(null)
  }

  // Custom event styling based on type and weather
  const eventPropGetter = (event: AstronomyEvent) => {
    const eventDate = new Date(event.start)
    const dateStr = format(eventDate, "yyyy-MM-dd")
    const weather = weatherData[dateStr]

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
      default:
        className = "event-default"
    }

    // Add weather-based class
    if (weather && !weather.isSuitable) {
      className += " event-weather-unsuitable"
    }

    return { className }
  }

  // Custom day styling based on weather
  const dayPropGetter = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    const weather = weatherData[dateStr]

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
    const weather = weatherData[dateStr]

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
        <Tabs value={view} onValueChange={setView} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
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

      <Card className="p-4 overflow-hidden rounded-[16px]">
        <Calendar
          localizer={localizer}
          events={events}
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
          dayPropGetter={dayPropGetter as DayPropGetter}
          slotPropGetter={slotPropGetter}
          components={{
            toolbar: (props:any) => <CalendarToolbar {...props} weatherData={weatherData} />,
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
      </div>

      {/* Event details dialog */}
      {selectedEvent && (
        <EventDetailsDialog
          event={selectedEvent}
          weatherData={weatherData}
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

