import { cn } from "@/lib/utils";

export default function PageHeader({
  title = "header",
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("items-center capitalize font-bold text-muted-foreground flex gap-1 p-2 text-xl cursor-pointer", className)}>
      {/* <Moon className="text-primary" size={30}/> */}
      <img src="/images/moon.png" alt="icon" className="w-8 h-8"/>
      {title}
    </div>
  );
}
