import React from "react";

export default function UserInfo() {
  return (
    <div className='flex gap-2'>
      <div className="flex flex-col items-start pt-1">
        <h1 className='font-medium text-muted'>Abdelatif</h1>
        <span className="font-bold text-sm text-muted-foreground">Admin</span>
      </div>
      <div className="relative flex items-center flex-col bg-yellow-500 p-[3px] rounded-full w-12 h-12">
        <img
          src="/avatars/1.png"
          className="rounded-full h-full w-full"
          width={100}
          height={100}
          alt="logo image"
        />
      </div>
    </div>
  );
}
