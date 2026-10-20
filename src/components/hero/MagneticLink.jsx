import { useEffect, useRef } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

const PULL = 6; // max px the link moves toward the pointer
const spring = { stiffness: 260, damping: 18, mass: 0.4 };

/*
  <a> that leans a few px toward the pointer and springs back on leave.
  Mouse/trackpad only and never with reduced motion; uses motion values, so no re-renders.
*/
export default function MagneticLink({ children, className = "", ...props }) {
  const enabled = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      enabled.current = fine.matches && !reduce.matches;
      if (!enabled.current) {
        x.set(0);
        y.set(0);
      }
    };
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, [x, y]);

  const onPointerMove = (e) => {
    if (!enabled.current || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    // -1..1 from the centre, scaled to the pull distance
    x.set(((e.clientX - r.left) / r.width - 0.5) * 2 * PULL);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 2 * PULL);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.a {...props} style={{ x: sx, y: sy }} onPointerMove={onPointerMove} onPointerLeave={reset} className={className}>
      {children}
    </m.a>
  );
}
