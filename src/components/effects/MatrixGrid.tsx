import { useEffect, useRef } from "react";
import { useCanvas } from "../../hooks/useCanvas";
import { QA, hexA } from "../../lib/theme";

/**
 * Shifting matrix grid — a full-viewport cell lattice whose activation
 * cascades between neighbours (the observer's pointer seeds new energy),
 * layered over a faint perspective horizon that slides toward a
 * drifting vanishing point.
 */
export default function MatrixGrid({ className = "" }: { className?: string }) {
  const energy = useRef<Float32Array | null>(null);
  const dims = useRef({ cols: 0, rows: 0, cell: 26 });
  const ptr = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      ptr.current.x = e.clientX;
      ptr.current.y = e.clientY;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const canvasRef = useCanvas((ctx, w, h, t, dt) => {
    ctx.clearRect(0, 0, w, h);
    if (w < 60 || h < 60) return;

    const cell = dims.current.cell;
    const cols = Math.ceil(w / cell) + 1;
    const rows = Math.ceil(h / cell) + 1;
    if (!energy.current || dims.current.cols !== cols || dims.current.rows !== rows) {
      dims.current = { cols, rows, cell };
      energy.current = new Float32Array(cols * rows);
    }
    const E = energy.current;

    // ---- seed + cascade energy ----
    const seedRate = 0.0016;
    for (let cy = 0; cy < rows; cy++) {
      for (let cx = 0; cx < cols; cx++) {
        const i = cy * cols + cx;
        // decay
        E[i] *= 1 - Math.min(0.5, dt * 2.1);
        if (E[i] < 0.002) E[i] = 0;
        // spontaneous activation
        if (Math.random() < seedRate) E[i] = 0.75 + Math.random() * 0.25;
      }
    }

    // observer effect — the pointer illuminates nearby cells
    const px = ptr.current.x / cell;
    const py = ptr.current.y / cell;
    if (px > -1 && py > -1) {
      const rad = 3;
      for (let cy = Math.max(0, py - rad) | 0; cy < Math.min(rows, py + rad); cy++) {
        for (let cx = Math.max(0, px - rad) | 0; cx < Math.min(cols, px + rad); cx++) {
          const d = Math.hypot(cx - px, cy - py);
          if (d < rad) {
            const i = cy * cols + cx;
            E[i] = Math.min(1, E[i] + (1 - d / rad) * dt * 2.4);
          }
        }
      }
    }

    // ---- draw lattice ----
    const c0 = cols - 1;
    ctx.globalCompositeOperation = "lighter";
    for (let cy = 0; cy < rows; cy++) {
      for (let cx = 0; cx < cols; cx++) {
        const i = cy * cols + cx;
        const e = E[i];
        if (e < 0.02) continue;
        const hue = (cx + cy) % 5 === 0 ? QA.f : (cx + cy) % 3 === 0 ? QA.p : QA.q;
        const x = cx * cell;
        const y = cy * cell;
        const s = cell - 2;
        ctx.fillStyle = hexA(hue, e * 0.34);
        ctx.fillRect(x + 1, y + 1, s, s);
        if (e > 0.55) {
          ctx.fillStyle = hexA(hue, (e - 0.55) * 1.6);
          ctx.fillRect(x + 1, y + 1, s, s);
          ctx.fillStyle = hexA(QA.ink, e * 0.5);
          ctx.fillRect(x + cell / 2 - 1, y + cell / 2 - 1, 2, 2);
        }
        // cascade: push energy to the right & down neighbours
        if (e > 0.72) {
          if (cx + 1 < c0 + 1) E[i + 1] = Math.max(E[i + 1], e * 0.55);
          if (cy + 1 < rows) E[i + cols] = Math.max(E[i + cols], e * 0.5);
        }
      }
    }
    ctx.globalCompositeOperation = "source-over";

    // ---- perspective horizon ----
    const horizon = h * 0.82 + Math.sin(t * 0.3) * 6;
    const vpx = w / 2 + Math.sin(t * 0.27) * w * 0.04;
    const NROWS = 9;
    for (let i = 0; i <= NROWS; i++) {
      const z = (i / NROWS) ** 2.3;
      const y = horizon + (h - horizon) * z;
      ctx.strokeStyle = hexA(QA.q, (0.05 + z * 0.16) * (0.7 + 0.3 * Math.sin(t * 1.4 + i)));
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    const NCOLS = 15;
    for (let j = 0; j <= NCOLS; j++) {
      const f = j / NCOLS - 0.5;
      const bx = w / 2 + f * w * 2.1 + Math.sin(t * 0.4 + j * 1.2) * w * 0.02;
      ctx.strokeStyle = hexA(QA.p, 0.05 + 0.12 * (1 - Math.abs(f)));
      ctx.beginPath();
      ctx.moveTo(vpx, horizon);
      ctx.lineTo(bx, h + 40);
      ctx.stroke();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className={`fx-lattice pointer-events-none fixed inset-0 z-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
