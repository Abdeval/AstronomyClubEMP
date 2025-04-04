"use client";

import type React from "react";

import { useState, useRef, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface ImageUploadProps {
  label?: string;
  initialImage?: string;
  onImageChange: (file: File | null, preview?: string) => void;
  maxSizeMB?: number;
  previewWidth?: string;
  previewHeight?: string;
  previewClassName?: string;
  description?: string;
  accept?: string;
  disabled?: boolean;
  type: "image" | "avatar";
  fileInputRef: RefObject<any>;
}

export default function ImageUpload({
  label = "Image",
  initialImage,
  onImageChange,
  maxSizeMB = 5,
  previewWidth = "w-32",
  previewHeight = "h-32",
  previewClassName = "object-cover",
  description = "Recommended: Square image",
  accept = "image/*",
  disabled = false,
  type = "image",
  fileInputRef,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImage as string);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // ! Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size should be less than ${maxSizeMB}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      onImageChange(file, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return type === "image" ? (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          isDragging ? "border-primary bg-primary/10" : "border-input"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onDragOver={!disabled ? handleDragOver : undefined}
        onDragLeave={!disabled ? handleDragLeave : undefined}
        onDrop={!disabled ? handleDrop : undefined}
      >
        {preview ? (
          <div className="relative w-full">
            <div
              className={`relative mx-auto overflow-hidden rounded-lg ${previewWidth} ${previewHeight}`}
            >
              <img
                src={preview || "/placeholder.svg"}
                alt="Image preview"
                className={previewClassName}
              />
            </div>
            {!disabled && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-8 w-8 rounded-full bg-destructive text-destructive-foreground"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            )}
          </div>
        ) : (
          <div className="py-4 space-y-2">
            <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {disabled
                ? "Image upload disabled"
                : "Drag and drop an image, or click to browse"}
            </p>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
          disabled={disabled}
        />

        {!preview && !disabled && (
          <Button
            type="button"
            variant="outline"
            onClick={handleButtonClick}
            className="mt-2"
          >
            Select Image
          </Button>
        )}
      </div>

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  ) : (
    // todo: represeting the avatar upload
    <div>
      {preview ? (
        <div className="relative w-full">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={preview || "/avatars/1.png"}
              alt="profile avatar"
            />
          </Avatar>
          {!disabled && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 h-8 w-8 rounded-full bg-destructive text-destructive-foreground"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove image</span>
            </Button>
          )}
        </div>
      ) : (
        <div className="flex md:flex-col flex-row items-center gap-2">
          <Avatar className="h-24 w-24 relative">
            <div
              className="absolute flex items-center justify-center w-full h-full 
          rounded-full bg-foreground/0 z-40 hover:bg-foreground/10 transition 
          duration-200 cursor-pointer"
              onClick={!disabled ? handleButtonClick : undefined}
            >
              <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
            </div>
            <AvatarFallback>I</AvatarFallback>
          </Avatar>
          <Button
            onClick={!disabled ? handleButtonClick : undefined}
            variant={"outline"}
            className="rounded-[16px] capitalize"
          >
            change avatar
          </Button>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
}
