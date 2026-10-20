import { Fragment } from "react";
import { m, stagger, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

// Fades + slides children up once when they scroll into view
export function Reveal({ children, delay = 0, y = 24, className = "", as = "div" }) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

// Small pill label shown above each section heading: "● About"
export function Eyebrow({ children, className = "" }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-xs text-accent ${className}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

/* ---------- Heading: word-by-word masked reveal ---------- */

// Each word is clipped by its own mask. clip-path (rather than overflow: hidden) keeps
// every word on the shared baseline, and the negative insets leave room for
// descenders and the italic overhang so nothing gets cut off.
const mask = { clipPath: "inset(-0.2em -0.25em -0.3em -0.12em)" };

const headingVariants = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.06, { startDelay: 0.05 }) } },
};
// Slides up from below the mask (a little past 100% so no sliver shows in the padded mask)
const wordVariants = {
  hidden: { y: "130%" },
  show: { y: "0%", transition: { duration: 0.7, ease: EASE } },
};
// The accent word comes in last and sharpens from a slight blur
const accentVariants = {
  hidden: { y: "130%", filter: "blur(8px)" },
  show: { y: "0%", filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

const splitWords = (text) => (typeof text === "string" ? text.split(/\s+/).filter(Boolean) : [text]);

function MaskedWords({ text, variants }) {
  const words = splitWords(text);
  return words.map((word, i) => (
    <Fragment key={i}>
      <span className="inline-block" style={mask}>
        <m.span className="inline-block" variants={variants}>
          {word}
        </m.span>
      </span>
      {i < words.length - 1 && " "}
    </Fragment>
  ));
}

const headingClass = "mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl";

function SectionTitle({ id, title, accent, accentClass }) {
  const reduce = useReducedMotion();
  const accentStyle = `font-serif text-[1.08em] font-normal italic tracking-normal ${accentClass}`;

  // Reduced motion: the plain heading, shown straight away
  if (reduce) {
    return (
      <h2 id={id} className={headingClass}>
        {title}
        {accent && (
          <>
            {" "}
            <span className={accentStyle}>{accent}</span>
          </>
        )}
      </h2>
    );
  }

  return (
    <h2 id={id} className={headingClass}>
      {/* Screen readers get the heading as one plain string */}
      <span className="sr-only">{[title, accent].filter(Boolean).join(" ")}</span>
      <m.span
        aria-hidden="true"
        className="block"
        variants={headingVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      >
        <MaskedWords text={title} variants={wordVariants} />
        {accent && (
          <>
            {" "}
            <span className={accentStyle}>
              <MaskedWords text={accent} variants={accentVariants} />
            </span>
          </>
        )}
      </m.span>
    </h2>
  );
}

/*
  Shared wrapper for every section.
  title  = main heading text (bold grotesk)
  accent = last word(s), rendered in italic serif + accent color, e.g. title="Where I've" accent="worked"
  intro  = optional paragraph under the heading
  aside  = optional element shown to the right of the heading on desktop (e.g. filter tabs, "Expand all")
*/
export default function Section({ id, eyebrow, title, accent, accentClass = "text-accent", intro, aside, children, className = "" }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <SectionTitle id={`${id}-title`} title={title} accent={accent} accentClass={accentClass} />
            {intro && (
              <Reveal delay={0.2}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{intro}</p>
              </Reveal>
            )}
          </div>
          {aside && <Reveal delay={0.1}>{aside}</Reveal>}
        </div>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}
