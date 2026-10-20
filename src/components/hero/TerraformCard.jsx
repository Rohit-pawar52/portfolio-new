import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import WindowCard from "./WindowCard.jsx";

// `  key = value` with the "=" signs lined up, the way `terraform fmt` does it
const attr = (key, value, type = "s") => [
  ["p", "  "],
  ["i", key],
  ["p", `${" ".repeat(20 - key.length)}= `],
  [type, value],
];

// Decorative snippet. Token types: k keyword, s string, i identifier, p punctuation
const LINES = [
  [["k", "resource"], ["p", " "], ["s", '"azurerm_kubernetes_cluster"'], ["p", " "], ["s", '"aks"'], ["p", " {"]],
  attr("name", '"aks-platform"'),
  attr("location", "var.location", "i"),
  attr("resource_group_name", "var.resource_group", "i"),
  attr("dns_prefix", '"platform"'),
  [["p", "}"]],
];

const COLOR = { k: "text-coral", s: "text-accent", i: "text-blue", p: "text-muted" };
const TEXT = LINES.map((line) => line.map(([, text]) => text).join("")).join("\n");
const TOTAL = TEXT.length;

// Block caret drawn at the typing position without pushing the text around
function Caret() {
  return (
    <span className="relative">
      <span className="absolute inset-y-0 left-0 w-[0.6em] animate-blink bg-accent/70" />
    </span>
  );
}

export default function TerraformCard({ className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);

  // Type the snippet once, the first time the card is on screen
  useEffect(() => {
    if (!inView || reduce) return;
    let count = 0;
    let timer;
    const tick = () => {
      count += 1;
      // Runs of alignment spaces appear at once, as if the editor formatted them
      while (TEXT[count] === " " && TEXT[count + 1] === " ") count += 1;
      setTyped(count);
      if (count < TOTAL) timer = setTimeout(tick, TEXT[count - 1] === "\n" ? 130 : 12 + Math.random() * 24);
    };
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, [inView, reduce]);

  // Reduced motion: show the finished snippet straight away
  let left = reduce ? TOTAL : typed;
  let caretPlaced = false;

  const rows = LINES.map((tokens, row) => {
    const parts = tokens.map(([type, text], col) => {
      const visible = text.slice(0, Math.max(0, left));
      const caretHere = !caretPlaced && left >= 0 && left < text.length;
      if (caretHere) caretPlaced = true;
      left -= text.length;
      return (
        <span key={col} className={COLOR[type]}>
          {visible}
          {caretHere && <Caret />}
          {/* Untyped text stays in place (invisible) so the card never changes size */}
          <span className="invisible">{text.slice(visible.length)}</span>
        </span>
      );
    });
    const caretAtEnd = !caretPlaced && left === 0;
    if (caretAtEnd) caretPlaced = true;
    left -= 1; // the line break
    return (
      <span key={row} className="block">
        {parts}
        {caretAtEnd && <Caret />}
      </span>
    );
  });

  return (
    <WindowCard
      title="main.tf"
      badge={<span className="rounded border border-line px-1.5 py-px text-[0.85em] tracking-wider text-muted">HCL</span>}
      className={className}
    >
      <pre ref={ref} className="overflow-hidden px-3.5 py-3 leading-[1.75] whitespace-pre">
        <code>{rows}</code>
      </pre>
    </WindowCard>
  );
}
