import { cn } from "@/lib/utils";

export default function CurvedItem({
    isSelected,
    selectedNav,
    navLength
}:{
    isSelected: boolean,
    selectedNav: string,
    navLength: number
}) {
  return (
    <div
      className={cn(
        "transition-transform duration-200",
        isSelected ? "block" : "hidden",
        selectedNav === "dashboard"
          ? "-top-14"
          : selectedNav === "settings"
          ? "-bottom-14"
          : "",
        "z-20 right-0 absolute bg-background w-full"
      )}
    >
      <div
        className={cn(
          // selectedNav === "dashboard" ? "hidden" : "block",
        "h-14 w-full bg-secondary/50") }
      >
        <div className="w-full h-full bg-background rounded-br-3xl" />
      </div>
      <div className="h-14 w-full bg-secondary/50 rounded-l-3xl ml-2" />
      <div
        className={cn(
          // selectedNav === "settings" ? "hidden" : "block",
        "h-14 w-full bg-secondary/50") }
      >
        <div className="w-full h-full bg-background rounded-tr-3xl" />
      </div>
    </div>
  );
}
