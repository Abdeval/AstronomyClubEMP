import { useEffect, useState } from "react";
import { Search, Settings2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

export default function SearchDialog() {
  const [open, setOpen] = useState(false);

  // Handle keyboard shortcut (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      // Close on escape key
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      {/* Search Icon Button */}
      <Button
        size="icon"
        variant="outline"
        className="rounded-full flex sm:hidden"
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        <Search className="h-5 w-5 text-primary" />
      </Button>

      {/* Search Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 gap-0 rounded-[10px]">
          <DialogHeader className="p-0">
            <div className="flex items-center relative bg-background rounded-[10px]">
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-0 z-40 rounded-[10px]"
              >
                <Search className="text-primary" size={20} />
              </Button>

              <Input
                className="border-none pl-10 pr-10 rounded-lg h-[44px] focus-visible:ring-0"
                placeholder="Search..."
                autoFocus
              />

              <Button
                size="icon"
                variant="ghost"
                className="rounded-[10px] text-muted-foreground h-8 w-8 absolute right-10"
              >
                <Settings2 size={16} />
              </Button>
            </div>
          </DialogHeader>

          <div className="p-4">
            {/* Search results would go here */}
            <p className="text-sm text-muted-foreground">
              Start typing to search...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
