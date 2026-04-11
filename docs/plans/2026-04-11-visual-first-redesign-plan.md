# Portfolio Visual-First Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio landing page with a readable type scale (16px floor), drastically reduced body copy, shader-backed section backgrounds, HUD-framed visuals, and an AI-first identity — while preserving the existing GSAP timeline and R3F stack.

**Architecture:** Two new shared primitives (`ShaderBackground`, `HUDFrame`) + a CSS-variable type scale + section-level rewrites. No new routing, no backend changes. Real product images drop in later into labeled placeholder slots.

**Tech Stack:** Next.js 16 (Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · GSAP 3 · React Three Fiber 9 · Three.js 0.183

**Spec:** [docs/specs/2026-04-11-visual-first-redesign-design.md](../specs/2026-04-11-visual-first-redesign-design.md)

---

## File Structure

**New files:**
- `components/ShaderBackground.tsx` — R3F Canvas + 4-variant fragment shader
- `components/shaders.ts` — GLSL source for the 4 variants as exported strings
- `components/HUDFrame.tsx` — corner-bracket wrapper with label/code/status slots
- `hooks/useHudClock.ts` — shared 1-second-tick clock for Nav + Contact
- `lib/heroCopy.ts` — rotating-subtitle phrase array
- `tests/readability.spec.ts` — Playwright test: no rendered font below 13px
- `tests/reduced-motion.spec.ts` — Playwright test: shaders + rotations freeze with `prefers-reduced-motion`
- `playwright.config.ts` — minimal config for the two tests

**Modified files:**
- `app/globals.css` — add `:root` CSS variables for the type scale
- `components/Nav.tsx` — font-size bumps across logo, links, HUD, CTA
- `components/sections/Hero.tsx` — headline rewrite, rotating subtitle, shader layer behind GameObjects3D
- `components/sections/Work.tsx` — full rewrite to frame-dominant card layout with HUDFrame + placeholder image slots
- `components/sections/AITeaser.tsx` — full rewrite to centered layout with 3-card strip
- `components/sections/About.tsx` — full rewrite to stat-tile grid with portrait slot
- `components/sections/Contact.tsx` — full rewrite to full-bleed shader + huge email
- `package.json` — add playwright devDep + test scripts

**Directories to create:**
- `public/work/` — holds placeholder & future real project screenshots
- `public/about/` — holds the portrait placeholder
- `hooks/` — new directory
- `lib/` — new directory
- `tests/` — new directory

---

## Task Order

Tasks are ordered so each produces a shippable state. Foundation first (type scale + primitives), then one section at a time, then tests.

- Task 1 — Type scale CSS variables
- Task 2 — HUDFrame primitive
- Task 3 — Shader source file + ShaderBackground primitive
- Task 4 — useHudClock hook
- Task 5 — Nav readability pass
- Task 6 — Hero: headline rewrite + rotating subtitle + shader layer
- Task 7 — Work: frame-dominant card rebuild
- Task 8 — AITeaser: centered layout + 3-card strip
- Task 9 — About: stat tile grid rebuild
- Task 10 — Contact: full-bleed shader + huge email
- Task 11 — Playwright: readability floor test
- Task 12 — Playwright: reduced-motion test
- Task 13 — Final build + smoke check

---

## Task 1: Type scale CSS variables

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css with the type scale**

Current content of `app/globals.css` is a single line: `@import "tailwindcss";`

Replace the entire file with:

```css
@import "tailwindcss";

:root {
  --font-display-xl: clamp(72px, 12vw, 180px);
  --font-display-l:  clamp(48px,  8vw, 112px);
  --font-display-m:  clamp(32px,  5vw,  56px);
  --font-heading:    clamp(22px, 2.5vw,  32px);
  --font-body-l:     clamp(18px, 1.6vw,  22px);
  --font-body:       clamp(16px, 1.3vw,  18px);
  --font-label:      clamp(13px,   1vw,  15px);
  --font-mono-sm:    14px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Verify dev server still compiles**

Run: `npm run dev` (or confirm the background dev server logged a successful HMR update after the save)
Expected: no compile error, page loads at http://localhost:3000

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat(type): add CSS variable type scale with 16px floor"
```

---

## Task 2: HUDFrame primitive

**Files:**
- Create: `components/HUDFrame.tsx`

- [ ] **Step 1: Create the HUDFrame component**

```tsx
"use client";

import { ReactNode } from "react";

type Status = "active" | "idle" | "locked";

type HUDFrameProps = {
  label?: string;
  code?: string;
  status?: Status;
  className?: string;
  children?: ReactNode;
};

const STATUS_COLOR: Record<Status, string> = {
  active: "bg-emerald-400",
  idle: "bg-amber-400",
  locked: "bg-rose-500",
};

export default function HUDFrame({
  label,
  code,
  status = "active",
  className = "",
  children,
}: HUDFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Corner brackets */}
      <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-white/60" />
      <span aria-hidden className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-white/60" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/60" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/60" />

      {/* Top-left label */}
      {label && (
        <span
          className="pointer-events-none absolute left-4 top-2 font-mono uppercase tracking-[0.18em] text-white/70"
          style={{ fontSize: "var(--font-label)" }}
        >
          {label}
        </span>
      )}

      {/* Top-right code */}
      {code && (
        <span
          className="pointer-events-none absolute right-4 top-2 font-mono uppercase tracking-[0.18em] text-white/70"
          style={{ fontSize: "var(--font-label)" }}
        >
          {code}
        </span>
      )}

      {/* Bottom-right status dot */}
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-3 right-4 h-2 w-2 rounded-full ${STATUS_COLOR[status]} animate-pulse`}
      />

      {children}
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit` in the portfolio directory
Expected: no TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add components/HUDFrame.tsx
git commit -m "feat(ui): add HUDFrame primitive"
```

