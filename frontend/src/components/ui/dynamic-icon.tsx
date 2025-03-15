
import * as LucideIcons from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface DynamicIconProps {
  name: string
  className?: string
  size?: number
  color?: string
}

export function DynamicIcon({ name, className, size = 24, color }: DynamicIconProps) {
  const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as LucideIcon

  if (!IconComponent) {
    return <img className={`w-[28px] h-[28px]`} src={name} />
  }

  return <IconComponent className={className} size={size} color={color} />
}

