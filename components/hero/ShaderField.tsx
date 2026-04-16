"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion, useInView } from "framer-motion";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// GLSL shaders
// ---------------------------------------------------------------------------

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

/**
 * Fragment shader: multi-octave value noise mapped to a violet→black gradient.
 * Mouse warp is intentionally capped at ±2% UV shift — ambient, never jarring.
 * Alpha vignette fades all four edges so the field dissolves into the page bg.
 */
const FRAG = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uMouse;    // normalised [0..1] pointer, Y already flipped for GL
  uniform float uOpacity;  // master fade — used to cross-fade in on mount
  uniform vec3  uColorA;   // violet accent #7C5CFF
  uniform vec3  uColorB;   // near-black canvas #0A0A0B

  // ── Compact value noise ──────────────────────────────────────────────────
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float vnoise(vec2 p) {
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    float a = hash(ip);
    float b = hash(ip + vec2(1.0, 0.0));
    float c = hash(ip + vec2(0.0, 1.0));
    float d = hash(ip + vec2(1.0, 1.0));
    // Quintic smoothstep for softer interpolation
    vec2 u = fp * fp * fp * (fp * (fp * 6.0 - 15.0) + 10.0);
    return mix(a, b, u.x)
         + (c - a) * u.y * (1.0 - u.x)
         + (d - b) * u.x * u.y;
  }

  // ── Fractional Brownian Motion (3 octaves for efficiency) ────────────────
  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    // Slightly different speeds per octave prevent repetition artifacts
    v += amp * vnoise(p);           amp *= 0.48;  p = p * 2.1 + vec2(uTime * 0.04, uTime * 0.03);
    v += amp * vnoise(p);           amp *= 0.48;  p = p * 2.1 + vec2(uTime * 0.025, uTime * 0.05);
    v += amp * vnoise(p);
    return v;
  }

  void main() {
    // ── Mouse-based UV warp (max ~2% shift, subtle pull toward cursor) ──
    vec2 toMouse = uMouse - vUv;
    float dist   = length(toMouse);
    float pull   = smoothstep(0.6, 0.0, dist) * 0.022;
    vec2 uv      = vUv + toMouse * pull;

    // ── Nebula field ─────────────────────────────────────────────────────
    float n = fbm(uv * 2.8 + vec2(uTime * 0.018, uTime * 0.012));

    // Lighter power curve — lifts midtones so violet reads across more of the field
    n = pow(max(n, 0.0), 1.15);

    // Boosted color mix peak — noise highs pull toward pure accent
    vec3 color = mix(uColorB, uColorA, n * 1.1);

    // ── Edge vignette — only the very outer rim fades; centre stays bright ──
    float vignette = smoothstep(0.0, 0.2,
      min(vUv.x, min(vUv.y, min(1.0 - vUv.x, 1.0 - vUv.y)))
    );
    // Second radial vignette centred on the middle for depth
    float radial = 1.0 - smoothstep(0.3, 1.0, length(vUv - 0.5) * 1.4);
    color *= vignette * (0.65 + 0.35 * radial);

    // uOpacity drives the JS-side mount fade
    gl_FragColor = vec4(color, 0.97 * uOpacity);
  }
`;

// ---------------------------------------------------------------------------
// Field — inner R3F scene component
// ---------------------------------------------------------------------------

interface FieldProps {
  mouseRef: React.RefObject<{ x: number; y: number }>;
  opacity: number;
}

function Field({ mouseRef, opacity }: FieldProps) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  // Memoised so uniforms are never recreated per frame
  const uniforms = useMemo(
    () => ({
      uTime:    { value: 0 },
      uMouse:   { value: new THREE.Vector2(0.5, 0.5) },
      uOpacity: { value: 0 },
      uColorA:  { value: new THREE.Color("#7C5CFF") },
      uColorB:  { value: new THREE.Color("#0A0A0B") },
    }),
    []
  );

  // ── 30 FPS cap via delta accumulation ───────────────────────────────────
  const elapsed = useRef(0);
  const FRAME_BUDGET = 1 / 30; // ~33.3 ms

  useFrame(({ clock }, delta) => {
    if (!mat.current) return;

    elapsed.current += delta;
    if (elapsed.current < FRAME_BUDGET) return;
    elapsed.current = elapsed.current % FRAME_BUDGET;

    mat.current.uniforms.uTime.value    = clock.getElapsedTime();
    mat.current.uniforms.uOpacity.value = opacity;
    // Flip Y: pointer (0,0) is top-left; GL (0,0) is bottom-left
    const m = mouseRef.current;
    mat.current.uniforms.uMouse.value.set(m.x, 1 - m.y);
  });

  return (
    <mesh>
      {/* Full-NDC plane — vertex shader pins it with gl_Position = vec4(pos,1) */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// ShaderField — public export
// ---------------------------------------------------------------------------

/**
 * Ambient WebGL nebula background for the Hero section.
 *
 * - Soft violet→black gradient field driven by fractional Brownian Motion.
 * - Mouse position gently warps the field (≤2 % UV shift — never distracting).
 * - Capped at 30 FPS via delta accumulation.
 * - Pauses rendering when Hero scrolls offscreen (`frameloop="never"`).
 * - Respects `prefers-reduced-motion`: renders a static CSS gradient fallback.
 * - `aria-hidden` + `pointer-events-none` — purely decorative.
 *
 * Usage: place inside a `position: relative` Hero container.
 */
export function ShaderField() {
  const reducedMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  // Pause R3F render loop when the element is not in the viewport.
  // margin: "-10%" — a small buffer so we don't start right at the fold.
  const inView = useInView(wrapRef, { margin: "-10%" });

  // Normalised pointer position [0..1]
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // Fade-in opacity controlled in JS so we avoid a flash of white canvas
  const [opacity, setOpacity] = useState(0);

  // Mount fade: ramp opacity 0→1 over ~600 ms via requestAnimationFrame
  useEffect(() => {
    if (reducedMotion) return;

    let raf: number;
    const start = performance.now();
    const DURATION = 600;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      setOpacity(t);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  // Global pointer listener — passive for scroll perf
  useEffect(() => {
    if (reducedMotion) return;

    const onMove = (e: PointerEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  // ── Static fallback for reduced-motion preference ───────────────────────
  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,92,255,0.45) 0%, rgba(10,10,11,0) 70%)",
        }}
      />
    );
  }

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      // Wrapper opacity raised so the nebula reads as a present colour layer,
      // not a ghost — still ambient, never foreground.
      style={{ opacity: 0.92 }}
    >
      <Canvas
        // Cap DPR: 1.5 is plenty for a blurry nebula; no need for 2–3×
        dpr={[1, 1.5]}
        gl={{
          antialias: false,   // no geometry edges to smooth in a full-screen shader
          alpha: true,        // transparent background so page bg shows through
          powerPreference: "low-power", // hint to GPU scheduler — ambient, not game
        }}
        // Halt the render loop entirely when Hero is offscreen
        frameloop={inView ? "always" : "never"}
        // Camera is irrelevant — vertex shader ignores projection
        camera={{ position: [0, 0, 1] }}
        style={{ width: "100%", height: "100%" }}
      >
        <Field mouseRef={mouseRef} opacity={opacity} />
      </Canvas>
    </div>
  );
}
