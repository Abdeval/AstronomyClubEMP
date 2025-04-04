import type { AstronomyEvent } from "@/lib/types"
import { addDays, startOfMonth, setHours } from "date-fns"


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
      start: setHours(addDays(startOfCurrentMonth, 15), 19),
      end: setHours(addDays(startOfCurrentMonth, 15), 23),
      visibilityRequirements: "Clear skies",
    },
    {
      id: "event-3",
      title: "Jupiter at Opposition",
      description:
        "Jupiter will be at its closest approach to Earth and its face will be fully illuminated by the Sun.",
      type: "planet-viewing",
      start: setHours(addDays(startOfCurrentMonth, 8), 20),
      end: setHours(addDays(startOfCurrentMonth, 9), 5),
      visibilityRequirements: "Clear skies, low light pollution",
    },
    {
      id: "event-4",
      title: "Partial Solar Eclipse",
      description: "The Moon will partially cover the Sun's disk.",
      type: "eclipse",
      start: setHours(addDays(startOfCurrentMonth, 22), 10),
      end: setHours(addDays(startOfCurrentMonth, 22), 12),
      location: "South America",
      visibilityRequirements: "Clear skies, proper eye protection required",
    },
    {
      id: "event-5",
      title: "Venus at Greatest Eastern Elongation",
      description:
        "The best time to view Venus as it will be at its highest point above the horizon in the evening sky.",
      type: "planet-viewing",
      start: setHours(addDays(startOfCurrentMonth, 5), 19),
      end: setHours(addDays(startOfCurrentMonth, 5), 21),
      visibilityRequirements: "Clear western horizon after sunset",
    },
    {
      id: "event-6",
      title: "New Moon",
      description:
        "The Moon will be located on the same side of the Earth as the Sun and will not be visible in the night sky.",
      type: "moon-phase",
      start: setHours(addDays(startOfCurrentMonth, 1), 0),
      end: setHours(addDays(startOfCurrentMonth, 1), 23),
      visibilityRequirements: "Best time for deep-sky observation",
    },
    {
      id: "event-7",
      title: "Observation Deadline: Galaxy Photography",
      description: "Submit your galaxy photographs for the monthly competition.",
      type: "deadline",
      start: setHours(addDays(startOfCurrentMonth, 25), 23),
      end: setHours(addDays(startOfCurrentMonth, 25), 23),
    },
    {
      id: "event-8",
      title: "Lyrid Meteor Shower",
      description: "An average shower that can produce up to 20 meteors per hour at its peak.",
      type: "meteor-shower",
      start: setHours(addDays(startOfCurrentMonth, 18), 22),
      end: setHours(addDays(startOfCurrentMonth, 19), 4),
      location: "Northern Hemisphere",
      visibilityRequirements: "Dark skies, minimal moonlight",
    },
    {
      id: "event-9",
      title: "Saturn Observation Night",
      description: "Group observation of Saturn's rings and moons.",
      type: "planet-viewing",
      start: setHours(addDays(startOfCurrentMonth, 10), 21),
      end: setHours(addDays(startOfCurrentMonth, 10), 23),
      location: "Observatory Hill",
      visibilityRequirements: "Clear skies, telescope required",
    },
    {
      id: "event-10",
      title: "Observation Deadline: Moon Photography",
      description: "Submit your lunar photographs for the monthly competition.",
      type: "deadline",
      start: setHours(addDays(startOfCurrentMonth, 16), 23),
      end: setHours(addDays(startOfCurrentMonth, 16), 23),
    },
  ]
}

// ! the weather locations

export const LOCATIONS = [
  { name: "New York, USA", latitude: 40.7128, longitude: -74.006 },
  // { name: "London, UK", latitude: 51.5074, longitude: -0.1278 },
  // { name: "Tokyo, Japan", latitude: 35.6762, longitude: 139.6503 },
  // { name: "Sydney, Australia", latitude: -33.8688, longitude: 151.2093 },
  // { name: "Cape Town, South Africa", latitude: -33.9249, longitude: 18.4241 },
  // { name: "Atacama Desert, Chile", latitude: -24.5, longitude: -69.25 }, // Great for stargazing
  // { name: "Mauna Kea, Hawaii", latitude: 19.8207, longitude: -155.4681 }, // Famous observatory
  // { name: "La Palma, Canary Islands", latitude: 28.7136, longitude: -17.8834 }, // Home to many telescopes
  // { name: "Namibian Desert, Namibia", latitude: -24.7255, longitude: 15.2717 }, // Dark skies
  // { name: "Aoraki Mackenzie, New Zealand", latitude: -43.734, longitude: 170.0966 }, // Dark sky reserve
  { name: "Mostaganem, Kheir Eddine", latitude: 35.980821, longitude: 0.169862 },
  { name: "Alger, Borj El Bahri", latitude: 36.803050, longitude: 3.250674 },
]
