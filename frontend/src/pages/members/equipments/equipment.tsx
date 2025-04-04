
import EquipmentDetail from "@/components/equipments/equipment-detail"
import { getEquipmentById } from "@/lib/data"
import { Equipment } from "@/lib/types"
import { useParams } from "react-router-dom"



export default function EquipmentDetailPage() {
  const { id } = useParams();
  const equipment = getEquipmentById(id as string);


  if (!equipment) {
    <div>not found</div>
  }

  return (
    <div className="container mx-auto px-4">
      <EquipmentDetail equipment={equipment as Equipment} />
    </div>
  )
}