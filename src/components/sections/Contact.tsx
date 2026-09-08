import { MapPin, Fingerprint, Clock3, MessageCircle, ArrowUpRight, Phone } from "lucide-react";
import Reveal from "../Reveal";
import { useLang } from "../../lib/i18n";
import { PROFILE, SOCIALS, NAV_LINKS, COLORS } from "../../data/profile";

const ICON_COLORS = [COLORS.cyan, COLORS.violet, COLORS.fuchsia, COLORS.teal, COLORS.indigo, COLORS.pink, COLORS.amber, COLORS.cyan];

export default function Contact() {
  const { t } = useLang();

  return (
    <>
      <section id="contact" className="relative z-10 overflow-hidden py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-plasma/60 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-quantum/10 blur-[130px]" />
        <div className="pointer-events-none absolute right-10 top-20 h-64 w-64 rounded-full bg-pulse/10 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-4">
          <Reveal>
            <p className="font-tech text-xs tracking-[0.4em] text-quantum/80">// 09 · OPEN CHANNEL</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
              {t("sec.contact.a")} <span className="grad-text">{t("sec.contact.b")}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-3/80">
              No entanglement required — the core is open. Reach out for Android builds, full-stack
              collaborations or architecture consultations.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.35fr]">
            {/* ---------- direct channel ---------- */}
            <Reveal delay={100}>
              <div className="glass relative h-full overflow-hidden rounded-3xl p-7">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-quantum/70 to-transparent" />
                <p className="font-tech text-[10px] tracking-[0.35em] text-ink-4">{t("contact.direct")}</p>

                <a
                  href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                  className="group mt-6 block rounded-2xl border border-line/10 bg-line/[0.03] p-5 transition hover:border-quantum/50 hover:shadow-[0_0_30px_var(--glow-q)]"
                >
                  <p className="font-tech flex items-center gap-2 text-[9px] tracking-[0.3em] text-ink-5">
                    <Phone className="h-3.5 w-3.5" /> {t("contact.phone")}
                  </p>
                  <p className="font-display mt-1 text-xl font-bold text-ink group-hover:text-quantum sm:text-2xl">
                    {PROFILE.phone}
                  </p>
                </a>

                <a
                  href={PROFILE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center justify-between rounded-2xl border border-neon/30 bg-neon/5 p-5 transition hover:shadow-[0_0_30px_var(--glow-n)]"
                >
                  <span>
                    <p className="font-tech text-[9px] tracking-[0.3em] text-ink-5">{t("contact.wa")}</p>
                    <p className="font-tech mt-1 flex items-center gap-1 text-sm tracking-wider text-neon">
                      {t("contact.ping")} <ArrowUpRight className="h-3.5 w-3.5" />
                    </p>
                  </span>
                  <MessageCircle className="h-7 w-7 text-neon" />
                </a>

                <div className="mt-4 space-y-3 rounded-2xl border border-line/10 bg-line/[0.02] p-5">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-quantum" />
                    <p className="font-tech text-xs tracking-wider text-ink-3">{PROFILE.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Fingerprint className="h-4 w-4 shrink-0 text-plasma" />
                    <p className="font-tech text-xs tracking-wider text-ink-3">
                      {t("contact.gravid")} <span className="text-plasma">moekyawaung13721</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-4 w-4 shrink-0 text-neon" />
                    <p className="font-tech text-xs tracking-wider text-ink-3">{t("contact.response")}</p>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-quantum/50 bg-quantum/10 px-4 py-3 text-center font-tech text-[11px] tracking-[0.25em] text-quantum transition hover:bg-quantum/25"
                  >
                    {t("contact.github")} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={PROFILE.gravatarUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-plasma/40 bg-plasma/5 px-4 py-3 text-center font-tech text-[11px] tracking-[0.25em] text-plasma transition hover:bg-plasma/15"
                  >
                    {t("contact.gravatar")} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* ---------- constellation of socials ---------- */}
            <Reveal delay={180}>
              <div className="grid h-full content-start gap-3 sm:grid-cols-2">
                {SOCIALS.map((s, i) => (
                  <a
                    key={s.slug}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="glass group flex items-center gap-4 rounded-2xl border p-4 transition duration-300 hover:-translate-y-1"
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition group-hover:scale-110"
                      style={{ borderColor: `${ICON_COLORS[i % ICON_COLORS.length]}55`, background: `${ICON_COLORS[i % ICON_COLORS.length]}12` }}
                    >
                      <img
                        src={`https://cdn.simpleicons.org/${s.slug}/${ICON_COLORS[i % ICON_COLORS.length].slice(1)}`}
                        alt={s.label}
                        className="h-5 w-5"
                        loading="lazy"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="font-display block text-sm font-bold text-ink group-hover:text-quantum">{s.label}</span>
                      <span className="block truncate font-tech text-[10px] tracking-wider text-ink-5">{s.handle}</span>
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-ink-6 transition group-hover:translate-x-0.5 group-hover:text-quantum" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="relative z-10 border-t border-line/5 bg-abyss/40 py-10 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center">
          <a href="#home" className="font-display text-xl font-black tracking-wide text-ink">
            MKA <span className="grad-text">QUANTUM</span>
          </a>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-tech text-[10px] tracking-[0.25em] text-ink-4 transition hover:text-quantum"
              >
                {t(l.key).toUpperCase()}
              </a>
            ))}
          </nav>
          <p className="font-tech text-[10px] tracking-[0.2em] leading-relaxed text-ink-5">
            © {new Date().getFullYear()} MOE KYAW AUNG · {t("footer.rights")}
          </p>
          <p className="font-tech text-[9px] tracking-[0.3em] text-ink-6">{t("footer.tag")}</p>
        </div>
      </footer>
    </>
  );
}
