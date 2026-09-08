/* ------------------------------------------------------------------ */
/*  ULTRA PRO MAX — trilingual system (EN / MM / TH)                   */
/* ------------------------------------------------------------------ */

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "mm" | "th";
export const LANG_ORDER: Lang[] = ["en", "mm", "th"];
export const LANG_META: Record<Lang, { label: string; short: string }> = {
  en: { label: "English", short: "EN" },
  mm: { label: "မြန်မာ", short: "MM" },
  th: { label: "ไทย", short: "TH" },
};

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home", "nav.about": "About", "nav.nodes": "Nodes", "nav.orb": "Orb",
  "nav.stack": "Stack", "nav.career": "Career", "nav.journal": "Journal", "nav.contact": "Contact",
  "ui.search": "Search the multiverse",
  "hero.status": "Open to Work",
  "hero.desc":
    "Architecting high-performance Android apps with Kotlin, Jetpack Compose & Clean Architecture — and weaving full-stack, security and on-device AI into every build.",
  "hero.ctaNodes": "EXPLORE QUANTUM NODES",
  "hero.ctaOrb": "CONSULT THE ORB",
  "hero.ctaContact": "CONTACT",
  "hero.now": "NOW:",
  "hero.scroll": "SCROLL",
  "sec.about.a": "Developer by passion,",
  "sec.about.b": "learner by nature.",
  "sec.nodes.a": "Project",
  "sec.nodes.b": "Entanglement Graph",
  "sec.orb.a": "The Floating",
  "sec.orb.b": "AI Orb",
  "sec.stack.a": "Skills",
  "sec.stack.b": "& Technologies",
  "sec.career.a": "Career",
  "sec.career.b": "Timeline",
  "sec.journal.a": "Signal",
  "sec.journal.b": "Journal",
  "sec.contact.a": "Initiate",
  "sec.contact.b": "Quantum Contact",
  "about.live": "LIVE",
  "about.certs": "CERTIFICATES",
  "about.now": "CURRENTLY IN SUPERPOSITION",
  "about.btnGithub": "VIEW GITHUB REPOS",
  "about.btnGravatar": "GRAVATAR IDENTITY",
  "about.philosophy": "Code with culture. Build with purpose.",
  "nodes.hint": "HOVER TO TRACE ENTANGLEMENT · CLICK TO OBSERVE",
  "nodes.observed": "OBSERVED NODE · WAVEFUNCTION COLLAPSED",
  "nodes.state": "STATE:",
  "nodes.repo": "VIEW REPO",
  "orb.hint": "CLICK NUCLEUS TO COLLAPSE A DECISION",
  "orb.active": "ACTIVE EVALUATION",
  "orb.manual": "MANUAL",
  "orb.autoEval": "AUTO-EVAL",
  "orb.log": "COLLAPSE LOG",
  "orb.await": "— awaiting first collapse —",
  "orb.eval": "EVALUATE NOW",
  "orb.pause": "PAUSE AUTO",
  "orb.resume": "AUTO-EVAL",
  "stack.cloud": "SKILL CHIP CLOUD",
  "stack.particles": "PARTICLES",
  "stack.domains": "CERTIFIED DOMAINS · PROGRAMMING HUB",
  "career.live": "LIVE GITHUB PULSE",
  "career.repos": "PUBLIC REPOS",
  "career.followers": "FOLLOWERS",
  "career.following": "FOLLOWING",
  "career.print": "PRINT / SAVE PDF",
  "career.copy": "COPY PHONE",
  "career.copied": "Phone number copied to clipboard",
  "career.profile": "VIEW FULL PROFILE",
  "career.decohere": "DECOHERENCE RISK: ZERO — EVERY ROLE COLLAPSED INTO SHIPPED WORK.",
  "contact.direct": "DIRECT CHANNEL",
  "contact.phone": "PHONE",
  "contact.wa": "WHATSAPP",
  "contact.ping": "ping the core",
  "contact.gravid": "Gravatar identity:",
  "contact.response": "Response < 24h · UTC+6:30",
  "contact.github": "GITHUB",
  "contact.gravatar": "GRAVATAR",
  "journal.read": "READ TRANSMISSION",
  "journal.min": "MIN READ",
  "journal.back": "BACK TO SIGNALS",
  "journal.by": "MKA · QUANTUM CORE",
  "footer.rights": "ENGINEERED INSIDE A QUANTUM SUPERPOSITION",
  "footer.tag": "|ψ⟩ = α|BUILD⟩ + β|LEARN⟩ — ALWAYS COLLAPSING FORWARD",
  "pal.placeholder": "Type a command or search…",
  "pal.nav": "NAVIGATE",
  "pal.projects": "PROJECTS",
  "pal.socials": "SOCIALS",
  "pal.actions": "ACTIONS",
  "pal.hint": "ENTER TO RUN · ESC TO CLOSE",
  "pal.actTheme": "Cycle quantum theme",
  "pal.actLang": "Cycle language EN/MM/TH",
  "pal.actOrb": "Force orb evaluation",
  "pal.actResume": "Print / save resume PDF",
  "pal.actCopy": "Copy phone number",
  "pal.actPower": "Toggle low-power mode",
  "pal.actTop": "Back to top",
  "pal.themeTo": "Theme",
  "pal.langTo": "Language",
  "dock.sys": "SYS.NOMINAL",
  "dock.low": "LOW-POWER",
  "boot.skip": "CLICK ANYWHERE TO SKIP",
  "nav.board": "Board",
  "nav.gallery": "Gallery",
  "sec.board.a": "Signal",
  "sec.board.b": "Board",
  "sec.gallery.a": "Visual",
  "sec.gallery.b": "Log",
  "board.clock": "LOCAL TIME",
  "board.skills": "STACK FEED",
  "board.certs": "CERTIFICATES",
  "board.now": "NOW BUILDING",
  "board.route": "OPERATING CORRIDOR",
  "board.repos": "PUBLIC REPOS",
  "board.avail": "AVAILABLE FOR",
  "board.availV": "Senior Android · Full-Stack · Architecture consulting",
  "board.cta": "INITIATE CONTACT",
  "gallery.drag": "DRAG · SCROLL · SWIPE",
  "dial.title": "DIMENSION",
  "dial.quantum": "Quantum",
  "dial.obsidian": "Obsidian",
  "dial.hologram": "Hologram",
  "dock.sound": "Sound design",
  "dock.term": "Terminal",
  "pal.actDesign": "Shift dimension",
  "pal.actSound": "Toggle sound design",
  "pal.actTerm": "Open terminal",
};

