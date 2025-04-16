import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function SearchInputCustom({
  searchQuery,
  setSearchQuery,
  placeHolder
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  placeHolder: string
}) {
  return (
    <div className="relative flex-1 bg-background">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeHolder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}