---

## Task 3: Shader source + ShaderBackground primitive

**Files:**
- Create: `components/shaders.ts`
- Create: `components/ShaderBackground.tsx`

- [ ] **Step 1: Create the shader source file**

```ts
// components/shaders.ts

export const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Shared noise utils
const NOISE = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
`;

export const FLOW_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  ${NOISE}
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float n = snoise(p * 1.5 + vec2(uTime * 0.05, uTime * 0.03));
    float n2 = snoise(p * 3.0 - vec2(uTime * 0.08, 0.0));
    float v = smoothstep(-0.6, 0.8, n + n2 * 0.4);
    vec3 a = vec3(0.02, 0.03, 0.08);
    vec3 b = vec3(0.18, 0.22, 0.46);
    vec3 c = vec3(0.52, 0.18, 0.72);
    vec3 col = mix(a, b, v);
    col = mix(col, c, pow(v, 3.0) * 0.6);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const NOISE_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  ${NOISE}
  void main() {
    vec2 p = vUv;
    float t = uTime * 0.1;
    float n = snoise(p * 4.0 + vec2(t, -t));
    n += snoise(p * 8.0 + vec2(-t, t)) * 0.5;
    n += snoise(p * 16.0) * 0.25;
    n *= 0.6;
    vec3 col = vec3(0.04, 0.04, 0.06) + vec3(n * 0.35, n * 0.22, n * 0.48);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const GRID_WARP_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  ${NOISE}
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float warp = snoise(p * 1.5 + vec2(uTime * 0.1, 0.0)) * 0.1;
    vec2 g = (p + warp) * 10.0;
    vec2 grid = abs(fract(g) - 0.5);
    float line = smoothstep(0.48, 0.5, max(grid.x, grid.y));
    vec3 bg = vec3(0.02, 0.02, 0.05);
    vec3 fg = vec3(0.35, 0.6, 0.9);
    vec3 col = mix(bg, fg, line * 0.45);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const PARTICLES_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  ${NOISE}
  float particle(vec2 uv, vec2 seed) {
    vec2 d = uv - seed;
    return smoothstep(0.02, 0.0, length(d));
  }
  void main() {
    vec2 p = vUv;
    float t = uTime * 0.15;
    float acc = 0.0;
    for (int i = 0; i < 24; i++) {
      float fi = float(i);
      vec2 seed = vec2(
        fract(sin(fi * 12.9898) * 43758.5453 + t * 0.3),
        fract(sin(fi * 78.233) * 43758.5453 - t * 0.2)
      );
      acc += particle(p, seed);
    }
    vec3 bg = vec3(0.015, 0.015, 0.04);
    vec3 fg = vec3(0.7, 0.85, 1.0);
    vec3 col = mix(bg, fg, clamp(acc, 0.0, 1.0));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const SHADER_VARIANTS = {
  flow: FLOW_FRAG,
  noise: NOISE_FRAG,
  "grid-warp": GRID_WARP_FRAG,
  particles: PARTICLES_FRAG,
} as const;

export type ShaderVariant = keyof typeof SHADER_VARIANTS;
```

- [ ] **Step 2: Create the ShaderBackground component**

```tsx
// components/ShaderBackground.tsx
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { SHADER_VARIANTS, ShaderVariant, VERTEX_SHADER } from "./shaders";

type ShaderBackgroundProps = {
  variant: ShaderVariant;
  opacity?: number;
  speed?: number;
  className?: string;
};

function ShaderPlane({ variant, speed }: { variant: ShaderVariant; speed: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    if (!matRef.current) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      matRef.current.uniforms.uTime.value = 0;
      return;
    }
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed;
    matRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={SHADER_VARIANTS[variant]}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ShaderBackground({
  variant,
  opacity = 0.45,
  speed = 1,
  className = "",
}: ShaderBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ opacity }}
    >
      <Canvas
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 1], fov: 50 }}
        dpr={[1, 2]}
      >
        <ShaderPlane variant={variant} speed={speed} />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 3: Verify compile**

