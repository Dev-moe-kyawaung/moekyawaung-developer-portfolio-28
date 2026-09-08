import React from "react";
import { Sparkles, Trophy, MapPin, Zap, Flame, Radio, Phone } from "lucide-react";
import { PROFILE_DATA } from "../data/synthData";
import { synthAudio } from "../lib/synthAudio";

export const SynthHero: React.FC = () => {
  return (
    <section id="hero" className="relative z-10 pt-28 pb-20 px-4 max-w-6xl mx-auto flex flex-col items-center text-center">
      {/* 80s Cyber Status Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border-2 border-pink-500/40 shadow-[0_0_15px_rgba(255,42,133,0.3)] mb-6 animate-pulse">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
        <span className="font-arcade text-[10px] text-pink-300 tracking-wider">
          {PROFILE_DATA.status}
        </span>
      </div>

      {/* Retro Cyber Titles */}
      <p className="font-crt text-2xl md:text-3xl text-cyan-300 tracking-widest mb-1">
        // {PROFILE_DATA.nameMm} // TACHILEIK ↔ BANGKOK
      </p>

      <h1 className="chrome-text text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-2 uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
        MOE KYAW AUNG
      </h1>

      <div className="flex items-center justify-center gap-3 my-2">
        <span className="h-[2px] w-12 bg-gradient-to-r from-transparent to-pink-500" />
        <h2 className="font-chrome text-lg sm:text-2xl text-pink-400 font-bold tracking-widest uppercase">
          SENIOR ANDROID & RETRO-FUTURE DEVELOPER
        </h2>
        <span className="h-[2px] w-12 bg-gradient-to-l from-transparent to-pink-500" />
      </div>

      {/* VHS Tagline */}
      <p className="font-crt text-xl sm:text-2xl text-purple-200 max-w-2xl mx-auto my-4 leading-relaxed">
        &gt; CRAFTING HIGH-OCTANE ANDROID ENGINES WITH KOTLIN, JETPACK COMPOSE, CLEAN ARCHITECTURE &amp; RETRO CYBER AESTHETICS.
      </p>

      {/* Arcade Stat Tokens */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 my-8 w-full max-w-3xl">
        <div className="bg-[#150529]/80 border-2 border-pink-500/40 p-3 rounded-xl flex flex-col items-center shadow-[0_0_15px_rgba(255,42,133,0.2)]">
          <Trophy className="w-5 h-5 text-yellow-300 mb-1" />
          <span className="font-arcade text-xs text-yellow-300">82+ BADGES</span>
          <span className="font-crt text-base text-pink-300">CERTIFIED ARCH</span>
        </div>
        <div className="bg-[#150529]/80 border-2 border-cyan-500/40 p-3 rounded-xl flex flex-col items-center shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <Flame className="w-5 h-5 text-cyan-300 mb-1" />
          <span className="font-arcade text-xs text-cyan-300">16+ APPS</span>
          <span className="font-crt text-base text-cyan-200">SHIPPED ON PLAY</span>
        </div>
        <div className="bg-[#150529]/80 border-2 border-purple-500/40 p-3 rounded-xl flex flex-col items-center shadow-[0_0_15px_rgba(155,43,251,0.2)]">
          <Zap className="w-5 h-5 text-pink-400 mb-1" />
          <span className="font-arcade text-xs text-pink-300">LVL. 99</span>
          <span className="font-crt text-base text-purple-200">KOTLIN / COMPOSE</span>
        </div>
        <div className="bg-[#150529]/80 border-2 border-yellow-500/40 p-3 rounded-xl flex flex-col items-center shadow-[0_0_15px_rgba(255,230,0,0.2)]">
          <MapPin className="w-5 h-5 text-emerald-300 mb-1" />
          <span className="font-arcade text-xs text-emerald-300">2 HUBS</span>
          <span className="font-crt text-base text-yellow-200">MM 🇲🇲 ↔ TH 🇹🇭</span>
        </div>
      </div>

      {/* Action Buttons with Arcade Styling */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
        <a
          href="#cartridges"
          onClick={() => synthAudio.playInsertCoin()}
          className="px-6 py-3.5 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 hover:from-pink-500 hover:to-cyan-400 text-white font-arcade text-xs tracking-wider rounded-xl shadow-[0_0_25px_rgba(255,42,133,0.6)] flex items-center gap-2 transform hover:-translate-y-1 transition duration-300"
        >
          <Sparkles className="w-4 h-4" />
          <span>EXPLORE CARTRIDGES</span>
        </a>

        <a
          href="#ai-assistant"
          onClick={() => synthAudio.playLaser()}
          className="px-6 py-3.5 bg-[#17052e] hover:bg-[#230945] border-2 border-cyan-400 text-cyan-300 font-arcade text-xs tracking-wider rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center gap-2 transform hover:-translate-y-1 transition duration-300"
        >
          <Radio className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>CONSULT ARCADE BOT</span>
        </a>

        <a
          href="#contact"
          onClick={() => synthAudio.playCoin()}
          className="px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-arcade text-xs tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,230,0,0.5)] flex items-center gap-2 transform hover:-translate-y-1 transition duration-300"
        >
          <Phone className="w-4 h-4 text-black" />
          <span>HIRE RAD-MOE</span>
        </a>
      </div>

      {/* Current Mission Terminal Strip */}
      <div className="mt-12 w-full max-w-2xl bg-[#0d0221]/90 border border-pink-500/30 rounded-xl px-4 py-2.5 flex items-center justify-between text-left">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
          <span className="font-arcade text-[8px] text-pink-400 shrink-0">ACTIVE MISSION:</span>
          <span className="font-crt text-lg text-yellow-300 truncate">
            {PROFILE_DATA.currentMission}
          </span>
        </div>
        <span className="font-crt text-xs text-cyan-400 shrink-0 ml-2">38ms // 4MB</span>
      </div>
    </section>
  );
};
