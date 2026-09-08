/* ------------------------------------------------------------------ */
/*  Quantum Portfolio — profile data for Moe Kyaw Aung                 */
/*  sourced from pastebin.com/mQF1iP5P (Gravatar · GitHub · Cloudinary) */
/* ------------------------------------------------------------------ */

import {
  LayoutDashboard,
  Smartphone,
  Clapperboard,
  Gamepad2,
  CloudSun,
  Briefcase,
  ReceiptText,
  Trophy,
  Plane,
  MessageCircle,
  Bitcoin,
  ListChecks,
  Cloud,
  ShieldCheck,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";

export const IMAGES = {
  hero: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp",
  shotA: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_12_iv8kpm.webp",
  shotB: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_3_zqrhhr.webp",
  shotC: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763532/MKA_11_jbijtv.webp",
};

export const COLORS = {
  cyan: "#22d3ee",
  violet: "#a78bfa",
  fuchsia: "#e879f9",
  teal: "#5eead4",
  pink: "#f472b6",
  indigo: "#818cf8",
  amber: "#fbbf24",
};

export const PROFILE = {
  name: "Moe Kyaw Aung",
  myanmar: "မိုးကျော်အောင်",
  title: "Senior Android Developer",
  altTitle: "Full-Stack Engineer",
  github: "Dev-moe-kyawaung",
  githubUrl: "https://github.com/Dev-moe-kyawaung",
  gravatarUrl: "https://gravatar.com/moekyawaung13721",
  location: "Tachileik, Myanmar ↔ Bangkok, Thailand",
  phone: "+95 9 889 000 889",
  whatsapp: "https://wa.me/959889000889",
  building: "MoekyawTranslator — AI Translation App",
  philosophy: "Code with culture. Build with purpose.",
  bio: [
    "Passionate and self-motivated developer who believes in continuous learning and growth. From web development to mobile apps, databases to AI — I consistently expand my skill set across the full technology spectrum.",
    "My certification portfolio demonstrates practical, structured learning across 9 major domains and 82+ technical subjects — from programming languages and web frameworks to machine learning, blockchain and cybersecurity.",
    "I build with intention: clean code, modern practices, and a genuine love for problem-solving. Currently architecting senior-level Android apps with Kotlin, Jetpack Compose and Clean Architecture.",
  ],
  infoRows: [
    { k: "Full Name", v: "Moe Kyaw Aung", accent: false },
    { k: "GitHub", v: "Dev-moe-kyawaung", accent: true },
    { k: "Certificates", v: "82+ (Programming Hub)", accent: true },
    { k: "Focus", v: "Android · Full-Stack Dev", accent: false },
    { k: "Languages", v: "Burmese · English · Kotlin", accent: false },
    { k: "Status", v: "Open to Work", accent: true },
  ],
};

export const HERO_STATS = [
  { v: "82+", l: "Certificates" },
  { v: "9", l: "Skill Domains" },
  { v: "3+", l: "Years Building" },
  { v: "16+", l: "Apps Shipped" },
];

export const TYPING_ROLES = [
  "Senior Android Developer",
  "Kotlin × Jetpack Compose",
  "Clean Architecture · MVVM",
  "Full-Stack Engineer",
  "AI / ML Explorer",
  "Ethical Hacker",
];

export const CERT_CATEGORIES = [
  "Programming Languages ×13",
  "Web Development ×13",
  "Mobile & App Dev ×7",
  "Databases ×6",
  "AI & Data Science ×11",
  "Security & DevOps ×10",
  "Blockchain ×4",
  "Software Engineering ×7",
  "Business & Marketing ×11",
];

export interface FocusArea {
  icon: LucideIcon;
  title: string;
  color: string;
  items: string[];
}

export const FOCUS_AREAS: FocusArea[] = [
  { icon: Smartphone, title: "Mobile", color: COLORS.cyan, items: ["Kotlin", "Jetpack Compose", "MVVM · MVI", "Clean Architecture"] },
  { icon: Cloud, title: "Backend", color: COLORS.violet, items: ["Firebase Suite", "REST APIs", "Python", "Retrofit · OkHttp"] },
  { icon: ShieldCheck, title: "Security", color: COLORS.fuchsia, items: ["Ethical Hacking", "Cybersecurity", "Linux · Kali", "Encrypted Storage"] },
  { icon: BrainCircuit, title: "AI / ML", color: COLORS.teal, items: ["Claude API", "TFLite", "On-Device ML", "Translation Models"] },
];

export const SKILL_CHIPS: { t: string; c?: string }[] = [
  { t: "Python", c: COLORS.cyan },
  { t: "Java", c: COLORS.amber },
  { t: "JavaScript" },
  { t: "TypeScript", c: COLORS.indigo },
  { t: "Ruby", c: COLORS.pink },
  { t: "Rust", c: COLORS.amber },
  { t: "Go", c: COLORS.cyan },
  { t: "Dart", c: COLORS.teal },
  { t: "React", c: COLORS.cyan },
  { t: "Next.js" },
  { t: "Angular", c: COLORS.pink },
  { t: "Vue.js" },
  { t: "Node.js", c: COLORS.teal },
  { t: "Flutter", c: COLORS.cyan },
  { t: "Kotlin", c: COLORS.violet },
  { t: "PostgreSQL", c: COLORS.indigo },
  { t: "MongoDB", c: COLORS.teal },
  { t: "Redis", c: COLORS.pink },
  { t: "Docker", c: COLORS.indigo },
  { t: "AWS", c: COLORS.amber },
  { t: "Blockchain", c: COLORS.cyan },
  { t: "Machine Learning", c: COLORS.violet },
  { t: "Cyber Security", c: COLORS.fuchsia },
];

export interface SocialLink {
  label: string;
  slug: string;
  handle: string;
  url: string;
}

export const SOCIALS: SocialLink[] = [
  { label: "GitHub", slug: "github", handle: "Dev-moe-kyawaung", url: "https://github.com/Dev-moe-kyawaung" },
  { label: "LinkedIn", slug: "linkedin", handle: "moe-kyaw-aung", url: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1" },
  { label: "YouTube", slug: "youtube", handle: "moekyawaung", url: "https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG" },
  { label: "Bluesky", slug: "bluesky", handle: "@moekyawaung96", url: "https://bsky.app/profile/moekyawaung96.bsky.social" },
  { label: "Vimeo", slug: "vimeo", handle: "user252414232", url: "https://vimeo.com/user252414232" },
  { label: "Tumblr", slug: "tumblr", handle: "moekyawaung", url: "https://www.tumblr.com/moekyawaung" },
  { label: "Flickr", slug: "flickr", handle: "204037451@N06", url: "https://www.flickr.com/people/204037451@N06" },
  { label: "Gravatar", slug: "gravatar", handle: "moekyawaung13721", url: "https://gravatar.com/moekyawaung13721" },
];

export interface Project {
  id: number;
  name: string;
  icon: LucideIcon;
  blurb: string;
  tags: string[];
  url: string;
  color: string;
  state: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1, name: "Social Dashboard", icon: LayoutDashboard, state: "|Ψ⟩ Live",
    blurb: "Real-time social analytics console with multi-account sync, sentiment graphs and push insight alerts.",
    tags: ["Kotlin", "Firebase", "MVVM"],
    url: "https://github.com/moekyawaung-tech/social-dashboard",
    color: COLORS.cyan,
  },
  {
    id: 2, name: "PWA App", icon: Smartphone, state: "|Ψ⟩ Live",
    blurb: "Installable progressive web app with offline-first storage, service workers and background sync.",
    tags: ["PWA", "Workbox", "Offline"],
    url: "https://github.com/moekyawaung-tech/pwa-app",
    color: COLORS.violet,
  },
  {
    id: 3, name: "Video Player", icon: Clapperboard, state: "Stable",
    blurb: "Senior-level media player with playlist engine, gesture controls, subtitles and casting support.",
    tags: ["ExoPlayer", "Compose", "Media3"],
    url: "https://github.com/moekyawaung-tech/video-player",
    color: COLORS.fuchsia,
  },
  {
    id: 4, name: "Game Collection", icon: Gamepad2, state: "|Ψ⟩ Live",
    blurb: "Retro arcade bundle — snake, 2048-style puzzles and card games in one unified launcher.",
    tags: ["Games", "Canvas", "Kotlin"],
    url: "https://github.com/moekyawaung-tech/game-collection",
    color: COLORS.amber,
  },
  {
    id: 5, name: "Weather App", icon: CloudSun, state: "Stable",
    blurb: "Forecast engine with geolocation, hourly charts, severe-weather alerts and radar layers.",
    tags: ["REST API", "Location", "Charts"],
    url: "https://github.com/moekyawaung-tech/Weather-app",
    color: COLORS.teal,
  },
  {
    id: 6, name: "Job Portal", icon: Briefcase, state: "Observing",
    blurb: "Full hiring platform — role matching, applicant pipelines, resume parsing and notifications.",
    tags: ["Firebase", "Auth", "Matching"],
    url: "https://github.com/moekyawaung-tech/Job-Portal-App",
    color: COLORS.indigo,
  },
  {
    id: 7, name: "POS Ultimate Pro Max", icon: ReceiptText, state: "Entangled",
    blurb: "Advanced point-of-sale suite: inventory, tax engine, receipt printing, multi-branch reports.",
    tags: ["POS", "Room DB", "Reports"],
    url: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max",
    color: COLORS.pink,
  },
  {
    id: 8, name: "Snake Game", icon: Trophy, state: "Quantum",
    blurb: "Classic snake rebuilt with gesture steering, power-ups and local high-score entanglement.",
    tags: ["Game Loop", "Kotlin", "Canvas"],
    url: "https://github.com/moekyawaung-tech/Snake-Game-App",
    color: COLORS.teal,
  },
  {
    id: 9, name: "Thailand Travel", icon: Plane, state: "Observing",
    blurb: "Trip planner for Thailand — routes, cultural guides, currency tools and offline maps.",
    tags: ["Maps", "Travel", "Offline"],
    url: "https://github.com/moekyawaung-tech/thailand-travel",
    color: COLORS.amber,
  },
  {
    id: 10, name: "Chat App", icon: MessageCircle, state: "|Ψ⟩ Live",
    blurb: "End-to-end encrypted messaging with typing states, reactions and realtime presence.",
    tags: ["WebSockets", "Crypto", "Realtime"],
    url: "https://github.com/moekyawaung-tech",
    color: COLORS.fuchsia,
  },
  {
    id: 11, name: "Crypto Tracker", icon: Bitcoin, state: "Entangled",
    blurb: "Portfolio tracker streaming live prices, volatility alerts and on-chain wallet insights.",
    tags: ["WebSockets", "Charts", "API"],
    url: "https://github.com/moekyawaung-tech",
    color: COLORS.cyan,
  },
  {
    id: 12, name: "Todo Matrix", icon: ListChecks, state: "Stable",
    blurb: "Task manager with priority superposition — drag-drop boards, focus timers and sync.",
    tags: ["CRUD", "Compose", "Room"],
    url: "https://github.com/moekyawaung-tech/javascript-todo",
    color: COLORS.violet,
  },
];

export interface OrbDecision {
  text: string;
  tag: string;
  verdict: string;
}

export const ORB_DECISIONS: OrbDecision[] = [
  { tag: "ARCH", text: "Adopt Clean Architecture — Data → Domain → Presentation layers", verdict: "Approved · testability +41%" },
  { tag: "MOBILE", text: "Render UI with Jetpack Compose + Material 3 theming", verdict: "Approved · 100% Kotlin UI" },
  { tag: "STATE", text: "Expose state via ViewModel + StateFlow, one-way data flow", verdict: "Approved · no more leaks" },
  { tag: "DI", text: "Wire dependencies with Hilt, @Singleton scoped modules", verdict: "Approved · graph verified" },
  { tag: "ASYNC", text: "Concurrency with Coroutines + Flow instead of Rx chains", verdict: "Approved · overhead -52%" },
  { tag: "DATA", text: "Offline-first: Room cache + WorkManager sync queue", verdict: "Approved · survives airplane mode" },
  { tag: "NET", text: "Retrofit + OkHttp interceptor for auth & logging", verdict: "Approved · 3 retry policy" },
  { tag: "SEC", text: "EncryptedSharedPreferences for tokens, biometric gate", verdict: "Approved · vault sealed" },
  { tag: "AI", text: "Ship on-device translation with TFLite quantized model", verdict: "Approved · 4MB, 38ms" },
  { tag: "CLOUD", text: "Firestore security rules v3 + collection group queries", verdict: "Approved · audit clean" },
  { tag: "CI/CD", text: "GitHub Actions matrix build, lint, test on every PR", verdict: "Approved · pipeline green" },
  { tag: "OBS", text: "Crashlytics + analytics event taxonomy v2", verdict: "Approved · 99.7% visible" },
];

export const NAV_LINKS = [
  { label: "Board", href: "#board", key: "nav.board" },
  { label: "About", href: "#about", key: "nav.about" },
  { label: "Quantum Nodes", href: "#projects", key: "nav.nodes" },
  { label: "AI Orb", href: "#orb", key: "nav.orb" },
  { label: "Tech Stack", href: "#stack", key: "nav.stack" },
  { label: "Career", href: "#career", key: "nav.career" },
  { label: "Journal", href: "#journal", key: "nav.journal" },
  { label: "Gallery", href: "#gallery", key: "nav.gallery" },
  { label: "Contact", href: "#contact", key: "nav.contact" },
];

export interface GalleryFrame {
  src: string;
  title: string;
  alt: string;
  tag: string;
}

const CLD = "https://res.cloudinary.com/dye5qpwii/image/upload";

export const GALLERY: GalleryFrame[] = [
  { src: `${CLD}/v1778763535/MKA_25_lbx6fb.webp`, title: "Core Portrait", alt: "Moe Kyaw Aung portrait", tag: "IDENTITY" },
  { src: `${CLD}/v1778763531/MKA_12_iv8kpm.webp`, title: "Studio Session", alt: "Moe Kyaw Aung at work", tag: "SESSION" },
  { src: `${CLD}/v1778763531/MKA_3_zqrhhr.webp`, title: "Field Notes", alt: "Moe Kyaw Aung field frame", tag: "FIELD" },
  { src: `${CLD}/v1778763532/MKA_11_jbijtv.webp`, title: "Build Day", alt: "Moe Kyaw Aung build day", tag: "BUILD" },
  { src: `${CLD}/v1778763532/MKA_13_i4bao3.webp`, title: "Late Compile", alt: "Moe Kyaw Aung late session", tag: "NIGHT" },
  { src: `${CLD}/v1778795801/MKA_22_felevo.webp`, title: "Transit", alt: "Moe Kyaw Aung transit frame", tag: "CORRIDOR" },
  { src: `${CLD}/v1778795799/2024119_20_b94fen.jpg`, title: "Launchpad 2024", alt: "Developer program frame", tag: "PROGRAM" },
  { src: `${CLD}/v1778795800/2024119_18_syk2ou.jpg`, title: "Credential Day", alt: "Certification day frame", tag: "CERTS" },
  { src: `${CLD}/v1779031816/Content_65_oayzj3.jpg`, title: "Content Lab", alt: "Content creation frame", tag: "LAB" },
];
