# Task — Homepage scroll transition redesign

You are continuing work on a Next.js portfolio. This document contains everything you need; do not ask follow-up questions, just execute. **Use Sonnet 4.6 for this task.**

---

## Project

- **Working directory:** `D:\AG_master\portfolio`
- **Stack:** Next.js (App Router), TypeScript, plain CSS (`app/globals.css`), no Tailwind for these components
- **Theme:** brutalist — cream `#f5f1e8` and ink `#0a0a0a` with `--accent` red `#FF3B1F`. Typography: Space Grotesk (display) + JetBrains Mono (mono).

## Goal

The homepage has 4 full-screen scroll transitions between sections. Today each one zooms a giant letter to cover the viewport ("NOW", "ME&CO.", "IN4", "HELLO") while showing verbose §-numbered prose in the corners. Replace this with a vertical-stack layout where:

- A **2-word tag** sits above a **single geometric glyph** that zooms during scroll (replacing the letter).
- A **2-word context** sits below the glyph.
- The glyph is the new zoom focal — same scroll mechanic as today, the character is the only thing changing.

Visual language is set by the marquee strip directly above transition 02 (`SELECTED WORK ✦ product design ✦ ...`) — short uppercase tags joined by `✦`, `+`, `✱`. The transitions should feel like marquee glyphs blowing up.

---

## Files

1. `D:\AG_master\portfolio\components\brutalist\BrutalistHome.tsx` — JSX edits in 4 places
2. `D:\AG_master\portfolio\app\globals.css` — append a small CSS block

