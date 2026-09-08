import { useEffect, useState } from "react";
import {
  Rocket, Award, GraduationCap, Briefcase, Cpu, Printer, Copy,
  FolderGit2, Star, Users, BookOpen, ExternalLink, Radio,
} from "lucide-react";
import Reveal from "../Reveal";
import { useLang } from "../../lib/i18n";
import { PROFILE, IMAGES } from "../../data/profile";
import { toast } from "../Overlays";

/* ------------------------------------------------------------------ */
/*  Career timeline + live GitHub pulse + printable resume document.   */
/* ------------------------------------------------------------------ */

const TIMELINE = [
  {
    year: "2023", icon: Rocket, color: "#22d3ee",
    title: "First Contact — Full-Stack Ignition",
    desc: "Shipped first JavaScript apps (todo engines, planners) and fell into the open-source gravity well. Dozens of Pages deployments followed.",
  },
  {
    year: "2024", icon: Award, color: "#a78bfa",
    title: "82+ Certifications — Programming Hub",
    desc: "Structured conquest of 9 domains: 13 programming languages, 13 web subjects, mobile, databases, AI/ML, security, blockchain, engineering and business.",
  },
  {
    year: "2024", icon: GraduationCap, color: "#e879f9",
    title: "Google Developers Launchpad",
    desc: "Selected for Google's developer program — 40+ professional certificates across programming, mobile, databases, AI and security.",
  },
  {
    year: "2025", icon: Briefcase, color: "#5eead4",
    title: "Senior Android Engineer",
    desc: "Designing high-performance Kotlin apps with Jetpack Compose, MVVM/MVI and Clean Architecture — Firebase backends, CI/CD pipelines, mentoring juniors.",
  },
  {
    year: "2026", icon: Cpu, color: "#fbbf24",
    title: "MoekyawTranslator — AI Translation App",
    desc: "Currently building an on-device AI translator with quantized TFLite models. Target: 4MB model, 38ms inference, zero cloud dependency.",
  },
];

interface GhUser {
  login: string;
  followers: number;
  following: number;
  public_repos: number;
}

let ghCache: Promise<GhUser | null> | null = null;

/** live GitHub profile — single cached request shared by every consumer */
export function useGithubLive() {
  const [data, setData] = useState<GhUser | null>(null);
  useEffect(() => {
    let alive = true;
    if (!ghCache) {
      ghCache = fetch("https://api.github.com/users/Dev-moe-kyawaung")
        .then((r) => (r.ok ? (r.json() as Promise<GhUser>) : null))
        .catch(() => null);
    }
    ghCache.then((j) => {
      if (alive && j) setData(j);
    });
    return () => {
      alive = false;
    };
  }, []);
  return data;
}

