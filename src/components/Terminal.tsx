import { useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { useLang, LANG_ORDER, type Lang } from "../lib/i18n";
import { PROJECTS, PROFILE, SKILL_CHIPS, SOCIALS } from "../data/profile";
import { THEME_ORDER, applyTheme, currentTheme, type ThemeName } from "../lib/theme";
import { setSound, soundEnabled, sfx } from "../lib/sound";

/* ------------------------------------------------------------------ */
/*  MKA://terminal — hidden command line. Toggle with ` (backquote).   */
/* ------------------------------------------------------------------ */

type Kind = "in" | "out" | "ok" | "err" | "sys";
interface Line {
  k: Kind;
  s: string;
}

const HELP = [
  "help                 list commands",
  "whoami               identity readout",
  "neofetch             system summary",
  "projects             list quantum nodes",
  "open <n>             open project n on GitHub",
  "stack                list technologies",
  "socials              list channels",
  "design <name>        quantum | obsidian | hologram",
  "theme <name>         void | nebula | matrix | solar",
  "lang <code>          en | mm | th",
  "goto <section>       board about projects orb stack career journal gallery contact",
  "sound on|off         toggle sound design",
  "contact              direct channels",
  "clear · exit",
];

export default function Terminal() {
  const { setLang, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { k: "sys", s: "MKA://terminal v12 — Quantum Matrix" },
    { k: "sys", s: "type `help` to list commands" },
  ]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (e.key === "`" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("mka:terminal", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mka:terminal", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines, open]);

  const push = (...ls: Line[]) => setLines((prev) => [...prev, ...ls].slice(-200));

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    push({ k: "in", s: cmd });
    setHist((h) => [cmd, ...h].slice(0, 40));
    setHi(-1);
    const [c, ...args] = cmd.split(/\s+/);
    const a = args.join(" ").toLowerCase();

    switch (c.toLowerCase()) {
      case "help":
        push(...HELP.map((s) => ({ k: "out" as Kind, s })));
        break;
      case "whoami":
        push(
          { k: "ok", s: `${PROFILE.name} · ${PROFILE.myanmar}` },
          { k: "out", s: `${PROFILE.title} / ${PROFILE.altTitle}` },
          { k: "out", s: PROFILE.location },
          { k: "out", s: `"${PROFILE.philosophy}"` }
        );
        break;
      case "neofetch":
        push(
          { k: "ok", s: "mka@quantum-core" },
          { k: "out", s: "─────────────────────────────" },
          { k: "out", s: `OS        MKA Quantum Portfolio v11` },
          { k: "out", s: `Design    quantum matrix  ·  Theme ${currentTheme()}  ·  Lang ${lang}` },
          { k: "out", s: `Kernel    Kotlin · Jetpack Compose · Clean Architecture` },
          { k: "out", s: `Packages  ${PROJECTS.length} nodes · ${SKILL_CHIPS.length} skills · 82+ certs` },
          { k: "out", s: `Uptime    3+ years building · open to work` },
          { k: "out", s: `Sound     ${soundEnabled() ? "on" : "off"}` }
        );
        break;
      case "projects":
        push(...PROJECTS.map((p, i) => ({ k: "out" as Kind, s: `${String(i + 1).padStart(2, "0")}  ${p.name.padEnd(22, " ")} ${p.state}` })));
        push({ k: "sys", s: "open <n> to launch a repo" });
        break;
      case "open": {
        const n = parseInt(args[0] ?? "", 10);
        const p = PROJECTS[n - 1];
        if (!p) push({ k: "err", s: "unknown node. try `projects`" });
        else {
          window.open(p.url, "_blank", "noreferrer");
          push({ k: "ok", s: `launching ${p.name} → ${p.url}` });
        }
        break;
      }
      case "stack":
        push({ k: "out", s: SKILL_CHIPS.map((s) => s.t).join(" · ") });
        break;
      case "socials":
        push(...SOCIALS.map((s) => ({ k: "out" as Kind, s: `${s.label.padEnd(10, " ")} ${s.url}` })));
        break;
      case "design":
        push({ k: "out", s: "this build runs a single universe: quantum matrix" });
        push({ k: "sys", s: `try: theme ${THEME_ORDER.join(" | ")}` });
        break;
      case "theme":
        if (THEME_ORDER.includes(a as ThemeName)) {
          applyTheme(a as ThemeName);
          push({ k: "ok", s: `accent theme → ${a}` });
        } else push({ k: "err", s: `theme: ${THEME_ORDER.join(" | ")}` });
        break;
      case "lang":
        if (LANG_ORDER.includes(a as Lang)) {
          setLang(a as Lang);
          push({ k: "ok", s: `language → ${a}` });
        } else push({ k: "err", s: `lang: ${LANG_ORDER.join(" | ")}` });
        break;
      case "goto": {
        const el = document.getElementById(a === "home" ? "home" : a);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          push({ k: "ok", s: `warping → #${a}` });
        } else push({ k: "err", s: "unknown section" });
        break;
      }
      case "sound":
        if (a === "on" || a === "off") {
          setSound(a === "on");
          push({ k: "ok", s: `sound design ${a}` });
        } else push({ k: "out", s: `sound is ${soundEnabled() ? "on" : "off"} — use sound on|off` });
        break;
      case "contact":
        push({ k: "ok", s: `phone   ${PROFILE.phone}` }, { k: "out", s: `whatsapp ${PROFILE.whatsapp}` }, { k: "out", s: `github  ${PROFILE.githubUrl}` });
        break;
      case "sudo":
        push({ k: "err", s: "permission denied: observers lack root in this universe." });
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        setOpen(false);
        break;
      default:
        push({ k: "err", s: `command not found: ${c}. try \`help\`` });
    }
  };

  if (!open) return null;

  const color = (k: Kind) =>
    k === "in" ? "text-ink" : k === "ok" ? "text-neon" : k === "err" ? "text-pulse" : k === "sys" ? "text-ink-5" : "text-ink-3";

  return (
    <div className="glass fixed inset-x-0 bottom-0 z-[115] flex h-[46vh] flex-col border-t border-quantum/30 shadow-[0_-20px_60px_var(--glow-q)]" role="dialog" aria-label="Terminal">
      <div className="flex items-center justify-between border-b border-line/10 px-4 py-2 font-tech text-[10px] tracking-[0.3em] text-ink-4">
        <span className="flex items-center gap-2 text-quantum">
          <TerminalIcon className="h-3.5 w-3.5" /> MKA://TERMINAL
        </span>
        <span className="hidden sm:block">ESC · ` TO CLOSE</span>
        <button onClick={() => setOpen(false)} aria-label="Close terminal" className="text-ink-4 transition hover:text-pulse">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 font-tech text-[12px] leading-relaxed">
        {lines.map((l, i) => (
          <p key={i} className={`whitespace-pre-wrap ${color(l.k)}`}>
            {l.k === "in" ? <span className="text-quantum">❯ </span> : null}
            {l.s}
          </p>
        ))}
        <div ref={endRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
          setInput("");
        }}
        className="flex items-center gap-2 border-t border-line/10 px-4 py-2.5"
      >
        <span className="font-tech text-quantum">❯</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            sfx.key();
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              e.preventDefault();
              const n = Math.min(hist.length - 1, hi + 1);
              setHi(n);
              setInput(hist[n] ?? "");
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              const n = Math.max(-1, hi - 1);
              setHi(n);
              setInput(n === -1 ? "" : hist[n]);
            }
          }}
          spellCheck={false}
          autoComplete="off"
          className="w-full bg-transparent font-tech text-[13px] text-ink placeholder:text-ink-6 focus:outline-none"
          placeholder="help"
        />
      </form>
    </div>
  );
}
