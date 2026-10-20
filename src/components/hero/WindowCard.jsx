// Editor-style window frame for the decorative floating cards in the hero.
// The cards only illustrate the stack, so they are hidden from screen readers.
export default function WindowCard({ title, badge, children, className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-xl border border-line bg-surface/95 font-mono shadow-2xl shadow-black/10 backdrop-blur-md dark:bg-surface/90 dark:shadow-black/40 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/50 px-3 py-2 dark:bg-surface-2/70">
        <span className="flex shrink-0 gap-1.5">
          <span className="size-2 rounded-full bg-coral/80" />
          <span className="size-2 rounded-full bg-amber/80" />
          <span className="size-2 rounded-full bg-accent/80" />
        </span>
        <span className="ml-1 truncate text-muted">{title}</span>
        {badge && <span className="ml-auto shrink-0">{badge}</span>}
      </div>
      {children}
    </div>
  );
}
