import { useEffect, useState } from "react";
import { BookOpen, CalendarDays, Clock3, X, ArrowLeft, Tag, Radio } from "lucide-react";
import Reveal from "../Reveal";
import { Tilt } from "../Tilt";
import { useLang } from "../../lib/i18n";

/* ------------------------------------------------------------------ */
/*  Signal Journal — engineering transmissions with a reader modal.    */
/* ------------------------------------------------------------------ */

interface Post {
  id: string;
  date: string;
  readMin: number;
  tags: string[];
  title: string;
  excerpt: string;
  body: string[];
  code?: { lang: string; text: string };
}

const POSTS: Post[] = [
  {
    id: "clean-arch",
    date: "2026-04-18",
    readMin: 6,
    tags: ["Kotlin", "Architecture", "MVVM"],
    title: "Clean Architecture on Android: Data → Domain → Presentation",
    excerpt:
      "Why I split every senior build into three layers, how UseCases keep ViewModels honest, and the exact module graph I ship in multi-module apps.",
    body: [
      "Every app I ship starts with three concentric layers. The domain layer sits at the center — pure Kotlin, zero Android imports — holding entities, repository interfaces and UseCases. Nothing else is allowed to know about frameworks.",
      "The data layer implements those repository interfaces: Retrofit services behind a RemoteDataSource, Room DAOs behind a LocalDataSource, and a repository that decides the single source of truth. Offline-first falls out of this structure naturally — the repository reads cache first, refreshes from network, and queues writes through WorkManager.",
      "The presentation layer is Jetpack Compose driven by ViewModels exposing a single StateFlow UI state. One-way data flow, one state object, zero leaks. Hilt wires the whole graph with @Singleton-scoped modules, and the result is an app where any layer can be unit-tested in isolation — the reason my builds survive Play Store scale.",
    ],
    code: {
      lang: "kotlin",
      text: "class GetForecastUseCase @Inject constructor(\n  private val repo: WeatherRepository\n) {\n  operator fun invoke(city: String): Flow<Result<Forecast>> =\n    repo.observeForecast(city)\n}",
    },
  },
  {
    id: "offline-first",
    date: "2026-03-02",
    readMin: 5,
    tags: ["Room", "WorkManager", "Sync"],
    title: "Offline-First with Room + WorkManager: Surviving Airplane Mode",
    excerpt:
      "The sync-queue pattern behind my POS suites: Room as source of truth, WorkManager draining a mutation queue, conflict rules that never lose a sale.",
    body: [
      "Point-of-sale software cannot lose a transaction because the Wi-Fi dropped. My POS builds treat Room as the single source of truth — every sale writes locally first, then appends a mutation record to an outbox table.",
      "A chained WorkManager job drains the outbox with exponential backoff, constrained to network connectivity. Server-wins for catalog data, client-wins for sales records, and every receipt carries a UUID so retries are idempotent.",
      "The payoff: cashiers in Tachileik markets keep selling through dead zones, and the cloud converges minutes later with zero conflicts. The same pattern now powers MoekyawTranslator's phrase-pack downloads.",
    ],
  },
  {
    id: "tflite",
    date: "2026-01-21",
    readMin: 7,
    tags: ["TFLite", "On-Device ML", "AI"],
    title: "Shipping On-Device Translation with a 4MB TFLite Model",
    excerpt:
      "Quantization, NNAPI delegates and a 38ms inference budget — how MoekyawTranslator translates Burmese ↔ English with zero cloud dependency.",
    body: [
      "Cloud translation APIs are fast until you roam across a border with no signal. MoekyawTranslator runs a quantized sequence model entirely on-device: float16 weights, int8 activations, packaged as a 4MB TFLite flatbuffer downloaded once as a phrase pack.",
      "Inference runs on a background dispatcher with the NNAPI delegate when available, falling back to 4-thread CPU — 38ms median on a mid-range device. The UI stays in Compose, the state in a single StateFlow, and the model file is verified by SHA-256 before first load.",
      "Privacy is the real feature: sentences never leave the phone. For a translator used by travelers and traders, that is not a nice-to-have — it is the product.",
    ],
    code: {
      lang: "kotlin",
      text: "val options = Interpreter.Options()\n  .setNumThreads(4)\n  .addDelegate(NnApiDelegate())\ninterpreter = Interpreter(modelBuffer, options) // ~38ms",
    },
  },
  {
    id: "cicd",
    date: "2025-11-09",
    readMin: 4,
    tags: ["CI/CD", "GitHub Actions", "Testing"],
    title: "CI/CD for Android with GitHub Actions: Green Pipelines Only",
    excerpt:
      "Matrix builds, lint gates, unit + instrumented tests and Play-track deploys — the pipeline contract every PR in my repos must satisfy.",
    body: [
      "Every pull request in my repositories faces the same gate: a matrix build across debug and release variants, ktlint plus Android Lint with zero-warning tolerance, and unit tests with MockK. Nothing merges red.",
      "Release tags trigger a second workflow — signed bundle assembly, version-code bump, staged rollout to the internal Play track, and Crashlytics mapping upload. Fastlane handles the store metadata so releases are one tag push.",
      "The discipline compounds: juniors I mentor learn that CI is not bureaucracy, it is a teammate that never sleeps. Green pipelines are how a solo developer ships like a team.",
    ],
  },
];

