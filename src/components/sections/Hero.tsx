import { useEffect, useState } from "react";
import { MapPin, Hammer, ChevronDown, Atom, Sparkles, ArrowUpRight } from "lucide-react";
import FractalBloom from "../effects/FractalBloom";
import FractalJulia from "../effects/FractalJulia";
import Reveal from "../Reveal";
import { Magnetic } from "../Tilt";
import { useLang } from "../../lib/i18n";
import { PROFILE, TYPING_ROLES, SOCIALS, IMAGES } from "../../data/profile";

/* typewriter */
function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wi % words.length];
    if (!del && text === word) {
      const t = window.setTimeout(() => setDel(true), 1750);
      return () => window.clearTimeout(t);
    }
    if (del && text === "") {
      setDel(false);
      setWi((w) => w + 1);
      return;
    }
    const t = window.setTimeout(() => setText(word.slice(0, text.length + (del ? -1 : 1))), del ? 32 : 74);
    return () => window.clearTimeout(t);
  }, [text, del, wi, words]);
  return text;
}

/** letters that fly in one by one once the boot sequence releases */
function SplitWord({ word, grad = false, offset = 0 }: { word: string; grad?: boolean; offset?: number }) {
  return (
    <span className={grad ? "grad-text" : ""}>
      {word.split("").map((ch, i) => (
        <span key={i} className="split-char" style={{ ["--i" as string]: offset + i }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { t } = useLang();
  const typed = useTypewriter(TYPING_ROLES);
  const socialMini = SOCIALS.slice(0, 5);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const on = () => setBooted(true);
    window.addEventListener("mka:booted", on);
    const fallback = window.setTimeout(on, 3200);
    return () => {
      window.removeEventListener("mka:booted", on);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section id="home" className="relative z-10 flex min-h-screen items-center overflow-hidden pb-20 pt-28">
      {/* animated Julia-set fractal + recursive bloom lattice */}
      <div className="pointer-events-none absolute inset-0 opacity-85">
        <FractalJulia intensity={0.5} />
        <FractalBloom className="opacity-30" />
      </div>
      <div className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-quantum/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-pulse/10 blur-[130px]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-4 lg:grid-cols-[1.12fr_0.88fr]">
        <div>
          <Reveal>
            <div className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              <span className="font-tech text-[10px] tracking-[0.3em] text-ink-2">{t("hero.status")}</span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <p className="font-tech mt-6 text-xs tracking-[0.45em] text-quantum/90">{PROFILE.myanmar}</p>
            <h1
              className={`split font-display mt-2 text-5xl font-black leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl ${booted ? "on" : ""}`}
              style={{ perspective: "600px" }}
              aria-label="Moe Kyaw Aung"
            >
              <SplitWord word="MOE" /> <SplitWord word="KYAW" grad offset={4} />
              <br />
              <SplitWord word="AUNG" offset={9} />
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="font-display mt-5 min-h-[2rem] text-lg font-semibold text-ink-1 sm:text-2xl">
              <span className="caret">{typed}</span>
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-2 font-tech text-[11px] tracking-[0.25em] text-plasma/90">{PROFILE.title} · {PROFILE.altTitle}</p>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-3/85">
              {t("hero.desc")} <span className="text-quantum">{t("about.philosophy")}</span>
            </p>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-7 flex flex-wrap gap-3">
              <Magnetic>
                <a href="#projects" className="flex items-center gap-2 rounded-xl border border-quantum/60 bg-quantum/10 px-6 py-3 font-tech text-xs tracking-[0.25em] text-quantum shadow-[0_0_20px_var(--glow-q)] transition hover:bg-quantum/25 hover:shadow-[0_0_34px_var(--glow-q)]">
                  <Atom className="h-4 w-4" /> {t("hero.ctaNodes")}
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#orb" className="flex items-center gap-2 rounded-xl border border-pulse/50 bg-pulse/5 px-6 py-3 font-tech text-xs tracking-[0.25em] text-pulse transition hover:bg-pulse/15 hover:shadow-[0_0_30px_var(--glow-f)]">
                  <Sparkles className="h-4 w-4" /> {t("hero.ctaOrb")}
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="flex items-center gap-2 rounded-xl border border-line/15 px-6 py-3 font-tech text-xs tracking-[0.25em] text-ink-2 transition hover:border-line/40">
                  {t("hero.ctaContact")} <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="flex items-center gap-2 font-tech text-[11px] tracking-wider text-ink-4">
                <MapPin className="h-3.5 w-3.5 text-quantum" /> {PROFILE.location}
              </span>
              <span className="hidden h-3 w-px bg-line/15 sm:block" />
              <span className="flex items-center gap-2 font-tech text-[11px] tracking-wider text-ink-4">
                <Hammer className="h-3.5 w-3.5 text-plasma" /> {t("hero.now")} <span className="text-neon">{PROFILE.building}</span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={460}>
            <div className="mt-6 flex items-center gap-3">
              {socialMini.map((s) => (
                <Magnetic key={s.slug} strength={0.25}>
                  <a href={s.url} target="_blank" rel="noreferrer" title={`${s.label} · ${s.handle}`} className="glass flex h-10 w-10 items-center justify-center rounded-xl transition hover:border-quantum/60 hover:shadow-[0_0_18px_var(--glow-q)]">
                    <img src={`https://cdn.simpleicons.org/${s.slug}/22d3ee`} alt={s.label} className="h-4 w-4" loading="lazy" />
                  </a>
                </Magnetic>
              ))}
              <span className="font-tech text-[10px] tracking-[0.3em] text-ink-5">+ {SOCIALS.length - socialMini.length} MORE</span>
            </div>
          </Reveal>
        </div>

        {/* avatar core */}
        <Reveal delay={250} className="hidden justify-center lg:flex">
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-quantum/25 via-plasma/20 to-pulse/25 blur-3xl" />
            <div className="animate-spin-slower absolute -inset-10 rounded-full border border-dashed border-quantum/25" />
            <div className="animate-spin-slow absolute -inset-20 rounded-full border border-plasma/15" style={{ animationDirection: "reverse" }} />
            <div className="animate-spin-slower absolute -inset-20 rounded-full border border-transparent [border-top-color:var(--glow-q)]" />
            <div className="animate-spin-slow absolute -inset-10 rounded-full border border-transparent [border-bottom-color:var(--glow-f)]" style={{ animationDirection: "reverse" }} />
            <span className="animate-spin-slower absolute -inset-10">
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-quantum shadow-[0_0_12px_var(--color-quantum)]" />
            </span>
            <span className="animate-spin-slow absolute -inset-20" style={{ animationDirection: "reverse" }}>
              <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-pulse shadow-[0_0_12px_var(--color-pulse)]" />
            </span>

            <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-quantum/60 shadow-[0_0_60px_var(--glow-q)]">
              <img src={IMAGES.hero} alt="Moe Kyaw Aung" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
              <p className="font-tech absolute bottom-2 left-0 right-0 text-center text-[9px] tracking-[0.4em] text-quantum/90">MKA · v{new Date().getFullYear()}</p>
            </div>

            <div className="glass anim-float absolute -left-16 top-8 rounded-xl px-3 py-2 font-tech text-[9px] tracking-[0.2em] text-neon">KOTLIN · 100%</div>
            <div className="glass anim-float absolute -right-14 top-1/3 rounded-xl px-3 py-2 font-tech text-[9px] tracking-[0.2em] text-pulse" style={{ animationDelay: "1.2s" }}>CLEAN ARCH</div>
            <div className="glass anim-float absolute -bottom-2 left-4 rounded-xl px-3 py-2 font-tech text-[9px] tracking-[0.2em] text-plasma" style={{ animationDelay: "0.6s" }}>CI/CD GREEN</div>
          </div>
        </Reveal>
      </div>

      <a href="#board" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink-5 transition hover:text-quantum sm:flex" aria-label="Scroll">
        <span className="font-tech text-[9px] tracking-[0.4em]">{t("hero.scroll")}</span>
        <ChevronDown className="anim-drift h-4 w-4 text-quantum/80" />
      </a>
    </section>
  );
}
