import { Calendar, GitBranch, Images, Settings2, UserIcon, Users2 } from "lucide-react";
import { DashboardNavType, Planet } from "./types";

export const colorsClassNames = [
  "background",
  "foreground",
  "primary-foreground",
  "muted",
  "muted-foreground",
  "popover",
  "primary",
  "secondary",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "chart-1",
  "radius",
];


export const planets: Planet[] = [
  {
    id: 1,
    name: "Mercury",
    description: "The smallest planet, closest to the Sun.",
    image:
      "https://solarsystem.nasa.gov/system/resources/detail_files/771_PIA16853.jpg",
  },
  {
    id: 2,
    name: "Venus",
    description: "Often called Earth's twin due to its similar size.",
    image:
      "https://solarsystem.nasa.gov/system/resources/detail_files/2524_PIA23791.jpg",
  },
  {
    id: 3,
    name: "Earth",
    description: "Our home planet and the only known planet with life.",
    image:
      "https://solarsystem.nasa.gov/system/resources/detail_files/786_1-bluemarble_west.jpg",
  },
  {
    id: 4,
    name: "Mars",
    description: "Known as the Red Planet due to its reddish appearance.",
    image:
      "https://solarsystem.nasa.gov/system/resources/detail_files/2534_mars.jpg",
  },
  {
    id: 5,
    name: "Jupiter",
    description: "The largest planet in our solar system.",
    image:
      "https://solarsystem.nasa.gov/system/resources/detail_files/2486_stsci-h-p1936a_1800.jpg",
  },
  {
    id: 6,
    name: "Saturn",
    description: "Famous for its prominent ring system.",
    image:
      "https://solarsystem.nasa.gov/system/resources/detail_files/2490_stsci-h-p1943a-f_1200.jpg",
  },
  {
    id: 7,
    name: "Uranus",
    description: "An ice giant with a tilted rotation axis.",
    image:
      "https://solarsystem.nasa.gov/system/resources/detail_files/599_PIA18182.jpg",
  },
  {
    id: 8,
    name: "Neptune",
    description: "The windiest planet in our solar system.",
    image:
      "https://solarsystem.nasa.gov/system/resources/detail_files/611_PIA01492.jpg",
  },
];


export const dashboardNavs:DashboardNavType[] = [
  {
    name: "profile",
    icon: <UserIcon className="text-foreground"/>
  },
  {
    name: "calendar",
    icon: <Calendar className="text-foreground"/>
  },
  {
    name: "collaborators",
    icon: <Users2 className="text-foreground"/>
  },
  {
    name: "groups",
    icon: <GitBranch className="text-foreground"/>
  },
  {
    name: "images",
    icon: <Images className="text-foreground"/>
  },
  {
    name: "settings",
    icon: <Settings2 className="text-foreground"/>
  },
]

// ! calendar data 

import type { AstronomyEvent, TeamMember, EventType, Telescope, CelestialObject, CelestialEvent } from "./types"
import { TelescopeIcon, Users, Clock, Star, Wrench } from "lucide-react"
import { addDays, addHours, format } from "date-fns"

// Team Members Data
export const TEAM_MEMBERS: TeamMember[] = [
  { id: "user1", name: "Dr. Emma Chen", color: "#4f46e5", role: "Lead Astronomer" },
  { id: "user2", name: "Prof. James Wilson", color: "#0ea5e9", role: "Research Director" },
  { id: "user3", name: "Dr. Maya Patel", color: "#14b8a6", role: "Astrophysicist" },
  { id: "user4", name: "Alex Rodriguez", color: "#ec4899", role: "PhD Candidate" },
  { id: "user5", name: "Dr. Sarah Kim", color: "#f59e0b", role: "Data Scientist" },
  { id: "user6", name: "Michael Johnson", color: "#8b5cf6", role: "Observatory Technician" },
]

// Event Types
export const EVENT_TYPES: EventType[] = [
  { id: "observation", name: "Telescope Observation", icon: TelescopeIcon },
  { id: "meeting", name: "Team Meeting", icon: Users },
  { id: "deadline", name: "Research Deadline", icon: Clock },
  { id: "celestial", name: "Celestial Event", icon: Star },
  { id: "maintenance", name: "Equipment Maintenance", icon: Wrench },
]

