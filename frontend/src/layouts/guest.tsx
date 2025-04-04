import Footer from "@/components/Footer";
import GuestsNavbar from "@/components/navs/guests-navbar";
import { Outlet } from "react-router";

const GuestLayout = () => {
  return (
    <>
      <div className="relative flex w-full flex-col">
        <GuestsNavbar />
        <main className="border w-full min-h-[80vh] flex items-center justify-center overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default GuestLayout;
