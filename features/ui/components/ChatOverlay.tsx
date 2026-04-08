"use client";

import React from "react";
import { ChevronRight, MessageSquareText } from "lucide-react";
import { useChatStore } from "../hooks/useChatStore";
import { GlassContainer } from "@/shared/ui/GlassContainer";

/**
 * Messenger-style chat overlay for the Abeto Messenger clone.
 * Matches the translucent dialogue boxes with monospaced text.
 */
export const ChatOverlay = () => {
  const { currentMessage, nextMessage } = useChatStore();

  return (
    <div className="flex flex-col gap-4 animate-slide-up">
      {/* Header / Avatar Label */}
      <div className="flex items-center gap-2 mb-[-8px] ml-2">
        <div className="bg-messenger-sky text-white px-3 py-1 rounded-t-lg font-mono text-sm messenger-border">
          DHEERAJ
        </div>
      </div>

      {/* Main Dialogue Box */}
      <GlassContainer className="flex items-start gap-4 shadow-xl border-2">
        <div className="bg-messenger-sky p-2 rounded-lg text-white">
          <MessageSquareText size={20} />
        </div>
        
        <div className="flex-1">
          <p className="font-mono text-lg text-slate-800 leading-relaxed min-h-[3rem]">
            {currentMessage}
          </p>
          
          <div className="flex justify-end mt-4">
            <button
              onClick={nextMessage}
              className="flex items-center gap-2 bg-messenger-sky text-white px-4 py-2 rounded-lg font-mono font-bold hover:bg-blue-600 transition-colors messenger-border-sm"
              style={{ border: "2px solid #000" }}
            >
              NEXT
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </GlassContainer>
      
      {/* Interaction Hint */}
      <div className="text-center text-slate-600 font-mono text-xs opacity-60">
        USE [W A S D] OR [ARROWS] TO MOVE
      </div>
    </div>
  );
};