export default function Journal() {
  const { t } = useLang();
  const [active, setActive] = useState<Post | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="journal" className="relative z-10 overflow-hidden py-24">
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-pulse/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal>
          <p className="font-tech text-xs tracking-[0.4em] text-quantum/80">// 07 · TRANSMISSIONS</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("sec.journal.a")} <span className="grad-text">{t("sec.journal.b")}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-3/80">
            Field notes from the quantum core — architecture patterns, on-device AI and pipeline
            discipline, written from shipped work.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {POSTS.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i * 90, 270)} className="h-full">
              <Tilt className="h-full rounded-3xl">
              <article
                onClick={() => setActive(p)}
                className="glass group flex h-full cursor-pointer flex-col rounded-3xl p-6 transition duration-300 hover:border-quantum/40 hover:shadow-[0_0_40px_var(--glow-q)]"
              >
                <div className="flex items-center gap-3 font-tech text-[10px] tracking-[0.2em] text-ink-5">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-quantum" /> {p.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5 text-plasma" /> {p.readMin} {t("journal.min")}
                  </span>
                </div>
                <h3 className="font-display mt-3 text-lg font-bold leading-snug text-ink transition group-hover:text-quantum">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-4">{p.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 rounded-full border border-line/10 bg-line/5 px-2.5 py-0.5 font-tech text-[9px] tracking-widest text-ink-4"
                    >
                      <Tag className="h-2.5 w-2.5" /> {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-5 flex items-center gap-2 font-tech text-[11px] tracking-[0.25em] text-quantum">
                  <BookOpen className="h-4 w-4 transition group-hover:scale-110" /> {t("journal.read")}
                </span>
              </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ---------- reader modal ---------- */}
      {active && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-void/85 backdrop-blur-md" onClick={() => setActive(null)} />
          <div className="anim-pop glass relative flex max-h-[86vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border-quantum/25">
            <div className="flex items-center justify-between gap-4 border-b border-line/10 px-6 py-4">
              <p className="flex items-center gap-2 font-tech text-[10px] tracking-[0.3em] text-ink-4">
                <Radio className="h-3.5 w-3.5 text-neon" /> {t("journal.by")} · {active.date}
              </p>
              <button
                onClick={() => setActive(null)}
                aria-label="Close article"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-line/15 text-ink-4 transition hover:border-pulse/60 hover:text-pulse"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-6 sm:px-8">
              <h3 className="font-display text-2xl font-bold leading-tight text-ink">{active.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {active.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-quantum/30 bg-quantum/10 px-2.5 py-0.5 font-tech text-[9px] tracking-widest text-quantum">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-ink-3/90">
                {active.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {active.code && (
                <pre className="mt-5 overflow-x-auto rounded-2xl border border-line/10 bg-black/50 p-4 font-tech text-xs leading-relaxed text-neon">
                  <code>{active.code.text}</code>
                </pre>
              )}
              <button
                onClick={() => setActive(null)}
                className="mt-7 flex items-center gap-2 rounded-xl border border-line/15 px-4 py-2.5 font-tech text-[11px] tracking-[0.25em] text-ink-3 transition hover:border-quantum/50 hover:text-quantum"
              >
                <ArrowLeft className="h-4 w-4" /> {t("journal.back")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
