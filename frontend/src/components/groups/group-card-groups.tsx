
import { useState } from "react"
import { MoreVertical, UserPlus, Trash2, Users, Edit, Star, StarHalf, ListTodo, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import AddMemberDialog from "./add-member-dialog"
import EditGroupDialog from "./edit-group-dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { Group, GroupMember, GroupRole, GroupStatus, User } from "shared-types"
import { getGroupInfo } from "@/hooks/use-group-info"
// import { getGroupInfo } from "@/hooks/use-group-info"

interface GroupCardProps {
  group: Group
  currentUser: User
  onAddMember: (groupId: string, member: Omit<GroupMember, "id">) => void
  onDeleteMember: (groupId: string, memberId: string) => void
  onDeleteGroup: (groupId: string) => void
  onUpdateGroup: (group: Group) => void
  onUpdateRating: (groupId: string, rating: number) => void
}

export default function GroupCard({
  group,
  currentUser,
  onAddMember,
  onDeleteMember,
  onDeleteGroup,
  onUpdateGroup,
  onUpdateRating,
}: GroupCardProps) {
  const navigate = useNavigate();
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false)
  const [isMembersOpen, setIsMembersOpen] = useState(false)
  const [memberSearchQuery, setMemberSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<GroupRole | "all">("all")
  const groupInfo = getGroupInfo(group.id);

  console.log(groupInfo);

  // Check if current user is admin or leader of this group
  const isAdminOrLeader = 
    currentUser.role === "ADMIN" ||
    group.members.some((m:GroupMember) => m.userId === currentUser.id && (m.role === "ADMIN"))

  const handleAddMember = (member: Omit<GroupMember, "id">) => {
    if (isAdminOrLeader) {
      onAddMember(group.id, member)
    }
  }

  const handleDeleteMember = (memberId: string) => {
    if (isAdminOrLeader) {
      onDeleteMember(group.id, memberId)
    }
  }

  const handleNavigateToTasks = () => {
    // In a real app, this would navigate to the tasks page for this group
    navigate(`/groups/${group.id}/tasks`)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  console.log(group);

  const getStatusColor = (status: GroupStatus) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500"
      case "INACTIVE":
        return "bg-yellow-500"
      case "ARCHIVED":
        return "bg-gray-500"
      case "PENDING":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  // const getStatusText = (status: GroupStatus) => {
  //   return status.charAt(0).toUpperCase() + status.slice(1)
  // }

  // ? Filter members based on search and role filter
  // const filteredMembers = group.members.filter(
  //   (member) =>
  //     member.userId.toLowerCase().includes(memberSearchQuery.toLowerCase()) &&
  //     (roleFilter === "all" || member.role === roleFilter),
  // )

  // ? Render stars for rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-primary text-primary" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-primary text-primary" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />)
    }

    return stars
  }

  return (
    <Card className="h-full flex flex-col rounded-[16px] ">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="relative">
              {group.image ? (
                <div className="relative w-10 h-10 rounded-md overflow-hidden">
                  <img src={group.image} alt={group.name} className="object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                  <span className="text-lg font-semibold text-muted-foreground">
                    {getInitials(group.name)}
                    </span>
                </div>
              )}
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(group.status)} border-2 border-background`}
              />
            </div>
            <div>
              <CardTitle className="text-xl">{group.name}</CardTitle>
              <div className="flex items-center gap-1 mt-1">
                <Badge variant="outline" className="text-xs">
                  {/* {getStatusText(group.status)} */}
                  active
                </Badge>
                <div className="flex items-center ml-2">{renderRating(group.rating)}</div>
              </div>
            </div>
          </div>
          {isAdminOrLeader && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsAddMemberOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Member
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEditGroupOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Group
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => onDeleteGroup(group.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Group
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <CardDescription>{group.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            {group.members.length} {group.members.length === 1 ? "Member" : "Members"}
          </Badge>
          {isAdminOrLeader && (
            <Button variant="ghost" size="sm" onClick={() => setIsAddMemberOpen(true)} className="h-8 px-2">
              <UserPlus className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </div>

        <Collapsible open={isMembersOpen} onOpenChange={setIsMembersOpen} className="border rounded-md">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span>Members</span>
              <span className={`transition-transform ${isMembersOpen ? "rotate-180" : ""}`}>▼</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search members..."
                    value={memberSearchQuery}
                    onChange={(e) => setMemberSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as GroupRole | "all")}>
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Filter role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="leader">Leader</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ScrollArea className="h-[200px]">
                <ul className="space-y-3">
                  {group.members.length > 0 ? (
                    group.members.map((member: any) => (
                      <li key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>
                              {/* {getInitials(member.name)} */}
                            a
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <div className="flex items-center">
                              <p className="text-xs text-muted-foreground">{member.email}</p>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {member.role}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {isAdminOrLeader && member.id !== currentUser.id && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDeleteMember(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete member</span>
                          </Button>
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="text-center py-4 text-muted-foreground text-sm">No members match your filters.</li>
                  )}
                </ul>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>

      <CardFooter className="pt-2 flex gap-2">
        <Button variant="outline" className="flex-1" onClick={() => setIsMembersOpen(!isMembersOpen)}>
          <Users className="mr-2 h-4 w-4" />
          {isMembersOpen ? "Hide Members" : "Show Members"}
        </Button>
        <Button className="flex-1" onClick={handleNavigateToTasks}>
          <ListTodo className="mr-2 h-4 w-4" />
          View Tasks
        </Button>
      </CardFooter>

      {isAdminOrLeader && (
        <>
          <AddMemberDialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen} onAddMember={handleAddMember} />
          <EditGroupDialog
            open={isEditGroupOpen}
            onOpenChange={setIsEditGroupOpen}
            group={group}
            onUpdateGroup={onUpdateGroup}
            onUpdateRating={onUpdateRating}
          />
        </>
      )}
    </Card>
  )
}

