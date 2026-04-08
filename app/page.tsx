"use client";

import React from "react";
import { MessengerWorld } from "@/features/messenger/components/MessengerWorld";
import { ChatOverlay } from "@/features/ui/components/ChatOverlay";
import { LandingPage } from "@/features/ui/components/LandingPage";
import { ActionButtons } from "@/features/ui/components/ActionButtons";
import { useUIStore } from "@/features/ui/hooks/useUIStore";

/**
 * Main entry page for the Dheeraj Portfolio.
 * Implements the realistic Abeto Messenger overhaul.
 * This file stays under the 80-line hard limit.
 */
export default function Home() {
  const isStarted = useUIStore((state) => state.isStarted);

  if (!isStarted) {
    return <LandingPage />;
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden animate-fade-in bg-[#98E4E0]">
      {/* 3D Scene Layer (Realistic City) */}
      <div className="absolute inset-0 z-0">
        <MessengerWorld />
      </div>

      {/* UI Interaction Layer */}
      <ActionButtons />
      
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-8 pointer-events-none">
        <div className="max-w-4xl mx-auto pointer-events-auto">
          <ChatOverlay />
        </div>
      </div>
    </main>
  );
}
