"use client";

import React from "react";
import { Play } from "lucide-react";
import { useUIStore } from "../hooks/useUIStore";

/**
 * Landing overlay for the project.
 * High-fidelity 'Wow' factor at first glance.
 */
export const LandingPage = () => {
  const { setStarted } = useUIStore();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#7DC0BB] p-4 text-center">
      <div className="animate-fade-in flex flex-col items-center gap-8">
        {/* Title Blocks (Abeto Style) */}
        <div className="flex flex-wrap justify-center gap-4 mb-4 scale-75 md:scale-100">
          {["M", "E", "S", "S", "E", "N", "G", "E", "R"].map((char, i) => (
            <div
              key={i}
              className="w-16 h-16 bg-white flex items-center justify-center text-4xl font-bold messenger-border rounded-lg animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {char}
            </div>
          ))}
        </div>

        <h2 className="font-mono text-2xl text-blue-900 mb-8 opacity-80">
          DHEERAJ'S 3D PORTFOLIO
        </h2>

        {/* Begin Button */}
        <button
          onClick={() => setStarted(true)}
          className="group relative flex items-center gap-4 bg-white text-blue-900 px-12 py-6 rounded-2xl font-bold text-3xl messenger-border hover:scale-105 transition-transform active:scale-95"
        >
          BEGIN
          <Play className="fill-blue-900" size={32} />
        </button>
      </div>

      <div className="absolute bottom-12 font-mono text-blue-800 opacity-40 text-sm">
        POWERED BY NEXT.JS & R3F
      </div>
    </div>
  );
};
