'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { planets } from '@/lib/data';
// import { DotBackground } from '../magicui/dot-pattern';



export default function PlanetCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;

    let scrollPosition = 0;
    const scrollStep = 2;
    const scrollInterval = 30;

    const scrollCarousel = () => {
      scrollPosition += scrollStep;
      if (scrollPosition > scrollWidth - clientWidth) {
        scrollPosition = 0;
      }
      carousel.scrollTo(scrollPosition, 0);
    };

    const intervalId = setInterval(scrollCarousel, scrollInterval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full py-20 relative overflow-hidden">
      {/* <DotBackground directions='to_bottom_left' /> */}
      <div className="container relative mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:order-2 mb-16 md:mb-0"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-left">
              Explore<br className='md:block hidden' />the <span className='text-yellow-400'>Planets</span>
            </h2>
          </motion.div>
          <div className="w-full md:w-2/3 md:order-1">
            <motion.div
              ref={carouselRef}
              className="flex overflow-x-hidden"
              whileTap={{ cursor: "grabbing" }}
            >
              <motion.div className="flex">
                {planets.map((planet) => (
                  <motion.div
                    key={planet.id}
                    className="flex-shrink-0 mx-2"
                  >
                    <Card 
                      className="w-64 rounded-[16px] border border-muted/30 overflow-hidden transition-all duration-300 ease-in-out hover:opacity-80 bg-secondary"
                    >
                      <CardHeader className="p-0">
                        <img src={planet.image || "/placeholder.svg"} alt={planet.name} className="w-full h-40 object-contain" />
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle>{planet.name}</CardTitle>
                        <CardDescription>{planet.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 flex justify-center">
                        <Button variant="outline" className='border-none bg-yellow-400' size="sm">
                          Learn More <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}