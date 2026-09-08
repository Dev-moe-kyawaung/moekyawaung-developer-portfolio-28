import { useMemo, useRef, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Tilt — 3D perspective tilt + pointer-following spotlight glare.    */
/*  Magnetic — element leans toward the pointer.                       */
/*  Both no-op on coarse pointers.                                     */
/* ------------------------------------------------------------------ */

function useFinePointer() {
  return useMemo(() => typeof window !== "undefined" && window.matchMedia?.("(pointer: fine)").matches, []);
}

interface TiltProps {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
  scale?: number;
}

export function Tilt({ children, className = "", max = 7, glare = true, scale = 1.015 }: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const fine = useFinePointer();

  return (
    <div
      ref={ref}
      className={`tilt relative ${className}`}
      onMouseMove={(e) => {
        if (!fine) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max * 2}deg) rotateY(${(px - 0.5) * max * 2}deg) scale(${scale})`;
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        el.style.setProperty("--go", "1");
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "";
        el.style.setProperty("--go", "0");
      }}
    >
      {children}
      {glare && <div className="tilt-glare pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden />}
    </div>
  );
}

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className = "", strength = 0.32 }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const fine = useFinePointer();
  return (
    <div
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={(e) => {
        if (!fine) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * strength;
        const dy = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}
