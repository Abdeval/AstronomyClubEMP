
import { useState } from "react"
import { format } from "date-fns"
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  CloudFog,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { WeatherData } from "@/lib/types"
import { useWeatherForecast } from "@/hooks/use-weather"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { LOCATIONS } from "@/lib/data"


interface CalendarToolbarProps {
date: Date
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void
  label: string
  weatherData?: Record<string, WeatherData>
  onLocationChange?: (latitude: number, longitude: number) => void
}

export default function CalendarToolbar({
  date,
  onNavigate,
  label,
  weatherData,
  onLocationChange,
}: CalendarToolbarProps) {
  const dateStr = format(date, "yyyy-MM-dd")

  const [selectedLocation, setSelectedLocation] = useState(() => {
    const currentLocationName = localStorage.getItem("current-location");
    if(currentLocationName) return currentLocationName;
    return "Mostaganem, Kheir Eddine";
  })
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  isGettingLocation;

  const { data: forecastData, isLoading } = useWeatherForecast({
    enabled: !weatherData || Object.keys(weatherData).length === 0,
  })

  const actualWeatherData = weatherData && Object.keys(weatherData).length > 0 ? weatherData : forecastData?.daily || {}

  const todayWeather = actualWeatherData[dateStr]

  const handleLocationChange = (locationName: string) => {
    setSelectedLocation(locationName)
    localStorage.setItem("current-location", locationName);
    if (locationName === "current") {
      getCurrentLocation()
      return
    }

    const location = LOCATIONS.find((loc) => loc.name === locationName)
    if (location && onLocationChange) {
      onLocationChange(location.latitude, location.longitude)
    }
  }

  // ! Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation || !onLocationChange) return

    setIsGettingLocation(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationChange(position.coords.latitude, position.coords.longitude)
        setSelectedLocation("Current Location")
        setIsGettingLocation(false)
      },
      (error) => {
        console.error("Error getting location:", error)
        setIsGettingLocation(false)
      },
    )
  }

  const renderWeatherIcon = () => {
    if (!todayWeather) return null

    switch (todayWeather.condition) {
      case "clear":
        return <Sun className="h-5 w-5 text-primary" />
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      case "snowy":
        return <CloudSnow className="h-5 w-5 text-blue-200" />
      case "foggy":
        return <CloudFog className="h-5 w-5 text-gray-400" />
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => onNavigate("PREV")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={() => onNavigate("TODAY")}>
          Today
        </Button>
        <Button variant="outline" size="icon" onClick={() => onNavigate("NEXT")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold">{label}</h2>

        {isLoading ? (
          <div className="flex items-center ml-4">
            <Skeleton className="h-5 w-24" />
          </div>
        ) : todayWeather ? (
          <div className="flex items-center ml-4 text-sm">
            {renderWeatherIcon()}
            <span className="ml-1 capitalize">{todayWeather.condition}</span>
            <span className="mx-2">|</span>
            <span>Visibility: {todayWeather.visibility}%</span>
            {todayWeather.isSuitable !== undefined && (
              <Badge className="ml-2" variant={todayWeather.isSuitable ? "default" : "outline"}>
                {todayWeather.isSuitable ? "Good for viewing" : "Poor for viewing"}
              </Badge>
            )}
          </div>
        ) : null}
      </div>

      {onLocationChange && (
        <div className="flex items-center gap-2">
          <Select value={selectedLocation} onValueChange={handleLocationChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Use My Location
                </div>
              </SelectItem>

              {LOCATIONS.map((location) => (
                <SelectItem key={location.name} value={location.name}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

