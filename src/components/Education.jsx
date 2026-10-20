import { ArrowUpRight, Award, GraduationCap } from "lucide-react";
import { certifications, education } from "../data/portfolio.js";
import Section, { Reveal } from "./Section.jsx";

export default function Education() {
  return (
    <Section id="education" eyebrow="Education & Certifications" title="Learning & credentials">
      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
            <GraduationCap className="size-4 text-accent" aria-hidden="true" />
            Education
          </h3>
          <ul className="mt-5 space-y-4">
            {education.map((ed) => (
              <li key={ed.degree} className="rounded-2xl border border-line bg-surface p-6">
                <p className="font-display text-lg font-semibold leading-snug">{ed.degree}</p>
                <p className="mt-2 text-muted">{ed.institution}</p>
                <p className="mt-3 font-mono text-xs text-accent">Completed {ed.year}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
            <Award className="size-4 text-accent" aria-hidden="true" />
            Certifications
          </h3>
          <ul className="mt-5 space-y-4">
            {certifications.map((cert) => (
              <li key={cert.name} className="rounded-2xl border border-line bg-surface p-6">
                <p className="font-semibold leading-snug">{cert.name}</p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-sm text-muted">{cert.issuer}</p>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold hover:text-accent"
                    >
                      Verify <ArrowUpRight className="size-4" aria-hidden="true" />
                      <span className="sr-only">{cert.name} (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
