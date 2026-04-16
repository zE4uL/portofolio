# Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a new Next.js portfolio at `ziaul-islam.vercel.app` that positions Ziaul for senior/lead product design roles at Indian product companies, replacing the Framer site. Launch target: 2026-04-30 (14 days from 2026-04-16).

**Architecture:** Reuse the existing `D:\AG_master\portfolio\` Next.js 16 + React 19 + Tailwind v4 project infrastructure. Archive all existing UI components under `components/_archive/` and rebuild the UI layer from scratch using `/ui-ux-pro-max` (UX planning) and `/frontend-design:frontend-design` (production-grade UI code) per-component. Storybook drives isolated component iteration. All 8 case studies follow one repeatable `CaseStudyLayout`. All 14 interactions from the spec are in v1 except the Konami easter egg and WebXR AR, deferred to v1.1.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, GSAP + ScrollTrigger, Lenis, React Three Fiber + Three, drei, matter-js, split-type, lucide-react, Storybook 8 (Vite builder), next/font (Geist, Geist Mono, Instrument Serif), Vercel hosting.

**Spec:** `D:\AG_master\portfolio\docs\specs\2026-04-16-portfolio-design.md`
**Project inventory:** `D:\AG_master\portfolio\projects\INDEX.md`

---

## Working rules

1. **Work from `D:\AG_master\portfolio\` as the project root.** All paths below are relative unless prefixed with absolute.
2. **Commit after every task.** Branch: `main` (or feature branches per phase if preferred).
3. **Every component/section gets a Storybook story at creation time.** One `.stories.tsx` file next to each component.
4. **For every UI task**: first call `/ui-ux-pro-max` for the UX plan, then `/frontend-design:frontend-design` to generate the distinctive production-ready UI, then iterate in Storybook.
5. **Visual verification replaces unit tests for UI work.** Run `npm run dev` or `npm run storybook` and view in browser; commit when the component matches the intent.
6. **Metrics are drafted inline as `// DRAFT — verify with Ziaul`** per the spec. Keep them conservative.
7. **Mobile-first responsive.** Every layout verified at 390px, 768px, and 1440px.
8. **`prefers-reduced-motion` respected** on every motion component — use Framer Motion's `useReducedMotion()` hook and GSAP's matchMedia.

---

## File structure (target)

```
portfolio/
├── app/
│   ├── layout.tsx                          # root layout (fonts, SmoothScroll, Cursor, theme)
│   ├── page.tsx                            # homepage composition
│   ├── globals.css                         # Tailwind + tokens + fonts
│   ├── work/
│   │   ├── page.tsx                        # /work grid index
│   │   └── [slug]/page.tsx                 # /work/[slug] dynamic route
│   ├── about/page.tsx
│   ├── playground/page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── opengraph-image.tsx                 # default OG
├── components/
│   ├── _archive/                           # OLD UI goes here — do not delete
│   ├── layout/
│   │   ├── Nav.tsx  Nav.stories.tsx
│   │   ├── Footer.tsx  Footer.stories.tsx
│   │   ├── ThemeToggle.tsx  ThemeToggle.stories.tsx
│   │   └── ScrollProgress.tsx  ScrollProgress.stories.tsx
│   ├── hero/
│   │   ├── Hero.tsx  Hero.stories.tsx
│   │   ├── TypeReveal.tsx  TypeReveal.stories.tsx
│   │   ├── ShaderField.tsx
│   │   └── PressStartCTA.tsx  PressStartCTA.stories.tsx
│   ├── cursor/
│   │   ├── Cursor.tsx
│   │   └── useCursorContext.ts
│   ├── marquee/
│   │   └── Marquee.tsx  Marquee.stories.tsx
│   ├── work/
│   │   ├── FeaturedCarousel.tsx  FeaturedCarousel.stories.tsx
│   │   ├── WorkCard.tsx  WorkCard.stories.tsx
│   │   ├── CraftStrip.tsx  CraftStrip.stories.tsx
│   │   └── WorkGrid.tsx  WorkGrid.stories.tsx
│   ├── about/
│   │   ├── PickACard.tsx  PickACard.stories.tsx
│   │   └── Timeline.tsx  Timeline.stories.tsx
│   ├── contact/
│   │   ├── AIWorkshopTeaser.tsx  AIWorkshopTeaser.stories.tsx
│   │   └── FooterPhysics.tsx  FooterPhysics.stories.tsx
│   ├── case-study/
│   │   ├── CaseStudyLayout.tsx  CaseStudyLayout.stories.tsx
│   │   ├── CaseHero.tsx
│   │   ├── TLDR.tsx
│   │   ├── Context.tsx
│   │   ├── Problem.tsx
│   │   ├── Role.tsx
│   │   ├── Approach.tsx
│   │   ├── Solution.tsx
│   │   ├── Outcome.tsx
│   │   ├── Reflection.tsx
│   │   └── NextCase.tsx
│   ├── primitives/
│   │   ├── Button.tsx  Button.stories.tsx
│   │   ├── Chip.tsx  Chip.stories.tsx
│   │   ├── Tag.tsx  Tag.stories.tsx
│   │   └── IconButton.tsx  IconButton.stories.tsx
│   └── SmoothScroll.tsx                    # KEEP (Lenis infra)
├── hooks/
│   ├── useHudClock.ts                      # existing — audit/reuse
│   ├── useReducedMotion.ts
│   └── useScrollProgress.ts
├── content/
│   └── case-studies/
│       ├── 6labs-ai.mdx
│       ├── float-ds.mdx
│       ├── nowstudio.mdx
│       ├── ai-highlights.mdx
│       ├── amway-india.mdx
│       ├── bluestacks-mobile.mdx
│       ├── scroll-wheel.mdx
│       └── user-profile.mdx
├── lib/
│   ├── work.ts                             # case-study registry
│   └── fonts.ts                            # next/font config
├── projects/                               # EXISTS — per-project context md
├── public/
│   ├── resume.pdf                          # INSTALLED
│   ├── images/
│   │   ├── profile/ziaul.jpg               # INSTALLED
│   │   └── work/<slug>/...                 # per-case assets
│   └── og/                                 # OG images per case
├── .storybook/
│   ├── main.ts
│   └── preview.tsx
├── docs/
│   ├── specs/2026-04-16-portfolio-design.md
│   └── plans/2026-04-16-portfolio-redesign.md  # THIS FILE
└── package.json
```

---

# PHASE 0 — Preparation (Day 1 AM, ~3h)

## Task 0.1 — Archive the existing UI

**Files:**
- Move: `components/Background3D.tsx` → `components/_archive/Background3D.tsx`
- Move: `components/Cursor.tsx` → `components/_archive/Cursor.tsx`
- Move: `components/GameObjects3D.tsx` → `components/_archive/GameObjects3D.tsx`
- Move: `components/HUDFrame.tsx` → `components/_archive/HUDFrame.tsx`
- Move: `components/Nav.tsx` → `components/_archive/Nav.tsx`
- Move: `components/ShaderBackground.tsx` → `components/_archive/ShaderBackground.tsx`
- Move: `components/shaders.ts` → `components/_archive/shaders.ts`
- Move: `components/sections/*` → `components/_archive/sections/*`
- Keep: `components/SmoothScroll.tsx` (infrastructure — stays in place)

- [ ] **Step 1:** Create archive folder + move files

