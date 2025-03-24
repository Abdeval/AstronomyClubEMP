import { dashboardNavs } from "@/lib/data";
import { DashboardNavType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import CurvedItem from "./CurvedItem";
import { Link, useLocation } from "react-router-dom";
import { DynamicIcon } from "../ui/dynamic-icon";
import Logo from "../Logo";
import { Button } from "../ui/button";
import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "../ui/tooltip";
// import ExploreCard from "../explore-card";
import { Columns3 } from "lucide-react";

export default function DashboardSidebar({
  isOpenSidebar = true,
  setIsOpenSidebar,
}: {
  setIsOpenSidebar: (value: boolean) => void;
  isOpenSidebar: boolean;
}) {
  const [selectedNav, setSelectedNav] = useState<string>(() => {
    const currentNav = localStorage.getItem("selectedNav");
    if (currentNav) return currentNav;
    return "dashboard";
  });
  const path = useLocation().pathname.split("/");
  const latestNav = path[path.length - 1];

  useEffect(() => {
    setSelectedNav(latestNav || "dashboard");
  }, [latestNav]);

  const isSelected = (nav: string): boolean => selectedNav === nav;

  return (
    <div className="relative">
      {/* desctop */}
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
        className={cn(
          "rounded-[10px] absolute top-[22px] z-50 transition-all duration-200",
          isOpenSidebar ? "right-1" : "-right-9"
        )}
      >
        <Columns3 size={38} className="text-primary" />
      </Button>
      <div
        className={cn(
          "relative sm:flex flex-col hidden h-full transition-all duration-300 bg-background rounded-tr-[16px] items-center",
          isOpenSidebar ? "w-[200px]" : "w-0"
        )}
      >
        {/* hide or shown button */}
        {/* the logo image and title */}
        <div
          className={cn(
            "items-center flex gap-3 p-2 py-4 z-40 relative w-full",
            // isOpenSidebar ? "flex" : "hidden"
          )}
        >
          <Logo type="dash" />
          <span className="font-bold text-lg text-muted-foreground">
            Albattani
          </span>
        </div>

        <div className={cn("w-full")}>
          {dashboardNavs.map((nav: DashboardNavType, index: number) => (
            <Link to={`/members/${nav.link}`} key={index}>
              <div
                onClick={() => setSelectedNav(nav.name)}
                className={`bg-background h-14 flex items-center relative cursor-pointer`}
              >
                <div
                  className={cn(
                    isOpenSidebar ? "flex" : "hidden",
                    "w-full overflow-hidden  relative transition-all duration-200 ease-in-out gap-2 items-center z-40",
                    isSelected(nav.name)
                      ? "pl-6 text-primary"
                      : "pl-2 text-primary-foreground"
                  )}
                >
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-[10px]"
                  >
                    <DynamicIcon name={nav.icon} className="text-foreground" />
                  </Button>
                  <span
                    className={cn(
                      isSelected(nav.name) ? "font-semibold" : "font-regular",
                      "text-primary"
                    )}
                  >
                    {nav.name}
                  </span>

                  {isSelected(nav.name) ? (
                    <div className="absolute right-2 w-2 h-2 rounded-full bg-muted-foreground" />
                  ) : (
                    ""
                  )}
                </div>
                {/* the illustartif div */}
                <CurvedItem
                  isSelected={isSelected(nav.name)}
                  navLength={dashboardNavs.length - 1}
                  selectedNav={selectedNav}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* <ExploreCard /> */}
      </div>

      {/* mobile */}
      <div className="sm:hidden block h-full bg-background w-16 space-y-2">
        {/* the logo image and title */}
        <div className="flex items-center gap-3 p-2 py-4 z-50 relative">
          <Logo type="dash" />
          {/* <span className="font-bold text-lg text-muted-foreground">Albattani</span> */}
        </div>
        {dashboardNavs.map((nav: DashboardNavType, index: number) => (
          <Link to={`/members/${nav.link}`} key={index}>
            <TooltipProvider>
              <Tooltip>
                <TooltipContent
                  side="right"
                  className="bg-background font-regular text-primary ml-2"
                >
                  {nav.name}
                </TooltipContent>
                <div
                  onClick={() => setSelectedNav(nav.name)}
                  className={`bg-background h-14 flex items-center relative cursor-pointer`}
                >
                  <div
                    className={cn(
                      "transition-all duration-300 ease-in-out flex gap-2 items-center z-40",
                      isSelected(nav.name)
                        ? "pl-6 text-primary"
                        : "pl-4 text-primary-foreground"
                    )}
                  >
                    <TooltipTrigger>
                      <DynamicIcon
                        name={nav.icon}
                        className="text-foreground"
                      />
                    </TooltipTrigger>
                  </div>

                  {isSelected(nav.name) ? (
                    <div className="absolute right-0 w-2 h-2 rounded-full bg-primary z-50" />
                  ) : (
                    ""
                  )}

                  {/* the illustartif div */}
                  <CurvedItem
                    isSelected={isSelected(nav.name)}
                    navLength={dashboardNavs.length - 1}
                    selectedNav={selectedNav}
                  />
                </div>
              </Tooltip>
            </TooltipProvider>
          </Link>
        ))}
      </div>
    </div>
  );
}
