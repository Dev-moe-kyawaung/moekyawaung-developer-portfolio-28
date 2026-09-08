import React, { useState, useEffect } from "react";
import { Bot, Terminal, Sparkles, ChevronRight, Volume2, ShieldCheck, Cpu, Database, Layout } from "lucide-react";
import { ARCADE_DECISIONS, ARCADE_TIPS } from "../data/synthData";
import { synthAudio } from "../lib/synthAudio";

export const ArcadeAssistant: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [tipIdx, setTipIdx] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [speechBubble, setSpeechBubble] = useState<string>(ARCADE_DECISIONS[0].verdict);
  const [soundOn, setSoundOn] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    // Rotate tip every 12s
    const timer = setInterval(() => {
      setTipIdx((prev) => (prev + 1) % ARCADE_TIPS.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleDecisionSelect = (index: number) => {
    synthAudio.playLaser();
    setIsThinking(true);
    setCurrentIdx(index);
    setBurstKey((prev) => prev + 1);

    setTimeout(() => {
      setIsThinking(false);
      setSpeechBubble(ARCADE_DECISIONS[index].verdict);
      synthAudio.playCoin();
    }, 350);
  };

  const handleNextDecision = () => {
    const next = (currentIdx + 1) % ARCADE_DECISIONS.length;
    handleDecisionSelect(next);
  };

  const currentDecision = ARCADE_DECISIONS[currentIdx];

  const getDecisionIcon = (topic: string) => {
    switch (topic) {
      case "ARCHITECTURE": return <Layout className="w-4 h-4 text-pink-400" />;
      case "UI FRAMEWORK": return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case "ASYNC ENGINE": return <Cpu className="w-4 h-4 text-purple-400" />;
      case "DATABASE": return <Database className="w-4 h-4 text-yellow-400" />;
      case "SECURITY": return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      default: return <Terminal className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="ai-assistant" className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full font-crt text-lg text-pink-400 tracking-wider mb-2">
          <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>80s ARCADE NEURAL COMPANION // SYS_ASSISTANT v86</span>
        </div>
        <h2 className="chrome-text text-3xl md:text-5xl font-black tracking-wider">
          AI ARCADE COPILOT
        </h2>
        <p className="font-crt text-xl text-cyan-300 max-w-2xl mx-auto mt-2">
          &gt; LIVE ARCHITECTURE ADVISOR FOR SENIOR ANDROID & FULL-STACK SYSTEM DECISIONS
        </p>
      </div>

      {/* Main Arcade Cabinet Box */}
      <div className="relative bg-[#0e041d]/90 border-2 border-[#ff2a85] rounded-2xl p-6 md:p-8 shadow-[0_0_35px_rgba(255,42,133,0.35)] backdrop-blur-md">
        {/* Top Cabinet Bezel Screw Caps */}
        <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#ffe600]" />
        <div className="absolute top-3 right-4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
        <div className="absolute bottom-3 left-4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
        <div className="absolute bottom-3 right-4 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#ffe600]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Pixel Bot Avatar with CRT Hologram Aura */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Hologram Projector Pedestal */}
            <div className="relative flex items-center justify-center w-56 h-56 md:w-64 md:h-64">
              {/* Rotating Hologram Rings */}
              <div className="absolute inset-0 border-2 border-dashed border-cyan-400/40 rounded-full animate-spin-slow" />
              <div className="absolute inset-4 border border-pink-500/30 rounded-full animate-spin-slower" />
              <div className="absolute inset-8 border border-yellow-400/20 rounded-full" />

              {/* Laser Particle Bursts when decision switches */}
              {burstKey > 0 && (
                <div key={burstKey} className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-2 border-cyan-300 animate-ping opacity-60" />
                  <div className="w-32 h-32 rounded-full border border-pink-400 animate-ping opacity-80" />
                </div>
              )}

              {/* Bot Core Screen */}
              <div className="relative z-10 w-40 h-40 md:w-44 md:h-44 bg-[#0a0017] border-2 border-cyan-400 rounded-3xl p-3 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.6)]">
                {/* Robot Antenna with Blinking LED */}
                <div className="absolute -top-6 flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_10px_#ff2a85] animate-ping" />
                  <div className="w-1 h-4 bg-cyan-400" />
                </div>

                {/* Pixel Face Grid */}
                <div className="relative flex flex-col items-center justify-center gap-3">
                  {/* Eyes (Blinking animated LED matrices) */}
                  <div className="flex gap-6 items-center">
                    <div className="w-6 h-5 bg-cyan-300 rounded-sm shadow-[0_0_10px_#00f0ff] flex items-center justify-center">
                      <div className="w-2 h-2 bg-black rounded-xs" />
                    </div>
                    <div className="w-6 h-5 bg-cyan-300 rounded-sm shadow-[0_0_10px_#00f0ff] flex items-center justify-center">
                      <div className="w-2 h-2 bg-black rounded-xs" />
                    </div>
                  </div>

                  {/* Blush Cheeks */}
                  <div className="flex justify-between w-24 px-1">
                    <div className="w-2.5 h-1 bg-pink-500 rounded-full shadow-[0_0_6px_#ff2a85]" />
                    <div className="w-2.5 h-1 bg-pink-500 rounded-full shadow-[0_0_6px_#ff2a85]" />
                  </div>

                  {/* Mouth: Equalizer / Speech Spectrum */}
                  <div className="flex items-end gap-1 h-6">
                    <span className="w-1.5 h-3 bg-pink-400 rounded-xs animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-5 bg-yellow-300 rounded-xs animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-6 bg-cyan-300 rounded-xs animate-bounce" style={{ animationDelay: "300ms" }} />
                    <span className="w-1.5 h-4 bg-pink-500 rounded-xs animate-bounce" style={{ animationDelay: "100ms" }} />
                    <span className="w-1.5 h-2 bg-yellow-400 rounded-xs animate-bounce" style={{ animationDelay: "250ms" }} />
                  </div>
                </div>

                <div className="absolute bottom-2 font-arcade text-[8px] text-pink-400 tracking-wider">
                  RAD-BOT '86
                </div>
              </div>
            </div>

            {/* Arcade Status Badge */}
            <div className="mt-4 flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-arcade text-[10px] text-yellow-300 bg-yellow-500/10 border border-yellow-500/30 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                100% ONLINE
              </span>
              <button
                onClick={() => {
                  const state = synthAudio.toggleSound();
                  setSoundOn(state);
                }}
                className={`flex items-center gap-1 font-arcade text-[10px] px-3 py-1 rounded-full border transition ${
                  soundOn
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_#00f0ff]"
                    : "bg-pink-500/10 border-pink-500/30 text-pink-400 hover:border-pink-400"
                }`}
              >
                <Volume2 className="w-3 h-3" />
                {soundOn ? "AUDIO: ON" : "AUDIO: OFF"}
              </button>
            </div>
          </div>

          {/* Right Column: Arcade Speech Bubble & Decision Matrix */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Retro CRT Speech Console */}
            <div className="relative bg-[#070114] border-2 border-cyan-400/80 rounded-xl p-5 shadow-[inset_0_0_20px_rgba(0,240,255,0.25)]">
              {/* Top Terminal Strip */}
              <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="font-arcade text-[9px] text-cyan-400 ml-2">
                    RAD_COPILOT://TRANSMISSION
                  </span>
                </div>
                <span className="font-crt text-lg text-yellow-300">
                  DECISION {currentIdx + 1}/{ARCADE_DECISIONS.length}
                </span>
              </div>

              {/* Decision Query Header */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-pink-500/20 border border-pink-500/50 font-arcade text-[9px] text-pink-300">
                  {getDecisionIcon(currentDecision.topic)}
                  {currentDecision.topic}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 font-arcade text-[9px] text-emerald-300">
                  {currentDecision.badge}
                </span>
              </div>

              <h4 className="font-chrome text-lg text-white mb-2 tracking-wide">
                &gt; {currentDecision.query}
              </h4>

              {/* Bot Speech Bubble (Typewriter-style verdict) */}
              <div className="min-h-[70px] bg-black/50 p-3.5 rounded-lg border border-pink-500/30 font-crt text-xl md:text-2xl text-cyan-200 leading-snug">
                {isThinking ? (
                  <span className="flex items-center gap-2 text-yellow-300 animate-pulse">
                    <span>SYNTHESIZING NEURAL VECTORS...</span>
                  </span>
                ) : (
                  <span>
                    &gt; {speechBubble}
                    <span className="inline-block w-2 h-4 bg-pink-500 ml-1 animate-pulse" />
                  </span>
                )}
              </div>

              {/* Next Decision Action Button */}
              <div className="mt-4 flex flex-wrap gap-3 items-center justify-between">
                <div className="flex gap-1.5 overflow-x-auto py-1">
                  {ARCADE_DECISIONS.map((dec, i) => (
                    <button
                      key={dec.topic}
                      onClick={() => handleDecisionSelect(i)}
                      className={`px-2.5 py-1 rounded font-arcade text-[8px] transition ${
                        currentIdx === i
                          ? "bg-pink-600 text-white shadow-[0_0_10px_#ff2a85]"
                          : "bg-purple-950/60 text-purple-300 hover:bg-purple-900 border border-purple-500/30"
                      }`}
                    >
                      #{i + 1} {dec.topic}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNextDecision}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-arcade text-[9px] tracking-wider rounded-lg shadow-[0_0_15px_rgba(255,42,133,0.5)] transition"
                >
                  <span>NEXT ARCH SPEC</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Marquee Ticker: 80s Arcade Tips & Secrets */}
            <div className="bg-[#120524] border border-yellow-500/30 rounded-lg px-4 py-2 flex items-center gap-3 overflow-hidden shadow-[inset_0_0_10px_rgba(255,230,0,0.1)]">
              <span className="px-2 py-0.5 bg-yellow-400 text-black font-arcade text-[8px] font-bold rounded shrink-0">
                TIP #{tipIdx + 1}
              </span>
              <div className="font-crt text-lg text-yellow-200 truncate">
                {ARCADE_TIPS[tipIdx]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
