import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/portfolio.js";
import Section, { Reveal } from "./Section.jsx";
import { GithubIcon } from "./icons.jsx";

function ProjectLink({ href, label, title, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} for ${title} (opens in a new tab)`}
      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-accent"
    >
      {children}
    </a>
  );
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected work" className="bg-surface/60">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 0.08} className="h-full">
            <article className="group flex h-full flex-col rounded-2xl border border-line bg-bg p-6 transition-all hover:-translate-y-1 hover:border-ink/30 sm:p-7">
              <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-display text-xl font-semibold">{project.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{project.description}</p>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                {project.tech.map((t) => (
                  <li key={t} className="rounded-md bg-accent-soft px-2.5 py-1 font-mono text-xs text-ink">
                    {t}
                  </li>
                ))}
              </ul>

              {(project.github || project.live) && (
                <div className="mt-6 flex gap-5 border-t border-line pt-5">
                  {project.github && (
                    <ProjectLink href={project.github} label="Source code" title={project.title}>
                      <GithubIcon className="size-4" /> Code
                    </ProjectLink>
                  )}
                  {project.live && (
                    <ProjectLink href={project.live} label="Live demo" title={project.title}>
                      <ArrowUpRight className="size-4" aria-hidden="true" /> Live
                    </ProjectLink>
                  )}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
