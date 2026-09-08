import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Move } from "lucide-react";
import Reveal from "../Reveal";
import { useLang } from "../../lib/i18n";
import { GALLERY } from "../../data/profile";

/* ------------------------------------------------------------------ */
/*  Visual Log — drag-scroll snap reel of frames from the archive.     */
/* ------------------------------------------------------------------ */

export default function Gallery() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);

  const by = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * 460, behavior: "smooth" });

  return (
    <section id="gallery" className="relative z-10 overflow-hidden py-24">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-plasma/10 blur-[130px]" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="font-tech text-xs tracking-[0.4em] text-quantum/80">// 08 · ARCHIVE</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
              {t("sec.gallery.a")} <span className="grad-text">{t("sec.gallery.b")}</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex items-center gap-2">
              <span className="mr-2 hidden items-center gap-1.5 font-tech text-[9px] tracking-[0.3em] text-ink-5 sm:flex">
                <Move className="h-3.5 w-3.5" /> {t("gallery.drag")}
              </span>
              <button onClick={() => by(-1)} aria-label="Previous" className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink-3 transition hover:border-quantum/60 hover:text-quantum">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={() => by(1)} aria-label="Next" className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink-3 transition hover:border-quantum/60 hover:text-quantum">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={120}>
        <div
          ref={ref}
          className={`no-scrollbar mt-10 flex gap-5 overflow-x-auto px-4 pb-4 sm:px-[max(1rem,calc((100vw-72rem)/2+1rem))] ${
            dragging ? "cursor-grabbing select-none" : "snap-x snap-mandatory cursor-grab"
          }`}
          onPointerDown={(e) => {
            const el = ref.current;
            if (!el) return;
            drag.current = { x: e.clientX, left: el.scrollLeft, moved: false };
            el.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            const el = ref.current;
            if (!el || !drag.current) return;
            const dx = e.clientX - drag.current.x;
            if (Math.abs(dx) > 4 && !dragging) setDragging(true);
            if (Math.abs(dx) > 4) drag.current.moved = true;
            el.scrollLeft = drag.current.left - dx;
          }}
          onPointerUp={() => {
            drag.current = null;
            setDragging(false);
          }}
          onPointerCancel={() => {
            drag.current = null;
            setDragging(false);
          }}
        >
          {GALLERY.map((g, i) => (
            <figure
              key={g.src}
              className="group relative h-[300px] w-[78vw] shrink-0 snap-center overflow-hidden rounded-3xl border border-line/10 sm:h-[400px] sm:w-[420px]"
            >
              <img
                src={g.src}
                alt={g.alt}
                draggable={false}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent opacity-80 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 font-tech text-[9px] tracking-[0.3em] text-ink-2">
                <span className="glass rounded-full px-2.5 py-1">{String(i + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}</span>
                <span className="glass rounded-full px-2.5 py-1 text-quantum">{g.tag}</span>
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-lg font-bold text-ink">{g.title}</p>
                <p className="font-tech mt-1 text-[10px] tracking-[0.25em] text-ink-4">{g.alt.toUpperCase()}</p>
              </figcaption>
              <span className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-transparent transition group-hover:border-quantum/40" />
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
