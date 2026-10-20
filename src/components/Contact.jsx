import { Fragment, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  ArrowUpRight,
  AtSign,
  Check,
  CircleAlert,
  CircleCheck,
  Copy,
  Download,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { contact, profile } from "../data/portfolio.js";
import Section, { Reveal } from "./Section.jsx";
import { GithubIcon, LinkedinIcon } from "./icons.jsx";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const stripProtocol = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

// Lets long emails/URLs wrap after "@" and "/" on narrow screens instead of mid-word
const softBreak = (text) =>
  text.split(/([@/])/).map((part, i) => (
    <Fragment key={i}>
      {part}
      {i % 2 === 1 && <wbr />}
    </Fragment>
  ));

// Direct channels; null fields in data/portfolio.js are skipped
const channels = [
  contact.email && {
    key: "email",
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    copyLabel: "Copy email address",
    openLabel: `Send an email to ${contact.email}`,
    Icon: Mail,
    tile: "bg-accent/10 text-accent",
  },
  contact.linkedin && {
    key: "linkedin",
    label: "LinkedIn",
    value: stripProtocol(contact.linkedin),
    copy: contact.linkedin,
    href: contact.linkedin,
    copyLabel: "Copy LinkedIn profile URL",
    openLabel: "Open LinkedIn profile",
    Icon: LinkedinIcon,
    tile: "bg-blue/10 text-blue",
    external: true,
  },
  contact.phone && {
    key: "phone",
    label: "Phone",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
    copyLabel: "Copy phone number",
    openLabel: `Call ${contact.phone}`,
    Icon: Phone,
    tile: "bg-amber/10 text-amber",
  },
  contact.github && {
    key: "github",
    label: "GitHub",
    value: stripProtocol(contact.github),
    copy: contact.github,
    href: contact.github,
    copyLabel: "Copy GitHub profile URL",
    openLabel: "Open GitHub profile",
    Icon: GithubIcon,
    tile: "bg-coral/10 text-coral",
    external: true,
  },
].filter(Boolean);

const statusTone = {
  error: { className: "text-coral", Icon: CircleAlert },
  success: { className: "text-accent", Icon: CircleCheck },
};

// Placeholder at muted/80 keeps >= 3:1 on both themes' field backgrounds
const fieldClass =
  "block w-full rounded-xl border bg-bg px-4 py-3 text-[15px] text-ink placeholder:text-muted/80 transition-[border-color,box-shadow] duration-200 focus:border-accent focus:outline-hidden focus:ring-4 focus:ring-accent/15 dark:bg-surface-2";

// Secondary buttons: cream in light mode, raised surface in dark mode
const softButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-bg text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-accent/50 dark:bg-surface-2";

const iconButton =
  "grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-accent/50 hover:text-accent";

function CardHeader({ Icon, tile, title, subtitle }) {
  return (
    <div className="flex items-center gap-4">
      <span className={`grid size-12 shrink-0 place-items-center rounded-2xl border border-line ${tile}`}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
        <p className="mt-1 font-mono text-xs text-muted">{subtitle}</p>
      </div>
    </div>
  );
}

// fill = grow into spare height (the message box stretches when the two cards share a row)
function Field({ id, label, error, describedBy, multiline = false, fill = false, ...props }) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <div className={fill ? "flex grow flex-col" : undefined}>
      <label htmlFor={id} className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {label}
      </label>
      <Tag
        id={id}
        required
        aria-invalid={error || undefined}
        aria-describedby={error ? describedBy : undefined}
        className={`${fieldClass} ${error ? "border-coral" : "border-line"} ${multiline ? "min-h-36 resize-y" : ""} ${fill ? "grow" : ""}`}
        {...props}
      />
    </div>
  );
}

