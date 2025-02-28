import { AuroraText } from "@/components/magicui/aurora-text";
import { Rocket } from "lucide-react";
import { LineShadowText } from "./magicui/line-shadow-text";

export function HeroText() {
  return (
    <h1 className="text-yellow-500 font-bold tracking-tighter md:text-[100px] lg:text-[120px] text-[80px]">
      <div className="text-balance flex gap-4 tracking-tighter">
        Build{" "}
        <LineShadowText className="italic" shadowColor={'white'}>
          Fast
        </LineShadowText>
        <Rocket size={60} className="text-white" />
      </div>
      <span className="text-white ">
        Search <span className="text-yellow-400">&</span> Discover
      </span>
      <AuroraText>{""}</AuroraText>
    </h1>
  );
}
