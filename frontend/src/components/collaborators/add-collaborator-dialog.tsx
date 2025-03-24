import type React from "react"
import { useState } from "react"
// import type { Member, MemberRole } from "./groups-management"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MemberRole } from "../groups/groups-management"
import { UserType } from "@/lib/types"

interface AddCollaboratorDialog {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddMember: (member: Omit<UserType, "id">) => void
}

export default function AddCollaborator({ open, onOpenChange, onAddMember }: AddCollaboratorDialog) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<MemberRole>("member")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")

  const validateForm = () => {
    let isValid = true

    if (!username.trim()) {
      setNameError("Name is required")
      isValid = false
    } else {
      setNameError("")
    }

    if (!email.trim()) {
      setEmailError("Email is required")
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid")
      isValid = false
    } else {
      setEmailError("")
    }

    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onAddMember({ username, email, role })
      resetForm()
      onOpenChange(false)
    }
  }

  const resetForm = () => {
    setUsername("")
    setEmail("")
    setRole("member")
    setNameError("")
    setEmailError("")
  }

  const handleClose = () => {
    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] rounded-cu font-regular">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Collaborator</DialogTitle>
            <DialogDescription>Add a new coll to this group. Fill in their details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter member name" />
              {nameError && <p className="text-sm text-destructive">{nameError}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter member email"
              />
              {emailError && <p className="text-sm text-destructive">{emailError}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value as MemberRole)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  {/* <SelectItem value="leader">Leader</SelectItem> */}
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

