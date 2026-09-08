import { Hammer, FolderGit2, Fingerprint, Quote } from "lucide-react";
import Reveal from "../Reveal";
import { useLang } from "../../lib/i18n";
import { PROFILE, HERO_STATS, CERT_CATEGORIES, IMAGES } from "../../data/profile";

/* marquee of certification domains */
function CertMarquee() {
  const items = [...CERT_CATEGORIES, ...CERT_CATEGORIES];
  return (
    <div className="relative overflow-hidden border-y border-line/5 bg-line/[0.02] py-3">
      <div className="marquee-track">
        {items.map((c, i) => (
          <span
            key={i}
            className={`mx-6 font-tech text-[11px] tracking-[0.2em] ${i % 2 ? "text-plasma/70" : "text-quantum/70"}`}
          >
            {c} <span className="mx-2 text-ink-6">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLang();

  return (
    <>
      <div className="relative z-10">
        <CertMarquee />
      </div>

      <section id="about" className="relative z-10 overflow-hidden py-24">
        <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-plasma/10 blur-[140px]" />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,420px)_1fr]">
            {/* ---------- portrait collage ---------- */}
            <Reveal>
              <div className="relative mx-auto max-w-[400px]">
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-quantum/25 via-transparent to-pulse/25 blur-xl" />
                <div className="relative overflow-hidden rounded-[1.8rem] border border-line/10">
                  <img src={IMAGES.hero} alt="Moe Kyaw Aung portrait" className="h-[400px] w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                    <div>
                      <p className="font-display text-lg font-bold text-ink">Moe Kyaw Aung</p>
                      <p className="font-tech text-[10px] tracking-[0.25em] text-quantum">{PROFILE.title.toUpperCase()}</p>
                    </div>
                    <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1 font-tech text-[9px] tracking-widest text-neon">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" />
                      {t("about.live")}
                    </span>
                  </div>
                </div>

                <div className="glass anim-float absolute -right-3 -top-4 rounded-2xl px-4 py-2.5 text-center shadow-[0_0_30px_var(--glow-q)]">
                  <p className="font-display text-xl font-black text-ink">82+</p>
                  <p className="font-tech text-[8px] tracking-[0.25em] text-ink-4">{t("about.certs")}</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <img src={IMAGES.shotA} alt="Moe Kyaw Aung — coding session" className="h-28 w-full rounded-2xl border border-line/10 object-cover" />
                  <img src={IMAGES.shotB} alt="Moe Kyaw Aung — workshop" className="h-28 w-full rounded-2xl border border-line/10 object-cover" />
                </div>

                <div className="glass mt-4 flex items-center gap-3 rounded-2xl border-quantum/25 px-4 py-3">
                  <Hammer className="anim-drift h-6 w-6 shrink-0 text-quantum" />
                  <div>
                    <p className="font-tech text-[8px] tracking-[0.3em] text-ink-5">{t("about.now")}</p>
                    <p className="font-tech text-xs tracking-wider text-neon">{PROFILE.building}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ---------- bio ---------- */}
            <div>
              <Reveal>
                <p className="font-tech text-xs tracking-[0.4em] text-quantum/80">// 02 · STATE VECTOR</p>
                <h2 className="font-display mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                  {t("sec.about.a")}
                  <br />
                  <span className="grad-text">{t("sec.about.b")}</span>
                </h2>
              </Reveal>

              <Reveal delay={100}>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-3/85">
                  {PROFILE.bio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="glass mt-8 grid gap-x-8 gap-y-3 rounded-2xl p-6 sm:grid-cols-2">
                  {PROFILE.infoRows.map((r) => (
                    <div key={r.k} className="flex items-baseline justify-between gap-3 border-b border-line/5 pb-2">
                      <span className="font-tech text-[10px] tracking-[0.25em] text-ink-5">{r.k}</span>
                      <span className={`text-right font-tech text-xs tracking-wider ${r.accent ? "text-quantum" : "text-ink-2"}`}>
                        {r.v}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={220}>
                <blockquote className="mt-6 flex gap-3 border-l-2 border-pulse/60 pl-4">
                  <Quote className="h-5 w-5 shrink-0 text-plasma/70" />
                  <p className="font-display text-lg font-semibold italic text-plasma/90">
                    “{t("about.philosophy")}”
                  </p>
                </blockquote>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-quantum/50 bg-quantum/10 px-5 py-2.5 font-tech text-[11px] tracking-[0.2em] text-quantum transition hover:bg-quantum/25 hover:shadow-[0_0_26px_var(--glow-q)]"
                  >
                    <FolderGit2 className="h-4 w-4" /> {t("about.btnGithub")}
                  </a>
                  <a
                    href={PROFILE.gravatarUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-plasma/40 px-5 py-2.5 font-tech text-[11px] tracking-[0.2em] text-plasma transition hover:bg-plasma/15"
                  >
                    <Fingerprint className="h-4 w-4" /> {t("about.btnGravatar")}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ---------- stats ---------- */}
          <Reveal delay={120}>
            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 lg:grid-cols-4">
              {HERO_STATS.map((s, i) => (
                <div key={s.l} className="relative bg-void/95 px-6 py-7 text-center">
                  {i < HERO_STATS.length - 1 && (
                    <span className="absolute right-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-quantum/40 to-transparent lg:block" />
                  )}
                  <p className="font-display text-3xl font-black text-ink sm:text-4xl">
                    <span className="grad-text">{s.v}</span>
                  </p>
                  <p className="font-tech mt-1.5 text-[10px] tracking-[0.3em] text-ink-4">{s.l.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
