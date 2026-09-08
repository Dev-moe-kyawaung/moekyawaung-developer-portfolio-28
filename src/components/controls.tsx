import { useEffect, useState } from "react";
import { Palette, Languages } from "lucide-react";
import { THEME_META, THEME_ORDER, applyTheme, currentTheme, type ThemeName } from "../lib/theme";
import { LANG_META, LANG_ORDER, useLang, type Lang } from "../lib/i18n";
import { toast } from "./Overlays";

/* Theme + language switchers for the nav bar. */

export function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const [, force] = useState(0);
  useEffect(() => {
    const onTheme = () => force((n) => n + 1);
    window.addEventListener("mka:theme", onTheme);
    return () => window.removeEventListener("mka:theme", onTheme);
  }, []);
  const active = currentTheme();

  const pick = (name: ThemeName) => {
    applyTheme(name);
    toast(`Theme: ${THEME_META[name].label}`);
  };

  return (
    <div className="flex items-center gap-1.5" title="Quantum theme">
      {!compact && <Palette className="mr-0.5 h-3.5 w-3.5 text-ink-5" />}
      {THEME_ORDER.map((name) => {
        const meta = THEME_META[name];
        const on = name === active;
        return (
          <button
            key={name}
            onClick={() => pick(name)}
            title={meta.label}
            aria-label={`Theme ${meta.label}`}
            className={`h-5 w-5 rounded-full border transition-all duration-200 ${
              on ? "scale-110 border-line/80 shadow-[0_0_10px_rgba(255,255,255,0.35)]" : "border-line/20 hover:scale-110"
            }`}
            style={{ background: `linear-gradient(135deg, ${meta.a} 50%, ${meta.b} 50%)` }}
          />
        );
      })}
    </div>
  );
}

export function LangSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="glass flex items-center gap-0.5 rounded-full border-line/10 p-0.5" title="Language">
      <Languages className="ml-1.5 h-3.5 w-3.5 text-ink-5" />
      {LANG_ORDER.map((l: Lang) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          title={LANG_META[l].label}
          className={`rounded-full px-2 py-1 font-tech text-[10px] tracking-widest transition ${
            l === lang ? "bg-quantum/20 text-quantum" : "text-ink-5 hover:text-ink-2"
          }`}
        >
          {LANG_META[l].short}
        </button>
      ))}
    </div>
  );
}
