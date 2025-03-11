import { colorsClassNames } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function ColorPalette() {
  return (
    <TooltipProvider>
      <fieldset className="w-full text-center border-t border-secondary flex gap-2 flex-wrap justify-center p-4 bg-cyan-400">
        <legend className="px-2 pb-1 text-foreground font-bold capitalize">
          color palette
        </legend>
        <div className="w-full flex flex-row flex-wrap gap-2">
          {colorsClassNames.map((color: string, index: number) => (
            <Tooltip key={index}>
              <TooltipTrigger>
                <div className={cn("sm:w-40 sm:h-16 w-20 h-12", `bg-${color}`)} />
              </TooltipTrigger>
              <TooltipContent side="right">{color}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </fieldset>
    </TooltipProvider>
  );
}
