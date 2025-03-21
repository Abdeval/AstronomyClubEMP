import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, Settings2 } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="hidden sm:flex gap-2 items-center relative bg-transparent sm:bg-background rounded-[10px]">
      <Button
        size={"icon"}
        variant={"ghost"}
        className="absolute left-0 z-40 rounded-[10px]"
      >
        <Search className="text-primary text-bold" size={44} />
      </Button>
      <Input
        className="w-0 sm:w-[150px] md:w-[300px] border-none pl-10 text-white rounded-lg h-[44px]"
        size={40}
        placeholder="Search..."
      />
      <Button
        size={"icon"}
        variant={"ghost"}
        className="absolute rounded-[10px] hidden sm:block text-muted-foreground right-0"
      >
        <Settings2 />
      </Button>
    </div>
  );
}
