# AI-Native Workflow — Building 6labs.ai with Claude Code

**Company:** BlueStacks / now.gg
**Years:** 2025–present
**Role:** Sole designer + workflow architect
**Tier:** 1 — companion case study to 6labs.ai (cross-linked both ways)
**Suggested route slug:** `/ai-native-workflow`
**Suggested page wrapper class:** `cs-workflow` (for scoped CSS in `globals.css`, mirroring `cs-6labs`)

---

## Why this case study exists

The `/6labs-ai` case study (§04) callout points here: *"6labs.ai was designed in an AI-native workflow — Figma↔code round-trips through Claude Code, custom Claude Code skills built for the team, and internal AI workshops to bring the broader org along. Full process: [Building 6labs.ai with Claude Code →]"*

This is the "how" companion to the 6labs.ai "what." Senior interviewers in 2026 ask one question above all others: *is this person an AI-native designer or a designer who used ChatGPT once?* This page is the answer.

It is **a meta case study** about Ziaul's workflow — not about a product. Read it as the "behind the scenes" page that earns the AI-native-designer signal.

---

## The narrative material (recovered from prior 6labs-ai page version)

This case study existed once as the *primary* `/6labs-ai` page before we pivoted that route to the product story. Use this content as the canonical source. None of it is invented — all of it was already on the live site.

### The loop (the central artifact)

**Two pillars, four named operations:**
- **Forge** — *code → Figma.* Generates Figma frames from the Storybook component inventory. Reads the live Storybook MCP, matches against existing Figma library components via `@figmaComponent` sync tags, and only creates new nodes for unmatched ones. Tokens, never hex. *(Formerly `apparatus-generate-design`.)*
- **Land** — *Figma → code.* Implements production code from finalised Figma designs. Storybook is the single source of truth. Land queries the inventory before writing a line, reuses everything that already exists, and only generates new code for the genuinely new. *(Formerly `figma-to-production`.)*
- **Tether** — *bidirectional.* Keeps every Figma component and its codebase counterpart linked. JSDoc headers (`@figmaNode`, `@figmaUrl`, `@figmaPath`) on the code side. Source-link in the component description on the Figma side. Two halves of one component, one click apart. *(Formerly `figma-code-sync`.)*
- **Parity** — *verification.* Visual QA — diffs the rendered code against the Figma source. Goes past tokens. Compares actual rendered screenshots, audits state coverage, checks icon parity, writes a report into `docs/design-qa/`. Token PASS isn't visual PASS. *(Formerly `design-qa`.)*

The loop diagram had a four-named-block SVG: CODE pillar (left, dark), FIGMA pillar (right, cream), Forge arrow (top, code → figma), Land arrow (bottom, figma → code, accent-coloured), Tether marker (centre, dashed), Parity ring (outer dashed rectangle). The previous implementation lived in the SVG block of the old `app/6labs-ai/page.tsx` from the conversation history — recover it from git or rebuild.

### Apparatus — the substrate that makes the loop work

The round-trip only works because the design system is *legible to both AI and humans at the same time.* Six pillars:

- **Variables** — *No raw hex, anywhere.* Every fill, stroke, radius, spacing value, and typography ramp lives as a variable. Modes for light/dark/density. AI agents have deterministic anchors instead of guessing at colours.
- **Variants** — *Full state matrix, per component.* Every size × every state × every modifier — exposed as variants on the component, not hidden in nested frames. An agent reading the inventory sees the whole behaviour space at once.
- **Code Connect** — *Every Figma node points home.* Code Connect maps each Figma component to its Storybook story. Land's first move is always *"does this already exist?"* — Code Connect makes the answer reliable.
- **Storybook · MCP** — *The live inventory.* Storybook isn't a side artefact — it's the source of truth, exposed via MCP so Forge and Land query it before either one writes a frame or a line of code.
- **JSDoc headers** — *Two halves, one component.* `@figmaNode`, `@figmaUrl`, `@figmaPath` sit at the top of every component file. Tether reads them. An agent reading the codebase knows exactly which Figma node it's looking at — and vice versa.
- **DS Compliance** — *A skill that lints the system itself.* `figma-ds-compliance` runs over every new design and flags raw values, off-token spacing, untagged variants. The system stays AI-readable because a skill keeps it AI-readable.

> *The reason agentic workflows produce decent output here — and frequently produce slop everywhere else — is this prerequisite. The model isn't cleverer; the substrate is just legible. Apparatus is the substrate.*

### The skills (4) — the round-trip operations

Each one started as a sharp annoyance during real product work — *"I keep doing this by hand"* — and became a skill Ziaul reaches for daily. Names matter; these all got renamed at least once before they landed.

