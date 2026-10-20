import { ArrowUpRight, Download, Mail, MapPin, Phone } from "lucide-react";
import { contact, profile } from "../data/portfolio.js";
import Section, { Reveal } from "./Section.jsx";
import { GithubIcon, LinkedinIcon } from "./icons.jsx";

const stripProtocol = (url) => url.replace(/^https?:\/\/(www\.)?/, "");

// Lets long emails/URLs wrap at "@" and "/" on narrow screens instead of mid-word
const softBreak = (text) =>
  text.split(/(?=@)|(?<=\/)/).flatMap((part, i) => (i ? [<wbr key={i} />, part] : [part]));

export default function Contact() {
  const items = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, Icon: Mail },
    { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}`, Icon: Phone },
    contact.linkedin && {
      label: "LinkedIn",
      value: stripProtocol(contact.linkedin),
      href: contact.linkedin,
      Icon: LinkedinIcon,
      external: true,
    },
    contact.github && {
      label: "GitHub",
      value: stripProtocol(contact.github),
      href: contact.github,
      Icon: GithubIcon,
      external: true,
    },
  ].filter(Boolean);

  return (
    <Section id="contact" eyebrow="Contact" title="Let's work together">
      <Reveal>
        {/* Inverted panel: dark on the cream theme, cream on the dark theme */}
        <div className="relative overflow-hidden rounded-4xl bg-ink p-6 text-bg sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-accent opacity-25 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div>
              <p className="max-w-md font-display text-2xl font-medium leading-snug sm:text-3xl">
                Have a role, project or question in mind? I'd be glad to hear from you.
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm text-bg/70">
                <MapPin className="size-4" aria-hidden="true" /> {profile.location}, India
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-bg px-5 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                >
                  <Mail className="size-4" aria-hidden="true" /> Email me
                </a>
                <a
                  href={profile.resumeFile}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-bg/25 px-5 py-3 text-sm font-semibold transition-colors hover:border-bg/60"
                >
                  <Download className="size-4" aria-hidden="true" /> Resume
                </a>
              </div>
            </div>

            <ul className="grid grid-cols-1 gap-3">
              {items.map(({ label, value, href, Icon, external }) => (
                <li key={label} className="min-w-0">
                  <a
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="group flex items-center gap-3 rounded-2xl border border-bg/15 bg-bg/5 p-3.5 sm:gap-4 sm:p-4 transition-colors hover:border-bg/40 hover:bg-bg/10"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-bg/10 sm:size-11">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-bg/60">{label}</span>
                      <span className="mt-0.5 block text-[15px] font-medium wrap-break-word">{softBreak(value)}</span>
                    </span>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-bg/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bg"
                      aria-hidden="true"
                    />
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
