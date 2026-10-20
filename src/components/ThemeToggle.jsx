import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Moon, Sun } from "lucide-react";

// Browser UI colour for each theme (same values as --c-bg in index.css)
const THEME_COLOR = { dark: "#0D0D0E", light: "#F5EFE3" };

const isDarkNow = () => document.documentElement.classList.contains("dark");

export default function ThemeToggle({ className = "" }) {
  // Dark is the default; index.html removes the class before first paint when "light" was saved
  const [dark, setDark] = useState(isDarkNow);

  // Keep the browser UI colour in sync (also corrects it on load for a saved light theme)
  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? THEME_COLOR.dark : THEME_COLOR.light);
  }, [dark]);

  // Follow class changes made elsewhere (e.g. a second toggle on the page)
  useEffect(() => {
    const observer = new MutationObserver(() => setDark(isDarkNow()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const next = !isDarkNow();
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Storage can be blocked (private mode); the toggle still works for this visit
    }
    const apply = () => {
      document.documentElement.classList.toggle("dark", next);
      setDark(next);
    };
    // Cross-fade the whole page where the View Transitions API exists, unless motion is reduced
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduce) document.startViewTransition(apply);
    else apply();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={`grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-surface/60 text-ink transition-colors hover:border-accent/50 hover:text-accent ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={dark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid place-items-center"
        >
          {dark ? <Sun className="size-4.5" aria-hidden="true" /> : <Moon className="size-4.5" aria-hidden="true" />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
