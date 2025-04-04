import GroupsManagement from "@/components/groups/groups-management";
import { useGroup } from "@/hooks";

export default function Groups() {
  const { groups, isGroupsLoading } = useGroup();

  return (
    <div className="container mx-auto py-4 px-4">
      <h1 className="text-3xl font-bold mb-6 text-muted-foreground">
        Groups Management
      </h1>
      {isGroupsLoading ? "loading" : <GroupsManagement groups={groups} />}
    </div>
  );
}
