import { useCanvas } from "../../hooks/useCanvas";
import { QA } from "../../lib/theme";

/**
 * Fractal animation — an animated golden-angle fractal tree with glowing
 * bloom nodes, swaying in the quantum breeze. Theme-aware palette.
 */
export default function FractalBloom({ className = "" }: { className?: string }) {
  const canvasRef = useCanvas((ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h);
    if (w < 40) return;

    const PAL = [QA.q, QA.p, QA.f, QA.n, QA.indigo];
    const cx = w * 0.5;
    const baseY = h + 26;
    const seedLen = Math.min(w, h) * 0.24;

    const branch = (x: number, y: number, len: number, ang: number, depth: number) => {
      if (depth <= 0 || len < 2.4) return;
      const sway = Math.sin(t * 1.1 + depth * 0.83 + x * 0.008) * 0.09;
      const a = ang + sway;
      const nx = x + Math.cos(a) * len;
      const ny = y + Math.sin(a) * len;

      const idx = depth % PAL.length;
      const col = PAL[idx];
      const alpha = 0.16 + (1 - depth / 10) * 0.5;

      // glow under-stroke
      ctx.strokeStyle = col;
      ctx.globalAlpha = alpha * 0.35;
      ctx.lineWidth = Math.max(1, len * 0.14);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      ctx.globalAlpha = alpha;
      ctx.lineWidth = Math.max(0.6, len * 0.055);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      const spread = 0.34 + 0.2 * Math.sin(t * 0.55 + depth * 1.7);
      const grow = Math.min(1, t * 0.55 - depth * 0.06);
      const lenScale = 0.7 + Math.max(0, grow) * 0.06;

      if (depth === 1) {
        // bloom node at the tip
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = col;
        ctx.shadowColor = col;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(nx, ny, 1.8 + Math.sin(t * 3 + nx) * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        return;
      }

      branch(nx, ny, len * 0.74 * lenScale, a - spread, depth - 1);
      branch(nx, ny, len * 0.74 * lenScale, a + spread, depth - 1);

      // occasional side twig for organic fullness
      if (depth % 3 === 0 && Math.sin(t * 0.9 + depth * 5.2) > 0.55) {
        branch(nx, ny, len * 0.5, a + spread * 0.5 + 0.5, depth - 2);
      }
    };

    branch(cx, baseY, seedLen, -Math.PI / 2 + Math.sin(t * 0.24) * 0.1, 9);
    ctx.globalAlpha = 1;
  });

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden />;
}