// Telescopes
export const TELESCOPES: Telescope[] = [
  { id: "tel1", name: "Main Observatory Reflector", type: "Optical", aperture: "2.4m" },
  { id: "tel2", name: "Radio Telescope Array", type: "Radio", aperture: "100m" },
  { id: "tel3", name: "Schmidt Camera", type: "Optical", aperture: "0.9m" },
  { id: "tel4", name: "Robotic Survey Telescope", type: "Optical", aperture: "1.2m" },
  { id: "tel5", name: "Spectroscopic Instrument", type: "Optical", aperture: "0.8m" },
]

// Celestial Objects
export const CELESTIAL_OBJECTS: CelestialObject[] = [
  { id: "obj1", name: "M31 Andromeda Galaxy", type: "Galaxy", distance: "2.5 million ly", magnitude: 3.4 },
  { id: "obj2", name: "M45 Pleiades", type: "Star Cluster", constellation: "Taurus", magnitude: 1.6 },
  { id: "obj3", name: "M57 Ring Nebula", type: "Nebula", constellation: "Lyra", magnitude: 8.8 },
  { id: "obj4", name: "M13 Hercules Cluster", type: "Globular Cluster", constellation: "Hercules", magnitude: 5.8 },
  { id: "obj5", name: "NGC 5139 Omega Centauri", type: "Globular Cluster", constellation: "Centaurus", magnitude: 3.9 },
  { id: "obj6", name: "M42 Orion Nebula", type: "Nebula", constellation: "Orion", magnitude: 4.0 },
  { id: "obj7", name: "M51 Whirlpool Galaxy", type: "Galaxy", distance: "23 million ly", magnitude: 8.4 },
  { id: "obj8", name: "M27 Dumbbell Nebula", type: "Nebula", constellation: "Vulpecula", magnitude: 7.5 },
  { id: "obj9", name: "M8 Lagoon Nebula", type: "Nebula", constellation: "Sagittarius", magnitude: 6.0 },
  { id: "obj10", name: "M104 Sombrero Galaxy", type: "Galaxy", constellation: "Virgo", magnitude: 8.0 },
  { id: "obj11", name: "M1 Crab Nebula", type: "Nebula", constellation: "Taurus", magnitude: 8.4 },
  { id: "obj12", name: "M87 Virgo A", type: "Galaxy", constellation: "Virgo", magnitude: 8.6 },
]

// Celestial Events
export const CELESTIAL_EVENTS: CelestialEvent[] = [
  {
    name: "Perseid Meteor Shower Peak",
    date: format(addDays(new Date(), 5), "yyyy-MM-dd"),
    description: "Up to 100 meteors per hour visible from dark sites",
    type: "meteor",
  },
  {
    name: "Full Moon",
    date: format(addDays(new Date(), 12), "yyyy-MM-dd"),
    type: "lunar",
  },
  {
    name: "New Moon",
    date: format(addDays(new Date(), -2), "yyyy-MM-dd"),
    description: "Best time for deep sky observations",
    type: "lunar",
  },
  {
    name: "Jupiter Opposition",
    date: format(addDays(new Date(), 8), "yyyy-MM-dd"),
    description: "Jupiter at its brightest, visible all night",
    type: "planetary",
  },
  {
    name: "Partial Solar Eclipse",
    date: format(addDays(new Date(), 18), "yyyy-MM-dd"),
    description: "Visible from northern hemisphere locations",
    type: "eclipse",
  },
]

// Sample Astronomy Events Data
const today = new Date()

