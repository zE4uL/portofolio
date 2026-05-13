# Portfolio Asset System — Design Spec

**Date:** 2026-04-25
**Scope:** Asset pipeline for the brutalist portfolio. Covers (a) the 8 image/video slots in the now Studio case study and (b) the multi-frame hover loop on the homepage Selected Work list. Designed to extend cleanly to future case studies without copy-paste.

---

## 1. Goals

- Drop a Figma export into the running dev page → it appears on the live page, no manual file moves, no manifest edits.
- Production builds never expose the dropzone or its API route.
- Single source of truth per case study (a typed manifest) and per homepage list (one shared manifest).
- Brutalist aesthetic preserved — no device chrome, no rounded laptop frames, no glassy backdrops. Frames sit on flat plates with monospace captions.

## 2. File layout

```
portfolio/
├─ public/images/work/
│  ├─ nowstudio/                    case-study assets
│  │  ├─ heroStrip.webp
│  │  ├─ dashboard.webp
│  │  ├─ flowSteps-01.webp ... -04.webp
│  │  ├─ pricing.webp
│  │  ├─ rbac.webp
│  │  ├─ analytics.webp
│  │  ├─ testFeedback-01.webp -02.webp
│  │  └─ discordBot.webp
│  └─ previews/
│     ├─ nowstudio/01.webp ... 0N.webp
│     ├─ 6labs/...
│     ├─ bluestacks/...
│     ├─ float/...
│     ├─ amway/...
│     ├─ ikokas/...
│     └─ alpha-agency/...
├─ app/
│  ├─ nowstudio/
│  │  ├─ assets.ts                  case-study manifest (typed)
│  │  └─ page.tsx                   reads manifest, renders <Slot/>
│  └─ api/dev-assets/route.ts       POST + DELETE, dev-only
├─ assets/
│  └─ work-previews.ts              homepage hover manifest
└─ components/assets/
   ├─ Slot.tsx
   ├─ DropZone.tsx
   └─ WorkPreviewLoop.tsx
```

## 3. Slot manifest (case study)

```ts
// app/nowstudio/assets.ts
export type Slot =
  | { kind: "image",   src: string, alt: string, caption?: string }
  | { kind: "video",   src: string, poster?: string, alt: string, caption?: string }
  | { kind: "grid",    srcs: [string, string, string, string], alts: string[], caption?: string }
  | { kind: "diptych", srcs: [string, string], alts: [string, string], caption?: string };

export const nowstudioAssets: Record<string, Slot | null> = {
  heroStrip:    null,
  dashboard:    null,
  flowSteps:    null,   // grid, 4 frames, 2×2
  pricing:      null,
  rbac:         null,
  analytics:    null,
  testFeedback: null,   // diptych
  discordBot:   null,
};
```

`null` = empty slot. In dev → renders dropzone. In prod → renders nothing (or a one-line dev note that we strip before shipping).

## 4. Slot rendering rules

All slots wrap in a **plate**:

```
┌─────────────────────────────────────────┐
│                                         │
│           [ asset content ]             │
│                                         │
├─────────────────────────────────────────┤
│  SLOT-ID · alt-text                     │   ← monospace, 11px, --ink-soft
└─────────────────────────────────────────┘

  border: 1px solid var(--ink);
  background: var(--paper);
  padding: 0;       ← image bleeds to edge
  caption row: padding 12px 16px, top border 1px hairline.
```

Per-kind:

| Kind | Layout | Aspect (rule) |
|---|---|---|
| `image` | single, full plate width | preserve native aspect, no crop |
| `video` | autoplay, muted, loop, playsinline, no controls | as image |
| `grid` | **2×2**, 1px gap | each cell preserves aspect, contained, not cover |
| `diptych` | side-by-side, 1px gap | each preserves aspect, contained |

**No `object-fit: cover` anywhere on case-study assets.** Use `contain` on a fixed-aspect plate or let the image set its own height. Crop is destructive; we want the Figma frame intact.

## 5. Dropzone (dev-only)

**Component:** `<Slot id="heroStrip" />`. Internally:

```
if (NODE_ENV !== "development") {
  return manifestEntry ? <Plate>...</Plate> : null;
}
return manifestEntry ? <Plate>... + ⋯ menu</Plate> : <DropZone slotId="heroStrip" />;
```

**Empty state:**

```
┌──────────────────────────────────────────┐
│   ▢ HEROSTRIP                            │
│                                          │
│   drop a file  ·  or click to browse     │
│   accepts: png jpg webp avif mp4 webm    │
└──────────────────────────────────────────┘
```

For `grid` / `diptych`: header reads `▢ FLOWSTEPS · 4 frames` and "drop 4 files".

**Filled state ⋯ menu:** Replace, Clear, Open file in explorer, Copy slot ID.

**Drop handling:**

- Multi-file drop → sort by filename ascending. `01.png, 02.png, 03.png, 04.png` lands in order. If count mismatches expected, reject with toast: `flowSteps needs 4 files; got 3`.
- File type → image vs. video inferred from extension. Image dropped on `image` slot stays `image`. Video dropped on `image` slot flips kind to `video`.
- Existing files at the slot path are **deleted** (any extension) before the new file writes — prevents `dashboard.png` and `dashboard.webp` coexisting.

## 6. Dev API: `app/api/dev-assets/route.ts`