| # | Name | Kind | What it does |
|---|---|---|---|
| 01 | **Forge** | code → figma | Generates Figma frames from the Storybook component inventory. |
| 02 | **Land** | figma → code | Implements production code from finalised Figma designs. |
| 03 | **Tether** | bidirectional | Keeps every Figma component and its codebase counterpart linked. |
| 04 | **Parity** | verification | Visual QA — diffs rendered code against the Figma source. |

### The plugins (3) — sharp tools outside Claude Code

Outside the round-trip skills, three Figma plugins solve specific repetitive work that the skills don't cover:

| # | Name | Kind | What it does |
|---|---|---|---|
| 01 | **Glyph** | icon library | Flattens icon paths into outlined glyphs — strokes become fills. *(Formerly `figma-icon-outliner`.)* |
| 02 | **Sweep** | library hygiene | Bulk-moves components between pages without breaking instances. *(Formerly `move-components-to-page`.)* |
| 03 | **Token Binder** | tokens | Binds remote design-system variables to layer properties at scale. The plugin Ziaul wished existed before he built it. |

### Workshops — teaching the round-trip

The skills only matter if the team uses them. Internal AI workshops at BlueStacks / now.gg raise AI awareness across design and product, walk through the round-trip live, and onboard designers to Claude Code as a daily collaborator.

**The pitch:**
- *AI-native isn't an experiment.* It's the default workflow inside 6labs.
- *Tools are personal.* I built mine; you'll build yours. Here's how I started.
- *Show the round-trip.* Live: Forge → Land → Tether → Parity, end to end, in under ten minutes.

**What participants leave with:**
- A working Claude Code setup pinned to their repo.
- The four round-trip skills installed: Forge, Land, Tether, Parity.
- A first plugin idea — usually the thing they were going to do by hand tomorrow.

---

## Recommended structure (to drive the new build)

Mirror the 6labs.ai structure (Hook + 7 §-numbered sections + meta strip + footer next-cs link).

| Section | Title (suggested) | Content |
|---|---|---|
| Hero | *"The work and the workflow rhyme."* (or new line) | 3-line lede, meta strip, hero-slab with `HeroSlabTrail` |
| §00 Stats | *Where it stands, today.* | 7 in-house tools shipped · 4 skills · 3 plugins · workshops run · designers onboarded |
| §01 Setup | *AI tools were everywhere. The work wasn't.* | Mid-2024 onwards: every designer "used AI." Most stopped at acceleration. The bet was deeper integration. |
| §02 Framing | *The substrate problem.* | "AI-native workflow" demands the design system itself be legible to both human and agent. Without that, agents produce slop. The design question came before the tooling. |
| §03 The moves | *Apparatus, then the loop, then the tools.* | One section that walks: (a) Apparatus pillars (b) Forge/Land/Tether/Parity as a single round-trip diagram (c) the 4 skills + 3 plugins as a tool inventory grid (d) workshops as the dissemination layer |
| §04 What shipped | *6labs.ai, built this way.* | Cross-link to /6labs-ai. Show one before/after — a real component that round-tripped end-to-end. |
| §05 Reflection | *What I'd do differently.* | Honest reflections — likely candidates: would have invested in Apparatus 6 months earlier, would have shipped Tether before Forge, would have run workshops earlier. Confirm with Ziaul. |

The structure should differ from 6labs.ai in *visual emphasis* — this is a tools/process page, so a tool-card grid (the original SKILLS array layout) and a loop-diagram SVG are the centerpiece artifacts. 6labs.ai has iteration cards; this one has a tool inventory + loop diagram.

---

## Slot manifest to create (`app/ai-native-workflow/assets.ts`)

Suggested slot ids — confirm with Ziaul before locking:

```ts
export const slotIds = [
  "coverHero",
  "loopDiagram",         // FIG. 02 — the four-block loop SVG (or screenshot)
  "apparatusOverview",   // FIG. 03 — Apparatus DS at a glance
  "forgeScreenshot",     // FIG. 04 — skill demo
  "landScreenshot",      // FIG. 05 — skill demo
  "tetherScreenshot",    // FIG. 06 — skill demo
  "parityScreenshot",    // FIG. 07 — skill demo
  "glyphScreenshot",     // FIG. 08 — plugin demo
  "sweepScreenshot",     // FIG. 09 — plugin demo
  "tokenBinderScreenshot", // FIG. 10 — plugin demo
  "workshopArtifact",    // FIG. 11 — slide / room shot / curriculum
  "beforeAfterRoundTrip", // FIG. 12 — one component round-tripped end-to-end (the §04 anchor)
] as const;
```

