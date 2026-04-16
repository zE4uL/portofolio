# Portfolio Redesign — Design Spec

**Date:** 2026-04-16
**Owner:** Ziaul Islam
**Status:** Approved, ready for implementation plan
**Target:** Senior IC + Lead product design roles at Indian product companies

---

## 1. Goal

Replace the current Framer portfolio (ziaulislam.framer.website) with a purpose-built Next.js portfolio that positions Ziaul for senior / lead product design roles. The current site reads as mid-level generalist; the new one is built to close that gap.

The new site must:
- Lead with an **AI/ML product designer** identity (supported by design-systems scale and B2B↔B2C bridging).
- Feature **deep case studies** with measurable outcomes, not link-only projects.
- Feel **interactive, playful, and memorable** (tech enthusiast + gamer + AR/VR curious) while still reading as senior-level professional work.
- Be **realistically achievable in 2 weeks** using an aggressive AI-native build workflow (Claude Code + `/ui-ux-pro-max` + `/frontend-design:frontend-design`). Target launch: **2026-04-30**.

---

## 2. Positioning decisions

- **Primary angle:** AI / ML product designer.
- **Supporting angles:** Design systems & scale (DSO @ BlueStacks/now.gg); B2B↔B2C bridge designer.
- **Target audience:** Senior IC + Lead roles at Indian product cos — Razorpay, CRED, Swiggy, Zomato, PhonePe, Postman, Atlassian-India, Adobe-India, Microsoft-India, Flipkart, Meesho, Groww, Slice, Jupiter, Zerodha, Uber-India, etc.
- **Tone:** Declarative, specific, first-person, evidence-driven. No adjective-laden "passionate about crafting." Replace with outcomes.

---

## 3. Project inventory (featured case studies)

See `D:\AG_master\portfolio\projects\INDEX.md` for full tiered inventory with open questions (metrics, NDA, screenshots) per project.

### Tier 1 — headline case studies (deep, 10–20 min reads)
1. **6labs.ai** — AI gameplay analytics platform + AI-native workflow leadership story.
2. **Float / Float Studio DS** — multi-brand DS architecture, "DSO" pseudo-title, scale.
3. **nowStudio** — multi-store game publishing platform (PC/Mac/cloud/LINE/Telegram).
4. **AI Highlights + ML-driven discovery + ad placements** — consumer ML/UX, B2B↔B2C bridging.

### Tier 2 — supporting case studies (medium, 5–10 min)
5. **Amway India app + web redesign + DS** — B2C anchor outside gaming; link to existing Behance case study.
6. **BlueStacks mobile app + cross-platform payments** — craft, commerce, cross-surface consistency.
7. **Scroll-wheel weapon-switching prototype** — Figma conditional-logic prototype-as-spec origin moment.
8. **User profile + memberships + rewards** — growth loop, B2C polish.

### Tier 3 — one-liners only (not case studies)
BlueStacks X, BlueStacks Moments, Game Console, Game Browser, Game Room. Referenced as "earlier work at BlueStacks" on homepage/resume.

---

## 4. Information architecture

```
/                         Homepage
/work                     All case studies index (grid + filter)
/work/6labs-ai            Case study
/work/float-ds            Case study
/work/nowstudio           Case study (subpage already scaffolded)
/work/ai-highlights       Case study
/work/amway-india         Case study (links to Behance)
/work/bluestacks-mobile   Case study
/work/scroll-wheel        Case study
/work/user-profile        Case study
/about                    Long-form bio + timeline + expanded "pick a card"
/playground               Micro-experiments, AI workflow demos (optional but included in v1)
```

**Top nav (sticky, minimal):** `Work` · `About` · `Playground` · `Contact` · [theme toggle] · [resume ↗]

`/resume` is a link to a hosted PDF — not a separate page.

---

## 5. Homepage structure (top → bottom)

1. **Nav** — sticky, minimal.
2. **Hero** — animated type-reveal of name + role; "press start" CTA with controller-cue animation; ambient shader field behind; XP progress bar across the top as you scroll.
3. **Marquee** — infinite loop of companies + skills (BlueStacks, now.gg, 6labs.ai, Amway India, DSO, AI/ML, Design Systems, …); reverses direction on scroll-up.
4. **Featured work** — pinned horizontal scroll through 4 Tier 1 case studies; each card has multi-layer parallax on cursor.
5. **Craft moments strip** — auto-scrolling artifacts (scroll-wheel prototype GIF, token grid, payment flow, Figma conditional demo, AI workshop slide).
6. **Supporting work** — 2x2 grid of 4 Tier 2 case studies.
7. **Pick-a-card about** — 5 fanned cards (Gamer · AI · AR/VR · Systems · Designer); click to flip, reveals a fact/photo/story for that side of you.
8. **Timeline** — scroll-drawn vertical line; reveals Alpha → Ikokas → Amway → BlueStacks/now.gg one by one as you scroll.
9. **AI workshop teaser** — "I build AI-native workflows. Here's how." Links to `/playground`.
10. **Contact + footer physics sandbox** — draggable chips (🎮, Figma, AI, DS, heart, name); gravity + collision via `matter.js`; email, LinkedIn, Behance, resume.

