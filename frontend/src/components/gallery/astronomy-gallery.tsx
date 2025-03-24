"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Info, Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { astronomyImages } from "@/lib/data"

export default function AstronomyGallery({ title }: { title: string }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [loading, setLoading] = useState<Record<number, boolean>>({})
  const [showInfo, setShowInfo] = useState(false)

  const handleImageClick = (index: number) => {
    setSelectedImage(index)
    setShowInfo(false)
  }

  const handleClose = () => {
    setSelectedImage(null)
    setShowInfo(false)
  }

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % astronomyImages.length)
      setShowInfo(false)
    }
  }

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + astronomyImages.length) % astronomyImages.length)
      setShowInfo(false)
    }
  }

  const handleImageLoad = (index: number) => {
    setLoading((prev) => ({ ...prev, [index]: false }))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return

    switch (e.key) {
      case "ArrowRight":
        handleNext()
        break
      case "ArrowLeft":
        handlePrevious()
        break
      case "Escape":
        handleClose()
        break
      case "i":
        setShowInfo(!showInfo)
        break
      default:
        break
    }
  }

  return (
    <div className="container mx-auto py-8 px-4" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold capitalize text-muted-foreground">{title} Image Gallery</h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-primary/10">
              {astronomyImages.length} Images
            </Badge>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {astronomyImages.map((image, index) => (
            <Card
              key={index}
              className="overflow-hidden group cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all duration-300"
              onClick={() => handleImageClick(index)}
            >
              <div className="relative aspect-square">
                {loading[index] !== false && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <Skeleton className="h-full w-full" />
                  </div>
                )}
                <img
                  src={image.thumbnail || image.src}
                  alt={image.title}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  onLoad={() => handleImageLoad(index)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <h3 className="text-white font-medium text-sm truncate">{image.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Full Screen Image Viewer */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Info button */}
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Image information"
              >
                <Info className="h-6 w-6" />
              </button>

              {/* Download button */}
              <a
                href={astronomyImages[selectedImage].src}
                download={astronomyImages[selectedImage].title}
                className="absolute top-4 left-16 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Download image"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-6 w-6" />
              </a>

              {/* Main image */}
              <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
                <img
                  src={astronomyImages[selectedImage].src || "/placeholder.svg"}
                  alt={astronomyImages[selectedImage].title}
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Image info */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm text-white p-4 sm:p-6"
                  >
                    <h2 className="text-xl font-bold mb-2">{astronomyImages[selectedImage].title}</h2>
                    <p className="text-sm text-gray-300 mb-2">{astronomyImages[selectedImage].date}</p>
                    <p className="text-sm mb-4">{astronomyImages[selectedImage].description}</p>
                    <div className="flex flex-wrap gap-2">
                      {astronomyImages[selectedImage].tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="bg-white/10">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {astronomyImages[selectedImage].credit && (
                      <p className="text-xs text-gray-400 mt-4">Credit: {astronomyImages[selectedImage].credit}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {astronomyImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

