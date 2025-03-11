
import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MultiSelect, MultiSelectItem } from "@/components/calendar/multi-select"
import { Textarea } from "@/components/ui/textarea"
import type { AstronomyEvent, TeamMember, EventType, Telescope, CelestialObject } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { TimePickerDemo } from "@/components/calendar/time-picker"

interface AddEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddEvent: (event: AstronomyEvent) => void
  teamMembers: TeamMember[]
  eventTypes: EventType[]
  telescopes: Telescope[]
  celestialObjects: CelestialObject[]
}

export function AddEventDialog({
  open,
  onOpenChange,
  onAddEvent,
  teamMembers,
  eventTypes,
  telescopes,
  celestialObjects,
}: AddEventDialogProps) {
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date(Date.now() + 60 * 60 * 1000)) // 1 hour later
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null)

  const defaultStartDate = new Date()
  defaultStartDate.setHours(20, 0, 0, 0) // 8:00 PM default for astronomy events

  const defaultEndDate = new Date()
  defaultEndDate.setHours(23, 0, 0, 0) // 11:00 PM default for astronomy events

  const form = useForm<Omit<AstronomyEvent, "id">>({
    defaultValues: {
      title: "",
      description: "",
      startDate: defaultStartDate.toISOString(),
      endDate: defaultEndDate.toISOString(),
      eventType: "observation",
      isAllDay: false,
      location: "",
      telescopeId: "",
      teamMemberIds: [],
      celestialObjectIds: [],
      observationNotes: "",
    },
  })

  const watchEventType = form.watch("eventType")
  const watchIsAllDay = form.watch("isAllDay")

  // Update selected event type whenever the form value changes
  if (watchEventType !== selectedEventType) {
    setSelectedEventType(watchEventType)
  }

  const onSubmit = (data: Omit<AstronomyEvent, "id">) => {
    // Construct start date with time
    const startDate = new Date(data.startDate)
    if (!data.isAllDay) {
      startDate.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0)
    } else {
      startDate.setHours(0, 0, 0, 0)
    }

    // Construct end date with time
    const endDate = data.endDate ? new Date(data.endDate) : null
    if (endDate && !data.isAllDay) {
      endDate.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0)
    } else if (endDate && data.isAllDay) {
      endDate.setHours(23, 59, 59, 999)
    }

    // Find telescope name if telescopeId is provided
    let telescopeName = null
    if (data.telescopeId) {
      const telescope = telescopes.find((t) => t.id === data.telescopeId)
      telescopeName = telescope?.name || null
    }

    // Get selected team members
    const selectedTeamMembers = data.teamMemberIds
      ? (data.teamMemberIds.map((id) => teamMembers.find((member) => member.id === id)).filter(Boolean) as TeamMember[])
      : []

    // Get selected celestial objects
    const selectedCelestialObjects = data.celestialObjectIds
      ? (data.celestialObjectIds
          .map((id) => celestialObjects.find((obj) => obj.id === id))
          .filter(Boolean) as CelestialObject[])
      : []

    onAddEvent({
      ...data,
      id: "", // This will be set by the parent component
      startDate: startDate.toISOString(),
      endDate: endDate ? endDate.toISOString() : null,
      telescopeName,
      teamMembers: selectedTeamMembers,
      celestialObjects: selectedCelestialObjects,
    })
    form.reset()
    setStartTime(new Date())
    setEndTime(new Date(Date.now() + 60 * 60 * 1000))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Astronomy Event</DialogTitle>
          <DialogDescription>Schedule observations, meetings, deadlines, or track celestial events.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details & Participants</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <TabsContent value="basic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="eventType"
                  rules={{ required: "Event type is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          setSelectedEventType(value)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              <div className="flex items-center">
                                {type.icon && <type.icon className="h-4 w-4 mr-2" />}
                                {type.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            watchEventType === "observation"
                              ? "Observe M31 Andromeda Galaxy"
                              : watchEventType === "meeting"
                                ? "Team Planning Meeting"
                                : watchEventType === "deadline"
                                  ? "Research Paper Submission"
                                  : watchEventType === "celestial"
                                    ? "Meteor Shower Peak"
                                    : "Event title"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Add details about this event..." className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isAllDay"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">All Day Event</FormLabel>
                        <FormDescription>Toggle if this event runs the entire day</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="startDate"
                      rules={{ required: "Start date is required" }}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                >
                                  {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => field.onChange(date?.toISOString() || "")}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {!watchIsAllDay && (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Time</FormLabel>
                        <TimePickerDemo setDate={setStartTime} date={startTime} />
                      </FormItem>
                    )}
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                >
                                  {field.value ? format(new Date(field.value), "PPP") : <span>Same as start</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => field.onChange(date?.toISOString() || "")}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>Optional. Defaults to start date if not specified.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {!watchIsAllDay && form.getValues("endDate") && (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Time</FormLabel>
                        <TimePickerDemo setDate={setEndTime} date={endTime} />
                      </FormItem>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            watchEventType === "observation"
                              ? "Main Observatory"
                              : watchEventType === "meeting"
                                ? "Conference Room A"
                                : "Location"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchEventType === "observation" && (
                  <FormField
                    control={form.control}
                    name="telescopeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telescope</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select telescope" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {telescopes.map((telescope) => (
                              <SelectItem key={telescope.id} value={telescope.id}>
                                {telescope.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Select the telescope to be used for this observation</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="teamMemberIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Members</FormLabel>
                      <FormControl>
                        <MultiSelect
                          placeholder="Assign team members"
                          selected={field.value || []}
                          options={teamMembers.map((member) => ({
                            value: member.id,
                            label: member.name,
                          }))}
                          onChange={(selected) => field.onChange(selected)}
                          renderItem={(item) => {
                            const member = teamMembers.find((m) => m.id === item.value)
                            return (
                              <MultiSelectItem key={item.value} value={item.value}>
                                <div className="flex items-center">
                                  {member && (
                                    <span
                                      className="size-2 rounded-full mr-2"
                                      style={{ backgroundColor: member.color }}
                                    />
                                  )}
                                  {item.label}
                                </div>
                              </MultiSelectItem>
                            )
                          }}
                        />
                      </FormControl>
                      <FormDescription>Select the team members involved in this event</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {(watchEventType === "observation" || watchEventType === "celestial") && (
                  <FormField
                    control={form.control}
                    name="celestialObjectIds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Celestial Objects</FormLabel>
                        <FormControl>
                          <MultiSelect
                            placeholder="Select celestial objects"
                            selected={field.value || []}
                            options={celestialObjects.map((obj) => ({
                              value: obj.id,
                              label: obj.name,
                            }))}
                            onChange={(selected) => field.onChange(selected)}
                          />
                        </FormControl>
                        <FormDescription>Select the celestial objects related to this event</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {watchEventType === "observation" && (
                  <FormField
                    control={form.control}
                    name="observationNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observation Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Weather conditions, exposure settings, filters, etc."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </TabsContent>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Event</Button>
              </DialogFooter>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

