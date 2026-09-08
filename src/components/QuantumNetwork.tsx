import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ScanLine } from "lucide-react";
import { useCanvas } from "../hooks/useCanvas";
import Reveal from "./Reveal";
import { useLang } from "../lib/i18n";
import { QA, hexA } from "../lib/theme";
import { PROJECTS, IMAGES, type Project } from "../data/profile";

/* ------------------------------------------------------------------ */
/*  Quantum Node Network — project cards behave like quantum nodes:    */
/*  curved entanglement links carry traveling data pulses, nodes sit   */
/*  in superposition until observed, and observation fires a           */
/*  measurement-collapse shockwave across the graph.                   */
/* ------------------------------------------------------------------ */

/** fractional layout (percent of container) for the 12 ring nodes */
const POS: [number, number][] = [
  [8, 34], [19, 14], [37, 7], [58, 6], [76, 13], [89, 30],
  [93, 55], [84, 76], [66, 90], [45, 93], [24, 88], [11, 66],
];
const CORE_POS: [number, number] = [50.5, 49];

interface Edge {
  a: number; // 0 = core, 1..n = project index
  b: number;
  kind: "core" | "ring" | "chord";
  i: number;
}

const EDGES: Edge[] = (() => {
  const n = PROJECTS.length;
  const list: Edge[] = [];
  for (let i = 0; i < n; i++) {
    list.push({ a: 0, b: i + 1, kind: "core", i });
    list.push({ a: i + 1, b: ((i + 1) % n) + 1, kind: "ring", i });
  }
  for (let i = 0; i < n; i += 2) {
    list.push({ a: i + 1, b: ((i + 5) % n) + 1, kind: "chord", i });
  }
  return list;
})();

