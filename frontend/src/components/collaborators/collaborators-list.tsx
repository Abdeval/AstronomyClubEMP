"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, UserPlus, Mail, MessageSquare, UserX, Filter } from "lucide-react"

// Define collaborator types
type Status = "online" | "offline" | "away" | "busy"
type Role = "Admin" | "Editor" | "Viewer" | "Guest"

interface Collaborator {
  id: string
  name: string
  email: string
  role: Role
  status: Status
  imageUrl: string
}

// Sample data
const initialCollaborators: Collaborator[] = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    role: "Admin",
    status: "online",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    role: "Editor",
    status: "busy",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    role: "Viewer",
    status: "away",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "William Kim",
    email: "william.kim@email.com",
    role: "Editor",
    status: "offline",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    role: "Admin",
    status: "online",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Ethan Johnson",
    email: "ethan.johnson@email.com",
    role: "Guest",
    status: "offline",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
]

export default function CollaboratorsList() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>(initialCollaborators)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<Role | "All">("All")

  // Filter collaborators based on search query and role filter
  const filteredCollaborators = collaborators.filter((collaborator) => {
    const matchesSearch =
      collaborator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collaborator.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "All" || collaborator.role === roleFilter
    return matchesSearch && matchesRole
  })

  // Get status color based on status
  const getStatusColor = (status: Status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-gray-400"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  // Get status text
  const getStatusText = (status: Status) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  // Handle removing a collaborator
  const handleRemoveCollaborator = (id: string) => {
    setCollaborators(collaborators.filter((c) => c.id !== id))
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search collaborators..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                <span>{roleFilter}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRoleFilter("All")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("Admin")}>Admin</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("Editor")}>Editor</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("Viewer")}>Viewer</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("Guest")}>Guest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="flex gap-2">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Collaborator</span>
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border">
        <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground border-b">
          <div className="col-span-6 sm:col-span-5">Name</div>
          <div className="col-span-3 hidden sm:block">Role</div>
          <div className="col-span-4 sm:col-span-3">Status</div>
          <div className="col-span-2 sm:col-span-1 text-right">Actions</div>
        </div>

        <div className="divide-y">
          {filteredCollaborators.length > 0 ? (
            filteredCollaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className="grid grid-cols-12 p-4 items-center hover:bg-muted/50 transition-colors"
              >
                <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                  <Avatar className="rounded-cu h-10 w-10">
                    <AvatarImage src={collaborator.imageUrl} alt={collaborator.name} />
                    <AvatarFallback className="rounded-cu">
                      {collaborator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{collaborator.name}</div>
                    <div className="text-sm text-muted-foreground hidden sm:block">{collaborator.email}</div>
                  </div>
                </div>

                <div className="col-span-3 hidden sm:block">
                  <Badge variant={collaborator.role === "Admin" ? "default" : "secondary"} className="rounded-cu">
                    {collaborator.role}
                  </Badge>
                </div>

                <div className="col-span-4 sm:col-span-3 flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(collaborator.status)}`}></div>
                  <span>{getStatusText(collaborator.status)}</span>
                </div>

                <div className="col-span-2 sm:col-span-1 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-destructive focus:text-destructive"
                        onClick={() => handleRemoveCollaborator(collaborator.id)}
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        <span>Remove</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No collaborators found. Try adjusting your search or filters.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