---

## 6. Interaction inventory (all 14 in v1)

All 14 interactions from the brainstorm are in scope. Priority order for implementation follows phase plan below.

1. Hero animated type-reveal + ambient shader field.
2. Hero "press start" CTA with controller-cue animation.
3. Custom cursor with context-aware states (default / link / card / throw).
4. Infinite marquee (companies + skills).
5. Featured work pinned horizontal scroll (GSAP ScrollTrigger).
6. Case-study card multi-layer parallax on cursor.
7. Pick-a-card personality picker in About.
8. Scroll-unlocked timeline reveal.
9. Auto-scrolling craft moments strip.
10. Terminal / Konami-code easter egg (`sudo help` or ↑↑↓↓).
11. Footer drag-throw physics sandbox (matter.js).
12. Light/dark theme toggle with sun↔moon micro-animation.
13. Page scroll progress as XP bar at top.
14. WebXR "view in AR" moment on one 3D asset (mobile).

`prefers-reduced-motion` is respected globally — all of these degrade to static equivalents.

---

## 7. Case study template

Every `/work/[slug]` page uses the same structure so all 8 cases can ship fast:

1. **Hero header** — title, tagline, year, role, company, ambient visual.
2. **TL;DR** — 3-line elevator pitch (problem · what I did · outcome).
3. **Context** — product, users, starting state. 2–3 paragraphs max.
4. **The problem** — specific framing with real quotes or data.
5. **My role** — collaborators, what you owned vs. didn't.
6. **Approach** — process visualization, 2–4 sub-sections with artifacts.
7. **Solution** — annotated final screens; called-out decisions and tradeoffs.
8. **Outcome** — quantitative metrics + qualitative wins.
9. **Reflection** — senior-level honest self-review.
10. **Next case / back to work** — inline CTA.

**Case-specific variants:**
- **6labs.ai + AI Highlights:** AI-native workflow sidebar (Claude Code + Figma round-trip).
- **Float DS:** architecture diagram section (base DS → product DSs).
- **nowStudio:** "channels shipped" visual (PC, Mac, browser, LINE, Telegram).
- **Amway:** shorter — links out to full Behance case study.

---

## 8. Visual tokens

### Color (dark-first, token-driven)
- Canvas `#0A0A0B`
- Surface `#121317`
- Surface-raised `#1A1B21`
- Text-primary `#F1F1F3`
- Text-secondary `#9EA0A8`
- Accent-primary `#7C5CFF` (violet — AI / tech signal, gamer-adjacent)
- Accent-warm `#FF7A3D` (orange — sparingly, sticker-style playful chips)
- Light theme: warm off-white `#FAFAF7` canvas, same structure mirrored

### Typography
- **Display:** Instrument Serif (italic moments; warm, editorial)
- **Body:** Geist (clean, distinctive, product-designer default)
- **Mono:** Geist Mono (chips, metadata, labels — tech-enthusiast signal)
- Loaded via `next/font/google` + `next/font/local` where needed; subset to Latin.

### Spacing scale
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px

### Radius
8 / 16 / 28 px

### Motion principles
- Default easing: `cubic-bezier(0.22, 1, 0.36, 1)` (expo.out; snappy, gamer-tempo)
- Stagger: 40ms for list reveals
- Hero intros: 700–900ms; hovers: 150–250ms
- `prefers-reduced-motion` respected globally via Framer Motion `useReducedMotion`

All tokens exported as Tailwind v4 CSS variables and mirrored in Storybook.

---

## 9. Content & voice

**Voice:** declarative, specific, first-person, evidence-driven. No "passionate about crafting delightful experiences." Replace with outcomes.

**Hero headline (LOCKED):** *"Product designer. AI-native. Also a gamer."* (Option B)

**Tagline:** *"Senior Product Designer · AI, design systems, platforms · BlueStacks / now.gg / 6labs.ai"*

**Case study hook formula:** `[What]` for `[who]`. `[Outcome metric]`. Example: *"AI-generated gameplay highlights for BlueStacks players. 2M+ shares in year one."*

---

## 10. Implementation scope

