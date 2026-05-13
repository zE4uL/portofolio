# BlueStacks Case Study — Asset Upload Guide

Drop image / video files here. Filenames must match the slot IDs in `app/bluestacks/assets.ts`.

The case study has 28 slots. Each slot starts as `null` and renders a brutalist placeholder + dropzone in dev. To populate:
- **Easiest**: drag-drop into the slot in the running dev server (`pnpm dev`) — auto-saves here and updates `assets.ts`.
- **Manually**: drop the file here with the matching slot ID as the filename, then in `assets.ts` change the slot from `null` to `{ kind: "image", src: "/images/work/bluestacks/<slotId>.<ext>", alt: "<descriptor>", width: 1400, height: 875 }`.

## Slot inventory & upload guide

### Hero
- `coverHero` — Landscape composite of 3–4 best surfaces (App Player, BSX, Mobile App, Moments). 16:10.

### § 01 Foundations (2021–22)
- `foundationsComposite` — Collage / grid of early features: install flow before/after, full-screen / airplane mode UI, MSI co-branded splash. 16:9 or 4:3.

### § 02 Cloud Era (2022–23)
- `bsxHero` — BlueStacks X home / app store browsing surface.
- `bsxStreaming` — In-stream view: a game running in cloud player UI with controls.
- `bsxDs` — BSX design system artifact: component library, token sheet, or variant grid.
- `consoleHero` — Console Mode TV interface — game tile grid + controller HUD overlay.
- `consoleController` — Console Mode controller-mapping UI from Figma proto.
- `gameBrowser` — Single representative shot of the unshipped Game Browser experiment.

### § 03 Revenue & Craft (2023–24)
- `paymentsDualTheme` — **HERO of this chapter.** Side-by-side: same flow rendered in BlueStacks theme vs now.gg theme.
- `paymentsFlow` — Full-flow strip: 4–6 screens showing checkout entry → confirmation. (Wide aspect, 21:9.)
- `paymentsGamification` — now.gg gamification: cashback meter, nowBux balance, reward states.
- `paymentsStates` — Payments edge states: loading, success, failure, partial-pay.
- `paymentsComponents` — Component-level shot: payment method tiles, currency switchers, dual-themed primitives.
- `adsJourneyMap` — Diagram showing where ads sit across boot → home → game launch → in-game.
- `adsPanelHome` — Home screen Ads Panel surface.
- `adsFullscreen` — Fullscreen ad on game launch, or video ad placement.
- `weaponSwitchProto` — Recording (GIF/MP4) of the working Weapon Switch on Scroll prototype. Static composite OK as fallback.
- `weaponSwitchLogic` — Behind-the-scenes: conditional logic graph / variable setup in Figma.

### § 04 Moments & Mobile (2024–25)
- `momentsCapture` — In-game capture moment: Moments Mode UI overlay, the CTRL + M state.
- `momentsGallery` — Media gallery view: grid of captured clips with metadata.
- `momentsEditor` — Built-in editor: trim, resize for TikTok / YouTube Shorts.
- `momentsWeb` — Web sharing platform: public clip page, share view.
- `momentsTo6labs` — **OPTIONAL** bridge image: side-by-side / transition shot showing how Moments primitives evolved into 6labs. Slot is `hideEmpty` — page degrades gracefully if you skip this.
- `mobileHero` — Hero shot: 2–3 phone mockups of the most distinctive screens.
- `mobileDeals` — Deals / rewards UI, the value-prop screen for users.
- `mobileNowBux` — nowBux / crypto rewards flow, the differentiator.
- `mobileIterations` — Multiple versions side-by-side, the iteration story.
- `mobileDevView` — **OPTIONAL** developer-facing surface (better deals for devs via SDK). Slot is `hideEmpty`.

## Notes
- Recommended longest-edge ≥ 2400 px so retina users get crisp shots.
- The hero trail interaction picks up *any filled image slot* automatically — the more you upload, the richer the trail.
- Two slots are marked `hideEmpty`: `momentsTo6labs` and `mobileDevView`. They won't render placeholders if left null.
