import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, Copy } from "lucide-react";

// Copies text, falling back to a hidden textarea where the async Clipboard API is unavailable
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const focused = document.activeElement;
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    area.remove();
    focused?.focus?.();
    return ok;
  }
}

const TIP = { idle: "Copy email", copied: "Copied!" };

export default function CopyEmailButton({ email }) {
  const [status, setStatus] = useState("idle"); // idle | copied | failed
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    const ok = await copyText(email);
    setStatus(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), ok ? 2000 : 6000);
  };

  const copied = status === "copied";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy email address"
        className="peer grid size-12 place-items-center rounded-xl border border-line bg-surface/60 text-ink backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={copied ? "check" : "copy"}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className="grid place-items-center"
          >
            {copied ? (
              <Check className="size-4.5 text-accent" aria-hidden="true" />
            ) : (
              <Copy className="size-4.5" aria-hidden="true" />
            )}
          </m.span>
        </AnimatePresence>
      </button>

      {/* Visual tooltip; screen readers get the status message below instead */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] whitespace-nowrap text-ink shadow-lg transition-opacity duration-200 ${
          status === "idle" ? "opacity-0 peer-hover:opacity-100 peer-focus-visible:opacity-100" : "opacity-100"
        }`}
      >
        {TIP[status] ?? email}
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied && "Email address copied to the clipboard."}
        {status === "failed" && `Could not copy automatically. The email address is ${email}.`}
      </span>
    </div>
  );
}
