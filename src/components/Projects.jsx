import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useInView, useMotionValue, useReducedMotionConfig, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/portfolio.js";
import ProjectArt from "./ProjectArt.jsx";
import Section from "./Section.jsx";
import { GithubIcon } from "./icons.jsx";

const ease = [0.22, 1, 0.36, 1];
const ALL = "All";

// Filter tabs: "All" + every category in the data, in the order it first appears
const categories = [ALL, ...new Set(projects.map((p) => p.category))];

// Cards fade up (staggered) the first time the grid scrolls into view, and again when a filter brings them back
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: i * 0.08 } }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2, ease } },
};

// Below md the tabs are one swipeable row (snap points, hidden scrollbar, edge fades); md+ they wrap
function FilterTabs({ active, onChange }) {
  const scrollerRef = useRef(null);
  const reduceMotion = useReducedMotionConfig();
  const [fade, setFade] = useState({ start: false, end: false });

  // Show each edge fade only while there is more to scroll to on that side
  const updateFade = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const start = el.scrollLeft > 2;
    const end = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
    setFade((f) => (f.start === start && f.end === end ? f : { start, end }));
  }, []);

  useEffect(() => {
    updateFade();
    window.addEventListener("resize", updateFade);
    document.fonts?.ready.then(updateFade); // tab widths change once the mono font loads
    return () => window.removeEventListener("resize", updateFade);
  }, [updateFade]);

  // Centre the chosen tab in the row so it is never left half hidden
  const select = (category, button) => {
    onChange(category);
    const el = scrollerRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({
      left: button.offsetLeft - (el.clientWidth - button.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const edge = "pointer-events-none absolute inset-y-1 w-10 from-surface to-transparent transition-opacity duration-300 md:hidden";

  return (
    <div className="relative rounded-xl border border-line bg-surface p-1 font-mono text-xs xl:w-max">
      {/* layoutScroll lets the sliding pill measure correctly inside the scrolled row */}
      <m.div
        ref={scrollerRef}
        layoutScroll
        onScroll={updateFade}
        role="group"
        aria-label="Filter projects by category"
        className="relative flex snap-x snap-mandatory gap-1 overflow-x-auto overscroll-x-contain scrollbar-none md:flex-wrap md:justify-end md:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => {
          const selected = category === active;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={(e) => select(category, e.currentTarget)}
              className={`relative shrink-0 snap-center whitespace-nowrap rounded-lg px-3 py-2 transition-colors duration-300 focus-visible:-outline-offset-2 ${
                selected ? "text-bg" : "text-muted hover:text-ink"
              }`}
            >
              {selected && (
                <m.span
                  layoutId="project-filter-pill"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{category}</span>
            </button>
          );
        })}
      </m.div>
      <span aria-hidden="true" className={`${edge} left-1 rounded-l-lg bg-linear-to-r ${fade.start ? "opacity-100" : "opacity-0"}`} />
      <span aria-hidden="true" className={`${edge} right-1 rounded-r-lg bg-linear-to-l ${fade.end ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}

// Lifts the card and tilts it slightly toward the mouse (skipped for touch, pen and reduced motion)
function TiltCard({ children }) {
  const reduceMotion = useReducedMotionConfig();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 250, damping: 24, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [-4, 4]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [5, -5]), spring);

  const onPointerMove = (e) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - box.left) / box.width);
    py.set((e.clientY - box.top) / box.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <m.div
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="h-full"
    >
      {children}
    </m.div>
  );
}

function CardLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg px-3 py-2 font-mono text-xs text-ink transition-colors hover:border-accent/50 hover:text-accent dark:bg-surface-2"
    >
      {children}
    </a>
  );
}

function ProjectCard({ project }) {
  const { title, category, art, description, tech, github, live } = project;
  return (
    <TiltCard>
      {/* .card owns the border + hover glow; the transforms stay on TiltCard so they don't fight its CSS transition */}
      <article className="card group flex h-full flex-col p-2.5">
        <ProjectArt art={art} />

        <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{category}</p>
          <h3 className="mt-2.5 text-balance font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
            {/* Turning the text transparent reveals the gradient clipped behind it */}
            <span className="bg-linear-to-r from-accent to-blue bg-clip-text transition-colors duration-300 group-hover:text-transparent">
              {title}
            </span>
          </h3>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{description}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Tech used in ${title}`}>
            {tech.map((item) => (
              <li key={item} className="rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-[11px] text-ink/80 dark:bg-surface-2">
                {item}
              </li>
            ))}
          </ul>

          {(github || live) && (
            <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
              {github && (
                <CardLink href={github} label={`Source code for ${title}`}>
                  <GithubIcon className="size-4" />
                  Code
                </CardLink>
              )}
              {live && (
                <CardLink href={live} label={`Live demo of ${title}`}>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  Live demo
                </CardLink>
              )}
            </div>
          )}
        </div>
      </article>
    </TiltCard>
  );
}

export default function Projects() {
  const [active, setActive] = useState(ALL);
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "0px 0px -80px 0px" });
  const visible = active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I have"
      accent="built"
      accentClass="text-blue"
      intro="Hands-on builds across the delivery lifecycle: reusable Terraform modules, containerized microservices on Kubernetes, multi-stage CI/CD pipelines and Prometheus + Grafana monitoring."
      aside={<FilterTabs active={active} onChange={setActive} />}
    >
      {/* Announces the result of a filter change to screen readers */}
      <p className="sr-only" role="status">
        {`Showing ${visible.length} ${visible.length === 1 ? "project" : "projects"}${active === ALL ? "" : ` in ${active}`}`}
      </p>

      <ul ref={gridRef} className="relative grid gap-5 sm:gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <m.li
              key={project.title}
              layout="position"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              exit="exit"
              transition={{ layout: { duration: 0.5, ease } }}
              className="min-w-0"
            >
              <ProjectCard project={project} />
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </Section>
  );
}
