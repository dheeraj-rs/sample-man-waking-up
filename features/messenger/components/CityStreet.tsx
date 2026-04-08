"use client";

import React from "react";
import { Grid, Outlines } from "@react-three/drei";

/**
 * Open Cinematic Plaza with Anti-Flicker logic.
 * Solves Z-fighting using material offsets and definitive layering.
 */
export const CityStreet = () => {
  return (
    <group>
      {/* 
        Anti-Flicker Floor: 
        Uses polygonOffset to ensure it always renders behind the Grid and character.
      */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial 
          color="#98E4E0" 
          roughness={0.6} 
          metalness={0.1}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>
      
      {/* 
        Professional Grid: 
        Elevated slightly above 0 to prevent fighting with the floor plane.
      */}
      <group position={[0, 0.01, 0]}>
        <Grid
          infiniteGrid
          fadeDistance={60}
          fadeStrength={5}
          sectionSize={2}
          sectionColor="#7DC0BB"
          cellColor="#5DA09B"
        />
      </group>

      {/* Cinematic Background Ambience */}
      <group position={[0, 0, -60]}>
        <mesh position={[-30, 8, 0]} castShadow>
          <boxGeometry args={[12, 25, 12]} />
          <meshStandardMaterial color="#7DC0BB" emissive="#fff" emissiveIntensity={0.05} />
          <Outlines thickness={0.06} color="#000" />
        </mesh>
        <mesh position={[30, 5, 0]} castShadow>
          <boxGeometry args={[10, 15, 10]} />
          <meshStandardMaterial color="#EACCC0" emissive="#fff" emissiveIntensity={0.05} />
          <Outlines thickness={0.06} color="#000" />
        </mesh>
      </group>

      {/* Subtle Highlight Stage */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[20, 64]} />
        <meshStandardMaterial color="#fff" opacity={0.05} transparent />
      </mesh>
    </group>
  );
};
