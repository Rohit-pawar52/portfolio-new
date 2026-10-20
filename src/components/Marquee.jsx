import { coreStack } from "../data/portfolio.js";

// One copy of the tool list. Every item starts with its own dot + padding, so two copies join seamlessly.
function StackList({ duplicate = false }) {
  return (
    <ul
      aria-label={duplicate ? undefined : "Core stack"}
      aria-hidden={duplicate ? "true" : undefined}
      className={`flex shrink-0 items-center ${
        duplicate ? "motion-reduce:hidden" : "motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3"
      }`}
    >
      {coreStack.map((tool) => (
        <li key={tool} className="flex items-center gap-6 pl-6 font-mono text-sm text-muted sm:gap-8 sm:pl-8 sm:text-[15px]">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
          <span className="whitespace-nowrap">{tool}</span>
        </li>
      ))}
    </ul>
  );
}

// Infinite strip of core tools under the hero (pauses on hover; static and wrapped for reduced motion)
export default function Marquee() {
  return (
    <div className="relative border-y border-line bg-surface py-5 sm:py-6">
      <div className="mask-x flex overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
          <StackList />
          <StackList duplicate />
        </div>
      </div>
    </div>
  );
}
