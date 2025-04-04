import { useLocation } from "react-router-dom";
import BackButton from "../buttons/back-button";
import ChangeThemeButton from "../change-theme-button";
import SearchInput from "../inputs/SearchInput";

import UserInfo from "../profile/UserInfo";
import { useUser, useUserInfo } from "@/hooks";
import SearchDialog from "../dashboard/search-dialog";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function DashboardNavbar({
  isOpenSidebar,
}: {
  isOpenSidebar: boolean;
}) {
  const path = useLocation().pathname.split("/");
  const latestElement = path[path.length - 1].substring(0, 15);

  const { user } = useUser({});
  const { data: userInfo, isLoading } = useUserInfo(user);
  return (
    <div className="bg-secondary/0 backdrop-blur-md h-20 z-40 absolute font-regular w-full py-3 flex items-center px-3 justify-between">
      {/* the navigated names */}
      <div
        className={cn(
          "flex gap-2 items-center transition-all duration-200",
          isOpenSidebar ? "ml-0" : "ml-6"
        )}
      >
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
      {isLoading ? (
        <Skeleton className="w-[60px] h-[60px] rounded-full" />
      ) : (
        <UserInfo user={userInfo} />
      )}
    </div>
  );
}
