/* tiny bridge so the palette can cycle language outside React tree */
import { LANG_ORDER, type Lang } from "../lib/i18n";

export function cycleLang() {
  let cur: Lang = "en";
  try {
    const s = localStorage.getItem("mka-lang") as Lang | null;
    if (s && LANG_ORDER.includes(s)) cur = s;
  } catch {
    /* ignore */
  }
  const next = LANG_ORDER[(LANG_ORDER.indexOf(cur) + 1) % LANG_ORDER.length];
  try {
    localStorage.setItem("mka-lang", next);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("mka:lang", { detail: next }));
  return next;
}
