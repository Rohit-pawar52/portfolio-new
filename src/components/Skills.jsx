import { Activity, Boxes, Cloud, GitBranch, Workflow } from "lucide-react";
import { skills } from "../data/portfolio.js";
import Section, { Reveal } from "./Section.jsx";

// Maps the "icon" names used in data/portfolio.js to icons
const icons = {
  cloud: Cloud,
  pipeline: Workflow,
  container: Boxes,
  monitor: Activity,
  git: GitBranch,
};

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I work with">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {skills.map(({ category, icon, items }, i) => {
          const Icon = icons[icon] ?? Cloud;
          const n = skills.length;
          // Stretch the last card(s) so rows never end with an empty gap
          const span = [
            n % 2 === 1 && i === n - 1 ? "sm:col-span-2" : "",
            n % 3 === 2 && i >= n - 2 ? "lg:col-span-3" : n % 3 === 1 && i === n - 1 ? "lg:col-span-6" : "lg:col-span-2",
          ].join(" ");
          return (
            <Reveal
              key={category}
              delay={i * 0.05}
              className={`rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-ink/25 ${span}`}
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <h3 className="font-semibold">{category}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${category} skills`}>
                {items.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-bg px-3 py-1.5 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
