import { Globe } from "../magicui/globe";

export default function Earth() {
  return (
    <div className="z-40 relative flex size-full max-w-lg items-center justify-center overflow-hidden">
      {/* <span className="absolute uppercase top-10 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white to-black-300/80 bg-clip-text 
      text-center text-8xl font-semibold leading-none text-transparent dark:from-black dark:to-slate-400">
        Welcome to Astro
      </span> */}
      <Globe  className="top-[40px]"/>
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  );
}