The page should use `<Slot>` + `<HeroSlabTrail>` exactly like `/6labs-ai`. The new instance must add `"ai-native-workflow"` to the `ProjectId` union in `components/assets/types.ts` and let the route's auto-regenerator handle the rest (already patched to camelCase: it'll emit `aiNativeWorkflowAssets` / `AiNativeWorkflowSlotId`).

---

## Open questions for the new instance to ask Ziaul (in this order)

1. **Slug** — confirm `/ai-native-workflow` or propose alternative (`/workflow`, `/claude-code-workflow`, `/building-6labs-ai`).
2. **Hero hook** — the original was *"The work and the workflow rhyme. Designing an AI product, in an AI-native workflow."* Keep it, or rewrite?
3. **Stats strip numbers** — confirm: `7 tools shipped · 4 skills · 3 plugins · N workshops run · N designers onboarded`. Which numbers can we publish?
4. **The loop diagram** — does Ziaul have a screenshot/recording of the loop running, or do we rebuild the SVG diagram (it lived in the previous version of `/6labs-ai/page.tsx` — recoverable from git)?
5. **The before/after artifact for §04** — one concrete component that round-tripped Figma↔code end-to-end. Which component? Screen recording or paired screenshots?
6. **Workshop artifacts** — slides, photos, curriculum doc, attendee count? What's publishable?
7. **What I'd do differently** — three reflections needed. Suggested candidates: (a) build Apparatus 6 months earlier, (b) ship Tether before Forge, (c) run workshops from week one. Confirm or replace.
8. **Cross-linking** — does §04 here link to `/6labs-ai`, AND should `/6labs-ai`'s callout-link be updated from `[coming soon]` to the live route?

---

## Files the new instance must read first

1. **`MEMORY.md`** (auto-loaded) — picks up the active-task pointer + all feedback memos
2. **`D:/AG_master/portfolio/projects/ai-native-workflow.md`** (this file) — the brief
3. **`D:/AG_master/portfolio/app/6labs-ai/page.tsx`** — the structural template to mirror
4. **`D:/AG_master/portfolio/app/6labs-ai/assets.ts`** — Slot manifest pattern
5. **`D:/AG_master/portfolio/app/globals.css`** — search for `/* 6labs.ai case study — page-specific styles */` (line ~4396) — that's the styling pattern to mirror under a new `cs-workflow` scope
6. **`D:/AG_master/portfolio/projects/6labs-ai.md`** — content-source reference for narrative voice / tone
7. **`D:/AG_master/portfolio/components/case-study/HeroSlabTrail.tsx`** — hero-slab component
8. **`D:/AG_master/portfolio/components/assets/Slot.tsx`** — drop-zone component

## Pattern rules locked in (from feedback memos — DO NOT re-litigate)

- Hero breadcrumb: `<span>Case 0X</span>` not `§0X`. This case study is `Case 02` if we want it sequenced after 6labs.ai, OR a different number — confirm with Ziaul.
- All CSS goes in `globals.css` scoped under `.cs-workflow`. **Do NOT use `<style jsx>`** — it silently fails on Next 16 + Turbopack.
- Tokens only: `var(--ink)` / `var(--ink-2)` / `var(--line)` / `var(--accent)` / `rgba(var(--accent-rgb), X)`. Never `rgba(127,127,127,X)` or `opacity: 0.X` for muted text.
- For every new container class, add a `.cs-workflow section.cs.inv .my-class { color: ... }` override — `globals.css`'s `.cs.inv` cascade only fires on a hardcoded child list.
- For any `<b>` / `<strong>` inside a new container on a `.cs.inv` section, add an explicit override — the global `.ctx-lede b { color: var(--ink); }` rule makes them white-on-white otherwise.
- Use `<Slot>` + `<HeroSlabTrail>` for all images. Never hand-roll a placeholder div.
- Auto-regen for assets.ts now handles hyphens / numeric prefixes via the `projectToCamel` helper — no further patching needed.

---

## Final pre-flight before the new instance starts coding

The new instance should:
1. Load memory, read this brief end-to-end, read the 6labs-ai files for pattern.
2. Confirm answers to the 8 open questions with Ziaul **in one batched message** — not drip-fed.
3. Draft the case study structure as a markdown spec (this file, expanded with locked answers) and get sign-off **before touching code**.
4. Once signed off, mirror the 6labs-ai implementation: route folder, `page.tsx`, `assets.ts`, `cs-workflow` CSS block in `globals.css`. Type-check. Verify in browser. Iterate.
