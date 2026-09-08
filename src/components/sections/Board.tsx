import { useEffect, useState, type ReactNode } from "react";
import { Clock3, Hammer, Route, Award, FolderGit2, Quote, BadgeCheck, ArrowUpRight, Layers, MapPin } from "lucide-react";
import Reveal from "../Reveal";
import { Tilt } from "../Tilt";
import { useLang } from "../../lib/i18n";
import { PROFILE, IMAGES, SKILL_CHIPS, CERT_CATEGORIES, SOCIALS } from "../../data/profile";
import { useGithubLive } from "./Career";

/* ------------------------------------------------------------------ */
/*  Signal Board — bento grid of live tiles with 3D tilt + spotlight.  */
/* ------------------------------------------------------------------ */

function fmt(d: Date, tz: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: tz }).format(d);
  } catch {
    return "--:--:--";
  }
}

function Tile({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <Tilt className={`group rounded-3xl ${className}`}>
      <div className="glass relative h-full w-full overflow-hidden rounded-3xl p-5">{children}</div>
    </Tilt>
  );
}

const Label = ({ icon: Icon, text }: { icon: typeof Clock3; text: string }) => (
  <p className="flex items-center gap-1.5 font-tech text-[9px] tracking-[0.3em] text-ink-5">
    <Icon className="h-3.5 w-3.5 text-quantum" /> {text}
  </p>
);

