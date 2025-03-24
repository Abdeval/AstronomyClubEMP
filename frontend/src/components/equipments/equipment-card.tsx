import { useState } from "react"
import { format } from "date-fns"
import { Calendar, Edit, Trash2, MoreVertical, PenToolIcon as Tool, User, DollarSign, ExternalLink, Info } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Equipment } from "@/lib/types"
import EditEquipmentDialog from "./edit-equipment-dialog"
import { getGroupLabel, getStatusBadgeVariant } from "@/lib/utils";
import { useNavigate } from "react-router-dom"

interface EquipmentCardProps {
  equipment: Equipment
  onUpdate: (equipment: Equipment) => void
  onDelete: (id: string) => void
}

export default function EquipmentCard({ equipment, onUpdate, onDelete }: EquipmentCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const navigate = useNavigate()
  
  const handleDelete = () => {
    onDelete(equipment.id)
    setIsDeleteDialogOpen(false)
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <div className="aspect-video relative bg-muted">
        {equipment.image && !imageError ? (
          <img
            src={equipment.image || "/placeholder.svg"}
            alt={equipment.name}
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <Tool className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <Badge className={`absolute top-2 right-2 ${getStatusBadgeVariant(equipment.status)}`}>
          {equipment.status}
        </Badge>
      </div>

      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">
              {getGroupLabel(equipment.group)}
            </Badge>
            <CardTitle className="text-xl">{equipment.name}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="font-regular">
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate(`/members/equipments/${equipment.id}`)}
                className="text-green-300 focus:text-green-300"
              >
                <Info className="mr-2 h-4 w-4" />
                detail
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{equipment.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            Acquired: {format(new Date(equipment.acquisitionDate), "MMM d, yyyy")}
          </div>

          {equipment.assignedTo && (
            <div className="flex items-center text-muted-foreground">
              <User className="h-4 w-4 mr-2" />
              Assigned to: {equipment.assignedTo}
            </div>
          )}

          {equipment.cost && (
            <div className="flex items-center text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-2" />
              Cost: ${equipment.cost.toFixed(2)}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-2 flex justify-between items-center border-t mt-auto">
        {equipment.manualUrl && (
          <Button variant="outline" size="sm" asChild className="w-full">
            <a href={equipment.manualUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Manual
            </a>
          </Button>
        )}
        {!equipment.manualUrl && <div />}

        <Button variant="default" size="sm" onClick={() => setIsEditDialogOpen(true)} className="ml-2">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </CardFooter>

      <EditEquipmentDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        equipment={equipment}
        onUpdate={onUpdate}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the equipment "{equipment.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

