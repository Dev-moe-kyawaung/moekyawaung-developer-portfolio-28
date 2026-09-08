import { useEffect, useRef, useState } from "react";
import { Atom } from "lucide-react";
import { useLang } from "../lib/i18n";

const LINES = [
  "> mounting quantum core …",
  "> entangling 13 project nodes …",
  "> cascading data streams …",
  "> seeding particle field …",
  "> growing fractal lattice …",
  "> calibrating AI orb …",
  "> superposition stable. welcome, observer.",
];

/** Quantum boot sequence — initialization overlay with live log. */
export default function BootLoader() {
  const { t } = useLang();
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);
  const [removed, setRemoved] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const DUR = 1750;
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / DUR);
      const eased = 1 - Math.pow(1 - k, 3);
      setProgress(Math.round(eased * 100));
      if (k < 1 && !done.current) raf = requestAnimationFrame(tick);
      else finish();
    };
    const finish = () => {
      if (done.current) return;
      done.current = true;
      setProgress(100);
      window.setTimeout(() => {
        setGone(true);
        document.body.style.overflow = "";
        window.dispatchEvent(new Event("mka:booted"));
        window.setTimeout(() => setRemoved(true), 650);
      }, 280);
    };
    raf = requestAnimationFrame(tick);
    const skip = () => finish();
    window.addEventListener("pointerdown", skip);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", skip);
      document.body.style.overflow = "";
    };
  }, []);

  if (removed) return null;

  const shown = LINES.slice(0, Math.min(LINES.length, 1 + Math.floor((progress / 100) * LINES.length)));

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-void transition-opacity duration-500 ${
        gone ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={gone}
    >
      <div className="fx-grid-faint pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-plasma/10 blur-[120px]" />

      <div className="relative w-[min(92vw,480px)]">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-quantum/50 bg-quantum/10 text-quantum">
            <Atom className="animate-spin-slow h-6 w-6" />
          </span>
          <div>
            <p className="font-display text-lg font-black tracking-widest text-ink">
              QUANTUM <span className="grad-text">MATRIX</span>
            </p>
            <p className="font-tech text-[9px] tracking-[0.4em] text-ink-5">QUANTUM MATRIX · v12</p>
          </div>
          <span className="font-tech ml-auto text-3xl font-bold text-quantum">{progress}%</span>
        </div>

        <div className="mt-5 h-1.5 overflow-hidden rounded-full border border-line/10 bg-line/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-quantum via-plasma to-pulse shadow-[0_0_16px_var(--glow-q)] transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="glass mt-5 min-h-[132px] rounded-2xl p-4 font-tech text-[11px] leading-relaxed">
          {shown.map((l, i) => (
            <p key={i} className={i === shown.length - 1 ? "text-neon" : "text-ink-5"}>
              {l}
            </p>
          ))}
        </div>

        <p className="font-tech mt-4 text-center text-[9px] tracking-[0.35em] text-ink-6">{t("boot.skip")}</p>
      </div>
    </div>
  );
}
