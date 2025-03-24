import { cn } from "@/lib/utils";
import { Carousel, CarouselContent } from "../ui/carousel";
import { DynamicIcon } from "../ui/dynamic-icon";

export default function CustomHeader({
  image,
  title,
  icon,
}: {
  image: string | string[];
  title: string;
  icon: string;
}) {

  const isString = typeof image === "string";
  return (
    <div
      className={cn("w-full relative flex items-center justify-center p-2 bg-background rounded-cu",
        isString ? "h-[200px] sm:h-[300px] md:h-[360px]" : ''
       )}
    >
      {/* a bit image of the component */}
      { isString ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-cu"
        />
      ) : (
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full h-full flex"
          >
            <CarouselContent className="space-x-2">
              {/* <div className="flex gap-1 items-center w-full h-full overflow-x-auto"> */}
              {image.map((i: string, index: number) => (
                <img
                  key={index}
                  src={i}
                  alt={title}
                  className="object-cover rounded-[16px] h-full w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                />
              ))}
              {/* </div> */}
            </CarouselContent>
          </Carousel>
      )}

      {/* the title */}
      <div className="flex gap-4 absolute -bottom-[30px] w-[43%] rounded-cu justify-center items-center">
        <div className="p-2 rounded-full bg-secondary">
          <DynamicIcon name={icon} className="text-primary" size={50} />
        </div>
        <h1 className="font-medium text-lg sm:text-xl md:text-2xl capitalize p-[10px] sm:p-[14px] md:p-[20px] bg-secondary/30 backdrop-blur rounded-cu">
          {title}
        </h1>
      </div>
    </div>
  );
}
