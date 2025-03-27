import { getApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const getGroupInfo = (groupId: string) => {
  const { data: groupInfo } = useQuery({
    queryKey: ["group-by-id", groupId],
    queryFn: () => getApi(`/groups/${groupId}`),
    enabled: !!groupId,
  });

  return groupInfo;
};


// export const getGroupMembers
