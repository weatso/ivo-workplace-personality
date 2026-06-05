"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Spring-physics for the trailing outer ring
  const springConfig = { damping: 22, stiffness: 280, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Use (pointer: coarse) media query — true when PRIMARY input is touch (mobile/tablet).
    // This is the gold-standard check: it stays false on touch-enabled Windows laptops
    // where the primary input is still a mouse/trackpad (pointer: fine).
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isCoarsePointer);
    if (isCoarsePointer) return; // No cursor on mobile/tablet

    setIsMounted(true);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverIn = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [data-cursor-hover], input, label, select, textarea") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverOut = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleHoverIn);
    document.addEventListener("mouseout", handleHoverOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleHoverIn);
      document.removeEventListener("mouseout", handleHoverOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (!isMounted || isTouchDevice) return null;

  return (
    <>
      {/* Dot — snaps instantly to cursor */}
      <motion.div
        className="fixed z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isClicking ? 0.5 : isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-3 h-3 bg-white rounded-full" />
      </motion.div>

      {/* Outer doodle ring — trails with spring lag */}
      <motion.div
        className="fixed z-[9998] pointer-events-none"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isClicking ? 0.7 : isHovering ? 2.2 : 1,
          opacity: isHovering ? 0.85 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Organic doodle ring — SVG based for sketch feel */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="overflow-visible"
          style={{ filter: "url(#squiggle-0)" }}
        >
          <circle
            cx="16"
            cy="16"
            r="12"
            stroke={isHovering ? "#ff7b17" : "#000650"}
            strokeWidth="2.5"
            strokeDasharray="3 4"
            fill="none"
          />
        </svg>
      </motion.div>
    </>
  );
}