// Copy icon that morphs into a check mark after a successful copy
function CopyButton({ copied, label, onCopy }) {
  return (
    <button type="button" onClick={onCopy} aria-label={label} className={iconButton}>
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={copied ? "done" : "copy"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="grid place-items-center"
        >
          {copied ? <Check className="size-4 text-accent" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}

export default function Contact() {
  const uid = useId();
  const ids = { name: `${uid}-name`, email: `${uid}-email`, message: `${uid}-message`, status: `${uid}-status` };
  const formRef = useRef(null);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [invalid, setInvalid] = useState({});
  const [status, setStatus] = useState(null); // { tone: "error" | "success", text }
  const [copied, setCopied] = useState(null); // key of the channel just copied
  const [copyNote, setCopyNote] = useState(null); // { tone, text }
  const copyTimer = useRef();

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (invalid[name]) setInvalid((f) => ({ ...f, [name]: false }));
    if (status?.tone === "error") setStatus(null);
  };

  // Checks the given fields; flags the failing ones, explains the first problem and focuses it
  const check = (fields) => {
    const problems = {
      name: !values.name.trim() && "Please add your name.",
      email: !EMAIL_PATTERN.test(values.email.trim()) && "Please enter a valid email address.",
      message: values.message.trim().length < 10 && "Please write a message of at least 10 characters.",
    };
    const failed = fields.filter((field) => problems[field]);
    setInvalid(Object.fromEntries(failed.map((field) => [field, true])));
    if (!failed.length) return true;
    setStatus({ tone: "error", text: problems[failed[0]] });
    formRef.current?.elements.namedItem(failed[0])?.focus();
    return false;
  };

  // No backend: hand the message to the visitor's email app
  const onSubmit = (e) => {
    e.preventDefault();
    if (!check(["name", "email", "message"])) return;
    const name = values.name.trim();
    const subject = `Portfolio enquiry from ${name}`;
    const body = `${values.message.trim()}\n\nFrom: ${name} (${values.email.trim()})`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ tone: "success", text: `Opening your email app… If nothing happens, write to ${contact.email}.` });
  };

  const sendWhatsApp = () => {
    if (!check(["message"])) return;
    const from = [values.name.trim(), values.email.trim()].filter(Boolean).join(", ");
    const text = from ? `${values.message.trim()}\n\nFrom: ${from}` : values.message.trim();
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setStatus({ tone: "success", text: "Opening WhatsApp in a new tab…" });
  };

  const copyChannel = async (item) => {
    clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(item.copy ?? item.value);
      setCopied(item.key);
      setCopyNote({ tone: "success", text: `${item.label} copied to clipboard.` });
    } catch {
      setCopied(null);
      setCopyNote({ tone: "error", text: `Couldn't copy automatically. Please copy the ${item.label} details by hand.` });
    }
    copyTimer.current = setTimeout(() => {
      setCopied(null);
      setCopyNote(null);
    }, 2500);
  };

  const StatusIcon = status && statusTone[status.tone].Icon;

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      accent="reliable"
      accentClass="text-accent"
      intro="Have a DevOps or cloud role in mind, a project to collaborate on, or a question about pipelines and infrastructure? Send a message and I'll get back to you."
    >
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Send Message */}
          <Reveal className="min-w-0">
            <div className="card flex h-full flex-col p-5 sm:p-8">
              <CardHeader
                Icon={MessageSquare}
                tile="bg-accent/10 text-accent"
                title="Send Message"
                subtitle="Opens in your email app, ready to send"
              />

              <form ref={formRef} noValidate onSubmit={onSubmit} className="mt-8 flex flex-1 flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id={ids.name}
                    name="name"
                    label="Your Name"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={values.name}
                    onChange={onChange}
                    error={invalid.name}
                    describedBy={ids.status}
                  />
                  <Field
                    id={ids.email}
                    name="email"
                    type="email"
                    label="Your Email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={values.email}
                    onChange={onChange}
                    error={invalid.email}
                    describedBy={ids.status}
                  />
                </div>
                <Field
                  id={ids.message}
                  name="message"
                  label="Message"
                  multiline
                  fill
                  rows={5}
                  placeholder="Tell me about the role, project or question…"
                  value={values.message}
                  onChange={onChange}
                  error={invalid.message}
                  describedBy={ids.status}
                />

                <div className="flex flex-col gap-3 sm:flex-row">
                  {/* ::before is the shine: parked off the left edge, swept across on hover, snaps back on leave */}
                  <button
                    type="submit"
                    className="group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-bg shadow-[0_10px_30px_-14px_var(--c-accent)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-14px_var(--c-accent)] before:absolute before:inset-y-0 before:left-0 before:-z-10 before:w-1/3 before:-translate-x-full before:-skew-x-12 before:bg-linear-to-r before:from-transparent before:via-bg/45 before:to-transparent hover:before:translate-x-[400%] hover:before:transition-transform hover:before:duration-700 hover:before:ease-out motion-reduce:before:hidden dark:before:via-ink/40"
                  >
                    Send Message
                    <Send
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>
                  {contact.whatsapp && (
                    <button
                      type="button"
                      onClick={sendWhatsApp}
                      className={`${softButton} px-6 py-3.5`}
                    >
                      <MessageCircle className="size-4 text-accent" aria-hidden="true" />
                      Send via WhatsApp
                      <span className="sr-only">(opens in a new tab)</span>
                    </button>
                  )}
                </div>

                <p id={ids.status} role="status" className={`min-h-5 text-sm ${status ? statusTone[status.tone].className : ""}`}>
                  {status && (
                    <m.span
                      key={status.text}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="inline-flex items-start gap-2"
                    >
                      <StatusIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      <span className="wrap-break-word">{status.text}</span>
                    </m.span>
                  )}
                </p>
              </form>
            </div>
          </Reveal>

          {/* Let's Connect */}
          <Reveal delay={0.1} className="min-w-0">
            <div className="card flex h-full flex-col p-5 sm:p-8">
              <CardHeader
                Icon={AtSign}
                tile="bg-blue/10 text-blue"
                title="Let's Connect"
                subtitle="Or reach me directly"
              />

              <ul className="mt-8 space-y-3">
                {channels.map((item) => {
                  const { Icon } = item;
                  return (
                    // Mobile: value drops under the label so it gets the full width. sm+: one row.
                    <li
                      key={item.key}
                      className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 rounded-2xl border border-line bg-bg/60 p-3 transition-colors hover:border-accent/40 sm:gap-x-4 sm:p-4 dark:bg-surface-2/50"
                    >
                      <span className={`row-start-1 row-end-3 grid size-10 place-items-center rounded-xl ${item.tile}`}>
                        <Icon className="size-4.5" aria-hidden="true" />
                      </span>
                      <p className="col-start-2 row-start-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:self-end">
                        {item.label}
                      </p>
                      <p className="col-start-2 col-end-4 row-start-2 min-w-0 text-sm font-medium text-ink wrap-break-word sm:col-end-3 sm:self-start sm:text-[15px]">
                        {softBreak(item.value)}
                      </p>
                      <div className="col-start-3 row-start-1 flex items-center gap-1.5 sm:row-end-3">
                        <CopyButton copied={copied === item.key} label={item.copyLabel} onCopy={() => copyChannel(item)} />
                        <a
                          href={item.href}
                          {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                          className={iconButton}
                        >
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                          <span className="sr-only">
                            {item.openLabel}
                            {item.external && " (opens in a new tab)"}
                          </span>
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p
                role="status"
                className={`mt-3 min-h-5 font-mono text-xs ${copyNote ? statusTone[copyNote.tone].className : ""}`}
              >
                {copyNote?.text}
              </p>

              <div className="mt-auto pt-6">
                <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-start gap-2 text-sm text-muted">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    {profile.location}
                  </p>
                  <a
                    href={profile.resumeFile}
                    download
                    className={`group ${softButton} px-5 py-3`}
                  >
                    <Download className="size-4 text-accent transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