const mm: Dict = {
  "nav.home": "ပင်မ", "nav.about": "အကြောင်း", "nav.nodes": "နုဒ်များ", "nav.orb": "အော့ဘ်",
  "nav.stack": "နည်းပညာများ", "nav.career": "အလုပ်အကိုင်", "nav.journal": "ဆောင်းပါးများ", "nav.contact": "ဆက်သွယ်ရန်",
  "ui.search": "စကြဝဠာအတွင်း ရှာဖွေရန်",
  "hero.status": "အလုပ်အကိုင် ဖွင့်ထားသည်",
  "hero.desc":
    "Kotlin၊ Jetpack Compose နှင့် Clean Architecture တို့ဖြင့် စွမ်းဆောင်ရည်မြင့် Android အက်ပ်များ တည်ဆောက်နေပြီး full-stack၊ လုံခြုံရေးနှင့် on-device AI တို့ကို ဖန်တီးမှုတိုင်းတွင် ထည့်သွင်းထားပါတယ်။",
  "hero.ctaNodes": "ကွမ်တမ် နုဒ်များ လေ့လာရန်",
  "hero.ctaOrb": "အော့ဘ်ကို မေးမြန်းရန်",
  "hero.ctaContact": "ဆက်သွယ်ရန်",
  "hero.now": "ယခု:",
  "hero.scroll": "ဆွဲချရန်",
  "sec.about.a": "စိတ်အားထက်သန်မှုဖြင့် developer၊",
  "sec.about.b": "သင်ယူမှုဖြင့် ကြီးထွားသူ။",
  "sec.nodes.a": "ပရောဂျက်",
  "sec.nodes.b": "ဆက်စပ်မှုဂရပ်",
  "sec.orb.a": "လေပေါ်",
  "sec.orb.b": "AI အော့ဘ်",
  "sec.stack.a": "ကျွမ်းကျင်မှုများ",
  "sec.stack.b": "နှင့် နည်းပညာများ",
  "sec.career.a": "အလုပ်အကိုင်",
  "sec.career.b": "မှတ်တမ်း",
  "sec.journal.a": "စစ်ဂနယ်",
  "sec.journal.b": "ဂျာနယ်",
  "sec.contact.a": "စတင်ရန်",
  "sec.contact.b": "ကွမ်တမ် ဆက်သွယ်မှု",
  "about.live": "တိုက်ရိုက်",
  "about.certs": "လက်မှတ်များ",
  "about.now": "လက်ရှိ တည်ဆောက်နေဆဲ",
  "about.btnGithub": "GITHUB REPO များ ကြည့်ရန်",
  "about.btnGravatar": "GRAVATAR မှတ်ပုံတင်",
  "about.philosophy": "ယဉ်ကျေးမှုဖြင့် ကုဒ်ရေး။ ရည်ရွယ်ချက်ဖြင့် တည်ဆောက်။",
  "nodes.hint": "ဆက်စပ်မှုခြေရာခံရန် HOVER · ကြည့်ရန် CLICK",
  "nodes.observed": "ရွေးချယ်ထားသော နုဒ် · လှိုင်းပျက်သွားပြီ",
  "nodes.state": "အခြေအနေ:",
  "nodes.repo": "REPO ကြည့်ရန်",
  "orb.hint": "ဆုံးဖြတ်ချက်ချရန် နျူကလိယပ်ကို နှိပ်ပါ",
  "orb.active": "အကဲဖြတ်နေဆဲ",
  "orb.manual": "ကိုယ်တိုင်",
  "orb.autoEval": "အော်တို",
  "orb.log": "မှတ်တမ်း",
  "orb.await": "— ပထမဆုံး ပြိုလဲမှုကို စောင့်နေသည် —",
  "orb.eval": "အခု အကဲဖြတ်ရန်",
  "orb.pause": "ရပ်ရန်",
  "orb.resume": "အော်တို",
  "stack.cloud": "ကျွမ်းကျင်မှု တိမ်တိုက်",
  "stack.particles": "အမှုန်များ",
  "stack.domains": "အသိအမှတ်ပြုနယ်ပယ်များ · PROGRAMMING HUB",
  "career.live": "GITHUB တိုက်ရိုက်အချက်အလက်",
  "career.repos": "အများသုံး REPO",
  "career.followers": "FOLLOWER",
  "career.following": "FOLLOWING",
  "career.print": "ပရင့် / PDF သိမ်းရန်",
  "career.copy": "ဖုန်းကူးယူရန်",
  "career.copied": "ဖုန်းနံပါတ် ကူးယူပြီးပါပြီ",
  "career.profile": "ပရိုဖိုင်အပြည့်အစုံ",
  "career.decohere": "အန္တရာယ်မရှိ — အခန်းကဏ္ဍတိုင်း လက်တွေ့ထုတ်ကုန်အဖြစ် ပြိုလဲပြီးပါပြီ။",
  "contact.direct": "တိုက်ရိုက်ချန်နယ်",
  "contact.phone": "ဖုန်း",
  "contact.wa": "WHATSAPP",
  "contact.ping": "core ကို ping ပို့ရန်",
  "contact.gravid": "Gravatar မှတ်ပုံတင်:",
  "contact.response": "၂၄ နာရီအတွင်း ပြန်ကြားမည် · UTC+6:30",
  "contact.github": "GITHUB",
  "contact.gravatar": "GRAVATAR",
  "journal.read": "ဖတ်ရန်",
  "journal.min": "မိနစ်ခန့်",
  "journal.back": "နောက်သို့",
  "journal.by": "MKA · ကွမ်တမ် CORE",
  "footer.rights": "ကွမ်တမ် အတွင်း တည်ဆောက်ထားသည်",
  "footer.tag": "|ψ⟩ = α|တည်ဆောက်⟩ + β|သင်ယူ⟩ — အမြဲ ရှေ့သို့",
  "pal.placeholder": "ကွန်မန့်ရှာရန် ရိုက်ထည့်ပါ…",
  "pal.nav": "သွားရန်",
  "pal.projects": "ပရောဂျက်များ",
  "pal.socials": "ဆိုရှယ်များ",
  "pal.actions": "လုပ်ဆောင်ချက်များ",
  "pal.hint": "လုပ်ဆောင်ရန် ENTER · ပိတ်ရန် ESC",
  "pal.actTheme": "Theme ပြောင်းရန်",
  "pal.actLang": "ဘာသာစကား ပြောင်းရန် EN/MM/TH",
  "pal.actOrb": "အော့ဘ် အကဲဖြတ်ခိုင်းရန်",
  "pal.actResume": "Resume ပရင့် / PDF သိမ်းရန်",
  "pal.actCopy": "ဖုန်းနံပါတ် ကူးယူရန်",
  "pal.actPower": "Low-power မုဒ် ပြောင်းရန်",
  "pal.actTop": "အပေါ်ဆုံးသို့",
  "pal.themeTo": "Theme",
  "pal.langTo": "ဘာသာစကား",
  "dock.sys": "စနစ် ကောင်းမွန်",
  "dock.low": "LOW-POWER",
  "boot.skip": "ကျော်ရန် နှိပ်ပါ",
  "nav.board": "ဘုတ်",
  "nav.gallery": "ပြခန်း",
  "sec.board.a": "စစ်ဂနယ်",
  "sec.board.b": "ဘုတ်",
  "sec.gallery.a": "ရုပ်ပုံ",
  "sec.gallery.b": "မှတ်တမ်း",
  "board.clock": "ဒေသစံတော်ချိန်",
  "board.skills": "နည်းပညာစီးကြောင်း",
  "board.certs": "လက်မှတ်များ",
  "board.now": "ယခု တည်ဆောက်နေသည်",
  "board.route": "လုပ်ငန်းလမ်းကြောင်း",
  "board.repos": "အများသုံး REPO",
  "board.avail": "ရရှိနိုင်သည်",
  "board.availV": "Senior Android · Full-Stack · Architecture အကြံပေး",
  "board.cta": "ဆက်သွယ်ရန်",
  "gallery.drag": "ဆွဲ · လှိမ့် · ပွတ်ဆွဲ",
  "dial.title": "ဒိုင်မန်းရှင်း",
  "dial.quantum": "ကွမ်တမ်",
  "dial.obsidian": "အော့ဘ်စီဒီယန်",
  "dial.hologram": "ဟိုလိုဂရမ်",
  "dock.sound": "အသံဒီဇိုင်း",
  "dock.term": "တာမင်နယ်",
  "pal.actDesign": "ဒိုင်မန်းရှင်း ပြောင်းရန်",
  "pal.actSound": "အသံ ဖွင့်/ပိတ်",
  "pal.actTerm": "တာမင်နယ် ဖွင့်ရန်",
};

