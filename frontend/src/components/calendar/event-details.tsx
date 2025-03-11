"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, Trash } from "lucide-react"

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
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MultiSelect, MultiSelectItem } from "@/components/calendar/multi-select"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { AstronomyEvent, TeamMember, EventType, Telescope, CelestialObject } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { TimePickerDemo } from "@/components/calendar/time-picker"

interface EventDetailsProps {
  event: AstronomyEvent
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (event: AstronomyEvent) => void
  onDelete: (eventId: string) => void
  teamMembers: TeamMember[]
  eventTypes: EventType[]
  telescopes: Telescope[]
  celestialObjects: CelestialObject[]
}

export function EventDetails({
  event,
  open,
  onOpenChange,
  onUpdate,
  onDelete,
  teamMembers,
  eventTypes,
  telescopes,
  celestialObjects,
}: EventDetailsProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [startTime, setStartTime] = useState(new Date(event.startDate))
  const [endTime, setEndTime] = useState(
    event.endDate ? new Date(event.endDate) : new Date(new Date(event.startDate).getTime() + 60 * 60 * 1000),
  )

  // Extract the team member IDs from the event
  const teamMemberIds = event.teamMembers?.map((member) => member.id) || []

  // Extract the celestial object IDs from the event
  const celestialObjectIds = event.celestialObjects?.map((obj) => obj.id) || []

  const form = useForm<AstronomyEvent>({
    defaultValues: {
      ...event,
      teamMemberIds,
      celestialObjectIds,
    },
  })

  // Update form when the event changes
  useEffect(() => {
    form.reset({
      ...event,
      teamMemberIds,
      celestialObjectIds,
    })
    setStartTime(new Date(event.startDate))
    setEndTime(event.endDate ? new Date(event.endDate) : new Date(new Date(event.startDate).getTime() + 60 * 60 * 1000))
  }, [event, form])

  const watchEventType = form.watch("eventType")
  const watchIsAllDay = form.watch("isAllDay")

  const onSubmit = (data: AstronomyEvent) => {
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

    onUpdate({
      ...data,
      startDate: startDate.toISOString(),
      endDate: endDate ? endDate.toISOString() : null,
      telescopeName,
      teamMembers: selectedTeamMembers,
      celestialObjects: selectedCelestialObjects,
    })
  }

  const handleDelete = () => {
    onDelete(event.id)
    setIsConfirmOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Astronomy Event</DialogTitle>
          <DialogDescription>Make changes to this event.</DialogDescription>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
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
                        <Input {...field} />
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
                        <Textarea className="resize-none" {...field} />
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
                        <Input {...field} />
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
                        <Select onValueChange={field.onChange} value={field.value || ""}>
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
                            className="resize-none"
                            placeholder="Weather conditions, exposure settings, filters, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </TabsContent>

              <DialogFooter className="gap-2 sm:space-x-0">
                <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                  <AlertDialogTrigger asChild>
                    <Button type="button" variant="outline" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the event.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

