import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/hooks";
import { GroupMember, GroupRole, User } from "shared-types";

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMember: (member: Partial<GroupMember>) => void;
  isExist?: (id: string) => boolean
}

export default function AddMemberDialog({
  open,
  onOpenChange,
  onAddMember,
  isExist
}: AddMemberDialogProps) {
  const [role, setRole] = useState<GroupRole>("MEMBER");
  const { users, isUsersLoading } = useUser({});
  const [userId, setUserId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      userId,
      role,
    };
    console.log(data);
    onAddMember(data);
  };

  const resetForm = () => {
    setRole("MEMBER");
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] rounded-cu">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>
              Choose a signed user from this list .
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="userId">User</Label>
              <Select
               value={userId}
               onValueChange={(value) => setUserId(value)}
              >
                <SelectTrigger id="User">
                  <SelectValue placeholder="Select User" />
                </SelectTrigger>
                <SelectContent>
                  {isUsersLoading ? (
                    <span>loading...</span>
                  ) : (
                    users.map((user: User, index: number) => (
                      <SelectItem value={user.id} key={index} disabled={isExist && isExist(user.id)}>
                        {user.firstName}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as GroupRole)}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="MEMBER">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
