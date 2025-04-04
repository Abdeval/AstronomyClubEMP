import Logo from "./Logo";
import { Icon } from "@iconify/react";
import { BorderBeam } from "./magicui/border-beam";
import { DotBackground } from "./magicui/dot-pattern";

export default function Footer() {
  return (
    <section className="relative px-4 flex-col z-50 flex justify-between items-center w-full bg-background">
      <div className="w-full px-4 flex items-center gap-8 justify-around">
        <div className="flex items-center flex-col gap-2 pt-2">
          <Logo type="d" />
          <span className="font-bold text-xl capitalize text-muted-foreground">albattani</span>
        </div>
        <div className="flex-1 border-[0.5px] border-muted-foreground/30 mb-4" />
        <div className="w-[120px]" />
      </div>

      {/* the resources and the articles */}
      <div className="w-full border-b-[.5px] border-muted-foreground/30 flex items-center justify-center gap-8 pb-8 mb-4">
        <div className="flex flex-col items-start cursor-pointer">
          <h1 className="capitalize text-xl text-yellow-400 hover:text-muted">
            resources
          </h1>
          <span className="text-muted-foreground">images</span>
          <span className="text-muted-foreground">videos</span>
        </div>
        <div className="flex flex-col items-start cursor-pointer">
          <h1 className="capitalize text-xl text-yellow-400 hover:text-muted">
            articles
          </h1>
          <span className="text-muted-foreground">blogs</span>
          <span className="text-muted-foreground">posts</span>
        </div>
        <div className="flex flex-col items-start cursor-pointer">
          <h1 className="capitalize text-xl text-yellow-400 hover:text-muted">
            Company
          </h1>
          <span className="text-muted-foreground">employees</span>
          <span className="text-muted-foreground">manages</span>
        </div>
        <div className="flex flex-col items-start cursor-pointer">
          <h1 className="capitalize text-xl text-yellow-400 hover:text-muted">
            club
          </h1>
          <span className="text-muted-foreground">members</span>
          <span className="text-muted-foreground">viewers</span>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="flex items-center gap-4 ">
          {[
            { icon: "mdi:youtube", color: "bg-primary" },
            { icon: "mdi:discord", color: "bg-primary" },
            { icon: "mdi:telegram", color: "bg-primary" },
            { icon: "mdi:instagram", color: "bg-primary" },
          ].map(({ icon, color }, index) => (
            <div
              key={index}
              className={`rounded-t-full transition duration-300 w-16 flex items-center justify-center p-2 cursor-pointer ${color} hover:bg-black`}
            >
              <Icon
                icon={icon}
                fontSize={40}
                className="transition duration-300 text-black hover:text-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* the satellite image */}
      <div className="absolute -top-10 right-10 p-4 rounded-full">
        <img src="/images/satelite.png" width={100} height={100} />
        <BorderBeam />
      </div>

      {/* the dot background */}
      <DotBackground directions="to_bottom_right" />
    </section>
  );
}