Run: `npx tsc --noEmit`
Expected: no errors. (If R3F types complain about `<mesh>`/`<planeGeometry>`, confirm `@react-three/fiber` 9.x JSX types are auto-registered; add `import "@react-three/fiber";` at the top of the file if needed.)

- [ ] **Step 4: Commit**

```bash
git add components/shaders.ts components/ShaderBackground.tsx
git commit -m "feat(ui): add ShaderBackground primitive with 4 variants"
```

---

## Task 4: useHudClock hook

**Files:**
- Create: `hooks/useHudClock.ts`

- [ ] **Step 1: Create the hook**

```ts
// hooks/useHudClock.ts
"use client";

import { useEffect, useState } from "react";

export type HudClockValue = {
  hh: string;
  mm: string;
  ss: string;
  tz: string;
};

function format(d: Date): HudClockValue {
  return {
    hh: String(d.getHours()).padStart(2, "0"),
    mm: String(d.getMinutes()).padStart(2, "0"),
    ss: String(d.getSeconds()).padStart(2, "0"),
    tz: "IST",
  };
}

export function useHudClock(): HudClockValue {
  const [value, setValue] = useState<HudClockValue>(() => format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setValue(format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return value;
}
```

- [ ] **Step 2: Verify compile**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add hooks/useHudClock.ts
git commit -m "feat(hooks): add useHudClock"
```

---

## Task 5: Nav readability pass

**Files:**
- Modify: `components/Nav.tsx`

- [ ] **Step 1: Read the current Nav.tsx**

Run: `cat components/Nav.tsx` (or open in your editor). Identify every place that sets an explicit font size — the audit flagged:
- Logo: `1.125rem` (18px)
- Desktop links: `0.8125rem` (13px)
- HUD cluster: `0.625rem` (10px)
- CTA button: `0.8125rem` (13px)

- [ ] **Step 2: Replace each font size with a CSS variable**

Map each size to the type-scale variable and replace via inline `style={{ fontSize: "var(--…)" }}` or Tailwind arbitrary-value classes:

| Old value | New value |
|---|---|
| `fontSize: "1.125rem"` (logo) | `fontSize: "calc(var(--font-heading) * 0.85)"` — nudges to ~22px floor |
| `fontSize: "0.8125rem"` (desktop links) | `fontSize: "var(--font-label)"` |
| `fontSize: "0.625rem"` (HUD cluster) | `fontSize: "var(--font-label)"` |
| `fontSize: "0.8125rem"` (CTA button) | `fontSize: "var(--font-body)"` |

Also bump the CTA button's padding: `px-4 py-2` → `px-6 py-3` (or equivalent numeric inline style).

**Do not change** the mobile menu link size (already 24px — fine).

If Nav currently has hardcoded time/status text, swap it for the `useHudClock` hook: `import { useHudClock } from "@/hooks/useHudClock";` and render `{clock.hh}:{clock.mm}:{clock.ss} {clock.tz}`.

- [ ] **Step 3: Visual check in dev server**

Open http://localhost:3000 → confirm the nav looks larger and more legible. Resize to mobile width — confirm mobile menu still works.

- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx
git commit -m "fix(nav): bump every font size to 13px+ floor"
```

---

## Task 6: Hero — headline rewrite + rotating subtitle + shader layer

**Files:**
- Create: `lib/heroCopy.ts`
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Create the subtitle copy file**

```ts
// lib/heroCopy.ts

export const HERO_SUBTITLES: readonly string[] = [
  "> shipping solo, from strategy to shader.",
  "> systems thinker. game-brained.",
  "> prompting → prototyping → production.",
  "> 6 years making pixels earn their keep.",
];

export const HERO_HEADLINE_LINE_1 = "AI-FIRST DESIGNER.";
export const HERO_HEADLINE_LINE_2 = "GAMER AT HEART.";
```

- [ ] **Step 2: Update Hero.tsx headline strings**

Open `components/sections/Hero.tsx`. Find the two JSX lines that render the current headline (`GAMER FIRST.` and `DESIGNER SECOND.`) and replace:
- `GAMER FIRST.` → `{HERO_HEADLINE_LINE_1}` (rendered as `AI-FIRST DESIGNER.`)
- `DESIGNER SECOND.` → `{HERO_HEADLINE_LINE_2}` (rendered as `GAMER AT HEART.`)

