
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Calendar, MapPin, Cloud, Sun, Moon, Star, Trash2, Clock, Tag } from "lucide-react"
import type { AstronomyEvent } from "@/lib/types"

interface EventDetailsDialogProps {
  event: AstronomyEvent
  weatherData: Record<string, any>
  isAdmin: boolean
  onClose: () => void
  onDelete: (eventId: string) => void
}

export default function EventDetailsDialog({
  event,
  weatherData,
  isAdmin,
  onClose,
  onDelete,
}: EventDetailsDialogProps) {
  const eventDate = format(new Date(event.start), "yyyy-MM-dd")
  const weather = weatherData[eventDate]

  // Determine if event is suitable for viewing
  const isSuitable = event.isSuitable !== undefined ? event.isSuitable : (weather?.isSuitable ?? true)

  // Format dates
  const startTime = format(new Date(event.start), "h:mm a")
  const endTime = format(new Date(event.end), "h:mm a")
  const dateFormatted = format(new Date(event.start), "EEEE, MMMM d, yyyy")

  // Get icon based on event type
  const getEventIcon = () => {
    switch (event.type) {
      case "meteor-shower":
        return <Star className="h-5 w-5 text-blue-500" />
      case "planet-viewing":
        return <Star className="h-5 w-5 text-purple-500" />
      case "moon-phase":
        return <Moon className="h-5 w-5 text-yellow-500" />
      case "eclipse":
        return <Sun className="h-5 w-5 text-gray-500" />
      case "sun-event":
        return <Sun className="h-5 w-5 text-orange-500" />
      case "deadline":
        return <Calendar className="h-5 w-5 text-red-500" />
      default:
        return <Calendar className="h-5 w-5" />
    }
  }

  // Get weather icon
  const getWeatherIcon = () => {
    if (!weather) return null

    switch (weather.condition) {
      case "clear":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-400" />
      default:
        return <Cloud className="h-5 w-5 text-gray-400" />
    }
  }

  // Format event type for display
  const formatEventType = (type: string) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getEventIcon()}
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{dateFormatted}</span>
            </div>
            <Badge variant={isSuitable ? "default" : "outline"}>
              {isSuitable ? "Good viewing conditions" : "Poor viewing conditions"}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {startTime} - {endTime}
            </span>
          </div>

          {event.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span>{formatEventType(event.type)}</span>
          </div>

          {event.body && (
            <div className="mt-4 space-y-2 text-sm">
              <h4 className="font-medium">Celestial Body Details:</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>Body:</div>
                <div>{event.body.name}</div>

                <div>Altitude:</div>
                <div>{event.body.altitude.toFixed(1)}°</div>

                <div>Azimuth:</div>
                <div>{event.body.azimuth.toFixed(1)}°</div>

                {event.body.magnitude !== undefined && (
                  <>
                    <div>Magnitude:</div>
                    <div>{event.body.magnitude.toFixed(2)}</div>
                  </>
                )}
              </div>
            </div>
          )}

          {weather && (
            <div className="mt-4 space-y-2 text-sm">
              <h4 className="font-medium flex items-center gap-2">
                {getWeatherIcon()}
                Weather Conditions:
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>Condition:</div>
                <div className="capitalize">{weather.condition}</div>

                <div>Visibility:</div>
                <div>{weather.visibility}%</div>

                {weather.cloudCover !== undefined && (
                  <>
                    <div>Cloud Cover:</div>
                    <div>{weather.cloudCover}%</div>
                  </>
                )}

                {weather.temperature !== undefined && (
                  <>
                    <div>Temperature:</div>
                    <div>{weather.temperature}°C</div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="mt-2">
            <p className="text-sm">{event.description}</p>
          </div>

          {event.visibilityRequirements && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Visibility Requirements:</span> {event.visibilityRequirements}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {isAdmin && !event.id.startsWith("sun-") && !event.id.startsWith("planet-") && (
              <Button variant="destructive" size="sm" onClick={() => onDelete(event.id)}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </div>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

