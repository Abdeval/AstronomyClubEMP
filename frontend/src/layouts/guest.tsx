import { Outlet } from "react-router";


const GuestLayout = () => {

  return (
    <>
    <div className="w-screen h-screen pt-20">
        <Outlet />
    </div>
    </>
  )
}

export default GuestLayout;