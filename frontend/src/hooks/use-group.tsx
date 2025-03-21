
import { deleteApi, getApi, postApi } from "@/lib/api";
import { GroupType } from "@/lib/types";
import { useMutation, useMutationState, useQuery } from "@tanstack/react-query";

export const useGroup = () => {
  const { data: groups, isLoading: isGroupsLoading} = useQuery({
    queryKey: ["groups"],
    queryFn: () => getApi("/groups"),
  });

  const addGroup = async (group: GroupType) => {
    const mutation = useMutation({
      mutationKey: ["add-group"],
      mutationFn: () => postApi("/groups/add", group),
    });

    return mutation.mutate;
  };

  const deleteGroup = async (groupId: string) => {
    const mutation = useMutation({
      mutationKey: ["delete-group"],
      mutationFn: () => deleteApi(`/groups/delete/${groupId}`),
    });

    return mutation.mutate;
  };

  const getGroupInfo = (groupId: string) => {
    const { data: groupInfo } = useQuery({
        queryKey: ["group-by-id", groupId],
        queryFn: () => getApi(`/groups/${groupId}`),
        enabled: !!groupId
      });

    return groupInfo
  }


  // ? this a kind of all the history mutation (insertion, deletion , update ...)
  const getImageDataHistory = (mutationKey: unknown[]) => {
    const data = useMutationState({
      filters: { mutationKey },
      select: (mutation) => mutation.state.data,
    });

    return data;
  };

  return { groups, isGroupsLoading, addGroup, deleteGroup, getImageDataHistory, getGroupInfo };
};
