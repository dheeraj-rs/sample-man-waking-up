"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Loader } from "@react-three/drei";
import * as THREE from "three";
import { Avatar } from "./Avatar";
import { SceneBackground } from "./SceneBackground";

/**
 * Main 3D Scene component for the Cinematic Messenger experience.
 * Optimized for peak stability by using native Three.js cinematic features.
 */
export const MessengerWorld = () => {
  return (
    <div className="w-full h-full bg-[#98E4E0]">
      <Canvas 
        shadows 
        flat // Ensures consistent cinematic color grading without extra passes
        gl={{ 
          antialias: true, 
          alpha: false, 
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        camera={{ position: [15, 15, 15], fov: 40 }}
      >
        {/* Background Color attached to Canvas for visibility */}
        <color attach="background" args={["#98E4E0"]} />
        
        <PerspectiveCamera makeDefault position={[12, 12, 12]} fov={40} />
        
        {/* Environment, Buildings and Lights (ALWAYS loaded) */}
        <SceneBackground />

        {/* Realistic Humanoid Avatar with Safe Fallback */}
        <Suspense fallback={null}>
          <Avatar />
        </Suspense>

        {/* 
          NOTE: Post-processing is removed to prevent library crashes.
          Cinematic look is now achieved via high-intensity lighting and toneMapping.
        */}
      </Canvas>
      <Loader />
    </div>
  );
};
