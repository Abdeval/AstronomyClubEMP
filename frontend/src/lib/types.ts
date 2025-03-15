import React from "react";

export interface Planet {
  id: number;
  name: string;
  description: string;
  image: string;
}

export type DashboardNavType = {
  name: string,
  icon: React.ReactNode
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

import type { LucideIcon } from "lucide-react"


export interface Task {
  id: string
  title: string
  description?: string
  date: string
  priority: "low" | "medium" | "high"
  assigneeId?: string
  assignee?: TeamMember
  completed?: boolean
}

export interface TeamMember {
  id: string
  name: string
  color: string
  role?: string
  avatar?: string
}

export interface EventType {
  id: string
  name: string
  icon?: LucideIcon
}

export interface Telescope {
  id: string
  name: string
  type: string
  aperture?: string
  location?: string
}

export interface CelestialObject {
  id: string
  name: string
  type: string
  constellation?: string
  distance?: string
  magnitude?: number
}

export interface AstronomyEvent {
  id: string
  title: string
  description?: string
  startDate: string
  endDate?: string | null
  eventType: string
  isAllDay?: boolean
  location?: string
  telescopeId?: string
  telescopeName?: string | null
  teamMemberIds?: string[] // Used in forms
  teamMembers?: TeamMember[]
  celestialObjectIds?: string[] // Used in forms
  celestialObjects?: CelestialObject[]
  observationNotes?: string
}

export interface CelestialEvent {
  name: string
  date: string
  description?: string
  type: string
}

export interface FilterCriteria {
  eventTypes: string[]
  telescopes: string[]
  teamMembers: string[]
  celestialObjects: string[]
}