**Do not** touch:
- `BrutalistHome.tsx` lines 405–520 (the scroll-zoom controller's `useEffect`) — animation works by attribute selector and stays as-is.
- The `.st-shapes` parallax block inside each transition.
- The marquee component or marquee JSX.
- The focal letter system on any other page.

---

## Final copy table

Each row maps to one of the 4 scroll transitions. The "focal glyph" is the character that gets zoomed during scroll — every section gets a different one for visual variety (replacing the NO/ME&/IN4/HELLO variety).

| # | Section | Top-left number | Tag (above focal) | Focal glyph | Context (below focal) |
|---|---------|------------------|---------------------|-------------|------------------------|
| T2 | → Work    | `02` | `✦ THE WORK`   | `✦` | `+ SEVEN YEARS` |
| T3 | → About   | `03` | `✦ THE HUMAN`  | `✱` | `✱ OFF DUTY`    |
| T4 | → Process | `04` | `✦ THE METHOD` | `+` | `+ NO MIRO`     |
| T5 | → Contact | `05` | `✦ THE INVITE` | `★` | `✱ DELHI NCR`   |

---

## Step 1 — Locate the 4 transitions

In `BrutalistHome.tsx`, the four scroll-transition blocks each have `className="scroll-transition"` on a `<div>` with `data-st` attributes. Use Grep:

```
pattern: scroll-transition
file:    D:\AG_master\portfolio\components\brutalist\BrutalistHome.tsx
```

You'll find the four blocks at approximately these line numbers (verify with Read before editing — line numbers may have shifted slightly):

- **T2 → Work:** opens around line 821, contents lines 828–846
- **T3 → About:** opens around line 911, contents lines 918–936
- **T4 → Process:** opens around line 999, contents lines 1006–1023
- **T5 → Contact:** opens around line 1062, contents lines 1069–1086

Read each block in full with `Read` and an offset/limit before editing — don't rely on the line numbers above as exact.

## Step 2 — Replace each transition's inner JSX

For every transition, the structure today is roughly:

```jsx
<div className="scroll-transition" data-st data-st-from="..." data-st-from-fg="..." data-st-to="..." data-st-to-fg="...">
  <div className="st-shapes">
    {/* parallax shapes — DO NOT TOUCH */}
  </div>
  <div className="st-rule t"></div>
  <div className="st-num">
    <span>§02 · Approaching the work</span>
    <span>Seven years, briefly recorded</span>
  </div>
  <div className="st-sticky">
    <div className="st-word" data-st-word>
      <span className="flank pre" data-st-pre>N</span>
      <span className="focal" data-focal style={{ "--fx": "50%", "--fy": "50%" } as any}>O</span>
      <span className="flank post" data-st-post>W</span>
    </div>
    <div className="st-sub" data-st-sub>—— Selected work, 2019 → 2026</div>
  </div>
  <div className="st-progress" data-st-progress></div>
  <div className="st-rule b"></div>
</div>
```

**Replace** the `.st-num`, `.st-word`, and `.st-sub` blocks with the new structure below. Keep `.st-shapes`, both `.st-rule`s, `.st-sticky` wrapper, and `.st-progress` exactly as they were. Preserve all `data-st`, `data-st-from`, etc. attributes on the outer `<div>`.

### New JSX template (per transition)

```jsx
<div className="st-num">
  <span><b>{NUM}</b></span>
  <span></span>
</div>
<div className="st-rule t"></div>
<div className="st-sticky">
  <div className="st-stack" data-st-word>
    <span className="st-tag">{TAG}</span>
    <span
      className="focal st-glyph"
      data-focal
      style={{ "--fx": "50%", "--fy": "50%" } as any}
    >
      {GLYPH}
    </span>
    <span className="st-context" data-st-sub>{CONTEXT}</span>
  </div>
</div>
<div className="st-progress" data-st-progress></div>
<div className="st-rule b"></div>
```

Substitute `{NUM}`, `{TAG}`, `{GLYPH}`, `{CONTEXT}` per the copy table above.

**Important attribute preservation:**
- `data-focal` MUST stay on the glyph span — the scroll JS at line ~422 selects it.
- `data-st-word` MUST stay on the `.st-stack` div — JS at line ~436 selects it.
- `data-st-sub` MUST stay on the context span — JS at line ~439 selects it.
- `data-st-progress` MUST stay on the empty progress div.
- The wrapping `.st-sticky` div MUST stay — it's the 100vh viewport that pins during scroll.

The old `flank.pre` / `flank.post` spans go away entirely — the design no longer has horizontal flanking text.

### Concrete output per transition (paste-ready)

**T2 → Work:**
```jsx
<div className="st-num">
  <span><b>02</b></span>
  <span></span>
</div>
<div className="st-rule t"></div>
<div className="st-sticky">
  <div className="st-stack" data-st-word>
    <span className="st-tag">✦ THE WORK</span>
    <span className="focal st-glyph" data-focal style={{ "--fx": "50%", "--fy": "50%" } as any}>✦</span>
    <span className="st-context" data-st-sub>+ SEVEN YEARS</span>
  </div>
</div>
<div className="st-progress" data-st-progress></div>
<div className="st-rule b"></div>
```

**T3 → About:**
```jsx
<div className="st-num">
  <span><b>03</b></span>
  <span></span>
</div>
<div className="st-rule t"></div>
<div className="st-sticky">
  <div className="st-stack" data-st-word>
    <span className="st-tag">✦ THE HUMAN</span>
    <span className="focal st-glyph" data-focal style={{ "--fx": "50%", "--fy": "50%" } as any}>✱</span>
    <span className="st-context" data-st-sub>✱ OFF DUTY</span>
  </div>
</div>
<div className="st-progress" data-st-progress></div>
<div className="st-rule b"></div>
```

**T4 → Process:**
```jsx
<div className="st-num">
  <span><b>04</b></span>
  <span></span>
</div>
<div className="st-rule t"></div>
<div className="st-sticky">
  <div className="st-stack" data-st-word>
    <span className="st-tag">✦ THE METHOD</span>
    <span className="focal st-glyph" data-focal style={{ "--fx": "50%", "--fy": "50%" } as any}>+</span>
    <span className="st-context" data-st-sub>+ NO MIRO</span>
  </div>
</div>
<div className="st-progress" data-st-progress></div>
<div className="st-rule b"></div>
```

**T5 → Contact:**
```jsx
<div className="st-num">
  <span><b>05</b></span>
  <span></span>
</div>
<div className="st-rule t"></div>
<div className="st-sticky">
  <div className="st-stack" data-st-word>
    <span className="st-tag">✦ THE INVITE</span>
    <span className="focal st-glyph" data-focal style={{ "--fx": "50%", "--fy": "50%" } as any}>★</span>
    <span className="st-context" data-st-sub>✱ DELHI NCR</span>
  </div>
</div>
<div className="st-progress" data-st-progress></div>
<div className="st-rule b"></div>
```

> If a given transition's existing JSX wraps `.st-word` directly in the outer transition div (without `.st-sticky`), keep the same wrapper structure that the file already uses — Read the actual current code first to confirm. Do not introduce or remove `.st-sticky` if the existing block doesn't match this pattern.

## Step 3 — Append CSS to `globals.css`

Open `D:\AG_master\portfolio\app\globals.css`, find the existing `.scroll-transition .st-word` rule (around line 590), and **append** this block right after the related `.st-word` rules (somewhere before the next major section comment). Do not remove or modify the existing `.st-word`, `.flank`, or `.focal` rules — they're still referenced by other code paths.

```css
/* ============ ZOOM-GLYPH STACK (replaces letter focal) ============ */
.scroll-transition .st-stack {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: var(--font-grotesk);
  pointer-events: none;
}
.scroll-transition .st-stack .st-tag {
  position: absolute;
  left: 50%;
  top: calc(50% - clamp(80px, 12vw, 180px));
  transform: translateX(-50%);
  font-family: var(--font-jetbrains);
  font-size: 12px;
  letter-spacing: .26em;
  text-transform: uppercase;
  white-space: nowrap;
  opacity: .8;
  z-index: 3;
}
.scroll-transition .st-stack .st-context {
  position: absolute;
  left: 50%;
  top: calc(50% + clamp(80px, 12vw, 180px));
  transform: translateX(-50%);
  font-family: var(--font-jetbrains);
  font-size: 12px;
  letter-spacing: .26em;
  text-transform: uppercase;
  white-space: nowrap;
  opacity: .55;
  z-index: 3;
}
.scroll-transition .st-stack .st-glyph {
  position: absolute;
  left: 50%;
  top: 50%;
  --tx: calc(-1 * var(--fx, 50%));
  --ty: calc(-1 * var(--fy, 50%));
  transform: translate(var(--tx), var(--ty));
  transform-origin: var(--fx, 50%) var(--fy, 50%);
  font-size: clamp(220px, 38vw, 560px);
  line-height: 1;
  color: var(--accent);
  font-weight: 400;
  z-index: 2;
  backface-visibility: hidden;
}
```

The `.st-glyph` rule **must** include the `--fx` / `--fy` translate logic and `transform-origin` — the scroll-zoom JS at lines ~492–496 reads these custom properties and applies a `scale()` to the same `transform`. Any glyph-positioning rule that doesn't include the custom-property-based translate will break the zoom.

## Step 4 — Verify

1. Run the dev server:
   ```
   cd D:\AG_master\portfolio
   npm run dev
   ```
2. Open `http://localhost:3000` and scroll slowly through all 4 transitions. For each:
   - Top-left shows section number (`02`/`03`/`04`/`05`) in accent red.
   - Tag line sits above the focal in mono uppercase, slightly dimmed.
   - The single geometric glyph sits dead center, accent red, very large.
   - Context line sits below the focal in mono uppercase, more dimmed.
   - As you scroll, the glyph scales up to cover the viewport while the bg/fg colors crossfade — same behavior as before.
3. Confirm both dark-on-cream and cream-on-dark transitions render correctly. The `.inv` class on a transition swaps backgrounds; the existing `.inv .st-num b` rule keeps the section number red.
4. Mobile viewport at 360px width: tag and context should stay on a single line (they have `white-space: nowrap`); glyph shrinks to the `clamp(220px, ...)` floor.
5. Run a TypeScript check to confirm no regressions:
   ```
   npx tsc --noEmit
   ```
   The `as any` cast on the inline style is intentional — React's `CSSProperties` type doesn't allow custom property keys without it.

## Constraints

- **No JS changes.** The scroll-zoom controller works by attribute selectors (`[data-focal]`, `[data-st-word]`, `[data-st-sub]`, `.st-num`, `.st-rule`) — keep those exact names on the new elements and the controller will work unchanged.
- **No new dependencies.** Pure JSX + CSS edits.
- **No emoji additions.** The four glyphs (`✦` `✱` `+` `★`) are the only special characters introduced.
- **Don't add comments to the JSX or CSS** beyond the one section header comment shown in the CSS block above.
- **Don't refactor surrounding code.** Bug fix only — don't rename variables, reorder imports, or "clean up" anything else in the file.

## When complete

Report:
1. Lines edited in `BrutalistHome.tsx` (the four ranges).
2. Line where the new CSS block was inserted in `globals.css`.
3. Result of `npx tsc --noEmit`.
4. A one-line "verified visually in dev server" or "could not run dev server because X".