export default function Career() {
  const { t } = useLang();
  const gh = useGithubLive();

  const copyPhone = () => {
    navigator.clipboard?.writeText(PROFILE.phone).catch(() => {});
    toast(t("career.copied"));
  };

  return (
      <section id="career" className="relative z-10 overflow-hidden py-24">
        <div className="fx-grid-faint pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-plasma/10 blur-[130px]" />

        <div className="relative mx-auto max-w-6xl px-4">
          <Reveal>
            <p className="font-tech text-xs tracking-[0.4em] text-quantum/80">// 06 · TRAJECTORY</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
              {t("sec.career.a")} <span className="grad-text">{t("sec.career.b")}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-3/80">
              From first contact to senior orbit — every role collapsed into shipped work, verified by
              a live GitHub pulse.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            {/* ---------- timeline ---------- */}
            <div className="relative">
              <span className="absolute bottom-4 left-[27px] top-4 w-px bg-gradient-to-b from-quantum/60 via-plasma/40 to-pulse/40" />
              <div className="space-y-5">
                {TIMELINE.map((ev, i) => {
                  const Icon = ev.icon;
                  return (
                    <Reveal key={ev.year + ev.title} delay={Math.min(i * 80, 320)}>
                      <div className="group relative flex gap-5">
                        <span
                          className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border bg-void transition group-hover:scale-110"
                          style={{ borderColor: `${ev.color}66`, boxShadow: `0 0 20px ${ev.color}22` }}
                        >
                          <Icon className="h-6 w-6" style={{ color: ev.color }} />
                        </span>
                        <div className="glass flex-1 rounded-2xl p-5 transition group-hover:border-line/25">
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className="font-tech rounded-full border px-2.5 py-0.5 text-[10px] tracking-[0.25em]"
                              style={{ color: ev.color, borderColor: `${ev.color}55`, background: `${ev.color}10` }}
                            >
                              {ev.year}
                            </span>
                            <h3 className="font-display text-base font-bold text-ink">{ev.title}</h3>
                          </div>
                          <p className="mt-2 text-[15px] leading-relaxed text-ink-4">{ev.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
              <Reveal delay={200}>
                <p className="mt-6 flex items-center gap-2 pl-[74px] font-tech text-[10px] tracking-[0.25em] text-neon/80">
                  <Radio className="h-3.5 w-3.5" /> {t("career.decohere")}
                </p>
              </Reveal>
            </div>

            {/* ---------- live pulse + resume ---------- */}
            <div className="flex flex-col gap-5">
              <Reveal delay={120}>
                <div className="glass relative overflow-hidden rounded-3xl p-6">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-quantum/70 to-transparent" />
                  <div className="flex items-center justify-between">
                    <p className="font-tech text-[10px] tracking-[0.35em] text-ink-4">{t("career.live")}</p>
                    <span className="flex items-center gap-1.5 font-tech text-[9px] tracking-widest text-neon">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute h-full w-full animate-ping rounded-full bg-neon opacity-60" />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-neon" />
                      </span>
                      {gh ? "LIVE" : "CACHED"}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    <img
                      src={IMAGES.hero}
                      alt="Moe Kyaw Aung"
                      className="h-16 w-16 rounded-2xl border border-quantum/40 object-cover"
                    />
                    <div className="min-w-0">
                      <p className="font-display flex items-center gap-1.5 text-base font-bold text-ink">
                        <FolderGit2 className="h-4 w-4 text-ink-4" /> Dev-moe-kyawaung
                      </p>
                      <p className="truncate font-tech text-[10px] tracking-wider text-ink-5">
                        Senior Android · Kotlin · Compose
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                    {[
                      { icon: BookOpen, v: gh ? String(gh.public_repos) : "40+", l: t("career.repos") },
                      { icon: Users, v: gh ? String(gh.followers) : "—", l: t("career.followers") },
                      { icon: Star, v: gh ? String(gh.following) : "—", l: t("career.following") },
                    ].map((s) => (
                      <div key={s.l} className="rounded-xl border border-line/10 bg-line/[0.03] px-2 py-3">
                        <s.icon className="mx-auto h-4 w-4 text-quantum" />
                        <p className="font-display mt-1 text-lg font-black text-ink">{s.v}</p>
                        <p className="font-tech mt-0.5 text-[8px] tracking-[0.2em] text-ink-5">{s.l}</p>
                      </div>
                    ))}
                  </div>

                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-quantum/40 bg-quantum/10 px-4 py-2.5 font-tech text-[11px] tracking-[0.25em] text-quantum transition hover:bg-quantum/25"
                  >
                    {t("career.profile")} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="glass rounded-3xl border-plasma/25 p-6">
                  <p className="font-tech text-[10px] tracking-[0.35em] text-ink-4">RESUME.EXE</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-4">
                    One-page field manual: summary, stack, trajectory and credentials — formatted for
                    print or PDF export.
                  </p>
                  <div className="mt-4 flex flex-col gap-2.5">
                    <button
                      onClick={() => window.print()}
                      className="flex items-center justify-center gap-2 rounded-xl border border-plasma/50 bg-plasma/10 px-4 py-2.5 font-tech text-[11px] tracking-[0.25em] text-plasma transition hover:bg-plasma/25 hover:shadow-[0_0_24px_var(--glow-p)]"
                    >
                      <Printer className="h-4 w-4" /> {t("career.print")}
                    </button>
                    <button
                      onClick={copyPhone}
                      className="flex items-center justify-center gap-2 rounded-xl border border-line/15 px-4 py-2.5 font-tech text-[11px] tracking-[0.25em] text-ink-2 transition hover:border-quantum/50 hover:text-quantum"
                    >
                      <Copy className="h-4 w-4" /> {t("career.copy")}
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Print-only resume document (screen: hidden · print: visible).      */
/*  Rendered OUTSIDE .app-shell (see App.tsx) so print CSS can show it */
/* ------------------------------------------------------------------ */

export function ResumeDoc() {
  return (
    <div id="resume-doc" className="hidden bg-white text-slate-900 print:block">
      <div className="mx-auto max-w-[720px] px-10 py-10 font-sans text-[13px] leading-relaxed">
        <div className="border-b-4 border-slate-900 pb-4">
          <h1 className="text-3xl font-black tracking-tight">Moe Kyaw Aung</h1>
          <p className="mt-1 text-sm font-semibold text-ink-6">
            Senior Android Developer · Full-Stack Engineer
          </p>
          <p className="mt-2 text-xs text-ink-5">
            Tachileik, Myanmar ↔ Bangkok, Thailand · {PROFILE.phone} · github.com/Dev-moe-kyawaung ·
            gravatar.com/moekyawaung13721
          </p>
        </div>

        <DocSec title="Professional Summary">
          Senior Android Engineer designing high-performance mobile applications with Kotlin,
          Jetpack (Compose, ViewModel, Navigation, Room, Paging) and MVVM/MVI + Clean Architecture.
          Firebase suite, REST APIs, CI/CD with GitHub Actions. 82+ certifications across 9 domains
          including Google Developers Launchpad. Clean, testable code; mentoring juniors.
        </DocSec>

        <DocSec title="Core Skills">
          Android: Kotlin, Jetpack Compose, ViewModel, Navigation, Room, Paging, Material 3 ·
          Architecture: Clean Architecture, MVVM, MVI, multi-module · Backend: Firebase (Auth,
          Firestore, FCM, Crashlytics), REST, Retrofit, OkHttp · DevOps: GitHub Actions, Azure
          DevOps, Fastlane · Testing: JUnit, Espresso, MockK · AI: Claude API, TFLite on-device ML ·
          Security: ethical hacking, Linux/Kali.
        </DocSec>

        <DocSec title="Experience & Trajectory">
          <ul className="list-disc space-y-1 pl-5">
            <li><b>2026 — MoekyawTranslator (AI Translation App):</b> on-device TFLite translation, 4MB quantized model.</li>
            <li><b>2025 — Senior Android Engineer:</b> high-performance Kotlin apps, Firebase backends, CI/CD, mentoring.</li>
            <li><b>2024 — Google Developers Launchpad</b> + 82 Programming Hub certificates across 9 domains.</li>
            <li><b>2023 — Full-Stack Ignition:</b> 16+ shipped apps — dashboards, POS suites, games, PWA, travel, chat.</li>
          </ul>
        </DocSec>

        <DocSec title="Featured Projects">
          <ul className="list-disc space-y-1 pl-5">
            <li><b>Social Dashboard</b> — realtime social analytics (Kotlin, Firebase, MVVM).</li>
            <li><b>POS Ultimate Pro Max</b> — inventory, tax engine, receipts, multi-branch reports.</li>
            <li><b>Video Player</b> — ExoPlayer/Media3 playlist engine with casting.</li>
            <li><b>PWA App</b> — offline-first installable web app with background sync.</li>
          </ul>
        </DocSec>

        <DocSec title="Credentials">
          82+ Programming Hub certificates (9 categories) · Google Developers Launchpad · 40+
          professional certificates · Languages: Burmese, English, Kotlin.
        </DocSec>

        <p className="mt-6 border-t border-slate-300 pt-3 text-center text-[11px] text-ink-5">
          “Code with culture. Build with purpose.” — References: github.com/Dev-moe-kyawaung
        </p>
      </div>
    </div>
  );
}

function DocSec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">{title}</h2>
      <div className="mt-1.5 text-slate-700">{children}</div>
    </div>
  );
}
