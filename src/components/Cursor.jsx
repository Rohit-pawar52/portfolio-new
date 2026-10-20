import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

// Elements that make the ring grow
const INTERACTIVE = "a, button, [role='button'], input, textarea, select, summary, label[for]";
const ringSpring = { stiffness: 380, damping: 30, mass: 0.5 };

/*
  Custom cursor for mouse/trackpad users: an accent dot that tracks the pointer exactly
  and a ring that follows with spring lag. Positions live in motion values, so moving
  the mouse never re-renders React. Touch devices and reduced-motion users keep the native cursor.
*/
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, ringSpring);
  const ringY = useSpring(y, ringSpring);

  // Turn on only for fine pointers without a reduced-motion preference (and follow changes)
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    let shown = false;

    const hide = () => {
      shown = false;
      setVisible(false);
    };
    const onMove = (e) => {
      if (e.pointerType === "touch") {
        hide();
        return;
      }
      x.set(e.clientX);
      y.set(e.clientY);
      if (!shown) {
        // Coming back into the window: place the ring under the pointer instead of flying in
        ringX.jump(e.clientX);
        ringY.jump(e.clientY);
        shown = true;
        setVisible(true);
      }
    };
    const onOver = (e) => setHovering(Boolean(e.target.closest?.(INTERACTIVE)));
    const onOut = (e) => !e.relatedTarget && hide(); // pointer left the window
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("blur", hide);
    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", hide);
    };
  }, [enabled, x, y, ringX, ringY]);

  if (!enabled) return null;

  return (
    <>
      <m.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.8 : hovering ? 1.55 : 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-none fixed top-0 left-0 z-90 -mt-4.5 -ml-4.5 size-9 rounded-full border transition-colors duration-300 ${
          hovering ? "border-accent bg-accent/10" : "border-blue/60 bg-transparent"
        }`}
      />
      <m.div
        aria-hidden="true"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed top-0 left-0 z-90 -mt-1 -ml-1 size-2 rounded-full bg-accent"
      />
    </>
  );
}
