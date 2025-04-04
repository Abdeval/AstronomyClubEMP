import { useState } from "react";
import { PlusCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GroupCard from "./group-card-groups";
import CreateGroupDialog from "./create-group-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Group, GroupMember, GroupStatus } from "shared-types";
import { useGroup, useUser } from "@/hooks";
import { GroupType } from "@/lib/types";
import { toast } from "sonner";


export default function GroupsManagement({ groups }: { groups: GroupType[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [statusFilters, setStatusFilters] = useState<GroupStatus[]>([
    "ACTIVE",
    "INACTIVE",
    "PENDING",
    "ARCHIVED",
  ]);
  console.log(groups);
  const { user, addMember, deleteMember } = useUser({});

  const { addGroup, deleteGroup, updateGroup } = useGroup();

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      statusFilters.includes(group.status)
  );
  
  // ! add
  const handleAddGroup = (
    newGroup: Omit<GroupType, "id" | "members" | "createdAt">
  ) => {
    addGroup(newGroup);
    toast(`${newGroup.name} added with success`);
    setIsCreateDialogOpen(false);
  };
  
  // ! update
  const handleUpdateGroup = (updatedGroup: Partial<Group>) => {
    const data = {
      groupId: updatedGroup.id as string,
      body: {
        name: updatedGroup.name,
        description: updatedGroup.description,
        image: updatedGroup.image,
        status: updatedGroup.status,
        rating: updatedGroup.rating,
      },
    };
    updateGroup(data);
    toast(`${updatedGroup.name} updated with success`);
  };

  // ! Add a member to a group by the leader of the group or the admin of the website
  const handleAddMember = (
    groupId: string,
    newMember: Partial<GroupMember>
  ) => {
    const member: Partial<GroupMember> = {
      groupId,
      ...newMember
    }
    addMember(member);
    toast("member added with success");
  };

  // todo: Delete a member from a group 
  const handleDeleteMember = (memberId: string) => {
    try{
      deleteMember(memberId);
    }catch(err: any){
      console.log(err);
      toast("Failed to delete member..");
    }
  
  };

  // ! Delete a group
  const handleDeleteGroup = (groupId: string) => {
    deleteGroup(groupId);
    toast(`Group deleted with success`);
  };

  // Toggle status filter
  const toggleStatusFilter = (status: GroupStatus) => {
    if (statusFilters.includes(status)) {
      setStatusFilters(statusFilters.filter((s) => s !== status));
    } else {
      setStatusFilters([...statusFilters, status]);
    }
  };

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
              <Button
                variant="outline"
                size="icon"
                className="h-[40px] w-[40px]"
              >
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

      {filteredGroups.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            {searchQuery || statusFilters.length < 4
              ? "No groups found matching your filters."
              : "No groups available. Create your first group!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              currentUser={user}
              onAddMember={handleAddMember}
              onDeleteMember={handleDeleteMember}
              onDeleteGroup={handleDeleteGroup}
              onUpdateGroup={handleUpdateGroup}
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
  );
}