export default function QuantumNetwork() {
  const { t } = useLang();
  const [selected, setSelected] = useState<Project>(PROJECTS[0]);
  const hoverRef = useRef<number>(-2);
  const selectedRef = useRef<number>(1);
  selectedRef.current = selected.id;
  const waves = useRef<{ x: number; y: number; r: number; max: number; life: number; color: string }[]>([]);

  // external selection (command palette / terminal)
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<number>).detail;
      const p = PROJECTS.find((x) => x.id === id);
      if (p) setSelected(p);
    };
    window.addEventListener("mka:select-project", onSelect);
    return () => window.removeEventListener("mka:select-project", onSelect);
  }, []);

  const canvasRef = useCanvas((ctx, w, h, tt, dt) => {
    ctx.clearRect(0, 0, w, h);
    if (w < 60 || h < 60) return;

    const clamp = (v: number, max: number, pad: number) =>
      Math.min(Math.max(v, pad), Math.max(pad + 4, max - pad));
    const pt = (fx: number, fy: number) => ({
      x: clamp((w * fx) / 100, w, 78),
      y: clamp((h * fy) / 100, h, 66),
    });

    const cx = w / 2;
    const cy = h / 2;
    const core = pt(CORE_POS[0], CORE_POS[1]);
    const pts = [core, ...PROJECTS.map((p) => pt(POS[p.id - 1][0], POS[p.id - 1][1]))];
    const hover = hoverRef.current;
    const sel = selectedRef.current;

    /** curved link: control point pushed away from the graph centre */
    const bend = (a: { x: number; y: number }, b: { x: number; y: number }) => {
      const mx = (a.x + b.x) / 2 - cx;
      const my = (a.y + b.y) / 2 - cy;
      const len = Math.hypot(mx, my) || 1;
      const push = 0.18;
      return { cx: (a.x + b.x) / 2 + (mx / len) * len * push, cy: (a.y + b.y) / 2 + (my / len) * len * push };
    };

    // ---- measurement-collapse shockwaves ----
    for (let i = waves.current.length - 1; i >= 0; i--) {
      const wv = waves.current[i];
      wv.life += dt;
      wv.r += (wv.max - wv.r) * Math.min(1, dt * 3.4);
      if (wv.life > 1.15) {
        waves.current.splice(i, 1);
        continue;
      }
      const k = wv.life / 1.15;
      ctx.strokeStyle = hexA(wv.color, (1 - k) * 0.6);
      ctx.lineWidth = 2.2 * (1 - k) + 0.4;
      ctx.beginPath();
      ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2);
      ctx.stroke();
      // secondary echo
      ctx.strokeStyle = hexA(wv.color, (1 - k) * 0.22);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(wv.x, wv.y, wv.r * 0.72, 0, Math.PI * 2);
      ctx.stroke();
    }

    // ---- entanglement links ----
    for (const e of EDGES) {
      const pa = pts[e.a];
      const pb = pts[e.b];
      const c = bend(pa, pb);
      const touchesHover = hover === e.a || hover === e.b;
      const touchesSel = e.a === sel || e.b === sel;

      let alpha = 0.15;
      let width = 0.8;
      let color = "rgba(148,163,255,1)";
      let dash: number[] | undefined;

      if (touchesHover) {
        const other = e.a === hover ? e.b : e.a;
        color = other === 0 ? QA.q : PROJECTS[other - 1].color;
        alpha = 0.95;
        width = 1.7;
      } else if (touchesSel) {
        color = e.kind === "chord" ? QA.p : PROJECTS[Math.max(sel - 1, 0)].color;
        alpha = 0.55;
        width = 1.25;
      } else {
        color = e.kind === "chord" ? QA.p : e.kind === "ring" ? "rgba(148,163,255,1)" : QA.q;
        alpha = e.kind === "chord" ? 0.07 : 0.18;
      }
      if (e.kind === "chord" && !touchesHover) dash = [2, 7];

      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.setLineDash(dash ?? []);
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.quadraticCurveTo(c.cx, c.cy, pb.x, pb.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // ---- data pulses riding the curve ----
      if (e.kind !== "chord") {
        const speed = e.kind === "core" ? 0.17 : 0.12;
        const phase = (tt * speed + e.i * 0.09 + (e.kind === "ring" ? 0.4 : 0)) % 1;
        const inv = 1 - phase;
        const px = inv * inv * pa.x + 2 * inv * phase * c.cx + phase * phase * pb.x;
        const py = inv * inv * pa.y + 2 * inv * phase * c.cy + phase * phase * pb.y;
        const glow = Math.sin(phase * Math.PI);
        ctx.globalAlpha = (touchesHover ? 1 : touchesSel ? 0.7 : 0.42) * (0.35 + glow * 0.65);
        ctx.fillStyle = touchesHover || touchesSel ? color : QA.n;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 9;
        ctx.beginPath();
        ctx.arc(px, py, touchesHover ? 2.8 : 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // faint comet tail
        if (touchesHover || touchesSel) {
          for (let k = 1; k <= 3; k++) {
            const tp = Math.max(0, phase - k * 0.035);
            const ti = 1 - tp;
            const tx = ti * ti * pa.x + 2 * ti * tp * c.cx + tp * tp * pb.x;
            const ty = ti * ti * pa.y + 2 * ti * tp * c.cy + tp * tp * pb.y;
            ctx.globalAlpha = (0.5 - k * 0.13) * glow;
            ctx.beginPath();
            ctx.arc(tx, ty, 1.6 - k * 0.3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }
    ctx.globalAlpha = 1;
  });

  const observe = (p: Project) => {
    setSelected(p);
    // fire the collapse wave at the node's screen position
    const el = document.getElementById("projects");
    const box = el?.getBoundingClientRect();
    if (!box) return;
    const [fx, fy] = p.id === 0 ? CORE_POS : POS[p.id - 1];
    waves.current.push({
      x: (box.width * fx) / 100,
      y: (box.height * fy) / 100,
      r: 12,
      max: 190,
      life: 0,
      color: p.color,
    });
  };

  const setHover = (id: number | null) => {
    hoverRef.current = id === null ? -2 : id;
  };
  const SelIcon = selected.icon;

  return (
    <section id="projects" className="relative z-10 overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,29,149,0.18),transparent_62%)]" />
      <div className="pointer-events-none absolute left-[8%] top-16 h-72 w-72 rounded-full bg-quantum/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-10 right-[6%] h-72 w-72 rounded-full bg-pulse/10 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal>
          <p className="font-tech text-xs tracking-[0.4em] text-quantum/80">// 03 · QUANTUM NODES</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("sec.nodes.a")} <span className="grad-text">{t("sec.nodes.b")}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-3/85">
            Each shipped app is a node held in superposition. Hover to trace its entanglements, click
            to observe — observation collapses the wavefunction and fires a shockwave through the graph.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass relative mt-10 overflow-hidden rounded-3xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/10 px-4 py-3 font-tech text-[10px] tracking-[0.3em] text-ink-4 sm:px-6">
              <span>
                <span className="text-quantum">QNET</span> · 13 NODES · 30 LINKS
              </span>
              <span className="hidden items-center gap-2 sm:flex">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-neon" />
                ENTROPY 0.77 · OBSERVERS 1
              </span>
            </div>

            <div className="relative h-[560px] sm:h-[660px]">
              <canvas ref={canvasRef} className="absolute inset-0 z-[1] h-full w-full" aria-hidden />

              {/* core node */}
              <button
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${CORE_POS[0]}%`, top: `${CORE_POS[1]}%` }}
                onMouseEnter={() => setHover(0)}
                onMouseLeave={() => setHover(null)}
                onClick={() => observe(PROJECTS[0])}
                title="MKA · Core"
              >
                <span className="relative block h-24 w-24 sm:h-28 sm:w-28">
                  <span className="ring-ping absolute inset-0 rounded-full border border-quantum/50" />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-quantum/40 via-plasma/40 to-pulse/40 blur-md" />
                  <img
                    src={IMAGES.hero}
                    alt="Moe Kyaw Aung"
                    className="relative h-full w-full rounded-full border-2 border-quantum/70 object-cover shadow-[0_0_28px_var(--glow-q)]"
                  />
                  <span className="glass absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 font-tech text-[8px] tracking-[0.25em] text-quantum">
                    MKA·CORE
                  </span>
                </span>
              </button>

              {/* project nodes — held in superposition until hovered/selected */}
              {PROJECTS.map((p, i) => {
                const [fx, fy] = POS[p.id - 1];
                const active = selected.id === p.id;
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${fx}%`, top: `${fy}%` }}
                    onMouseEnter={() => setHover(p.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => observe(p)}
                    aria-label={p.name}
                  >
                    <span
                      className={`node-card superpose glass relative flex w-[104px] flex-col items-center gap-1 rounded-2xl border px-2 py-2.5 sm:w-[132px] ${
                        active ? "" : "opacity-90"
                      }`}
                      style={{
                        borderColor: active ? p.color : "rgba(148,163,255,0.16)",
                        boxShadow: active ? `0 0 26px ${p.color}55, inset 0 0 14px ${p.color}18` : "none",
                        animationDelay: `${(i % 6) * 0.42}s`,
                        animationDuration: `${4 + (i % 4) * 0.7}s`,
                      }}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: p.color }} />
                      <span className="font-display max-w-full truncate text-[9px] font-semibold tracking-wide text-ink-1 sm:text-[11px]">
                        {p.name}
                      </span>
                      <span className="font-tech text-[7px] tracking-[0.2em] sm:text-[8px]" style={{ color: p.color }}>
                        {p.state}
                      </span>
                    </span>
                  </button>
                );
              })}

              <span className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap font-tech text-[9px] tracking-[0.35em] text-ink-5">
                <ScanLine className="h-3.5 w-3.5 text-quantum/70" /> {t("nodes.hint")}
              </span>
            </div>
          </div>
        </Reveal>

        {/* observer console */}
        <Reveal delay={160}>
          <div key={selected.id} className="anim-pop glass mt-6 flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-4">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border"
                style={{ borderColor: `${selected.color}55`, background: `${selected.color}12` }}
              >
                <SelIcon className="h-7 w-7" style={{ color: selected.color }} />
              </span>
              <div>
                <p className="font-tech text-[9px] tracking-[0.3em] text-ink-5">{t("nodes.observed")}</p>
                <h3 className="font-display mt-1 text-lg font-bold text-ink">{selected.name}</h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-4">{selected.blurb}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selected.tags.map((tg) => (
                    <span key={tg} className="rounded-full border border-line/10 bg-line/5 px-2 py-0.5 font-tech text-[9px] tracking-widest text-ink-3">
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
              <span
                className="font-tech rounded-full border px-3 py-1 text-[9px] tracking-[0.25em]"
                style={{ color: selected.color, borderColor: `${selected.color}55`, background: `${selected.color}12` }}
              >
                {t("nodes.state")} {selected.state}
              </span>
              <a
                href={selected.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-xl border border-quantum/50 bg-quantum/10 px-4 py-2 font-tech text-[10px] tracking-[0.25em] text-quantum transition hover:bg-quantum/25 hover:shadow-[0_0_20px_var(--glow-q)]"
              >
                {t("nodes.repo")} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
