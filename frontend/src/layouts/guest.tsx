import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";

import SearchBar from "@/components/searchbar";

const GuestLayout = () => {

  return (
    <>
    <div className="w-screen bg-[#0d1117] h-screen ">
        <header className="w-full justify-between h-24 bg-[#01040a] px-10 flex  items-center border-b-[1px] border-slate-700">
            <img src="/svgs/logo-main-white.svg" className="w-48" alt="" />
            <div className="flex items-center justify-center space-x-3">
                  <SearchBar/>
                  <Button>
                      News
                  </Button>
                  <Button>
                      Events
                  </Button>
                  <Button>
                      Newsletters
                  </Button>
            </div>
        </header>
        <Outlet />
    </div>
    </>
  )
}

export default GuestLayout;