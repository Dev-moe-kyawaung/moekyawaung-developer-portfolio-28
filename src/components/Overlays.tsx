import { useEffect, useState } from "react";
import { ArrowUp, CheckCircle2, Activity, Volume2, VolumeX, Terminal as TerminalIcon } from "lucide-react";
import { useLang } from "../lib/i18n";
import { THEME_META, currentTheme, type ThemeName } from "../lib/theme";
import { setSound, soundEnabled } from "../lib/sound";

/* ------------------------------------------------------------------ */
/*  Chrome: scroll progress, back-to-top, toasts, system dock.         */
/* ------------------------------------------------------------------ */

export function ScrollProgress() {
  const [k, setK] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setK(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-line/5">
      <div className="h-full bg-gradient-to-r from-quantum via-plasma to-pulse shadow-[0_0_12px_var(--glow-q)]" style={{ width: `${k * 100}%` }} />
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`glass fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border-quantum/40 text-quantum transition-all duration-300 hover:shadow-[0_0_24px_var(--glow-q)] md:bottom-6 md:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ---------------- toast bus ---------------- */

export function toast(msg: string) {
  window.dispatchEvent(new CustomEvent("mka:toast", { detail: msg }));
}

export function Toaster() {
  const [items, setItems] = useState<{ id: number; msg: string }[]>([]);
  useEffect(() => {
    let n = 0;
    const onToast = (e: Event) => {
      const id = ++n;
      const msg = (e as CustomEvent<string>).detail;
      setItems((prev) => [...prev.slice(-2), { id, msg }]);
      window.setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 2800);
    };
    window.addEventListener("mka:toast", onToast);
    return () => window.removeEventListener("mka:toast", onToast);
  }, []);
  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-[130] flex w-max max-w-[92vw] -translate-x-1/2 flex-col items-center gap-2 md:bottom-8">
      {items.map((i) => (
        <div key={i.id} className="anim-toast glass flex items-center gap-2.5 rounded-full border-neon/40 px-4 py-2.5 font-tech text-xs tracking-wider text-ink-1 shadow-[0_0_30px_var(--glow-n)]">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-neon" />
          <span className="truncate">{i.msg}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------- system dock ---------------- */

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function useFps() {
  const [fps, setFps] = useState(60);
  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      frames++;
      if (t - last >= 1000) {
        setFps(Math.round((frames * 1000) / (t - last)));
        frames = 0;
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return fps;
}

function fmt(d: Date, tz: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: tz }).format(d);
  } catch {
    return "--:--:--";
  }
}

export function SystemDock() {
  const { t } = useLang();
  const now = useNow();
  const fps = useFps();
  const [theme, setTheme] = useState<ThemeName>("void");
  const [low, setLow] = useState(false);
  const [snd, setSnd] = useState(false);

  useEffect(() => {
    setLow(document.documentElement.dataset.power === "low");
    setSnd(soundEnabled());
    setTheme(currentTheme());
    const onPower = (e: Event) => setLow(!!(e as CustomEvent<boolean>).detail);
    const onSound = (e: Event) => setSnd(!!(e as CustomEvent<boolean>).detail);
    const onTheme = (e: Event) => setTheme((e as CustomEvent<ThemeName>).detail);
    window.addEventListener("mka:power", onPower);
    window.addEventListener("mka:sound", onSound);
    window.addEventListener("mka:theme", onTheme);
    return () => {
      window.removeEventListener("mka:power", onPower);
      window.removeEventListener("mka:sound", onSound);
      window.removeEventListener("mka:theme", onTheme);
    };
  }, []);

  const meta = THEME_META[theme];

  return (
    <div className="glass fixed bottom-4 left-4 z-40 hidden items-center gap-3 rounded-full py-1.5 pl-3 pr-2 font-tech text-[10px] tracking-[0.15em] text-ink-4 md:flex">
      <span className="flex items-center gap-1.5 text-neon">
        <Activity className="h-3.5 w-3.5" />
        {low ? t("dock.low") : t("dock.sys")}
      </span>
      <span className="h-3 w-px bg-line/15" />
      <span className={fps >= 50 ? "text-ink-3" : "text-amber-400"}>{fps} FPS</span>
      <span className="h-3 w-px bg-line/15" />
      <span title="Asia/Yangon">YGN {fmt(now, "Asia/Yangon")}</span>
      <span className="h-3 w-px bg-line/15" />
      <span className="flex items-center gap-1.5" title={meta.label}>
        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: `linear-gradient(135deg, ${meta.a}, ${meta.b})` }} />
        {meta.label.toUpperCase()}
      </span>
      <span className="h-3 w-px bg-line/15" />
      <button
        onClick={() => setSound(!snd)}
        title={t("dock.sound")}
        aria-label="Toggle sound"
        className={`flex h-7 w-7 items-center justify-center rounded-full transition ${snd ? "bg-quantum/15 text-quantum" : "text-ink-5 hover:text-ink-2"}`}
      >
        {snd ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
      </button>
      <button
        onClick={() => window.dispatchEvent(new Event("mka:terminal"))}
        title={`${t("dock.term")} ( \` )`}
        aria-label="Open terminal"
        className="flex h-7 w-7 items-center justify-center rounded-full text-ink-5 transition hover:bg-quantum/15 hover:text-quantum"
      >
        <TerminalIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
