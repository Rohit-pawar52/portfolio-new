import { ArrowUpRight, Award, BadgeCheck, CalendarDays, GraduationCap } from "lucide-react";
import { certifications, education } from "../data/portfolio.js";
import Section, { Reveal } from "./Section.jsx";

// Colour per certification card, cycled in order (static strings so Tailwind keeps them)
const certTones = [
  { bar: "bg-accent", tile: "bg-accent/10 text-accent" },
  { bar: "bg-blue", tile: "bg-blue/10 text-blue" },
  { bar: "bg-coral", tile: "bg-coral/10 text-coral" },
  { bar: "bg-amber", tile: "bg-amber/10 text-amber" },
];

// Small mono label at the top of each column, with an item count on the right
function ColumnTitle({ Icon, iconClass, count, children }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
      <h3 className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <Icon className={`size-4 ${iconClass}`} aria-hidden="true" />
        {children}
      </h3>
      <span aria-hidden="true" className="font-mono text-xs text-muted">
        {String(count).padStart(2, "0")}
      </span>
    </div>
  );
}

// Coloured bar down the left edge of a card; widens on hover
function AccentBar({ className }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-y-0 left-0 w-1 transition-[width] duration-300 group-hover:w-1.5 ${className}`}
    />
  );
}

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Learning &" accent="credentials" accentClass="text-amber">
      <div className="grid gap-12 md:grid-cols-2 md:gap-8">
        <div className="flex flex-col gap-4">
          <Reveal>
            <ColumnTitle Icon={GraduationCap} iconClass="text-amber" count={education.length}>
              Education
            </ColumnTitle>
          </Reveal>

          {education.map(({ degree, institution, year }, i) => (
            // flex-1 stretches the card so both columns end level on desktop
            <Reveal key={degree} delay={0.08 + i * 0.08} className="flex-1">
              <article className="card group relative h-full overflow-hidden p-6 pl-7 sm:p-8 sm:pl-9">
                <AccentBar className="bg-amber" />
                {year && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-4 right-4 select-none font-display text-8xl font-bold leading-none text-ink/5"
                  >
                    {year}
                  </span>
                )}

                <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-amber/10 text-amber">
                    <GraduationCap className="size-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-balance font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                      {degree}
                    </h4>
                    <p className="mt-2 text-muted">{institution}</p>
                    {year && (
                      <p className="mt-5 inline-flex items-center gap-2 rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-xs text-ink/80 dark:bg-surface-2">
                        <CalendarDays className="size-3.5 text-amber" aria-hidden="true" />
                        {year}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <Reveal delay={0.05}>
            <ColumnTitle Icon={Award} iconClass="text-accent" count={certifications.length}>
              Certifications
            </ColumnTitle>
          </Reveal>

          {certifications.map(({ name, issuer, url }, i) => {
            const tone = certTones[i % certTones.length];
            return (
              <Reveal key={name} delay={0.12 + i * 0.08}>
                <article className="card group relative overflow-hidden p-5 pl-6 sm:p-6 sm:pl-8">
                  <AccentBar className={tone.bar} />
                  <div className="flex items-start gap-4">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-xl border border-line ${tone.tile}`}>
                      <BadgeCheck className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold leading-snug sm:text-lg">{name}</h4>
                      <p className="mt-1.5 font-mono text-xs text-muted">Issued by {issuer}</p>
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link mt-4 inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline hover:underline-offset-4"
                        >
                          Verify
                          <ArrowUpRight
                            className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                            aria-hidden="true"
                          />
                          <span className="sr-only">{` ${name} credential (opens in a new tab)`}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