```bash
cd /d/AG_master/portfolio
mkdir -p components/_archive/sections
mv components/Background3D.tsx components/_archive/
mv components/Cursor.tsx components/_archive/
mv components/GameObjects3D.tsx components/_archive/
mv components/HUDFrame.tsx components/_archive/
mv components/Nav.tsx components/_archive/
mv components/ShaderBackground.tsx components/_archive/
mv components/shaders.ts components/_archive/
mv components/sections/About.tsx components/_archive/sections/
mv components/sections/AITeaser.tsx components/_archive/sections/
mv components/sections/Contact.tsx components/_archive/sections/
mv components/sections/Hero.tsx components/_archive/sections/
mv components/sections/Work.tsx components/_archive/sections/
rmdir components/sections
```

- [ ] **Step 2:** Replace `app/page.tsx` with a placeholder so the build still passes

```tsx
// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-2xl">Portfolio — rebuild in progress.</p>
    </main>
  );
}
```

- [ ] **Step 3:** Verify build passes

```bash
npm run build
```
Expected: build succeeds with no missing-import errors.

- [ ] **Step 4:** Commit

```bash
git add -A
git commit -m "chore: archive legacy UI and reset homepage placeholder"
```

---

## Task 0.2 — Install new dependencies

**Files:** `package.json`, `package-lock.json`

- [ ] **Step 1:** Install runtime deps

```bash
cd /d/AG_master/portfolio
npm install matter-js split-type lucide-react @splinetool/react-spline
```

- [ ] **Step 2:** Install type definitions

```bash
npm install -D @types/matter-js
```

- [ ] **Step 3:** Verify build

```bash
npm run build
```

- [ ] **Step 4:** Commit

```bash
git add package.json package-lock.json
git commit -m "chore: add matter-js, split-type, lucide-react, types"
```

---

## Task 0.3 — Install and configure Storybook

**Files:** `.storybook/main.ts`, `.storybook/preview.tsx`, `package.json` (scripts)

- [ ] **Step 1:** Run Storybook CLI

```bash
cd /d/AG_master/portfolio
npx storybook@latest init --builder=vite
```
If it prompts about framework: select **Next.js**. If Next 16 compatibility fails, fallback:
```bash
npx storybook@next init --type=react-vite
```

- [ ] **Step 2:** Configure Storybook to use the project's Tailwind + fonts

`.storybook/preview.tsx`:

```tsx
import type { Preview } from "@storybook/react";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "canvas",
      values: [
        { name: "canvas", value: "#0A0A0B" },
        { name: "light", value: "#FAFAF7" },
      ],
    },
    viewport: {
      defaultViewport: "responsive",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[var(--canvas)] text-[var(--text-primary)] p-8 font-sans">
        <Story />
      </div>
    ),
  ],
};

export default preview;
```

- [ ] **Step 3:** Add scripts if not added by init

`package.json` scripts should include:

```json
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build"
```

- [ ] **Step 4:** Verify Storybook starts

```bash
npm run storybook
```
Expected: runs on http://localhost:6006. Navigate there and see default examples.

- [ ] **Step 5:** Delete Storybook's example stories

```bash
rm -rf stories/
```

- [ ] **Step 6:** Commit

```bash
git add -A
git commit -m "chore: install Storybook with Vite builder + tailwind preview"
```

---

## Task 0.4 — Design tokens + fonts

**Files:** `app/globals.css`, `lib/fonts.ts`, `app/layout.tsx`

- [ ] **Step 1:** Create `lib/fonts.ts`

```ts
// lib/fonts.ts
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

export const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
```

- [ ] **Step 2:** Replace `app/globals.css` tokens

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);
}

:root {
  --canvas: #0A0A0B;
  --surface: #121317;
  --surface-raised: #1A1B21;
  --text-primary: #F1F1F3;
  --text-secondary: #9EA0A8;
  --accent-primary: #7C5CFF;
  --accent-warm: #FF7A3D;
  --border: rgba(255, 255, 255, 0.08);

  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 28px;

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --stagger: 40ms;
}

[data-theme="light"] {
  --canvas: #FAFAF7;
  --surface: #F1F0EB;
  --surface-raised: #FFFFFF;
  --text-primary: #111113;
  --text-secondary: #4B4D55;
  --border: rgba(0, 0, 0, 0.08);
}

html {
  background: var(--canvas);
  color: var(--text-primary);
  font-family: var(--font-sans), system-ui, sans-serif;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3:** Update `app/layout.tsx` to apply fonts

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { sans, mono, serif } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ziaul Islam — Product Designer. AI-native. Also a gamer.",
  description:
    "Senior Product Designer working on AI, design systems, and platforms at BlueStacks / now.gg / 6labs.ai.",
  metadataBase: new URL("https://ziaul-islam.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4:** Verify build + dev

```bash
npm run dev
```
Visit http://localhost:3000 — see placeholder text in Geist font on near-black canvas.

- [ ] **Step 5:** Commit

```bash
git add app/globals.css lib/fonts.ts app/layout.tsx
git commit -m "feat: design tokens, Geist + Instrument Serif fonts, reduced-motion guard"
```

---

# PHASE 1 — Foundation primitives (Day 1 PM – Day 2, ~1.5 days)

## Task 1.1 — Theme system + ThemeToggle

**Files:** `components/layout/ThemeToggle.tsx`, `components/layout/ThemeToggle.stories.tsx`, `app/layout.tsx` (add script)

- [ ] **Step 1:** Call `/ui-ux-pro-max` with input: *"Sun/moon theme toggle button, token-driven, animates between dark and light. Includes star trail micro-animation. Must respect system preference on first load."*

- [ ] **Step 2:** Call `/frontend-design:frontend-design` to generate the distinctive UI.

- [ ] **Step 3:** Implement `components/layout/ThemeToggle.tsx` with this minimum behavior:

```tsx
"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    const preferred =
      saved ??
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(preferred);
    document.documentElement.setAttribute("data-theme", preferred);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="w-10 h-10 rounded-full border border-[var(--border)] grid place-items-center hover:bg-[var(--surface-raised)] transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25 }}
        >
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
```

- [ ] **Step 4:** Add inline script to `app/layout.tsx` `<head>` to avoid FOUC

```tsx
<head>
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function(){
          try{
            var t = localStorage.getItem('theme') ||
              (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
            document.documentElement.setAttribute('data-theme', t);
          }catch(e){}
        })();
      `,
    }}
  />
</head>
```

- [ ] **Step 5:** Write `ThemeToggle.stories.tsx`

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle } from "./ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "Layout/ThemeToggle",
  component: ThemeToggle,
};
export default meta;

export const Default: StoryObj<typeof ThemeToggle> = {};
```

- [ ] **Step 6:** Verify in Storybook

```bash
npm run storybook
```
Click toggle — icon flips, canvas shouldn't change (Storybook preview uses its own theme). Not an error.

- [ ] **Step 7:** Commit

```bash
git add components/layout/ThemeToggle.tsx components/layout/ThemeToggle.stories.tsx app/layout.tsx
git commit -m "feat(layout): theme toggle with data-theme attribute + no-FOUC script"
```

---

## Task 1.2 — Nav component

**Files:** `components/layout/Nav.tsx`, `components/layout/Nav.stories.tsx`

- [ ] **Step 1:** Call `/ui-ux-pro-max` then `/frontend-design:frontend-design` for input: *"Sticky minimal nav bar. Left: wordmark 'Ziaul'. Right: Work, About, Playground, Contact links + ThemeToggle + Resume button (external, opens /resume.pdf). Must collapse to mobile drawer under 768px."*

- [ ] **Step 2:** Implement with structure:

