
import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Upload, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { Equipment, EquipmentGroup, EquipmentStatus } from "@/lib/types"

interface AddEquipmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (equipment: Equipment) => void
}

export default function AddEquipmentDialog({ open, onOpenChange, onAdd }: AddEquipmentDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [group, setGroup] = useState<EquipmentGroup>("webdev")
  const [status, setStatus] = useState<EquipmentStatus>("available")
  const [acquisitionDate, setAcquisitionDate] = useState<Date>(new Date())
  const [assignedTo, setAssignedTo] = useState("")
  const [cost, setCost] = useState("")
  const [manualUrl, setManualUrl] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [nameError, setNameError] = useState("")

  const validateForm = () => {
    let isValid = true

    if (!name.trim()) {
      setNameError("Equipment name is required")
      isValid = false
    } else {
      setNameError("")
    }

    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // In a real app, you would upload the image to a server and get a URL back
      const newEquipment: Equipment = {
        id: `eq-${Date.now()}`,
        name,
        description,
        group,
        status,
        acquisitionDate,
        assignedTo: assignedTo || undefined,
        cost: cost ? Number.parseFloat(cost) : undefined,
        manualUrl: manualUrl || undefined,
        image: imagePreview || undefined,
      }

      onAdd(newEquipment)
      resetForm()
      onOpenChange(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)

      // Create a preview URL for the image
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
      setImagePreview(null)
    }
  }

  const resetForm = () => {
    setName("")
    setDescription("")
    setGroup("webdev")
    setStatus("available")
    setAcquisitionDate(new Date())
    setAssignedTo("")
    setCost("")
    setManualUrl("")
    setImage(null)
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
      setImagePreview(null)
    }
    setNameError("")
  }

  const handleClose = () => {
    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Equipment</DialogTitle>
            <DialogDescription>Add a new piece of equipment to your astronomy club's inventory.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Equipment Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter equipment name"
              />
              {nameError && <p className="text-sm text-destructive">{nameError}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter equipment description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="group">Group</Label>
                <Select value={group} onValueChange={(value) => setGroup(value as EquipmentGroup)}>
                  <SelectTrigger id="group">
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="webdev">Web Development</SelectItem>
                    <SelectItem value="rovers">Rovers</SelectItem>
                    <SelectItem value="astrography">Astrography</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value) => setStatus(value as EquipmentStatus)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="in-use">In Use</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="broken">Broken</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="acquisition-date">Acquisition Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !acquisitionDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {acquisitionDate ? format(acquisitionDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={acquisitionDate}
                      onSelect={(date) => date && setAcquisitionDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="assigned-to">Assigned To (Optional)</Label>
                <Input
                  id="assigned-to"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Enter person's name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cost">Cost (Optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input
                    id="cost"
                    type="number"
                    step="0.01"
                    min="0"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="0.00"
                    className="pl-7"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="manual-url">Manual URL (Optional)</Label>
                <Input
                  id="manual-url"
                  type="url"
                  value={manualUrl}
                  onChange={(e) => setManualUrl(e.target.value)}
                  placeholder="https://example.com/manual"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Equipment Image (Optional)</Label>
              <div className="border border-dashed border-input rounded-md p-4">
                {imagePreview ? (
                  <div className="relative w-full">
                    <div className="relative mx-auto w-full h-48 overflow-hidden rounded-md">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Equipment preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-destructive text-destructive-foreground"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove image</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop an image, or click to browse</p>
                    <input
                      type="file"
                      id="equipment-image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("equipment-image")?.click()}
                    >
                      Select Image
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add Equipment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

