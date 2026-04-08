import { useEffect, useState } from "react";

/**
 * Custom hook to listen for movement keys.
 * Returns an object with the current state of movement keys.
 */
export const useAvatarControl = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          setMovement((m) => ({ ...m, forward: true }));
          break;
        case "KeyS":
        case "ArrowDown":
          setMovement((m) => ({ ...m, backward: true }));
          break;
        case "KeyA":
        case "ArrowLeft":
          setMovement((m) => ({ ...m, left: true }));
          break;
        case "KeyD":
        case "ArrowRight":
          setMovement((m) => ({ ...m, right: true }));
          break;
        case "ShiftLeft":
          setMovement((m) => ({ ...m, shift: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          setMovement((m) => ({ ...m, forward: false }));
          break;
        case "KeyS":
        case "ArrowDown":
          setMovement((m) => ({ ...m, backward: false }));
          break;
        case "KeyA":
        case "ArrowLeft":
          setMovement((m) => ({ ...m, left: false }));
          break;
        case "KeyD":
        case "ArrowRight":
          setMovement((m) => ({ ...m, right: false }));
          break;
        case "ShiftLeft":
          setMovement((m) => ({ ...m, shift: false }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
};
