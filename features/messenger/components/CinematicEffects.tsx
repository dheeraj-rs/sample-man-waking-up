"use client";

import React from "react";
import { EffectComposer, Bloom, Vignette, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

/**
 * 100% Stable Cinematic Post-processing for Dheeraj Portfolio.
 * Restores visibility by using safe effect compositions.
 */
export const CinematicEffects = () => {
  return (
    <EffectComposer>
      {/* Safe Bloom glow - no mipmapBlur to avoid library length errors */}
      <Bloom 
        intensity={1.0} 
        luminanceThreshold={1.0} 
        luminanceSmoothing={0.9} 
      />
      
      {/* Professional Focus */}
      <Vignette offset={0.3} darkness={0.4} />
      
      {/* High-quality color grading */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
};
