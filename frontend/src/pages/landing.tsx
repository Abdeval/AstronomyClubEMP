import MagicButtons from "@/components/buttons/MagicButtons";
import Footer from "@/components/Footer";
import AnimatedText from "@/components/landing/AnimatedText";
import Congratulation from "@/components/landing/Congratulation";
import Earth from "@/components/landing/Earth";
import Hero from "@/components/landing/Hero";
import { Ripple } from "@/components/magicui/ripple";
import LandingNav from "@/components/navs/LandingNav";
// import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export default function Landing() {
  return (
    <div className="relative bg-black flex items-center flex-col">
      <LandingNav />
      {/* the earth view */}
      <section className="relative bg-transparent pt-40 h-screen w-full">
        {/* hero */}
        <Hero />
        <div className="absolute -bottom-40 z-50 h-40">
          <AnimatedText />
        </div>
      </section>
      {/* the magic buttons view */}
      <section className="relative md:h-screen h-[800px] flex md:flex-row flex-col w-full bg-cover bg-black bg-[url('/images/moon.jpg')] bg-no-repeat justify-between px-4 items-center">
        <Earth />
        <MagicButtons />
        <div className="bg-black/50 w-full h-full absolute top-0 left-0" />
      </section>
      {/* get in touch */}
      <section className="h-screen w-full bg-black">
        <Congratulation
          header="about the moon"
          content=" The Moon is Earth's only natural satellite and the fifth-largest
                    moon in the solar system. It has a diameter of about 3,474 km and
                    orbits Earth at an average distance of 384,400 km. 🚀🌕"
          directions="md:flex-row flex-col"
        />
        {/* <MagicButtons /> */}
      </section>
      <section className="px-8 pt-8 h-screen flex items-center justify-between w-full md:flex-row flex-col gap-8 bg-transparent">
        {/* <MagicButtons /> */}
        <div className="flex-1 p-8">
          <h1 className="text-6xl font-semibold text-background">
            {" "}
            <span className="text-yellow-400">It's all</span> about what you can
            you
          </h1>
        </div>

        <div className="flex-1 w-full relative h-full flex justify-center items-center">
          <Ripple className="dark" />
          <Brain size={60} className=" text-yellow-400" />
          {/* <EarthIcon size={60} className=" text-yellow-400"/> */}
        </div>
      </section>

      <section className="h-screen w-full bg-black">
        <Congratulation
          content=" The Moon is Earth's only natural satellite and the fifth-largest
                    moon in the solar system. It has a diameter of about 3,474 km and
                    orbits Earth at an average distance of 384,400 km. 🚀🌕 "
          header="about the galaxy"
          directions="md:flex-row-reverse flex-col"
        />
        {/* <MagicButtons /> */}
      </section>
      {/* <Button variant={"destructive"}>Just develop</Button> */}
      <Footer />
    </div>
  );
}
