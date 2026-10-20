import { useEffect, useId, useRef } from "react";
import { useInView, useReducedMotionConfig } from "framer-motion";

// Decorative, animated illustrations for the project cards (one per `art` key in data/portfolio.js).
// Shapes use currentColor + theme classes, so they follow the light and dark themes automatically.
// Animations are SVG SMIL: skipped for reduced motion and paused while the card is off-screen.

const pt = (x, y) => `${+x.toFixed(1)},${+y.toFixed(1)}`;

/* ---------- "modules": isometric Terraform modules orbited by a dot (teal) ---------- */

const S = 34; // cube edge in px
const A = S * Math.cos(Math.PI / 6); // half width of a cube's top face
const B = S / 2; // half height of a cube's top face
const iso = ([x, y, z]) => pt(160 + (x - y) * A, 92 + (x + y) * B - z * S);
const poly = (...corners) => corners.map(iso).join(" ");

// Silhouette + the three visible faces of a unit cube whose back-bottom corner is (x, y, z)
function cube(x, y, z) {
  const [t0, t1, t2, t3] = [[x, y, z + 1], [x + 1, y, z + 1], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]];
  const [b1, b2, b3] = [[x + 1, y, z], [x + 1, y + 1, z], [x, y + 1, z]];
  return {
    shape: poly(t0, t1, b1, b2, b3, t3),
    top: poly(t0, t1, t2, t3),
    right: poly(t1, t2, b2, b1),
    left: poly(t3, t2, b2, b3),
  };
}

// Four modules on the floor, listed back to front so nearer cubes overlap farther ones
const BASE_CUBES = [[0, 0, 0], [1.3, 0, 0], [0, 1.3, 0], [1.3, 1.3, 0]].map((p) => cube(...p));
const TOP_CUBE = cube(0.65, 0.65, 1.6);

// The orbit is a circle on the floor around the stack, which isometric turns into an ellipse
const RING = { cx: 160, cy: 92 + 2.3 * B, rx: 2 * Math.SQRT2 * A, ry: 2 * Math.SQRT2 * B };
const ORBIT_START = pt(RING.cx + RING.rx, RING.cy);
const ORBIT_RADII = pt(RING.rx, RING.ry);
const ORBIT = `M${ORBIT_START} A${ORBIT_RADII} 0 1 1 ${pt(RING.cx - RING.rx, RING.cy)} A${ORBIT_RADII} 0 1 1 ${ORBIT_START}`;
const DOT_REST = pt(RING.cx + RING.rx * Math.cos((5 * Math.PI) / 6), RING.cy + RING.ry * Math.sin((5 * Math.PI) / 6));

function Cube({ shape, top, right, left, highlight = false, animate = false }) {
  return (
    <g stroke="currentColor" strokeOpacity="0.9" strokeWidth="1.2" strokeLinejoin="round">
      <polygon points={shape} className="fill-surface dark:fill-surface-2" stroke="none" />
      <polygon points={left} fill="currentColor" fillOpacity={highlight ? 0.2 : 0.08} />
      <polygon points={right} fill="currentColor" fillOpacity={highlight ? 0.32 : 0.16} />
      <polygon points={top} fill="currentColor" fillOpacity={highlight ? 0.5 : 0.28}>
        {highlight && animate && (
          <animate attributeName="fill-opacity" values="0.35;0.65;0.35" dur="4.5s" repeatCount="indefinite" />
        )}
      </polygon>
    </g>
  );
}

function ModulesArt({ animate }) {
  const { cx, cy, rx, ry } = RING;
  return (
    <>
      {/* Floor glow + dashed orbit, drawn first so the cubes hide the back half of the ring */}
      <ellipse cx={cx} cy={cy} rx={rx * 0.8} ry={ry * 0.8} fill="currentColor" fillOpacity="0.07" />
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="1.3"
        strokeDasharray="2 7"
        strokeLinecap="round"
      >
        {animate && <animate attributeName="stroke-dashoffset" values="0;-18" dur="2s" repeatCount="indefinite" />}
      </ellipse>
      <g transform={animate ? undefined : `translate(${DOT_REST})`}>
        <circle r="8" fill="currentColor" fillOpacity="0.2" />
        <circle r="3.2" fill="currentColor" />
        {animate && <animateMotion dur="9s" repeatCount="indefinite" path={ORBIT} />}
      </g>

      {BASE_CUBES.map((c, i) => (
        <Cube key={i} {...c} />
      ))}

      {/* The module being "applied" floats above the stack */}
      <g>
        {animate && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0;0 -6;0 0"
            dur="4.5s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
          />
        )}
        <Cube {...TOP_CUBE} highlight animate={animate} />
      </g>
    </>
  );
}

