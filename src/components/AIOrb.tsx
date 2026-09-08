import { useEffect, useRef, useState } from "react";
import { Zap, Pause, Play } from "lucide-react";
import { useCanvas } from "../hooks/useCanvas";
import Reveal from "./Reveal";
import { useLang } from "../lib/i18n";
import { QA, hexA } from "../lib/theme";
import { ORB_DECISIONS } from "../data/profile";

/* ------------------------------------------------------------------ */
/*  Floating AI orb — visualizes architecture decisions.               */
/*  Each evaluation: an IMPLOSION (candidates rush inward) followed by  */
/*  a PARTICLE BURST + shockwave, while an 8-qubit register around the  */
/*  nucleus decoheres into a measured state.                            */
/* ------------------------------------------------------------------ */

interface QP {
  a: number;
  sp: number;
  life: number;
  max: number;
  size: number;
  color: string;
  drift: number;
  mode: 0 | 1; // 0 = implode, 1 = burst
}
interface Wave {
  r: number;
  max: number;
  color: string;
  life: number;
}
interface Electron {
  ring: number;
  theta: number;
  speed: number;
  size: number;
}
interface OrbSys {
  parts: QP[];
  waves: Wave[];
  electrons: Electron[];
  prevSig: number;
  phase: number;
  boost: number;
  qubits: number[]; // 0 | 1 per qubit
  qFlip: number;
}

const FLOAT_BADGES = [
  { label: "MVVM", cls: "left-0 top-6 sm:left-2", key: "q" as const, delay: "0s" },
  { label: "Compose", cls: "right-2 top-2 sm:right-0", key: "p" as const, delay: "0.6s" },
  { label: "Flow", cls: "left-2 bottom-14 sm:left-0", key: "n" as const, delay: "1.1s" },
  { label: "Hilt", cls: "-right-1 bottom-6 sm:right-0", key: "f" as const, delay: "0.3s" },
  { label: "Room", cls: "left-10 -top-2", key: "indigo" as const, delay: "1.6s" },
  { label: "CI/CD", cls: "right-12 -bottom-3 sm:right-16", key: "pink" as const, delay: "0.9s" },
];