```tsx
"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[var(--border)] bg-[var(--canvas)]/70 backdrop-blur">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif italic text-xl">
          Ziaul
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[var(--accent-primary)] transition-colors">
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[var(--border)] hover:bg-[var(--surface-raised)] transition-colors"
          >
            Resume <ArrowUpRight size={14} />
          </a>
        </nav>
        <button
          className="md:hidden w-10 h-10 grid place-items-center"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[var(--border)] px-6 py-4 flex flex-col gap-4 text-sm">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener">
            Resume ↗
          </a>
          <ThemeToggle />
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 3:** Add story `Nav.stories.tsx`

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Nav } from "./Nav";

const meta: Meta<typeof Nav> = { title: "Layout/Nav", component: Nav };
export default meta;
export const Default: StoryObj<typeof Nav> = {};
```

- [ ] **Step 4:** Wire into `app/layout.tsx`

```tsx
import { Nav } from "@/components/layout/Nav";
// inside <body>:
<Nav />
{children}
```

- [ ] **Step 5:** Run `npm run dev`, verify nav at desktop + mobile breakpoints.

- [ ] **Step 6:** Commit: `feat(layout): sticky nav with mobile drawer`

---

## Task 1.3 — ScrollProgress (XP bar)

**Files:** `components/layout/ScrollProgress.tsx`, `components/layout/ScrollProgress.stories.tsx`, `hooks/useScrollProgress.ts`

- [ ] **Step 1:** Create `hooks/useScrollProgress.ts`

```ts
"use client";
import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}
```

- [ ] **Step 2:** Create `components/layout/ScrollProgress.tsx`

```tsx
"use client";
import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const p = useScrollProgress();
  return (
    <div
      aria-hidden
      className="fixed top-16 inset-x-0 h-1 z-40 pointer-events-none bg-[var(--border)]"
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-warm)]"
        style={{ scaleX: p }}
        transition={{ duration: 0 }}
      />
    </div>
  );
}
```

- [ ] **Step 3:** Story + wire into `app/layout.tsx` below `<Nav />`.

- [ ] **Step 4:** Verify `npm run dev` — scroll down a placeholder long page (temporarily add `<div style={{height: '300vh'}}/>` to homepage to test); bar fills.

- [ ] **Step 5:** Commit: `feat(layout): XP-style scroll progress bar`

---

## Task 1.4 — Custom cursor (context-aware)

**Files:** `components/cursor/Cursor.tsx`, `components/cursor/useCursorContext.ts`

- [ ] **Step 1:** Call `/ui-ux-pro-max` + `/frontend-design:frontend-design` for: *"Custom cursor, 8px dot default. On hovering links: expands to 40px with label text. On cards: label 'drag to explore'. On draggable physics: label 'throw'. Desktop only — hidden on touch devices."*

- [ ] **Step 2:** Implement `Cursor.tsx` — reference snippet (refine via the skills):

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Mode = "default" | "link" | "card" | "throw";

export function Cursor() {
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const pos = useRef({ x: -100, y: -100 });
  const [, force] = useState(0);

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      force((n) => n + 1);
      const target = e.target as HTMLElement | null;
      const cursorData = target?.closest<HTMLElement>("[data-cursor]");
      if (cursorData) {
        setMode((cursorData.dataset.cursor as Mode) ?? "default");
        setLabel(cursorData.dataset.cursorLabel ?? "");
      } else if (target?.closest("a, button")) {
        setMode("link");
        setLabel("");
      } else {
        setMode("default");
        setLabel("");
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[60] pointer-events-none mix-blend-difference"
      animate={{
        x: pos.current.x - (mode === "default" ? 4 : 20),
        y: pos.current.y - (mode === "default" ? 4 : 20),
        width: mode === "default" ? 8 : 40,
        height: mode === "default" ? 8 : 40,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.4 }}
      style={{
        borderRadius: 999,
        background: "white",
      }}
    >
      {label && (
        <span className="absolute left-full ml-3 text-xs text-white whitespace-nowrap">
          {label}
        </span>
      )}
    </motion.div>
  );
}
```

- [ ] **Step 3:** Wire into `app/layout.tsx` as the last element inside `<body>`.

- [ ] **Step 4:** Add `html { cursor: none; }` in `globals.css`.

- [ ] **Step 5:** Verify `npm run dev` — cursor follows mouse; on nav links, enlarges.

- [ ] **Step 6:** Commit: `feat(cursor): context-aware custom cursor with label`

---

## Task 1.5 — SmoothScroll verification

**Files:** `components/SmoothScroll.tsx` (existing)

- [ ] **Step 1:** Read the existing file, verify it wraps Lenis and mounts on layout.

- [ ] **Step 2:** Confirm it's mounted once in `app/layout.tsx`. If not, add.

- [ ] **Step 3:** Verify `npm run dev` — scrolling is smooth.

- [ ] **Step 4:** Commit if any changes: `chore(scroll): confirm Lenis wiring`

---

## Task 1.6 — Primitives: Button, Chip, Tag, IconButton

**Files:** `components/primitives/{Button,Chip,Tag,IconButton}.tsx` + stories

- [ ] **Step 1:** For each primitive, call `/ui-ux-pro-max` for UX + `/frontend-design:frontend-design` for code.

Acceptance criteria:
- **Button** — `variant`: `primary | secondary | ghost`; `size`: `sm | md | lg`; magnetic hover on `primary` variant.
- **Chip** — monospace-labeled pill used for skill tags, project meta. Variants: `filled | outline | warm`.
- **Tag** — large rotated sticker-style tag for hero marquee. Random slight rotation.
- **IconButton** — circular 40px icon button used in Nav and Footer.

- [ ] **Step 2:** Story file per primitive with all variants rendered.

- [ ] **Step 3:** Verify in Storybook.

- [ ] **Step 4:** Commit: `feat(primitives): Button, Chip, Tag, IconButton with variants`

---

# PHASE 2 — Hero (Day 3, ~1 day)

## Task 2.1 — Hero shell

**Files:** `components/hero/Hero.tsx` + story

- [ ] **Step 1:** `/ui-ux-pro-max` prompt: *"Hero section. Headline: 'Product designer. AI-native. Also a gamer.' Sub-text: 1 line explaining AI + DS + BlueStacks/now.gg. Press-start CTA. Small animated cue controller. Ambient WebGL field behind. Responsive, centered vertically."*

- [ ] **Step 2:** `/frontend-design:frontend-design` to get the production layout.

- [ ] **Step 3:** Implement with this composition skeleton (refine via skills):

```tsx
"use client";
import { TypeReveal } from "./TypeReveal";
import { PressStartCTA } from "./PressStartCTA";
import { ShaderField } from "./ShaderField";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 overflow-hidden">
      <ShaderField />
      <div className="relative z-10 text-center max-w-4xl">
        <TypeReveal
          text="Product designer. AI-native."
          className="font-serif italic text-5xl md:text-7xl leading-[1.05] tracking-tight"
        />
        <TypeReveal
          text="Also a gamer."
          delay={0.4}
          className="block font-sans text-5xl md:text-7xl font-medium mt-1"
        />
        <p className="mt-8 text-[var(--text-secondary)] max-w-2xl mx-auto">
          Five years shipping AI, design systems, and platforms at BlueStacks / now.gg / 6labs.ai.
        </p>
        <div className="mt-10 flex justify-center">
          <PressStartCTA href="#work" label="Press Start" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4:** Story file renders hero isolated.

- [ ] **Step 5:** Commit: `feat(hero): hero section shell with composed children`

---

## Task 2.2 — TypeReveal (character-by-character)

