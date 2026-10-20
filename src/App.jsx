import { startTransition, useEffect, useState } from "react";
import { LazyMotion, MotionConfig, domMax } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Cursor from "./components/Cursor.jsx";

export default function App() {
  // Below-the-fold sections mount right after the first paint, in small time-sliced chunks,
  // so the hero appears fast on slower phones.
  const [showRest, setShowRest] = useState(false);
  useEffect(() => {
    startTransition(() => setShowRest(true));
  }, []);

  // Opened with a link like /#contact? Jump there once that section exists.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (showRest && id) document.getElementById(id)?.scrollIntoView();
  }, [showRest]);

  return (
    // LazyMotion + domMax: enables layout animations (layoutId, accordion height) for m.* components.
    // reducedMotion="user" turns animations off for visitors who ask their OS for less motion.
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <div className="noise">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
          >
            Skip to content
          </a>
          <Cursor />
          <Navbar />
          <main id="main">
            <Hero />
            <Marquee />
            {showRest && (
              <>
                <About />
                <Experience />
                <Projects />
                <Skills />
                <Education />
                <Contact />
              </>
            )}
          </main>
          {showRest && <Footer />}
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
