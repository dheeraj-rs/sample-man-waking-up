"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations, Outlines } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useAvatarControl } from "../hooks/useAvatarControl";

const AVATAR_URL = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Soldier.glb";

/**
 * High-Fidelity Humanoid Avatar (Dheeraj).
 * Specialized for realistic hand-movement and stable visuals.
 */
export const Avatar = () => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(AVATAR_URL);
  const { actions } = useAnimations(animations, group);
  const [mouseTarget, setMouseTarget] = useState<THREE.Vector3 | null>(null);
  
  const keyboard = useAvatarControl();
  const { camera, scene: worldScene } = useThree();

  useEffect(() => {
    const handleMouseClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(worldScene.children, true);
      const ground = intersects.find(i => i.point.y < 0.2); 
      if (ground) setMouseTarget(ground.point.clone());
    };
    window.addEventListener("mousedown", handleMouseClick);
    return () => window.removeEventListener("mousedown", handleMouseClick);
  }, [camera, worldScene]);

  useEffect(() => {
    if (actions["Idle"]) actions["Idle"].reset().fadeIn(0.5).play();
  }, [actions]);

  useFrame((state, delta) => {
    if (!group.current) return;

    const isKeyboardMoving = keyboard.forward || keyboard.backward || keyboard.left || keyboard.right;
    const moveSpeed = keyboard.shift ? 10 : 5.5;
    const keyboardDir = new THREE.Vector3(0, 0, 0);

    if (keyboard.forward) keyboardDir.z -= 1;
    if (keyboard.backward) keyboardDir.z += 1;
    if (keyboard.left) keyboardDir.x -= 1;
    if (keyboard.right) keyboardDir.x += 1;

    let moved = false;

    if (isKeyboardMoving) {
      setMouseTarget(null);
      keyboardDir.normalize().multiplyScalar(moveSpeed * delta);
      group.current.position.add(keyboardDir);
      const targetRot = Math.atan2(keyboardDir.x, keyboardDir.z);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRot, 0.2);
      moved = true;
    } else if (mouseTarget) {
      const distance = group.current.position.distanceTo(mouseTarget);
      if (distance > 0.4) {
        const lookTarget = new THREE.Vector3(mouseTarget.x, group.current.position.y, mouseTarget.z);
        group.current.lookAt(lookTarget);
        const dir = new THREE.Vector3().subVectors(mouseTarget, group.current.position).normalize();
        group.current.position.add(dir.multiplyScalar(5.5 * delta));
        moved = true;
      } else {
        setMouseTarget(null);
      }
    }

    // HAND & LEG MOVEMENT COORDINATION
    if (moved) {
      const walk = actions["Walk"];
      if (walk) {
        walk.setEffectiveWeight(1);
        walk.setEffectiveTimeScale(keyboard.shift ? 2.2 : 1.4);
        walk.play();
      }
      actions["Idle"]?.fadeOut(0.3);
    } else {
      actions["Idle"]?.reset().fadeIn(0.5).play();
      actions["Walk"]?.fadeOut(0.5);
    }

    // Smooth Camera Follow
    const targetCameraPos = group.current.position.clone().add(new THREE.Vector3(12, 12, 12));
    state.camera.position.lerp(targetCameraPos, 0.08);
    state.camera.lookAt(group.current.position.x, group.current.position.y + 1, group.current.position.z);
  });

  return (
    <group ref={group} dispose={null} scale={2.5} position={[0, 0, 0]}>
      <primitive object={scene}>
        <Outlines thickness={0.05} color="#000" />
      </primitive>
    </group>
  );
};

useGLTF.preload(AVATAR_URL);
