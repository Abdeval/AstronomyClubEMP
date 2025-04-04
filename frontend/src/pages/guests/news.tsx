import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNasaDailyImage } from "@/hooks";
import { Copyright } from "lucide-react";

const News = () => {
  const { data, isLoading } = useNasaDailyImage();
  if (isLoading)
    return (
      <div className="w-screen h-screen p-4 pt-20">
        <Card className="w-full h-full flex items-center gap-4 sm:flex-row flex-col">
          <Skeleton className="flex-1 h-full w-full"/>
          <Skeleton className="flex-1 h-full w-full"/>
        </Card>
      </div>
    );
  return (
    <div className="w-full h-full bg-secondary/30 p-4 space-y-8 sm:space-y-12 pt-20">
      <h1 className="font-bold text-3xl  sm:text-3xl md:text-5xl lg:text-8xl text-foreground capitalize">
        The nasa daily image{" "}
      </h1>
      <Card className="flex sm:flex-row flex-col-reverse">
        <CardDescription className="font-regular flex-1 p-2 text-sm sm:text-md md:text-lg lg:text-xl leading-y-8">
          {data.explanation}
        </CardDescription>
        <CardContent className="p-2 flex flex-col gap-2 flex-1">
          <img src={data.url} alt="" className="objec-cover w-full h-full" />
          <div className="w-full flex items-center justify-between">
            <CardTitle className="uppercase text-md md:text-xl">{data.title}</CardTitle>
            <div className="flex gap-2 font-regular items-center text-muted-foreground">
              <Copyright size={16} /> {data.copyright}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default News;
