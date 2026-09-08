export interface ProjectCartridge {
  id: string;
  romCode: string;
  title: string;
  year: string;
  genre: string;
  category: "Android" | "Web" | "Game" | "AI" | "Utility";
  color: string;
  gradient: string;
  image: string;
  description: string;
  features: string[];
  specs: {
    stack: string;
    arch: string;
    kbSize: string;
    releaseDate: string;
  };
  githubUrl: string;
}

export const PROFILE_DATA = {
  name: "Moe Kyaw Aung",
  nameMm: "မိုးကျော်အောင်",
  codename: "RAD_MOE // 1986",
  title: "Senior Android & Retro-Future Full-Stack Developer",
  location: "Tachileik, Myanmar 🇲🇲 ↔ Bangkok, Thailand 🇹🇭",
  status: "INSERT COIN TO HIRE // READY PLAYER 1",
  philosophy: "Code with culture. Build with purpose.",
  experience: "3+ Years Active Missions",
  certificates: "82+ High-Score Badges (Programming Hub)",
  level: "LVL. 99 SENIOR ENGINEER",
  phone: "+95 9 889 000 889",
  phoneAlt: "+95 9 666 000 050",
  whatsapp: "https://wa.me/959889000889",
  gravatarUrl: "https://gravatar.com/moekyawaung13721",
  githubMain: "https://github.com/Dev-moe-kyawaung",
  avatarImg: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp",
  actionPhoto1: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_12_iv8kpm.webp",
  actionPhoto2: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_3_zqrhhr.webp",
  actionPhoto3: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763532/MKA_11_jbijtv.webp",
  currentMission: "MoekyawTranslator // On-Device AI Neural Cartridge (TFLite 4MB, 38ms)",
};

