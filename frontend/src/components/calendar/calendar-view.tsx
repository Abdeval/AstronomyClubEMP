"use client"

import { useState } from "react"
import { Plus, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { format, addMonths, subMonths } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { MonthCalendar } from "@/components/month-calendar"
import { AddTaskDialog } from "@/components/add-task-dialog"
import { TaskDetails } from "@/components/task-details"
import { ViewSelector } from "@/components/view-selector"
import type { Task } from "@/lib/types"
import { SAMPLE_TASKS, TEAM_MEMBERS } from "@/lib/data"

export function CalendarView() {
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS)
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

  const handlePrevious = () => {
    setCurrentDate((prev) => subMonths(prev, 1))
  }

  const handleNext = () => {
    setCurrentDate((prev) => addMonths(prev, 1))
  }

  const handleAddTask = (task: Task) => {
    setTasks((prev) => [...prev, { ...task, id: Math.random().toString(36).substr(2, 9) }])
    setIsAddTaskOpen(false)
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setSelectedTask(null)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    setSelectedTask(null)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold px-4">{format(currentDate, "MMMM yyyy")}</h2>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <ViewSelector view={view} onChange={setView} />
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button onClick={() => setIsAddTaskOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border shadow-sm">
            <MonthCalendar date={currentDate} tasks={tasks} onTaskClick={setSelectedTask} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border shadow-sm p-4">
            <h3 className="font-medium mb-2">Calendar</h3>
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={(date) => date && setCurrentDate(date)}
              className="rounded-md border"
            />
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-4">
            <h3 className="font-medium mb-2">Team</h3>
            <div className="space-y-2">
              {TEAM_MEMBERS.map((member) => (
                <div key={member.id} className="flex items-center">
                  <div className="size-2 rounded-full mr-2" style={{ backgroundColor: member.color }} />
                  <span>{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddTaskDialog
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        onAddTask={handleAddTask}
        teamMembers={TEAM_MEMBERS}
      />

      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          open={!!selectedTask}
          onOpenChange={() => setSelectedTask(null)}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          teamMembers={TEAM_MEMBERS}
        />
      )}
    </div>
  )
}

