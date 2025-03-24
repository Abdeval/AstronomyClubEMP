"use client"

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
import { cn } from "@/lib/utils"
import type { Observation } from "@/lib/types"

interface CreateObservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateObservation: (observation: Observation) => void
}

export default function CreateObservationDialog({
  open,
  onOpenChange,
  onCreateObservation,
}: CreateObservationDialogProps) {
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [images, setImages] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [titleError, setTitleError] = useState("")

  const validateForm = () => {
    let isValid = true

    if (!title.trim()) {
      setTitleError("Title is required")
      isValid = false
    } else {
      setTitleError("")
    }

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // In a real app, you would upload images to a server and get URLs back
      // For this example, we'll create object URLs for the images
      const uploadedImages = images.map((file, index) => ({
        id: `temp-${index}`,
        url: imageUrls[index],
        title: file.name,
      }))

      // Create a new observation
      const newObservation: Observation = {
        id: `temp-${Date.now()}`,
        title,
        details,
        location,
        date,
        userId: "current-user-id", // In a real app, this would come from authentication
        user: {
          id: "current-user-id",
          firstName: "Current User",
          email: "user@example.com",
          image: "/avatars/1.png",
          role: "MEMBER"
        },
        images: uploadedImages,
      }

      onCreateObservation(newObservation)
      resetForm()
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      const newUrls = newFiles.map((file) => URL.createObjectURL(file))

      setImages([...images, ...newFiles])
      setImageUrls([...imageUrls, ...newUrls])
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    const newUrls = [...imageUrls]

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newUrls[index])

    newImages.splice(index, 1)
    newUrls.splice(index, 1)

    setImages(newImages)
    setImageUrls(newUrls)
  }

  const resetForm = () => {
    setTitle("")
    setDetails("")
    setLocation("")
    setDate(new Date())

    // Revoke all object URLs to avoid memory leaks
    imageUrls.forEach((url) => URL.revokeObjectURL(url))

    setImages([])
    setImageUrls([])
    setTitleError("")
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
            <DialogTitle>Create New Observation</DialogTitle>
            <DialogDescription>Record your astronomical observation with details and images.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter observation title"
              />
              {titleError && <p className="text-sm text-destructive">{titleError}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter observation location"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Enter observation details"
                rows={4}
              />
            </div>

            <div className="grid gap-2">
              <Label>Images</Label>
              <div className="border border-dashed border-input rounded-md p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative w-20 h-20 rounded-md overflow-hidden group">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-md cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Create Observation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

