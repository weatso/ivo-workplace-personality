"use client";

/**
 * GsapSplitTitle — Character-by-character elastic reveal using GSAP
 *
 * Each character is wrapped in an overflow:hidden clip container,
 * then the inner span animates from y:"110%" → y:"0%" with elastic.out
 * ease and staggered delay, creating the "stamp up" kinetic feel.
 *
 * Usage:
 *   <GsapSplitTitle text="Hello World" delay={0.6} className="text-6xl font-black" />
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  text: string;
  className?: string;
  /** Seconds before the stagger begins */
  delay?: number;
  /** Animate word-by-word (false) or char-by-char (true) */
  charMode?: boolean;
}

export default function GsapSplitTitle({ text, className = "", delay = 0, charMode = false }: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const targets = wrapRef.current.querySelectorAll<HTMLSpanElement>(".gsap-char");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y: "115%",
        opacity: 0,
        duration: 1.05,
        stagger: charMode ? 0.03 : 0.1,
        ease: "elastic.out(1, 0.45)",
        delay,
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [delay, charMode]);

  const tokens = charMode ? text.split("") : text.split(" ");

  return (
    <span ref={wrapRef} className={`${className}`} aria-label={text}>
      {tokens.map((token, i) => (
        <span
          key={i}
          style={{ 
            display: "inline-block", 
            overflow: "hidden", 
            verticalAlign: "bottom",
            paddingBottom: "0.2em",
            marginBottom: "-0.2em",
            paddingTop: "0.1em",
            marginTop: "-0.1em"
          }}
        >
          <span className="gsap-char" style={{ display: "inline-block" }}>
            {token === "" ? "\u00A0" : token}
          </span>
          {/* word-mode: re-insert the space after each word */}
          {!charMode && i < tokens.length - 1 && (
            <span style={{ display: "inline-block" }}>&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}
