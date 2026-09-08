import { useEffect, useRef } from "react";
import { useCanvas } from "../../hooks/useCanvas";
import { QA, hexA } from "../../lib/theme";

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  ci: number;
  tw: number;
  orbit: number;
  spin: 1 | -1;
}
interface Ring {
  x: number;
  y: number;
  r: number;
  life: number;
}
interface Att {
  fx: number;
  fy: number;
  ph: number;
  sp: number;
}

/** pointer tracking — also emits interference rings on fast motion */
function usePointer(rings: { current: Ring[] }) {
  const pos = useRef({ x: -9999, y: -9999 });
  const prev = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      const p = prev.current;
      if (p && Math.hypot(e.clientX - p.x, e.clientY - p.y) > 28 && rings.current.length < 12) {
        rings.current.push({ x: e.clientX, y: e.clientY, r: 6, life: 0 });
      }
      prev.current = { x: e.clientX, y: e.clientY };
    };
    const out = () => {
      pos.current.x = -9999;
      pos.current.y = -9999;
      prev.current = null;
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", out);
    };
  }, [rings]);
  return pos;
}

/**
 * Particle simulation — a quantum vortex. Three invisible attractors drift
 * through the field; every particle receives a centripetal plus tangential
 * force, so the whole system swirls into orbital shells. Fast pointer motion
 * emits interference rings, and nearby particles are repelled (decoherence).
 */
export default function ParticleField({ className = "", density = 1, links = true, speed = 1, size = 1 }: { className?: string; density?: number; links?: boolean; speed?: number; size?: number }) {
  const ps = useRef<P[] | null>(null);
  const atts = useRef<Att[]>([]);
  const rings = useRef<Ring[]>([]);
  const mouse = usePointer(rings);

  const canvasRef = useCanvas((ctx, w, h, t, dt) => {
    if (!ps.current) {
      const n = Math.min(150, Math.floor(((w * h) / 13000) * density));
      ps.current = Array.from({ length: n }, (_, k) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        r: (0.9 + Math.random() * 1.9) * size,
        ci: k % 4,
        tw: Math.random() * Math.PI * 2,
        orbit: 0.55 + Math.random() * 0.75,
        spin: Math.random() < 0.5 ? 1 : -1,
      }));
    }
    if (atts.current.length === 0) {
      atts.current = [0, 1, 2].map((i) => ({
        fx: 0.5,
        fy: 0.5,
        ph: (i / 3) * Math.PI * 2,
        sp: 0.14 + i * 0.05,
      }));
    }

    const parts = ps.current;
    const LIVE = [QA.q, QA.p, QA.f, QA.n];
    ctx.clearRect(0, 0, w, h);

    // drifting attractors
    const A = atts.current.map((a, i) => ({
      x: w * (0.5 + 0.3 * Math.cos(t * a.sp + a.ph) * (i === 1 ? -1 : 1)),
      y: h * (0.5 + 0.28 * Math.sin(t * a.sp * 1.2 + a.ph)),
    }));

    const m = mouse.current ?? { x: -9999, y: -9999 };

    for (const p of parts) {
      // dominant attractor
      let best = A[0];
      let bd = Infinity;
      for (const a of A) {
        const d = (a.x - p.x) ** 2 + (a.y - p.y) ** 2;
        if (d < bd) {
          bd = d;
          best = a;
        }
      }
      const dx = best.x - p.x;
      const dy = best.y - p.y;
      const dist = Math.max(24, Math.sqrt(bd));
      // centripetal (bind to orbit) + tangential (create swirl)
      const pull = (26 * p.orbit) / dist;
      p.vx += (dx / dist) * pull * speed;
      p.vy += (dy / dist) * pull * speed;
      p.vx += (-dy / dist) * pull * p.spin * 1.9 * speed;
      p.vy += (dx / dist) * pull * p.spin * 1.9 * speed;

      // integrate (semi-implicit, softly damped)
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.x += p.vx * dt * 60 * 0.02 * speed;
      p.y += p.vy * dt * 60 * 0.02 * speed;

      // wrap
      if (p.x < -30) p.x = w + 30;
      if (p.x > w + 30) p.x = -30;
      if (p.y < -30) p.y = h + 30;
      if (p.y > h + 30) p.y = -30;

      // decoherence — pointer repels
      const mdx = p.x - m.x;
      const mdy = p.y - m.y;
      const md2 = mdx * mdx + mdy * mdy;
      if (md2 < 20000 && md2 > 0.01) {
        const md = Math.sqrt(md2);
        const f = (20000 - md2) / 20000;
        p.x += (mdx / md) * f * 2;
        p.y += (mdy / md) * f * 2;
      }
    }

    // entanglement links
    if (links) {
      ctx.lineWidth = 0.6;
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i];
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 12100) {
            ctx.strokeStyle = hexA(QA.p, (1 - Math.sqrt(d2) / 110) * 0.15);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    // interference rings
    for (let i = rings.current.length - 1; i >= 0; i--) {
      const rg = rings.current[i];
      rg.life += dt;
      rg.r += 150 * dt;
      if (rg.life > 1) {
        rings.current.splice(i, 1);
        continue;
      }
      ctx.strokeStyle = hexA(QA.n, (1 - rg.life) * 0.35);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // particles
    for (const p of parts) {
      const col = LIVE[p.ci % LIVE.length];
      const twinkle = 0.45 + 0.55 * Math.abs(Math.sin(t * 1.6 + p.tw));
      ctx.globalAlpha = twinkle;
      ctx.fillStyle = col;
      ctx.shadowColor = col;
      ctx.shadowBlur = 7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }
  });

  return <canvas ref={canvasRef} className={`pointer-events-none fixed inset-0 z-[2] h-full w-full ${className}`} aria-hidden />;
}
