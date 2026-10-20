import { ArrowUp, Mail } from "lucide-react";
import { contact, profile } from "../data/portfolio.js";
import { GithubIcon, LinkedinIcon } from "./icons.jsx";

export default function Footer() {
  const socials = [
    { label: "Email", href: `mailto:${contact.email}`, Icon: Mail },
    contact.linkedin && { label: "LinkedIn", href: contact.linkedin, Icon: LinkedinIcon, external: true },
    contact.github && { label: "GitHub", href: contact.github, Icon: GithubIcon, external: true },
  ].filter(Boolean);

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-10 text-sm text-muted sm:flex-row sm:justify-between sm:px-8">
        <div className="text-center sm:text-left">
          <p className="font-display text-base font-semibold text-ink">{profile.name}</p>
          <p className="mt-1">
            © {new Date().getFullYear()} · {profile.role}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {socials.map(({ label, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={external ? `${label} (opens in a new tab)` : label}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-ink/40 hover:text-ink"
            >
              <Icon className="size-4" aria-hidden="true" />
            </a>
          ))}
          <a
            href="#top"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2.5 font-medium transition-colors hover:border-ink/40 hover:text-ink"
          >
            Top <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
