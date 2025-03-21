import { format } from "date-fns"
import { ChevronLeft, ChevronRight, CalendarIcon, Cloud, Sun, CloudRain } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WeatherData } from "@/lib/types"

interface CalendarToolbarProps {
  date: Date
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void
  label: string
  weatherData: Record<string, WeatherData>
}

export default function CalendarToolbar({ date, onNavigate, label, weatherData }: CalendarToolbarProps) {
  const dateStr = format(date, "yyyy-MM-dd")
  const todayWeather = weatherData[dateStr]

  const renderWeatherIcon = () => {
    if (!todayWeather) return null

    if (todayWeather.condition === "clear") {
      return <Sun className="h-5 w-5 text-yellow-500" />
    } else if (todayWeather.condition === "cloudy") {
      return <Cloud className="h-5 w-5 text-gray-500" />
    } else if (todayWeather.condition === "rainy") {
      return <CloudRain className="h-5 w-5 text-blue-500" />
    }

    return null
  }

  return (
    <div className="flex justify-between items-center mb-4">
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

        {todayWeather && (
          <div className="flex items-center ml-4 text-sm">
            {renderWeatherIcon()}
            <span className="ml-1">{todayWeather.condition}</span>
            <span className="mx-2">|</span>
            <span>Visibility: {todayWeather.visibility}%</span>
          </div>
        )}
      </div>
    </div>
  )
}

