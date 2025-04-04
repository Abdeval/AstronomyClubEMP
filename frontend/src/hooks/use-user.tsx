import { deleteApi, getApi, patchApi, postApi } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "@/context/user-context";
import { GroupMember, User } from "shared-types";


export const useUser = ({
  groupName,
}: {
  groupName?: string;
  // userId?: string | number;
}) => {
  const queryClient = useQueryClient();
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  // ! fetch users as members of a target group
  const { data: members, isLoading: isMembersLoading } = useQuery({
    queryKey: ["members", groupName],
    queryFn: () => getApi(`/members/${groupName}`),
    enabled: !!groupName,
  });

  // ! fetch users
  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getApi(`/users`),
  });

  // ! update a user
  const updateUserMutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: (formData: FormData) => patchApi(`/users/update`, formData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-by-id", variables.get('id')],
      });
    },
  });

  // ! add a member 
  const addMemberMutation = useMutation({
    mutationKey: ["add-member"],
    mutationFn: (memberBody: Partial<GroupMember>) => postApi(`/members/create`, memberBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });

      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });

      queryClient.invalidateQueries({
        queryKey: ["group-by-id"],
      });
    },
  });

  // ! delete a member from a group
  const deleteMemberMutation = useMutation({
    mutationKey: ["delete-member"],
    mutationFn: (userId: string) => deleteApi(`/members/delete/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
      queryClient.invalidateQueries({
        queryKey: ["group-by-id"],
      });
    },
  });

  // ! update user password
  const updatePasswordMuation = useMutation({
     mutationKey: ["update-password"],
     mutationFn: (newPasswords: {
      newPassword: string,
      confirmNewPassword: string,
      currentPassword: string
     }) => patchApi("/auth/updatePassword", newPasswords),
     onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  })



  return {
    ...context,
    users,
    addMember: addMemberMutation.mutate,
    updateUserPassword: updatePasswordMuation.mutate,
    isUsersLoading,
    members,
    isMembersLoading,
    updateUser: updateUserMutation.mutate,
    deleteMember: deleteMemberMutation.mutate,
  };
};


// todo: get a user by id
export const useUserInfo = (user: any) => {
  const res = useQuery({
    queryKey: ["user-by-id", user.id],
    queryFn: () => getApi(`/users/me`),
    enabled: !!user,
  });
  return res;
};