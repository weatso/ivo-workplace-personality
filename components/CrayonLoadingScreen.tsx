"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper functions to generate random chaotic paths that densely fill the screen
const generateRandomWavySweep = () => {
  let path = `M -100 ${Math.random() * 200}`;
  for (let i = 0; i < 8; i++) {
    const y1 = Math.random() * 600 + 200;
    const y2 = Math.random() * 300 - 100;
    path += ` Q ${Math.random() * 400 + i * 150} ${y1} ${Math.random() * 300 + 100 + i * 150} ${Math.random() * 800}`;
    path += ` T ${Math.random() * 300 + i * 200} ${y2}`;
  }
  return path;
};

const generateRandomSpirals = () => {
  let path = `M ${Math.random() * 1200} ${Math.random() * 800}`;
  for (let i = 0; i < 15; i++) {
    const c1x = Math.random() * 1400 - 100;
    const c1y = Math.random() * 1000 - 100;
    const c2x = Math.random() * 1400 - 100;
    const c2y = Math.random() * 1000 - 100;
    const ex = Math.random() * 1400 - 100;
    const ey = Math.random() * 1000 - 100;
    path += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`;
  }
  return path;
};

const generateRandomZigZag = () => {
  let path = `M ${Math.random() * 1200} ${Math.random() * 800}`;
  for (let i = 0; i < 35; i++) {
    path += ` L ${Math.random() * 1400 - 100} ${Math.random() * 1000 - 100}`;
  }
  return path;
};

export default function CrayonLoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [paths, setPaths] = useState({
    yellow: "",
    orange: "",
    navy: ""
  });
  const [renderOrder, setRenderOrder] = useState(["yellow", "orange", "navy"]);

  useEffect(() => {
    // Generate new unique paths every time the screen mounts
    setPaths({
      yellow: generateRandomWavySweep(),
      orange: generateRandomSpirals(),
      navy: generateRandomZigZag()
    });

    // Randomize render order
    const order = ["yellow", "orange", "navy"];
    order.sort(() => Math.random() - 0.5);
    setRenderOrder(order);

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
          {paths.yellow && (
            <svg
              className="w-full h-full object-cover min-w-[1200px]"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Removed the SVG filter here because Safari (iOS & Mac) rendering engine crashes when animating feDisplacementMap. The density of the random paths already creates a fantastic scribble effect natively. */}
              <g>
                {renderOrder.map((key) => {
                  if (key === "yellow") {
                    return (
                      <motion.path
                        key="yellow"
                        d={paths.yellow}
                        fill="none"
                        stroke="#f1b32a"
                        strokeWidth="140"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.1 }}
                      />
                    );
                  }
                  if (key === "orange") {
                    return (
                      <motion.path
                        key="orange"
                        d={paths.orange}
                        fill="none"
                        stroke="#ff7b17"
                        strokeWidth="80"
                        strokeDasharray="20 40 100 40"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.85 }}
                        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
                      />
                    );
                  }
                  if (key === "navy") {
                    return (
                      <motion.path
                        key="navy"
                        d={paths.navy}
                        fill="none"
                        stroke="#000650"
                        strokeWidth="90"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2.2, ease: "easeOut", delay: 0.4 }}
                      />
                    );
                  }
                  return null;
                })}
              </g>
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
