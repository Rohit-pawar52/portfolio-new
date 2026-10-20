import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { Check, LoaderCircle } from "lucide-react";
import WindowCard from "./WindowCard.jsx";

const STAGES = ["Build", "Test", "Deploy"];
const STAGE_MS = 1100; // how long each stage "runs"
const REST_MS = 3200; // how long the finished run stays before it starts again

const pop = { type: "spring", stiffness: 520, damping: 22 };

function StageIcon({ state }) {
  return (
    <span className="grid size-4 shrink-0 place-items-center *:col-start-1 *:row-start-1">
      <AnimatePresence initial={false}>
        {state === "done" && (
          <m.span
            key="done"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={pop}
            className="grid size-4 place-items-center rounded-full bg-accent/15 text-accent"
          >
            <Check className="size-2.5" strokeWidth={3.5} />
          </m.span>
        )}
        {state === "running" && (
          <m.span key="running" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-amber">
            <LoaderCircle className="size-3.5 animate-spin" />
          </m.span>
        )}
        {state === "queued" && (
          <m.span
            key="queued"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="size-2 rounded-full border border-muted/50"
          />
        )}
      </AnimatePresence>
    </span>
  );
}

export default function PipelineCard({ className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0); // index of the running stage; STAGES.length means all passed

  // Loop the run while the card is on screen
  useEffect(() => {
    if (reduce || !inView) return;
    const finished = step >= STAGES.length;
    const timer = setTimeout(() => setStep(finished ? 0 : step + 1), finished ? REST_MS : STAGE_MS);
    return () => clearTimeout(timer);
  }, [step, inView, reduce]);

  const current = reduce ? STAGES.length : step;
  const passed = current >= STAGES.length;

  return (
    <WindowCard title="azure-pipelines.yml" className={className}>
      <div ref={ref} className="px-3.5 py-3 leading-[1.75] whitespace-pre">
        {/* Trigger lines drop on small screens to keep the card short */}
        <p className="max-md:hidden">
          <span className="text-blue">trigger</span>
          <span className="text-muted">:</span>
        </p>
        <p className="max-md:hidden">
          <span className="text-muted">  - </span>
          <span className="text-accent">main</span>
        </p>
        <p>
          <span className="text-blue">stages</span>
          <span className="text-muted">:</span>
        </p>
        {STAGES.map((name, i) => (
          <p key={name} className="flex items-center justify-between gap-4">
            <span>
              <span className="text-muted">  - </span>
              <span className="text-blue">stage</span>
              <span className="text-muted">: </span>
              <span className="text-ink">{name}</span>
            </span>
            <StageIcon state={i < current ? "done" : i === current ? "running" : "queued"} />
          </p>
        ))}
      </div>
      {/* Divider that fills up as stages pass */}
      <div className="h-px bg-line">
        <m.div
          initial={false}
          animate={{ scaleX: current / STAGES.length }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-full origin-left bg-linear-to-r from-accent to-blue"
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-3.5 py-2">
        {passed ? (
          // Outlined on the light theme so the text keeps 4.5:1 contrast; tinted fill on dark
          <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 px-2 py-0.5 text-accent dark:border-transparent dark:bg-accent/15">
            <Check className="size-2.5" strokeWidth={3.5} />
            passed
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/40 px-2 py-0.5 text-amber dark:border-transparent dark:bg-amber/15">
            <span className="size-1.5 animate-pulse rounded-full bg-amber" />
            running
          </span>
        )}
        <span className="text-muted">
          {current}/{STAGES.length} stages
        </span>
      </div>
    </WindowCard>
  );
}
