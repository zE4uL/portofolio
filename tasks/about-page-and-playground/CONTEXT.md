# Task — Dedicated /about page, cassette playground, menu wiring

You are continuing work on a Next.js portfolio. This document is **self-contained**; do not assume any prior conversation context. **Use Sonnet 4.6 for this task.** Plan to do this in a single uninterrupted session, but commit between the three parts so the user can review checkpoints.

---

## Project

- **Working directory:** `D:\AG_master\portfolio`
- **Stack:** Next.js (App Router), TypeScript, plain CSS in `app/globals.css`, no Tailwind on this page
- **Theme tokens (already defined in globals.css):** `--ink #0a0a0a`, `--paper #f5f1e8`, `--accent #FF3B1F`. Fonts: Space Grotesk (display) + JetBrains Mono (mono).

---

## Goal (three parts, ship in order)

1. **Dedicated `/about` page** in the spirit of [edwinle.com/about](https://edwinle.com/about) — bio, currently, career timeline, **card grids** for "Now Playing" (games incl. *Battlefield 6*), "Tools I use", "Interests & Hobbies", "On Rotation", a values list, and a contact CTA.
2. **Playground re-skin** — replace the 5 free-floating draggable cards (homepage) with **cassette tapes** that drag into an **old-school console deck**. On drop, a **CRT-style popup** opens and auto-loops project screenshots.
3. **Menu wiring** — the "About, briefly" item in the fullscreen menu becomes a route change to `/about` (others stay anchor-scroll).

---

## Files

### Create new
- `app/about/page.tsx` — server component wrapping `<AboutPage />`
- `components/about/AboutPage.tsx` — `"use client"` component for the full About page
- `components/playground/cassettes.data.ts` — cassette data (7 work items)
- `components/playground/Cassette.tsx`
- `components/playground/Console.tsx`
- `components/playground/CRTPopup.tsx`
- `components/playground/PlaygroundStage.tsx` — orchestrator (replaces the inline playground JSX)

### Edit
- `components/brutalist/BrutalistHome.tsx` — menu link change, replace playground JSX with `<PlaygroundStage />`, shrink inline About to teaser
- `app/globals.css` — append three blocks: about-page styles, cassette/console styles, CRT popup styles

### Add assets (placeholder allowed if real ones not available)
- `public/cassettes/<slug>/*.jpg` — 4–8 screenshots per project
- `public/about/*.jpg` — optional thumbnails for game/tool/hobby cards
- Slugs: `6labs`, `nowstudio`, `bluestacks`, `float`, `amway`, `ikokas`, `alpha`

If real screenshots aren't available, write a `placeholder.svg` per slug and reference it. The user will swap real images in later.

---

## Current state — line references

You **must** Read these blocks before editing. Line numbers are approximate.

In `D:\AG_master\portfolio\components\brutalist\BrutalistHome.tsx`:
- Drag-card useEffect handler: **lines 359–387**
- Menu click handler (curtain transition + scroll): **lines 605–629**
- Fullscreen menu JSX: **lines 722–776**
- Inline About section: **lines 954–982**
- Playground section: **lines 986–1010**

In `D:\AG_master\portfolio\app\globals.css`: append rules at end of file (or near the equivalent existing section).

The /nowstudio route exists at `app/nowstudio/page.tsx` — mirror its pattern when creating `app/about/page.tsx`.

---

## Part 1 — `/about` page

### 1a. `app/about/page.tsx`

Mirror `app/nowstudio/page.tsx`:

```tsx
import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About — Ziaul Islam",
  description: "Senior Product Designer, Delhi NCR. Currently at BlueStacks / 6labs.ai.",
};

export default function Page() {
  return <AboutPage />;
}
```

### 1b. `components/about/AboutPage.tsx`

`"use client"` component. Top-level structure — 9 sections, each wrapped in a `<section>` with a `.section-head` matching the homepage pattern (`§NN — TITLE`). Use the existing `.section-head`, `.section-tag`, `.about-lead`, `.work-item`, `.art` classes from `globals.css` wherever they fit.

Sections (top → bottom):

1. **§01 — Hello, I'm Ziaul** — large hero name, role, location, 1-paragraph intro. Optional photo placeholder (16:9 art tile).
2. **§02 — Currently** — promote the homepage's `<dl>` "Currently" block. Add a small "Status: Open to Senior / Lead roles" callout.
3. **§03 — Career, briefly** — vertical timeline of past roles. Each row reuses the `.work-item` markup from BrutalistHome (line ~860 onwards in the work list — Read it for the exact JSX). Year on left, role + company in the middle, 1-line note on right.
4. **§04 — Now playing** — `<AboutCardGrid>` with game cards. **First card: Battlefield 6** (platform: PC, hours: ~12h this week). Add 2–3 more starter cards (e.g., *Cyberpunk 2077*, *Helldivers 2*, *Balatro*). Each card: tile image, title, platform tag, optional hours metric.
5. **§05 — Tools I use** — `<AboutCardGrid>` with: Figma (Design), Cursor (Code), Claude Code (Code), Linear (Plan), Raycast (Launcher), Arc (Browser), Notion (Notes), Spotify (Music), Things (Tasks). Tag each with category.
6. **§06 — Interests & hobbies** — `<AboutCardGrid>` with: Photography, Reading, Gym, Travel, Music collecting, Cooking — keep it 6 items, 2-line description per card.
7. **§07 — On rotation** — two columns: "Reading" + "Listening". Show 2–3 books and 2–3 albums with cover art tiles, title + author/artist.
8. **§08 — Stuff I believe** — short numbered list of 5–7 design/work principles, mono font, ink color.
9. **§09 — Get in touch** — single line: email + 2–3 social links (Twitter, LinkedIn, GitHub). Reuse the homepage Contact link styling.

### 1c. `<AboutCard>` component (defined inline in AboutPage.tsx)

Props:
```ts
type AboutCardProps = {
  title: string;
  tag?: string;       // small uppercase category, e.g. "DESIGN" / "PC" / "BOOK"
  subtitle?: string;  // small line under title
  body?: string;      // 1–2 line description
  image?: string;     // optional 16:9 image src
  meta?: string;      // small footer (e.g. "12h this week")
};
```

Markup pattern:
```tsx
<article className="about-card">
  {image && <div className="about-card-img" style={{ backgroundImage: `url(${image})` }} />}
  <div className="about-card-body">
    {tag && <span className="about-card-tag">{tag}</span>}
    <h3 className="about-card-title">{title}</h3>
    {subtitle && <p className="about-card-sub">{subtitle}</p>}
    {body && <p className="about-card-text">{body}</p>}
    {meta && <span className="about-card-meta">{meta}</span>}
  </div>
</article>
```

`<AboutCardGrid>` is just a div with `className="about-card-grid"` — 3 cols at ≥1024px, 2 cols at ≥640px, 1 col below.

### 1d. CSS for /about (append to globals.css)

```css
/* ============ /about page ============ */
.about-page { background: var(--paper); color: var(--ink); padding: 0 32px 120px; }
.about-page .section-head { padding-top: 80px; }
.about-hero { padding: 140px 0 80px; }
.about-hero h1 {
  font-family: var(--font-grotesk);
  font-size: clamp(64px, 9vw, 144px);
  font-weight: 500; letter-spacing: -.04em; line-height: .9;
}
.about-hero .lead { max-width: 720px; margin-top: 32px; font-size: 20px; line-height: 1.45; }

.about-card-grid {
  display: grid; gap: 16px;
  grid-template-columns: 1fr;
  margin-top: 32px;
}
@media (min-width: 640px) { .about-card-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .about-card-grid { grid-template-columns: repeat(3, 1fr); } }

.about-card {
  border: 1px solid var(--ink);
  background: var(--paper);
  display: flex; flex-direction: column;
  transition: transform .25s ease, box-shadow .25s ease;
}
.about-card:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--ink); }
.about-card-img {
  aspect-ratio: 16 / 9;
  background-size: cover; background-position: center;
  border-bottom: 1px solid var(--ink);
}
.about-card-body { padding: 16px 18px 18px; display: flex; flex-direction: column; gap: 6px; }
.about-card-tag {
  font-family: var(--font-jetbrains); font-size: 10px;
  letter-spacing: .22em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 4px;
}
.about-card-title { font-family: var(--font-grotesk); font-size: 22px; font-weight: 500; line-height: 1.1; }
.about-card-sub  { font-family: var(--font-jetbrains); font-size: 11px; opacity: .65; letter-spacing: .14em; text-transform: uppercase; }
.about-card-text { font-size: 14px; line-height: 1.4; opacity: .8; }
.about-card-meta { margin-top: 8px; font-family: var(--font-jetbrains); font-size: 10px; letter-spacing: .18em; text-transform: uppercase; opacity: .55; }

.about-timeline { display: grid; gap: 0; margin-top: 32px; border-top: 1px solid var(--ink); }
.about-timeline-row {
  display: grid; grid-template-columns: 100px 1fr 1fr; gap: 24px;
  padding: 18px 0; border-bottom: 1px solid rgba(10,10,10,.15);
  font-family: var(--font-jetbrains); font-size: 12px;
}
.about-timeline-row .yr { color: var(--accent); }
.about-timeline-row .role { font-family: var(--font-grotesk); font-size: 18px; font-weight: 500; letter-spacing: -.01em; }
.about-timeline-row .note { opacity: .65; }

.about-believes { list-style: none; padding: 0; margin-top: 24px; counter-reset: blv; }
.about-believes li { counter-increment: blv; padding: 14px 0; border-bottom: 1px solid rgba(10,10,10,.15); font-family: var(--font-jetbrains); font-size: 14px; }
.about-believes li::before { content: counter(blv, decimal-leading-zero) " — "; color: var(--accent); }

.about-rotation { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 32px; }
@media (max-width: 640px) { .about-rotation { grid-template-columns: 1fr; } .about-timeline-row { grid-template-columns: 80px 1fr; } .about-timeline-row .note { grid-column: 2; } }
```

### 1e. Inline homepage About — shrink to teaser

In `BrutalistHome.tsx` lines 954–982, keep the section tag, head, lead paragraph, and the "Currently" `<dl>`. **Remove** the "Previously / Disciplines / Looking for" `<dl>` blocks. Add a footer link:

```jsx
<a className="about-more" href="/about" data-cursor="view">→ Read the full About</a>
```

Add to globals.css:
```css
.about-more { display: inline-block; margin-top: 24px; font-family: var(--font-jetbrains); font-size: 12px; letter-spacing: .22em; text-transform: uppercase; color: var(--accent); border-bottom: 1px solid var(--accent); padding-bottom: 2px; }
```

---

## Part 2 — Cassette playground + CRT popup

Replace the playground section in `BrutalistHome.tsx` (lines 986–1010) with `<PlaygroundStage />`. Remove the drag handlers in the useEffect (lines 359–387) — drag now lives inside `<Cassette>` itself.

### 2a. `components/playground/cassettes.data.ts`

```ts
export type Cassette = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  tag: string;
  screenshots: string[];
};

export const cassettes: Cassette[] = [
  { id: "6labs",      title: "6labs.ai",      subtitle: "Design Systems", year: "2025", tag: "PLATFORM", screenshots: ["/cassettes/6labs/01.jpg","/cassettes/6labs/02.jpg","/cassettes/6labs/03.jpg","/cassettes/6labs/04.jpg"] },
  { id: "nowstudio",  title: "now Studio",    subtitle: "Brand · Web",    year: "2024", tag: "STUDIO",   screenshots: ["/cassettes/nowstudio/01.jpg","/cassettes/nowstudio/02.jpg","/cassettes/nowstudio/03.jpg","/cassettes/nowstudio/04.jpg"] },
  { id: "bluestacks", title: "BlueStacks DS", subtitle: "Platform",       year: "2023", tag: "PLATFORM", screenshots: ["/cassettes/bluestacks/01.jpg","/cassettes/bluestacks/02.jpg","/cassettes/bluestacks/03.jpg","/cassettes/bluestacks/04.jpg"] },
  { id: "float",      title: "Float",         subtitle: "Payments",       year: "2022", tag: "PAYMENTS", screenshots: ["/cassettes/float/01.jpg","/cassettes/float/02.jpg","/cassettes/float/03.jpg"] },
  { id: "amway",      title: "Amway India",   subtitle: "Loyalty",        year: "2021", tag: "LOYALTY",  screenshots: ["/cassettes/amway/01.jpg","/cassettes/amway/02.jpg","/cassettes/amway/03.jpg"] },
  { id: "ikokas",     title: "Ikokas",        subtitle: "Agency",         year: "2020", tag: "AGENCY",   screenshots: ["/cassettes/ikokas/01.jpg","/cassettes/ikokas/02.jpg"] },
  { id: "alpha",      title: "Alpha Agency",  subtitle: "Brand",          year: "2019", tag: "BRAND",    screenshots: ["/cassettes/alpha/01.jpg","/cassettes/alpha/02.jpg"] },
];
```

If image files don't exist yet, write `public/cassettes/<slug>/01.svg` placeholders (just a 480×270 SVG with the project name centered). Reference `.svg` paths in the data instead of `.jpg`. Note this in the final report.

### 2b. `Cassette.tsx`

`"use client"`. Renders one cassette tile with these visuals:
- Wrapper `<div className="cassette">` with inline `style={{ "--rot": `${rot}deg`, transform: \`translate(${x}px, ${y}px) rotate(${rot}deg)\` }}` (use CSS var so drag can override).
- Inner: `<div className="cassette-label">` (project name + year, JetBrains Mono caps), `<div className="cassette-window">` (dark inset with two `<span className="cassette-wheel">` circles).
- Four corner screw dots: `<span className="cassette-screw" />` × 4.

Drag mechanic — port the offset+rAF pattern from existing useEffect (lines 359–387):

```ts
const onPointerDown = (e: React.PointerEvent) => {
  setDragging(true);
  const rect = ref.current!.getBoundingClientRect();
  offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  ref.current!.setPointerCapture(e.pointerId);
};
const onPointerMove = (e: React.PointerEvent) => {
  if (!dragging) return;
  const x = e.clientX - offsetRef.current.x;
  const y = e.clientY - offsetRef.current.y;
  setPos({ x, y });
};
const onPointerUp = (e: React.PointerEvent) => {
  setDragging(false);
  ref.current!.releasePointerCapture(e.pointerId);
  onDrop({ id, clientX: e.clientX, clientY: e.clientY });
};
```

Use **pointer events** (works for mouse + touch). Add `touch-action: none` to `.cassette` in CSS so touch drag doesn't scroll.

Tap-to-open fallback: if pointerdown → pointerup with no movement (`distance < 6px`), still call `onDrop` with the cassette's center coords so a tap acts like a successful drop. This makes mobile usable.

### 2c. `Console.tsx`

Renders the deck visual. Forwards a `slotRef` so the parent stage can hit-test against `slotRef.current.getBoundingClientRect()`.

Markup:
```tsx
<div className="console">
  <div className="console-top">
    <span className="console-label">DECK 01 — TAPE IN</span>
    <span className={`console-led ${powered ? "on" : ""}`} />
  </div>
  <div className="console-slot" ref={slotRef} />
  <div className="console-bottom">
    <span className="console-knob" />
    <span className="console-knob" />
    <span className="console-play">▶ PLAY</span>
  </div>
</div>
```

Props: `powered: boolean` (controls LED), `slotRef`.

### 2d. `CRTPopup.tsx`

Fixed overlay. Only renders when `cassette` prop is non-null. Esc + backdrop click close it (call `onClose`).

Inside CRT frame, cycle screenshots with `setInterval` every **1800ms**, crossfade with two stacked `<img>`s and a CSS opacity transition (320ms). Pause on hover.

Markup:
```tsx
<div className="crt-overlay" onClick={onClose} role="dialog" aria-modal>
  <div className="crt-shell" onClick={(e) => e.stopPropagation()}>
    <div className="crt-screen">
      <img src={current} className="crt-img a" />
      <img src={next}    className="crt-img b" />
      <div className="crt-scanlines" />
      <div className="crt-vignette" />
      <span className="crt-led" />
    </div>
    <div className="crt-meta">
      <span className="crt-tag">{cassette.tag} — {cassette.year}</span>
      <h2 className="crt-title">{cassette.title}</h2>
      <p className="crt-sub">{cassette.subtitle}</p>
      <button className="crt-eject" onClick={onClose}>⏏ EJECT</button>
    </div>
  </div>
</div>
```

Use `useEffect` to attach a `keydown` listener (Esc → onClose) and clean up on unmount. Trap focus on the eject button on open.

### 2e. `PlaygroundStage.tsx`

`"use client"`. Owns state:

```ts
const [openId, setOpenId] = useState<string | null>(null);
const slotRef = useRef<HTMLDivElement>(null);
const handleDrop = ({ id, clientX, clientY }) => {
  const r = slotRef.current?.getBoundingClientRect();
  if (!r) return;
  const inside = clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
  if (inside) setOpenId(id);
};
```

Layout:
```tsx
<section className="playground-stage" id="playground">
  <div className="section-head"><span className="no">§04</span><span className="title">Playground</span></div>
  <div className="stage-grid">
    <div className="cassette-rack">
      {cassettes.map(c => <Cassette key={c.id} cassette={c} onDrop={handleDrop} />)}
    </div>
    <Console powered={!!openId} slotRef={slotRef} />
  </div>
  <CRTPopup cassette={openId ? cassettes.find(c => c.id === openId)! : null} onClose={() => setOpenId(null)} />
</section>
```

Then in `BrutalistHome.tsx`, replace lines 986–1010 with `<PlaygroundStage />` (also import it at the top), and **remove** the drag-card useEffect block at lines 359–387 (it's unused now).

### 2f. CSS for cassette / console / CRT (append to globals.css)

```css
/* ============ Cassette playground ============ */
.playground-stage { padding: 80px 32px 120px; background: var(--paper); color: var(--ink); }
.stage-grid { display: grid; grid-template-columns: 1fr; gap: 48px; margin-top: 32px; align-items: start; }
@media (min-width: 1024px) { .stage-grid { grid-template-columns: 1.4fr 1fr; gap: 64px; } }

.cassette-rack {
  position: relative;
  display: flex; flex-wrap: wrap; gap: 24px;
  min-height: 420px;
  padding: 24px;
  border: 1px dashed rgba(10,10,10,.25);
}
.cassette {
  --rot: 0deg;
  position: relative;
  width: 220px; height: 135px;
  background: var(--paper);
  border: 1px solid var(--ink);
  box-shadow: 3px 3px 0 var(--ink);
  cursor: grab;
  user-select: none;
  touch-action: none;
  transform: rotate(var(--rot));
  transition: transform .2s ease, box-shadow .2s ease;
}
.cassette.dragging { cursor: grabbing; transition: none; z-index: 50; box-shadow: 6px 6px 0 var(--ink); }
.cassette-label { padding: 10px 14px; font-family: var(--font-jetbrains); font-size: 11px; letter-spacing: .18em; text-transform: uppercase; border-bottom: 1px solid var(--ink); display: flex; justify-content: space-between; }
.cassette-label .yr { color: var(--accent); }
.cassette-window { margin: 14px 22px; height: 56px; background: #1a1a1a; border-radius: 4px; display: flex; align-items: center; justify-content: space-around; }
.cassette-wheel { width: 22px; height: 22px; border-radius: 50%; background: var(--paper); box-shadow: inset 0 0 0 4px #1a1a1a; }
.cassette-screw { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: var(--ink); }
.cassette-screw:nth-child(1) { top: 6px; left: 6px; }
.cassette-screw:nth-child(2) { top: 6px; right: 6px; }
.cassette-screw:nth-child(3) { bottom: 6px; left: 6px; }
.cassette-screw:nth-child(4) { bottom: 6px; right: 6px; }

.console {
  position: sticky; top: 32px;
  background: #0f0f0f; color: #f5f1e8;
  border: 1px solid var(--ink);
  padding: 24px;
  box-shadow: 6px 6px 0 var(--ink);
  display: flex; flex-direction: column; gap: 18px;
}
.console-top { display: flex; justify-content: space-between; align-items: center; font-family: var(--font-jetbrains); font-size: 11px; letter-spacing: .22em; }
.console-led { width: 10px; height: 10px; border-radius: 50%; background: #441; box-shadow: 0 0 0 1px #000; transition: background .25s ease, box-shadow .25s ease; }
.console-led.on { background: var(--accent); box-shadow: 0 0 12px var(--accent), 0 0 0 1px #000; }
.console-slot { height: 16px; background: #050505; border-radius: 2px; box-shadow: inset 0 2px 6px rgba(0,0,0,.8); }
.console-bottom { display: flex; align-items: center; gap: 18px; font-family: var(--font-jetbrains); font-size: 11px; letter-spacing: .22em; }
.console-knob { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #2a2a2a, #111); box-shadow: inset 0 0 0 2px #333, 0 2px 0 #000; }
.console-play { margin-left: auto; color: var(--accent); }

/* CRT popup */
.crt-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(10,10,10,.85);
  display: grid; place-items: center;
  padding: 32px;
  animation: crt-in .3s ease;
}
@keyframes crt-in { from { opacity: 0; } to { opacity: 1; } }
.crt-shell {
  display: grid; grid-template-columns: 1fr; gap: 16px;
  width: min(960px, 100%);
  background: #0a0a0a; padding: 24px; border: 1px solid #2a2a2a;
}
.crt-screen {
  position: relative; aspect-ratio: 16 / 10;
  background: #050505;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: inset 0 0 80px rgba(0,0,0,.8);
}
.crt-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity .32s ease; }
.crt-img.a { opacity: 1; }
.crt-img.b { opacity: 0; }
.crt-screen.swap .crt-img.a { opacity: 0; }
.crt-screen.swap .crt-img.b { opacity: 1; }
.crt-scanlines { position: absolute; inset: 0; pointer-events: none; background-image: repeating-linear-gradient(to bottom, rgba(0,0,0,.18) 0 1px, transparent 1px 3px); mix-blend-mode: multiply; }
.crt-vignette { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.6)); }
.crt-led { position: absolute; right: 18px; bottom: 18px; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); animation: crt-led 1.2s ease-in-out infinite; }
@keyframes crt-led { 0%, 100% { opacity: .8; } 50% { opacity: .35; } }

.crt-meta { display: grid; grid-template-columns: 1fr auto; gap: 8px 24px; align-items: end; color: #f5f1e8; }
.crt-tag { font-family: var(--font-jetbrains); font-size: 11px; letter-spacing: .22em; color: var(--accent); grid-column: 1; }
.crt-title { font-family: var(--font-grotesk); font-size: clamp(28px, 4vw, 48px); font-weight: 500; letter-spacing: -.02em; line-height: 1; grid-column: 1; }
.crt-sub { font-family: var(--font-jetbrains); font-size: 12px; opacity: .7; grid-column: 1; }
.crt-eject { grid-row: 1 / 4; grid-column: 2; align-self: center; background: var(--accent); color: #0a0a0a; border: 0; padding: 10px 18px; font-family: var(--font-jetbrains); font-size: 12px; letter-spacing: .2em; cursor: pointer; }
.crt-eject:hover { transform: translate(-1px, -1px); box-shadow: 2px 2px 0 #f5f1e8; }
```

The CRT image-swap can be driven from `CRTPopup.tsx` by toggling a `swap` class on `.crt-screen` and rotating which screenshot fills `<img class="a">` vs `<img class="b">` on each tick.

---

## Part 3 — Menu wiring

In `BrutalistHome.tsx`:

### 3a. Menu JSX (around line 722–776)
Find the `<a>` whose label is "About, briefly" with `data-target="about"`. Change it to:

```jsx
<a className="menu-item" href="/about" data-cursor="go">About, briefly</a>
```

(Drop the `data-target` attribute and the `#about` hash.)

### 3b. Menu click handler (around lines 605–629)

The handler currently intercepts every click, prevents default, and triggers a curtain-then-scroll. Update it so:

- If the link has a `data-target` attribute → existing curtain-scroll behavior.
- Otherwise → trigger the curtain, then call `router.push(href)` after the same 800ms delay.

Add at the top of `BrutalistHome.tsx`:
```tsx
import { useRouter } from "next/navigation";
```

Inside the component:
```tsx
const router = useRouter();
```

Inside the click handler (rough shape — preserve existing curtain logic):
```ts
const target = a.dataset.target;
if (target) {
  // existing scroll path
  e.preventDefault();
  triggerCurtain();
  setTimeout(() => { window.scrollTo(0, getYFor(target)); }, 800);
} else {
  // route change path
  e.preventDefault();
  triggerCurtain();
  setTimeout(() => { router.push(a.getAttribute("href")!); }, 800);
}
```

Read the actual existing handler before editing — preserve all its menu-close + body-class-toggle logic; only fork the navigation call.

---

## Constraints

- **Stay in existing tokens** — `--ink`, `--paper`, `--accent`, mono + grotesk fonts. Do not introduce new colors.
- **No new dependencies.** Drag uses pointer events. CRT is pure CSS. No Framer Motion, no GSAP, no Headless UI.
- **No JS rewrites in the existing scroll-zoom controller** in BrutalistHome.tsx. Only the playground useEffect block (lines 359–387) is removed.
- **Preserve `id="about"`** on the inline homepage About teaser — other code may still anchor-target it.
- **Mobile fallback for cassettes** — at <768px the rack stacks above the console (the existing 1-col grid handles this). Tap-to-open fallback is required (described in Cassette.tsx section).
- **Accessibility** — popup is `role="dialog" aria-modal`, Esc closes, focus moves to eject button on open and back to the cassette on close.
- **Don't refactor unrelated code.** No rename / reorder / "cleanup" elsewhere.
- **Don't add comments to JSX.** One CSS section header comment per appended block is fine.

---

## Verification

1. `cd D:\AG_master\portfolio && npm run dev`.
2. **/about** — open `/`, click hamburger, click "About, briefly". Confirm curtain plays then route changes to `/about`. Scroll all 9 sections. Card grids reflow at 360px / 768px / 1280px.
3. **Inline About** — back on `/`, scroll to the About section. Confirm it's now a teaser with the `→ Read the full About` link, which routes to `/about`.
4. **Cassette playground** — scroll to `#playground`. Drag a cassette toward the console slot. On release inside the slot rect, the LED lights and the CRT popup opens with that project's screenshots cycling every 1.8s. On release outside, the cassette springs back to its rack position.
5. **CRT popup** — confirm scanlines visible, vignette visible, LED pulses, screenshots crossfade. Hover pauses the loop. Esc closes. Backdrop click closes. Eject button closes.
6. **Touch** — at 360px viewport, tap a cassette. Popup opens directly without dragging.
7. `npx tsc --noEmit` passes.
8. `npm run build` passes (the new `/about` route is in the static prerender output).

## When complete, report

1. Files created (paths + line counts).
2. Files edited in `BrutalistHome.tsx` and `globals.css` (line ranges).
3. Whether real screenshots or placeholder SVGs were used — list paths.
4. `npx tsc --noEmit` + `npm run build` results.
5. One line per part: "verified visually in dev server" or "could not verify because X".
6. Any deviations from this spec, with reason.
