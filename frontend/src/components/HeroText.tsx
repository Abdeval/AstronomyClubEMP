import { AuroraText } from "@/components/magicui/aurora-text";
import { Rocket } from "lucide-react";

export function HeroText() {
  return (
    <h1 className="text-yellow-500 font-bold tracking-tighter md:text-[100px] lg:text-[120px] text-[80px]">
      <div className=" flex gap-4">
        Build Fast
        <Rocket size={60} className="text-white"/>
      </div>
      <span className="text-white ">Search <span className="text-yellow-400">&</span> Discover</span>
      <AuroraText>{""}</AuroraText>
    </h1>
  );
}
