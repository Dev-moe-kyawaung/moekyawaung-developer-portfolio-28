import React, { useState } from "react";
import { Volume2, VolumeX, Radio, Tv, Gamepad2, Disc } from "lucide-react";
import { synthAudio } from "../lib/synthAudio";

interface SynthNavProps {
  crtActive: boolean;
  onToggleCrt: () => void;
}

export const SynthNavbar: React.FC<SynthNavProps> = ({ crtActive, onToggleCrt }) => {
  const [audioActive, setAudioActive] = useState(false);

  const toggleSound = () => {
    const next = synthAudio.toggleSound();
    setAudioActive(next);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#0c0219]/90 backdrop-blur-md border-b-2 border-pink-500/40 shadow-[0_4px_25px_rgba(255,42,133,0.35)]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <a
          href="#hero"
          onClick={() => synthAudio.playCoin()}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-pink-600 via-purple-600 to-cyan-400 p-0.5 shadow-[0_0_12px_#ff2a85] flex items-center justify-center">
            <span className="font-arcade text-xs text-white">86</span>
          </div>
          <div>
            <span className="font-chrome text-lg font-black tracking-wider text-white group-hover:text-cyan-300 transition block leading-tight">
              MKA<span className="text-pink-500">//</span>SYNTH
            </span>
            <span className="font-crt text-xs text-cyan-400 tracking-widest block -mt-0.5">
              RETRO-FUTURE PORTFOLIO
            </span>
          </div>
        </a>

        {/* Center Nav Links (Arcade Style) */}
        <nav className="hidden md:flex items-center gap-6 font-arcade text-[10px] tracking-wider">
          <a
            href="#hero"
            onClick={() => synthAudio.playLaser()}
            className="text-purple-300 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_#00f0ff] transition"
          >
            START
          </a>
          <a
            href="#cartridges"
            onClick={() => synthAudio.playCartridgeSlot()}
            className="text-purple-300 hover:text-pink-400 hover:drop-shadow-[0_0_8px_#ff2a85] transition flex items-center gap-1"
          >
            <Disc className="w-3 h-3 text-pink-400 animate-spin-slow" />
            <span>CARTRIDGES</span>
          </a>
          <a
            href="#ai-assistant"
            onClick={() => synthAudio.playLaser()}
            className="text-purple-300 hover:text-yellow-300 hover:drop-shadow-[0_0_8px_#ffe600] transition flex items-center gap-1"
          >
            <Gamepad2 className="w-3 h-3 text-yellow-300" />
            <span>RAD-BOT</span>
          </a>
          <a
            href="#skills"
            onClick={() => synthAudio.playLaser()}
            className="text-purple-300 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_#00f0ff] transition"
          >
            CHIPSET
          </a>
          <a
            href="#contact"
            onClick={() => synthAudio.playCoin()}
            className="text-purple-300 hover:text-emerald-300 hover:drop-shadow-[0_0_8px_#05ffa1] transition"
          >
            RADIO
          </a>
        </nav>

        {/* Action Controls: Sound Toggle & CRT Toggle */}
        <div className="flex items-center gap-2">
          {/* Audio Chiptune Synth Toggle */}
          <button
            onClick={toggleSound}
            className={`px-3 py-1.5 rounded-lg border font-arcade text-[9px] flex items-center gap-1.5 transition ${
              audioActive
                ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_#00f0ff]"
                : "bg-purple-950/40 border-purple-500/30 text-purple-400 hover:border-pink-500 hover:text-pink-300"
            }`}
            title="Toggle 80s Sound Synthesis"
          >
            {audioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{audioActive ? "SYNTH: ON" : "SYNTH: OFF"}</span>
          </button>

          {/* CRT Scanline Toggle */}
          <button
            onClick={() => {
              synthAudio.playLaser();
              onToggleCrt();
            }}
            className={`px-3 py-1.5 rounded-lg border font-arcade text-[9px] flex items-center gap-1.5 transition ${
              crtActive
                ? "bg-pink-500/20 border-pink-400 text-pink-300 shadow-[0_0_12px_#ff2a85]"
                : "bg-purple-950/40 border-purple-500/30 text-purple-400 hover:border-pink-500"
            }`}
            title="Toggle CRT Scanline Shader"
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CRT FX</span>
          </button>

          {/* Insert Coin Easter Egg Button */}
          <button
            onClick={() => synthAudio.playInsertCoin()}
            className="hidden lg:flex items-center gap-1 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-arcade text-[9px] font-bold rounded-lg shadow-[0_0_10px_#ffe600] transition"
          >
            <Radio className="w-3 h-3 text-black animate-pulse" />
            <span>1 COIN</span>
          </button>
        </div>
      </div>
    </header>
  );
};