const th: Dict = {
  "nav.home": "หน้าแรก", "nav.about": "เกี่ยวกับ", "nav.nodes": "โหนด", "nav.orb": "ออร์บ",
  "nav.stack": "สแต็ก", "nav.career": "อาชีพ", "nav.journal": "บทความ", "nav.contact": "ติดต่อ",
  "ui.search": "ค้นหาทั่วทั้งมัลติเวิร์ส",
  "hero.status": "เปิดรับงาน",
  "hero.desc":
    "สถาปัตยกรรมแอป Android ประสิทธิภาพสูงด้วย Kotlin, Jetpack Compose และ Clean Architecture ผสาน full-stack ความปลอดภัย และ on-device AI ในทุกบิลด์",
  "hero.ctaNodes": "สำรวจโหนดควอนตัม",
  "hero.ctaOrb": "ปรึกษาออร์บ",
  "hero.ctaContact": "ติดต่อ",
  "hero.now": "ตอนนี้:",
  "hero.scroll": "เลื่อน",
  "sec.about.a": "นักพัฒนาด้วยใจรัก,",
  "sec.about.b": "ผู้เรียนรู้โดยธรรมชาติ",
  "sec.nodes.a": "โปรเจกต์",
  "sec.nodes.b": "กราฟเอนแทงเกิลเมนต์",
  "sec.orb.a": "ออร์บ",
  "sec.orb.b": "AI ลอยได้",
  "sec.stack.a": "ทักษะ",
  "sec.stack.b": "และเทคโนโลยี",
  "sec.career.a": "เส้นทาง",
  "sec.career.b": "อาชีพ",
  "sec.journal.a": "บันทึก",
  "sec.journal.b": "สัญญาณ",
  "sec.contact.a": "เริ่มต้น",
  "sec.contact.b": "ติดต่อควอนตัม",
  "about.live": "สด",
  "about.certs": "ใบรับรอง",
  "about.now": "กำลังอยู่ในซูเปอร์โพซิชัน",
  "about.btnGithub": "ดู GITHUB REPO",
  "about.btnGravatar": "ข้อมูล GRAVATAR",
  "about.philosophy": "เขียนโค้ดด้วยวัฒนธรรม สร้างด้วยเป้าหมาย",
  "nodes.hint": "โฮเวอร์เพื่อตามรอย · คลิกเพื่อสังเกต",
  "nodes.observed": "โหนดที่สังเกต · ฟังก์ชันคลื่นยุบแล้ว",
  "nodes.state": "สถานะ:",
  "nodes.repo": "ดู REPO",
  "orb.hint": "คลิกนิวเคลียสเพื่อยุบการตัดสินใจ",
  "orb.active": "กำลังประเมิน",
  "orb.manual": "แมนนวล",
  "orb.autoEval": "อัตโนมัติ",
  "orb.log": "บันทึกการยุบ",
  "orb.await": "— รอการยุบครั้งแรก —",
  "orb.eval": "ประเมินเลย",
  "orb.pause": "หยุดชั่วคราว",
  "orb.resume": "อัตโนมัติ",
  "stack.cloud": "กลุ่มชิปทักษะ",
  "stack.particles": "อนุภาค",
  "stack.domains": "โดเมนที่รับรอง · PROGRAMMING HUB",
  "career.live": "ข้อมูล GITHUB สด",
  "career.repos": "REPO สาธารณะ",
  "career.followers": "ผู้ติดตาม",
  "career.following": "กำลังติดตาม",
  "career.print": "พิมพ์ / บันทึก PDF",
  "career.copy": "คัดลอกเบอร์โทร",
  "career.copied": "คัดลอกเบอร์โทรแล้ว",
  "career.profile": "ดูโปรไฟล์เต็ม",
  "career.decohere": "ความเสี่ยงดีโคฮีเรนซ์: ศูนย์ — ทุกบทบาทยุบเป็นงานที่ส่งมอบแล้ว",
  "contact.direct": "ช่องทางตรง",
  "contact.phone": "โทรศัพท์",
  "contact.wa": "WHATSAPP",
  "contact.ping": "ปิงหาคอร์",
  "contact.gravid": "ข้อมูล Gravatar:",
  "contact.response": "ตอบกลับภายใน 24 ชม. · UTC+6:30",
  "contact.github": "GITHUB",
  "contact.gravatar": "GRAVATAR",
  "journal.read": "อ่านสัญญาณ",
  "journal.min": "นาที",
  "journal.back": "กลับ",
  "journal.by": "MKA · ควอนตัมคอร์",
  "footer.rights": "สร้างขึ้นในซูเปอร์โพซิชันควอนตัม",
  "footer.tag": "|ψ⟩ = α|สร้าง⟩ + β|เรียนรู้⟩ — ยุบไปข้างหน้าเสมอ",
  "pal.placeholder": "พิมพ์คำสั่งหรือค้นหา…",
  "pal.nav": "นำทาง",
  "pal.projects": "โปรเจกต์",
  "pal.socials": "โซเชียล",
  "pal.actions": "แอ็กชัน",
  "pal.hint": "ENTER เพื่อรัน · ESC เพื่อปิด",
  "pal.actTheme": "เปลี่ยนธีมควอนตัม",
  "pal.actLang": "เปลี่ยนภาษา EN/MM/TH",
  "pal.actOrb": "สั่งประเมินออร์บ",
  "pal.actResume": "พิมพ์ / บันทึก Resume PDF",
  "pal.actCopy": "คัดลอกเบอร์โทร",
  "pal.actPower": "สลับโหมดประหยัดพลังงาน",
  "pal.actTop": "กลับขึ้นด้านบน",
  "pal.themeTo": "ธีม",
  "pal.langTo": "ภาษา",
  "dock.sys": "ระบบปกติ",
  "dock.low": "ประหยัดพลังงาน",
  "boot.skip": "คลิกเพื่อข้าม",
  "nav.board": "บอร์ด",
  "nav.gallery": "แกลเลอรี",
  "sec.board.a": "บอร์ด",
  "sec.board.b": "สัญญาณ",
  "sec.gallery.a": "บันทึก",
  "sec.gallery.b": "ภาพ",
  "board.clock": "เวลาท้องถิ่น",
  "board.skills": "ฟีดสแต็ก",
  "board.certs": "ใบรับรอง",
  "board.now": "กำลังสร้าง",
  "board.route": "เส้นทางปฏิบัติงาน",
  "board.repos": "REPO สาธารณะ",
  "board.avail": "พร้อมรับงาน",
  "board.availV": "Senior Android · Full-Stack · ที่ปรึกษาสถาปัตยกรรม",
  "board.cta": "ติดต่อเลย",
  "gallery.drag": "ลาก · เลื่อน · ปัด",
  "dial.title": "มิติ",
  "dial.quantum": "ควอนตัม",
  "dial.obsidian": "ออบซิเดียน",
  "dial.hologram": "โฮโลแกรม",
  "dock.sound": "ซาวด์ดีไซน์",
  "dock.term": "เทอร์มินัล",
  "pal.actDesign": "เปลี่ยนมิติ",
  "pal.actSound": "สลับเสียง",
  "pal.actTerm": "เปิดเทอร์มินัล",
};