export default function Board() {
  const { t } = useLang();
  const [now, setNow] = useState(() => new Date());
  const gh = useGithubLive();
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const certCounts = CERT_CATEGORIES.map((c) => parseInt(c.match(/×(\d+)/)?.[1] ?? "5", 10));
  const maxCert = Math.max(...certCounts);
  const feed = [...SKILL_CHIPS, ...SKILL_CHIPS];

  return (
    <section id="board" className="relative z-10 overflow-hidden py-20">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-quantum/10 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal>
          <p className="font-tech text-xs tracking-[0.4em] text-quantum/80">// 01 · LIVE TELEMETRY</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {t("sec.board.a")} <span className="grad-text">{t("sec.board.b")}</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-4 md:grid-cols-4">
            {/* identity — 2x2 */}
            <Tile className="col-span-2 row-span-2">
              <img src={IMAGES.hero} alt="Moe Kyaw Aung" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-transparent" />
              <div className="relative flex h-full flex-col justify-end">
                <span className="glass mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 font-tech text-[9px] tracking-[0.3em] text-neon">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" /> {t("hero.status").toUpperCase()}
                </span>
                <h3 className="font-display text-2xl font-black text-ink sm:text-3xl">{PROFILE.name}</h3>
                <p className="font-tech mt-1 text-[10px] tracking-[0.3em] text-quantum">{PROFILE.title.toUpperCase()}</p>
                <div className="mt-3 flex gap-2">
                  {SOCIALS.slice(0, 4).map((s) => (
                    <a key={s.slug} href={s.url} target="_blank" rel="noreferrer" title={s.label} className="glass flex h-8 w-8 items-center justify-center rounded-lg transition hover:-translate-y-0.5 hover:border-quantum/60">
                      <img src={`https://cdn.simpleicons.org/${s.slug}/22d3ee`} alt={s.label} className="h-3.5 w-3.5" loading="lazy" />
                    </a>
                  ))}
                </div>
              </div>
            </Tile>

            {/* clock */}
            <Tile>
              <Label icon={Clock3} text={t("board.clock")} />
              <p className="font-display mt-3 text-2xl font-black tabular-nums text-ink">{fmt(now, "Asia/Yangon")}</p>
              <p className="font-tech text-[9px] tracking-[0.25em] text-ink-5">YANGON · UTC+6:30</p>
              <p className="font-display mt-2 text-lg font-bold tabular-nums text-quantum">{fmt(now, "Asia/Bangkok")}</p>
              <p className="font-tech text-[9px] tracking-[0.25em] text-ink-5">BANGKOK · UTC+7</p>
            </Tile>

            {/* skills feed — 1x2 */}
            <Tile className="row-span-2">
              <Label icon={Layers} text={t("board.skills")} />
              <div className="relative mt-3 h-[calc(100%-1.5rem)] overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-void/80 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-void/80 to-transparent" />
                <ul className="ticker-y space-y-2">
                  {feed.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 font-tech text-[11px] tracking-wider text-ink-3">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.c ?? "var(--color-plasma)" }} />
                      {s.t}
                    </li>
                  ))}
                </ul>
              </div>
            </Tile>

            {/* certs */}
            <Tile>
              <Label icon={Award} text={t("board.certs")} />
              <p className="font-display mt-2 text-3xl font-black text-ink">
                82<span className="grad-text">+</span>
              </p>
              <div className="mt-2 flex h-9 items-end gap-1">
                {certCounts.map((c, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-quantum/70 to-plasma/70 transition-all duration-500 group-hover:from-quantum group-hover:to-pulse"
                    style={{ height: `${(c / maxCert) * 100}%` }}
                  />
                ))}
              </div>
            </Tile>

            {/* building — 2x1 */}
            <Tile className="col-span-2">
              <Label icon={Hammer} text={t("board.now")} />
              <p className="font-display mt-2 text-lg font-bold leading-tight text-ink">{PROFILE.building}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line/10">
                <div className="relative h-full w-[68%] rounded-full bg-gradient-to-r from-quantum to-pulse">
                  <span className="anim-shimmer absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["TFLite 4MB", "38ms inference", "On-device", "MM ↔ EN"].map((c) => (
                  <span key={c} className="rounded-full border border-line/10 px-2 py-0.5 font-tech text-[9px] tracking-widest text-ink-4">{c}</span>
                ))}
              </div>
            </Tile>

            {/* route — 2x1 */}
            <Tile className="col-span-2">
              <Label icon={Route} text={t("board.route")} />
              <svg viewBox="0 0 320 90" className="mt-1 h-[100px] w-full" aria-hidden>
                <defs>
                  <linearGradient id="routeG" x1="0" x2="1">
                    <stop offset="0" stopColor="var(--color-quantum)" />
                    <stop offset="1" stopColor="var(--color-pulse)" />
                  </linearGradient>
                </defs>
                <path id="routeP" d="M40 62 Q160 -10 280 50" fill="none" stroke="url(#routeG)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.7" />
                <circle r="3.5" fill="var(--color-neon)">
                  <animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#routeP" />
                  </animateMotion>
                </circle>
                <circle cx="40" cy="62" r="5" fill="var(--color-quantum)" />
                <circle cx="40" cy="62" r="10" fill="none" stroke="var(--color-quantum)" opacity="0.4" className="ring-ping" style={{ transformOrigin: "40px 62px" }} />
                <circle cx="280" cy="50" r="5" fill="var(--color-pulse)" />
                <circle cx="280" cy="50" r="10" fill="none" stroke="var(--color-pulse)" opacity="0.4" className="ring-ping" style={{ transformOrigin: "280px 50px", animationDelay: "1.2s" }} />
                <text x="40" y="82" textAnchor="middle" fontSize="8" fill="var(--color-ink-4)" fontFamily="var(--font-tech)" letterSpacing="2">TACHILEIK</text>
                <text x="280" y="72" textAnchor="middle" fontSize="8" fill="var(--color-ink-4)" fontFamily="var(--font-tech)" letterSpacing="2">BANGKOK</text>
              </svg>
            </Tile>

            {/* github */}
            <Tile>
              <Label icon={FolderGit2} text={t("board.repos")} />
              <p className="font-display mt-2 text-3xl font-black text-ink">{gh ? gh.public_repos : "40+"}</p>
              <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 font-tech text-[10px] tracking-[0.25em] text-quantum">
                DEV-MOE-KYAWAUNG <ArrowUpRight className="h-3 w-3" />
              </a>
              <span className={`mt-1 block font-tech text-[8px] tracking-widest ${gh ? "text-neon" : "text-ink-6"}`}>{gh ? "● LIVE" : "○ CACHED"}</span>
            </Tile>

            {/* philosophy — 2x1 */}
            <Tile className="col-span-2">
              <Quote className="h-6 w-6 text-plasma/70" />
              <p className="font-display mt-2 text-xl font-semibold italic leading-snug text-ink">“{t("about.philosophy")}”</p>
              <p className="font-tech mt-2 flex items-center gap-1.5 text-[9px] tracking-[0.3em] text-ink-5">
                <MapPin className="h-3 w-3" /> {PROFILE.location.toUpperCase()}
              </p>
            </Tile>

            {/* availability */}
            <Tile>
              <Label icon={BadgeCheck} text={t("board.avail")} />
              <p className="mt-2 text-sm leading-snug text-ink-3">{t("board.availV")}</p>
              <a href="#contact" className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-quantum/50 bg-quantum/10 px-3 py-1.5 font-tech text-[9px] tracking-[0.25em] text-quantum transition hover:bg-quantum/25">
                {t("board.cta")} <ArrowUpRight className="h-3 w-3" />
              </a>
            </Tile>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