/* ---------- "containers": pods wired to a pulsing control node (amber) ---------- */

const PODS = [0, 60, 120, 180, 240, 300].map((deg) => {
  const a = (deg * Math.PI) / 180;
  return { x: +(160 + 100 * Math.cos(a)).toFixed(1), y: +(100 + 58 * Math.sin(a)).toFixed(1) };
});
const hexagon = (cx, cy, r) =>
  [0, 1, 2, 3, 4, 5]
    .map((i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return pt(cx + r * Math.cos(a), cy + r * Math.sin(a));
    })
    .join(" ");

function ContainersArt({ animate }) {
  return (
    <>
      {/* Cluster boundary */}
      <rect x="20" y="16" width="280" height="168" rx="18" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="4 6" />
      <text x="34" y="32" fontSize="8" letterSpacing="0.5" className="fill-muted font-mono">
        cluster
      </text>
      <polygon points={PODS.map((p) => pt(p.x, p.y)).join(" ")} fill="none" stroke="currentColor" strokeOpacity="0.16" />

      {/* Spokes with traffic flowing out from the centre */}
      <g stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="3 5" strokeLinecap="round">
        {animate && <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.2s" repeatCount="indefinite" />}
        {PODS.map((p) => (
          <line key={`${p.x}-${p.y}`} x1="160" y1="100" x2={p.x} y2={p.y} />
        ))}
      </g>

      {animate &&
        [0, 1.4].map((begin) => (
          <circle key={begin} cx="160" cy="100" r="22" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0">
            <animate attributeName="r" values="22;52" dur="2.8s" begin={`${begin}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0" dur="2.8s" begin={`${begin}s`} repeatCount="indefinite" />
          </circle>
        ))}

      {/* Pods: two containers each + a blinking health dot */}
      {PODS.map((p, i) => (
        <g key={`${p.x}-${p.y}`}>
          <rect
            x={p.x - 22}
            y={p.y - 15}
            width="44"
            height="30"
            rx="7"
            className="fill-surface dark:fill-surface-2"
            stroke="currentColor"
            strokeOpacity="0.75"
            strokeWidth="1.2"
          />
          <rect x={p.x - 13} y={p.y - 5} width="10" height="10" rx="2" fill="currentColor" fillOpacity="0.45" />
          <rect x={p.x + 3} y={p.y - 5} width="10" height="10" rx="2" fill="currentColor" fillOpacity={i % 2 ? 0.45 : 0.22} />
          <circle cx={p.x + 16} cy={p.y - 9.5} r="2" fill="currentColor">
            {animate && (
              <animate attributeName="opacity" values="1;0.25;1" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            )}
          </circle>
        </g>
      ))}

      {/* Control node */}
      <polygon points={hexagon(160, 100, 22)} className="fill-surface dark:fill-surface-2" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points={hexagon(160, 100, 12)} fill="currentColor" fillOpacity="0.3" />
      <circle cx="160" cy="100" r="4.5" fill="currentColor" />
    </>
  );
}

/* ---------- "pipeline": Build → Test → Deploy with a travelling dot (blue) ---------- */

const TRACK = "M30,100 H292";
const LOOP = "5s";
const TRAVEL = 0.8; // share of each loop the dot spends crossing the track
const STAGES = [
  { x: 104, label: "Build", glyph: "M-4,-6 L-9,0 L-4,6 M4,-6 L9,0 L4,6" },
  { x: 176, label: "Test", glyph: "M-7,0.5 L-2.5,5 L7,-5" },
  { x: 248, label: "Deploy", glyph: "M0,5 V-7 M-5,-2 L0,-7 L5,-2 M-7,3 V7 H7 V3" },
];
// A stage lights up when the dot reaches it, stays "done", then resets for the next run
const stageKeyTimes = (x) => {
  const t = (TRAVEL * (x - 30)) / 262;
  return [0, t - 0.03, t + 0.02, t + 0.1, 0.9, 1].map((n) => +n.toFixed(3)).join(";");
};

function PipelineArt({ animate }) {
  return (
    <>
      {/* Feature branch merging into main, then the track */}
      <path d="M30,62 C56,62 52,100 80,100" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d={TRACK} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path
        d={TRACK}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        pathLength="100"
        strokeDasharray="100 100"
        strokeDashoffset={animate ? 100 : 0}
      >
        {animate && (
          <>
            <animate attributeName="stroke-dashoffset" values="100;0;0" keyTimes={`0;${TRAVEL};1`} dur={LOOP} repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.88;1" dur={LOOP} repeatCount="indefinite" />
          </>
        )}
      </path>
      {[62, 100].map((y) => (
        <circle key={y} cx="30" cy={y} r="4" className="fill-surface dark:fill-surface-2" stroke="currentColor" strokeWidth="1.5" />
      ))}

      {/* Drawn before the stages, so the dot slips "inside" each one as it passes */}
      {animate && (
        <g>
          <circle r="8" fill="currentColor" fillOpacity="0.25" />
          <circle r="3.5" fill="currentColor" />
          <animateMotion
            path={TRACK}
            dur={LOOP}
            keyPoints="0;1;1"
            keyTimes={`0;${TRAVEL};1`}
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.04;0.76;0.8;1" dur={LOOP} repeatCount="indefinite" />
        </g>
      )}

      {STAGES.map(({ x, label, glyph }) => (
        <g key={label}>
          <circle cx={x} cy="100" r="20" className="fill-surface dark:fill-surface-2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx={x} cy="100" r="20" fill="currentColor" fillOpacity="0.22">
            {animate && (
              <animate
                attributeName="fill-opacity"
                values="0.06;0.06;0.5;0.22;0.22;0.06"
                keyTimes={stageKeyTimes(x)}
                dur={LOOP}
                repeatCount="indefinite"
              />
            )}
          </circle>
          <path
            d={glyph}
            transform={`translate(${x},100)`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x={x} y="138" textAnchor="middle" fontSize="9.5" className="fill-muted font-mono">
            {label}
          </text>
        </g>
      ))}

      {/* Release target, pings when the dot arrives */}
      {animate && (
        <circle cx="292" cy="100" r="8" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0">
          <animate attributeName="r" values="8;8;20;20" keyTimes={`0;${TRAVEL};0.97;1`} dur={LOOP} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0;0.7;0;0" keyTimes="0;0.79;0.8;0.97;1" dur={LOOP} repeatCount="indefinite" />
        </circle>
      )}
      <circle cx="292" cy="100" r="8" className="fill-surface dark:fill-surface-2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="292" cy="100" r="3.5" fill="currentColor" />
    </>
  );
}

/* ---------- "monitoring": dashboard chart that draws in and fires an alert (coral) ---------- */

const SERIES = [[40, 148], [64, 138], [88, 143], [112, 124], [136, 131], [160, 112], [184, 119], [208, 72], [232, 110], [256, 100], [280, 106]];
const PEAK = SERIES[7];
// Smooth line through the points (Catmull-Rom converted to cubic Béziers)
const LINE = SERIES.reduce((d, p, i, all) => {
  if (i === 0) return `M${pt(...p)}`;
  const p0 = all[i - 2] ?? all[i - 1];
  const p1 = all[i - 1];
  const p3 = all[i + 1] ?? p;
  const c1 = pt(p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6);
  const c2 = pt(p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6);
  return `${d} C${c1} ${c2} ${pt(...p)}`;
}, "");
const AREA = `${LINE} L280,164 L40,164 Z`;
const CHART_LOOP = "7s";

function MonitoringArt({ animate }) {
  const gradientId = `chart-fill-${useId().replace(/[^\w-]/g, "")}`;
  // Each loop: the line draws in, the area fades in, the alert fires at the spike, then all fade out
  const loop = (attributeName, values, keyTimes) =>
    animate && <animate attributeName={attributeName} values={values} keyTimes={keyTimes} dur={CHART_LOOP} repeatCount="indefinite" />;

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Dashboard panel + header */}
      <rect x="24" y="20" width="272" height="160" rx="12" className="fill-surface" fillOpacity="0.6" stroke="currentColor" strokeOpacity="0.2" />
      {[40, 49, 58].map((x) => (
        <circle key={x} cx={x} cy="33" r="2.5" className="fill-muted" fillOpacity="0.45" />
      ))}
      <text x="70" y="36" fontSize="8.5" className="fill-muted font-mono">
        metrics
      </text>
      <circle cx="263" cy="33" r="2.5" fill="currentColor">
        {animate && <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />}
      </circle>
      <text x="269" y="36" fontSize="8" className="fill-muted font-mono">
        live
      </text>
      <line x1="24" y1="45" x2="296" y2="45" stroke="currentColor" strokeOpacity="0.2" />

      {/* Grid + alert threshold */}
      <g className="stroke-muted" strokeOpacity="0.22" strokeDasharray="2 4">
        {[76, 104, 132, 160].map((y) => (
          <line key={y} x1="40" y1={y} x2="280" y2={y} />
        ))}
      </g>
      <line x1="40" y1="84" x2="280" y2="84" stroke="currentColor" strokeOpacity="0.6" strokeDasharray="5 4" />

      <path d={AREA} fill={`url(#${gradientId})`} opacity={animate ? 0 : 1}>
        {loop("opacity", "0;0;1;1;0;0", "0;0.42;0.56;0.86;0.95;1")}
      </path>
      <path
        d={LINE}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1 1"
        strokeDashoffset={animate ? 1 : 0}
      >
        {loop("stroke-dashoffset", "1;0;0", "0;0.45;1")}
        {loop("opacity", "1;1;0;0", "0;0.86;0.95;1")}
      </path>

      {/* Alert ping at the spike */}
      <g opacity={animate ? 0 : 1}>
        {loop("opacity", "0;0;1;1;0;0", "0;0.3;0.33;0.86;0.95;1")}
        <circle cx={PEAK[0]} cy={PEAK[1]} r={animate ? 4 : 10} fill="none" stroke="currentColor" strokeWidth="1.2" opacity={animate ? 1 : 0.35}>
          {animate && (
            <>
              <animate attributeName="r" values="4;16" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0" dur="1.4s" repeatCount="indefinite" />
            </>
          )}
        </circle>
        <circle cx={PEAK[0]} cy={PEAK[1]} r="3.5" fill="currentColor" />
        <rect x="216" y="56" width="40" height="14" rx="7" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.5" />
        <text x="236" y="65.5" textAnchor="middle" fontSize="7.5" fontWeight="600" letterSpacing="0.6" fill="currentColor" className="font-mono">
          ALERT
        </text>
      </g>
    </>
  );
}

/* ---------- Panel ---------- */

const ARTS = { modules: ModulesArt, containers: ContainersArt, pipeline: PipelineArt, monitoring: MonitoringArt };

// Static class names per art so Tailwind can see them
const TONES = {
  modules: { text: "text-accent", glow: "bg-accent" },
  containers: { text: "text-amber", glow: "bg-amber" },
  pipeline: { text: "text-blue", glow: "bg-blue" },
  monitoring: { text: "text-coral", glow: "bg-coral" },
};

export default function ProjectArt({ art }) {
  const Art = ARTS[art] ?? ModulesArt;
  const tone = TONES[art] ?? TONES.modules;
  const reduceMotion = useReducedMotionConfig(); // follows <MotionConfig reducedMotion> in App
  const panelRef = useRef(null);
  const svgRef = useRef(null);
  const inView = useInView(panelRef, { margin: "120px 0px" });

  // Pause the SVG's animations while the panel is off-screen to save CPU
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg?.pauseAnimations) return;
    if (inView) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [inView]);

  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      className="relative aspect-16/10 overflow-hidden rounded-[0.65rem] border border-line bg-linear-to-br from-surface via-surface to-surface-2 dark:from-surface-2 dark:via-surface dark:to-bg"
    >
      {/* Light (cream) theme: brighter panel, slightly stronger glow, softer grid */}
      <div className="bg-grid mask-radial absolute inset-0 opacity-50 dark:opacity-60" style={{ backgroundSize: "28px 28px" }} />
      <div
        className={`absolute left-1/2 top-1/2 h-2/3 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40 dark:opacity-20 dark:group-hover:opacity-35 ${tone.glow}`}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 320 200"
        className={`absolute inset-0 size-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-104 ${tone.text}`}
      >
        <Art animate={!reduceMotion} />
      </svg>
    </div>
  );
}
