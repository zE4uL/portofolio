# Portfolio Visual-First Redesign — Design Spec

**Date:** 2026-04-11
**Owner:** Ziaul Islam
**Status:** Ready for implementation planning

---

## Problem

The portfolio has three compounding readability and presence issues:

1. **Fonts are too small.** Body copy runs 14–17px on mobile; labels/HUD/tags drop to 9–12px; nav links 13px; footer 11px.
2. **Too much text.** About section is 290 words of wall-of-text paragraphs with zero visuals. AITeaser has 120 words of dense copy. Several 40+ word paragraphs.
3. **Visual imbalance.** About and Contact are pure text. Work already does visuals well. Hero carries the 3D but everything after it loses momentum.

The user's exact brief: *"more visuals, less text, fonts are very small and cant read them."*

---

## Goals

- **Readability floor of 16px** for body, 13px for labels — no exceptions.
- **Cut total landing-page body word count by ≥60%** across About, AITeaser, Work, Contact.
- **Every section gets a dominant visual element** — shader background, HUD-framed product shot, or stat-tile grid.
- **Lock in the AI-first identity** across Hero, About, and AITeaser.
- **Preserve** the existing GSAP timeline, R3F stack, and gamer-first personality — this is a reinforcement, not a rebrand.

---

## Non-goals

- Routing / URL structure changes (nowstudio page untouched).
- Backend / CMS additions.
- New pages beyond stubs for `/ai-native` (referenced but not built in this pass).
- Real product photography — placeholder frames ship now; real images dropped in later (asset strategy α).

---

## Decisions locked during brainstorming

| Question | Choice |
|---|---|
| Scope | **C — bold visual-first rebuild** |
| Visual vocabulary | **4 — mixed: shader + HUD + product shots** |
| Asset strategy | **α — labeled placeholders; user drops in real screenshots later** |
| About format | **B — stat tiles + portrait** with AI-native positioning |
| Hero treatment | **3 + 4 — headline rewrite AND rotating subtitle** |
| Contact treatment | **1 — full-bleed shader + huge email** |

---

## Architecture

### New shared primitives

Two new components live at the top of `components/`:

#### `ShaderBackground.tsx`
- React Three Fiber Canvas with a single full-screen plane.
- Fragment shader with four preset variants:
  - `flow` — smooth noise → color ramp, slow. Hero backdrop.
  - `noise` — fBm + animated UV offset. AITeaser backdrop.
  - `grid-warp` — grid lines displaced by noise field. About backdrop.
  - `particles` — instanced point field with parallax. Contact backdrop.
- Props: `variant`, `opacity` (default 0.35), `speed` (default 1).
- Mounts `absolute inset-0 z-0 pointer-events-none` inside its parent section.
- Respects `prefers-reduced-motion` — freezes uTime when set.

#### `HUDFrame.tsx`
- Wrapper component adding gamer-HUD chrome to any child.
- Visual anatomy:
  - Corner brackets (top-left, top-right, bottom-left, bottom-right) as absolute-positioned SVGs or CSS borders.
  - Top-left label slot — `label` prop, mono, Label size.
  - Top-right code slot — `code` prop, mono, Label size (e.g. `CASE · 01`).
  - Bottom-right status dot — animated pulse, green by default.
- Props: `label`, `code`, `status` (`'active' | 'idle' | 'locked'`), `children`.
- No border by default — the brackets *are* the frame.

### Typography scale

Defined as CSS variables in `app/globals.css`. Every new size is `clamp(min, vw, max)`.

```css
:root {
  --font-display-xl:  clamp(72px, 12vw, 180px);  /* Hero headline */
  --font-display-l:   clamp(48px,  8vw, 112px);  /* Contact email, About stat numbers */
  --font-display-m:   clamp(32px,  5vw,  56px);  /* Section headings */
  --font-heading:     clamp(22px, 2.5vw, 32px);  /* Stat tile labels, card titles */
  --font-body-l:      clamp(18px, 1.6vw, 22px);  /* Primary prose */
  --font-body:        clamp(16px, 1.3vw, 18px);  /* Everything else */
  --font-label:       clamp(13px,   1vw, 15px);  /* HUD chips, nav links, tags */
  --font-mono-sm:     14px;                      /* Timestamps, coordinates */
}
```

**Hard rule:** nothing smaller than `--font-label` (13px floor), no exceptions. Audit all existing `0.5625rem`, `0.625rem`, `0.6875rem`, `0.75rem`, `0.8125rem` values and map each to the nearest scale token.

---

## Section designs

### Nav — `components/Nav.tsx`