export const DATA_CARTRIDGES: ProjectCartridge[] = [
  {
    id: "social-dash",
    romCode: "ROM-SOC-01",
    title: "Social Dashboard",
    year: "1986 / 2026",
    genre: "CYBER TELEMETRY",
    category: "Android",
    color: "#ff2a85",
    gradient: "from-pink-600 via-purple-600 to-indigo-800",
    image: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778795000722_eo96gj.png",
    description: "High-octane social telemetry dashboard with real-time analytics graphs, live sentiment detection, and automated dispatch alerts.",
    features: ["Jetpack Compose UI", "Firebase Realtime Sync", "MVVM & Clean Arch", "Low-Latency Charts"],
    specs: {
      stack: "Kotlin, Compose, Firebase",
      arch: "Clean Arch + MVI",
      kbSize: "1,024 KB ROM",
      releaseDate: "APR 2026",
    },
    githubUrl: "https://github.com/moekyawaung-tech/social-dashboard",
  },
  {
    id: "video-player",
    romCode: "ROM-VID-02",
    title: "Retro Video Player",
    year: "1987 / 2026",
    genre: "NEON MEDIA STREAM",
    category: "Android",
    color: "#00f0ff",
    gradient: "from-cyan-500 via-blue-600 to-indigo-900",
    image: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795847/copilot_image_1778795115579_acfm5j.png",
    description: "Senior-grade media player engine powered by ExoPlayer Media3. Includes VHS retro filters, gesture controls, subtitle stream, and laser casting.",
    features: ["ExoPlayer Media3", "Custom Gesture Engine", "Picture-in-Picture", "Multi-Track Audio"],
    specs: {
      stack: "Kotlin, Media3, Compose",
      arch: "ExoPlayer Pipeline",
      kbSize: "2,048 KB ROM",
      releaseDate: "MAR 2026",
    },
    githubUrl: "https://github.com/moekyawaung-tech/video-player",
  },
  {
    id: "pos-ultimate",
    romCode: "ROM-POS-03",
    title: "POS Ultimate Pro Max",
    year: "1988 / 2026",
    genre: "CASH REGISTER RPG",
    category: "Android",
    color: "#ffe600",
    gradient: "from-amber-400 via-orange-600 to-red-800",
    image: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778794626112_ega7kk.png",
    description: "Heavy-duty commercial point-of-sale suite with offline-first Room DB, thermal bluetooth receipt printing, taxation logic, and multi-branch inventory.",
    features: ["Offline-first Outbox Sync", "Room DB SQLite", "Bluetooth ESC/POS", "Tax & Barcode Scanner"],
    specs: {
      stack: "Kotlin, Room, WorkManager",
      arch: "Repository + Outbox Pattern",
      kbSize: "4,096 KB ROM",
      releaseDate: "FEB 2026",
    },
    githubUrl: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max",
  },
  {
    id: "game-collection",
    romCode: "ROM-GME-04",
    title: "Arcade Game Vault",
    year: "1984 / 2026",
    genre: "8-BIT MULTI-CART",
    category: "Game",
    color: "#05ffa1",
    gradient: "from-emerald-400 via-teal-600 to-indigo-950",
    image: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795822/preview_dzhqvv.webp",
    description: "A retro-future multi-cartridge anthology packed with Neon Snake, 2048 Turbo, Space Invaders clone, and audio chiptune synth loops.",
    features: ["Custom Canvas 60FPS Loop", "Chiptune Audio Synth", "Local High Scores", "Touch Gamepad On-Screen"],
    specs: {
      stack: "Kotlin Canvas / TypeScript",
      arch: "Game Loop State Machine",
      kbSize: "512 KB ROM",
      releaseDate: "JAN 2026",
    },
    githubUrl: "https://github.com/moekyawaung-tech/game-collection",
  },
  {
    id: "weather-synth",
    romCode: "ROM-WTR-05",
    title: "Neon Weather Radar",
    year: "1989 / 2026",
    genre: "RADAR DISPATCH",
    category: "Android",
    color: "#9b2bfb",
    gradient: "from-purple-500 via-pink-600 to-rose-900",
    image: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795859/copilot_image_1778794430377_n7xlmz.png",
    description: "Cyberpunk atmospheric forecast engine tracking temperature vectors, severe storms, hourly precipitation graphs, and satellite laser scans.",
    features: ["OpenWeather REST API", "Geocoding GPS Engine", "Custom Hourly Line Charts", "Animated Neon Weather States"],
    specs: {
      stack: "Kotlin, Retrofit, Coroutines",
      arch: "Clean Architecture",
      kbSize: "768 KB ROM",
      releaseDate: "DEC 2025",
    },
    githubUrl: "https://github.com/moekyawaung-tech/Weather-app",
  },
  {
    id: "pwa-matrix",
    romCode: "ROM-PWA-06",
    title: "Synthwave PWA Matrix",
    year: "1986 / 2026",
    genre: "OFFLINE HYPERTEXT",
    category: "Web",
    color: "#ff7700",
    gradient: "from-orange-500 via-pink-600 to-purple-900",
    image: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795829/copilot_image_1778795000722_okryxj.png",
    description: "Progressive Web App installation matrix with offline cache service workers, background data sync, push notification hooks, and neon CRT styling.",
    features: ["Service Worker Cache", "Workbox Sync", "Lighthouse 100 Score", "Installable Home Screen PWA"],
    specs: {
      stack: "TypeScript, Vite, PWA Workbox",
      arch: "Offline First Event-Driven",
      kbSize: "384 KB ROM",
      releaseDate: "NOV 2025",
    },
    githubUrl: "https://github.com/moekyawaung-tech/pwa-app",
  },
  {
    id: "thailand-travel",
    romCode: "ROM-TRV-07",
    title: "Bangkok Cruise Planner",
    year: "1985 / 2026",
    genre: "NAVIGATION COMPASS",
    category: "Android",
    color: "#ff2a85",
    gradient: "from-rose-500 via-pink-600 to-indigo-900",
    image: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778795675037_heh9xk.png",
    description: "Travel & route navigation terminal connecting Tachileik to Bangkok. Features offline street maps, currency exchange rates, and tourist radar.",
    features: ["Offline Vector Maps", "THB Currency Calculator", "Metro Transit Schedules", "Bilingual Thai/English Guide"],
    specs: {
      stack: "Kotlin, Mapbox SDK, Room",
      arch: "MVVM Navigation",
      kbSize: "1,536 KB ROM",
      releaseDate: "OCT 2025",
    },
    githubUrl: "https://github.com/moekyawaung-tech/thailand-travel",
  },
  {
    id: "snake-deluxe",
    romCode: "ROM-SNK-08",
    title: "Neon Cyber Snake",
    year: "1983 / 2026",
    genre: "ARCADE REFLEX",
    category: "Game",
    color: "#00f0ff",
    gradient: "from-cyan-400 via-teal-600 to-slate-900",
    image: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778747388/image-1_1_khsx9s.png",
    description: "The classic arcade snake reconstructed with neon vector glow trails, particle fruit explosion bursts, and synthwave laser audio blips.",
    features: ["60FPS Canvas Loop", "Vector Trail Glow", "Speed Multipliers", "Retro High Score Table"],
    specs: {
      stack: "TypeScript / Canvas / Kotlin",
      arch: "Event Loop Game Engine",
      kbSize: "256 KB ROM",
      releaseDate: "SEP 2025",
    },
    githubUrl: "https://github.com/moekyawaung-tech/Snake-Game-App",
  },
];

