import { useRef } from "react";
import { m, useInView, useReducedMotionConfig } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { contact, profile } from "../data/portfolio.js";

const ease = [0.22, 1, 0.36, 1];

// The big name's letters rise into place one after another, once, when the name scrolls into view
const nameVariants = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const letterVariants = {
  hidden: { opacity: 0, y: "0.45em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

// Footer links; null fields in data/portfolio.js are skipped
const links = [
  contact.linkedin && { label: "LinkedIn", href: contact.linkedin, external: true },
  contact.github && { label: "GitHub", href: contact.github, external: true },
  profile.resumeFile && { label: "Resume (PDF)", href: profile.resumeFile, external: true },
  contact.email && { label: "Email", href: `mailto:${contact.email}` },
].filter(Boolean);

export default function Footer() {
  const year = new Date().getFullYear();
  const nameRef = useRef(null);
  const reduceMotion = useReducedMotionConfig();
  // Watch the static name block (not the moving letters) so the reveal fires however the footer is reached
  const nameInView = useInView(nameRef, { once: true, amount: 0.3 });

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* Faint grid + glow from the bottom edge (teal in dark mode, a soft cream spill in light mode) */}
      <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-1/2 h-96 w-3xl max-w-full -translate-x-1/2 rounded-full bg-surface blur-3xl dark:bg-accent/15"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8 sm:pt-28">
        <p
          ref={nameRef}
          className="font-display text-[clamp(2.75rem,12vw,9.5rem)] font-bold leading-[0.95] tracking-tighter text-ink"
        >
          <span className="sr-only">{profile.name}</span>
          {/* Solid letters under a static mask fade (bottom stays at 65% so it keeps > 4.5:1 contrast).
              A mask on the wrapper survives the letter animation, unlike bg-clip-text on each letter. */}
          <m.span
            aria-hidden="true"
            className="flex flex-wrap gap-x-[0.22em] gap-y-[0.06em] mask-[linear-gradient(to_bottom,black_35%,rgb(0_0_0/0.65))]"
            variants={nameVariants}
            initial={reduceMotion ? "show" : "hidden"}
            animate={nameInView || reduceMotion ? "show" : "hidden"}
          >
            {profile.name.split(" ").map((word, w) => (
              <span key={w} className="inline-flex">
                {[...word].map((letter, i) => (
                  <m.span key={i} variants={letterVariants} className="inline-block pb-[0.06em]">
                    {letter}
                  </m.span>
                ))}
              </span>
            ))}
          </m.span>
        </p>
        <p className="mt-5 font-mono text-sm text-muted sm:text-base">
          {profile.role} <span className="text-accent">/</span> {profile.roleAccent}
        </p>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted">
            © {year} {profile.name}. All rights reserved.
          </p>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs">
              {links.map(({ label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-muted transition-colors hover:text-ink"
                  >
                    {label}
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#top" className="group inline-flex items-center gap-2 self-start font-mono text-xs text-accent md:self-auto">
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
