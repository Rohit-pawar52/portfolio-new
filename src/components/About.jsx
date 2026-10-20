import { about } from "../data/portfolio.js";
import Section, { Reveal } from "./Section.jsx";

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Secure, scalable, automated cloud infrastructure">
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="grid gap-4">
            {about.highlights.map(({ value, label }) => (
              <li key={label} className="rounded-2xl border border-line bg-surface p-5">
                <span className="block font-display text-3xl font-semibold">{value}</span>
                <span className="mt-1 block text-sm text-muted">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
