import { useRef } from "react";
import { useCanvas } from "../../hooks/useCanvas";
import { QA, hexA } from "../../lib/theme";

const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF<>/\\+=*#%&{}[]|·ψΩ";

interface Drop {
  x: number;
  y: number;
  speed: number;
  size: number;
  bright: boolean;
  alpha: number;
}

/**
 * Cascading data streams — three parallax depth layers of falling glyphs.
 * Far layers are dense and dim, near layers are sparse with blazing heads
 * and mutation trails. Uses delta time so speed is frame-rate independent.
 */
export default function MatrixRain({ className = "" }: { className?: string }) {
  const layers = useRef<{ drops: Drop[]; size: number; alpha: number; gap: number }[] | null>(null);

  const canvasRef = useCanvas((ctx, w, h, _t, dt) => {
    if (!layers.current) {
      // far → near
      layers.current = [
        { size: 11, alpha: 0.2, gap: 4, drops: [] },
        { size: 15, alpha: 0.42, gap: 2, drops: [] },
        { size: 21, alpha: 0.75, gap: 5, drops: [] },
      ];
    }

    ctx.fillStyle = hexA(QA.bg, 0.09);
    ctx.fillRect(0, 0, w, h);
    ctx.textAlign = "center";

    for (const layer of layers.current) {
      const cols = Math.ceil(w / layer.size);
      if (layer.drops.length !== cols) {
        layer.drops = Array.from({ length: cols }, (_, i) => ({
          x: i * layer.size,
          y: -Math.random() * h,
          speed: (46 + Math.random() * 120) * (layer.size / 15),
          size: layer.size + Math.random() * 4,
          bright: Math.random() < 0.1,
          alpha: layer.alpha,
        }));
      }
      for (const d of layer.drops) {
        d.y += d.speed * dt;
        if (d.y - 80 > h) {
          d.y = -Math.random() * 120;
          d.speed = (46 + Math.random() * 130) * (layer.size / 15);
          d.bright = Math.random() < 0.1;
        }
        const g = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        ctx.font = `${d.size}px "Share Tech Mono", monospace`;
        if (d.bright) {
          // blazing leading glyph
          ctx.fillStyle = hexA(QA.ink, 0.92 * (d.alpha / layer.alpha));
          ctx.shadowColor = QA.q;
          ctx.shadowBlur = 10;
          ctx.fillText(g, d.x + layer.size / 2, d.y);
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle =
            Math.random() < 0.1 ? hexA(QA.n, d.alpha * 1.7) : hexA(QA.q, d.alpha);
          ctx.fillText(g, d.x + layer.size / 2, d.y);
        }
      }
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className={`fx-rain pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-40 ${className}`}
      aria-hidden
    />
  );
}
