import React from "react";
import { BorderBeam } from "./magicui/border-beam";

export default function Logo({ type }:{ type: string }) {
  return (
    <div className="relative flex items-center flex-col bg-yellow-500 p-[3px] rounded-full w-12 h-12">
      <img src="/images/telescope.png" className="rounded-full h-full w-full" width={100} height={100} alt="logo image" />
      {/* <span className="text-md text-primary font-bold">البتاني</span> */}
      {
        type === "nav" ? <BorderBeam /> : ""
      }
    </div>
  );
}