Add the import at the top:

```ts
import { HERO_HEADLINE_LINE_1, HERO_HEADLINE_LINE_2, HERO_SUBTITLES } from "@/lib/heroCopy";
```

The existing GSAP timeline already applies glitch to line 1 and char-stagger to line 2 — leave it alone. Only the strings change.

- [ ] **Step 3: Add the rotating subtitle element**

Below the existing name/role line and above the scroll CTA, add:

```tsx
<div
  className="hero-subtitle-rotator mt-6 font-mono text-white/75"
  style={{ fontSize: "var(--font-body-l)", minHeight: "1.6em" }}
  aria-live="polite"
>
  <span className="hero-subtitle-current">{HERO_SUBTITLES[0]}</span>
</div>
```

- [ ] **Step 4: Add the GSAP sub-timeline for rotation**

Inside the existing `useGSAP` / `useEffect` block that builds the main timeline, append — after the main entry timeline completes — the rotation loop:

```ts
import { gsap } from "gsap";
import { HERO_SUBTITLES } from "@/lib/heroCopy";

// after main timeline:
const span = heroRef.current?.querySelector<HTMLSpanElement>(".hero-subtitle-current");
if (span) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    let idx = 0;
    const tick = () => {
      idx = (idx + 1) % HERO_SUBTITLES.length;
      gsap.to(span, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          span.textContent = HERO_SUBTITLES[idx];
          gsap.to(span, { opacity: 1, duration: 0.4 });
        },
      });
    };
    const id = window.setInterval(tick, 3000);
    return () => window.clearInterval(id);
  }
}
```

(Adapt the cleanup so it plays nicely with the existing `useGSAP` return. If `useGSAP` from `@gsap/react` is used, wrap the interval in a `gsap.delayedCall` + cleanup.)

- [ ] **Step 5: Add ShaderBackground behind GameObjects3D**

Find the JSX where `<GameObjects3D />` is rendered. Wrap both it and the new shader layer in a positioned wrapper:

```tsx
<div className="absolute inset-0 z-0">
  <ShaderBackground variant="flow" opacity={0.45} />
  <GameObjects3D />
</div>
```

Add the import:

```ts
import ShaderBackground from "@/components/ShaderBackground";
```

