import { cn } from "@/lib/utils";

export default function CurvedItem({
    isSelected,
    selectedNav,
    navLength
}:{
    isSelected: boolean,
    selectedNav: number,
    navLength: number
}) {
  return (
    <div
      className={cn(
        "transition-all duration-300",
        isSelected ? "block" : "hidden",
        selectedNav === 0
          ? "top-0"
          : selectedNav === navLength
          ? "bottom-0"
          : "",
        "z-20 right-0 absolute bg-background w-full"
      )}
    >
      <div
        className={`${
          selectedNav === 0 ? "hidden" : "block"
        } h-14 w-full bg-secondary`}
      >
        <div className="w-full h-full bg-background rounded-br-3xl" />
      </div>
      <div className="h-14 w-full bg-secondary rounded-l-3xl ml-2" />
      <div
        className={`${
          selectedNav === navLength ? "hidden" : "block"
        } h-14 w-full bg-secondary`}
      >
        <div className="w-full h-full bg-background rounded-tr-3xl" />
      </div>
    </div>
  );
}
