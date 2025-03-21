import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useUser } from "@/hooks";
import { Navigate, Outlet } from "react-router-dom";

export default function DashboardLayout() {

  const { user } = useUser({});
  if(!user) return <Navigate to={"/auth/sign-in"}/>
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 flex flex-col overflow-hidden bg-secondary relative">
          <div className="h-14"/>
          <DashboardNavbar />
          <div className="flex-1 overflow-y-auto sm:p-4 p-2 sm:pt-8 pt-6">
            <Outlet />
          </div>
          <DashboardFooter />
        </main>
      </div>
    </div>
  );
}
