import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search, FolderGit2, Link2, Palette, Languages, Zap, Printer,
  Phone, Gauge, ArrowUp, CornerDownLeft, Volume2, Terminal as TerminalIcon, type LucideIcon,
} from "lucide-react";
import { useLang } from "../lib/i18n";
import { PROJECTS, SOCIALS, NAV_LINKS, PROFILE } from "../data/profile";
import { Atom } from "lucide-react";
import { THEME_META, THEME_ORDER, applyTheme, cycleTheme, currentTheme } from "../lib/theme";
import { cycleLang } from "./paletteLang";
import { setLowPower, isLowPower } from "../lib/theme";
import { setSound, soundEnabled } from "../lib/sound";
import { toast } from "./Overlays";

/* ------------------------------------------------------------------ */
/*  Command palette — Ctrl/⌘K omnibox: navigate, open projects &       */
/*  socials, trigger orb evaluations, themes, languages, resume.       */
/* ------------------------------------------------------------------ */

interface Item {
  group: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  run: () => void;
}

export default function CommandPalette() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    const onOpen = () => setOpen(true);
    window.addEventListener("mka:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mka:palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      window.setTimeout(() => inputRef.current?.focus(), 40);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open ]);

  const items: Item[] = useMemo(() => {
    const list: Item[] = [];
    NAV_LINKS.forEach((l) =>
      list.push({
        group: t("pal.nav"), label: `${t(l.key)}`, hint: l.href,
        icon: Atom,
        run: () => document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }),
      })
    );
    PROJECTS.forEach((p) =>
      list.push({
        group: t("pal.projects"), label: p.name, hint: p.state,
        icon: p.icon,
        run: () => {
          document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
          window.setTimeout(
            () => window.dispatchEvent(new CustomEvent("mka:select-project", { detail: p.id })),
            450
          );
        },
      })
    );
    SOCIALS.forEach((s) =>
      list.push({
        group: t("pal.socials"), label: `${s.label} · ${s.handle}`,
        icon: Link2,
        run: () => window.open(s.url, "_blank", "noreferrer"),
      })
    );
    THEME_ORDER.forEach((th) =>
      list.push({
        group: t("pal.actions"),
        label: `${t("pal.themeTo")} → ${THEME_META[th].label}`,
        hint: th === currentTheme() ? "ACTIVE" : th,
        icon: Palette,
        run: () => {
          applyTheme(th);
          toast(`${t("pal.themeTo")}: ${THEME_META[th].label}`);
        },
      })
    );
    list.push(
      {
        group: t("pal.actions"), label: t("pal.actSound"), hint: soundEnabled() ? "ON" : "OFF",
        icon: Volume2,
        run: () => setSound(!soundEnabled()),
      },
      {
        group: t("pal.actions"), label: t("pal.actTerm"), hint: "`",
        icon: TerminalIcon,
        run: () => window.dispatchEvent(new Event("mka:terminal")),
      },
      {
        group: t("pal.actions"), label: t("pal.actTheme"), hint: THEME_META[currentTheme()].label,
        icon: Palette,
        run: () => {
          const n = cycleTheme();
          toast(`${t("pal.themeTo")}: ${THEME_META[n].label}`);
        },
      },
      {
        group: t("pal.actions"), label: t("pal.actLang"),
        icon: Languages,
        run: () => {
          const next = cycleLang();
          toast(`${t("pal.langTo")}: ${next.toUpperCase()}`);
        },
      },
      {
        group: t("pal.actions"), label: t("pal.actOrb"),
        icon: Zap,
        run: () => {
          document.querySelector("#orb")?.scrollIntoView({ behavior: "smooth" });
          window.setTimeout(() => window.dispatchEvent(new Event("mka:evaluate")), 500);
        },
      },
      {
        group: t("pal.actions"), label: t("pal.actResume"),
        icon: Printer,
        run: () => window.setTimeout(() => window.print(), 60),
      },
      {
        group: t("pal.actions"), label: t("pal.actCopy"), hint: PROFILE.phone,
        icon: Phone,
        run: () => {
          navigator.clipboard?.writeText(PROFILE.phone).catch(() => {});
          toast(t("career.copied"));
        },
      },
      {
        group: t("pal.actions"), label: t("pal.actPower"),
        hint: isLowPower() ? "ON" : "OFF",
        icon: Gauge,
        run: () => {
          const next = !isLowPower();
          setLowPower(next);
          toast(next ? t("dock.low") : t("dock.sys"));
        },
      },
      {
        group: t("pal.actions"), label: t("pal.actTop"),
        icon: ArrowUp,
        run: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      }
    );
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, lang]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter(
      (i) => i.label.toLowerCase().includes(needle) || i.group.toLowerCase().includes(needle) || i.hint?.toLowerCase().includes(needle)
    );
  }, [items, q]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const runItem = (i: Item) => {
    setOpen(false);
    window.setTimeout(() => i.run(), 30);
  };

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="anim-pop glass relative w-full max-w-xl overflow-hidden rounded-2xl border-quantum/25 shadow-[0_0_80px_var(--glow-q)]">
        <div className="flex items-center gap-3 border-b border-line/10 px-4 py-3.5">
          <Search className="h-4 w-4 shrink-0 text-quantum" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(filtered.length - 1, a + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(0, a - 1));
              } else if (e.key === "Enter") {
                const it = filtered[active];
                if (it) runItem(it);
              }
            }}
            placeholder={t("pal.placeholder")}
            className="w-full bg-transparent font-tech text-sm tracking-wide text-ink placeholder:text-ink-6 focus:outline-none"
          />
          <kbd className="hidden shrink-0 rounded border border-line/15 px-1.5 py-0.5 font-tech text-[9px] text-ink-5 sm:block">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[46vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center font-tech text-xs tracking-widest text-ink-6">
              NO SIGNAL FOUND
            </p>
          )}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            const Icon = item.icon;
            return (
              <div key={`${item.group}-${item.label}`}>
                {header && (
                  <p className="px-3 pb-1 pt-3 font-tech text-[9px] tracking-[0.35em] text-ink-5">{header}</p>
                )}
                <button
                  data-idx={i}
                  onClick={() => runItem(item)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                    i === active ? "bg-quantum/10 text-ink" : "text-ink-3"
                  }`}
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${i === active ? "border-quantum/50 text-quantum" : "border-line/10 text-ink-5"}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 truncate font-tech text-xs tracking-wider">{item.label}</span>
                  {item.hint && (
                    <span className="hidden shrink-0 font-tech text-[10px] text-ink-6 sm:block">{item.hint}</span>
                  )}
                  {i === active && <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-quantum" />}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-line/10 px-4 py-2.5 font-tech text-[9px] tracking-[0.25em] text-ink-6">
          <span className="flex items-center gap-2">
            <FolderGit2 className="h-3 w-3" /> {filtered.length} RESULTS
          </span>
          <span>{t("pal.hint")}</span>
        </div>
      </div>
    </div>
  );
}
