"use client";

import { useState, useCallback } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

/**
 * Professional Click-to-Move hook.
 * Uses raycasting to determine target positions from mouse clicks.
 */
export const useClickToMove = () => {
  const [target, setTarget] = useState<THREE.Vector3 | null>(null);
  const { camera, scene } = useThree();

  const handlePointerDown = useCallback((e: any) => {
    // Only trigger on ground clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    // Look for the "Ground" or floor meshes
    const groundIntersect = intersects.find((intersect) => intersect.object.name === "Ground" || intersect.point.y < 0.1);
    
    if (groundIntersect) {
      setTarget(groundIntersect.point.clone());
    }
  }, [camera, scene]);

  return { target, handlePointerDown, setTarget };
};
