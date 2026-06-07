"use client";

/**
 * PhysicsBackground — Matter.js "living sketchbook" playground
 *
 * Architecture: DOM-synced (no Matter.js canvas renderer)
 *   - Matter.js runs the physics simulation headlessly
 *   - Each body is mirrored to an absolute-positioned <div> with an emoji
 *   - requestAnimationFrame reads body.position and body.angle, sets CSS transform
 *   - MouseConstraint binds cursor to the physics world → drag & throw objects
 *
 * Shapes: emoji characters styled with brand colors + squigglevision SVG filter
 * Performance: ~0% GPU, very low CPU — Matter.js + DOM-transform is extremely fast
 */

import { useEffect, useRef } from "react";

// Each shape template defines the emoji label, physics geometry, and brand color
const SHAPE_TEMPLATES = [
  { label: "", type: "circle",  r: 22, color: "#ff7b17" },
  { label: "◆", type: "rect",    w: 28, h: 28, color: "#f1b32a" },
  { label: "●", type: "circle",  r: 16, color: "#424ac7" },
  { label: "▲", type: "poly",    sides: 3, r: 26, color: "#000650" },
  { label: "✦", type: "circle",  r: 20, color: "#ff7b17" },
  { label: "◉", type: "circle",  r: 18, color: "#f1b32a" },
  { label: "⬟", type: "poly",    sides: 5, r: 22, color: "#424ac7" },
] as const;

const SHAPE_COUNT  = 20;   // total bodies to spawn
const SPAWN_JITTER = 1.5;  // height × this above viewport

interface PhysicsBody {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  matterBody: any;
  el: HTMLDivElement;
}

export default function PhysicsBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodiesRef    = useRef<PhysicsBody[]>([]);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let handleResize: () => void;

    /* Dynamic import — matter-js touches DOM, so must be client-only */
    let cancelled = false;
    let Matter: typeof import("matter-js");

    (async () => {
      Matter = await import("matter-js");
      if (cancelled) return;

      const getDimensions = () => ({
        W: container.offsetWidth || window.innerWidth,
        H: container.offsetHeight || window.innerHeight,
      });

      let { W, H } = getDimensions();
      const isMobile = window.innerWidth < 768;
      const scale = isMobile ? 0.6 : 1;

      /* ── Engine ── */
      const engine = Matter.Engine.create({ gravity: { x: 0, y: 0.55 } });

      /* ── Static walls ── */
      const wallOpts = { isStatic: true, render: { visible: false } };
      const floor   = Matter.Bodies.rectangle(W / 2, H + 30, W * 3, 60, wallOpts);
      const left    = Matter.Bodies.rectangle(-30, H / 2, 60, H * 3, wallOpts);
      const right   = Matter.Bodies.rectangle(W + 30, H / 2, 60, H * 3, wallOpts);
      const ceiling = Matter.Bodies.rectangle(W / 2, -30, W * 3, 60, wallOpts);
      
      Matter.Composite.add(engine.world, [floor, left, right, ceiling]);

      /* ── Spawn bodies + DOM mirrors ── */
      for (let i = 0; i < SHAPE_COUNT; i++) {
        const tmpl = SHAPE_TEMPLATES[i % SHAPE_TEMPLATES.length];
        const x    = 40 + Math.random() * (W - 80);
        const y    = -(Math.random() * H * SPAWN_JITTER + 60);
        const bodyOpts = {
          restitution: 0.45,
          friction: 0.25,
          frictionAir: 0.015,
          angle: Math.random() * Math.PI * 2,
        };

        let body: import("matter-js").Body;
        if (tmpl.type === "circle") {
          body = Matter.Bodies.circle(x, y, tmpl.r * scale, bodyOpts);
        } else if (tmpl.type === "poly") {
          body = Matter.Bodies.polygon(x, y, tmpl.sides, tmpl.r * scale, bodyOpts);
        } else {
          // rect
          body = Matter.Bodies.rectangle(x, y, tmpl.w! * scale, tmpl.h! * scale, bodyOpts);
        }
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);
        Matter.Composite.add(engine.world, body);

        /* DOM mirror element */
        const size = (tmpl.type === "circle" ? tmpl.r : (tmpl.type === "poly" ? tmpl.r : Math.max(tmpl.w!, tmpl.h!))) * 1.8 * scale;
        const el   = document.createElement("div");
        el.textContent = tmpl.label;
        Object.assign(el.style, {
          position:   "absolute",
          top:        "0",
          left:       "0",
          width:      `${size}px`,
          height:     `${size}px`,
          display:    "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize:   `${size * 0.7}px`,
          color:      tmpl.color,
          fontWeight: "900",
          lineHeight: "1",
          pointerEvents: "none",
          userSelect: "none",
          textShadow: "1px 2px 0 rgba(0,0,0,0.18)",
          filter:     "url(#squiggle-0)",
          opacity:    "0.82",
          willChange: "transform",
        });
        container.appendChild(el);
        bodiesRef.current.push({ id: body.id, matterBody: body, el });
      }

      /* ── Mouse constraint (desktop drag-only; touch events removed to allow native scroll) ── */
      const mouse = Matter.Mouse.create(container);
      const mAny = mouse as any;

      // Remove ALL event listeners that block native scroll/touch
      mouse.element.removeEventListener("mousewheel",    mAny.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mAny.mousewheel);
      mouse.element.removeEventListener("wheel",          mAny.mousewheel);
      // Critical: Remove touch listeners that trigger the "cancelable=false" console errors
      mouse.element.removeEventListener("touchstart",     mAny.mousedown);
      mouse.element.removeEventListener("touchmove",      mAny.mousemove);
      mouse.element.removeEventListener("touchend",       mAny.mouseup);

      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.25, render: { visible: false } },
      });
      Matter.Composite.add(engine.world, mouseConstraint);

      /* ── Handle Resize ── */
      handleResize = () => {
        const dims = getDimensions();
        W = dims.W;
        H = dims.H;
        Matter.Body.setPosition(floor,   { x: W / 2, y: H + 30 });
        Matter.Body.setPosition(left,    { x: -30,   y: H / 2 });
        Matter.Body.setPosition(right,   { x: W + 30, y: H / 2 });
        Matter.Body.setPosition(ceiling, { x: W / 2, y: -30 });
      };
      window.addEventListener("resize", handleResize);

      /* ── RAF sync loop ── */
      let lastTime = performance.now();

      const loop = (now: number) => {
        if (cancelled) return;
        const delta = Math.min(now - lastTime, 16.667); // cap to 16.667ms (60fps) to avoid Matter.js warning
        lastTime    = now;
        Matter.Engine.update(engine, delta);

        for (const pb of bodiesRef.current) {
          const { x, y } = pb.matterBody.position;
          const angle     = pb.matterBody.angle;
          pb.el.style.transform = `translate(${x - parseFloat(pb.el.style.width) / 2}px, ${y - parseFloat(pb.el.style.height) / 2}px) rotate(${angle}rad)`;
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      if (handleResize) {
        window.removeEventListener("resize", handleResize);
      }
      bodiesRef.current.forEach((pb) => pb.el.remove());
      bodiesRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden z-[1]"
    />
  );
}
