import type { WeatherData } from "@/lib/types"
import type { AstronomyEvent } from "@/lib/types"
import { addDays,format, startOfMonth, setHours } from "date-fns"


// ! astronomy events
// Sample astronomy events data
export function getAstronomyEvents(): AstronomyEvent[] {
  const today = new Date()
  const startOfCurrentMonth = startOfMonth(today)

  return [
    {
      id: "event-1",
      title: "Perseid Meteor Shower",
      description: "One of the best meteor showers of the year, with up to 60 meteors per hour at its peak.",
      type: "meteor-shower",
      start: addDays(startOfCurrentMonth, 12),
      end: addDays(startOfCurrentMonth, 13),
      location: "Northern Hemisphere",
      visibilityRequirements: "Clear, dark skies away from city lights",
    },
    {
      id: "event-2",
      title: "Full Moon",
      description:
        "The Moon will be located on the opposite side of the Earth as the Sun and its face will be fully illuminated.",
      type: "moon-phase",
      start: setHours(addDays(startOfCurrentMonth, 15), 19, 0),
      end: setHours(addDays(startOfCurrentMonth, 15), 23, 0),
      visibilityRequirements: "Clear skies",
    },
    {
      id: "event-3",
      title: "Jupiter at Opposition",
      description:
        "Jupiter will be at its closest approach to Earth and its face will be fully illuminated by the Sun.",
      type: "planet-viewing",
      start: setHours(addDays(startOfCurrentMonth, 8), 20, 0),
      end: setHours(addDays(startOfCurrentMonth, 9), 5, 0),
      visibilityRequirements: "Clear skies, low light pollution",
    },
    {
      id: "event-4",
      title: "Partial Solar Eclipse",
      description: "The Moon will partially cover the Sun's disk.",
      type: "eclipse",
      start: setHours(addDays(startOfCurrentMonth, 22), 10, 0),
      end: setHours(addDays(startOfCurrentMonth, 22), 12, 0),
      location: "South America",
      visibilityRequirements: "Clear skies, proper eye protection required",
    },
    {
      id: "event-5",
      title: "Venus at Greatest Eastern Elongation",
      description:
        "The best time to view Venus as it will be at its highest point above the horizon in the evening sky.",
      type: "planet-viewing",
      start: setHours(addDays(startOfCurrentMonth, 5), 19, 0),
      end: setHours(addDays(startOfCurrentMonth, 5), 21, 0),
      visibilityRequirements: "Clear western horizon after sunset",
    },
    {
      id: "event-6",
      title: "New Moon",
      description:
        "The Moon will be located on the same side of the Earth as the Sun and will not be visible in the night sky.",
      type: "moon-phase",
      start: setHours(addDays(startOfCurrentMonth, 1), 0, 0),
      end: setHours(addDays(startOfCurrentMonth, 1), 23, 59),
      visibilityRequirements: "Best time for deep-sky observation",
    },
    {
      id: "event-7",
      title: "Observation Deadline: Galaxy Photography",
      description: "Submit your galaxy photographs for the monthly competition.",
      type: "deadline",
      start: setHours(addDays(startOfCurrentMonth, 25), 23, 59),
      end: setHours(addDays(startOfCurrentMonth, 25), 23, 59),
    },
    {
      id: "event-8",
      title: "Lyrid Meteor Shower",
      description: "An average shower that can produce up to 20 meteors per hour at its peak.",
      type: "meteor-shower",
      start: setHours(addDays(startOfCurrentMonth, 18), 22, 0),
      end: setHours(addDays(startOfCurrentMonth, 19), 4, 0),
      location: "Northern Hemisphere",
      visibilityRequirements: "Dark skies, minimal moonlight",
    },
    {
      id: "event-9",
      title: "Saturn Observation Night",
      description: "Group observation of Saturn's rings and moons.",
      type: "planet-viewing",
      start: setHours(addDays(startOfCurrentMonth, 10), 21, 0),
      end: setHours(addDays(startOfCurrentMonth, 10), 23, 30),
      location: "Observatory Hill",
      visibilityRequirements: "Clear skies, telescope required",
    },
    {
      id: "event-10",
      title: "Observation Deadline: Moon Photography",
      description: "Submit your lunar photographs for the monthly competition.",
      type: "deadline",
      start: setHours(addDays(startOfCurrentMonth, 16), 23, 59),
      end: setHours(addDays(startOfCurrentMonth, 16), 23, 59),
    },
  ]
}

// ! weather data

// Sample weather data for the current month
export function getWeatherData(): Record<string, WeatherData> {
  const today = new Date()
  const startOfCurrentMonth = startOfMonth(today)
  const weatherData: Record<string, WeatherData> = {}

  // Generate weather data for the current month
  for (let i = 0; i < 31; i++) {
    const date = addDays(startOfCurrentMonth, i)
    const dateStr = format(date, "yyyy-MM-dd")

    // Randomly generate weather conditions
    const random = Math.random()
    let condition: "clear" | "cloudy" | "rainy"
    let visibility: number

    if (random < 0.5) {
      condition = "clear"
      visibility = 70 + Math.floor(Math.random() * 30) // 70-100%
    } else if (random < 0.8) {
      condition = "cloudy"
      visibility = 40 + Math.floor(Math.random() * 30) // 40-70%
    } else {
      condition = "rainy"
      visibility = 10 + Math.floor(Math.random() * 30) // 10-40%
    }

    // Determine if conditions are suitable for astronomy observation
    const isSuitable = condition === "clear" && visibility > 60

    weatherData[dateStr] = {
      condition,
      visibility,
      isSuitable,
    }
  }

  return weatherData
}


