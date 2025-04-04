import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  UserPlus,
  Mail,
  MessageSquare,
  UserX,
  Filter,
} from "lucide-react";
import { GroupMember, GroupRole, MemberStatus, Role, User } from "shared-types";
import AddMemberDialog from "../groups/add-member-dialog";
import { useUser } from "@/hooks";
import { MemberType } from "@/lib/types";
import ConfirmDeletionDialog from "../confirm-deletion-dialog";

export default function CollaboratorsList({
  collaborators,
  groupId,
}: {
  collaborators: MemberType[];
  groupId: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<GroupRole | "All">("All");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const { addMember, user, deleteMember } = useUser({});
  const [collaboratorToDelete, setCollaboratorToDelete] = useState<MemberType | null>(null);
  const [isDeletelDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredCollaborators = collaborators.filter((collaborator) => {
    const matchesSearch =
      collaborator.firstName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      collaborator.lastName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      collaborator.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      roleFilter === "All" || (collaborator.role as Role) === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Get status color based on status
  const getStatusColor = (status: MemberStatus) => {
    switch (status) {
      case "ONLINE":
        return "bg-green-500";
      case "OFFLINE":
        return "bg-gray-400";
      case "AWAY":
        return "bg-yellow-500";
      case "BUSY":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status: MemberStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleRemoveCollaborator = () => {
    deleteMember(collaboratorToDelete?.memberId as string);
  };

  const isAdminOrLeader =
    user?.role === "ADMIN" ||
    collaborators?.some(
      (m: Partial<User>) => m.id === user?.id && m.role === "ADMIN"
    );

  const handleAddMember = (member: Partial<GroupMember>) => {
    if (isAdminOrLeader) {
      console.log("adding a member");
      addMember({
        groupId,
        ...member,
      });
      setOpenAddDialog(false);
    }
  };

  // ? this will disable if the user is already a member in the group
  const isCollaborator = (collaboratorId: string) =>
    collaborators.some((c) => c.id === collaboratorId);


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
              <DropdownMenuItem onClick={() => setRoleFilter("All")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("ADMIN")}>
                Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("MEMBER")}>
                Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="flex gap-2" onClick={() => setOpenAddDialog(true)}>
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
            filteredCollaborators.map((collaborator, index) => (
              <div
                key={index}
                className="grid grid-cols-12 p-4 items-center hover:bg-muted/50 transition-colors"
              >
                <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                  <Avatar className="rounded-cu h-10 w-10">
                    <AvatarImage
                      src={collaborator.avatar}
                      alt={collaborator.firstName as string}
                    />
                    <AvatarFallback className="rounded-cu">
                      {collaborator.firstName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{collaborator.firstName}</div>
                    <div className="text-sm text-muted-foreground hidden sm:block">
                      {collaborator.email}
                    </div>
                  </div>
                </div>

                <div className="col-span-3 hidden sm:block">
                  <Badge
                    variant={
                      collaborator.role === "ADMIN" ? "default" : "secondary"
                    }
                    className="rounded-cu"
                  >
                    {collaborator.role}
                  </Badge>
                </div>

                <div className="col-span-4 sm:col-span-3 flex items-center gap-2">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${getStatusColor(
                      collaborator.status
                    )}`}
                  ></div>
                  <span className="lowercase">{getStatusText(collaborator.status)}</span>
                </div>

                <div className="col-span-2 sm:col-span-1 text-right ">
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
                      <DropdownMenuItem className="cursor-pointer font-regular">
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer font-regular">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-destructive focus:text-destructive font-regular"
                        onClick={() => {
                          setCollaboratorToDelete(collaborator)
                          setIsDeleteDialogOpen(true)
                        }}
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

      {/* delete member dialog */}
      <ConfirmDeletionDialog 
        isDeleteDialogOpen={isDeletelDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleRemoveCollaborator}
        item="member"
      />

      {/* the the current user is an admin of the group */}
      <AddMemberDialog
        open={openAddDialog}
        onOpenChange={setOpenAddDialog}
        onAddMember={handleAddMember}
        isExist={isCollaborator}
      />
    </div>
  );
}
