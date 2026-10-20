import { m } from "framer-motion";
import { Activity, Boxes, Cloud, Workflow } from "lucide-react";
import { about } from "../data/portfolio.js";
import Section, { Reveal } from "./Section.jsx";
import CountUp from "./about/CountUp.jsx";
import { toneOf } from "./about/tones.js";

const EASE = [0.22, 1, 0.36, 1];

// Maps the "icon" names used in data/portfolio.js to icons
const icons = {
  cloud: Cloud,
  pipeline: Workflow,
  container: Boxes,
  monitor: Activity,
};

// Splits a paragraph into its first sentence (shown in ink for emphasis) and the rest
function splitLead(text) {
  const match = text.match(/^(.+?[.!?])\s+(.+)$/s);
  return match ? [match[1], match[2]] : [text, ""];
}

export default function About() {
  const { paragraphs = [], motto, glance = [], stats = [], focusAreas = [] } = about;
  const [first, ...others] = paragraphs;
  const [lead, rest] = first ? splitLead(first) : ["", ""];

  return (
    <Section id="about" eyebrow="About" title="Cloud engineer, automating" accent="everything">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
        <div className="min-w-0">
          <Reveal className="space-y-6 text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
            {first && (
              <p>
                <span className="font-medium text-ink">{lead}</span>
                {rest && ` ${rest}`}
              </p>
            )}
            {others.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </Reveal>

          {motto && (
            <Reveal delay={0.1} className="mt-10">
              <Motto text={motto} />
            </Reveal>
          )}
        </div>

        {glance.length > 0 && (
          <Reveal delay={0.15} className="min-w-0 lg:sticky lg:top-28">
            <GlanceCard items={glance} />
          </Reveal>
        )}
      </div>

      {stats.length > 0 && <Stats items={stats} />}
      {focusAreas.length > 0 && <FocusAreas items={focusAreas} />}
    </Section>
  );
}

// Terminal window that "prints" the motto, with a blinking caret
function Motto({ text }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface font-mono">
      <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-4 py-3">
        <span className="size-2.5 rounded-full bg-coral/80" />
        <span className="size-2.5 rounded-full bg-amber/80" />
        <span className="size-2.5 rounded-full bg-accent/80" />
        <span className="ml-auto text-[11px] text-muted">bash: motto</span>
      </div>
      <div className="px-4 py-5 text-sm leading-relaxed sm:px-6 sm:text-[15px]">
        <p aria-hidden="true" className="text-muted">
          <span className="text-accent">$</span> echo &quot;$MOTTO&quot;
        </p>
        <blockquote className="mt-2 flex gap-2.5 text-ink">
          <span aria-hidden="true" className="select-none text-accent">
            &gt;
          </span>
          <p className="min-w-0">
            {text}
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[1.15em] w-[0.55em] translate-y-[0.2em] animate-blink bg-accent"
            />
          </p>
        </blockquote>
      </div>
    </figure>
  );
}

// "Profile at a glance": a 1px frame with a slow light beam travelling around it
function GlanceCard({ items }) {
  return (
    <div className="relative overflow-hidden rounded-[1.25rem] bg-line p-px">
      {/* Rotating conic gradient; only the 1px ring around the inner panel shows it */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_10s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg 240deg, var(--c-accent) 300deg, var(--c-blue) 335deg, transparent 360deg)",
        }}
      />

      <div className="relative overflow-hidden rounded-[calc(1.25rem-1px)] bg-surface p-6 font-mono sm:p-8">
        {/* Soft corner glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-accent/6 blur-3xl dark:bg-accent/10"
        />

        <div className="relative flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-accent">Profile at a glance</h3>
          <span aria-hidden="true" className="text-[11px] text-muted">
            $ whoami
          </span>
        </div>

        <dl className="relative mt-5 divide-y divide-dashed divide-line border-t border-dashed border-line sm:grid sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-x-8">
          {items.map(({ label, value, highlight }) => (
            // gap-y only: a subgrid's own column gap would override the 2rem inherited from the dl
            <div key={label} className="grid gap-y-1 py-3 sm:col-span-2 sm:py-3.5 sm:grid-cols-subgrid sm:items-baseline">
              <dt className="text-xs text-muted">{label}</dt>
              <dd className={`text-sm font-semibold wrap-break-word ${highlight ? "text-accent" : "text-ink"}`}>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

// Count-up numbers in one seamless strip (2 x 2 on phones, 4 across on desktop)
function Stats({ items }) {
  return (
    <Reveal className="mt-16 sm:mt-20">
      <div className="overflow-hidden rounded-[1.25rem] border border-line bg-surface">
        {/* -mb-px / -mr-px push the outer cell borders under the frame so only inner dividers show */}
        <ul className="-mb-px -mr-px grid grid-cols-2 lg:grid-cols-4">
          {items.map(({ value, suffix = "", label }, i) => (
            <li
              key={label}
              className="relative border-b border-r border-line px-5 py-7 transition-colors duration-300 hover:bg-surface-2 sm:px-8 sm:py-10"
            >
              <span aria-hidden="true" className="absolute right-4 top-4 font-mono text-[10px] text-muted sm:right-5 sm:top-5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p aria-hidden="true" className="font-display text-5xl font-bold leading-none tracking-tight tabular-nums lg:text-6xl">
                <CountUp value={value} />
                {suffix && <span className="text-accent">{suffix}</span>}
              </p>
              <p className="mt-3 text-sm leading-snug text-muted">
                <span className="sr-only">{`${value}${suffix} `}</span>
                {label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function FocusAreas({ items }) {
  return (
    <div className="mt-16 sm:mt-20">
      <Reveal>
        <p id="about-focus-label" className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span aria-hidden="true" className="text-accent">
            {"// "}
          </span>
          Focus areas
        </p>
      </Reveal>
      <ul aria-labelledby="about-focus-label" className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((area, i) => (
          <FocusCard key={area.title} area={area} index={i} />
        ))}
      </ul>
    </div>
  );
}

// Card with a coloured top edge; lifts and glows in its own colour on hover
function FocusCard({ area, index }) {
  const tone = toneOf(area.color);
  const Icon = icons[area.icon] ?? Cloud;

  return (
    <m.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      className="min-w-0"
    >
      <div
        className={`group relative isolate h-full overflow-hidden rounded-[1.25rem] border border-line bg-surface p-6 transition-[translate,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl sm:p-7 ${tone.hoverBorder} ${tone.hoverShadow}`}
      >
        {/* 2px top edge in the card's colour */}
        <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-0.5 ${tone.bg}`} />
        {/* Corner glow that fades in on hover */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -right-14 -top-14 -z-10 size-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20 ${tone.bg}`}
        />

        <span
          className={`grid size-11 place-items-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-105 ${tone.soft} ${tone.ring} ${tone.text}`}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-lg font-bold leading-snug">{area.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{area.text}</p>
      </div>
    </m.li>
  );
}
