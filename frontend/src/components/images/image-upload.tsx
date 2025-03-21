"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"

interface ImageUploadProps {
  initialImage?: string
  onImageChange: (imageDataUrl: string) => void
}

export default function ImageUpload({ initialImage, onImageChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setPreview(dataUrl)
      onImageChange(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onImageChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      <Label>Group Image</Label>

      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          isDragging ? "border-primary bg-primary/10" : "border-input"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative w-full">
            <div className="relative mx-auto w-32 h-32 overflow-hidden rounded-lg">
              <img src={preview || "/placeholder.svg"} alt="Group image preview" className="object-cover" />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 h-8 w-8 rounded-full bg-destructive text-destructive-foreground"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
        ) : (
          <div className="py-4 space-y-2">
            <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Drag and drop an image, or click to browse</p>
          </div>
        )}

        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

        {!preview && (
          <Button type="button" variant="outline" onClick={handleButtonClick} className="mt-2">
            Select Image
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">Recommended: Square image, max 5MB</p>
    </div>
  )
}

