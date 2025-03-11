import { dashboardNavs } from "@/lib/data";
import { DashboardNavType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CurvedItem from "./CurvedItem";
import { Link } from "react-router-dom";

export default function DashboardSidebar() {
  const [selectedNav, setSelectedNav] = useState<number>(() => {
    const currentNav = localStorage.getItem("selectedNav");
    if (currentNav) return parseInt(currentNav);
    return 1;
  });

  const isSelected = (index: number): boolean => selectedNav === index;

  return (
    <div>
      {/* desctop */}
      <div className="sm:block hidden h-full bg-background w-[180px] space-y-2">
        {dashboardNavs.map((nav: DashboardNavType, index: number) => (
          <Link to={`/members/${nav.name}`} key={index}>
            <div
              onClick={() => setSelectedNav(index)}
              className={`bg-background h-14 flex items-center relative cursor-pointer`}
            >
              <div
                className={cn(
                  "transition-all duration-300 ease-in-out flex gap-2 items-center z-40",
                  isSelected(index)
                    ? "pl-6 text-primary"
                    : "pl-2 text-primary-foreground"
                )}
              >
                {nav.icon}
                <span
                  className={cn(
                    isSelected(index) ? "font-semibold" : "",
                    "text-primary"
                  )}
                >
                  {nav.name}
                </span>
              </div>
              {/* the illustartif div */}
              <CurvedItem
                isSelected={isSelected(index)}
                navLength={dashboardNavs.length - 1}
                selectedNav={selectedNav}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* mobile */}
      <div className="sm:hidden block h-full bg-background w-16 space-y-2">
        {dashboardNavs.map((nav: DashboardNavType, index: number) => (
          <Link to={`/members/${nav.name}`} key={index}>
            <div
              onClick={() => setSelectedNav(index)}
              className={`bg-background h-14 flex items-center relative cursor-pointer`}
            >
              <div
                className={cn(
                  "transition-all duration-300 ease-in-out flex gap-2 items-center z-40",
                  isSelected(index)
                    ? "pl-6 text-primary"
                    : "pl-4 text-primary-foreground"
                )}
              >
                {nav.icon}
              </div>
              {/* the illustartif div */}
              <CurvedItem
                isSelected={isSelected(index)}
                navLength={dashboardNavs.length - 1}
                selectedNav={selectedNav}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
