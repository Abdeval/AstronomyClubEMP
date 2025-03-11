import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col h-screen">
      <DashboardNavbar />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 flex flex-col overflow-hidden bg-secondary">
          <div className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </div>
          <DashboardFooter />
        </main>
      </div>
    </div>
  )
}
