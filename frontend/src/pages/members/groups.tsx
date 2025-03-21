import GroupsManagement from "@/components/groups/groups-management";

export default function Groups() {
  return (
    <div className="container mx-auto py-2 px-4">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Groups Management</h1>
      <GroupsManagement />
    </div>
  );
}
