/* ------------------------------------------------------------------ */
/*  Sound design — tiny WebAudio synth. Off by default, opt-in.        */
/* ------------------------------------------------------------------ */

let ctx: AudioContext | null = null;
let enabled = false;
let lastHover: Element | null = null;

function ensure(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, dur: number, gain: number, type: OscillatorType = "sine", slideTo?: number) {
  const ac = ensure();
  if (!ac) return;
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, ac.currentTime);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, ac.currentTime + dur);
  g.gain.setValueAtTime(0.0001, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(gain, ac.currentTime + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  o.connect(g).connect(ac.destination);
  o.start();
  o.stop(ac.currentTime + dur + 0.02);
}

function whoosh(dur = 0.7) {
  const ac = ensure();
  if (!ac) return;
  const len = Math.floor(ac.sampleRate * dur);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = ac.createBufferSource();
  src.buffer = buf;
  const f = ac.createBiquadFilter();
  f.type = "bandpass";
  f.Q.value = 1.2;
  f.frequency.setValueAtTime(200, ac.currentTime);
  f.frequency.exponentialRampToValueAtTime(3200, ac.currentTime + dur * 0.6);
  f.frequency.exponentialRampToValueAtTime(300, ac.currentTime + dur);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.09, ac.currentTime + 0.08);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  src.connect(f).connect(g).connect(ac.destination);
  src.start();
}

export const sfx = {
  tick: () => enabled && tone(1500, 0.03, 0.012, "sine"),
  click: () => {
    if (!enabled) return;
    tone(620, 0.07, 0.03, "triangle", 900);
  },
  confirm: () => {
    if (!enabled) return;
    tone(520, 0.08, 0.03, "sine", 780);
    window.setTimeout(() => tone(780, 0.12, 0.03, "sine", 1040), 70);
  },
  key: () => enabled && tone(2200 + Math.random() * 300, 0.02, 0.008, "square"),
  shift: () => {
    if (!enabled) return;
    whoosh(0.8);
    window.setTimeout(() => tone(440, 0.3, 0.035, "sine", 880), 380);
  },
};

export function soundEnabled() {
  return enabled;
}

export function setSound(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem("mka-sound", on ? "1" : "0");
  } catch {
    /* ignore */
  }
  if (on) {
    ensure();
    sfx.confirm();
  }
  window.dispatchEvent(new CustomEvent("mka:sound", { detail: on }));
}

let inited = false;
export function initSound() {
  if (inited) return;
  inited = true;
  try {
    enabled = localStorage.getItem("mka-sound") === "1";
  } catch {
    enabled = false;
  }
  document.addEventListener("click", (e) => {
    if (!enabled) return;
    const el = (e.target as HTMLElement | null)?.closest?.("a,button");
    if (el) sfx.click();
  });
  document.addEventListener("mouseover", (e) => {
    if (!enabled) return;
    const el = (e.target as HTMLElement | null)?.closest?.("a,button");
    if (el && el !== lastHover) {
      lastHover = el;
      sfx.tick();
    }
  });
}