| Element | Before | After |
|---|---|---|
| Logo | 18px | **22px** |
| Desktop links | 13px | **15px** (`--font-label` top of range) |
| HUD cluster (FPS/time/status) | 10px | **13px** (`--font-label`) |
| CTA button | 13px, tight padding | **16px** (`--font-body`), padding bumped to `py-3 px-6` |
| Mobile menu | 24px | unchanged |

### Hero — `components/sections/Hero.tsx`

**Headline (replaces `GAMER FIRST. / DESIGNER SECOND.`):**
```
AI-FIRST DESIGNER.
GAMER AT HEART.
```
- Display XL, Space Grotesk, existing GSAP timeline reused.
- Line 1 inherits the glitch effect (was on "GAMER").
- Line 2 inherits the char-stagger (was on "DESIGNER SECOND.").

**New rotating subtitle** (below name line, above scroll CTA):
- `--font-body-l`, JetBrains Mono, prefixed with `> `.
- 4-entry array, rotates every 3s with 400ms crossfade (new GSAP sub-timeline):
  ```
  > shipping solo, from strategy to shader.
  > systems thinker. game-brained.
  > prompting → prototyping → production.
  > 6 years making pixels earn their keep.
  ```
- Array exported as a named constant so copy edits don't require hunting through JSX.

**Background layering (bottom → top, z-axis):**
1. `<ShaderBackground variant="flow" opacity={0.45} />` — new
2. `<GameObjects3D />` — existing, opacity bumped 0.14 → 0.22, slow drift added
3. Content layer (text)

**Scroll CTA:** 11px → **14px** mono.

### Work — `components/sections/Work.tsx`

Structural shift: text-next-to-frame → **frame-dominant cards with text as HUD overlays**.

**Per-card layout:**
- Full-bleed 21:9 (was 16:10), each card ~120vh on desktop.
- Wrapped in `<HUDFrame label="CASE · 0N" code="PROJECT_CODE" />`.
- Inside the frame: product shot placeholder (labeled filename per asset strategy α) at 100%.
- Title (`--font-display-m`) pinned bottom-left over a dark gradient scrim.
- Description trimmed to **≤12 words**, pinned bottom-right (`--font-body-l`).
- Tags: 9–11px → **13–15px** (`--font-label`), max 3 per card.
- Hover: shader ripple over the image, `VIEW CASE →` reveal in `--font-body-l`.

**Copy diet:** Work descriptions 95 words → ≤60 total.

**Placeholder filenames:** one placeholder per existing Work.tsx case-study card, named `<project>-<view>.png` (e.g. `6labs-dashboard.png`, `nowstudio-hero.png`, `apparatus-system.png`). Each `<HUDFrame>` shows the filename as its `code` prop until the real image is dropped into `/public/work/`.

### AITeaser — `components/sections/AITeaser.tsx`

Layout shift: two-column dense text → **centered single-focus with a 3-card strip below**.

**Structure (top → bottom):**
1. `<ShaderBackground variant="noise" />` across full section background.
2. Eyebrow — `// AI-NATIVE` in mono, `--font-label`.
3. Headline (`--font-display-m`): `AI IS A TEAMMATE, NOT A TOOL.`
4. Subhead (`--font-body-l`): **≤35 words**, replaces the current 120-word left column.
5. 3-card horizontal strip, each wrapped in `<HUDFrame>`:
   | Label | One-line description |
   |---|---|
   | `CLAUDE + FIGMA` | Bidirectional flow — prompt to prototype, no translation tax. |
   | `SHIP SOLO` | One designer, full stack — strategy to shader to production. |
   | `LIVE SYSTEM` | Design system that writes its own React counterparts. |
6. `Read the full story →` link, `--font-body-l`, routes to `/ai-native` (stub page, not built in this pass).

**Card labels:** 10–12px → **14–15px** (`--font-label`).

**Copy diet:** 120 words → ~50.

### About — `components/sections/About.tsx` — biggest content cut

**Current:** 290 words, zero visuals. **Target:** ~80 words, visual-dominant, AI-first identity anchor.

**Structure (top → bottom):**

1. **Background:** `<ShaderBackground variant="grid-warp" opacity={0.25} />` — low-intensity ambient.

2. **Eyebrow:** `// ABOUT` in mono, `--font-label`.

3. **Headline** (`--font-display-m`):
   ```
   AI-FIRST DESIGNER.
   6 YEARS SHIPPING PRODUCT.
   ```

4. **Tagline** (`--font-body-l`, ≤30 words):
   > Senior product designer with a gamer's brain. I prompt, prototype, and ship full systems solo — Figma to Three.js to Claude-assisted production code.

5. **Portrait slot:** `<HUDFrame label="OPERATOR" code="ZI-001">` wrapping a square placeholder (`portrait.jpg` per asset strategy α). Monochrome CSS filter + slight scanline overlay.

