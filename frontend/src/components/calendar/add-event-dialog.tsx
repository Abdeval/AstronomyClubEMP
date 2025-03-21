
import type React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { AstronomyEvent } from "@/lib/types"

interface AddEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddEvent: (event: Omit<AstronomyEvent, "id">) => void
}

export default function AddEventDialog({ open, onOpenChange, onAddEvent }: AddEventDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<string>("deadline")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState("20:00")
  const [endTime, setEndTime] = useState("22:00")
  const [location, setLocation] = useState("")
  const [visibilityRequirements, setVisibilityRequirements] = useState("")

  const [titleError, setTitleError] = useState("")
  const [dateError, setDateError] = useState("")

  const validateForm = () => {
    let isValid = true

    if (!title.trim()) {
      setTitleError("Title is required")
      isValid = false
    } else {
      setTitleError("")
    }

    if (!date) {
      setDateError("Date is required")
      isValid = false
    } else {
      setDateError("")
    }

    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Create start and end dates from the date and time inputs
      const startDate = new Date(date!)
      const [startHours, startMinutes] = startTime.split(":").map(Number)
      startDate.setHours(startHours, startMinutes)

      const endDate = new Date(date!)
      const [endHours, endMinutes] = endTime.split(":").map(Number)
      endDate.setHours(endHours, endMinutes)

      const newEvent: Omit<AstronomyEvent, "id"> = {
        title,
        description,
        type,
        start: startDate,
        end: endDate,
        location,
        visibilityRequirements,
      }

      onAddEvent(newEvent)
      resetForm()
      onOpenChange(false)
    }
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setType("deadline")
    setDate(new Date())
    setStartTime("20:00")
    setEndTime("22:00")
    setLocation("")
    setVisibilityRequirements("")
    setTitleError("")
    setDateError("")
  }

  const handleClose = () => {
    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Astronomy Event</DialogTitle>
            <DialogDescription>Create a new astronomy event or observation deadline.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
              />
              {titleError && <p className="text-sm text-destructive">{titleError}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Event Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">Observation Deadline</SelectItem>
                  <SelectItem value="meteor-shower">Meteor Shower</SelectItem>
                  <SelectItem value="planet-viewing">Planet Viewing</SelectItem>
                  <SelectItem value="moon-phase">Moon Phase</SelectItem>
                  <SelectItem value="eclipse">Eclipse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
              {dateError && <p className="text-sm text-destructive">{dateError}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-time">Start Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-time">End Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location (optional)"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter event description"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="visibility">Visibility Requirements</Label>
              <Textarea
                id="visibility"
                value={visibilityRequirements}
                onChange={(e) => setVisibilityRequirements(e.target.value)}
                placeholder="Enter visibility requirements (e.g., clear skies, low light pollution)"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

