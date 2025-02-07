import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center flex-col bg-yellow-500 p-1 rounded-full">
      <img src="/images/logo-1.png" className="rounded-full w-16 h-16" width={100} height={100} alt="logo image" />
      {/* <span className="text-md text-primary font-bold">البتاني</span> */}
    </div>
  );
}
