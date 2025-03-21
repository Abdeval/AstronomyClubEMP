import GuestsNavbar from "@/components/navs/guests-navbar";
import { Outlet } from "react-router";

const GuestLayout = () => {
  return (
    <>
      <div className="relative flex pt-20 w-full h-screen">
        <GuestsNavbar />
        <main className="border w-full h-full flex items-center justify-center">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default GuestLayout;
