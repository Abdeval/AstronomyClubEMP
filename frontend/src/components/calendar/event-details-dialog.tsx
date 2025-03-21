import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { AstronomyEvent, WeatherData } from "@/lib/types"
import { Cloud, Sun, CloudRain, AlertTriangle, Calendar, Clock, MapPin } from "lucide-react"

interface EventDetailsDialogProps {
  event: AstronomyEvent
  weatherData: Record<string, WeatherData>
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
  const eventDate = new Date(event.start)
  const dateStr = format(eventDate, "yyyy-MM-dd")
  const weather = weatherData[dateStr]

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "meteor-shower":
        return "Meteor Shower"
      case "planet-viewing":
        return "Planet Viewing"
      case "moon-phase":
        return "Moon Phase"
      case "eclipse":
        return "Eclipse"
      case "deadline":
        return "Deadline"
      default:
        return "Event"
    }
  }

  const getEventTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "meteor-shower":
        return "blue"
      case "planet-viewing":
        return "purple"
      case "moon-phase":
        return "yellow"
      case "eclipse":
        return "gray"
      case "deadline":
        return "red"
      default:
        return "default"
    }
  }

  const renderWeatherIcon = () => {
    if (!weather) return null

    if (weather.condition === "clear") {
      return <Sun className="h-5 w-5 text-yellow-500" />
    } else if (weather.condition === "cloudy") {
      return <Cloud className="h-5 w-5 text-gray-500" />
    } else if (weather.condition === "rainy") {
      return <CloudRain className="h-5 w-5 text-blue-500" />
    }

    return null
  }

  return (
    <Dialog open={!!event} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{event.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <Badge variant={getEventTypeBadgeVariant(event.type) as any} className="text-xs">
              {getEventTypeLabel(event.type)}
            </Badge>

            {weather && !weather.isSuitable && (
              <div className="flex items-center text-amber-500">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-sm">Poor viewing conditions</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-[20px_1fr] gap-x-2 gap-y-3 items-start">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">{format(new Date(event.start), "EEEE, MMMM d, yyyy")}</p>
              {event.end && event.start !== event.end && (
                <p className="text-sm text-muted-foreground">to {format(new Date(event.end), "EEEE, MMMM d, yyyy")}</p>
              )}
            </div>

            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">{format(new Date(event.start), "h:mm a")}</p>
              {event.end && <p className="text-sm text-muted-foreground">to {format(new Date(event.end), "h:mm a")}</p>}
            </div>

            {event.location && (
              <>
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <p>{event.location}</p>
              </>
            )}
          </div>

          {event.description && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>
          )}

          {weather && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <h4 className="text-sm font-medium mb-2">Weather Conditions</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {renderWeatherIcon()}
                  <span className="ml-1 capitalize">{weather.condition}</span>
                </div>
                <div className="text-sm">
                  <span>Visibility: {weather.visibility}%</span>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <span className={weather.isSuitable ? "text-green-500" : "text-red-500"}>
                  {weather.isSuitable ? "Good conditions for observation" : "Poor conditions for observation"}
                </span>
              </div>
            </div>
          )}

          {event.visibilityRequirements && (
            <div className="mt-2">
              <h4 className="text-sm font-medium mb-1">Visibility Requirements</h4>
              <p className="text-sm text-muted-foreground">{event.visibilityRequirements}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {isAdmin && event.type === "deadline" && (
            <Button variant="destructive" onClick={() => onDelete(event.id)}>
              Delete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