Bump `GameObjects3D` material opacity from `0.14` → `0.22` in `components/GameObjects3D.tsx` (single-line change per each mesh's `meshBasicMaterial` opacity prop).

- [ ] **Step 6: Bump scroll CTA font size**

Find the scroll CTA in Hero.tsx (audit reported `0.6875rem` — 11px). Replace with `fontSize: "var(--font-label)"`.

- [ ] **Step 7: Visual check**

Open http://localhost:3000. Confirm:
- Headline now reads `AI-FIRST DESIGNER.` / `GAMER AT HEART.`
- Glitch effect plays on line 1, char-stagger on line 2
- After ~3 seconds, subtitle crossfades to the next phrase
- Shader gradient is visible behind the wireframe meshes
- Scroll CTA text is larger and readable

- [ ] **Step 8: Commit**

```bash
git add lib/heroCopy.ts components/sections/Hero.tsx components/GameObjects3D.tsx
git commit -m "feat(hero): AI-first headline rewrite + rotating subtitle + shader layer"
```

---

## Task 7: Work — frame-dominant card rebuild

**Files:**
- Modify: `components/sections/Work.tsx`
- Create: `public/work/.gitkeep`

- [ ] **Step 1: Create the public/work directory**

Run: `mkdir -p public/work && touch public/work/.gitkeep`

- [ ] **Step 2: Read current Work.tsx to get the project list**

Run: `cat components/sections/Work.tsx`. Extract:
- The list of case studies (titles, current descriptions, tags, href/routes)
- Any helper components (like project cards)

Copy the project array shape into the rewrite. Trim each description to **≤12 words** yourself (this is editorial — keep the sharpest phrase).

- [ ] **Step 3: Replace Work.tsx with the frame-dominant layout**

```tsx
// components/sections/Work.tsx
"use client";

import Link from "next/link";
import HUDFrame from "@/components/HUDFrame";

type Project = {
  code: string;
  caseNo: string;
  title: string;
  tagline: string; // <=12 words
  tags: string[]; // max 3
  href: string;
  imageSrc: string; // placeholder path in /public/work until real file dropped in
};

const PROJECTS: Project[] = [
  // Populate from existing Work.tsx data. Example row — replicate per case study:
  {
    code: "NOW-STUDIO",
    caseNo: "CASE · 01",
    title: "nowstudio",
    tagline: "Design tool that thinks in components, not pages.",
    tags: ["PRODUCT", "SYSTEMS", "AI"],
    href: "/nowstudio",
    imageSrc: "/work/nowstudio-hero.png",
  },
  // ... add the rest from existing Work.tsx
];

export default function Work() {
  return (
    <section id="work" className="relative w-full bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <h2
          className="mb-16 font-[family-name:var(--font-space-grotesk)] uppercase tracking-tight"
          style={{ fontSize: "var(--font-display-m)" }}
        >
          // SELECTED WORK
        </h2>

        <div className="flex flex-col gap-24">
          {PROJECTS.map((project) => (
            <WorkCard key={project.code} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project }: { project: Project }) {
  return (
    <Link href={project.href} className="group block">
      <HUDFrame
        label={project.caseNo}
        code={project.code}
        className="relative aspect-[21/9] w-full overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800"
      >
        {/* Placeholder: shows filename until real image is dropped in */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-mono text-white/30"
            style={{ fontSize: "var(--font-label)" }}
          >
            [ awaiting asset · {project.imageSrc} ]
          </span>
        </div>

        {/* Actual image — rendered only once the file exists; placeholder fallback via onError */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.imageSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:scale-[1.02]"
          onLoad={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = "1";
          }}
        />

        {/* Bottom overlay: title + tagline */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 pt-24">
          <h3
            className="font-[family-name:var(--font-space-grotesk)] uppercase leading-none tracking-tight"
            style={{ fontSize: "var(--font-display-m)" }}
          >
            {project.title}
          </h3>
          <p
            className="max-w-sm text-right text-white/80"
            style={{ fontSize: "var(--font-body-l)" }}
          >
            {project.tagline}
          </p>
        </div>

        {/* Tags top-left under the HUD label */}
        <div
          className="absolute left-6 top-10 flex gap-3 font-mono uppercase tracking-[0.18em] text-white/60"
          style={{ fontSize: "var(--font-label)" }}
        >
          {project.tags.map((tag) => (
            <span key={tag}>[{tag}]</span>
          ))}
        </div>

        {/* Hover CTA */}
        <div
          className="absolute bottom-8 right-8 translate-y-4 font-mono opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ fontSize: "var(--font-body-l)" }}
        >
          VIEW CASE →
        </div>
      </HUDFrame>
    </Link>
  );
}
```

**Important:** When porting the PROJECTS array from the existing Work.tsx, keep the same project count and route hrefs. Only rewrite descriptions to `tagline` ≤12 words.

- [ ] **Step 4: Visual check**

Open http://localhost:3000#work. Confirm:
- Cards are 21:9 wide, HUD brackets visible on each
- Placeholder text shows the filename each slot expects
- Titles + taglines are large and readable
- Hover shows "VIEW CASE →" slide-in
- Tags are 13-15px, all caps, mono

- [ ] **Step 5: Commit**

```bash
git add components/sections/Work.tsx public/work/.gitkeep
git commit -m "feat(work): frame-dominant card rebuild with HUDFrame + placeholders"
```

---

## Task 8: AITeaser — centered layout + 3-card strip

**Files:**
- Modify: `components/sections/AITeaser.tsx`

- [ ] **Step 1: Replace AITeaser.tsx**

```tsx
// components/sections/AITeaser.tsx
"use client";

import Link from "next/link";
import HUDFrame from "@/components/HUDFrame";
import ShaderBackground from "@/components/ShaderBackground";

const CARDS = [
  {
    label: "CLAUDE + FIGMA",
    body: "Bidirectional flow — prompt to prototype, no translation tax.",
  },
  {
    label: "SHIP SOLO",
    body: "One designer, full stack — strategy to shader to production.",
  },
  {
    label: "LIVE SYSTEM",
    body: "Design system that writes its own React counterparts.",
  },
];

export default function AITeaser() {
  return (
    <section id="ai" className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <ShaderBackground variant="noise" opacity={0.55} />
      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center px-6 py-32 text-center">
        <span
          className="mb-8 font-mono uppercase tracking-[0.2em] text-white/60"
          style={{ fontSize: "var(--font-label)" }}
        >
          // AI-NATIVE
        </span>

        <h2
          className="mb-10 font-[family-name:var(--font-space-grotesk)] uppercase leading-[0.95] tracking-tight"
          style={{ fontSize: "var(--font-display-m)" }}
        >
          AI IS A TEAMMATE,
          <br />
          NOT A TOOL.
        </h2>

        <p
          className="mb-16 max-w-2xl text-white/80"
          style={{ fontSize: "var(--font-body-l)" }}
        >
          I design with AI the way I design with teammates — briefed, trusted,
          and looped in early. The output isn&apos;t a prompt trick, it&apos;s a workflow.
        </p>

        <div className="mb-12 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <HUDFrame
              key={card.label}
              label={card.label}
              code=""
              className="aspect-[4/3] bg-white/[0.02] p-8 backdrop-blur-sm"
            >
              <div className="flex h-full items-end">
                <p
                  className="text-left text-white/85"
                  style={{ fontSize: "var(--font-body)" }}
                >
                  {card.body}
                </p>
              </div>
            </HUDFrame>
          ))}
        </div>

        <Link
          href="/ai-native"
          className="font-mono uppercase tracking-[0.18em] text-white/80 underline-offset-8 hover:underline"
          style={{ fontSize: "var(--font-body-l)" }}
        >
          Read the full story →
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify the /ai-native link doesn't 404 the build**

The link points at a page that doesn't exist yet. Next.js won't block the build for a client-side `<Link>`, but to avoid a dead click, create a minimal stub:

```tsx
// app/ai-native/page.tsx
export default function AINativePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <p style={{ fontSize: "var(--font-body-l)" }} className="font-mono">
        [ ai-native · in progress ]
      </p>
    </main>
  );
}
```

- [ ] **Step 3: Visual check**

Open http://localhost:3000#ai. Confirm:
- Shader noise background visible
- Centered headline + short subhead (not a wall of text)
- 3 HUD cards in a row on desktop, stacked on mobile
- "Read the full story" link is readable (18px+)

- [ ] **Step 4: Commit**

```bash
git add components/sections/AITeaser.tsx app/ai-native/page.tsx
git commit -m "feat(ai-teaser): centered layout + 3-card strip + /ai-native stub"
```

---

## Task 9: About — stat tile grid rebuild

**Files:**
- Modify: `components/sections/About.tsx`
- Create: `public/about/.gitkeep`

- [ ] **Step 1: Create the about asset directory**

Run: `mkdir -p public/about && touch public/about/.gitkeep`

- [ ] **Step 2: Replace About.tsx**

```tsx
// components/sections/About.tsx
"use client";

