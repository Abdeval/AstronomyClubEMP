import Indicator from "./indecator";
import { DynamicIcon } from "../ui/dynamic-icon";
import { GroupCardType } from "@/lib/types";
import { EyeIcon, View } from "lucide-react";
import HoverImage from "./hover-image";

export default function GroupCard({
  isActive = true,
  name = "group name",
  image = "/images/telescope.jpg",
  icon = "Telescope",
}: GroupCardType) {
  return (
    <div
      className="grid grid-rows-4 grid-cols-4
     bg-background rounded-none sm:w-52 w-48 sm:h-48 h-44 relative"
    >
      {/* indicator */}
      <Indicator isActive={isActive} />
      <div className="grid col-span-1 row-span-1 bg-secondary rounded-br-[16px] items-center justify-center">
        <DynamicIcon name={icon} className="text-foreground" size={28} />
      </div>
      <div className="col-span-3 row-span-4 bg-secondary">
        <div
          className="w-full h-full rounded-[16px] rounded-bl-none bg-background 
        flex items-center justify-center flex-col gap-3 p-2"
        >
          <header className="font-medium capitalize">{name}</header>
          <HoverImage image={image} appearIcon="EyeIcon"/>
        </div>
      </div>
      <div className="col-span-1 row-span-3 bg-secondary">
        <div
          className="w-full h-full rounded-l-[16px] bg-background
         flex items-center justify-center flex-col  gap-2"
        >
          <img src="/planet-icons/jupiter.png" className="w-6 h-6" />
          <img src="/planet-icons/perpule.png" className="w-6 h-6" />
          <img src="/planet-icons/mars.png" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