6. **Stat tile grid** — 3×2 desktop / 2×3 tablet / 1×6 mobile. Each tile is a `<HUDFrame>` containing:
   - Number (`--font-display-l`)
   - Label (`--font-heading`)
   - Context line (`--font-label`)

   Content:
   | Number | Label | Context |
   |---|---|---|
   | **6** | YEARS SHIPPING | Senior PD since 2020 |
   | **2** | PRODUCTS SOLO | 6labs · nowstudio |
   | **1** | DESIGN SYSTEM | Apparatus, scaled cross-product |
   | **∞** | AI-NATIVE WORKFLOW | Claude + Figma + shaders |
   | **24** | SHADERS SHIPPED | GLSL in production |
   | **100%** | PROMPT → SHIP | No handoff friction |

7. **Closing line** (`--font-body`, ≤20 words):
   > I don't design for AI. I design with it, as a teammate that compounds every hour I put in.

**Copy total:** ~80 words (was 290). **~72% reduction.**

### Contact — `components/sections/Contact.tsx`

Full-bleed shader + huge email, single viewport.

**Structure:**
- Section: `100vh`, `position: relative`, `overflow: hidden`.
- `<ShaderBackground variant="particles" opacity={0.55} />` fills the entire viewport (z-0).
- Centered content stack (z-10, `flex flex-col items-center justify-center h-full`):
  1. Eyebrow: `// CONTACT` in mono, `--font-label`.
  2. Statement line (`--font-display-m`): `LET'S BUILD THE NEXT THING.`
  3. Email (`--font-display-l`, Space Grotesk): **`ziaul.islam14@gmail.com`**. Hover: underline slides in from left over 300ms.
  4. Availability chip (`--font-body`, one line): `OPEN · SENIOR PRODUCT DESIGN · REMOTE + SELECT ON-SITE`.
- Bottom HUD strip (fixed to section bottom, full-width, `flex justify-between`):
  - **Left:** socials (LinkedIn / GitHub / Twitter / Dribbble) as **16px mono** links with `↗` suffix. Was 13px.
  - **Center:** live clock + location, updated every second — format `BLR · IST HH:MM` (e.g. `BLR · IST 14:20`), **14px mono**. Was 11px.
  - **Right:** status dot (animated pulse) + `AVAILABLE Q2 2026` in `--font-label`.

**Copy total:** ~25 words. Zero information loss from current version; massive presence gain.

---

## Data flow

- **Type scale:** CSS variables in `globals.css`, consumed via Tailwind arbitrary values or inline `style` props. No new dependency.
- **Shader variants:** A single `shaders.ts` module exports GLSL strings keyed by variant name. `ShaderBackground` picks the right shader at render time.
- **Rotating subtitle array:** Exported constant from `Hero.tsx` (or a sibling `hero-copy.ts`) so copy edits are surgical.
- **HUD clock/location in Contact:** Reuses the same timer hook as Nav's HUD cluster (extract to `hooks/useHudClock.ts` if not already).

---

## Error handling & accessibility

- **Prefers-reduced-motion:** All shaders freeze (`uTime = 0`), GSAP rotations disabled, subtitle rotates by crossfade only (no scale/slide), glitch effect disabled.
- **WebGL unavailable:** `ShaderBackground` falls back to a CSS gradient matching the variant's color palette. Section still legible.
- **Keyboard focus:** All interactive elements (nav links, Work cards, email, socials) keyboard-reachable with visible focus rings at `--font-label` clarity.
- **Contrast:** Every text-over-shader layer gets a `backdrop-blur-sm` or dark-gradient scrim to guarantee WCAG AA against animated backgrounds.
- **Screen reader:** Shaders `aria-hidden`. HUDFrame decorative corners `aria-hidden`. Stat tile numbers get `aria-label` spelling out the full phrase ("6 years shipping product").

---

## Testing

- **Visual regression:** Playwright screenshot tests per section at desktop / tablet / mobile breakpoints, compared against baseline.
- **Readability audit:** Automated check that no rendered font-size computes below 13px (grep computed styles).
- **Reduced motion:** Playwright test with `prefers-reduced-motion: reduce` asserts shader time is frozen and rotating subtitle doesn't animate.
- **Dev-server smoke:** `npm run dev`, open each section, confirm no console errors and no R3F loss events.

---

## Open items (for implementation plan, not this spec)

- Exact palette for each shader variant — pull from current site's color system; define in `shaders.ts`.
- Motion timings for new GSAP sub-timelines (subtitle rotation, Work card hover ripple).
- Stub routing for `/ai-native` — decide whether to create the page file as a placeholder now or leave the link dead until that spec.
