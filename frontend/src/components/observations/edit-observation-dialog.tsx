"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ObservationType } from "@/lib/types";
import { toast } from "sonner";

interface EditObservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  observation: ObservationType;
  onUpdateObservation: (observation: FormData) => void;
}

export default function EditObservationDialog({
  open,
  onOpenChange,
  observation,
  onUpdateObservation,
}: EditObservationDialogProps) {
  const [title, setTitle] = useState(observation.title);
  const [details, setDetails] = useState(observation.details || "");
  const [location, setLocation] = useState(observation.location || "");
  const [date, setDate] = useState<Date>(new Date(observation.date));
  const [existingImages, setExistingImages] = useState(
    observation.images || []
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
  const [titleError, setTitleError] = useState("");
  

  // !Update form when observation changes
  useEffect(() => {
    if (open) {
      setTitle(observation.title);
      setDetails(observation.details || "");
      setLocation(observation.location || "");
      setDate(new Date(observation.date));
      setExistingImages(observation.images || []);
      setNewImages([]);
      setNewImageUrls([]);
      setTitleError("");
    }
  }, [observation, open]);

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError("Title is required");
      isValid = false;
    } else {
      setTitleError("");
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      if(observation.id) {
        formData.append("id", observation.id as string);
      }

      if(title) {
        formData.append('title', title);
      }
 
      if(details) {
        formData.append("details", details as string);
      }

      if(location) {
        formData.append("location", location as string);
      }

      if(date) {
        formData.append("date", date.toDateString());
      }

      if (newImages) {
        newImages.forEach((image) => {
          formData.append(`files`, image);
        });
      }

      toast("observation updated!");
      onUpdateObservation(formData);

      handleClose();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newUrls = newFiles.map((file) => URL.createObjectURL(file));

      setNewImages([...newImages, ...newFiles]);
      setNewImageUrls([...newImageUrls, ...newUrls]);
    }
  };

  const handleRemoveExistingImage = (index: number) => {
    const newExistingImages = [...existingImages];
    newExistingImages.splice(index, 1);
    setExistingImages(newExistingImages);
  };

  const handleRemoveNewImage = (index: number) => {
    const newImagesArray = [...newImages];
    const newUrlsArray = [...newImageUrls];

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newUrlsArray[index]);

    newImagesArray.splice(index, 1);
    newUrlsArray.splice(index, 1);

    setNewImages(newImagesArray);
    setNewImageUrls(newUrlsArray);
  };

  const handleClose = () => {
    // Revoke all object URLs to avoid memory leaks

    newImageUrls.forEach((url) => URL.revokeObjectURL(url));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] ">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Observation</DialogTitle>
            <DialogDescription>
              Update your astronomical observation details and images.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter observation title"
              />
              {titleError && (
                <p className="text-sm text-destructive">{titleError}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter observation location"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-details">Details</Label>
              <Textarea
                id="edit-details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Enter observation details"
                rows={4}
              />
            </div>

            <div className="grid gap-2">
              <Label>Images</Label>
              <div className="border border-dashed border-input rounded-md p-4">
                {/* Existing images */}
                {existingImages.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">
                      Existing Images
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {existingImages.map((image, index) => (
                        <div
                          key={`existing-${index}`}
                          className="relative w-20 h-20 rounded-md overflow-hidden group"
                        >
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.title || `Image ${index}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveExistingImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New images */}
                {newImageUrls.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">New Images</h4>
                    <div className="flex flex-wrap gap-2">
                      {newImageUrls.map((url, index) => (
                        <div
                          key={`new-${index}`}
                          className="relative w-20 h-20 rounded-md overflow-hidden group"
                        >
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`New image ${index}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveNewImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center">
                  <label
                    htmlFor="edit-image-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-md cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input
                      id="edit-image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Update Observation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
