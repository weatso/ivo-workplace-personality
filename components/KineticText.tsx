"use client";

/**
 * KineticText — Word-by-word staggered spring animation
 *
 * Usage:
 *   <KineticText text="Hello World" className="text-4xl font-black" delay={0.2} />
 */

import { motion } from "framer-motion";

interface KineticTextProps {
  text: string;
  className?: string;
  /** Additional delay before the stagger begins */
  delay?: number;
  /** If true, each CHARACTER animates. Otherwise, each WORD. */
  charByChar?: boolean;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

const wordVariants = {
  hidden: { y: "110%", opacity: 0, rotate: 3 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 180,
      damping: 16,
      mass: 0.8,
      delay: i * 0.07,
    },
  }),
};

export default function KineticText({
  text,
  className = "",
  delay = 0,
  charByChar = false,
  tag: Tag = "span",
}: KineticTextProps) {
  const items = charByChar ? text.split("") : text.split(" ");

  return (
    <Tag className={`${className} inline-block overflow-hidden`} style={{ display: "block" }}>
      <span className="flex flex-wrap gap-x-[0.25em]" style={{ overflow: "hidden" }}>
        {items.map((item, i) => (
          <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
            <motion.span
              className="inline-block"
              custom={i + delay / 0.07}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
            >
              {item}
              {/* space after each word for char mode */}
              {charByChar && item === " " ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