export const SKILL_BADGES = [
  { name: "Kotlin", category: "Core", power: "98%", color: "#9b2bfb" },
  { name: "Jetpack Compose", category: "Mobile", power: "96%", color: "#ff2a85" },
  { name: "Android SDK", category: "Mobile", power: "95%", color: "#00f0ff" },
  { name: "Clean Architecture", category: "System", power: "94%", color: "#ffe600" },
  { name: "MVVM / MVI", category: "Pattern", power: "96%", color: "#05ffa1" },
  { name: "Firebase Suite", category: "Backend", power: "92%", color: "#ff7700" },
  { name: "Room SQLite", category: "Storage", power: "95%", color: "#00f0ff" },
  { name: "Retrofit & REST", category: "Network", power: "97%", color: "#ff2a85" },
  { name: "Coroutines & Flow", category: "Async", power: "96%", color: "#9b2bfb" },
  { name: "TFLite On-Device", category: "AI / ML", power: "88%", color: "#ffe600" },
  { name: "Python", category: "AI / Script", power: "85%", color: "#05ffa1" },
  { name: "TypeScript / React", category: "Frontend", power: "90%", color: "#00f0ff" },
  { name: "Cybersecurity & Kali", category: "Security", power: "86%", color: "#ff2a85" },
  { name: "GitHub Actions CI/CD", category: "DevOps", power: "92%", color: "#05ffa1" },
];

export const ARCADE_TIPS = [
  "RAD-BOT TIP: Press [INSERT COIN / TEST DRIVE] to hear genuine 80s arcade sound synthesis!",
  "RAD-BOT TIP: Click any Retro Cartridge to load its ROM specs, memory size, and source repository!",
  "RAD-BOT TIP: Moe Kyaw Aung holds 82+ Programming Hub high score certificates across 9 major domains!",
  "RAD-BOT TIP: Currently building 'MoekyawTranslator' on-device neural translator running in under 38ms!",
  "RAD-BOT TIP: Need an Android mobile app built with Jetpack Compose & Clean Arch? Direct radio frequency +959889000889!",
  "RAD-BOT TIP: Toggle the CRT Scanlines & Neon Glow toggles on the top console if you need low-power mode!",
];

export const ARCADE_DECISIONS = [
  {
    topic: "ARCHITECTURE",
    query: "Clean Architecture vs Spaghetti Code",
    verdict: "CLEAN ARCHITECTURE 100% DEPLOYED. Presentation -> Domain -> Data with strict boundaries. Testability skyrocketed by 45%!",
    badge: "CRITICAL WIN",
    color: "#05ffa1",
  },
  {
    topic: "UI FRAMEWORK",
    query: "Declarative Compose vs Legacy XML",
    verdict: "JETPACK COMPOSE CHOSEN. 100% Kotlin UI code, rapid state animation loops, Material 3 retro themes with zero boilerplate.",
    badge: "SPEED BOOST",
    color: "#ff2a85",
  },
  {
    topic: "ASYNC ENGINE",
    query: "Kotlin Coroutines + Flow vs RxJava",
    verdict: "COROUTINES + FLOW SELECTED. Lightweight cooperative threading, structured concurrency, zero thread-leak vulnerabilities.",
    badge: "OPTIMIZED",
    color: "#00f0ff",
  },
  {
    topic: "DATABASE",
    query: "Offline-First Room vs Cloud-Only Network",
    verdict: "ROOM SQLite PERSISTENCE ENGINE. Instant load times, outbox mutation queue for smooth reconnection in Tachileik dead zones.",
    badge: "OFFLINE READY",
    color: "#ffe600",
  },
  {
    topic: "ON-DEVICE AI",
    query: "Cloud LLM latency vs 4MB TFLite Quantized Model",
    verdict: "TFLITE NEURAL ENGINE. Zero network needed, 38ms inference speed, privacy guaranteed for bilingual travelers.",
    badge: "AI TURBO",
    color: "#9b2bfb",
  },
  {
    topic: "SECURITY",
    query: "Plain SharedPreferences vs Android Keystore Vault",
    verdict: "ENCRYPTED SHARED PREFS + BIOMETRICS. AES-256 GCM hardware-backed master key. Bank-level protection for sensitive tokens.",
    badge: "VAULT SHIELD",
    color: "#ff7700",
  },
];

export const SOCIAL_LINKS = [
  { name: "GitHub", url: "https://github.com/Dev-moe-kyawaung", iconName: "github", label: "Dev-moe-kyawaung", color: "#00f0ff" },
  { name: "Gravatar", url: "https://gravatar.com/moekyawaung13721", iconName: "gravatar", label: "moekyawaung13721", color: "#ff2a85" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1", iconName: "linkedin", label: "Moe Kyaw Aung", color: "#05ffa1" },
  { name: "YouTube", url: "https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG", iconName: "youtube", label: "Dev Moe Channel", color: "#ff0055" },
  { name: "Bluesky", url: "https://bsky.app/profile/moekyawaung96.bsky.social", iconName: "bluesky", label: "@moekyawaung96", color: "#00f0ff" },
  { name: "Vimeo", url: "https://vimeo.com/user252414232", iconName: "vimeo", label: "Video Portfolio", color: "#ffe600" },
  { name: "Tumblr", url: "https://www.tumblr.com/moekyawaung", iconName: "tumblr", label: "Retro Logs", color: "#9b2bfb" },
  { name: "Flickr", url: "https://www.flickr.com/people/204037451@N06", iconName: "flickr", label: "Photo Vault", color: "#ff7700" },
];