import HUDFrame from "@/components/HUDFrame";
import ShaderBackground from "@/components/ShaderBackground";

type Stat = {
  number: string;
  label: string;
  context: string;
};

const STATS: Stat[] = [
  { number: "6", label: "YEARS SHIPPING", context: "Senior PD since 2020" },
  { number: "2", label: "PRODUCTS SOLO", context: "6labs · nowstudio" },
  { number: "1", label: "DESIGN SYSTEM", context: "Apparatus, cross-product" },
  { number: "∞", label: "AI-NATIVE WORKFLOW", context: "Claude + Figma + shaders" },
  { number: "24", label: "SHADERS SHIPPED", context: "GLSL in production" },
  { number: "100%", label: "PROMPT → SHIP", context: "No handoff friction" },
];

export default function About() {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-black text-white">
      <ShaderBackground variant="grid-warp" opacity={0.25} />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-32">
        <span
          className="mb-6 block font-mono uppercase tracking-[0.2em] text-white/60"
          style={{ fontSize: "var(--font-label)" }}
        >
          // ABOUT
        </span>

        <h2
          className="mb-10 font-[family-name:var(--font-space-grotesk)] uppercase leading-[0.95] tracking-tight"
          style={{ fontSize: "var(--font-display-m)" }}
        >
          AI-FIRST DESIGNER.
          <br />
          6 YEARS SHIPPING PRODUCT.
        </h2>

        <p
          className="mb-16 max-w-3xl text-white/85"
          style={{ fontSize: "var(--font-body-l)" }}
        >
          Senior product designer with a gamer&apos;s brain. I prompt, prototype,
          and ship full systems solo — Figma to Three.js to Claude-assisted
          production code.
        </p>

        {/* Portrait + stat grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          {/* Portrait */}
          <HUDFrame
            label="OPERATOR"
            code="ZI-001"
            className="relative aspect-square w-full max-w-[360px] overflow-hidden bg-neutral-900"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-mono text-white/30"
                style={{ fontSize: "var(--font-label)" }}
              >
                [ awaiting asset · /about/portrait.jpg ]
              </span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/portrait.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-0 grayscale transition-opacity"
              onLoad={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0.9";
              }}
            />
          </HUDFrame>

          {/* Stat grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STATS.map((stat) => (
              <HUDFrame
                key={stat.label}
                label={stat.label}
                code=""
                className="relative flex aspect-[4/3] flex-col justify-between bg-white/[0.02] p-6 backdrop-blur-sm"
              >
                <div />
                <div>
                  <div
                    className="font-[family-name:var(--font-space-grotesk)] leading-none"
                    style={{ fontSize: "var(--font-display-l)" }}
                    aria-label={`${stat.number} ${stat.label.toLowerCase()}`}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="mt-3 text-white/65"
                    style={{ fontSize: "var(--font-label)" }}
                  >
                    {stat.context}
                  </div>
                </div>
              </HUDFrame>
            ))}
          </div>
        </div>

        {/* Closing line */}
        <p
          className="mt-24 max-w-3xl text-white/75"
          style={{ fontSize: "var(--font-body)" }}
        >
          I don&apos;t design for AI. I design with it, as a teammate that
          compounds every hour I put in.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Visual check**

