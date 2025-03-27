import { useState } from "react"
import { PlusCircle, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import GroupCard from "./group-card-groups"
import CreateGroupDialog from "./create-group-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Group, GroupMember, GroupStatus, User } from 'shared-types';
import { useGroup } from "@/hooks"

// export interface Member {
//   id: string
//   name: string
//   email: string
//   role: MemberRole
//   avatar?: string
// }



// Current user (for permission checks)
const currentUser: User = {
  id: "admin1",
  firstName: "Admin User",
  email: "admin@example.com",
  role: "ADMIN",
  createdAt: new Date(),
  lastName: null,
  password: "",
  profilePic: null
}

export default function GroupsManagement({ groups }: { groups: Group[]}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [statusFilters, setStatusFilters] = useState<GroupStatus[]>(["ACTIVE", "INACTIVE", "PENDING", "ARCHIVED"])
  console.log(groups);
  
  const { addGroup } = useGroup();

  // Filter groups based on search query and status filters
  const filteredGroups = groups.filter(
    (group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()) && statusFilters.includes(group.status),
  )

  // Add a new group
  const handleAddGroup = (newGroup: Omit<Group, "id" | "members" | "createdAt">) => {
    addGroup(newGroup);
    // setGroups([...groups, group])
  }

  // Update a group
  const handleUpdateGroup = (updatedGroup: Group) => {
    // setGroups(groups.map((group) => (group.id === updatedGroup.id ? updatedGroup : group)))
  }

  // Add a member to a group
  const handleAddMember = (groupId: string, newMember: Omit<GroupMember, "id">) => {
   
  }

  // Delete a member from a group
  const handleDeleteMember = (groupId: string, memberId: string) => {
   
  }

  // Delete a group
  const handleDeleteGroup = (groupId: string) => {
    // setGroups(groups.filter((group) => group.id !== groupId))
  }

  // Update group rating
  const handleUpdateRating = (groupId: string, rating: number) => {
   
  }

  // Toggle status filter
  const toggleStatusFilter = (status: GroupStatus) => {
    if (statusFilters.includes(status)) {
      setStatusFilters(statusFilters.filter((s) => s !== status))
    } else {
      setStatusFilters([...statusFilters, status])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-1 gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md p-2=4 bg-background h-[40px]"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-[40px] w-[40px]">
                <Filter className="" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes("ACTIVE")}
                onCheckedChange={() => toggleStatusFilter("ACTIVE")}
              >
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes("INACTIVE")}
                onCheckedChange={() => toggleStatusFilter("INACTIVE")}
              >
                Inactive
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes("PENDING")}
                onCheckedChange={() => toggleStatusFilter("PENDING")}
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes("ARCHIVED")}
                onCheckedChange={() => toggleStatusFilter("ARCHIVED")}
              >
                Archived
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>

      {groups.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            {searchQuery || statusFilters.length < 4
              ? "No groups found matching your filters."
              : "No groups available. Create your first group!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              currentUser={currentUser}
              onAddMember={handleAddMember}
              onDeleteMember={handleDeleteMember}
              onDeleteGroup={handleDeleteGroup}
              onUpdateGroup={handleUpdateGroup}
              onUpdateRating={handleUpdateRating}
            />
          ))}
        </div>
      )}

      <CreateGroupDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateGroup={handleAddGroup}
      />
    </div>
  )
}