export default function AIOrb() {
  const { t } = useLang();
  const [auto, setAuto] = useState(true);
  const [idx, setIdx] = useState(2);
  const [log, setLog] = useState<{ at: number; i: number; n: number }[]>([]);
  const [hovering, setHovering] = useState(false);

  const sysRef = useRef<OrbSys | null>(null);
  const sigRef = useRef(0);
  const autoRef = useRef(true);
  const counterRef = useRef(100);
  autoRef.current = auto;

  if (!sysRef.current) {
    sysRef.current = {
      parts: [],
      waves: [],
      electrons: Array.from({ length: 15 }, (_, k) => ({
        ring: k % 3,
        theta: (k / 15) * Math.PI * 2,
        speed: 0.55 + ((k * 37) % 10) / 9,
        size: 1 + ((k * 13) % 10) / 7,
      })),
      prevSig: -1,
      phase: 0,
      boost: 0,
      qubits: [0, 1, 0, 1, 1, 0, 0, 1],
      qFlip: 0,
    };
  }

  const chooseRef = useRef<(i?: number) => void>(() => {});
  chooseRef.current = (i?: number) => {
    const next = i ?? Math.floor(Math.random() * ORB_DECISIONS.length);
    sigRef.current += 1;
    counterRef.current += 1;
    setIdx(next);
    setLog((prev) => [{ at: Date.now(), i: next, n: counterRef.current }, ...prev].slice(0, 5));
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      if (autoRef.current) chooseRef.current();
    }, 3800);
    const onEval = () => chooseRef.current();
    window.addEventListener("mka:evaluate", onEval);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("mka:evaluate", onEval);
    };
  }, []);

  const PAL = [QA.q, QA.p, QA.f, QA.n, QA.indigo, QA.pink];
  const colorOf = PAL[idx % PAL.length];
  const decision = ORB_DECISIONS[idx];

  const canvasRef = useCanvas((ctx, w, h, tt, dt) => {
    const s = sysRef.current as OrbSys;
    s.phase += dt * (0.55 + s.boost * 2.4);
    s.boost *= 0.94;
    ctx.clearRect(0, 0, w, h);

    const m = Math.min(w, h);
    const cx = w / 2;
    const cy = h / 2;
    const ringR = [m * 0.3, m * 0.375, m * 0.45];

    // ---- decision signal → implosion then burst ----
    if (s.prevSig !== sigRef.current) {
      s.prevSig = sigRef.current;
      s.qFlip += 1;
      const c = colorOf;
      // implosion: particles spawn at the rim and collapse inward
      for (let i = 0; i < 46; i++) {
        s.parts.push({
          a: Math.random() * Math.PI * 2,
          sp: -(m * 0.62 + Math.random() * m * 0.3),
          life: 0,
          max: 0.34 + Math.random() * 0.14,
          size: 0.9 + Math.random() * 1.8,
          color: Math.random() < 0.6 ? c : QA.ink,
          drift: (Math.random() - 0.5) * 20,
          mode: 0,
        });
      }
      // burst: delayed outward explosion
      for (let i = 0; i < 92; i++) {
        s.parts.push({
          a: Math.random() * Math.PI * 2,
          sp: 46 + Math.random() * 200,
          life: -0.3 - Math.random() * 0.12, // negative life = waiting to fire
          max: 0.95 + Math.random() * 1.25,
          size: 0.8 + Math.random() * 2.2,
          color: Math.random() < 0.68 ? c : Math.random() < 0.5 ? QA.ink : QA.p,
          drift: (Math.random() - 0.5) * 70,
          mode: 1,
        });
      }
      s.waves.push({ r: 16, max: m * 0.54, color: c, life: 0 });
      s.waves.push({ r: 8, max: m * 0.34, color: QA.n, life: -0.16 });
      // decohere one qubit
      s.qubits[Math.floor(Math.random() * 8)] = Math.random() < 0.5 ? 0 : 1;
    }

    // ambient halo
    const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, m * 0.62);
    halo.addColorStop(0, hexA(QA.q, 0.13));
    halo.addColorStop(0.45, hexA(QA.p, 0.08));
    halo.addColorStop(1, hexA(QA.bg, 0));
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, w, h);

    // ---- particle system (implosion + burst) ----
    for (let i = s.parts.length - 1; i >= 0; i--) {
      const p = s.parts[i];
      p.life += dt;
      if (p.life < 0) continue; // queued burst, not yet fired
      if (p.life >= p.max) {
        s.parts.splice(i, 1);
        continue;
      }
      const k = p.life / p.max;
      const ease = p.mode === 0 ? 1 - (1 - k) * (1 - k) : 1 - Math.pow(1 - k, 2.2);
      const dist = p.sp * ease + Math.sin(p.life * 6 + p.a) * p.drift * p.life;
      ctx.globalAlpha = (1 - k) * 0.95;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 9;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(p.a) * dist, cy + Math.sin(p.a) * dist, p.size * (1 - k * 0.65), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    // ---- shockwaves ----
    for (let i = s.waves.length - 1; i >= 0; i--) {
      const wv = s.waves[i];
      wv.life += dt;
      if (wv.life < 0) continue;
      if (wv.life > 1) {
        s.waves.splice(i, 1);
        continue;
      }
      const eased = 1 - Math.pow(1 - wv.life, 3);
      ctx.strokeStyle = wv.color;
      ctx.globalAlpha = (1 - wv.life) * 0.55;
      ctx.lineWidth = 1.5 + (1 - wv.life) * 3;
      ctx.beginPath();
      ctx.arc(cx, cy, wv.r + (wv.max - wv.r) * eased, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // ---- rotating electron rings ----
    ctx.save();
    ctx.translate(cx, cy);
    const pulse = 1 + Math.sin(tt * 2.4) * 0.045;
    const ringCols = [hexA(QA.q, 0.55), hexA(QA.p, 0.55), hexA(QA.f, 0.5)];
    const arcCols = [QA.ink, QA.p, QA.f];
    const elecCols = [QA.q, QA.p, QA.f];
    for (let ring = 0; ring < 3; ring++) {
      const rr = ringR[ring];
      ctx.save();
      ctx.rotate(s.phase * (0.65 + ring * 0.4) + ring * 2.1);
      ctx.scale(1, 0.32 + ring * 0.07);
      ctx.strokeStyle = ringCols[ring];
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.arc(0, 0, rr, 0, Math.PI * 2);
      ctx.stroke();

      const arcStart = s.phase * (0.65 + ring * 0.4) + ring * 2.1;
      ctx.strokeStyle = arcCols[ring];
      ctx.globalAlpha = 0.9;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, rr, -arcStart + 0.5, -arcStart + 1.7);
      ctx.stroke();
      ctx.globalAlpha = 1;

      for (const e of s.electrons) {
        if (e.ring !== ring) continue;
        const a = e.theta + s.phase * e.speed * (0.65 + ring * 0.4);
        const ec = elecCols[ring];
        ctx.fillStyle = ec;
        ctx.shadowColor = ec;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * rr, Math.sin(a) * rr, e.size * (1 + Math.sin(tt * 5 + e.theta) * 0.45), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();
    }

    // ---- 8-qubit register around the nucleus ----
    const qr = m * 0.215;
    ctx.save();
    ctx.rotate(-s.phase * 0.35);
    for (let qi = 0; qi < 8; qi++) {
      const a = (qi / 8) * Math.PI * 2;
      const qx = Math.cos(a) * qr;
      const qy = Math.sin(a) * qr * 0.98;
      const on = s.qubits[qi];
      const size = 3.4;
      ctx.save();
      ctx.translate(qx, qy);
      ctx.rotate(a + s.phase * 0.5);
      if (on) {
        ctx.fillStyle = hexA(QA.q, 0.95);
        ctx.shadowColor = QA.q;
        ctx.shadowBlur = 10;
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.shadowBlur = 0;
      } else {
        ctx.strokeStyle = hexA(QA.p, 0.8);
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-size / 2, -size / 2, size, size);
      }
      ctx.restore();
    }
    ctx.restore();

    // ---- nucleus ----
    const nucR = m * 0.135 * pulse;
    const nuc = ctx.createRadialGradient(0, 0, 0, 0, 0, nucR * 2.2);
    nuc.addColorStop(0, QA.ink);
    nuc.addColorStop(0.25, colorOf);
    nuc.addColorStop(0.55, hexA(QA.q, 0.5));
    nuc.addColorStop(1, hexA(QA.q, 0));
    ctx.fillStyle = nuc;
    ctx.beginPath();
    ctx.arc(0, 0, nucR * 2.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = hexA(QA.ink, 0.5);
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      const f = s.phase * (2 + i * 1.3) + i * 2;
      ctx.beginPath();
      ctx.arc(0, 0, nucR * (0.45 + i * 0.2), f, f + 1.6);
      ctx.stroke();
    }
    ctx.restore();
  });

  const ones = sysRef.current?.qubits.filter((q) => q === 1).length ?? 0;

  return (
    <section id="orb" className="relative z-10 overflow-hidden py-24">
      <div className="fx-grid-faint pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-plasma/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal>
          <p className="font-tech text-xs tracking-[0.4em] text-quantum/80">// 04 · DECISION ENGINE</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("sec.orb.a")} <span className="grad-text">{t("sec.orb.b")}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-3/85">
            Every architecture call collapses inside the orb: candidate patterns implode inward, then
            detonate into an approved decision while the 8-qubit register decoheres. Click the nucleus
            to force an evaluation.
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <Reveal delay={100} className="order-1 flex justify-center">
            <div className="relative">
              <div className="animate-spin-slower pointer-events-none absolute inset-[-36px] rounded-full border border-dashed border-quantum/25" />
              <div className="animate-spin-slow pointer-events-none absolute inset-[-12px] rounded-full border border-plasma/20" />
              <div className="ring-ping pointer-events-none absolute inset-8 rounded-full border border-quantum/40" />

              {FLOAT_BADGES.map((b) => (
                <span
                  key={b.label}
                  style={{ borderColor: QA[b.key], color: QA[b.key], animationDelay: b.delay }}
                  className={`anim-float glass pointer-events-none absolute z-10 rounded-full border px-2.5 py-1 font-tech text-[10px] tracking-widest ${b.cls}`}
                >
                  {b.label}
                </span>
              ))}

              <canvas
                ref={canvasRef}
                className={`relative block h-[300px] w-[300px] cursor-pointer transition-transform duration-500 sm:h-[360px] sm:w-[360px] ${
                  hovering ? "scale-105" : ""
                }`}
                onClick={() => chooseRef.current()}
                onMouseEnter={() => {
                  setHovering(true);
                  if (sysRef.current) sysRef.current.boost = 1;
                }}
                onMouseLeave={() => setHovering(false)}
                aria-label="AI orb — click to evaluate an architecture decision"
              />
              <p className="font-tech mt-2 text-center text-[10px] tracking-[0.35em] text-ink-5">{t("orb.hint")}</p>
              <p className="font-tech mt-1 text-center text-[10px] tracking-[0.35em] text-quantum/80">
                |ψ⟩ = {String(ones).padStart(2, "0")}/{String(8 - ones).padStart(2, "0")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={200} className="order-2">
            <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-7">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-quantum/70 to-transparent" />
              <div className="flex items-center justify-between gap-4">
                <p className="font-tech text-[10px] tracking-[0.35em] text-ink-4">
                  {t("orb.active")} · {String(idx + 1).padStart(2, "0")}/{ORB_DECISIONS.length}
                </p>
                <span className="flex items-center gap-2 font-tech text-[10px] tracking-widest text-ink-4">
                  <span className={`h-1.5 w-1.5 rounded-full ${auto ? "animate-pulse bg-neon" : "bg-ink-6"}`} />
                  {auto ? t("orb.autoEval") : t("orb.manual")}
                </span>
              </div>

              <div key={idx} className="anim-pop mt-5 min-h-[112px]">
                <span
                  className="font-tech inline-block rounded border px-2 py-0.5 text-[10px] tracking-[0.3em]"
                  style={{ color: colorOf, borderColor: `${colorOf}66`, background: `${colorOf}14` }}
                >
                  {decision.tag}
                </span>
                <p className="font-display mt-3 text-lg font-semibold leading-snug text-ink sm:text-xl">{decision.text}</p>
                <p className="font-tech mt-2 text-xs tracking-wider" style={{ color: colorOf }}>
                  ▸ {decision.verdict}
                </p>
              </div>

              <div className="mt-6 border-t border-line/10 pt-4">
                <p className="font-tech mb-2 text-[10px] tracking-[0.35em] text-ink-5">{t("orb.log")}</p>
                <ul className="space-y-1.5 font-tech text-[11px] leading-relaxed text-ink-4">
                  {log.length === 0 && <li className="text-ink-6">{t("orb.await")}</li>}
                  {log.map((l) => {
                    const c = PAL[l.i % PAL.length];
                    return (
                      <li key={l.n} className="flex gap-2">
                        <span className="shrink-0 text-ink-6">
                          {new Date(l.at).toLocaleTimeString([], { minute: "2-digit", second: "2-digit" })}
                        </span>
                        <span className="shrink-0" style={{ color: c }}>
                          [{ORB_DECISIONS[l.i].tag}]
                        </span>
                        <span className="truncate">{ORB_DECISIONS[l.i].text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => chooseRef.current()}
                  className="flex items-center gap-2 rounded-xl border border-quantum/50 bg-quantum/10 px-5 py-2.5 font-tech text-xs tracking-[0.25em] text-quantum transition hover:bg-quantum/25 hover:shadow-[0_0_24px_var(--glow-q)]"
                >
                  <Zap className="h-4 w-4" /> {t("orb.eval")}
                </button>
                <button
                  onClick={() => setAuto((a) => !a)}
                  className="flex items-center gap-2 rounded-xl border border-line/15 px-5 py-2.5 font-tech text-xs tracking-[0.25em] text-ink-3 transition hover:border-plasma/50 hover:text-plasma"
                >
                  {auto ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {auto ? t("orb.pause") : t("orb.resume")}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
