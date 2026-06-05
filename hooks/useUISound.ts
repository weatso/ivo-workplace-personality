"use client";

import { useCallback } from "react";

export function useUISound() {
  const playSound = useCallback((soundUrl: string) => {
    try {
      const audio = new Audio(soundUrl);
      audio.volume = 0.5;
      // Silently ignore missing files or autoplay policy errors
      audio.play().catch(() => { /* noop — sound file optional */ });
    } catch {
      // noop
    }
  }, []);

  const playPop = useCallback(() => playSound('/sounds/pop.mp3'), [playSound]);
  const playSwoosh = useCallback(() => playSound('/sounds/swoosh.mp3'), [playSound]);
  const playVictory = useCallback(() => playSound('/sounds/victory.mp3'), [playSound]);

  return { playPop, playSwoosh, playVictory };
}
