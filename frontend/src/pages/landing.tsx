import MagicButtons from "@/components/buttons/MagicButtons";
import Footer from "@/components/Footer";
import AnimatedText from "@/components/landing/AnimatedText";
import Congratulation from "@/components/landing/Congratulation";
import Earth from "@/components/landing/Earth";
import Hero from "@/components/landing/Hero";
import { Ripple } from "@/components/magicui/ripple";
// import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { DotBackground } from "@/components/magicui/dot-pattern";

import PlanetArticles from "@/components/articles/articles-cards";
import GuestsNavbar from "@/components/navs/guests-navbar";

export default function Landing() {
  return (
    <div className="relative bg-black flex items-center flex-col w-screen overflow-hidden">
      <GuestsNavbar />
      {/* the earth view */}
      <section className="relative bg-transparent pt-40 h-screen w-full">
        <Hero />
        <div className="absolute -bottom-40 z-50 h-40">
          <AnimatedText />
        </div>
      </section>

      {/* the magic buttons view */}

      <section className="relative h-[900px] md:h-screen border-t border-primary flex md:flex-row flex-col w-full bg-cover bg-black bg-[url('/images/telescope1.jpg')] bg-no-repeat justify-between px-4 items-center">
        <Earth />
        <MagicButtons />
        <div className="bg-black/60 w-full h-full absolute top-0 left-0" />
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
      </section>
      <section className="relative z-50 px-8 pt-8 min-h-screen flex items-center justify-between w-full md:flex-row flex-col gap-8 bg-transparent">
        {/* <MagicButtons /> */}
        <div className="md:w-1/3 w-full pl-8 bg-transparent">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            {" "}
            <span className="text-primary">It's all</span> about what you can
            you
          </h1>
        </div>

        <div className="flex-1 w-full relative h-[800px] flex justify-center items-center">
          <Ripple className="dark z-40" numCircles={4}/>
          <Brain size={60} className=" text-primary" />
        </div>

        {/* the dot background */}
        <DotBackground directions="to_bottom_right"/>
      </section>

      <section className="h-screen pb-8 w-full bg-black">
        <Congratulation
          content=" The Moon is Earth's only natural satellite and the fifth-largest
                    moon in the solar system. It has a diameter of about 3,474 km and
                    orbits Earth at an average distance of 384,400 km. 🚀🌕 "
          header="about the galaxy"
          directions="md:flex-row-reverse flex-col"
        />
      </section>

      {/* the images moving horizontally */}
      <PlanetArticles />

      {/* <section className="h-screen w-full bg-black">
        <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
      </section> */}

      {/* <Button variant={"destructive"}>Just develop</Button> */}
      <Footer />
    </div>
  );
}
