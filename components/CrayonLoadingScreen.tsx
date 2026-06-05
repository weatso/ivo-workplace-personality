"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CrayonLoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Start fading out the screen after the scribble finishes
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isAnimating && (
        <motion.div
          key="crayon-loading-screen"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f2e1b3] overflow-hidden pointer-events-none"
        >
          <svg
            className="w-full h-full object-cover min-w-[1200px]"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Organic Crayon Filter */}
            <defs>
              <filter id="crayon-texture" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="3"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="8"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displacement"
                />
              </filter>
            </defs>

            <g filter="url(#crayon-texture)">
              {/* Yellow Gold Scribble (Smooth, wide, covering large areas) */}
              <motion.path
                d="M -100 500 C 200 -300, 100 900, 400 300 C 700 -300, 600 900, 900 300 C 1200 -300, 1100 900, 1200 300"
                fill="none"
                stroke="#f1b32a"
                strokeWidth="150"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.1 }}
              />

              {/* Vibrant Orange Scribble (Chaotic, looping back on itself) */}
              <motion.path
                d="M -100 200 C 150 800, 250 -200, 150 300 C 50 800, 450 -200, 350 300 C 250 800, 650 -200, 550 300 C 450 800, 850 -200, 750 300 C 650 800, 1050 -200, 950 300 C 850 800, 1250 -200, 1150 300"
                fill="none"
                stroke="#ff7b17"
                strokeWidth="90"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{ duration: 2.2, ease: "easeInOut", delay: 0.2 }}
              />

              {/* Deep Navy Aggressive Scribble (Erratic overlapping curves) */}
              <motion.path
                d="M 1200 400 C 900 -200, 800 800, 700 300 C 600 -200, 500 800, 400 300 C 300 -200, 200 800, 100 300 C 0 -200, -100 800, -200 300"
                fill="none"
                stroke="#000650"
                strokeWidth="100"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.0, ease: "easeOut", delay: 0.4 }}
              />
            </g>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
