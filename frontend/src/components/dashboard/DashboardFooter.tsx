import { Copyright } from "lucide-react";

export default function DashboardFooter() {
  return (
    <div className="text-foreground h-16 bg-background w-full flex gap-2 justify-center items-center">
      <div className="flex gap-[1px]">
        <span>copyright</span>
        <Copyright className="w-4" />
        preserved
      </div>
      <h1 className="font-bold">by EMP</h1>
    </div>
  );
}
