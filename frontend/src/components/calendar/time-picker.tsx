"use client"
import { TimePickerInput } from "./time-picker-input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface TimePickerDemoProps {
  date: Date
  setDate: (date: Date) => void
}

export function TimePickerDemo({ date, setDate }: TimePickerDemoProps) {
  const [hours, setHours] = useState<number>(date ? date.getHours() : 0)
  const [minutes, setMinutes] = useState<number>(date ? date.getMinutes() : 0)
  const [isPM, setIsPM] = useState<boolean>(date ? date.getHours() >= 12 : false)

  // Update parent state when time changes
  useEffect(() => {
    const newDate = new Date(date)
    let h = hours
    if (isPM && h < 12) h += 12
    if (!isPM && h === 12) h = 0
    newDate.setHours(h)
    newDate.setMinutes(minutes)
    setDate(newDate)
  }, [hours, minutes, isPM, date, setDate])

  // Update local state when date prop changes
  useEffect(() => {
    if (date) {
      const h = date.getHours()
      setHours(h % 12 || 12) // Convert 24h to 12h format
      setMinutes(date.getMinutes())
      setIsPM(h >= 12)
    }
  }, [date])

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="grid gap-1 text-center">
          <TimePickerInput value={hours} onChange={(hours) => setHours(hours)} max={12} min={1} role="hour" />
          <Label htmlFor="hours" className="text-xs">
            Hours
          </Label>
        </div>
        <div className="text-center">:</div>
        <div className="grid gap-1 text-center">
          <TimePickerInput value={minutes} onChange={(minutes) => setMinutes(minutes)} max={59} min={0} role="minute" />
          <Label htmlFor="minutes" className="text-xs">
            Minutes
          </Label>
        </div>
        <div className="flex flex-col gap-1">
          <Button
            type="button"
            variant={isPM ? "default" : "outline"}
            className="h-8 w-12"
            onClick={() => setIsPM(true)}
          >
            PM
          </Button>
          <Button
            type="button"
            variant={!isPM ? "default" : "outline"}
            className="h-8 w-12"
            onClick={() => setIsPM(false)}
          >
            AM
          </Button>
        </div>
      </div>
    </div>
  )
}

