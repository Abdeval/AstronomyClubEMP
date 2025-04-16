import { getApi } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"


export const useDashboard = () => {
    
    const { data: activeGroup, isLoading: isActiveGroupLoding } = useQuery({
        queryKey: ['active-group'],
        queryFn: () => getApi('/dashboard/activeGroup')
    });

    const { data: totalMembers, isLoading: isTotalMembersLoading } = useQuery({
        queryKey: ['total-members'],
        queryFn: () => getApi('/dashboard/members')
    });

    const { data: latestArticles, isLoading: isLatestArticlesLoding } = useQuery({
        queryKey: ['latest-articles'],
        queryFn: () => getApi('/dashboard/latestArticles')
    });
    
    return {
        activeGroup,
        isActiveGroupLoding,
        totalMembers, 
        isTotalMembersLoading, 
        latestArticles, 
        isLatestArticlesLoding
    }
}