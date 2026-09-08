import React from "react";
import { Terminal, Cpu, Phone, MessageSquare, ArrowUpRight } from "lucide-react";
import { PROFILE_DATA, SKILL_BADGES, SOCIAL_LINKS } from "../data/synthData";
import { synthAudio } from "../lib/synthAudio";

export const SynthAboutAndSkills: React.FC = () => {
  return (
    <section id="about" className="relative z-10 py-20 px-4 max-w-7xl mx-auto space-y-20">
      {/* Pilot Profile & Photo Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Polaroid / CRT Screen Framing the Cloudinary Pilot Photo */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative p-3 bg-gradient-to-b from-[#2a0e44] to-[#0c0217] border-2 border-pink-500 rounded-2xl shadow-[0_0_35px_rgba(255,42,133,0.4)]">
            {/* Top Tape Label */}
            <div className="bg-[#ff2a85] text-black font-arcade text-[9px] font-bold px-3 py-1 rounded-sm text-center tracking-widest mb-2 shadow-sm">
              PILOT CLASSIFIED DOSSIER // 1986
            </div>

            {/* Photo Container */}
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-xl overflow-hidden border-2 border-cyan-400 bg-black">
              <img
                src={PROFILE_DATA.avatarImg}
                alt={PROFILE_DATA.name}
                className="w-full h-full object-cover filter contrast-110 brightness-105"
              />
              {/* Scanline overlay over photo */}
              <div className="absolute inset-0 crt-overlay opacity-50 pointer-events-none" />

              {/* HUD Coordinates on Photo */}
              <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-sm border border-cyan-400/50 p-2 rounded text-left">
                <p className="font-arcade text-[8px] text-yellow-300">CALLSIGN: RAD_MOE</p>
                <p className="font-crt text-base text-cyan-200">LOC: TACHILEIK ↔ BANGKOK</p>
              </div>
            </div>

            {/* Micro Photo Thumbnails from Cloudinary */}
            <div className="grid grid-cols-3 gap-2 mt-3 w-64 sm:w-72">
              <div className="h-16 rounded border border-pink-500/40 overflow-hidden">
                <img src={PROFILE_DATA.actionPhoto1} alt="Coding Session" className="w-full h-full object-cover" />
              </div>
              <div className="h-16 rounded border border-cyan-500/40 overflow-hidden">
                <img src={PROFILE_DATA.actionPhoto2} alt="Workshop" className="w-full h-full object-cover" />
              </div>
              <div className="h-16 rounded border border-yellow-500/40 overflow-hidden">
                <img src={PROFILE_DATA.actionPhoto3} alt="Hardware Lab" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Retro Terminal Bio & Career Specs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/40 rounded-full font-crt text-lg text-cyan-300">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>OPERATOR LOG // MOE KYAW AUNG (မိုးကျော်အောင်)</span>
          </div>

          <h2 className="chrome-text text-3xl sm:text-5xl font-black">
            HIGH-OCTANE MOBILE ARCHITECT
          </h2>

          <div className="bg-[#110526]/90 border border-purple-500/40 p-6 rounded-2xl shadow-[inset_0_0_25px_rgba(155,43,251,0.2)] font-crt text-xl sm:text-2xl text-purple-200 leading-relaxed space-y-4">
            <p>
              &gt; Passionate senior Android developer engineering high-performance mobile apps with
              <span className="text-pink-400 font-bold"> Kotlin</span>,
              <span className="text-cyan-300 font-bold"> Jetpack Compose</span>, and
              <span className="text-yellow-300 font-bold"> Clean Architecture</span>.
            </p>
            <p>
              &gt; Proven track record delivering commercial Point-of-Sale suites with offline-first Room databases,
              Firebase backend integrations, and automated CI/CD pipelines via GitHub Actions.
            </p>
            <p>
              &gt; Armed with <span className="text-emerald-300 font-bold">82+ Programming Hub Certifications</span> spanning
              Mobile, AI/ML, Cloud Databases, Cybersecurity, and Software Architecture.
            </p>
          </div>

          {/* Pilot Specification Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#0e041d] border border-pink-500/30 p-3 rounded-xl">
              <span className="font-arcade text-[8px] text-pink-400 block mb-1">EXPERIENCE</span>
              <span className="font-crt text-2xl text-white font-bold">{PROFILE_DATA.experience}</span>
            </div>
            <div className="bg-[#0e041d] border border-cyan-500/30 p-3 rounded-xl">
              <span className="font-arcade text-[8px] text-cyan-400 block mb-1">CERTIFICATES</span>
              <span className="font-crt text-2xl text-yellow-300 font-bold">82+ BADGES</span>
            </div>
            <div className="bg-[#0e041d] border border-emerald-500/30 p-3 rounded-xl col-span-2 sm:col-span-1">
              <span className="font-arcade text-[8px] text-emerald-400 block mb-1">STATUS</span>
              <span className="font-crt text-xl text-emerald-300 font-bold">OPEN TO WORK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cyber Skill Matrix (Arcade Power Meters) */}
      <div id="skills" className="pt-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full font-crt text-lg text-pink-300 tracking-wider mb-2">
            <Cpu className="w-4 h-4 text-pink-400" />
            <span>NEON CHIPSET MATRIX // SYSTEM PROFICIENCY</span>
          </div>
          <h3 className="chrome-text-pink text-3xl md:text-4xl font-black">
            TECHNICAL ARSENAL
          </h3>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_BADGES.map((skill) => (
            <div
              key={skill.name}
              className="bg-[#100524]/90 border border-purple-500/40 p-4 rounded-xl flex flex-col justify-between hover:border-cyan-400 transition hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-chrome text-base text-white group-hover:text-cyan-300 transition">
                  {skill.name}
                </span>
                <span className="font-arcade text-[8px] text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded border border-pink-500/30">
                  {skill.category}
                </span>
              </div>

              {/* Arcade Power Gauge Bar */}
              <div className="w-full h-3 bg-black/70 rounded border border-white/20 overflow-hidden p-0.5">
                <div
                  className="h-full rounded bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 shadow-[0_0_10px_#00f0ff]"
                  style={{ width: skill.power }}
                />
              </div>

              <div className="flex justify-between items-center mt-2 font-crt text-base text-purple-300">
                <span>POWER LEVEL</span>
                <span className="text-yellow-300 font-bold">{skill.power}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retro Social Transmission Deck & Direct Phone Contact */}
      <div id="contact" className="pt-8">
        <div className="bg-gradient-to-b from-[#180534] to-[#0d0221] border-2 border-cyan-400 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,240,255,0.3)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-cyan-500/30 pb-6">
            <div>
              <span className="font-arcade text-[9px] text-yellow-300 bg-yellow-400/10 px-2.5 py-1 rounded border border-yellow-400/30">
                COMMUNICATION MATRIX
              </span>
              <h3 className="chrome-text text-3xl sm:text-4xl font-black mt-2">
                TRANSMIT MESSAGE
              </h3>
              <p className="font-crt text-xl text-cyan-200 mt-1">
                &gt; READY TO LAUNCH NEXT-GEN ANDROID &amp; FULL-STACK PRODUCTS TOGETHER
              </p>
            </div>

            {/* Direct Phone / WhatsApp Quick Dial */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${PROFILE_DATA.phone.replace(/\s+/g, "")}`}
                onClick={() => synthAudio.playCoin()}
                className="px-5 py-3 bg-pink-600 hover:bg-pink-500 text-white font-arcade text-xs rounded-xl shadow-[0_0_15px_#ff2a85] flex items-center gap-2 transition"
              >
                <Phone className="w-4 h-4" />
                <span>{PROFILE_DATA.phone}</span>
              </a>

              <a
                href={PROFILE_DATA.whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={() => synthAudio.playLaser()}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-arcade text-xs rounded-xl shadow-[0_0_15px_#05ffa1] flex items-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WHATSAPP RADIO</span>
              </a>
            </div>
          </div>

          {/* Social Channels 8-Bit Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => synthAudio.playLaser()}
                className="p-3 bg-[#0a0016] border border-pink-500/30 hover:border-cyan-400 rounded-xl flex items-center justify-between group transition hover:-translate-y-1"
              >
                <div>
                  <span className="font-chrome text-sm text-white group-hover:text-cyan-300 block">
                    {link.name}
                  </span>
                  <span className="font-crt text-base text-purple-300 truncate block max-w-[120px]">
                    {link.label}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-pink-400 group-hover:text-cyan-400 transition" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
