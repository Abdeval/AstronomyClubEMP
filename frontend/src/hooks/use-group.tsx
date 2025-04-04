import { deleteApi, getApi, patchApi, postApi } from "@/lib/api";
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Group } from "shared-types";

export const useGroup = () => {
  const queryClient = useQueryClient();

  const { data: groups, isLoading: isGroupsLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: () => getApi("/groups/all"),
  });

  const addGroupMutation = useMutation({
    mutationKey: ["add-group"],
    mutationFn: (group: Omit<Group, "id" | "members" | "createdAt">) =>
      postApi("/groups/create", group),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
    },
  });

  const deleteGroupMutation = useMutation({
    mutationKey: ["delete-group"],
    mutationFn: (groupId: string) => deleteApi(`/groups/delete/${groupId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
    },
  });

  const updateGroupMutation = useMutation({
    mutationKey: ["update-group"],
    mutationFn: (data: { groupId: string; body: Partial<Group> }) =>
      patchApi(`/groups/update/${data.groupId}`, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
    },
  });

  // ? this a kind of all the history mutation (insertion, deletion , update ...)
  const getImageDataHistory = (mutationKey: unknown[]) => {
    const data = useMutationState({
      filters: { mutationKey },
      select: (mutation) => mutation.state.data,
    });

    return data;
  };

  return {
    groups,
    isGroupsLoading,
    addGroup: addGroupMutation.mutate,
    deleteGroup: deleteGroupMutation.mutate,
    updateGroup: updateGroupMutation.mutate,
    getImageDataHistory,
  };
};
