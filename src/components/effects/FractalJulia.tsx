import { useRef } from "react";
import { useCanvas } from "../../hooks/useCanvas";
import { QA, mixHex } from "../../lib/theme";

/**
 * Fractal animation — a real escape-time JULIA SET, morphing continuously
 * through the complex plane (c = R·e^{i·θ(t)}) and rendered into a
 * low-resolution buffer that is upscaled for a soft luminous bloom.
 */
export default function FractalJulia({ className = "", intensity = 0.62 }: { className?: string; intensity?: number }) {
  const bufRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<ImageData | null>(null);
  const lutRef = useRef<Uint8ClampedArray | null>(null);
  const lutKey = useRef("");
  const acc = useRef(1);

  const canvasRef = useCanvas((ctx, w, h, t, dt) => {
    if (w < 60 || h < 60) return;

    const BW = 184;
    const BH = Math.max(60, Math.round((BW * h) / w));

    // ---- offscreen buffer ----
    if (!bufRef.current) {
      const c = document.createElement("canvas");
      c.width = BW;
      c.height = BH;
      bufRef.current = c;
    }
    const buf = bufRef.current;
    const bctx = buf.getContext("2d");
    if (!bctx) return;
    if (buf.width !== BW || buf.height !== BH) {
      buf.width = BW;
      buf.height = BH;
      imgRef.current = null;
    }
    if (!imgRef.current) imgRef.current = bctx.createImageData(BW, BH);

    // ---- palette LUT (rebuilt only when the accent theme changes) ----
    const key = QA.q + QA.p + QA.f;
    if (key !== lutKey.current) {
      lutKey.current = key;
      const lut = new Uint8ClampedArray(256 * 3);
      for (let i = 0; i < 256; i++) {
        const k = i / 255;
        const hex = k < 0.5 ? mixHex(QA.q, QA.p, k * 2) : mixHex(QA.p, QA.f, (k - 0.5) * 2);
        const m = hex.match(/\d+/g);
        if (m) {
          lut[i * 3] = Number(m[0]);
          lut[i * 3 + 1] = Number(m[1]);
          lut[i * 3 + 2] = Number(m[2]);
        }
      }
      lutRef.current = lut;
    }
    const lut = lutRef.current as Uint8ClampedArray;
    const img = imgRef.current as ImageData;
    const data = img.data;

    // ---- fractal parameters: c orbits the unit circle, zoom breathes ----
    const theta = t * 0.11;
    const R = 0.7885;
    const cr = R * Math.cos(theta) + 0.06 * Math.sin(t * 0.31);
    const ci = R * Math.sin(theta) + 0.06 * Math.cos(t * 0.24);
    const zoom = 1.32 + 0.1 * Math.sin(t * 0.19);
    const aspect = w / h;
    const MAXI = 40;
    const BAILOUT = 4;

    let p = 0;
    for (let py = 0; py < BH; py++) {
      const z0i = ((py / BH) * 2 - 1) * zoom;
      for (let px = 0; px < BW; px++, p += 4) {
        const z0r = ((px / BW) * 2 - 1) * zoom * aspect;
        let zr = z0r;
        let zi = z0i;
        let i = 0;
        // escape-time iteration z → z² + c
        while (i < MAXI) {
          const zr2 = zr * zr;
          const zi2 = zi * zi;
          if (zr2 + zi2 > BAILOUT) break;
          zi = 2 * zr * zi + ci;
          zr = zr2 - zi2 + cr;
          i++;
        }
        if (i >= MAXI) {
          // interior of the set — deep void
          data[p] = 2;
          data[p + 1] = 0;
          data[p + 2] = 12;
          data[p + 3] = 235;
          continue;
        }
        // smooth iteration count → anti-banded gradient
        const mag2 = zr * zr + zi * zi;
        const nu = i + 1 - Math.log(Math.log(Math.sqrt(mag2)) / Math.log(2)) / Math.log(2);
        const idx = Math.max(0, Math.min(255, Math.round((nu / MAXI) * 255)));
        const o = idx * 3;
        data[p] = lut[o];
        data[p + 1] = lut[o + 1];
        data[p + 2] = lut[o + 2];
        data[p + 3] = 200;
      }
    }
    bctx.putImageData(img, 0, 0);

    // ---- blit (throttled fractal render, cheap blit every frame) ----
    acc.current += dt;
    if (acc.current >= 1 / 30) acc.current = 0;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = intensity;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(buf, 0, 0, w, h);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  });

  return (
    <canvas
      ref={canvasRef}
      className={`fx-fractal pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
