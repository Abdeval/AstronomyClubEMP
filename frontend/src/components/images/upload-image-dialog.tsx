"use client"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
// import { useImages } from "@/hooks/use-images"
// import { useGroups } from "@/hooks/use-groups"
// import { useObservations } from "@/hooks/use-observations"
// import { useEvents } from "@/hooks/use-events"
import ImageUpload from "@/components/ui/image-upload"
import { useGroup, useImage } from "@/hooks"
import { ImageCategory } from "@/lib/types"
import { Group } from "shared-types"

interface UploadImageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
  title: z.string().optional(),
  category: z.nativeEnum(ImageCategory),
  file: z.any().refine((val) => val instanceof File, {
    message: "Image is required",
  }),
  groupId: z.string().optional(),
  observationId: z.string().optional(),
  eventId: z.string().optional(),
})

export default function UploadImageDialog({ open, onOpenChange }: UploadImageDialogProps) {
  const { addImage } = useImage()
  const { groups } = useGroup()
  // const { observations } = useObservations()
  // const { events } = useEvents()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: ImageCategory.OTHER,
    },
  })

  const selectedCategory = form.watch("category")

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("file", values.file)
      formData.append("title", values.title || "")
      formData.append("category", values.category)

      if (values.groupId) formData.append("groupId", values.groupId)
      if (values.observationId) formData.append("observationId", values.observationId)
      if (values.eventId) formData.append("eventId", values.eventId)

      addImage(formData);

      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error("Failed to upload image:", error)
    } finally {
      setIsSubmitting(false)
    }
  }


  // Reset form when dialog closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset()
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>Upload an astronomy image to share with the community.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image title" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GROUP">Group</SelectItem>
                      <SelectItem value="OBSERVATION">Observation</SelectItem>
                      <SelectItem value="EVENT">Event</SelectItem>
                      <SelectItem value="OTHER">Other (Galaxies, Planets, etc.)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedCategory === "GROUP" && groups && groups.length > 0 && (
              <FormField
                control={form.control}
                name="groupId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {groups.map((group: Group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedCategory === "OBSERVATION" && observations && observations.length > 0 && (
              <FormField
                control={form.control}
                name="observationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observation</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an observation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {observations.map((observation) => (
                          <SelectItem key={observation.id} value={observation.id}>
                            {observation.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedCategory === "EVENT" && events && events.length > 0 && (
              <FormField
                control={form.control}
                name="eventId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an event" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {events.map((event) => (
                          <SelectItem key={event.id} value={event.id}>
                            {event.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      {...fieldProps}
                      type="image"
                      fileInputRef={fileInputRef}
                      label="image"
                      onImageChange={(file, preview) => {
                        if (file) {
                          form.setValue("file", file, { shouldValidate: true })
                        } else {
                          form.setValue("file", undefined as any, { shouldValidate: true })
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ""
                          }
                        }
                      }}
                      maxSizeMB={10}
                      previewHeight="max-h-[200px]"
                      previewClassName="object-cover"
                      description="Upload an image of a celestial object, astronomical event, or related content."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Uploading..." : "Upload"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

