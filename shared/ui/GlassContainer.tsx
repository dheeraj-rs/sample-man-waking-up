import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A reusable glassmorphic container for the UI layer.
 * Standardizes the 'messenger-border' and translucent look.
 */
export const GlassContainer = ({ children, className }: GlassContainerProps) => {
  return (
    <div
      className={cn(
        "glass messenger-border rounded-xl p-4 transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};