const DICTS: Record<Lang, Dict> = { en, mm, th };

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  cycleLang: () => void;
  t: (key: string) => string;
}

const Ctx = createContext<LangCtx>({
  lang: "en",
  setLang: () => {},
  cycleLang: () => {},
  t: (k) => k,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const s = localStorage.getItem("mka-lang") as Lang | null;
      if (s && LANG_ORDER.includes(s)) return s;
    } catch {
      /* ignore */
    }
    return "en";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("mka-lang", l);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = l === "mm" ? "my" : l;
  }, []);

  const cycleLang = useCallback(() => {
    setLangState((prev) => {
      const next = LANG_ORDER[(LANG_ORDER.indexOf(prev) + 1) % LANG_ORDER.length];
      try {
        localStorage.setItem("mka-lang", next);
      } catch {
        /* ignore */
      }
      document.documentElement.lang = next === "mm" ? "my" : next;
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string) => DICTS[lang][key] ?? en[key] ?? key,
    [lang]
  );

  // external bridges (e.g. command palette) can request a language
  useEffect(() => {
    const onExt = (e: Event) => {
      const next = (e as CustomEvent<Lang>).detail;
      if (next && LANG_ORDER.includes(next)) {
        setLangState(next);
        try {
          localStorage.setItem("mka-lang", next);
        } catch {
          /* ignore */
        }
        document.documentElement.lang = next === "mm" ? "my" : next;
      }
    };
    window.addEventListener("mka:lang", onExt);
    return () => window.removeEventListener("mka:lang", onExt);
  }, []);

  return <Ctx.Provider value={{ lang, setLang, cycleLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
