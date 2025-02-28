import { Outlet } from "react-router";


const GuestLayout = () => {

  return (
    <>
    <div className="">
        <Outlet />
    </div>
    </>
  )
}

export default GuestLayout;