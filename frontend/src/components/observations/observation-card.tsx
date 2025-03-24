import { useState } from "react"
import { format } from "date-fns"
import { Calendar, MapPin, Telescope, ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Observation } from "@/lib/types"
import { Link } from "react-router-dom"


interface ObservationCardProps {
  observation: Observation
}

export default function ObservationCard({ observation }: ObservationCardProps) {
  const [imageError, setImageError] = useState(false)

  const hasImages = observation.images && observation.images.length > 0
  const mainImage = hasImages ? observation?.images[0]?.url : null

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <div className="aspect-video relative bg-muted">
        {mainImage && !imageError ? (
          <img
            src={mainImage || "/placeholder.svg"}
            alt={observation.title}
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <Telescope className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        {hasImages && observation?.images?.length > 1 && (
          <Badge className="absolute bottom-2 right-2 bg-black/60 text-white">
            +{observation?.images?.length - 1} more
          </Badge>
        )}
      </div>

      <CardContent className="p-4 flex-grow">
        <Link to={`/members/observations/${observation.id}`} className="hover:underline">
          <h3 className="text-lg font-semibold mb-2">{observation.title}</h3>
        </Link>

        {observation.details && (
          <p className="text-muted-foreground text-sm line-clamp-3 mb-3">{observation.details}</p>
        )}

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {format(new Date(observation.date), "PPP")}
          </div>
          {observation.location && (
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {observation.location}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-auto">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={observation.user.image || ""} alt={observation.user.firstName} />
            <AvatarFallback>{observation.user.firstName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{observation.user.firstName}</span>
        </div>

        <Button variant="ghost" size="sm" asChild>
          <Link to={`/members/observations/${observation.id}`}>
            View <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

