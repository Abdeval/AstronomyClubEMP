import React from "react";
import { Card } from "../ui/card";
import { ImageType } from "@/lib/types";
import { BookMarked, Eye } from "lucide-react";

export default function ImageCard({ image, title, id }: ImageType) {
  return (
    <Card className="p-2 rounded-[16px] md:w-[340px] w-full">
      <img src={image} alt={title} className="w-full h-[80%]" />

      {/* manipulation icons */}
      <div className="flex gap-4 items-center p-2" >
        <BookMarked className="text-muted-foreground hover:text-primary-foreground transition-all duration-200"/>
        <Eye className="text-primary hover:text-primary-foreground transition-all duration-200"/>
      </div>
    </Card>
  );
}
