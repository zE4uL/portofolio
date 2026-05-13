---
name: BlueStacks Case Study Design
date: 2026-04-26
status: approved-draft
type: case-study-spec
route: /bluestacks
position-in-selected-works: last
---

# BlueStacks Case Study — Design Spec

A multi-chapter case study covering a 4-year tenure at BlueStacks (2021–2025), structured as a chronological narrative across 4 named eras and ~9 shipped surfaces (plus 1 prototype, 1 unshipped experiment).

## 1. Overview

| Field | Value |
|---|---|
| Route | `/bluestacks` |
| Position in Selected Works | Last |
| Asset slot count | ~29 |
| Tier 1 (hero) chapters | Moments, Mobile App, Payments SDK |
| Tier 2 (supporting) chapters | BlueStacks X, Console Mode, Ads, Weapon Switch proto |
| Tier 3 (mentioned only) chapters | Sprint fixes, MSI, Game Browser |
| Special callback | Moments → 6labs origin link, also referenced from 6labs case study |

## 2. Page Architecture

Top-to-bottom flow:

1. `§ FIG. 01 OVERVIEW` — standard hero slab matching existing case studies (Float, nowstudio, Amway India). Project title, role, dates, one-line summary. Mouse-trail screen ribbon (existing interaction pattern).
2. `§ TENURE FRAME` — short opener (3 paragraphs) establishing the 4-year arc, scale numbers, and team context. Quantitative slab below it (3 big-number callouts).
3. `§ 01 FOUNDATIONS (2021–22)` — sprint fixes, small features, MSI
4. `§ 02 CLOUD ERA (2022–23)` — BlueStacks X, Console Mode, Game Browser
5. `§ 03 REVENUE & CRAFT (2023–24)` — Ads, Weapon Switch proto, Payments SDK
6. `§ 04 MOMENTS & MOBILE (2024–25)` — Moments, Mobile App. Promotion → Senior, Mar 2024.
7. `§ FIG. XX REFLECTION` — closing
8. Next-case-study CTA — back to Selected Works

## 3. Hero / Opener

**Title block:**
> **BlueStacks** — Product Designer → Senior Product Designer · 2021–2025 · India

**One-line summary:**
> Designed across the BlueStacks ecosystem for four years — from the App Player desktop emulator used by 500M+ gamers in 200+ countries, to BlueStacks X, to the company's solo Android app. Promoted to Senior in March 2024.

**Quantitative callout slab (3 cells, brutalist big-number treatment):**

| 4 YEARS | 500M+ USERS | 10 SURFACES TOUCHED |
|---|---|---|
| 2021 → 2025 across two role tiers | App Player reach across 200+ countries | desktop, cloud, TV, mobile, web, SDK |

**Tenure frame body copy (~150 words, draft direction — refine in implementation):**

> Joined as the second designer on a team led by a Principal. Started in the unglamorous middle: PM-driven sprint tickets, install-flow tuning, full-screen and airplane modes — the kind of work that compounds. By year two, the scope shifted: BlueStacks X (the company's Windows app store that put now.gg's cloud streaming in front of millions of mobile gamers), Console Mode for living-room TVs, and the design system that powered both. Year three was about revenue — ads experiments threaded through the user journey, the Payments SDK that worked across BlueStacks and now.gg without breaking either product's theme. Year four was the freest: BlueStacks Moments became the company's social layer (and quietly, the seed for what would become 6labs), and a solo-shipped Android app rounded out the tenure.

## 4. Era 01 — Foundations (2021–2022)

**Tier:** 3 (intro paragraph + 1 composite image)

**Era intro (~80 words):**
> Joined as second designer under the Principal. The first year was sprint cadence — PM tickets, data-driven micro-fixes, small features that the existing 500M+ users would feel without noticing. Plus the MSI co-branded build (App Player preinstalled on every MSI gaming PC).

**Chapters covered:**
- Sprint fixes & PM-driven tickets
- Full-screen mode, airplane mode, install flow optimization
- MSI App Player co-branded version (MSI partnership, MSI became investor)

**Slots:** 1
- `foundations_composite` — *Upload guide: collage / grid showing 3–4 of these early features (e.g., install flow before/after, full-screen mode UI, MSI co-branded splash). 16:9 or 4:3.*

## 5. Era 02 — Cloud Era (2022–2023)

### 5A. BlueStacks X (Tier 2)

**Angle:** Designed BlueStacks X as a Windows app store that integrated now.gg's cloud streaming. Did NOT design the cloud streaming infrastructure itself — designed the surfaces that put it in front of users. Also designed the BSX design system.

**Pull-quote:**
> "Built the front door for cloud gaming on Windows — the cloud part was someone else's problem."

