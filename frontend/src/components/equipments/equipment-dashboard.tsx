
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import EquipmentList from "./equipment-list"
import AddEquipmentDialog from "./add-equipment-dialog"
import type { Equipment, EquipmentGroup } from "@/lib/types"
import { equipmentData } from "@/lib/data"

export default function EquipmentDashboard() {
  const [equipment, setEquipment] = useState<Equipment[]>(equipmentData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<EquipmentGroup>("all")

  const handleAddEquipment = (newEquipment: Equipment) => {
    setEquipment([...equipment, newEquipment])
  }

  const handleUpdateEquipment = (updatedEquipment: Equipment) => {
    setEquipment(equipment.map((item) => (item.id === updatedEquipment.id ? updatedEquipment : item)))
  }

  const handleDeleteEquipment = (id: string) => {
    setEquipment(equipment.filter((item) => item.id !== id))
  }

  const filteredEquipment =
    selectedGroup === "all" ? equipment : equipment.filter((item) => item.group === selectedGroup)

  return (
    <div className="space-y-6 font-regular">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-end md:items-center">
        <Tabs
          defaultValue="all"
          value={selectedGroup}
          onValueChange={(value) => setSelectedGroup(value as EquipmentGroup)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="webdev">Web Dev</TabsTrigger>
            <TabsTrigger value="rovers">Rovers</TabsTrigger>
            <TabsTrigger value="astrography">Astrography</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      <EquipmentList equipment={filteredEquipment} onUpdate={handleUpdateEquipment} onDelete={handleDeleteEquipment} />

      <AddEquipmentDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={handleAddEquipment} />
    </div>
  )
}

