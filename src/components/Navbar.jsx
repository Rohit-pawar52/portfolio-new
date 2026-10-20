import { useEffect, useState } from "react";
import { AnimatePresence, m, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "../data/portfolio.js";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Add a border once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link for the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (id) =>
    `transition-colors hover:text-ink ${active === id ? "text-ink" : "text-muted"}`;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-bg/85 backdrop-blur-md transition-colors ${
        scrolled || open ? "border-line" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-ink font-display text-sm text-bg"
          >
            {profile.initials}
          </span>
          {profile.name}
        </a>

        <div className="flex items-center gap-2 md:gap-8">
          <ul className="hidden items-center gap-7 text-sm font-medium md:flex">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className={linkClass(id)} aria-current={active === id ? "true" : undefined}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-line md:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* reading progress */}
      <m.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent"
      />

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="flex flex-col px-5 py-3">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-base font-medium ${linkClass(id)}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
