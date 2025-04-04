import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Download,
  Trash2,
  Share,
  User,
  Telescope,
  Users,
  ActivityIcon as EventIcon,
  Info,
  Maximize,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useImage } from "@/hooks/use-image";
import { useUser } from "@/hooks";
import { getCategoryIcon, getCategoryLabel } from "@/lib/data";
import ConfirmDeletionDialog from "../confirm-deletion-dialog";
import { ImageType } from "@/lib/types";

export default function ImageDetail({ image }: { image: ImageType }) {
  const navigate = useNavigate();
  const { deleteImage } = useImage();
  const { user, isAdmin, isGroupAdminOf } = useUser({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check if user can delete this image
  const canDeleteImage = 
    isAdmin ||
    (isGroupAdminOf("me") && image?.groupId) ||
    user?.id === image?.userId;

  // Handle image deletion
  const handleDeleteImage = () => {
    if (!image) return;

    try {
      deleteImage(image.id);
      setIsDeleteDialogOpen(false);
      navigate("/members/images");
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  // Handle image download
  const handleDownload = () => {
    if (!image) return;

    const link = document.createElement("a");
    link.href = image.url;
    link.download = image.title || "astronomy-image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: image?.title || "Astronomy Image",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-muted-foreground capitalize">
              {image.title || "Untitled Image"}
            </h1>
            <div className="flex items-center gap-2">
              <Badge className="flex items-center gap-1" variant="secondary">
                {getCategoryIcon(image.category)}
                {getCategoryLabel(image.category)}
              </Badge>
              {image.group && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="h-3 w-3 mr-1" />
                  {image.group.name}
                </Badge>
              )}
              {image.observation && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Telescope className="h-3 w-3 mr-1" />
                  {image.observation.title}
                </Badge>
              )}
              {image.event && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <EventIcon className="h-3 w-3 mr-1" />
                  {image.event.title}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            {canDeleteImage && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-1">
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden border bg-card">
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.title || "Astronomy image"}
                className="w-full object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white"
                onClick={() => setIsFullscreen(true)}
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {image.user && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Uploaded by
                  </h2>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={image.user.avatar || ""}
                        alt={image.user.avatar || "User"}
                      />
                      <AvatarFallback>
                        {image.user.firstName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{image.user.firstName}</p>
                      <p className="text-sm text-muted-foreground">
                        {image.user.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Image Details
                </h2>
                <dl className="space-y-3">
                  <div className="flex flex-col">
                    <dt className="text-sm text-muted-foreground">Uploaded</dt>
                    <dd className="font-medium">
                      {format(new Date(image.createdAt), "PPP 'at' p")}
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm text-muted-foreground">Category</dt>
                    <dd className="font-medium flex items-center gap-1">
                      {getCategoryIcon(image.category)}
                      {getCategoryLabel(image.category)}
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm text-muted-foreground">ID</dt>
                    <dd className="font-medium text-xs text-muted-foreground truncate">
                      {image.id}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {(image.group || image.observation || image.event) && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Link to="" className="h-5 w-5" />
                    Related Content
                  </h2>
                  <div className="space-y-3">
                    {image.group && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>Group</span>
                        </div>
                        <Button variant="link" asChild className="p-0 h-auto">
                          <Link to={`/groups/${image.group.id}`}>
                            {image.group.name}
                          </Link>
                        </Button>
                      </div>
                    )}
                    {image.observation && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Telescope className="h-4 w-4 text-muted-foreground" />
                          <span>Observation</span>
                        </div>
                        <Button variant="link" asChild className="p-0 h-auto">
                          <Link to={`/observations/${image.observation.id}`}>
                            {image.observation.title}
                          </Link>
                        </Button>
                      </div>
                    )}
                    {image.event && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <EventIcon className="h-4 w-4 text-muted-foreground" />
                          <span>Event</span>
                        </div>
                        <Button variant="link" asChild className="p-0 h-auto">
                          <Link to={`/events/${image.event.id}`}>
                            {image.event.title}
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setIsFullscreen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          <img
            src={image.url || "/placeholder.svg"}
            alt={image.title || "Astronomy image"}
            className="max-h-screen max-w-full object-contain"
            onClick={() => setIsFullscreen(false)}
          />
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDeletionDialog onDelete={handleDeleteImage} onOpenChange={setIsDeleteDialogOpen} isDeleteDialogOpen={isDeleteDialogOpen} item={image.title as string} />
    </>
  );
}
