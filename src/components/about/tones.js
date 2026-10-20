// Colour lookup for the "color" values used in data/portfolio.js
// (accent | blue | amber | coral). Shared by About and Experience.
// Tailwind only generates classes it can see written out in full, so every
// tone lists its complete class names here instead of building strings.
export const tones = {
  accent: {
    css: "var(--c-accent)",
    text: "text-accent",
    bg: "bg-accent",
    soft: "bg-accent/10",
    ring: "ring-accent/25",
    borderL: "border-l-accent",
    hoverBorder: "hover:border-accent/40",
    shadow: "shadow-accent/10",
    hoverShadow: "hover:shadow-accent/20",
    groupHoverBorder: "group-hover:border-accent/50",
  },
  blue: {
    css: "var(--c-blue)",
    text: "text-blue",
    bg: "bg-blue",
    soft: "bg-blue/10",
    ring: "ring-blue/25",
    borderL: "border-l-blue",
    hoverBorder: "hover:border-blue/40",
    shadow: "shadow-blue/10",
    hoverShadow: "hover:shadow-blue/20",
    groupHoverBorder: "group-hover:border-blue/50",
  },
  amber: {
    css: "var(--c-amber)",
    text: "text-amber",
    bg: "bg-amber",
    soft: "bg-amber/10",
    ring: "ring-amber/25",
    borderL: "border-l-amber",
    hoverBorder: "hover:border-amber/40",
    shadow: "shadow-amber/10",
    hoverShadow: "hover:shadow-amber/20",
    groupHoverBorder: "group-hover:border-amber/50",
  },
  coral: {
    css: "var(--c-coral)",
    text: "text-coral",
    bg: "bg-coral",
    soft: "bg-coral/10",
    ring: "ring-coral/25",
    borderL: "border-l-coral",
    hoverBorder: "hover:border-coral/40",
    shadow: "shadow-coral/10",
    hoverShadow: "hover:shadow-coral/20",
    groupHoverBorder: "group-hover:border-coral/50",
  },
};

// Unknown or missing colours fall back to the teal accent
export const toneOf = (color) => tones[color] ?? tones.accent;
