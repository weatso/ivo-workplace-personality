"use client";

/**
 * BrushTransition — GSAP brush-stroke wipe page transition
 *
 * Lives in the global layout (persists across routes).
 * Controlled via `useTransitionStore`:
 *   1. Caller fires `triggerTransition(callback)`
 *   2. Navy panel wipes IN from left  (power4.inOut, 0.45s)
 *   3. `callback()` fires (router.push happens under the cover)
 *   4. Panel wipes OUT to the right   (power4.inOut, 0.40s)
 *
 * The center ✦ pulsates while covered to signal loading.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTransitionStore } from "@/store/useTransitionStore";
import { usePathname } from "next/navigation";

export default function BrushTransition() {
  const panelRef   = useRef<HTMLDivElement>(null);
  const tlRef      = useRef<gsap.core.Timeline | null>(null);
  const { isTransitioning, callback, reset } = useTransitionStore();
  const pathname   = usePathname();
  const lastPath   = useRef(pathname);

  // Phase 1: Wipe IN when triggered
  useEffect(() => {
    if (!isTransitioning || !panelRef.current) return;

    const panel = panelRef.current;
    const cb    = callback; 

    // Kill any in-flight timeline
    tlRef.current?.kill();

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl
      /* Wipe IN */
      .set(panel,  { transformOrigin: "left center", scaleX: 0, autoAlpha: 1, pointerEvents: "all" })
      .to(panel,   { scaleX: 1, duration: 0.45, ease: "power4.inOut" })
      /* Trigger navigation under the cover */
      .call(() => { 
        if (cb) cb(); 
      });

    // We do NOT reset state here, nor do we wipe out yet.
    // We wait for the pathname to change.
  }, [isTransitioning, callback]);

  // Phase 2: Wipe OUT when pathname changes
  useEffect(() => {
    if (!panelRef.current) return;

    // If we are currently transitioning and the pathname has successfully changed
    if (isTransitioning && pathname !== lastPath.current) {
      const panel = panelRef.current;
      lastPath.current = pathname;

      tlRef.current?.kill();
      
      const tl = gsap.timeline({
        onComplete: () => {
          reset(); // Sync store state after animation completes
        }
      });
      tlRef.current = tl;

      tl
        /* Wipe OUT */
        .set(panel,  { transformOrigin: "right center" })
        .to(panel,   { scaleX: 0, duration: 0.40, ease: "power4.inOut" })
        /* DOM Cleanup */
        .set(panel,  { pointerEvents: "none", autoAlpha: 0 });
    } else if (!isTransitioning) {
      // Keep tracking path when idle
      lastPath.current = pathname;
    }
  }, [pathname, isTransitioning, reset]);

  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9991] pointer-events-none invisible flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(112deg, #000650 0%, #4544ac 100%)" }}
    >
      {/* Horizontal scanlines for brush-ink texture */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 4px)",
        }}
      />
      {/* Animated center mark */}
      <span
        className="text-[#f1b32a] text-7xl font-black animate-pulse select-none"
        style={{ fontFamily: "var(--font-poppins)", filter: "url(#squiggle-2)" }}
      >
        ✦
      </span>
    </div>
  );
}