Open http://localhost:3000#about. Confirm:
- Grid-warp shader visible (subtle, behind everything)
- Headline `AI-FIRST DESIGNER. / 6 YEARS SHIPPING PRODUCT.` in Display M
- Short tagline under headline (not 290 words)
- Portrait HUD frame with "awaiting asset" placeholder
- 6 stat tiles with big numbers visible
- Closing line at the bottom

- [ ] **Step 4: Commit**

```bash
git add components/sections/About.tsx public/about/.gitkeep
git commit -m "feat(about): stat tile grid rebuild, 290w→80w copy cut"
```

---

## Task 10: Contact — full-bleed shader + huge email

**Files:**
- Modify: `components/sections/Contact.tsx`

- [ ] **Step 1: Replace Contact.tsx**

```tsx
// components/sections/Contact.tsx
"use client";

import ShaderBackground from "@/components/ShaderBackground";
import { useHudClock } from "@/hooks/useHudClock";

const EMAIL = "ziaul.islam14@gmail.com";

const SOCIALS = [
  { name: "LinkedIn", href: "https://linkedin.com/in/ziaul-islam" },
  { name: "GitHub", href: "https://github.com/ziaulislam" },
  { name: "Twitter", href: "https://twitter.com/ziaulislam" },
  { name: "Dribbble", href: "https://dribbble.com/ziaulislam" },
];

export default function Contact() {
  const clock = useHudClock();

  return (
    <section
      id="contact"
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      <ShaderBackground variant="particles" opacity={0.55} />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <span
          className="mb-6 font-mono uppercase tracking-[0.2em] text-white/60"
          style={{ fontSize: "var(--font-label)" }}
        >
          // CONTACT
        </span>

        <h2
          className="mb-8 font-[family-name:var(--font-space-grotesk)] uppercase leading-[0.95] tracking-tight"
          style={{ fontSize: "var(--font-display-m)" }}
        >
          LET&apos;S BUILD
          <br />
          THE NEXT THING.
        </h2>

        <a
          href={`mailto:${EMAIL}`}
          className="group relative mb-8 font-[family-name:var(--font-space-grotesk)] leading-none"
          style={{ fontSize: "var(--font-display-l)" }}
        >
          <span>{EMAIL}</span>
          <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-white transition-[width] duration-300 group-hover:w-full" />
        </a>

        <p
          className="font-mono uppercase tracking-[0.18em] text-white/75"
          style={{ fontSize: "var(--font-body)" }}
        >
          OPEN · SENIOR PRODUCT DESIGN · REMOTE + SELECT ON-SITE
        </p>
      </div>

      {/* Bottom HUD strip */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between border-t border-white/15 bg-black/40 px-6 py-4 backdrop-blur-sm font-mono uppercase tracking-[0.18em]"
        style={{ fontSize: "var(--font-body)" }}
      >
        <div className="flex gap-6 text-white/80">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              {s.name} ↗
            </a>
          ))}
        </div>

        <div className="text-white/70" style={{ fontSize: "var(--font-mono-sm)" }}>
          BLR · {clock.tz} {clock.hh}:{clock.mm}
        </div>

        <div className="flex items-center gap-3 text-white/80">
          <span
            aria-hidden
            className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
          />
          AVAILABLE Q2 2026
        </div>
      </div>
    </section>
  );
}
```

**Note on social URLs:** placeholders — replace with your real handles before shipping, or leave to edit in a follow-up.

- [ ] **Step 2: Visual check**

Open http://localhost:3000#contact. Confirm:
- Particle shader fills the viewport
- Huge statement + email (email in Display L, ~48–112px)
- Email hover: underline slides in from left
- Bottom HUD strip: socials left, clock center, status right — all ≥14px
- Clock updates every second

- [ ] **Step 3: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat(contact): full-bleed particle shader + huge email"
```

---

## Task 11: Playwright — readability floor test

**Files:**
- Modify: `package.json`
- Create: `playwright.config.ts`
- Create: `tests/readability.spec.ts`

- [ ] **Step 1: Install Playwright**

Run:
```bash
npm install -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 2: Add test scripts to package.json**

