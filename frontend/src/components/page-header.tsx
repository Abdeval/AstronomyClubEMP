import { cn } from "@/lib/utils";
import { Group } from "lucide-react";


export default function PageHeader({
  title = "header",
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("items-center font-semibold text-foreground flex gap-1 p-2 text-xl cursor-pointer", className)}>
      <Group className="text-primary" size={30}/>
      {title}
    </div>
  );
}