**Files:** `components/hero/TypeReveal.tsx` + story

- [ ] **Step 1:** Implement using `split-type`:

```tsx
"use client";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { motion, useReducedMotion } from "framer-motion";

export function TypeReveal({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduce) return;
    const split = new SplitType(ref.current, { types: "chars" });
    const chars = split.chars ?? [];
    chars.forEach((c, i) => {
      (c as HTMLElement).style.display = "inline-block";
      (c as HTMLElement).style.opacity = "0";
      (c as HTMLElement).style.transform = "translateY(0.4em)";
      (c as HTMLElement).animate(
        [
          { opacity: 0, transform: "translateY(0.4em)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 700,
          delay: delay * 1000 + i * 28,
          fill: "forwards",
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        }
      );
    });
    return () => split.revert();
  }, [text, delay, reduce]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
```

- [ ] **Step 2:** Story — demo with different strings and delays.

- [ ] **Step 3:** Commit: `feat(hero): TypeReveal character stagger with split-type`

---

## Task 2.3 — ShaderField ambient background

**Files:** `components/hero/ShaderField.tsx`

- [ ] **Step 1:** `/frontend-design:frontend-design`: *"Low-intensity WebGL shader field for hero background using R3F + drei. Soft violet-to-black gradient mesh that reacts subtly to cursor. Stops rendering when offscreen to save GPU."*

- [ ] **Step 2:** Implement with `<Canvas>` from `@react-three/fiber`; use a fragment shader for a noise/gradient effect. Gate with `useInView` from framer-motion.

- [ ] **Step 3:** Ensure `position: absolute; inset: 0; opacity: 0.6;` behind hero content.

- [ ] **Step 4:** Respect `prefers-reduced-motion` — render a static gradient instead.

- [ ] **Step 5:** Commit: `feat(hero): ambient shader field background`

---

## Task 2.4 — Press Start CTA with controller cue

**Files:** `components/hero/PressStartCTA.tsx` + story

- [ ] **Step 1:** Implement:

```tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function PressStartCTA({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--accent-primary)] text-white font-mono text-sm"
      data-cursor="link"
    >
      <motion.span
        aria-hidden
        className="inline-block w-2 h-2 rounded-full bg-white"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {label} ▶
      <span className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-white/30 transition" />
    </Link>
  );
}
```

- [ ] **Step 2:** Story + verify.

- [ ] **Step 3:** Commit: `feat(hero): press-start CTA with blinking controller cue`

---

# PHASE 3 — Homepage sections (Day 4–5, ~2 days)

## Task 3.1 — Marquee

**Files:** `components/marquee/Marquee.tsx` + story

- [ ] **Step 1:** `/frontend-design:frontend-design`: *"Infinite horizontal marquee, pausable on hover, two-row counter-scroll. Items: company wordmarks + skill chips (AI/ML, Design Systems, B2B Platforms, Cross-platform, DSO)."*

- [ ] **Step 2:** Use GSAP or pure CSS with `@keyframes marquee`. Accept `items: string[]` prop.

- [ ] **Step 3:** Story with example items. Commit.

---

## Task 3.2 — Featured Work pinned horizontal carousel

**Files:** `components/work/FeaturedCarousel.tsx` + story

- [ ] **Step 1:** `/ui-ux-pro-max`: *"Pinned horizontal scroll section — 4 Tier-1 case study cards scroll horizontally as the user scrolls down the page. Uses GSAP ScrollTrigger pinning. Mobile fallback: vertical stack."*

- [ ] **Step 2:** Implement with `@gsap/react`:

```tsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WorkCard } from "./WorkCard";
import type { CaseStudyMeta } from "@/lib/work";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedCarousel({ items }: { items: CaseStudyMeta[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(max-width: 768px)").matches) return;
      const track = trackRef.current!;
      const x = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -x,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${x}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <div ref={trackRef} className="flex h-full items-center gap-8 px-[10vw] will-change-transform">
        {items.map((item) => (
          <WorkCard key={item.slug} {...item} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3:** Story with 4 mock items. Verify scrub works on desktop, stacks on mobile.

- [ ] **Step 4:** Commit.

---

## Task 3.3 — WorkCard with multi-layer parallax

**Files:** `components/work/WorkCard.tsx` + story

- [ ] **Step 1:** `/frontend-design:frontend-design`: *"Case-study card for pinned carousel. 4 layers: background gradient, hero screenshot, accent decoration, title block. Each layer translates at a different rate as cursor moves. Tilts subtly like a Vision Pro window. Card: 70vw wide on desktop, 90vw mobile."*

- [ ] **Step 2:** Implement with `useMotionValue` for cursor X/Y, map to transform of each layer.

- [ ] **Step 3:** Props: `{ slug, title, tagline, year, company, hero: string, accent: string }`.

- [ ] **Step 4:** Ensure click → navigates to `/work/${slug}`.

- [ ] **Step 5:** Story + commit.

---

## Task 3.4 — Craft moments strip

**Files:** `components/work/CraftStrip.tsx` + story

- [ ] **Step 1:** Auto-scrolling strip (horizontal, looping) of small artifact cards. Each shows: image + tiny caption. Items: scroll-wheel proto GIF, token grid, payment flow screen, Figma conditional demo, AI workshop slide.

- [ ] **Step 2:** Use same marquee technique as Task 3.1 but with visual items instead of text.

- [ ] **Step 3:** Story + commit.

---

## Task 3.5 — Supporting work 2×2 grid

**Files:** `components/work/WorkGrid.tsx` + story

- [ ] **Step 1:** Simpler card list — 2 cols × 2 rows (4 Tier 2 cases: Amway, BlueStacks Mobile, Scroll-wheel, User Profile). Hover reveals extra meta. Click → `/work/${slug}`.

- [ ] **Step 2:** Story + commit.

---

## Task 3.6 — PickACard About component

**Files:** `components/about/PickACard.tsx` + story

- [ ] **Step 1:** `/ui-ux-pro-max`: *"5 fanned playing cards labeled Gamer, Athlete, Traveller, Tech nerd, Designer. Click flips the card to reveal a story on the back. Only one can be active at a time. Keyboard accessible."*

- [ ] **Step 2:** Implement with Framer Motion `rotateY` 3D flip per card.

- [ ] **Step 3:** Card content from spec §11c — hardcoded string array:

```tsx
const CARDS = [
  { id: "gamer", label: "Gamer", story: "Hyper-competitive. 400+ hours in Valorant, Diamond 2. Still mad about that last round I should've won." },
  { id: "athlete", label: "Athlete", story: "I play to win. Badminton, FIFA, pickleball — if you can track a score, I'll find a way to track it harder." },
  { id: "traveller", label: "Traveller", story: "I plan trips the way I plan products — research everything, then throw the plan out by day 2." },
  { id: "tech", label: "Tech nerd", story: "Unboxed a Vision Pro week one. Shipped a Claude Code skill week two. Currently installing something you haven't heard of." },
  { id: "designer", label: "Designer", story: "Shipped my first real feature by turning a Figma prototype into the spec. An engineer said 'this IS the spec.' I've designed that way ever since." },
];
```

- [ ] **Step 4:** Story + commit.

---

## Task 3.7 — Timeline

**Files:** `components/about/Timeline.tsx` + story

- [ ] **Step 1:** Scroll-drawn vertical line. Items reveal one-by-one as they enter viewport. Data:

```tsx
const ENTRIES = [
  { year: "2019–2020", role: "UI/UX Designer", company: "Alpha Agency" },
  { year: "2020–2021", role: "UI/UX Designer", company: "Ikokas Digital" },
  { year: "2020–2021", role: "Contract UI/UX Designer", company: "Amway India" },
  { year: "2021–present", role: "Product Designer", company: "BlueStacks / now.gg" },
  { year: "2025–present", role: "Lead Designer, 6labs.ai", company: "BlueStacks / now.gg" },
];
```

- [ ] **Step 2:** Use Framer Motion `useInView` + SVG line with animated `pathLength`.

- [ ] **Step 3:** Story + commit.

---

## Task 3.8 — AI Workshop teaser

**Files:** `components/contact/AIWorkshopTeaser.tsx` + story

- [ ] **Step 1:** Simple section: headline *"I build AI-native workflows."* + 1 paragraph about Claude Code + Figma round-trip + custom skills + team workshops. CTA link to `/playground`.

- [ ] **Step 2:** Story + commit.

---

## Task 3.9 — Footer shell (physics landing zone)

**Files:** `components/layout/Footer.tsx` + `components/contact/FooterPhysics.tsx` stub

- [ ] **Step 1:** Footer layout with email, LinkedIn, Behance, Instagram, resume, and a container div `#physics-stage` sized to ~60vh where the sandbox mounts.