**Slots:** 3
- `bsx_hero` — *Hero shot: BlueStacks X home / app store browsing. Light or dark — pick the one that shows the brand best.*
- `bsx_streaming` — *In-stream view: a game running in the cloud player UI, controls visible.*
- `bsx_ds` — *Design system artifact: component library page, token sheet, or variant grid from the BSX DS file.*

### 5B. Console Mode (Tier 2)

**Angle:** Same cloud tech (now.gg), different room. Mobile games on TV with native controller experience prototyped end-to-end in Figma.

**Pull-quote:**
> "Took now.gg's cloud, slapped it on a TV, made it controller-native. Living-room mobile gaming."

**Slots:** 2
- `console_hero` — *Mockup of TV interface — game tile grid, controller HUD overlay. Living-room context if you have it.*
- `console_controller` — *Controller-mapping UI / native controller experience screen from your Figma proto.*

### 5C. Game Browser (Tier 3)

**Angle:** In-product game discovery surface inside App Player. Experimental, did not ship.

**Era outro line:**
> "Also explored a Game Browser inside the App Player — an in-product discovery surface that didn't ship."

**Slots:** 1
- `game_browser` — *Single representative shot of the Game Browser experiment. Mockup or prototype screenshot.*

## 6. Era 03 — Revenue & Craft (2023–2024)

### 6A. Payments SDK + now.gg gamification (Tier 1 — hero)

**Angle:** A payments flow that had to feel native inside two products at once (BlueStacks and now.gg). The dual-theme constraint was self-proposed, not handed down. Plus gamification/cashback layers on the now.gg profile for SDK-game users.

**Pull-quote:**
> "One payments flow, two product themes — the user doesn't notice. That's the whole job."

**Slots:** 5
- `payments_dual_theme` — *Side-by-side: same flow rendered in BlueStacks theme vs now.gg theme. The hero of this chapter.*
- `payments_flow` — *Full-flow strip: 4–6 screens showing checkout from entry → confirmation.*
- `payments_gamification` — *Gamification UI on the now.gg profile — cashback meter, nowBux balance, reward states.*
- `payments_states` — *Edge states: loading, success, failure, partial-pay variations.*
- `payments_components` — *Component-level shot: payment method tiles, currency switchers, the dual-themed primitives.*

### 6B. Ads / Revenue Experiments (Tier 2)

**Angle:** Multiple ad surfaces threaded through the user journey — boot, home, in-game launch, fullscreen — without breaking the gameplay-first feel.

**Pull-quote:**
> "Six places to put an ad. Pick the ones that don't make the user hate you."

**Slots:** 3
- `ads_journey_map` — *Diagram or annotated screenshot showing where ads sit across boot → home → game launch → in-game.*
- `ads_panel_home` — *Home screen Ads Panel — the most visible surface.*
- `ads_fullscreen` — *Fullscreen ad on game launch, or video ad placement.*

### 6C. Weapon Switch on Scroll proto (Tier 2)

**Angle:** Built a fully working interactive prototype of weapon switching with scroll input, shipped on the day Figma's Conditional Prototyping launched at Config 2023. Pure craft moment.

**Pull-quote:**
> "Shipped on the day Figma launched Conditional Prototyping. No code. Just stubbornness."

**Slots:** 2
- `weapon_switch_proto` — *Recording of the working prototype in action (GIF or MP4). Static composite acceptable if no recording.*
- `weapon_switch_logic` — *Behind-the-scenes: the conditional logic graph / variable setup in Figma showing how it works.*

## 7. Era 04 — Moments & Mobile (2024–2025)

### 7A. BlueStacks Moments (Tier 1 — hero, with 6labs callback)

**Angle:** The 60-second gameplay capture mode + media gallery + web sharing platform. Frame as the seed of 6labs — explicit callback at the end of the section, mirrored from the 6labs case study.

**Pull-quote:**
> "60 seconds of gameplay, one shortcut, one shareable web link — the feature that became the backbone of 6labs."

**Slots:** 5
- `moments_capture` — *In-game capture moment — Moments Mode UI overlay, the CTRL+M moment.*
- `moments_gallery` — *Media gallery view — grid of captured clips with metadata.*
- `moments_editor` — *Built-in editor — trim, resize for TikTok/YouTube Shorts.*
- `moments_web` — *Web sharing platform — public clip page, share view.*
- `moments_to_6labs` — *Optional bridge image: side-by-side or transition shot showing how Moments primitives evolved into 6labs. Skip if not available.*

### 7B. BlueStacks Mobile App (Tier 1 — hero, post-promotion solo work)

