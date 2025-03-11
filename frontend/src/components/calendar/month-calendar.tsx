"use client"

import { useMemo } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns"
import { cn } from "@/lib/utils"
import type { Task } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MonthCalendarProps {
  date: Date
  tasks: Task[]
  onTaskClick: (task: Task) => void
}

export function MonthCalendar({ date, tasks, onTaskClick }: MonthCalendarProps) {
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }, [date])

  const weeks = useMemo(() => {
    const weeks = []
    let week = []

    for (let i = 0; i < calendarDays.length; i++) {
      week.push(calendarDays[i])
      if (week.length === 7 || i === calendarDays.length - 1) {
        weeks.push([...week])
        week = []
      }
    }

    return weeks
  }, [calendarDays])

  const getDayTasks = (day: Date) => {
    return tasks.filter((task) => isSameDay(new Date(task.date), day))
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 text-center">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="py-2 font-medium text-sm">
            {day}
          </div>
        ))}
      </div>

      <div className="border-t">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 border-b last:border-b-0">
            {week.map((day, dayIndex) => {
              const dayTasks = getDayTasks(day)
              const isCurrentMonth = isSameMonth(day, date)

              return (
                <div
                  key={dayIndex}
                  className={cn(
                    "min-h-[120px] p-1 border-r last:border-r-0",
                    isCurrentMonth ? "bg-white" : "bg-muted/30",
                  )}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={cn(
                        "text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full",
                        isToday(day) && "bg-primary text-primary-foreground",
                        !isCurrentMonth && "text-muted-foreground",
                      )}
                    >
                      {format(day, "d")}
                    </span>

                    {isCurrentMonth && (
                      <span className="text-xs text-muted-foreground">
                        {dayTasks.length > 0 ? `${dayTasks.length} ${dayTasks.length === 1 ? "task" : "tasks"}` : ""}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 max-h-[90px] overflow-y-auto pr-1">
                    {dayTasks.slice(0, 3).map((task) => (
                      <TooltipProvider key={task.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity",
                                task.priority === "high"
                                  ? "bg-red-100 text-red-800"
                                  : task.priority === "medium"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-green-100 text-green-800",
                              )}
                              onClick={() => onTaskClick(task)}
                            >
                              <div className="flex items-center gap-1">
                                <div
                                  className="size-2 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: task.assignee?.color || "#888" }}
                                />
                                <span className="truncate">{task.title}</span>
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div>
                              <p className="font-medium">{task.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {task.assignee?.name || "Unassigned"} • {format(new Date(task.date), "MMM d, yyyy")}
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}

                    {dayTasks.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{dayTasks.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

