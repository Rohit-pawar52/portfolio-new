import { useId, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Calendar, ChevronDown, ChevronsDownUp, ChevronsUpDown, MapPin } from "lucide-react";
import { experience } from "../data/portfolio.js";
import Section from "./Section.jsx";
import { toneOf } from "./about/tones.js";

const EASE = [0.22, 1, 0.36, 1];

const isCurrent = (period = "") => /present/i.test(period);

// The timeline runs through the job colours from top to bottom
const railStops = experience.map((job) => toneOf(job.color).css);
const railGradient = `linear-gradient(to bottom, ${(railStops.length > 1 ? railStops : [...railStops, ...railStops]).join(", ")})`;
// Fades the rail out below the last card
const railFade = "linear-gradient(to bottom, black 80%, transparent)";

export default function Experience() {
  // Indexes of the open cards; the most recent job starts open
  const [open, setOpen] = useState(() => new Set(experience.length > 0 ? [0] : []));
  const allOpen = experience.length > 0 && open.size === experience.length;

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(experience.map((_, i) => i)));

  // Desktop timeline that fills as the list scrolls past the reading line
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 32, restDelta: 0.001 });
  const railClip = useTransform(progress, (v) => `inset(0 0 ${(1 - Math.min(Math.max(v, 0), 1)) * 100}% 0)`);

  const aside = experience.length > 1 && (
    <button
      type="button"
      onClick={toggleAll}
      className="inline-flex items-center gap-2 rounded-md py-1 font-mono text-sm text-accent transition-colors hover:text-ink"
    >
      {allOpen ? (
        <ChevronsDownUp className="size-4" aria-hidden="true" />
      ) : (
        <ChevronsUpDown className="size-4" aria-hidden="true" />
      )}
      {allOpen ? "Collapse all" : "Expand all"}
    </button>
  );

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I have"
      accent="worked"
      accentClass="text-amber"
      aside={aside}
    >
      <div ref={listRef} className="relative lg:pl-14">
        {experience.length > 1 && (
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-6.75 top-10 hidden w-0.5 rounded-full bg-line lg:block"
            style={{ maskImage: railFade, WebkitMaskImage: railFade }}
          >
            <m.div className="absolute inset-0 rounded-full" style={{ background: railGradient, clipPath: railClip }} />
          </div>
        )}

        <ol className="space-y-4 sm:space-y-5">
          {experience.map((job, i) => (
            <JobCard
              key={`${job.company}-${job.period}`}
              job={job}
              index={i}
              open={open.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </ol>
      </div>
    </Section>
  );
}

/*
  One accordion card. The whole header is the toggle button, inside the h3 as in
  the WAI-ARIA accordion pattern. The first highlight sits in the header, so a
  collapsed card still says what the job was about (and cards without a role
  title stay balanced); the other highlights and the tech chips expand below it.

  From md up the card is a 2 x 2 grid: company details on the left spanning both
  rows, role + first highlight top right, expanding panel bottom right. The h3
  and button pass the grid through as subgrids, and because the second row is
  1fr, a tall left column only ever stretches that row, so the panel always
  starts right under the first highlight.
*/
function JobCard({ job, index, open, onToggle }) {
  const tone = toneOf(job.color);
  const reduce = useReducedMotion();
  const uid = useId();
  const buttonId = `${uid}-button`;
  const panelId = `${uid}-panel`;
  const techId = `${uid}-tech`;
  const current = isCurrent(job.period);
  const [lead, ...rest] = job.points ?? [];
  const tech = job.tech ?? [];

  return (
    <m.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay: Math.min(index, 3) * 0.05 }}
      className="relative"
    >
      {/* Timeline node (desktop) */}
      <span aria-hidden="true" className="absolute -left-14 top-7 hidden h-6 w-14 items-center justify-center lg:flex">
        <span className="relative flex size-3">
          {current && <span className={`absolute inset-0 animate-pulse-ring rounded-full ${tone.bg}`} />}
          <span className={`relative size-3 rounded-full ring-4 ring-bg ${tone.bg}`} />
        </span>
      </span>

      <article
        className={`rounded-[1.25rem] border border-l-[3px] border-line bg-surface transition-shadow duration-500 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:grid-rows-[auto_1fr] md:gap-x-8 md:p-7 ${tone.borderL} ${
          open ? `shadow-2xl ${tone.shadow}` : ""
        }`}
      >
        {/* Explicit start lines matter: auto-placement would refuse to overlap the panel's cell */}
        <h3 className="md:col-span-2 md:col-start-1 md:row-span-2 md:row-start-1 md:grid md:grid-cols-subgrid md:grid-rows-subgrid">
          <button
            id={buttonId}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
            className={`group relative flex w-full flex-col gap-y-4 rounded-[1.15rem] px-5 pt-5 text-left transition-[padding] duration-300 focus-visible:-outline-offset-4 sm:px-7 sm:pt-7 md:col-span-2 md:col-start-1 md:row-span-2 md:row-start-1 md:grid md:grid-cols-subgrid md:grid-rows-subgrid md:gap-y-0 md:rounded-lg md:p-0 md:focus-visible:outline-offset-12 ${
              open ? "pb-3 sm:pb-3" : "pb-5 sm:pb-7"
            }`}
          >
            {/* Left: company, dates, location */}
            <span className="flex min-w-0 flex-col items-start gap-2 md:col-start-1 md:row-span-2 md:row-start-1">
              <span className={`max-w-full pr-12 font-mono text-[15px] font-bold leading-snug wrap-break-word md:pr-0 ${tone.text}`}>
                @{job.company}
              </span>
              <span className="flex items-center gap-2 text-sm text-muted">
                <Calendar className="size-3.5 shrink-0" aria-hidden="true" />
                {job.period}
              </span>
              {job.location && (
                <span className="flex items-center gap-2 text-sm text-muted">
                  <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                  {job.location}
                </span>
              )}
              {current && <CurrentBadge />}
            </span>

            {/* Right: role (only when known) + first highlight */}
            <span className="flex min-w-0 flex-col gap-3 md:col-start-2 md:row-start-1 md:pr-14">
              {job.role && (
                <span className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
                  {job.role}
                </span>
              )}
              {lead && (
                // Read out in the panel instead, so the button's name stays short
                <span aria-hidden="true" className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <Dash className={tone.bg} />
                  <span className={`min-w-0 ${open ? "" : "line-clamp-2"}`}>{lead}</span>
                </span>
              )}
            </span>

            {/* Chevron, pinned to the top-right corner */}
            <span
              aria-hidden="true"
              className={`absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:text-ink sm:right-6 sm:top-6 md:right-0 md:top-0 ${tone.groupHoverBorder}`}
            >
              <ChevronDown className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </span>
          </button>
        </h3>

        <AnimatePresence initial={false}>
          {open && (
            <m.div
              key="panel"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
              className="relative overflow-hidden md:col-start-2 md:row-start-2"
            >
              <div className="px-5 pb-6 sm:px-7 sm:pb-8 md:p-0 md:pr-14 md:pt-3">
                <ul className="space-y-3">
                  {lead && <li className="sr-only">{lead}</li>}
                  {rest.map((point) => (
                    <li key={point.slice(0, 48)} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <Dash className={tone.bg} />
                      <span className="min-w-0">{point}</span>
                    </li>
                  ))}
                </ul>

                {tech.length > 0 && (
                  <div className="mt-6 border-t border-dashed border-line pt-5">
                    <p id={techId} className="font-mono text-xs uppercase tracking-wider text-muted">
                      Technologies:
                    </p>
                    <ul aria-labelledby={techId} className="mt-3 flex flex-wrap gap-2">
                      {tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-xs text-ink/85 transition-colors duration-200 hover:border-accent/50 hover:text-accent"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </article>
    </m.li>
  );
}

// Short coloured dash used as a list bullet
function Dash({ className }) {
  return <span aria-hidden="true" className={`mt-2.75 h-0.5 w-3 shrink-0 rounded-full ${className}`} />;
}

function CurrentBadge() {
  return (
    <span className="mt-1 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
      <span aria-hidden="true" className="relative flex size-2">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
        <span className="relative size-2 rounded-full bg-accent" />
      </span>
      Current
    </span>
  );
}
