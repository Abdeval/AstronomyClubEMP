import { useLocation } from "react-router-dom";
import BackButton from "../buttons/back-button";
import ChangeThemeButton from "../change-theme-button";
import SearchInput from "../inputs/SearchInput";

import UserInfo from "../profile/UserInfo";
import { useUser } from "@/hooks";
import SearchDialog from "../dashboard/search-dialog";
import { cn } from "@/lib/utils";

export default function DashboardNavbar({
  isOpenSidebar
}:{
  isOpenSidebar: boolean
}) {
  const path = useLocation().pathname.split("/");
  const latestElement = path[path.length - 1];

  const { user } = useUser({});
  // const currentPatePath =
  return (
    <div className="bg-secondary/60 backdrop-blur-md h-20 z-40 absolute font-regular w-full py-3 flex items-center px-3 justify-between">
      {/* the navigated names */}
      <div className={cn("flex gap-2 items-center transition-all duration-200", isOpenSidebar ? "ml-0": "ml-6")}>
        <BackButton />
        <span className="text-muted-foreground">
          {latestElement === "" ? "Home" : latestElement}
        </span>
      </div>

      {/* the search box */}
      <SearchInput />
      <SearchDialog />

      {/* toggle theme */}
      <ChangeThemeButton />

      {/* the profile trigger */}
      <UserInfo
        firstName={user?.email.split('@')[0] as string|| "abdelatif"}
        role={user?.role || "member"}
        email={user?.email || "abdou@gmail.com"}
      />
    </div>
  );
}
