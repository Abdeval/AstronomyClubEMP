import type React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  User,
  ChevronLeft,
  Edit,
  Trash2,
  Share,
  Download,
  X,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditObservationDialog from "./edit-observation-dialog";
import type { ImageType, ObservationType } from "@/lib/types";
import ConfirmDeletionDialog from "../confirm-deletion-dialog";
import { useObservation } from "@/hooks";
import { useNavigate } from "react-router-dom";

interface ObservationDetailProps {
  observation: ObservationType;
}

export default function ObservationDetail({
  observation,
}: ObservationDetailProps) {
  const { deleteObservation, updateObservation } = useObservation();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    observation.images && observation.images.length > 0 ? 0 : null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  
  const hasImages = observation.images && observation.images.length > 0;
  const visibleImages = showAllImages
    ? observation.images
    : observation.images?.slice(0, 6) || [];
  const hasMoreImages = observation.images && observation.images.length > 6;

  const handleDeleteObservation = async () => {
    deleteObservation(observation.id);
    setIsDeleteDialogOpen(false);
    navigate("/members/observations");
  };

  const handleUpdateObservation = (
    updatedObservation: FormData
  ) => {
    updateObservation(updatedObservation)
  };

  // const handleImageClick = (index: number) => {
  //   setSelectedImageIndex(index)
  //   setIsFullscreen(true)
  // }

  const handleNextImage = () => {
    if (selectedImageIndex === null || !observation.images) return;
    setSelectedImageIndex((selectedImageIndex + 1) % observation.images.length);
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex === null || !observation.images) return;
    setSelectedImageIndex(
      (selectedImageIndex - 1 + observation.images.length) %
        observation.images.length
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isFullscreen) return;

    switch (e.key) {
      case "ArrowRight":
        handleNextImage();
        break;
      case "ArrowLeft":
        handlePreviousImage();
        break;
      case "Escape":
        setIsFullscreen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="container mx-auto py-8 px-4"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold capitalize text-muted-foreground">
            {observation.title}
          </h1>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            {format(new Date(observation.date), "PPP")}
          </div>
          {observation.location && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {observation.location}
            </div>
          )}
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            {observation.user?.firstName}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main image and gallery */}
          <Card>
            <CardContent className="p-6">
              {hasImages ? (
                <div className="space-y-4">
                  <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                    {selectedImageIndex !== null && (
                      <img
                        src={
                          observation?.images[selectedImageIndex]?.url ||
                          "/placeholder.svg"
                        }
                        alt={`Observation image ${selectedImageIndex + 1}`}
                        className="object-contain"
                      />
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                      onClick={() => setIsFullscreen(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </svg>
                    </Button>
                  </div>

                  {observation.images && observation?.images?.length > 1 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">
                        Gallery ({observation.images?.length} images)
                      </h3>
                      <div className="grid grid-cols-6 gap-2">
                        {visibleImages?.map(
                          (image: ImageType, index: number) => (
                            <div
                              key={index}
                              className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                                selectedImageIndex === index
                                  ? "border-primary"
                                  : "border-transparent"
                              }`}
                              onClick={() => setSelectedImageIndex(index)}
                            >
                              <img
                                src={image.url || "/placeholder.svg"}
                                alt={`Thumbnail ${index + 1}`}
                                className="object-cover"
                              />
                            </div>
                          )
                        )}
                      </div>

                      {hasMoreImages && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-muted-foreground"
                          onClick={() => setShowAllImages(!showAllImages)}
                        >
                          {showAllImages ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-2" />
                              Show fewer images
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-2" />
                              Show all {observation.images?.length} images
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-muted-foreground/10 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-8 w-8 text-muted-foreground"
                        >
                          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                          <circle cx="12" cy="13" r="3"></circle>
                        </svg>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      No images for this observation
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Observation details */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              {observation.details ? (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p>{observation.details}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No details provided for this observation.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Observer info */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Observer</h2>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={observation.user?.avatar || ""}
                    alt={observation.user?.firstName as string}
                  />
                  <AvatarFallback>
                    {observation.user?.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{observation.user?.firstName}</p>
                  <p className="text-sm text-muted-foreground">
                    {observation.user?.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Metadata</h2>
              <dl className="space-y-3">
                <div className="flex flex-col">
                  <dt className="text-sm text-muted-foreground">Created</dt>
                  <dd className="font-medium">
                    {format(new Date(observation.date), "PPP 'at' p")}
                  </dd>
                </div>
                {observation.location && (
                  <div className="flex flex-col">
                    <dt className="text-sm text-muted-foreground">Location</dt>
                    <dd className="font-medium">{observation.location}</dd>
                  </div>
                )}
                <div className="flex flex-col">
                  <dt className="text-sm text-muted-foreground">Images</dt>
                  <dd className="font-medium">
                    {observation.images?.length || 0}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm text-muted-foreground">ID</dt>
                  <dd className="font-medium text-xs text-muted-foreground truncate">
                    {observation.id}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Fullscreen image viewer */}
      <AnimatePresence>
        {isFullscreen && selectedImageIndex !== null && observation.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10"
              onClick={handlePreviousImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded-md text-sm">
              Image {selectedImageIndex + 1} of {observation.images.length}
            </div>

            <a
              href={observation.images[selectedImageIndex].url}
              download
              className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded-md text-sm flex items-center hover:bg-black/70 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </a>

            <div className="w-full h-full flex items-center justify-center">
              <img
                src={
                  observation.images[selectedImageIndex].url ||
                  "/placeholder.svg"
                }
                alt={`Observation image ${selectedImageIndex + 1}`}
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Delete confirmation dialog */}
      <ConfirmDeletionDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        onDelete={handleDeleteObservation}
        item="observation"
        onOpenChange={setIsDeleteDialogOpen}
      />
      {/* Edit observation dialog */}
      <EditObservationDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        observation={observation}
        onUpdateObservation={handleUpdateObservation}
      />
      calendar
    </div>
  );
}
