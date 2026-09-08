import { useState } from "react";
import { SynthNavbar } from "./components/SynthNavbar";
import { SynthBackground } from "./components/SynthBackground";
import { SynthHero } from "./components/SynthHero";
import { CartridgeRack } from "./components/CartridgeRack";
import { ArcadeAssistant } from "./components/ArcadeAssistant";
import { SynthAboutAndSkills } from "./components/SynthAboutAndSkills";
import { PROFILE_DATA } from "./data/synthData";
import { synthAudio } from "./lib/synthAudio";
import { Disc, ArrowUp } from "lucide-react";

export default function App() {
  const [crtActive, setCrtActive] = useState(true);

  const scrollToTop = () => {
    synthAudio.playLaser();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#080114] text-purple-100 font-body selection:bg-pink-500 selection:text-white">
      {/* Dynamic 80s Synthwave Starfield, Neon Sun & 3D Wireframe Perspective Grid */}
      <SynthBackground showGrid={true} />

      {/* Global CRT Scanlines, Flicker & Curved TV Vignette (Toggleable) */}
      {crtActive && (
        <div className="fixed inset-0 z-50 pointer-events-none crt-overlay crt-vignette crt-flicker" />
      )}

      {/* Fixed Synthwave Header Console */}
      <SynthNavbar crtActive={crtActive} onToggleCrt={() => setCrtActive((prev) => !prev)} />

      {/* Main Experience Stream */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section: Chrome Text, VHS Coordinates & Quick Action Badges */}
        <SynthHero />

        {/* Retro Data Cartridges: Slide-in Cartridge Rack & ROM Modal */}
        <CartridgeRack />

        {/* 80s Arcade AI Copilot: Floating Interactive Assistant with Decision Matrix */}
        <ArcadeAssistant />

        {/* Pilot Dossier, Photo Vault, Chipset Power Levels & Social Radio */}
        <SynthAboutAndSkills />
      </main>

      {/* Retro Synthwave Footer with Cassette Tape Reel Visual */}
      <footer className="relative z-10 mt-20 border-t-2 border-pink-500/40 bg-[#070112]/95 py-10 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          {/* Cassette Tape Visual */}
          <div className="w-56 h-28 bg-[#1a0b30] border-2 border-cyan-400 rounded-xl p-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] flex flex-col justify-between">
            <div className="flex justify-between items-center px-2">
              <span className="font-arcade text-[7px] text-pink-400">SIDE A // STEREO</span>
              <span className="font-arcade text-[7px] text-yellow-300">C-60 HIGH-BIAS</span>
            </div>

            {/* Tape Wheels */}
            <div className="flex justify-center items-center gap-10">
              <div className="w-9 h-9 rounded-full bg-black border-2 border-white/60 flex items-center justify-center cassette-reel">
                <Disc className="w-6 h-6 text-cyan-300" />
              </div>
              <div className="w-16 h-4 bg-black/60 rounded border border-white/20 flex items-center justify-center">
                <span className="w-10 h-1 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full" />
              </div>
              <div className="w-9 h-9 rounded-full bg-black border-2 border-white/60 flex items-center justify-center cassette-reel">
                <Disc className="w-6 h-6 text-pink-400" />
              </div>
            </div>

            <div className="text-center font-arcade text-[8px] text-cyan-300 truncate px-2">
              RAD-86 // MOE KYAW AUNG PORTFOLIO
            </div>
          </div>

          <p className="font-arcade text-[10px] text-pink-400 tracking-wider">
            &copy; 1986 - 2026 MOE KYAW AUNG ({PROFILE_DATA.nameMm})
          </p>

          <p className="font-crt text-lg text-purple-300 max-w-md">
            Built with React, Vite, Tailwind CSS, Web Audio Synth, and pure 1980s Retro-Future neon energy.
          </p>

          <div className="flex items-center gap-4 text-xs font-arcade text-yellow-300 mt-2">
            <span>READY PLAYER 1</span>
            <span>•</span>
            <span className="text-cyan-400">HIGH SCORE: 999,990</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1 bg-pink-500/20 hover:bg-pink-500/40 border border-pink-400 rounded text-pink-300 transition"
            >
              <ArrowUp className="w-3 h-3" />
              <span>TOP</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
