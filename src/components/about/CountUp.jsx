import { useEffect, useMemo, useRef } from "react";
import { animate, m, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

// Digits after the decimal point, so 2.5 counts 0.0 → 2.5 instead of rounding to 3
const decimalsOf = (n) => (String(n).split(".")[1] ?? "").length;

// Counts up from 0 the first time it scrolls into view. The number is written
// through a motion value, so React does not re-render on every frame.
function AnimatedNumber({ value, duration }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const count = useMotionValue(reduce ? value : 0);

  const format = useMemo(() => {
    const digits = decimalsOf(value);
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }, [value]);
  const text = useTransform(count, (v) => format.format(v));

  useEffect(() => {
    // Reduced motion: show the final number straight away
    if (reduce) {
      count.set(value);
      return;
    }
    if (!inView) return;
    const controls = animate(count, value, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [count, duration, inView, reduce, value]);

  return <m.span ref={ref}>{text}</m.span>;
}

export default function CountUp({ value, duration = 1.6 }) {
  // Anything that is not a plain number (e.g. "24/7") is shown as it is
  if (typeof value !== "number" || !Number.isFinite(value)) return <span>{value}</span>;
  return <AnimatedNumber value={value} duration={duration} />;
}