```
POST   /api/dev-assets
  body: FormData { slotId, project, kind, files[] }
  → writes files to public/images/work/{project}/{slotId}[-NN].{ext}
  → patches app/{project}/assets.ts (regenerates the file from the in-memory manifest)
  → returns { ok: true, manifest }

DELETE /api/dev-assets
  body: { slotId, project }
  → deletes the slot's files
  → sets manifest entry back to null
```

**Safety:**

- First line of route handler: `if (process.env.NODE_ENV !== "development") return new Response("Not found", { status: 404 });`
- `next.config.js` — exclude `app/api/dev-assets/**` from production server bundle (or keep but rely on the runtime gate; double belt-and-suspenders).
- Filenames sanitized: only `[a-zA-Z0-9_-]` allowed in slotId; project ID validated against an allowlist.
- Path-traversal defense: resolve `path.join(publicDir, project, file)`, then assert the result is `startsWith(publicDir)`.
- File size cap: 20 MB per file; reject larger.

**Manifest patching:**

Re-emit the whole `assets.ts` file from a typed in-memory object using a deterministic string template. Manifest is treated as machine-edited; top-line comment: `// AUTO-GENERATED by /api/dev-assets — edit through the dropzone, not by hand.`

## 7. Homepage hover loop

**Manifest:**

```ts
// assets/work-previews.ts
export type WorkPreview = {
  label: string;
  href?: string;
  frames: string[];           // ordered
  intervalMs?: number;        // default 700
};

export const workPreviews: Record<string, WorkPreview> = {
  "6labs":         { label: "6labs.ai",      frames: [], intervalMs: 700 },
  "nowstudio":     { label: "now Studio",    href: "/nowstudio", frames: [], intervalMs: 700 },
  "bluestacks":    { label: "BlueStacks DS", frames: [], intervalMs: 700 },
  "float":         { label: "Float",         frames: [], intervalMs: 700 },
  "amway":         { label: "Amway India",   frames: [], intervalMs: 700 },
  "ikokas":        { label: "Ikokas",        frames: [], intervalMs: 700 },
  "alpha-agency":  { label: "Alpha Agency",  frames: [], intervalMs: 700 },
};
```

Each work item in `BrutalistHome.tsx` adds `data-preview-key="nowstudio"` (alongside the existing `data-preview` for color fallback).

**Frame container (key change from current implementation):**

The cursor-follow preview element currently sizes its inner div to a fixed square. Change it to a **horizontal landscape frame**:

- Container size: **640 × 360** (16:9), a generous canvas so dropped screens don't crop.
- Inner image: `object-fit: contain`, `object-position: center`, on a `var(--paper)` backdrop. No crop, ever.
- 1px hairline border (matches plate language).
- Caption strip below: 11px mono, `LABEL · VIEW CASE ↗`, unchanged from today.

**Cycling logic (`WorkPreviewLoop.tsx`):**

- All preview frames preloaded once on `BrutalistHome` mount via `<link rel="preload" as="image" href={...}>`. Lazy-load only frames 2..N per project (deferred until first hover) to keep initial payload small.
- On `pointerenter` of a `data-preview-key`'d work item:
  1. Resolve the project's `frames[]`.
  2. If empty → fall back to today's striped pattern (so unbuilt projects don't break).
  3. Else: render frame 0 inside the preview, start `setInterval` cycling at `intervalMs`.
- On `pointerleave`: clear interval; reset visible index to 0.
- **No crossfade.** Instant swap matches brutalist grammar.
- Cursor-follow rAF stays as-is; only the inner contents change.

**Asset spec for homepage frames** (user provides separately):
- Aspect: any landscape; container is 640×360 with `object-fit: contain` so anything from 16:9 to 4:3 fits.
- Format: `.webp` preferred; `.png` accepted.
- Size: ≤ 200 KB per frame, ≤ 1280 px wide.
- Count per project: 2–6 frames is the sweet spot for an 8-frame loop at 700ms (5–6 sec full cycle).

## 8. Build order

1. `Slot.tsx` + `DropZone.tsx` — render path with NODE_ENV gate.
2. `app/api/dev-assets/route.ts` — POST + DELETE + manifest writer.
3. `app/nowstudio/assets.ts` — empty manifest, 8 slot keys.
4. Refactor `app/nowstudio/page.tsx` — replace each `— upload: ... —` block with `<Slot id="..." />`. CSS for `.case-plate` lives in `globals.css`.
5. `assets/work-previews.ts` + `WorkPreviewLoop.tsx`.
6. Wire `BrutalistHome.tsx` — replace `previewInner.style.background = repeating-linear-gradient(...)` block with the loop component. Resize cursor-follow container to 640×360. Keep stripe pattern as fallback when `frames[]` empty.
7. User drags Figma exports into running dev pages.

## 9. Explicit non-goals (YAGNI)

- No CMS, no headless backend, no DB.
- No image optimization pipeline beyond Next's built-in `<Image/>` — exports are already sized.
- No drag-to-reorder inside `grid`/`diptych` — filename ordering is enough.
- No undo history for cleared slots — user re-drops the file.
- No production admin UI; dev-only is sufficient for a personal portfolio.
- No video transcoding — drop a working `.mp4`/`.webm`, that's the contract.
- No A/B between hover loop and current stripe pattern; we're replacing it (with stripe as fallback only when frames are missing).

## 10. Open items

None — all design decisions resolved in the brainstorm.
