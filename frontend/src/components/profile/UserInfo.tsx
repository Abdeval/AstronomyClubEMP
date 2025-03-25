import type { UserType } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, Settings, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks";

export default function UserInfo({ firstName, role }: Partial<UserType>) {
const { logout } = useUser({});
  return (
    <Popover>
      <div className="flex gap-2 cursor-pointer">
        <div className="flex-col items-start pt-1 hidden md:flex">
          <h1 className="font-medium text-foreground">{firstName}</h1>
          <span className="font-bold text-sm text-muted-foreground">
            {role}
          </span>
        </div>
        <PopoverTrigger asChild>
          <div className="relative flex items-center flex-col bg-yellow-500 p-[3px] rounded-full w-12 h-12 hover:ring-2 hover:ring-yellow-300 transition-all duration-200">
            <img
              src="/avatars/1.png"
              className="rounded-full h-full w-full"
              width={100}
              height={100}
              alt="User avatar"
            />
          </div>
        </PopoverTrigger>
      </div>

      <PopoverContent className="w-48 p-0 rounded-xl shadow-lg font-regular">
        {/* User info header */}
        <div className="p-3 bg-muted/40">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center flex-col bg-yellow-500 p-[2px] rounded-full w-10 h-10">
              <img
                src="/avatars/1.png"
                className="rounded-full h-full w-full"
                width={40}
                height={40}
                alt="User avatar"
              />
            </div>
            <div>
              <p className="font-medium text-sm">{firstName}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Menu items */}
        <div className="p-1">
          <Link to={"/members/profile"}>
            <button className="flex items-center gap-2 w-full p-2 rounded-md text-sm hover:bg-secondary transition-colors duration-200">
              <User size={16} className="text-primary" />
              <span>Profile</span>
            </button>
          </Link>

          <Link to={"/members/settings"}>
            <button className="flex items-center gap-2 w-full p-2 rounded-md text-sm hover:bg-secondary transition-colors duration-200">
              <Settings size={16} className="text-primary" />
              <span>Settings</span>
            </button>
          </Link>
        </div>

        <Separator />

        {/* Sign out button */}
        <div className="p-1">
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full p-2 rounded-md text-sm hover:bg-destructive/10 transition-colors duration-200 text-destructive"
          >
            <LogOut size={16} />
            <span className="font-medium">Sign out</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
