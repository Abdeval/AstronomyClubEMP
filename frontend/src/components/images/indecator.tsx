import { cn } from "@/lib/utils";


export default function Indicator({ isActive = true }) {
  return (
    <span className="absolute flex h-3 w-3 right-0">
      <span
        className={cn(
          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
          isActive ? "bg-green-400" : "bg-red-400"
        )}
      />
      <span
        className={cn(
          "relative inline-flex rounded-full h-3 w-3",
          isActive ? "bg-green-500" : "bg-red-500"
        )}
      />
    </span>
  );
}