Modify the `"scripts"` block:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "playwright test",
  "test:ui": "playwright test --ui"
}
```

- [ ] **Step 3: Create playwright.config.ts**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "off",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
```

- [ ] **Step 4: Write the failing readability test**

```ts
// tests/readability.spec.ts
import { test, expect } from "@playwright/test";

test("no visible text renders below 13px", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const offenders = await page.evaluate(() => {
    const results: { tag: string; text: string; fontSize: number }[] = [];
    const all = document.querySelectorAll<HTMLElement>("body *");
    all.forEach((el) => {
      if (!el.offsetParent && el.tagName !== "BODY") return; // skip hidden
      const text = (el.textContent || "").trim();
      if (!text) return;
      // Only consider leaf text elements
      if (el.children.length > 0) return;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < 13) {
        results.push({ tag: el.tagName, text: text.slice(0, 40), fontSize: fs });
      }
    });
    return results;
  });

  expect(offenders, JSON.stringify(offenders, null, 2)).toEqual([]);
});
```

- [ ] **Step 5: Run the test**

Run: `npm run test -- tests/readability.spec.ts`
Expected: PASS (all changes from Tasks 5-10 should have lifted every text to ≥13px).

If it fails, the failure message lists every offending element — fix each and re-run.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json playwright.config.ts tests/readability.spec.ts
git commit -m "test(readability): assert no text renders below 13px"
```

---

## Task 12: Playwright — reduced-motion test

**Files:**
- Create: `tests/reduced-motion.spec.ts`

- [ ] **Step 1: Write the reduced-motion test**

```ts
// tests/reduced-motion.spec.ts
import { test, expect } from "@playwright/test";

test.use({
  contextOptions: {
    reducedMotion: "reduce",
  },
});

test("rotating subtitle does not rotate under prefers-reduced-motion", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const subtitle = page.locator(".hero-subtitle-current");
  await expect(subtitle).toBeVisible();

  const first = await subtitle.textContent();
  await page.waitForTimeout(3500); // longer than the 3s rotation interval
  const second = await subtitle.textContent();

  expect(second).toBe(first);
});

test("shader canvases mount and do not throw under reduced motion", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // At least one canvas should exist (Hero shader + GameObjects3D)
  const canvasCount = await page.locator("canvas").count();
  expect(canvasCount).toBeGreaterThan(0);

  expect(errors).toEqual([]);
});
```

- [ ] **Step 2: Run the test**

Run: `npm run test -- tests/reduced-motion.spec.ts`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add tests/reduced-motion.spec.ts
git commit -m "test(a11y): reduced-motion freezes subtitle rotation"
```

---

## Task 13: Final build + smoke check

**Files:** none

- [ ] **Step 1: Stop any running dev server**

Kill the background `npm run dev` process if still running (so the `next build` gets a clean environment).

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: build succeeds with zero TypeScript or lint errors.

- [ ] **Step 3: Start production server and visually walk the site**

Run: `npm run start`
Open http://localhost:3000 and walk every section top-to-bottom:
- Nav: 15px+ links, HUD readable
- Hero: new headline, subtitle rotates, shader + meshes visible
- Work: frame-dominant cards with placeholder filenames shown
- AITeaser: centered, 3 HUD cards, short copy
- About: 6 stat tiles + portrait placeholder + 80-word copy
- Contact: full-bleed particles, huge email, bottom HUD strip with live clock

Confirm zero console errors.

- [ ] **Step 4: Run full test suite**

Run: `npm run test`
Expected: both tests pass.

- [ ] **Step 5: Final commit if any polish was needed**

If steps 3-4 surfaced any small fixes, commit them separately:

```bash
git add -A
git commit -m "polish: final readability + smoke fixes"
```

---

## Self-Review

**Spec coverage:** Every section of the design spec maps to a task:
- Type scale → Task 1
- `HUDFrame` → Task 2
- `ShaderBackground` + 4 variants → Task 3
- `useHudClock` → Task 4
- Nav fixes → Task 5
- Hero headline + subtitle + shader → Task 6
- Work frame-dominant cards → Task 7
- AITeaser centered + 3 cards → Task 8
- About stat tiles + portrait → Task 9
- Contact full-bleed email → Task 10
- Readability floor automated check → Task 11
- Reduced-motion automated check → Task 12
- Build smoke → Task 13

**Asset strategy α:** Each image slot uses a labeled placeholder + an `<img>` with `onLoad` reveal, so dropping a real file into `/public/work/` or `/public/about/` just works.

**Open items from spec carried forward:** Exact motion timings for the shader ripple on Work card hover — deferred; base hover already works without it. The `/ai-native` page is stubbed in Task 8. Real social URLs are noted as a polish step in Task 10.
