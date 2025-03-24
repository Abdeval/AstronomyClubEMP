import EquipmentDashboard from "@/components/equipments/equipment-dashboard";

export default function EquipmentPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-muted-foreground">Club Equipment</h1>
      <EquipmentDashboard />
    </div>
  );
}
