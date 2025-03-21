import { deleteApi, getApi, updateApi } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "@/context/user-context";
import { UserType } from "@/lib/types";


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

  // todo: fetch users as members of a target group
  const { data: members, isLoading: isMembersLoading } = useQuery({
    queryKey: ["members"],
    queryFn: () => getApi(`/members/${groupName}`),
    enabled: !!groupName,
  });

  // todo: update a user
  const updateUser = (userId: string, userBody: UserType) => {
    const mutation = useMutation({
      mutationKey: ["update-user"],
      mutationFn: () => updateApi(`/users/update/${userId}`, userBody),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users", "members"],
        });
      },
    });

    return mutation.mutate;
  };

  // todo: delete a member(user)
  const deleteUser = (userId: string) => {
    const mutation = useMutation({
      mutationKey: ["delete-user"],
      mutationFn: () => deleteApi(`/users/delete/${userId}`),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users", "members"],
        });
      },
    });

    return mutation.mutate;
  };

  // todo: get a user by id
  const getUserById = (userId: string) => {
    const { data: userInfo } = useQuery({
      queryKey: ["user-by-id"],
      queryFn: () => getApi(`/users/${userId}`),
      enabled: !!userId,
    });
    return userInfo;
  };
  return {
    ...context,
    members,
    isMembersLoading,
    updateUser,
    deleteUser,
    getUserById,
  };
};
