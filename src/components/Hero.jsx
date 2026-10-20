import { m } from "framer-motion";
import { Award, Download, Mail, MapPin } from "lucide-react";
import { contact, coreStack, profile } from "../data/portfolio.js";
import { LinkedinIcon } from "./icons.jsx";
import photo from "../assets/profile.jpg";

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const outlineBtn =
  "inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface/60 px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-ink/40 hover:bg-surface sm:px-6";

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden">
      {/* Decorative dot grid + warm glow */}
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-24 size-[28rem] rounded-full bg-accent-soft opacity-70 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-12 sm:px-8 sm:pt-16 md:grid-cols-[1.35fr_1fr] md:gap-16 md:pb-24 md:pt-24">
        <div>
          <m.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted"
          >
            <MapPin className="size-3.5 text-accent" aria-hidden="true" />
            Based in {profile.location}, India
          </m.p>

          <m.h1
            {...fadeUp(0.08)}
            className="mt-6 font-display text-[2.9rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-[3.4rem] lg:text-7xl"
          >
            {profile.name}
            <span className="text-accent">.</span>
          </m.h1>

          <m.p {...fadeUp(0.16)} className="mt-5 text-lg font-medium text-accent sm:text-xl">
            {profile.role}
          </m.p>

          <m.p {...fadeUp(0.24)} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </m.p>

          <m.div {...fadeUp(0.32)} className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <a
              href={profile.resumeFile}
              download
              className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-bg shadow-lg shadow-ink/10 transition-all hover:-translate-y-0.5 hover:shadow-xl sm:py-3"
            >
              <Download className="size-4" aria-hidden="true" />
              Download Resume
            </a>
            <a href="#contact" className={outlineBtn}>
              <Mail className="size-4" aria-hidden="true" />
              Contact Me
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={outlineBtn}>
              <LinkedinIcon className="size-4" />
              LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-64 sm:w-72 md:w-full md:max-w-sm"
        >
          <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-4xl border border-accent/30 bg-accent-soft" />
          <img
            src={photo}
            alt={`Portrait of ${profile.name}`}
            width="720"
            height="900"
            fetchPriority="high"
            className="relative aspect-[4/5] w-full rounded-4xl border border-line object-cover shadow-xl shadow-ink/10"
          />

          {/* Floating facts, all taken from the resume */}
          <m.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute -left-6 bottom-10 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-lg shadow-ink/10 backdrop-blur sm:-left-10"
          >
            <p className="font-display text-2xl font-semibold leading-none">{profile.yearsExperience}</p>
            <p className="mt-1 text-xs text-muted">years in IT</p>
          </m.div>
          <m.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="absolute -right-4 top-8 flex items-center gap-2 rounded-full border border-line bg-surface/95 px-3.5 py-2 text-xs font-semibold shadow-lg shadow-ink/10 backdrop-blur sm:-right-8"
          >
            <Award className="size-4 text-accent" aria-hidden="true" />
            AZ-900 Certified
          </m.div>
        </m.div>
      </div>

      {/* Core stack strip */}
      <div className="relative border-y border-line bg-surface/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-8">
          <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Core stack</p>
          <ul className="flex flex-wrap gap-2" aria-label="Core stack">
            {coreStack.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-line bg-bg px-3 py-1 text-[13px] font-medium text-ink/80"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
