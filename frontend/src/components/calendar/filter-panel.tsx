"use client"

import type * as React from "react"
import { EVENT_TYPES, TEAM_MEMBERS, TELESCOPES, CELESTIAL_OBJECTS } from "@/lib/data"
import type { FilterCriteria } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FilterPanelProps {
  filters: FilterCriteria
  setFilters: React.Dispatch<React.SetStateAction<FilterCriteria>>
}

export function FilterPanel({ filters, setFilters }: FilterPanelProps) {
  const toggleEventType = (typeId: string) => {
    setFilters((prev) => {
      if (prev.eventTypes.includes(typeId)) {
        return {
          ...prev,
          eventTypes: prev.eventTypes.filter((id) => id !== typeId),
        }
      } else {
        return {
          ...prev,
          eventTypes: [...prev.eventTypes, typeId],
        }
      }
    })
  }

  const toggleTelescope = (telescopeId: string) => {
    setFilters((prev) => {
      if (prev.telescopes.includes(telescopeId)) {
        return {
          ...prev,
          telescopes: prev.telescopes.filter((id) => id !== telescopeId),
        }
      } else {
        return {
          ...prev,
          telescopes: [...prev.telescopes, telescopeId],
        }
      }
    })
  }

  const toggleTeamMember = (memberId: string) => {
    setFilters((prev) => {
      if (prev.teamMembers.includes(memberId)) {
        return {
          ...prev,
          teamMembers: prev.teamMembers.filter((id) => id !== memberId),
        }
      } else {
        return {
          ...prev,
          teamMembers: [...prev.teamMembers, memberId],
        }
      }
    })
  }

  const toggleCelestialObject = (objectId: string) => {
    setFilters((prev) => {
      if (prev.celestialObjects.includes(objectId)) {
        return {
          ...prev,
          celestialObjects: prev.celestialObjects.filter((id) => id !== objectId),
        }
      } else {
        return {
          ...prev,
          celestialObjects: [...prev.celestialObjects, objectId],
        }
      }
    })
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Filter Events</CardTitle>
        <CardDescription>Filter events by type, telescope, team member, or celestial object</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="event-types">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="event-types">Event Types</TabsTrigger>
            <TabsTrigger value="telescopes">Telescopes</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="celestial">Celestial Objects</TabsTrigger>
          </TabsList>

          <TabsContent value="event-types" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {EVENT_TYPES.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`event-type-${type.id}`}
                    checked={filters.eventTypes.includes(type.id)}
                    onCheckedChange={() => toggleEventType(type.id)}
                  />
                  <label
                    htmlFor={`event-type-${type.id}`}
                    className="flex items-center gap-1.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type.icon && <type.icon className="h-4 w-4" />}
                    {type.name}
                  </label>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="telescopes" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {TELESCOPES.map((telescope) => (
                <div key={telescope.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`telescope-${telescope.id}`}
                    checked={filters.telescopes.includes(telescope.id)}
                    onCheckedChange={() => toggleTelescope(telescope.id)}
                  />
                  <label
                    htmlFor={`telescope-${telescope.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {telescope.name}
                  </label>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="mt-0">
            <ScrollArea className="h-72">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TEAM_MEMBERS.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`member-${member.id}`}
                      checked={filters.teamMembers.includes(member.id)}
                      onCheckedChange={() => toggleTeamMember(member.id)}
                    />
                    <label
                      htmlFor={`member-${member.id}`}
                      className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <span className="size-2 rounded-full" style={{ backgroundColor: member.color }} />
                      {member.name}
                      <span className="text-xs text-muted-foreground">• {member.role}</span>
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="celestial" className="mt-0">
            <ScrollArea className="h-72">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CELESTIAL_OBJECTS.map((object) => (
                  <div key={object.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`object-${object.id}`}
                      checked={filters.celestialObjects.includes(object.id)}
                      onCheckedChange={() => toggleCelestialObject(object.id)}
                    />
                    <label
                      htmlFor={`object-${object.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {object.name}
                      <span className="text-xs text-muted-foreground ml-1">• {object.type}</span>
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

