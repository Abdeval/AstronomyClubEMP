import { DynamicIcon } from "../ui/dynamic-icon";

export default function HoverImage({
    image,
    appearIcon,
}:{
    image: string,
    appearIcon: string
}) {
  return (
    <div className="relative w-full h-full py-1 cursor-pointer">
      <img src={image} className="w-full h-full object-cover rounded-[16px]" />
      <div className="transtion-all group duration-200 flex items-center justify-center z-40 w-full h-full 
      hover:bg-background/60 absolute top-0 left-0 rounded-[16px]">
        <DynamicIcon name={appearIcon} className="text-muted-foreground group-hover:block hidden"/>
      </div>
    </div>
  );
}
