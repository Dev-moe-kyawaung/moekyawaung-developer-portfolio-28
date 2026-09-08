import { Boxes } from "lucide-react";
import QuantumGrid from "../effects/QuantumGrid";
import Reveal from "../Reveal";
import { useLang } from "../../lib/i18n";
import { FOCUS_AREAS, SKILL_CHIPS, CERT_CATEGORIES, COLORS } from "../../data/profile";

export default function Skills() {
  const { t } = useLang();

  return (
    <section id="stack" className="relative z-10 overflow-hidden py-24">
      <div className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-quantum/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-96 w-96 rounded-full bg-pulse/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal>
          <p className="font-tech text-xs tracking-[0.4em] text-quantum/80">// 05 · TECH SPECTRUM</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("sec.stack.a")} <span className="grad-text">{t("sec.stack.b")}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-3/80">
            A superposition of 23+ languages, frameworks and disciplines — shifting matrix grid included.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          {/* ---------- focus areas ---------- */}
          <div className="grid content-start gap-5 sm:grid-cols-2">
            {FOCUS_AREAS.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 90}>
                  <div className="glass group h-full rounded-2xl border p-5 transition duration-300 hover:-translate-y-1.5">
                    <div className="flex items-center justify-between">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-xl transition group-hover:scale-110"
                        style={{ background: `${f.color}18`, border: `1px solid ${f.color}44` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: f.color }} />
                      </span>
                      <span className="font-tech text-[9px] tracking-[0.3em]" style={{ color: f.color }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display mt-4 text-lg font-bold text-ink">{f.title}</h3>
                    <ul className="mt-3 space-y-1.5">
                      {f.items.map((it) => (
                        <li key={it} className="flex items-center gap-2 font-tech text-[11px] tracking-wider text-ink-4">
                          <span style={{ color: f.color }}>▹</span> {it}
                        </li>
                      ))}
                    </ul>
                    <div
                      className="mt-4 h-px w-full"
                      style={{ backgroundImage: `linear-gradient(90deg, ${f.color}66, transparent)` }}
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* ---------- skill chip cloud over shifting grid ---------- */}
          <Reveal delay={140}>
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-line/10">
              <QuantumGrid className="opacity-80" />
              <div className="fx-scanlines pointer-events-none absolute inset-0 opacity-60" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void/90 to-transparent" />

              <div className="relative p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-tech flex items-center gap-2 text-[10px] tracking-[0.35em] text-ink-3">
                    <Boxes className="h-4 w-4 text-quantum" /> {t("stack.cloud")}
                  </p>
                  <p className="font-tech text-[9px] tracking-[0.3em] text-quantum/80">23 {t("stack.particles")}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {SKILL_CHIPS.map((chip, i) => {
                    const c = chip.c ?? COLORS.violet;
                    return (
                      <span
                        key={chip.t}
                        className="anim-float inline-flex cursor-default items-center gap-2 rounded-full border bg-void/70 px-3.5 py-1.5 font-tech text-[11px] tracking-wider text-ink-2 backdrop-blur-sm transition hover:scale-110 hover:text-ink"
                        style={{
                          borderColor: `${c}55`,
                          animationDelay: `${(i % 7) * 0.35}s`,
                          animationDuration: `${5 + (i % 5)}s`,
                          boxShadow: `0 0 14px ${c}14`,
                        }}
                      >
                        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: c }} />
                        {chip.t}
                      </span>
                    );
                  })}
                </div>

                <div className="mt-8 border-t border-line/10 pt-5">
                  <p className="font-tech text-[10px] tracking-[0.35em] text-ink-4">{t("stack.domains")}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {CERT_CATEGORIES.map((c) => (
                      <span
                        key={c}
                        className="truncate rounded-lg border border-line/10 bg-void/60 px-2.5 py-1.5 font-tech text-[10px] tracking-wide text-ink-4 transition hover:border-quantum/40 hover:text-quantum"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
