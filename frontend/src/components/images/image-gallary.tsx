"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Grid,
  ImageIcon,
  Plus,
  Filter,
  Search,
  Calendar,
  User,
  Telescope,
  Users,
  Star,
  ActivityIcon as EventIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import UploadImageDialog from "./upload-image-dialog"

import { useImage, useUser } from "@/hooks"
import { ImageCategory } from "shared-types"
import { getCategoryIcon, getCategoryLabel } from "@/lib/data"


export default function ImageGallery() {
  const { data: images , isLoading, error } = useImage();
  const { isAdmin, isGroupAdminOf } = useUser({});
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ImageCategory | "ALL">("ALL")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [filteredImages, setFilteredImages] = useState(images ? images : []);

  // Filter images based on search and category
  useEffect(() => {
    if (images) {
      let filtered = [...images]

      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter((image) => image.title?.toLowerCase().includes(searchQuery.toLowerCase()))
      }

      // Apply category filter
      if (selectedCategory !== "ALL") {
        filtered = filtered.filter((image) => image.category === selectedCategory)
      }

      setFilteredImages(filtered)
    }
  }, [images, searchQuery, selectedCategory])

  // Check if user can upload images
  const canUploadImages = isAdmin || isGroupAdminOf("group-1")

  console.log(images);

  if (error) {
    return (
      <div className="text-center p-12 border rounded-lg bg-muted/20">
        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Error loading images</h3>
        <p className="text-muted-foreground mb-4">{error.message || "Failed to load images"}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-muted-foreground">Astronomy Images</h1>
        {canUploadImages && (
          <Button onClick={() => setIsUploadDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search images..."
            className="pl-8 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              {selectedCategory === "ALL" ? "All Categories" : getCategoryLabel(selectedCategory as ImageCategory)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSelectedCategory("ALL")}>
              <Grid className="h-4 w-4 mr-2" />
              All Categories
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("GROUP")}>
              <Users className="h-4 w-4 mr-2" />
              Group
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("OBSERVATION")}>
              <Telescope className="h-4 w-4 mr-2" />
              Observation
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("EVENT")}>
              <EventIcon className="h-4 w-4 mr-2" />
              Event
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("OTHER")}>
              <Star className="h-4 w-4 mr-2" />
              Other
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="grid" className="mb-6">
        <TabsList className="grid w-[200px] grid-cols-2">
          <TabsTrigger value="grid">Grid</TabsTrigger>
          <TabsTrigger value="masonry">Masonry</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                  <CardContent className="p-3">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center p-12 border rounded-lg bg-muted/20">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No images found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedCategory !== "ALL"
                  ? "Try adjusting your search or filters"
                  : "Upload your first image to get started"}
              </p>
              {canUploadImages && (
                <Button onClick={() => setIsUploadDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image: any) => (
                <Link key={image.id} to={`/members/images/${image.id}`}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.title || "Astronomy image"}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                      <Badge className="absolute top-2 right-2 flex items-center gap-1" variant="secondary">
                        {getCategoryIcon(image.category)}
                        {getCategoryLabel(image.category)}
                      </Badge>
                    </div>
                    <CardContent className="p-3 flex-1 flex flex-col">
                      <h3 className="font-medium line-clamp-1">{image.title || "Untitled Image"}</h3>
                      <div className="mt-auto pt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(image.createdAt), "MMM d, yyyy")}
                        </div>
                        {image.user && (
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {image.user.name}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="masonry" className="mt-6">
          {isLoading ? (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="break-inside-avoid">
                  <Card className="overflow-hidden">
                    <Skeleton className={`aspect-[${Math.random() * 0.5 + 0.75}] w-full`} />
                    <CardContent className="p-3">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-1/2" />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center p-12 border rounded-lg bg-muted/20">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No images found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedCategory !== "ALL"
                  ? "Try adjusting your search or filters"
                  : "Upload your first image to get started"}
              </p>
              {canUploadImages && (
                <Button onClick={() => setIsUploadDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              )}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filteredImages.map((image: any) => (
                <div key={image.id} className="break-inside-avoid mb-4">
                  <Link to={`/members/images/${image.id}`}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative overflow-hidden">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.title || "Astronomy image"}
                          className="w-full object-cover transition-transform hover:scale-105"
                        />
                        <Badge className="absolute top-2 right-2 flex items-center gap-1" variant="secondary">
                          {getCategoryIcon(image.category)}
                          {getCategoryLabel(image.category)}
                        </Badge>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium line-clamp-1">{image.title || "Untitled Image"}</h3>
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(new Date(image.createdAt), "MMM d, yyyy")}
                          </div>
                          {image.user && (
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {image.user.name}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {canUploadImages && <UploadImageDialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen} />}
    </div>
  )
}

