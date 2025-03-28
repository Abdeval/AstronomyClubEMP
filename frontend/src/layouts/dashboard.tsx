import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardNavbar from "@/components/navs/dashboard-navbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useUser } from "@/hooks";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);

  const { user } = useUser({});
  console.log("dashboard layout: ", user);
  if (!user) return <Navigate to={"/auth/sign-in"} />;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden relative">
        <DashboardSidebar isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        <main className="flex-1 flex flex-col overflow-hidden bg-secondary relative font-regular">
          <div className="h-14" />
          <DashboardNavbar isOpenSidebar={isOpenSidebar}/>
          <div className="flex-1 overflow-y-auto sm:p-4 p-2 sm:pt-8 pt-6">
            <Outlet />
          </div>
          <div className="h-16 sm:h-10" />
          <DashboardFooter />
        </main>
        {/* the toaster */}
        {/* <Toaster /> */}
      </div>
    </div>
  );
}
