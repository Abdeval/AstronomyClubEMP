import { getApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGroupInfo = (groupId: string) => {
  const { data: groupInfo } = useQuery({
    queryKey: ["group-by-id", groupId],
    queryFn: () => getApi(`/groups/${groupId}`),
    enabled: !!groupId,
  });

  return groupInfo;
};

export const useGroupInfoForAdmin = (adminId: string) => {
  const { data: group, isLoading, isError } = useQuery({
    queryKey: ["group-by-id", adminId],
    queryFn: () => getApi(`/groups/admin/${adminId}`),
    enabled: !!adminId,
  });

  return { group, isLoading, isError};
};
