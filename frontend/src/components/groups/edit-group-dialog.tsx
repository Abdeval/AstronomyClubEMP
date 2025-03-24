import type React from "react"

import { useState, useEffect } from "react"
import type { Group, GroupStatus } from "./groups-management"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import ImageUpload from "../images/image-upload"

interface EditGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  group: Group
  onUpdateGroup: (group: Group) => void
  onUpdateRating: (groupId: string, rating: number) => void
}

export default function EditGroupDialog({
  open,
  onOpenChange,
  group,
  onUpdateGroup,
  onUpdateRating,
}: EditGroupDialogProps) {
  const [name, setName] = useState(group.name)
  const [description, setDescription] = useState(group.description)
  const [status, setStatus] = useState<GroupStatus>(group.status)
  const [image, setImage] = useState(group.image || "")
  const [rating, setRating] = useState(group.rating)
  const [nameError, setNameError] = useState("")

  // Update local state when group changes or dialog opens
  useEffect(() => {
    if (open) {
      setName(group.name)
      setDescription(group.description)
      setStatus(group.status)
      setImage(group.image || "")
      setRating(group.rating)
    }
  }, [group, open])

  const validateForm = () => {
    let isValid = true

    if (!name.trim()) {
      setNameError("Group name is required")
      isValid = false
    } else {
      setNameError("")
    }

    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      const updatedGroup: Group = {
        ...group,
        name,
        description,
        status,
        image,
        rating,
      }

      onUpdateGroup(updatedGroup)
      onOpenChange(false)
    }
  }

  const handleRatingChange = (value: number[]) => {
    const newRating = value[0]
    setRating(newRating)
  }

  const handleClose = () => {
    // Reset to original values
    setName(group.name)
    setDescription(group.description)
    setStatus(group.status)
    setImage(group.image || "")
    setRating(group.rating)
    setNameError("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Group</DialogTitle>
            <DialogDescription>Update the details for this group.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-group-name">Group Name</Label>
              <Input
                id="edit-group-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter group name"
              />
              {nameError && <p className="text-sm text-destructive">{nameError}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter group description"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as GroupStatus)}>
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ImageUpload initialImage={image} onImageChange={setImage} />

            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="edit-rating">Rating</Label>
                {/* <span className="text-sm font-medium">{rating.toFixed(1)}/5.0</span> */}
              </div>
              <Slider id="edit-rating" value={[rating]} max={5} step={0.1} onValueChange={handleRatingChange} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