### Reuse from existing project
- Next.js 16, React 19, TypeScript, Tailwind CSS v4
- Framer Motion, GSAP, Lenis, React Three Fiber + drei + Three
- `components/SmoothScroll.tsx` (Lenis wrapper — infrastructure, not UI)
- `hooks/useHudClock.ts` if still relevant after IA pass
- Route structure convention (`/work/[slug]` pattern from existing `app/nowstudio/`)
- `/projects` directory (per-project context md files)
- `/docs/{handoff,plans,research,specs}` folder structure
- `CLAUDE.md` rules for this project

### Rebuild from scratch (UI)
Archive all existing UI under `/components/_archive/` and rebuild these components and sections using `/ui-ux-pro-max` and `/frontend-design:frontend-design` skills:
- `Nav.tsx`
- `Cursor.tsx`
- `Background3D.tsx`, `ShaderBackground.tsx`, `shaders.ts`
- `HUDFrame.tsx`, `GameObjects3D.tsx`
- All section components (`Hero`, `Work`, `About`, `AITeaser`, `Contact`)
- (`SmoothScroll.tsx` is explicitly excluded — it is reused as infrastructure.)

### New dependencies to install
- `matter-js` + `@types/matter-js` — footer physics sandbox.
- `split-type` — hero character-by-character reveal.
- `lucide-react` — icon library.
- **Storybook** (`@storybook/nextjs` + required addons) — isolated component/section development.
- Fonts via `next/font` (Inter/Geist + Instrument Serif/Fraunces + Geist/JetBrains Mono).

### Storybook setup
- Install `@storybook/nextjs` with Vite builder (or webpack if Next 16 compatibility requires it).
- One `.stories.tsx` file per component and per section; naming convention `Components/X` and `Sections/X`.
- Stories include all variants (default, hover, interaction states).
- Storybook bound to the same Tailwind / theme / fonts as the app so design matches between contexts.
- Add `pnpm storybook` or `npm run storybook` script.

### Build workflow (per component / per section / per case study)
1. Invoke `/ui-ux-pro-max` — UX planning, component inventory, heuristics.
2. Invoke `/frontend-design:frontend-design` — production-grade distinctive frontend code.
3. Build the component; wire it into Storybook with stories for each state.
4. Iterate in Claude Code + Storybook. Screenshot, refine.
5. Compose into the page route once component is stable.

### Phase plan (2-week compressed — launch 2026-04-30)

**Week 1 — Foundation + homepage + Tier 1 case study shells**
- Day 1: Archive old UI. Install new deps (matter-js, split-type, lucide-react, Storybook, fonts). Define tokens as Tailwind v4 CSS vars. Set up Storybook with Next 16 + Vite builder.
- Day 2–3: Build primitives + layout (Nav, ThemeToggle, ScrollProgress XP bar, Cursor) with Storybook stories.
- Day 3–4: Build Hero (type-reveal, press-start CTA, ambient shader), Marquee.
- Day 4–5: Build homepage sections — Pinned horizontal Featured Work, Craft strip, 2x2 supporting grid, Pick-a-card, Timeline, AI workshop teaser.
- Day 5–6: Build `CaseStudyLayout` + all sub-sections (TLDR, Context, Problem, Role, Approach, Solution, Outcome, Reflection).
- Day 6–7: Author Tier 1 case study content for 6labs.ai, Float DS, nowStudio, AI Highlights. Deploy preview on Vercel.

**Week 2 — Tier 2 case studies + signature moments + polish + launch**
- Day 8–9: Author Tier 2 cases — Amway (link to Behance), BlueStacks mobile, Scroll-wheel (embed Figma prototype recording), Profile/rewards.
- Day 10: Footer physics sandbox (matter.js). Context-aware cursor states.
- Day 11: Accessibility pass (keyboard nav, reduced-motion, contrast). SEO (OG per case, sitemap, robots.txt). Analytics (Vercel Analytics).
- Day 12: Lighthouse pass, image optimization, content polish, copy review.
- Day 13: Production deploy with custom domain. Smoke test on real devices.
- Day 14: Buffer — fixes, polish, share on LinkedIn.

