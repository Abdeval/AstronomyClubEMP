import { Article, Event, Group, Image, MemberStatus, Task, User } from "shared-types"


export type EquipmentGroup = "webdev" | "rovers" | "astrography" | "all"
export type EquipmentStatus = "available" | "in-use" | "maintenance" | "broken"
export type GroupStatus = "active" | "inactive" | "archived" | "pending"

// ! events

export type EventParamsType = {
  body: "sun" | "moon";
  fromDate: string;
  toDate: string;
  latitude: number;
  longitude: number;
  elevation: number;
};

// ! bodies (like planets , sun ...etc)

export type BodyParamsType = {
  fromDate: string;
  toDate: string;
  latitude: number;
  longitude: number;
  elevation: number;
};

export enum ImageCategory {
  GROUP = "GROUP",
  OBSERVATION = "OBSERVATION",
  EVENT = "EVENT",
  OTHER = "OTHER",
}

export enum ArticleCategory {
  SOLAR_SYSTEM = "SOLAR_SYSTEM",
  GALAXIES = "GALAXIES",
  STARS = "STARS",
  EXOPLANETS = "EXOPLANETS",
  BLACK_HOLES = "BLACK_HOLES",
  COSMOLOGY = "COSMOLOGY",
  ASTROBIOLOGY = "ASTROBIOLOGY",
  TELESCOPES = "TELESCOPES",
  SPACE_MISSIONS = "SPACE_MISSIONS",
}

export interface Equipment {
  id: string
  name: string
  description: string
  group: EquipmentGroup
  status: EquipmentStatus
  acquisitionDate: Date | string
  assignedTo?: string
  cost?: number
  manualUrl?: string
  image?: string
}


export interface Observation {
  id: string
  title: string
  details?: string
  location?: string
  date: Date | string
  userId: string
  user: UserType
  images?: ImageType[]
}


export interface UserType {
  id: string,
  firstName?: string,
  lastName?: string,
  email: string,
  role: string,
  avatar?: string,
  sub: string,
}

export interface MemberType extends User {
  status: MemberStatus;
  memberId: string
}

export interface ImageType extends Image {
  user?: User;
  group?: Group;
  observation?: Observation
  event?: Event 
  // todo: there also other properties to add 
}

export interface ArticleType extends Article {
  images?: Image[],
  author: Partial<User>,
}

export interface GroupType extends Group {
  members?: MemberType[]
}

export interface TaskType extends Task {
  assignedTo: Omit<User, "createdAt" | "profilePic" | "password">
}

export interface Planet {
  id: number;
  name: string;
  description: string;
  image: string;
}

export type DashboardNavType = {
  name: string,
  icon: string,
  link: string
}

export type GroupCardType = {
  name: string,
  image: string,
  icon: string,
  isActive: boolean
}

export type CategoryCardType = {
  name: string,
  image: string,
  // icon: string,
  // isActive: boolean
}

// ! calendar types

export type AstronomyEventType = "meteor-shower" | "planet-viewing" | "moon-phase" | "eclipse" | "deadline"

export interface AstronomyEvent {
  id: string
  title: string
  description: string
  type: string // "meteor-shower" | "moon-phase" | "planet-viewing" | "eclipse" | "deadline" | "sun-event"
  start: Date
  end: Date
  location?: string
  visibilityRequirements?: string
  isSuitable?: boolean // Whether weather conditions are suitable for viewing
  body?: {
    id: string
    name: string
    altitude: number
    azimuth: number
    magnitude?: number
  }
}


// todo weather types
export interface WeatherData {
  condition: "clear" | "cloudy" | "rainy" | "snowy" | "foggy";
  visibility: number // Percentage (0-100)
  isSuitable: boolean
  temperature?: number // In Celsius
  humidity?: number // Percentage
  cloudCover?: number // Percentage
  windSpeed?: number // In m/s
  date?: string // ISO date string
}

export interface WeatherForecast {
  daily: Record<string, WeatherData>
  hourly?: Record<string, WeatherData> // Optional hourly forecast
  location?: {
    name: string
    country: string
    lat: number
    lon: number
  }
}



