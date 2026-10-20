import { m } from "framer-motion";
import { navLinks } from "../data/portfolio.js";

// Fades + slides children up once when they scroll into view
export function Reveal({ children, delay = 0, className = "" }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </m.div>
  );
}

// Shared wrapper: consistent spacing, numbered eyebrow and heading for every section
export default function Section({ id, eyebrow, title, intro, children, className = "" }) {
  const number = String(navLinks.findIndex((l) => l.id === id) + 1).padStart(2, "0");

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span>{number}</span>
            <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
            <span>{eyebrow}</span>
          </p>
          <h2
            id={`${id}-title`}
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-[2.6rem]"
          >
            {title}
          </h2>
          {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
        </Reveal>
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