export const SAMPLE_ASTRONOMY_EVENTS: AstronomyEvent[] = [
  {
    id: "event1",
    title: "Observe M31 Andromeda Galaxy",
    description: "Detailed imaging of Andromeda's spiral structure",
    startDate: addHours(today, 22).toISOString(), // 10 PM today
    endDate: addHours(today, 26).toISOString(), // 2 AM tomorrow
    eventType: "observation",
    telescopeId: "tel1",
    telescopeName: "Main Observatory Reflector",
    teamMembers: [TEAM_MEMBERS[0], TEAM_MEMBERS[3]],
    celestialObjects: [CELESTIAL_OBJECTS[0]],
    location: "Main Observatory",
    observationNotes: "Using narrowband filters, targeting outer regions of the galaxy",
  },
  {
    id: "event2",
    title: "Weekly Research Team Meeting",
    description: "Project updates and assignment of new observation tasks",
    startDate: addDays(today, 1).toISOString(),
    endDate: addDays(addHours(today, 2), 1).toISOString(),
    eventType: "meeting",
    teamMembers: [TEAM_MEMBERS[0], TEAM_MEMBERS[1], TEAM_MEMBERS[2], TEAM_MEMBERS[3], TEAM_MEMBERS[4]],
    location: "Conference Room A",
  },
  {
    id: "event3",
    title: "Grant Proposal Deadline",
    description: "NSF Astronomy Research Grant final submission",
    startDate: addDays(today, 7).toISOString(),
    isAllDay: true,
    eventType: "deadline",
    teamMembers: [TEAM_MEMBERS[1], TEAM_MEMBERS[4]],
  },
  {
    id: "event4",
    title: "Telescope Maintenance",
    description: "Regular mirror cleaning and calibration",
    startDate: addDays(today, 2).toISOString(),
    endDate: addDays(addHours(today, 4), 2).toISOString(),
    eventType: "maintenance",
    telescopeId: "tel1",
    telescopeName: "Main Observatory Reflector",
    teamMembers: [TEAM_MEMBERS[5]],
  },
  {
    id: "event5",
    title: "Perseid Meteor Shower Observation",
    description: "All-night monitoring of meteor activity",
    startDate: addDays(today, 5).toISOString(),
    endDate: addDays(addHours(today, 8), 5).toISOString(),
    eventType: "observation",
    teamMembers: [TEAM_MEMBERS[0], TEAM_MEMBERS[3], TEAM_MEMBERS[5]],
    location: "Field Station Alpha",
  },
  {
    id: "event6",
    title: "Jupiter and Saturn Imaging",
    description: "High-resolution imaging of gas giants",
    startDate: addDays(addHours(today, 21), 3).toISOString(),
    endDate: addDays(addHours(today, 24), 3).toISOString(),
    eventType: "observation",
    telescopeId: "tel4",
    telescopeName: "Robotic Survey Telescope",
    teamMembers: [TEAM_MEMBERS[2]],
  },
  {
    id: "event7",
    title: "Research Paper Submission",
    description: "Submit findings on exoplanet atmosphere analysis",
    startDate: addDays(today, 14).toISOString(),
    isAllDay: true,
    eventType: "deadline",
    teamMembers: [TEAM_MEMBERS[0], TEAM_MEMBERS[2], TEAM_MEMBERS[4]],
  },
  {
    id: "event8",
    title: "Radio Telescope Array Observations",
    description: "Pulsar timing campaign",
    startDate: addDays(addHours(today, 18), 1).toISOString(),
    endDate: addDays(addHours(today, 26), 1).toISOString(),
    eventType: "observation",
    telescopeId: "tel2",
    telescopeName: "Radio Telescope Array",
    teamMembers: [TEAM_MEMBERS[1], TEAM_MEMBERS[5]],
    location: "Radio Observatory",
  },
  {
    id: "event9",
    title: "Department Colloquium",
    description: "Guest speaker from ESO presenting on the ELT",
    startDate: addDays(addHours(today, 15), 6).toISOString(),
    endDate: addDays(addHours(today, 17), 6).toISOString(),
    eventType: "meeting",
    location: "Lecture Hall B",
    teamMembers: [TEAM_MEMBERS[0], TEAM_MEMBERS[1], TEAM_MEMBERS[2], TEAM_MEMBERS[3], TEAM_MEMBERS[4]],
  },
  {
    id: "event10",
    title: "Globular Cluster Survey",
    description: "Spectroscopic observations of several globular clusters",
    startDate: addDays(addHours(today, 22), 4).toISOString(),
    endDate: addDays(addHours(today, 26), 4).toISOString(),
    eventType: "observation",
    telescopeId: "tel5",
    telescopeName: "Spectroscopic Instrument",
    teamMembers: [TEAM_MEMBERS[3]],
    celestialObjects: [CELESTIAL_OBJECTS[3], CELESTIAL_OBJECTS[4]],
    location: "Main Observatory",
    observationNotes: "Focus on metallicity measurements",
  },
]


