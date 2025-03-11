"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem, CommandEmpty, CommandList } from "@/components/ui/command"

interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectProps {
  placeholder?: string
  options: MultiSelectOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  className?: string
  renderItem?: (item: MultiSelectOption) => React.ReactNode
}

export function MultiSelect({
  placeholder = "Select options",
  options,
  selected,
  onChange,
  className,
  renderItem,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  const handleSelect = (item: string) => {
    onChange([...selected, item])
    setInputValue("")
  }

  const selectables = options.filter((option) => !selected.includes(option.value))

  return (
    <Command
      className={className}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault()
          e.stopPropagation()
          setOpen(false)
        }
      }}
    >
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        onClick={() => {
          inputRef.current?.focus()
          setOpen(true)
        }}
      >
        <div className="flex gap-1 flex-wrap">
          {selected.map((item) => {
            const option = options.find((o) => o.value === item)
            return (
              <Badge variant="secondary" key={item} className="rounded-sm px-1 font-normal">
                {option?.label}
                <button
                  type="button"
                  className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleUnselect(item)
                  }}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={selected.length === 0 ? placeholder : ""}
            className="ml-1 outline-none bg-transparent placeholder:text-muted-foreground flex-1 min-w-[120px] inline-flex h-9 -my-2"
          />
        </div>
      </div>
      <div className="relative mt-1">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {selectables.map((option) => (
                  <CommandItem
                    key={option.value}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onSelect={() => {
                      handleSelect(option.value)
                      inputRef.current?.focus()
                    }}
                  >
                    {renderItem ? renderItem(option) : option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        ) : null}
      </div>
    </Command>
  )
}

export function MultiSelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <>{children}</>
}

