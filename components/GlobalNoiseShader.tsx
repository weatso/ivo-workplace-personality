"use client";

/**
 * GlobalNoiseShader — WebGL film grain + boiling line overlay
 *
 * Renders a full-screen WebGL canvas as a `position:fixed` overlay
 * with `pointer-events:none`. Uses a fragment shader that:
 *   1. Quantises screen rows → jiggles each row slightly → "boiling line" feel
 *   2. Adds time-varying random grain → organic film texture
 *   3. Vignettes the edges (navy-tinted) for cinematic depth
 *
 * Performance: GPU-only work. Canvas runs at reduced resolution (0.3x)
 * and is CSS-scaled up — imperceptible quality loss, ~4× faster.
 * Grain framerate is capped at 24fps to save power.
 */

import { useEffect, useRef } from "react";

const VERT = `
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
  precision mediump float;
  uniform float u_time;
  uniform vec2  u_res;

  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;

    /* Boiling-line jitter: quantise scanlines, shift each row */
    float lineH   = 3.0;
    float row     = floor(gl_FragCoord.y / lineH);
    float tick    = floor(u_time * 14.0);
    float jitter  = (rand(vec2(row, tick)) * 2.0 - 1.0) * 0.0015;
    vec2 j_uv     = vec2(uv.x + jitter, uv.y);

    /* Time-varying grain */
    float grain = rand(j_uv + fract(u_time * 0.09)) * 0.07;

    /* Radial vignette darkening */
    vec2  c   = uv - 0.5;
    float vig = smoothstep(0.75, 0.15, length(c));

    /* Navy-tinted grain, slightly stronger at edges */
    float a = grain * mix(0.5, 1.0, 1.0 - vig);
    gl_FragColor = vec4(0.0, 0.025, 0.196, a);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function GlobalNoiseShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return; // Gracefully degrade if WebGL unavailable

    /* ----- Shader program ----- */
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER,   VERT));
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    /* ----- Full-screen quad ----- */
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes  = gl.getUniformLocation(prog, "u_res");

    /* ----- Canvas sizing at 0.3× resolution ----- */
    const SCALE = 0.3;
    const resize = () => {
      canvas.width  = Math.floor(window.innerWidth  * SCALE);
      canvas.height = Math.floor(window.innerHeight * SCALE);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.body);

    /* ----- Render loop — capped at ~24fps for grain ----- */
    const t0 = performance.now();
    let lastDraw = 0;
    const GRAIN_INTERVAL = 1000 / 24;

    const draw = (now: number) => {
      rafRef.current = requestAnimationFrame(draw);
      if (now - lastDraw < GRAIN_INTERVAL) return;
      lastDraw = now;
      gl.uniform1f(uTime, (now - t0) * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full z-[9995] pointer-events-none"
      style={{ mixBlendMode: "overlay", opacity: 0.55 }}
    />
  );
}
