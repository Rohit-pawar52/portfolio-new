import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useScroll, useSpring } from "framer-motion";
import { FileText } from "lucide-react";
import { navLinks, profile } from "../data/portfolio.js";
import ThemeToggle from "./ThemeToggle.jsx";

const ease = [0.22, 1, 0.36, 1];

// Mobile menu links slide in one after another
const menuList = { hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } } };
const menuItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const headerRef = useRef(null);
  const buttonRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  // Highlight the link for the section crossing the middle of the screen (none while the hero is there)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === "top" ? "" : e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    // Sections below the hero mount a moment after first paint (see App.jsx), so keep
    // watching the page until every section exists, then stop.
    const pending = new Set(["top", ...navLinks.map((l) => l.id)]);
    const observeReady = () => {
      pending.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
          pending.delete(id);
        }
      });
      if (!pending.size) mutations.disconnect();
    };
    const mutations = new MutationObserver(observeReady);
    mutations.observe(document.body, { childList: true, subtree: true });
    observeReady();

    // The last section can be too short to reach the middle, so mark it once the page bottom is reached
    const last = navLinks[navLinks.length - 1]?.id;
    const onScroll = () => {
      const { scrollHeight } = document.documentElement;
      if (last && window.innerHeight + window.scrollY >= scrollHeight - 4) setActive(last);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // While the menu is open: Escape, a click outside, or growing to desktop width closes it
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (e) => {
      if (!headerRef.current?.contains(e.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = (e) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl">
      {/* Reading progress */}
      <m.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-linear-to-r from-accent via-blue to-coral"
      />

      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr]"
      >
        <a href="#top" className="group flex items-center gap-3 justify-self-start">
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-lg border border-line bg-surface font-mono text-[13px] font-semibold text-accent transition-colors group-hover:border-accent/60"
          >
            {profile.initials}
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink">{profile.name}</span>
          <span className="sr-only">, back to top</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block px-3 py-2 font-mono text-[13px] transition-colors hover:text-ink ${
                    isActive ? "text-ink" : "text-muted"
                  }`}
                >
                  {label}
                  {isActive && (
                    <m.span
                      layoutId="nav-underline"
                      aria-hidden="true"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-linear-to-r from-accent to-blue"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 justify-self-end">
          <a
            href={profile.resumeFile}
            download
            className="hidden h-10 items-center gap-2 rounded-lg border border-line bg-surface/60 px-3.5 font-mono text-[13px] text-ink transition-colors hover:border-accent/50 hover:text-accent md:inline-flex"
          >
            <FileText className="size-4" aria-hidden="true" />
            Resume
            <span className="sr-only">(PDF)</span>
          </a>
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Main menu"
            className="grid size-10 place-items-center rounded-lg border border-line bg-surface/60 text-ink transition-colors hover:border-accent/50 lg:hidden"
          >
            {/* Two lines that cross into an X */}
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <m.span
                initial={false}
                animate={open ? { y: 4, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.3, ease }}
                className="absolute inset-x-0 top-0 h-0.5 rounded-full bg-current"
              />
              <m.span
                initial={false}
                animate={open ? { y: -4, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.3, ease }}
                className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-current"
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="absolute inset-x-0 top-full overflow-hidden border-b border-line bg-bg shadow-2xl shadow-black/30 lg:hidden"
          >
            <m.ul variants={menuList} initial="hidden" animate="show" className="mx-auto max-w-7xl px-5 pt-2 sm:px-8">
              {navLinks.map(({ id, label }, i) => {
                const isActive = active === id;
                return (
                  <m.li key={id} variants={menuItem}>
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center gap-4 border-b border-line/60 py-3.5 font-mono text-[15px] transition-colors hover:text-ink ${
                        isActive ? "text-ink" : "text-muted"
                      }`}
                    >
                      <span aria-hidden="true" className="text-xs text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {label}
                      {isActive && <span aria-hidden="true" className="ml-auto size-1.5 rounded-full bg-accent" />}
                    </a>
                  </m.li>
                );
              })}
              <m.li variants={menuItem} className="py-5">
                <a
                  href={profile.resumeFile}
                  download
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-ink font-mono text-sm font-medium text-bg transition-opacity hover:opacity-90"
                >
                  <FileText className="size-4" aria-hidden="true" />
                  Download Resume
                  <span className="sr-only">(PDF)</span>
                </a>
              </m.li>
            </m.ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
