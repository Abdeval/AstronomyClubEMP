"use client"

import { type ChangeEvent, type KeyboardEvent, useRef, useState } from "react"
import { Input } from "@/components/ui/input"

interface TimePickerInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  role?: string
}

export function TimePickerInput({ value, onChange, min = 0, max = 59, role }: TimePickerInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [intermediateValue, setIntermediateValue] = useState<string>(value.toString().padStart(2, "0"))

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const numericValue = Number.parseInt(inputValue, 10)

    if (inputValue === "") {
      setIntermediateValue("")
      return
    }

    if (isNaN(numericValue)) {
      return
    }

    if (numericValue >= min && numericValue <= max) {
      setIntermediateValue(numericValue.toString().padStart(2, "0"))
      onChange(numericValue)
    } else if (intermediateValue.length >= 2) {
      // If the user is typing a 2-digit number, temporarily allow it
      setIntermediateValue(inputValue)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      const newValue = value + 1 > max ? min : value + 1
      onChange(newValue)
      setIntermediateValue(newValue.toString().padStart(2, "0"))
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const newValue = value - 1 < min ? max : value - 1
      onChange(newValue)
      setIntermediateValue(newValue.toString().padStart(2, "0"))
    }
  }

  const handleBlur = () => {
    // When the input loses focus, ensure the value is valid and properly formatted
    let numericValue = Number.parseInt(intermediateValue, 10)

    if (isNaN(numericValue)) {
      numericValue = min
    } else {
      numericValue = Math.max(min, Math.min(max, numericValue))
    }

    setIntermediateValue(numericValue.toString().padStart(2, "0"))
    onChange(numericValue)
  }

  return (
    <Input
      ref={inputRef}
      value={intermediateValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className="w-12 h-10 text-center"
      role={role}
    />
  )
}

