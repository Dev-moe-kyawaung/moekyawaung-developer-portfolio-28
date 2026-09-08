import { useEffect, useRef } from "react";
import { QA } from "../lib/theme";

/* ------------------------------------------------------------------ */
/*  Quantum cursor — nucleus dot, lerped tractor ring and spark trail. */
/*  Desktop precise-pointers only; auto-disabled on touch.             */
/* ------------------------------------------------------------------ */

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
}

export default function Cursor() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia?.("(pointer: fine)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    document.documentElement.classList.add("has-cursor");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const pos = { x: w / 2, y: h / 2 };
    const ring = { x: w / 2, y: h / 2 };
    let down = false;
    let hovering = false;
    let inside = false;
    let angle = 0;
    const sparks: Spark[] = [];
    let raf = 0;
    let last = performance.now();

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      inside = true;
      const t = e.target as HTMLElement | null;
      hovering = !!t?.closest?.("a,button,[role='button'],input,textarea");
      if (sparks.length < 90 && Math.hypot(e.movementX, e.movementY) > 2) {
        sparks.push({
          x: pos.x, y: pos.y,
          vx: -e.movementX * 0.06 + (Math.random() - 0.5) * 1.4,
          vy: -e.movementY * 0.06 + (Math.random() - 0.5) * 1.4,
          life: 0, max: 0.4 + Math.random() * 0.4,
        });
      }
    };
    const onDown = () => {
      down = true;
      for (let i = 0; i < 14; i++) {
        const a = Math.random() * Math.PI * 2;
        sparks.push({
          x: pos.x, y: pos.y,
          vx: Math.cos(a) * (1 + Math.random() * 3),
          vy: Math.sin(a) * (1 + Math.random() * 3),
          life: 0, max: 0.5 + Math.random() * 0.4,
        });
      }
    };
    const onUp = () => { down = false; };
    const onLeave = () => { inside = false; };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      angle += dt * (hovering ? 5 : 2.4);
      ctx.clearRect(0, 0, w, h);
      if (!inside || document.hidden) return;

      ring.x += (pos.x - ring.x) * Math.min(1, dt * 14);
      ring.y += (pos.y - ring.y) * Math.min(1, dt * 14);

      // trail sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += dt;
        if (s.life >= s.max) {
          sparks.splice(i, 1);
          continue;
        }
        const k = 1 - s.life / s.max;
        s.x += s.vx;
        s.y += s.vy;
        ctx.globalAlpha = k * 0.8;
        ctx.fillStyle = QA.q;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.4 * k + 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const R = hovering ? 17 : 11;

      // tractor ring (dashed, rotating)
      ctx.save();
      ctx.translate(ring.x, ring.y);
      ctx.rotate(angle);
      ctx.strokeStyle = hovering ? QA.f : QA.q;
      ctx.globalAlpha = 0.9;
      ctx.lineWidth = 1.3;
      ctx.setLineDash([5, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      // orbit satellite
      ctx.fillStyle = hovering ? QA.f : QA.n;
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(R, 0, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // nucleus dot
      ctx.fillStyle = QA.ink;
      ctx.shadowColor = QA.q;
      ctx.shadowBlur = down ? 16 : 9;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, down ? 2.4 : 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // crosshair ticks when hovering interactives
      if (hovering) {
        ctx.strokeStyle = QA.q;
        ctx.globalAlpha = 0.8;
        ctx.lineWidth = 1;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
          ctx.beginPath();
          ctx.moveTo(pos.x + dx * (R + 7), pos.y + dy * (R + 7));
          ctx.lineTo(pos.x + dx * (R + 12), pos.y + dy * (R + 12));
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[95] hidden [@media(pointer:fine)]:block"
      aria-hidden
    />
  );
}
