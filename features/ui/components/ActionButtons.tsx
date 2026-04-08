"use client";

import React from "react";
import { Menu, Shirt, Music, Smile } from "lucide-react";

const IconButton = ({ children }: { children: React.ReactNode }) => (
  <button className="flex items-center justify-center w-14 h-14 bg-white messenger-border rounded-xl transition-transform hover:scale-110 active:scale-95 group">
    <div className="text-slate-800 transition-colors group-hover:text-messenger-sky">
      {children}
    </div>
  </button>
);

/**
 * Floating action buttons for the Abeto Messenger experience.
 * Matches the layout of icons on the right side of the screen.
 */
export const ActionButtons = () => {
  return (
    <div className="fixed right-6 top-6 flex flex-col gap-4 animate-fade-in z-20">
      <IconButton>
        <Menu size={28} />
      </IconButton>
      
      <div className="flex flex-col gap-4 mt-auto fixed right-6 bottom-32">
        <IconButton>
          <Music size={28} />
        </IconButton>
        <IconButton>
          <Shirt size={28} />
        </IconButton>
        <IconButton>
          <Smile size={28} />
        </IconButton>
      </div>
    </div>
  );
};
