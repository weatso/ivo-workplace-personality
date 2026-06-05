"use client";

/**
 * useMagneticButton — Magnetic button physics hook
 *
 * Usage:
 *   const { ref, style } = useMagneticButton({ strength: 0.35 });
 *   <motion.button ref={ref} style={style}>Click me</motion.button>
 *
 * How it works:
 *   - Tracks the cursor distance relative to the button centre
 *   - If cursor is within `radius` px, exerts a spring-pull on x/y
 *   - On mouse leave, springs back to (0,0)
 */

import { useRef, RefObject } from "react";
import { useMotionValue, useSpring, MotionStyle } from "framer-motion";

interface MagneticOptions {
  /** Scale of the magnetic pull (0–1 recommended) */
  strength?: number;
  /** Pixel radius within which magnetic effect is active */
  radius?: number;
}

export function useMagneticButton<T extends HTMLElement = HTMLButtonElement>(
  options: MagneticOptions = {}
): { ref: RefObject<T>; motionStyle: MotionStyle; onMouseMove: React.MouseEventHandler; onMouseLeave: React.MouseEventHandler } {
  const { strength = 0.4, radius = 80 } = options;
  const ref = useRef<T>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 280, damping: 20, mass: 0.7 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const onMouseMove: React.MouseEventHandler = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      rawX.set(dx * strength);
      rawY.set(dy * strength);
    }
  };

  const onMouseLeave: React.MouseEventHandler = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return {
    ref: ref as RefObject<T>,
    motionStyle: { x, y },
    onMouseMove,
    onMouseLeave,
  };
}