**Explicitly deferred to v1.1 (post-launch):** Terminal / Konami easter egg (interaction #10), WebXR AR asset (#14). Keep both in roadmap, don't block launch on them.

---

## 11. Decisions (locked 2026-04-16)

- **Hero headline:** Option B — *"Product designer. AI-native. Also a gamer."*
- **Profile photo:** installed at `public/images/profile/ziaul.jpg`.
- **Resume:** installed at `public/resume.pdf`.
- **Amway Behance URL:** https://www.behance.net/gallery/121037207/E-commerce-platform-UX-case-study
- **NDA / publish rights:** *no restrictions* — can show anything across all projects.
- **Domain (LOCKED for v1):** `ziaul-islam.vercel.app` (free Vercel subdomain). Upgrade to custom domain post-launch if useful.
- **Case study content generation:** User has a Replit-hosted portfolio-page-generator at https://portfolio-page-generator--ziaulislam14.replit.app/ — feed per-project md files in, paste output into case study pages during Phase 2.
- **Screenshots + video:** source artwork comes from user's Figma files; production-ready videos and supporting artifacts generated with AI (Runway / Veo / image-upscale tools) during Week 2.

## 11b. Metrics strategy

Per user direction: **draft plausible metrics inline during Week 1** and annotate as `// DRAFT — verify with Ziaul`. User will edit later with real numbers before launch. Keep metrics conservative and defensible — no outlandish claims. Target ranges:
- % lifts: single-digit to mid-20s (above 30% reads suspicious unless it's a rewrite baseline).
- User counts: round figures ("~80 dev studios", "2M+ highlights generated").
- Internal-only metrics (team workshops, skills shipped) phrased as counts, not percentages.

## 11c. Pick-a-card stories (LOCKED)

Five cards for homepage/About. Each flips to reveal the story below. Tone: punchy, first-person, one-line setup + one-line punch.

1. **Gamer** — "Hyper-competitive. 400+ hours in Valorant, Diamond 2. Still mad about that last round I should've won."
2. **Athlete** — "I play to win. Badminton, FIFA, pickleball — if you can track a score, I'll find a way to track it harder."
3. **Traveller** — "I plan trips the way I plan products — research everything, then throw the plan out by day 2."
4. **Tech nerd** — "Unboxed a Vision Pro week one. Shipped a Claude Code skill week two. Currently installing something you haven't heard of."
5. **Designer** — "Shipped my first real feature by turning a Figma prototype into the spec. An engineer said 'this IS the spec.' I've designed that way ever since."

## 11d. Still-open (non-blocking)

- **Testimonials / quotes:** PM, eng, leadership quotes from BlueStacks / now.gg — collect during Week 2.
- **Press mentions:** Telegram store launch coverage + any AI Highlights press.
- **Game Room**: confirm shipping outcome. Keep as Tier 3 unless promoted.

---

## 12. Out of scope for v1

- CMS (everything lives in code / MDX).
- i18n.
- Comments, guestbook, blog.
- Case study search (filter on `/work` index is enough).
- Heavy build-time animation pipelines (Rive, Lottie) beyond simple exports if needed.
- Custom backend / API routes.

---

## 13. Success criteria

- Homepage + 4 Tier 1 case studies + 4 Tier 2 case studies live on the production domain.
- Lighthouse: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95 on mobile.
- All 14 interactions implemented and gracefully degraded with `prefers-reduced-motion`.
- Storybook covers all shared components with stories for each variant.
- Every case study has: TL;DR, problem, role, approach, solution, outcome with real metric, reflection.
- Measurable: outbound referrals from portfolio (LinkedIn profile clicks, recruiter messages citing the site) in the 4 weeks post-launch.

---

## 14. Appendix — file layout (target)

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                       # homepage composition
│   ├── work/
│   │   ├── page.tsx                   # /work index
│   │   └── [slug]/
│   │       └── page.tsx               # dynamic case study route
│   ├── about/page.tsx
│   ├── playground/page.tsx
│   └── globals.css                    # tokens as CSS vars
├── components/
│   ├── _archive/                      # old UI
│   ├── layout/                        # Nav, Footer, ThemeToggle, ScrollProgress
│   ├── hero/                          # Hero, TypeReveal, ShaderField, PressStartCTA
│   ├── cursor/                        # Cursor (context-aware)
│   ├── marquee/
│   ├── work/                          # FeaturedCarousel, WorkCard, CraftStrip, WorkGrid
│   ├── about/                         # PickACard, Timeline
│   ├── contact/                       # FooterPhysics (matter.js)
│   ├── case-study/                    # CaseStudyLayout + sections (TLDR, Context, etc.)
│   └── primitives/                    # Button, Chip, Tag, IconButton
├── hooks/                             # useHudClock.ts (existing), add useReducedMotion, useScrollProgress
├── content/                           # MDX per case study (optional)
├── projects/                          # per-project md inventory (already exists)
├── docs/
│   ├── specs/2026-04-16-portfolio-design.md  # this file
│   ├── plans/                         # will be created by writing-plans skill next
│   ├── research/
│   └── handoff/
├── public/
│   ├── resume.pdf
│   ├── images/                        # case-study artwork
│   └── og/                            # Open Graph images
├── .storybook/                        # Storybook config
└── package.json
```

---

End of spec.
