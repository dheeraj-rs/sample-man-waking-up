"use client";

import React from "react";
import { ContactShadows, Float } from "@react-three/drei";
import { CityStreet } from "./CityStreet";

/**
 * Optimized SceneBackground for the Abeto Messenger experience.
 * Removed duplicate color attachment to ensure 100% visibility.
 */
export const SceneBackground = () => {
  return (
    <>
      {/* Light setup for toon shading */}
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[20, 50, 10]}
        intensity={2.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Realistic City Environment */}
      <CityStreet />

      {/* Premium Shadows */}
      <ContactShadows
        opacity={0.5}
        scale={60}
        blur={2.5}
        far={10}
        resolution={1024}
        color="#000000"
      />
    </>
  );
};
