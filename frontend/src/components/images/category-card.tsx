import HoverImage from "./hover-image";
import { EllipsisVertical } from "lucide-react";
import { CategoryCardType } from "@/lib/types";

export default function CategoryCard({ name, image }: CategoryCardType) {
  return (
    <div
      className="rounded-cu p-2 flex flex-col items-center gap-2
    sm:w-52 w-48 sm:h-48 h-44 bg-background "
    >
      <div className="flex items-center justify-between px-2 w-full">
        <span className="capitalize font-medium"> {name}</span>
        <EllipsisVertical size={24} className="transition-all duration-200 cursor-pointer hover:text-primary"/>
      </div>
      <div className="h-[82%] w-full">
        <HoverImage appearIcon={"Clapperboard"} image={image} />
      </div>
    </div>
  );
}
