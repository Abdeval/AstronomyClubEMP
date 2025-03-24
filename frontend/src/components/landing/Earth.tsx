import { Globe } from "../magicui/globe";

export default function Earth() {
  return (
    <div className="z-40 relative flex-1 flex size-full max-w-lg items-center justify-center overflow-hidden">
      <Globe  className="top-[40px]"/>
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  );
}