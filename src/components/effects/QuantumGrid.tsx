import { useRef } from "react";
import { useCanvas } from "../../hooks/useCanvas";
import { QA, hexA } from "../../lib/theme";

interface Spark {
  col: number;
  z: number; // 1 (near) → 0 (vanishing point)
  speed: number;
  alt: boolean;
}

/**
 * Shifting matrix grid — a 3D perspective grid floor that sways, slides and
 * fires data sparks toward the vanishing point. Theme-aware.
 */
export default function QuantumGrid({ className = "" }: { className?: string }) {
  const sparks = useRef<Spark[] | null>(null);

  const canvasRef = useCanvas((ctx, w, h, t, dt) => {
    ctx.clearRect(0, 0, w, h);
    if (w < 60 || h < 60) return;

    const horizon = h * 0.34 + Math.sin(t * 0.35) * h * 0.012;
    const vpx = w / 2 + Math.sin(t * 0.4) * w * 0.015;

    const NROWS = 13;
    const NCOLS = 17;

    const zAt = (i: number) => (i / NROWS) ** 2.15;
    const rowY = (i: number) => horizon + (h - horizon) * zAt(i);

    // ---- chromatic underlay ----
    const drawGrid = (offsetX: number, alphaScale: number, color: string, lineW: number) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineW;
      for (let i = 0; i <= NROWS; i++) {
        const y = rowY(i);
        const depthAlpha = 0.08 + (i / NROWS) * 0.5;
        const pulse = 0.75 + 0.25 * Math.sin(t * 1.6 + i * 0.9);
        ctx.globalAlpha = depthAlpha * pulse * alphaScale;
        ctx.beginPath();
        ctx.moveTo(-10, y);
        ctx.lineTo(w + 10, y);
        ctx.stroke();
      }
      for (let j = 0; j <= NCOLS; j++) {
        const f = j / NCOLS - 0.5;
        const shift = Math.sin(t * 0.5 + j * 1.31) * w * 0.016 + offsetX;
        const bx = w / 2 + f * w * 1.9 + shift;
        const depthAlpha = 0.1 + 0.5 * (1 - Math.abs(f) * 0.9);
        ctx.globalAlpha = depthAlpha * alphaScale;
        ctx.beginPath();
        ctx.moveTo(vpx, horizon);
        ctx.lineTo(bx, h + 30);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    drawGrid(Math.sin(t * 0.22) * w * 0.03, 0.35, QA.p, 2.4);
    drawGrid(Math.sin(t * 0.22 + 1.2) * w * 0.03, 0.85, QA.q, 1);

    // ---- shifting horizontal sheen: a bright "wavefront" row moving outward ----
    const wave = (t * 26) % 1;
    const wy = horizon + (h - horizon) * wave ** 2.15;
    const wg = ctx.createLinearGradient(0, wy - 40, 0, wy + 60);
    wg.addColorStop(0, hexA(QA.q, 0));
    wg.addColorStop(0.5, hexA(QA.n, 0.28));
    wg.addColorStop(1, hexA(QA.q, 0));
    ctx.fillStyle = wg;
    ctx.fillRect(0, wy - 40, w, 100);

    // ---- data sparks traveling to the vanishing point ----
    if (!sparks.current) {
      sparks.current = Array.from({ length: 9 }, () => ({
        col: Math.floor(Math.random() * NCOLS),
        z: Math.random(),
        speed: 0.05 + Math.random() * 0.12,
        alt: Math.random() < 0.5,
      }));
    }
    for (const s of sparks.current) {
      s.z -= s.speed * dt;
      if (s.z < 0.03) {
        s.z = 0.97 + Math.random() * 0.03;
        s.col = Math.floor(Math.random() * NCOLS);
        s.alt = Math.random() < 0.4;
      }
      const hue = s.alt ? QA.f : QA.q;
      const f = s.col / NCOLS - 0.5;
      const bx = w / 2 + f * w * 1.9 + Math.sin(t * 0.5 + s.col * 1.31) * w * 0.016;
      const x = vpx + (bx - vpx) * s.z;
      const y = horizon + (h - horizon) * (s.z ** 2.15);
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = hue;
      ctx.shadowColor = hue;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 1;
  });

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden />;
}
