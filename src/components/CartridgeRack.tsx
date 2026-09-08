import React, { useState } from "react";
import { Play, FolderGit2, Disc, Filter, X } from "lucide-react";
import { DATA_CARTRIDGES, ProjectCartridge } from "../data/synthData";
import { synthAudio } from "../lib/synthAudio";

export const CartridgeRack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedCartridge, setSelectedCartridge] = useState<ProjectCartridge | null>(null);

  const categories = ["ALL", "Android", "Game", "Web"];

  const filteredCartridges = activeCategory === "ALL"
    ? DATA_CARTRIDGES
    : DATA_CARTRIDGES.filter((c) => c.category === activeCategory);

  const handleSelectCartridge = (cartridge: ProjectCartridge) => {
    synthAudio.playCartridgeSlot();
    setSelectedCartridge(cartridge);
  };

  const closeModal = () => {
    synthAudio.playLaser();
    setSelectedCartridge(null);
  };

  return (
    <section id="cartridges" className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full font-crt text-lg text-yellow-300 tracking-wider mb-2">
            <Disc className="w-4 h-4 text-yellow-400 animate-spin-slow" />
            <span>ROM VAULT // 8-BIT & 16-BIT RETRO DATA CARTRIDGES</span>
          </div>
          <h2 className="chrome-text-pink text-3xl md:text-5xl font-black tracking-wider">
            PROJECT CARTRIDGES
          </h2>
          <p className="font-crt text-xl text-cyan-300 max-w-xl mt-1">
            &gt; SLIDE CARTRIDGES DIRECTLY INTO CONSOLE SLOT TO LOAD SOURCE ARCHITECTURE & SPECS
          </p>
        </div>

        {/* Filter Buttons styled like arcade selector buttons */}
        <div className="flex items-center gap-2 bg-[#120626] border border-pink-500/30 p-1.5 rounded-xl self-start md:self-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-pink-400 ml-2 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                synthAudio.playLaser();
                setActiveCategory(cat);
              }}
              className={`px-3 py-1 rounded-lg font-arcade text-[9px] uppercase tracking-wider transition ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_0_12px_#ff2a85]"
                  : "text-purple-300 hover:text-white hover:bg-purple-900/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cartridge Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredCartridges.map((cartridge, idx) => (
          <div
            key={cartridge.id}
            onClick={() => handleSelectCartridge(cartridge)}
            className="cartridge-shell cartridge-insert cursor-pointer group flex flex-col justify-between"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {/* Top Plastic Grip ridges */}
            <div className="cartridge-grip" />

            {/* Cartridge Body / Housing */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              {/* ROM Code & Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-arcade text-[8px] text-pink-400 bg-black/60 px-2 py-0.5 rounded border border-pink-500/40 tracking-wider">
                  {cartridge.romCode}
                </span>
                <span className="font-crt text-base text-yellow-300">
                  {cartridge.year}
                </span>
              </div>

              {/* Holographic Cartridge Art Label */}
              <div className="cartridge-label rounded-lg border-2 border-black/80 p-2.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] mb-3 flex flex-col justify-between h-48">
                {/* Screenshot Frame */}
                <div className="relative w-full h-32 rounded overflow-hidden border border-white/30 bg-black">
                  <img
                    src={cartridge.image}
                    alt={cartridge.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-black/80 text-cyan-300 font-arcade text-[7px] rounded">
                    {cartridge.category}
                  </div>
                </div>

                {/* Game Title on Label */}
                <div className="mt-2 text-center">
                  <h3 className="font-chrome text-sm font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] truncate tracking-wide">
                    {cartridge.title}
                  </h3>
                  <p className="font-arcade text-[7px] text-yellow-200 uppercase tracking-widest mt-0.5">
                    {cartridge.genre}
                  </p>
                </div>
              </div>

              {/* Cartridge Specs Preview */}
              <div className="bg-[#0b0417] p-2.5 rounded border border-purple-500/30 text-xs font-crt text-purple-200 space-y-1 mb-2">
                <div className="flex justify-between">
                  <span className="text-pink-400">STACK:</span>
                  <span className="text-white truncate max-w-[120px]">{cartridge.specs.stack}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-400">MEMORY:</span>
                  <span className="text-yellow-300">{cartridge.specs.kbSize}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                className="w-full py-2 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 group-hover:from-pink-500 group-hover:to-cyan-400 text-white font-arcade text-[8px] uppercase tracking-widest rounded flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(255,42,133,0.4)] transition"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>LOAD CARTRIDGE</span>
              </button>
            </div>

            {/* Bottom Golden Pin Connectors */}
            <div className="cartridge-pins" />
          </div>
        ))}
      </div>

      {/* Cartridge Console Insertion Modal */}
      {selectedCartridge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#120626] border-2 border-cyan-400 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,240,255,0.4)] arcade-hud-border">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-pink-400 hover:text-white hover:bg-pink-600/30 rounded-lg border border-pink-500/40 transition"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cartridge Status Strip */}
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-cyan-500/30">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-arcade text-xs text-cyan-300 tracking-wider">
                ROM INSERTED: {selectedCartridge.romCode} // READY
              </span>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left: Cartridge Box Art */}
              <div className="rounded-xl overflow-hidden border-2 border-pink-500/60 shadow-[0_0_20px_rgba(255,42,133,0.5)]">
                <img
                  src={selectedCartridge.image}
                  alt={selectedCartridge.title}
                  className="w-full h-56 object-cover"
                />
              </div>

              {/* Right: Detailed Game Specs */}
              <div>
                <span className="font-arcade text-[9px] text-yellow-300 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/30">
                  {selectedCartridge.category} // {selectedCartridge.specs.kbSize}
                </span>

                <h3 className="font-chrome text-2xl text-white mt-2 mb-1">
                  {selectedCartridge.title}
                </h3>
                <p className="font-arcade text-[8px] text-pink-400 tracking-widest mb-3">
                  GENRE: {selectedCartridge.genre} ({selectedCartridge.year})
                </p>

                <p className="font-crt text-lg text-cyan-100 leading-snug mb-4">
                  {selectedCartridge.description}
                </p>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {selectedCartridge.features.map((feat) => (
                    <span
                      key={feat}
                      className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/40 font-crt text-sm text-purple-300"
                    >
                      ★ {feat}
                    </span>
                  ))}
                </div>

                {/* External GitHub Link Button */}
                <div className="flex gap-3">
                  <a
                    href={selectedCartridge.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-arcade text-[10px] tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-[0_0_15px_#ff2a85] transition"
                  >
                    <FolderGit2 className="w-4 h-4" />
                    <span>VIEW SOURCE REPO</span>
                  </a>
                  <button
                    onClick={closeModal}
                    className="py-2.5 px-4 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400 font-arcade text-[10px] rounded-lg transition"
                  >
                    EJECT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
