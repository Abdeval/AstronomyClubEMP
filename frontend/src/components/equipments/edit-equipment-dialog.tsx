import type React from "react"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, Upload, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { Equipment, EquipmentGroup, EquipmentStatus } from "@/lib/types"

interface EditEquipmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  equipment: Equipment
  onUpdate: (equipment: Equipment) => void
}

export default function EditEquipmentDialog({
  open,
  onOpenChange,
  equipment,
  onUpdate,
}: EditEquipmentDialogProps) {
  const [name, setName] = useState(equipment.name);
  const [description, setDescription] = useState(equipment.description);
  const [group, setGroup] = useState<EquipmentGroup>(equipment.group);
  const [status, setStatus] = useState<EquipmentStatus>(equipment.status);
  const [acquisitionDate, setAcquisitionDate] = useState<Date>(
    new Date(equipment.acquisitionDate)
  );
  const [assignedTo, setAssignedTo] = useState(equipment.assignedTo || "");
  const [cost, setCost] = useState(
    equipment.cost ? equipment.cost.toString() : ""
  );
  const [manualUrl, setManualUrl] = useState(equipment.manualUrl || "");
  const [imagePreview, setImagePreview] = useState<string | null>(
    equipment.image || null
  );
  const [newImage, setNewImage] = useState<File | null>(null);
  const [nameError, setNameError] = useState("");

  // Update form when equipment changes
  useEffect(() => {
    if (open) {
      setName(equipment.name);
      setDescription(equipment.description);
      setGroup(equipment.group);
      setStatus(equipment.status);
      setAcquisitionDate(new Date(equipment.acquisitionDate));
      setAssignedTo(equipment.assignedTo || "");
      setCost(equipment.cost ? equipment.cost.toString() : "");
      setManualUrl(equipment.manualUrl || "");
      setImagePreview(equipment.image || null);
      setNewImage(null);
      setNameError("");
    }
  }, [equipment, open]);

const validateForm = () => {
  let isValid = true;
  
  if (!name.trim()) {
    setNameError("Equipment name is required");
    isValid = false;
  } else {
    setNameError("");
  }
  
  return isValid;
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Update the equipment
      const updatedEquipment: Equipment = {
        ...equipment,
        name,
        description,
        group,
        status,
        acquisitionDate,
        assignedTo: assignedTo || undefined,
        cost: cost ? Number.parseFloat(cost) : undefined,
        manualUrl: manualUrl || undefined,
        image: imagePreview || undefined,
      };
      
      onUpdate(updatedEquipment);
      onOpenChange(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setNewImage(null);
    setImagePreview(null);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Equipment</DialogTitle>
            <DialogDescription>
              Update the details for this piece of equipment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Equipment Name</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter equipment name"
              />
              {nameError && <p className="text-sm text-destructive">{nameError}</p>}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter equipment description"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-group">Group</Label>
                <Select value={group} onValueChange={(value) => setGroup(value as EquipmentGroup)}>
                  <SelectTrigger id="edit-group">
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="webdev">Web Development</SelectItem>
                    <SelectItem value="rovers">Rovers</SelectItem>
                    <SelectItem value="astrography">Astrography</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={status} onValueChange={(value) => setStatus(value as EquipmentStatus)}>
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="in-use">In Use</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="broken">Broken</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-acquisition-date">Acquisition Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !acquisitionDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {acquisitionDate ? format(acquisitionDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={acquisitionDate}
                      onSelect={(date) => date && setAcquisitionDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-assigned-to">Assigned To (Optional)</Label>
                <Input
                  id="edit-assigned-to"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Enter person's name"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-cost">Cost (Optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input
                    id="edit-cost"
                    type="number"
                    step="0.01"
                    min="0"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="0.00"
                    className="pl-7"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-manual-url">Manual URL (Optional)</Label>
                <Input
                  id="edit-manual-url"
                  type="url"
                  value={manualUrl}
                  onChange={(e) => setManualUrl(e.target.value)}
                  placeholder="https://example.com/manual"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Equipment Image (Optional)</Label>
              <div className="border border-dashed border-input rounded-md p-4">
                {imagePreview ? (
                  <div className="relative w-full">
                    <div className="relative mx-auto w-full h-48 overflow-hidden rounded-md">
                      <img 
                        src={imagePreview || "/placeholder.svg"} 
                        alt="Equipment preview" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-destructive text-destructive-foreground"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove image</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Drag and drop an image, or click to browse
                    </p>
                    <input
                      type="file"
                      id="edit-equipment-image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("edit-equipment-image")?.click()}
                    >
                      Select Image
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Update Equipment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}