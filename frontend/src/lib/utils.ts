import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { EquipmentGroup, EquipmentStatus } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getGroupLabel(group: EquipmentGroup): string {
  switch (group) {
    case "webdev":
      return "Web Development"
    case "rovers":
      return "Rovers"
    case "astrography":
      return "Astrography"
    default:
      return group
  }
}

export function getStatusBadgeVariant(status: EquipmentStatus): string {
  switch (status) {
    case "available":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    case "in-use":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    case "maintenance":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    case "broken":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
  }
}


