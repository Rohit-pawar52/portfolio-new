import { Briefcase } from "lucide-react";
import { experience } from "../data/portfolio.js";
import Section, { Reveal } from "./Section.jsx";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked" className="bg-surface/60">
      <div className="relative">
        {/* timeline rail */}
        <span aria-hidden="true" className="absolute bottom-2 left-2.75 top-2 w-px bg-line md:left-[calc(33%+11px)]" />
        <ol>

        {experience.map((job) => {
          const current = /present/i.test(job.period);
          return (
            <li key={job.company} className="relative pb-14 pl-10 last:pb-0 md:grid md:grid-cols-[33%_1fr] md:pl-0">
              {/* timeline marker */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-0.5 grid size-5.75 place-items-center rounded-full border md:left-[33%] ${
                  current ? "border-accent bg-accent text-bg" : "border-line bg-bg text-muted"
                }`}
              >
                <Briefcase className="size-3" />
              </span>

              <Reveal className="md:pr-12 md:text-right">
                <p className="font-mono text-xs uppercase tracking-wider text-accent">{job.period}</p>
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug sm:text-2xl">{job.company}</h3>
                {(job.role || job.location) && (
                  <p className="mt-1.5 text-sm text-muted">{[job.role, job.location].filter(Boolean).join(" · ")}</p>
                )}
                {current && (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
                    <span className="size-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
                    Current
                  </span>
                )}
              </Reveal>

              <Reveal delay={0.08} className="mt-4 md:mt-0 md:pl-12">
                <ul className="space-y-3 md:rounded-2xl md:border md:border-line md:bg-bg md:p-6">
                  {job.points.map((point) => (
                    <li key={point.slice(0, 32)} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          );
        })}
        </ol>
      </div>
    </Section>
  );
}
