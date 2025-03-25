

export type EquipmentGroup = "webdev" | "rovers" | "astrography" | "all"
export type EquipmentStatus = "available" | "in-use" | "maintenance" | "broken"
export type GroupStatus = "active" | "inactive" | "archived" | "pending"

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
  image?: string,
}

export interface ImageType {
  id: number | string,
  title: string,
  description?: string,
  url: string,
  tags?: string[],
  border?: string
}

export interface ArticleType {
  id: number | string,
  title: string,
  description: string,
  mainImage: string,
  images?: string[]
  // ! other properties will be added 
}

export interface GroupType {
  id: string,
  name: string,
  description?: string,
  members?: UserType[],
  tasks?: Task[]
}

export interface Task {
  id: string,
  title: string,
  description?: string,
  deadline: Date,
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

export type WeatherCondition = "clear" | "cloudy" | "rainy"

export interface AstronomyEvent {
  id: string
  title: string
  description?: string
  type: AstronomyEventType
  start: Date | string
  end?: Date | string
  location?: string
  visibilityRequirements?: string
}

export interface WeatherData {
  condition: WeatherCondition
  visibility: number // percentage
  isSuitable: boolean
}



