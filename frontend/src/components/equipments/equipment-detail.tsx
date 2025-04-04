
import { useState } from "react"
import { format } from "date-fns"
import {
  Calendar,
  ChevronLeft,
  Edit,
  Trash2,
  PenToolIcon as Tool,
  User,
  DollarSign,
  ExternalLink,
  Share,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { getGroupLabel, getStatusBadgeVariant } from "@/lib/utils"
import EditEquipmentDialog from "./edit-equipment-dialog"

interface EquipmentDetailProps {
  equipment: Equipment
}

export default function EquipmentDetail({ equipment }: EquipmentDetailProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [updatedEquipment, setUpdatedEquipment] = useState<Equipment>(equipment)
  const [imageError, setImageError] = useState(false)

  const handleUpdate = (updated: Equipment) => {
    setUpdatedEquipment(updated)
    setIsEditDialogOpen(false)
  }

  const handleDelete = () => {
    // In a real app, you would call an API to delete the equipment
    setIsDeleteDialogOpen(false)
    // Redirect to equipment list
    window.location.href = "/equipment"
  }

  return (
    <div>
      <div className="mb-6 font-regular">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge variant="default" className="mb-2">
              {getGroupLabel(updatedEquipment.group)}
            </Badge>
            <h1 className="text-3xl font-bold">{updatedEquipment.name}</h1>
            <Badge className={`mt-2 ${getStatusBadgeVariant(updatedEquipment.status)}`}>
              {updatedEquipment.status}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(window.location.href)}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Equipment image */}
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
                {updatedEquipment.image && !imageError ? (
                  <img
                    src={updatedEquipment.image || "/placeholder.svg"}
                    alt={updatedEquipment.name}
                    className="object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <Tool className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Equipment description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{updatedEquipment.description}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Equipment details */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Group:</span>
                <Badge variant="outline">{getGroupLabel(updatedEquipment.group)}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={getStatusBadgeVariant(updatedEquipment.status)}>{updatedEquipment.status}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Acquired:</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{format(new Date(updatedEquipment.acquisitionDate), "MMM d, yyyy")}</span>
                </div>
              </div>

              {updatedEquipment.assignedTo && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Assigned to:</span>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{updatedEquipment.assignedTo}</span>
                  </div>
                </div>
              )}

              {updatedEquipment.cost && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Cost:</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>${updatedEquipment.cost.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {updatedEquipment.manualUrl && (
                <div className="pt-2">
                  <Button variant="outline" className="w-full" asChild>
                    <a href={updatedEquipment.manualUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Manual
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Maintenance history - placeholder for future feature */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">No maintenance records found.</p>
              <Button variant="outline" className="w-full mt-4" disabled>
                <Tool className="h-4 w-4 mr-2" />
                Add Maintenance Record
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <EditEquipmentDialog 
         open={isEditDialogOpen}
         onOpenChange={setIsEditDialogOpen}
         equipment={updatedEquipment}
         onUpdate={handleUpdate}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the equipment "{updatedEquipment.name}". This action cannot be undone.
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
    </div>
  )
}

