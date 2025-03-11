"use client"

import { useState, useEffect } from "react"
import { format, addMonths, subMonths } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, Filter, Plus, X, MoonStar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { AstronomyMonthCalendar } from "@/components/calendar/astronomy-month-calendar"
import { AddEventDialog } from "@/components/calendar/add-event-dialog"
import { EventDetails } from "@/components/calendar/event-details"
import { ViewSelector } from "@/components/calendar/view-selector"
import { CelestialEventsPanel } from "@/components/calendar/celestial-events-panel"
import { FilterPanel } from "@/components/calendar/filter-panel"
import type { AstronomyEvent, FilterCriteria } from "@/lib/types"
import { SAMPLE_ASTRONOMY_EVENTS, TEAM_MEMBERS, EVENT_TYPES, TELESCOPES, CELESTIAL_OBJECTS } from "@/lib/data"
import { MoonPhaseIndicator } from "./moon-phase-indecator"

export function AstronomyCalendarView() {
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<AstronomyEvent | null>(null)
  const [events, setEvents] = useState<AstronomyEvent[]>(SAMPLE_ASTRONOMY_EVENTS)
  const [filteredEvents, setFilteredEvents] = useState<AstronomyEvent[]>(SAMPLE_ASTRONOMY_EVENTS)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterCriteria>({
    eventTypes: [],
    telescopes: [],
    teamMembers: [],
    celestialObjects: [],
  })

  // Apply filters whenever events or filters change
  useEffect(() => {
    let result = [...events]

    if (filters.eventTypes.length > 0) {
      result = result.filter((event) => filters.eventTypes.includes(event.eventType))
    }

    if (filters.telescopes.length > 0) {
      result = result.filter((event) => event.telescopeId && filters.telescopes.includes(event.telescopeId))
    }

    if (filters.teamMembers.length > 0) {
      result = result.filter((event) => event.teamMembers?.some((member) => filters.teamMembers.includes(member.id)))
    }

    if (filters.celestialObjects.length > 0) {
      result = result.filter((event) =>
        event.celestialObjects?.some((obj) => filters.celestialObjects.includes(obj.id)),
      )
    }

    setFilteredEvents(result)
  }, [events, filters])

  const handlePrevious = () => {
    setCurrentDate((prev) => subMonths(prev, 1))
  }

  const handleNext = () => {
    setCurrentDate((prev) => addMonths(prev, 1))
  }

  const handleAddEvent = (event: AstronomyEvent) => {
    setEvents((prev) => [...prev, { ...event, id: Math.random().toString(36).substr(2, 9) }])
    setIsAddEventOpen(false)
  }

  const handleUpdateEvent = (updatedEvent: AstronomyEvent) => {
    setEvents((prev) => prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)))
    setSelectedEvent(null)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId))
    setSelectedEvent(null)
  }

  const handleClearFilters = () => {
    setFilters({
      eventTypes: [],
      telescopes: [],
      teamMembers: [],
      celestialObjects: [],
    })
  }

  const hasActiveFilters = () => {
    return (
      filters.eventTypes.length > 0 ||
      filters.telescopes.length > 0 ||
      filters.teamMembers.length > 0 ||
      filters.celestialObjects.length > 0
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold px-4 flex items-center">
            {format(currentDate, "MMMM yyyy")}
            <MoonPhaseIndicator date={currentDate} className="ml-2" />
          </h2>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <ViewSelector view={view} onChange={setView} />

          <Button
            variant={isFilterOpen ? "default" : "outline"}
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="relative"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters() && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {Object.values(filters).flat().length}
              </Badge>
            )}
          </Button>

          <Button onClick={() => setIsAddEventOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2 items-center">
          <div className="text-sm text-muted-foreground mr-2">Active filters:</div>
          {filters.eventTypes.map((type) => {
            const eventType = EVENT_TYPES.find((t) => t.id === type)
            return (
              <Badge key={type} variant="secondary" className="flex items-center gap-1">
                {eventType?.icon && <eventType.icon className="h-3 w-3" />}
                {eventType?.name}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      eventTypes: prev.eventTypes.filter((t) => t !== type),
                    }))
                  }
                />
              </Badge>
            )
          })}

          {filters.telescopes.map((telescopeId) => {
            const telescope = TELESCOPES.find((t) => t.id === telescopeId)
            return (
              <Badge key={telescopeId} variant="secondary" className="flex items-center gap-1">
                {telescope?.name}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      telescopes: prev.telescopes.filter((t) => t !== telescopeId),
                    }))
                  }
                />
              </Badge>
            )
          })}

          {filters.teamMembers.map((memberId) => {
            const member = TEAM_MEMBERS.find((m) => m.id === memberId)
            return (
              <Badge key={memberId} variant="secondary" className="flex items-center gap-1">
                <span className="size-2 rounded-full mr-1" style={{ backgroundColor: member?.color }} />
                {member?.name}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      teamMembers: prev.teamMembers.filter((m) => m !== memberId),
                    }))
                  }
                />
              </Badge>
            )
          })}

          {filters.celestialObjects.map((objectId) => {
            const object = CELESTIAL_OBJECTS.find((o) => o.id === objectId)
            return (
              <Badge key={objectId} variant="secondary" className="flex items-center gap-1">
                {object?.name}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      celestialObjects: prev.celestialObjects.filter((o) => o !== objectId),
                    }))
                  }
                />
              </Badge>
            )
          })}

          <Button variant="ghost" size="sm" className="text-xs h-7 px-2" onClick={handleClearFilters}>
            Clear all
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <div className="bg-background rounded-xl border shadow-sm">
            <AstronomyMonthCalendar date={currentDate} events={filteredEvents} onEventClick={setSelectedEvent} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-background rounded-xl border shadow-sm p-4">
            <h3 className="font-medium mb-2 flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar
            </h3>
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={(date) => date && setCurrentDate(date)}
              className="rounded-md border"
            />
          </div>

          <div className="bg-background rounded-xl border shadow-sm p-4">
            <h3 className="font-medium mb-2 flex items-center">
              <MoonStar className="h-4 w-4 mr-2" />
              Celestial Events
            </h3>
            <CelestialEventsPanel currentMonth={currentDate} />
          </div>

          <div className="bg-background rounded-xl border shadow-sm p-4">
            <h3 className="font-medium mb-2">Research Team</h3>
            <div className="space-y-2">
              {TEAM_MEMBERS.map((member) => (
                <div key={member.id} className="flex items-center">
                  <div className="size-2 rounded-full mr-2" style={{ backgroundColor: member.color }} />
                  <span>{member.name}</span>
                  <span className="text-xs text-muted-foreground ml-1">• {member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isFilterOpen && <FilterPanel filters={filters} setFilters={setFilters} />}

      <AddEventDialog
        open={isAddEventOpen}
        onOpenChange={setIsAddEventOpen}
        onAddEvent={handleAddEvent}
        teamMembers={TEAM_MEMBERS}
        eventTypes={EVENT_TYPES}
        telescopes={TELESCOPES}
        celestialObjects={CELESTIAL_OBJECTS}
      />

      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          open={!!selectedEvent}
          onOpenChange={() => setSelectedEvent(null)}
          onUpdate={handleUpdateEvent}
          onDelete={handleDeleteEvent}
          teamMembers={TEAM_MEMBERS}
          eventTypes={EVENT_TYPES}
          telescopes={TELESCOPES}
          celestialObjects={CELESTIAL_OBJECTS}
        />
      )}
    </div>
  )
}

