import React from "react";
import { BorderBeam } from "./magicui/border-beam";

export default function Logo({ type }:{ type: string }) {
  return (
    <div className="relative flex items-center flex-col bg-yellow-500 p-1 rounded-full w-16 h-16">
      <img src="/images/telescope.png" className="rounded-full h-full w-full" width={100} height={100} alt="logo image" />
      {/* <span className="text-md text-primary font-bold">البتاني</span> */}
      {
        type === "nav" ? <BorderBeam /> : ""
      }
    </div>
  );
}
