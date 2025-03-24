import { WarpBackground } from "@/components/magicui/warp-background";
import { Card } from "../ui/card";
import { FlickeringGrid } from "../magicui/flickering-grid";
import { cn } from "@/lib/utils";

export default function Congratulation({
  directions,
  header,
  content,
}: {
  directions?: string;
  header: string;
  content: string;
}) {
  return (
    <WarpBackground className="h-full">
      <Card
        className={cn(
          "relative overflow-hidden p-4 w-full flex items-center justify-center  gap-8 bg-black min-h-[500px] border-none",
          directions
        )}
      >
        <img src="/images/moon1.jpg"  alt="moon" width={600} height={300} />
        <div className="flex flex-col items-center gap-4">
          <h1 className="w-full pl-6 text-yellow-400 lg:text-6xl md:text-3xl text-2xl font-bold capitalize">
            {header}
          </h1>
          <p className="text-muted-foreground lg:text-3xl text-xl px-4">{content}</p>
        </div>
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
          height={600}
          width={1400}
        />
      </Card>
    </WarpBackground>
  );
}
