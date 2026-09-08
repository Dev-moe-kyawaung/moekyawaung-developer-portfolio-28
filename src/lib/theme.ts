/* ------------------------------------------------------------------ */
/*  Quantum Matrix — live accent store + theme + power controls.       */
/*  Canvas systems read QA.* every frame, so theme swaps re-tint       */
/*  every particle, glyph, pulse and shockwave instantly.              */
/* ------------------------------------------------------------------ */

export type ThemeName = "void" | "nebula" | "matrix" | "solar";
export const THEME_ORDER: ThemeName[] = ["void", "nebula", "matrix", "solar"];
export const THEME_META: Record<ThemeName, { label: string; a: string; b: string }> = {
  void: { label: "Void Cyan", a: "#22d3ee", b: "#a78bfa" },
  nebula: { label: "Nebula Magenta", a: "#e879f9", b: "#818cf8" },
  matrix: { label: "Matrix Emerald", a: "#4ade80", b: "#22d3ee" },
  solar: { label: "Solar Amber", a: "#fbbf24", b: "#fb7185" },
};

/** live accents — mutated in place; render loops read these directly */
export const QA = {
  q: "#22d3ee",
  p: "#a78bfa",
  f: "#e879f9",
  n: "#5eead4",
  indigo: "#818cf8",
  pink: "#f472b6",
  amber: "#fbbf24",
  bg: "#02000d",
  ink: "#ffffff",
};

export function hexA(hex: string, alpha: number): string {
  const h = hex.trim().replace("#", "");
  if (h.length !== 3 && h.length !== 6) return hex;
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

/** mix two hex colors — used for fractal palettes */
export function mixHex(a: string, b: string, k: number): string {
  const pa = a.replace("#", "");
  const pb = b.replace("#", "");
  const na = parseInt(pa.length === 3 ? pa.split("").map((c) => c + c).join("") : pa, 16);
  const nb = parseInt(pb.length === 3 ? pb.split("").map((c) => c + c).join("") : pb, 16);
  const r = Math.round((((na >> 16) & 255) * (1 - k) + ((nb >> 16) & 255) * k));
  const g = Math.round((((na >> 8) & 255) * (1 - k) + ((nb >> 8) & 255) * k));
  const bl = Math.round(((na & 255) * (1 - k) + (nb & 255) * k));
  return `rgb(${r},${g},${bl})`;
}

function refreshQA() {
  try {
    const cs = getComputedStyle(document.documentElement);
    const get = (k: string, fb: string) => cs.getPropertyValue(k).trim() || fb;
    QA.q = get("--color-quantum", QA.q);
    QA.p = get("--color-plasma", QA.p);
    QA.f = get("--color-pulse", QA.f);
    QA.n = get("--color-neon", QA.n);
    QA.bg = get("--color-void", QA.bg);
    QA.ink = get("--color-ink", QA.ink);
  } catch {
    /* no-op */
  }
}

const store = {
  get(k: string) {
    try { return localStorage.getItem(k); } catch { return null; }
  },
  set(k: string, v: string) {
    try { localStorage.setItem(k, v); } catch { /* ignore */ }
  },
};

export function currentTheme(): ThemeName {
  const t = document.documentElement.dataset.theme as ThemeName | undefined;
  return t && THEME_ORDER.includes(t) ? t : "void";
}

export function applyTheme(name: ThemeName) {
  if (name === "void") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = name;
  store.set("mka-theme", name);
  refreshQA();
  window.dispatchEvent(new CustomEvent("mka:theme", { detail: name }));
}

export function initTheme(): ThemeName {
  const s = store.get("mka-theme") as ThemeName | null;
  const saved = s && THEME_ORDER.includes(s) ? s : "void";
  applyTheme(saved);
  return saved;
}

export function cycleTheme(): ThemeName {
  const next = THEME_ORDER[(THEME_ORDER.indexOf(currentTheme()) + 1) % THEME_ORDER.length];
  applyTheme(next);
  return next;
}

/* ---------------- low-power mode ---------------- */

export function isLowPower(): boolean {
  return document.documentElement.dataset.power === "low";
}

export function setLowPower(on: boolean) {
  if (on) document.documentElement.dataset.power = "low";
  else delete document.documentElement.dataset.power;
  store.set("mka-power", on ? "low" : "full");
  window.dispatchEvent(new CustomEvent("mka:power", { detail: on }));
}

export function initPower(): boolean {
  let low = store.get("mka-power") === "low";
  if (!low && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) low = true;
  setLowPower(low);
  return low;
}