**Angle:** Solo project after promotion. Full Android app built on now SDK with crypto + nowBux rewards. Multiple iterations.

**Pull-quote:**
> "First project after the promotion: build the entire Android app. By yourself. Multiple times."

**Slots:** 5
- `mobile_hero` — *Hero shot: 2–3 phone mockups showing the most distinctive screens.*
- `mobile_deals` — *Deals / rewards UI — the value-prop screen for users.*
- `mobile_now_bux` — *nowBux / crypto rewards flow — the differentiator.*
- `mobile_iterations` — *Multiple versions side-by-side — the iteration story.*
- `mobile_dev_view` — *Developer-facing surface (better deals for devs via SDK), if applicable.*

## 8. Reflection / Closing

**§ FIG. XX REFLECTION** — body copy direction:

> Four years at BlueStacks looked like ten different jobs stacked together. The first year was install flows and full-screen toggles — the kind of work no one frames on a wall. By year two, I was designing the front door for cloud gaming on Windows. By year four, I was solo-shipping an Android app and watching a feature I designed (Moments) quietly turn into the foundation for what became 6labs.
>
> The lesson nobody told me on day one: tenure isn't a line, it's a layered cake. You ship sprint tickets until you stop noticing them, then one day you've designed for 500 million people across desktop, cloud, TV, mobile, and the web, and someone hands you a Senior title.
>
> Things I learned the hard way: (1) the dual-theme constraint on the Payments SDK was the best constraint I ever proposed for myself — *if it works in two products at once, it works.* (2) The Weapon Switch proto I built on the day Figma launched Conditional Prototyping is still, embarrassingly, my favorite Figma file. (3) Moments shouldn't have been a side project. We knew.

## 9. Asset Manifest

**Total slots: 29**

| Era / Chapter | Slot count |
|---|---|
| Hero / opener (mouse-trail thumbnails) | 2 |
| § 01 Foundations (composite) | 1 |
| § 02 Cloud — BSX | 3 |
| § 02 Cloud — Console Mode | 2 |
| § 02 Cloud — Game Browser | 1 |
| § 03 Revenue — Payments SDK | 5 |
| § 03 Revenue — Ads | 3 |
| § 03 Revenue — Weapon Switch | 2 |
| § 04 Moments | 5 |
| § 04 Mobile App | 5 |
| **Total** | **29** |

**Asset system:**
- Follow existing `slot + AssetManifest + shadow JSON` pattern (see Float, Amway India, nowstudio).
- Manifest file: `portfolio/lib/work/bluestacks/assets.ts`.
- Each slot includes a `caption` field carrying the upload-guide text from sections 4–7 above. User uploads images manually into `portfolio/public/work/bluestacks/`.
- Register `"bluestacks"` as a new ProjectId in the asset type system (extends current Float / nowStudio / Amway India / etc.).

## 10. Routing & Integration

**New files:**
- `portfolio/app/bluestacks/page.tsx` — case study page
- `portfolio/lib/work/bluestacks/assets.ts` — asset manifest
- `portfolio/public/work/bluestacks/` — image directory (placeholders until upload)

**Modify:**
- `portfolio/lib/work.ts` — add BlueStacks entry to the case study registry, positioned **last** in Selected Works
- ProjectId type — add `"bluestacks"` literal
- Selected Works listing route (Work page) — verify BlueStacks renders as an `<a>` tag with proper routing, mirroring fix made for Amway India

**6labs case study:**
- Add a single-paragraph callback referencing Moments → 6labs origin. Sentence-level only, not a structural change.

## 11. Open Implementation Questions

1. **Game Browser image** — user has 1 slot for it. Confirm image source on upload; framing is "the experiment that didn't ship," so any representative mockup works.
2. **Weapon Switch GIF** — does a recording exist of the working prototype, or do we need a static composite fallback?
3. **`moments_to_6labs` bridge image** — optional slot. If not available at upload time, manifest gracefully degrades (slot omitted).
4. **MSI imagery** — only mentioned in the Foundations composite. If user has good MSI co-branded screenshots, the composite slot can be expanded into a 2-image MSI mini-section instead.
5. **Mouse-trail ribbon thumbnails** — which 6–8 screens from across the case study get cycled in the FIG. 01 hero ribbon? Suggest: 1 from each era + 2 spotlights (Moments hero, Payments dual-theme).

## 12. Out of Scope

- BlueStacks marketing site assets — not pulling from bluestacks.com unless user explicitly provides
- Public revenue numbers — none cited; no fabrication
- "Featured by Figma" claim for Weapon Switch — not verified, NOT used; copy says "shipped on the day it launched"
- Case-study sub-pages for individual chapters — single page, no nested routes