- [ ] **Step 2:** Stub `FooterPhysics.tsx` renders placeholder chips (not physics yet — that's Phase 6). Commit.

---

## Task 3.10 — Compose homepage

**Files:** `app/page.tsx`, `lib/work.ts`

- [ ] **Step 1:** Create `lib/work.ts` with typed case-study metadata (used by FeaturedCarousel and WorkGrid):

```ts
// lib/work.ts
export type CaseStudyMeta = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  company: string;
  tier: 1 | 2;
  hero: string; // /images/work/<slug>/hero.jpg
  accent: string;
};

export const FEATURED: CaseStudyMeta[] = [
  { slug: "6labs-ai", title: "6labs.ai", tagline: "AI gameplay analytics for game studios", year: "2025–now", company: "BlueStacks / now.gg", tier: 1, hero: "/images/work/6labs-ai/hero.jpg", accent: "#7C5CFF" },
  { slug: "float-ds", title: "Float", tagline: "Multi-brand design system architecture", year: "2022–now", company: "BlueStacks / now.gg", tier: 1, hero: "/images/work/float-ds/hero.jpg", accent: "#5FD6FF" },
  { slug: "nowstudio", title: "nowStudio", tagline: "Multi-store game publishing platform", year: "2022–now", company: "now.gg", tier: 1, hero: "/images/work/nowstudio/hero.jpg", accent: "#FFB84D" },
  { slug: "ai-highlights", title: "AI Highlights + ML Discovery", tagline: "Consumer ML on the App Player", year: "2021–now", company: "BlueStacks", tier: 1, hero: "/images/work/ai-highlights/hero.jpg", accent: "#FF5FA3" },
];

export const SUPPORTING: CaseStudyMeta[] = [
  { slug: "amway-india", title: "Amway India", tagline: "App + web redesign + DS (B2C)", year: "2020–21", company: "Amway India", tier: 2, hero: "/images/work/amway-india/hero.jpg", accent: "#5FD68A" },
  { slug: "bluestacks-mobile", title: "BlueStacks Mobile + Payments", tagline: "Cross-platform commerce", year: "2023–now", company: "BlueStacks / now.gg", tier: 2, hero: "/images/work/bluestacks-mobile/hero.jpg", accent: "#FFB84D" },
  { slug: "scroll-wheel", title: "Prototype-as-Spec", tagline: "Figma conditional-logic prototype shipped as engineering spec", year: "2022", company: "BlueStacks", tier: 2, hero: "/images/work/scroll-wheel/hero.jpg", accent: "#A3A3A3" },
  { slug: "user-profile", title: "Profile + Rewards + Memberships", tagline: "Growth-loop terminal", year: "2023–now", company: "BlueStacks / now.gg", tier: 2, hero: "/images/work/user-profile/hero.jpg", accent: "#FF7A3D" },
];
```

- [ ] **Step 2:** Compose `app/page.tsx`:

```tsx
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/marquee/Marquee";
import { FeaturedCarousel } from "@/components/work/FeaturedCarousel";
import { CraftStrip } from "@/components/work/CraftStrip";
import { WorkGrid } from "@/components/work/WorkGrid";
import { PickACard } from "@/components/about/PickACard";
import { Timeline } from "@/components/about/Timeline";
import { AIWorkshopTeaser } from "@/components/contact/AIWorkshopTeaser";
import { Footer } from "@/components/layout/Footer";
import { FEATURED, SUPPORTING } from "@/lib/work";

const MARQUEE = [
  "BlueStacks", "now.gg", "6labs.ai", "Amway India", "Design Systems Officer",
  "AI / ML", "Design Systems", "B2B Platforms", "Cross-platform", "AR / VR",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE} />
      <FeaturedCarousel items={FEATURED} />
      <CraftStrip />
      <WorkGrid items={SUPPORTING} />
      <PickACard />
      <Timeline />
      <AIWorkshopTeaser />
      <Footer />
    </>
  );
}
```

- [ ] **Step 3:** Run `npm run dev`. Smoke test all sections at 390px / 768px / 1440px.

- [ ] **Step 4:** Commit: `feat(home): compose homepage from all sections`

---

# PHASE 4 — Case study layout (Day 5–6, ~1 day)

## Task 4.1 — /work index page

**Files:** `app/work/page.tsx`

- [ ] **Step 1:** Page composes `WorkGrid` with `[...FEATURED, ...SUPPORTING]` (all 8).

- [ ] **Step 2:** Page title, hero section, grid, simple tag filter chips (tag = company or skill).

- [ ] **Step 3:** Commit.

---

## Task 4.2 — /work/[slug] dynamic route + registry

**Files:** `app/work/[slug]/page.tsx`, `lib/case-loader.ts`, `next.config.ts`, `mdx-components.tsx`

(`lib/work.ts` already provides `FEATURED` and `SUPPORTING` from Task 3.10 — look up by `.find()`.)

- [ ] **Step 1:** Create `app/work/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { FEATURED, SUPPORTING } from "@/lib/work";
import { loadCaseStudy } from "@/lib/case-loader";

export async function generateStaticParams() {
  return [...FEATURED, ...SUPPORTING].map(({ slug }) => ({ slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = [...FEATURED, ...SUPPORTING].find((c) => c.slug === slug);
  if (!meta) notFound();
  const { Content } = await loadCaseStudy(slug);
  return (
    <CaseStudyLayout meta={meta}>
      <Content />
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 2:** Create `lib/case-loader.ts` — dynamic-import MDX per slug:

```ts
export async function loadCaseStudy(slug: string) {
  const mod = await import(`@/content/case-studies/${slug}.mdx`);
  return { Content: mod.default };
}
```

- [ ] **Step 3:** Install MDX support:

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
```

Configure `next.config.ts`:

```ts
import nextMDX from "@next/mdx";

const withMDX = nextMDX({ extension: /\.mdx?$/ });

export default withMDX({
  pageExtensions: ["ts", "tsx", "mdx"],
});
```

- [ ] **Step 4:** Commit: `feat(work): dynamic /work/[slug] route with MDX loader`

---

## Task 4.3 — CaseStudyLayout

**Files:** `components/case-study/CaseStudyLayout.tsx` + sub-sections + story

- [ ] **Step 1:** Layout accepts `meta: CaseStudyMeta` + `children` (the MDX content). Renders:
  - `CaseHero` — title, tagline, year, role, company, hero image
  - `TLDR` — 3-line elevator pitch (MDX provides)
  - `children` — free-form MDX (sections 3–9 from spec §7)
  - `NextCase` — links to the next case in FEATURED+SUPPORTING order

- [ ] **Step 2:** Create sub-section components as thin wrappers with consistent typography:

```tsx
// components/case-study/TLDR.tsx
export function TLDR({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-16 border-t border-[var(--border)]">
      <p className="font-serif italic text-2xl md:text-3xl max-w-3xl text-[var(--text-primary)]">
        {children}
      </p>
    </section>
  );
}
```

Create analogous `Context`, `Problem`, `Role`, `Approach`, `Solution`, `Outcome`, `Reflection`, `NextCase`, `CaseHero` components.

- [ ] **Step 3:** Export them as MDX components via `mdx-components.tsx`:

```tsx
// mdx-components.tsx (at portfolio root)
import { TLDR } from "@/components/case-study/TLDR";
import { Context } from "@/components/case-study/Context";
import { Problem } from "@/components/case-study/Problem";
import { Role } from "@/components/case-study/Role";
import { Approach } from "@/components/case-study/Approach";
import { Solution } from "@/components/case-study/Solution";
import { Outcome } from "@/components/case-study/Outcome";
import { Reflection } from "@/components/case-study/Reflection";

export function useMDXComponents(components: Record<string, React.ComponentType>) {
  return { TLDR, Context, Problem, Role, Approach, Solution, Outcome, Reflection, ...components };
}
```

- [ ] **Step 4:** Story shows CaseStudyLayout with mock meta + placeholder children.

- [ ] **Step 5:** Commit: `feat(case-study): CaseStudyLayout + typed MDX sections`

---

# PHASE 5 — Case study content (Day 6–9, ~3 days — the biggest block)

## Task 5.1 — 6labs.ai case study (Tier 1)

**Files:** `content/case-studies/6labs-ai.mdx`, `public/images/work/6labs-ai/*`

- [ ] **Step 1:** Read `projects/6labs-ai.md` for context.

- [ ] **Step 2:** Ask Ziaul: export screenshots/artifacts from Figma into `public/images/work/6labs-ai/`. Needed: `hero.jpg`, `architecture.jpg`, `workflow.jpg`, `workshop.jpg`, `metrics.jpg`.

- [ ] **Step 3:** Draft `6labs-ai.mdx` with DRAFT metrics (per spec §11b):

```mdx
<TLDR>
  **Problem:** Game devs rely on gameplay video recordings to understand what players actually do — but watching hundreds of hours of footage doesn't scale.
  **What I did:** Led design on 6labs.ai, an AI platform that turns BlueStacks' millions of real player sessions into structured developer analytics, with an AI-native build workflow as its design practice.
  **Outcome:** {/* DRAFT — verify with Ziaul */} 25 game studios in pilot. Time-to-insight cut from hours of tape review to minutes of querying.
</TLDR>

<Context>
...
</Context>

<Problem>
...
</Problem>

<Role>
...
</Role>

<Approach>
...
</Approach>

<Solution>
...
</Solution>

<Outcome>
...
</Outcome>

<Reflection>
...
</Reflection>
```

- [ ] **Step 4:** Workflow for every MDX authoring task:
  1. Paste the content of `projects/<slug>.md` into Ziaul's Replit generator: https://portfolio-page-generator--ziaulislam14.replit.app/
  2. Paste the output back and integrate into MDX with DRAFT metrics applied.
  3. Hand-polish intro + reflection for voice (first-person, declarative, evidence-driven — per spec §9).

- [ ] **Step 5:** Verify page at `http://localhost:3000/work/6labs-ai` — no runtime errors.

- [ ] **Step 6:** Commit: `feat(case-study): 6labs.ai case study draft`

---

## Task 5.2 — Float DS case study (Tier 1)

**Files:** `content/case-studies/float-ds.mdx`, `public/images/work/float-ds/*`

Source context: `projects/float-design-system.md`. Required artifacts: `hero.jpg`, `architecture-diagram.jpg`, `token-grid.jpg`, `multi-brand.jpg`, `contributor-graph.jpg`.

DRAFT metrics for MDX: **6 products consuming Float**, **~120 components across base + child DSs**, **35+ designers/engineers contributing**, **~40% time-to-ship reduction on new screens post-adoption**, **4 brand themes from one token layer**, internal pseudo-title **"DSO" (Design System Officer)**.

- [ ] **Step 1:** Read `projects/float-design-system.md`.
- [ ] **Step 2:** Export Figma artifacts to `public/images/work/float-ds/`.
- [ ] **Step 3:** Run `projects/float-design-system.md` through the Replit portfolio generator; integrate output into MDX using `<TLDR>`, `<Context>`, `<Problem>`, `<Role>`, `<Approach>`, `<Solution>`, `<Outcome>`, `<Reflection>` components.
- [ ] **Step 4:** Add DRAFT metrics listed above with `{/* DRAFT — verify with Ziaul */}` markers.
- [ ] **Step 5:** Verify page at `http://localhost:3000/work/float-ds`.
- [ ] **Step 6:** Commit: `feat(case-study): Float DS case study draft`

---

## Task 5.3 — nowStudio case study (Tier 1)

**Files:** `content/case-studies/nowstudio.mdx`, `public/images/work/nowstudio/*`

Source: `projects/nowstudio.md`. Required artifacts: `hero.jpg`, `dashboard.jpg`, `channels-map.jpg` (PC/Mac/Cloud/LINE/Telegram), `test-link.jpg`, `telegram-launch.jpg`.

DRAFT metrics: **~80 dev studios on platform**, **5 distribution channels shipped (PC, Mac, Cloud/Browser, LINE, Telegram)**, **Telegram store launch: ~500K sessions in first month**, **~95% of active devs using real-time tracking**.

- [ ] **Step 1:** Read `projects/nowstudio.md`.
- [ ] **Step 2:** Export artifacts to `public/images/work/nowstudio/`.
- [ ] **Step 3:** Run source md through Replit generator; integrate into MDX with typed components.
- [ ] **Step 4:** Add DRAFT metrics with markers.
- [ ] **Step 5:** Verify page.
- [ ] **Step 6:** Commit: `feat(case-study): nowStudio case study draft`

---

## Task 5.4 — AI Highlights + ML Discovery case study (Tier 1)

**Files:** `content/case-studies/ai-highlights.mdx`, `public/images/work/ai-highlights/*`

Source: `projects/ai-highlights-discovery.md`. Required artifacts: `hero.jpg`, `ad-placement.jpg`, `discovery-rail.jpg`, `highlight-reel.mp4` (generated via AI per Appendix C), `ab-test-chart.jpg`.

DRAFT metrics: **+22% revenue lift on ML-placed ad experiments (A/B measured)**, **+18% CTR on ML-personalized discovery rails**, **2M+ highlights generated**, **~450K shares**, **ML experiments shipped across Windows App Player, Mac App Player, and Cloud Player**.

- [ ] **Step 1:** Read source md.
- [ ] **Step 2:** Export / generate artifacts.
- [ ] **Step 3:** Run through Replit generator; integrate MDX.
- [ ] **Step 4:** Add DRAFT metrics with markers.
- [ ] **Step 5:** Verify page.
- [ ] **Step 6:** Commit: `feat(case-study): AI Highlights + ML Discovery case study draft`

---

## Task 5.5 — Amway India case study (Tier 2 — linked)

**Files:** `content/case-studies/amway-india.mdx`, `public/images/work/amway-india/*`

Source: `projects/amway-india.md`. Shorter case than Tier 1 — this case exists to anchor B2C expertise and point to the existing Behance write-up.

Required artifacts: `hero.jpg`, `app-screens.jpg`, `ds-page.jpg`.

MDX sections: `<TLDR>`, `<Context>`, `<Role>`, `<Outcome>` only. No `<Problem>`/`<Approach>`/`<Solution>`/`<Reflection>` — instead, `<Outcome>` ends with a strong link-out:

```mdx
<Outcome>
  Full case study with user research, flow redesigns, and the resulting DS →
  [Read on Behance](https://www.behance.net/gallery/121037207/E-commerce-platform-UX-case-study)
</Outcome>
```

- [ ] **Step 1:** Read source md.
- [ ] **Step 2:** Export artifacts.
- [ ] **Step 3:** Write MDX (shortened template).
- [ ] **Step 4:** Verify page.
- [ ] **Step 5:** Commit: `feat(case-study): Amway India linked case study`

---

## Task 5.6 — BlueStacks Mobile + Payments case study (Tier 2)

**Files:** `content/case-studies/bluestacks-mobile.mdx`, `public/images/work/bluestacks-mobile/*`

Source: `projects/bluestacks-mobile-app.md`. Required artifacts: `hero.jpg`, `mobile-app.jpg`, `payment-flow-windows.jpg`, `payment-flow-browser.jpg`, `payment-flow-mobile.jpg`.

DRAFT metrics: **~12% drop-off reduction across unified payments**, **~6% better dev revenue share vs. Play Store baseline**, **single payment mental model across 3 surfaces**.

- [ ] **Step 1:** Read source md.
- [ ] **Step 2:** Export artifacts.
- [ ] **Step 3:** Replit generator → MDX.
- [ ] **Step 4:** Add DRAFT metrics.
- [ ] **Step 5:** Verify.
- [ ] **Step 6:** Commit: `feat(case-study): BlueStacks mobile + cross-platform payments case study draft`

---

## Task 5.7 — Scroll-wheel prototype case study (Tier 2)

**Files:** `content/case-studies/scroll-wheel.mdx`, `public/images/work/scroll-wheel/*`

Source: `projects/scroll-wheel-prototype.md`. Required artifacts: `hero.jpg`, `figma-prototype.mp4` (screen-recording Ziaul captures from Figma, then polished via the Appendix C workflow), `final-feature.jpg`.

DRAFT outcome: **pattern adopted for 10+ complex emulator features afterwards**, **engineering shipped from the prototype without a separate spec doc**.

- [ ] **Step 1:** Read source md.
- [ ] **Step 2:** Record Figma prototype; polish via Appendix C.
- [ ] **Step 3:** Replit generator → MDX.
- [ ] **Step 4:** Add DRAFT outcome.
- [ ] **Step 5:** Verify.
- [ ] **Step 6:** Commit: `feat(case-study): scroll-wheel prototype-as-spec case study`

---

## Task 5.8 — User Profile + Rewards case study (Tier 2)

**Files:** `content/case-studies/user-profile.mdx`, `public/images/work/user-profile/*`

Source: `projects/user-profile-rewards.md`. Required artifacts: `hero.jpg`, `profile.jpg`, `rewards-grid.jpg`, `membership-upsell.jpg`.

DRAFT metrics: **+28% membership conversion (free → Prime) after profile redesign**, **+40% rewards redemption rate**, **3x event-program participation**.

- [ ] **Step 1:** Read source md.
- [ ] **Step 2:** Export artifacts.
- [ ] **Step 3:** Replit generator → MDX.
- [ ] **Step 4:** Add DRAFT metrics.
- [ ] **Step 5:** Verify.
- [ ] **Step 6:** Commit: `feat(case-study): profile + rewards + memberships case study draft`

---

## Task 5.9 — About page

**Files:** `app/about/page.tsx`, `components/about/AboutLong.tsx`

- [ ] **Step 1:** Compose full About page: large portrait (`/images/profile/ziaul.jpg`), bio (4–6 paragraphs in first-person), expanded `PickACard`, full `Timeline`, skills chips, certifications.

- [ ] **Step 2:** Commit: `feat(about): long-form about page`

---

## Task 5.10 — Playground page (minimal v1)

**Files:** `app/playground/page.tsx`

- [ ] **Step 1:** One section: "Things I'm building." List 3 items: (1) Custom Claude Code skills used for AI-native workflow, (2) 6labs.ai internal demos, (3) AI workshops slide deck. Can be text-only at launch.

- [ ] **Step 2:** Commit: `feat(playground): minimal v1 page with 3 items`

---

# PHASE 6 — Signature interactions (Day 10, ~1 day)

## Task 6.1 — FooterPhysics sandbox (matter-js)

**Files:** `components/contact/FooterPhysics.tsx`

- [ ] **Step 1:** `/frontend-design:frontend-design` prompt: *"Footer physics sandbox using matter.js. A container (~500px tall) holds 8–10 draggable stickers (game controller, Figma F, heart, 'AI' chip, 'DS' chip, 'UX' chip, 'Ziaul' chip, star). Stickers obey gravity, bounce on walls/floor/each other, can be grabbed with mouse/touch and thrown with velocity. Respects `prefers-reduced-motion` — shows the same stickers statically scattered without physics."*

- [ ] **Step 2:** Implement using `matter-js`:

```tsx
"use client";
import { useEffect, useRef } from "react";
import Matter from "matter-js";

const STICKERS = [
  { label: "🎮", color: "#7C5CFF" },
  { label: "Figma", color: "#FF7A3D" },
  { label: "AI", color: "#5FD6FF" },
  { label: "DS", color: "#FFB84D" },
  { label: "UX", color: "#FF5FA3" },
  { label: "❤", color: "#FF4D6D" },
  { label: "Ziaul", color: "#9EA0A8" },
  { label: "★", color: "#FFD24D" },
];

export function FooterPhysics() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stageRef.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { Engine, Render, World, Bodies, Body, Composite, Mouse, MouseConstraint, Runner } = Matter;
    const width = stageRef.current.clientWidth;
    const height = stageRef.current.clientHeight;

    const engine = Engine.create({ gravity: { x: 0, y: 1 } });
    const render = Render.create({
      element: stageRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    const walls = [
      Bodies.rectangle(width / 2, height + 20, width, 40, { isStatic: true }),
      Bodies.rectangle(-20, height / 2, 40, height, { isStatic: true }),
      Bodies.rectangle(width + 20, height / 2, 40, height, { isStatic: true }),
    ];

    const stickers = STICKERS.map((s, i) => {
      const body = Bodies.rectangle(
        100 + (i * 80) % (width - 200),
        50 + i * 20,
        70,
        40,
        {
          chamfer: { radius: 12 },
          restitution: 0.6,
          friction: 0.4,
          render: {
            fillStyle: s.color,
          },
        }
      );
      (body as unknown as { label: string }).label = s.label;
      return body;
    });

    Composite.add(engine.world, [...walls, ...stickers]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(engine.world, mouseConstraint);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative w-full h-[500px] border-t border-[var(--border)] overflow-hidden"
      data-cursor="throw"
      data-cursor-label="drag and throw"
      aria-label="Interactive footer — drag and throw stickers"
    />
  );
}
```

- [ ] **Step 3:** Note: `matter-js` draws to a canvas — text labels aren't native. Either (a) draw them onto the canvas with a custom `render.options.drawSprite` using pre-baked PNGs (simplest), or (b) overlay a DOM layer positioned by polling body positions each frame. Pick (b) only if the sticker labels must be text. For v1: pre-bake each sticker as a 70x40 PNG with text baked in; store under `public/images/stickers/`.

- [ ] **Step 4:** Wire into Footer replacing the Phase 3.9 stub.

- [ ] **Step 5:** Verify at desktop + mobile (touch drag works). Commit: `feat(contact): matter.js drag-throw sticker sandbox`

---

## Task 6.2 — Hero shader polish

**Files:** `components/hero/ShaderField.tsx`

- [ ] **Step 1:** Tune the shader for subtlety: low intensity, slow drift, violet accent tracing cursor. Confirm frame-rate stable (<16ms GPU frame).

- [ ] **Step 2:** Add FPS cap (30fps is fine for ambient).

- [ ] **Step 3:** Commit.

---

## Task 6.3 — Cursor context refinement

**Files:** `components/cursor/Cursor.tsx`

- [ ] **Step 1:** Audit every interactive area — ensure `data-cursor="link|card|throw"` is set where expected.

- [ ] **Step 2:** Commit: `fix(cursor): audit cursor-context coverage across sections`

---

# PHASE 7 — Polish + launch (Day 11–13)

## Task 7.1 — Accessibility pass

- [ ] Run `axe` DevTools + keyboard-only walkthrough.
- [ ] Ensure every interactive element is focus-ringed and keyboard-reachable.
- [ ] Validate every image has `alt` text.
- [ ] Validate color contrast ≥ 4.5:1 for body text in both themes.
- [ ] Validate `prefers-reduced-motion` disables shader, type-reveal, marquee, pinned scroll, physics.
- [ ] Commit: `a11y: keyboard, focus, alt, reduced-motion pass`

---

## Task 7.2 — SEO

**Files:** `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`, per-case OG images

- [ ] **Step 1:** `app/robots.ts`:

```ts
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://ziaul-islam.vercel.app/sitemap.xml",
  };
}
```

- [ ] **Step 2:** `app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";
import { FEATURED, SUPPORTING } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ziaul-islam.vercel.app";
  return [
    { url: base },
    { url: `${base}/work` },
    { url: `${base}/about` },
    { url: `${base}/playground` },
    ...[...FEATURED, ...SUPPORTING].map(({ slug }) => ({ url: `${base}/work/${slug}` })),
  ];
}
```

- [ ] **Step 3:** Default OG — `app/opengraph-image.tsx` using `next/og` ImageResponse. Per-case `app/work/[slug]/opengraph-image.tsx` that reads slug meta.

- [ ] **Step 4:** Per-page `generateMetadata()` where appropriate (case study pages inherit meta).

- [ ] **Step 5:** Commit: `seo: sitemap, robots, OG per page`

---

## Task 7.3 — Analytics

- [ ] Install Vercel Analytics: `npm install @vercel/analytics`.
- [ ] Add `<Analytics />` to root layout.
- [ ] Commit: `analytics: vercel analytics`

---

## Task 7.4 — Lighthouse + performance

- [ ] Run Lighthouse on `/`, `/work`, `/work/6labs-ai`, `/about`.
- [ ] Ensure `next/image` everywhere (replace any `<img>`).
- [ ] Set `priority` on above-the-fold hero image.
- [ ] Lazy-load `FeaturedCarousel`, `CraftStrip`, `FooterPhysics` (via `next/dynamic`).
- [ ] Target: Performance ≥ 85 mobile, Accessibility ≥ 95.
- [ ] Commit: `perf: image + code-split pass`

---

## Task 7.5 — Production deploy

- [ ] Connect repo to Vercel (Ziaul does this via Vercel UI).
- [ ] Confirm env-free (this portfolio has none).
- [ ] Merge to main → Vercel auto-deploys to `ziaul-islam.vercel.app`.
- [ ] Smoke-test on: Pixel 7 (Chrome), iPhone 14 (Safari), MacBook (Safari/Chrome), Windows (Chrome/Edge).
- [ ] Commit any fixes from device testing.

---

# PHASE 8 — Buffer + launch (Day 14)

- [ ] Final content review — every case study reads end-to-end in first-person, with a real outcome.
- [ ] Final copy sweep — no "passionate about crafting." Replace with evidence.
- [ ] Screenshot polish — any blurry exports replaced.
- [ ] Announcement post on LinkedIn with link.
- [ ] Update LinkedIn featured + resume link.

---

# Deferred to v1.1 (not in 14-day scope)

1. **Terminal / Konami-code easter egg** (interaction #10).
2. **WebXR "view in AR"** (interaction #14).
3. Blog / writing surface.
4. Custom domain (`ziaul.design` or similar).

---

# Appendix A — Workflow invariants

Per spec §10, every UI build follows:

1. **Call `/ui-ux-pro-max`** with the component brief — get the UX plan (states, variants, a11y).
2. **Call `/frontend-design:frontend-design`** — get distinctive production code.
3. **Build the component** with at-creation Storybook story.
4. **Iterate in Storybook + dev server** — never style in isolation; always in-page too.
5. **Commit per component** with semantic prefix: `feat(<area>): ...` / `fix(<area>): ...`.

---

# Appendix B — Content authoring workflow

For every case study MDX in Phase 5:

1. Open `projects/<slug>.md`.
2. Copy content to https://portfolio-page-generator--ziaulislam14.replit.app/.
3. Paste generator output into draft.
4. Integrate with `<TLDR>`, `<Context>`, `<Problem>`, `<Role>`, `<Approach>`, `<Solution>`, `<Outcome>`, `<Reflection>` MDX components.
5. Add plausible DRAFT metrics from spec §11b (annotate with `{/* DRAFT */}`).
6. Export 5–8 artifacts from Figma → `public/images/work/<slug>/`.
7. For video assets (scroll-wheel, AI Highlights): screen-record the Figma prototype OR use Runway / Veo to polish existing raw recording into a production clip.
8. Commit.

---

# Appendix C — Image/video generation (Week 2)

For case-study artifacts Ziaul can't export cleanly:

- **Stills:** Figma export → Upscayl (free) or Topaz for upscaling if source is low-res.
- **Motion:** Runway ML or Veo for hero motion pieces. Start with short 3–6s loops.
- **Product walkthroughs:** Use QuickTime/OBS to screen-record Figma prototypes; post-process in ScreenStudio for cursor + zoom polish.
- **Never ship:** Low-res screenshots with visible browser chrome. Always crop to content, add subtle drop-shadow + rounded corners in the image component.

---

# Appendix D — Launch checklist (end of Day 14)

- [ ] Homepage loads in < 3s on mobile 4G.
- [ ] All 8 case studies have a real metric (draft or real).
- [ ] All images have alt text.
- [ ] Theme toggle works; `prefers-color-scheme` respected.
- [ ] `prefers-reduced-motion` disables all heavy motion.
- [ ] Mobile nav drawer works.
- [ ] Resume downloads from `/resume.pdf`.
- [ ] All external links (Behance, LinkedIn) open in new tab.
- [ ] OG image renders when pasted in LinkedIn / WhatsApp preview.
- [ ] Lighthouse Performance ≥ 85 mobile, Accessibility ≥ 95.
- [ ] Footer physics works on desktop + touch.
- [ ] Pinned horizontal scroll works on desktop + stacks on mobile.
- [ ] Site is live at `ziaul-islam.vercel.app`.

---

End of plan.
