
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="flex gap-2 items-center relative">
      <Search className="absolute left-2 text-white" />
      <Input className="border-none pl-10 text-white" placeholder="search for ?" />
    </div>
  );
}
