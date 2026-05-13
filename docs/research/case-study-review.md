# Case Study Review — Hiring Manager Critique

_Generated 2026-04-27 · Saved before edits applied._

This is a hiring-design-manager critique of the four case study pages — Amway India, BlueStacks, NowStudio, Float. Each is evaluated against 9 criteria a manager scans for in roughly 90 seconds: hook, role clarity, problem & constraints, process, decisions & trade-offs, outcomes, visual storytelling, density, and closing.

---

## AMWAY INDIA — `app/amway-india/page.tsx`

**Hook (§00):** ✓ Clear. "App, web, and the system that held them together" + lede explains the problem (dual surfaces, inconsistent language) in 3 seconds.

### Weaknesses

1. **Role ambiguity (lines 98–104).** "Contract UI/UX Designer" is vague. Sole lead or supporting? Meta-strip doesn't distinguish. Manager won't know if you owned the DS or were just executing screens.
2. **Process invisible (entire page).** No research phase shown. 4 pains in §01 jump directly to 3 pillars in §02. Where's the synthesis? Section "Research, personas, opportunity map" is a *placeholder* (FIG. 02 Slot) — no narrative.
3. **Decisions unmotivated (lines 250–297).** DS section lists components/patterns in a 3-column grid, but never explains *why* those components. Reads like an inventory, not a design argument.
4. **Impact absent.** Zero metrics. No time-to-ship, design debt reduced, component reuse, dev handoff time. Manager will assume nice-to-have redesign, not high-ROI work.
5. **Handoff failure buried (lines 188–193).** "I left mid-shipping" is tucked in pillar subsection under "HONEST NOTE." Critical context. Buried, it reads like hiding it. Transparency kills doubt.

### Recommendations

1. Rewrite Role line (~line 99) to specific ownership ("Lead Designer (with 1 peer)" or "Sole DS Architect"). Add a sentence in lede: "I owned the design system architecture; the app/web execution was a 2-person effort."
2. Add a research synthesis section between §01 and §02. 1–2 key insights from ABO interviews. Quote a user pain. Map directly to pillar decisions.
3. Rewrite §05 (DS section). Replace 3-column grid with narrative + one hero image. "The system I built consisted of X components across Y foundations. Here's why these three atomic primitives were sufficient: [explanation]."
4. Add an Outcomes "§07" before reflection. 3 metrics minimum. "Component reuse: 60% of subsequent screens reused DS atoms" or "Handoff clarity: reduced design-to-dev clarification questions by 40%."
5. Move handoff callout to hero-side lede. "I rolled off before full launch — here's what shipped."

---

## BLUESTACKS — `app/bluestacks/page.tsx`

**Hook (§00):** ✓ Excellent. "Four years. Ten surfaces. One tenure." + lede explains scale (500M+ users, 6 platforms, promotion arc).

### Weaknesses

1. **§00 stats slab underbaked (lines 123–140).** Three massive numbers (4 YRS, 500M+, 10) with minimal context. Manager will wonder: were *you* responsible for 500M users, or did you work *on* a 500M product? Conflates scope with ownership.
2. **Process per-era is murky (§01–§04).** Each era gets a paragraph then straight to assets. *How* did you decide to move from Foundations → Cloud Era → Revenue? Roadmap inflection? Market signal? Product strategy?
3. **Unshipped work not weighed (lines 304–313).** "Game Browser — the one that didn't ship" gets a full subsection but no learning. Why didn't it ship? Without the *why*, narrative clutter.
4. **Dual-theme Payments SDK undersold (lines 318–327).** Strongest craft decision ("I proposed it"), but blockquote + 2 images don't explain the *constraints*. Manager needs: "If it didn't feel native in both products, users would notice the seam."
5. **6labs callback feels tacked on (lines 410–415).** "This became 6labs" is a sentence-long bridge. If 6labs is real downstream work, deserves 2–3 sentences of setup.

### Recommendations

1. Rewrite §00 opener (line 124). "As the second designer, later promoted to Senior, I owned [list 3–4 key surfaces]. The tenure's shape: sprint work → cloud systems → revenue surfaces → solo mobile."
2. Add 2–3 sentences of roadmap logic before each era. "By late 2022, the cloud gaming market was heating up (now.gg partnership + 500M user base). We bet on three new surfaces."
3. Delete Game Browser or add a learning. Either "Explored but deprioritized because the feed-based discovery pattern landed in other surfaces" — or cut.
4. Expand Payments SDK decision to 2 paragraphs. ¶1: the constraint (two products, one flow, can't feel borrowed). ¶2: the move (semantic theming + shared components).
5. Add a specific line on 6labs (line 413). "The Moments media gallery and sharing infrastructure became the core primitive for 6labs — a new product spun up in 2024 using the same capture + gallery + sharing canvas."

---

## NOWSTUDIO — `app/nowstudio/page.tsx`

**Hook (§00):** ✓ Strong. "One upload, six stores, zero handoff" + lede is concrete (50+ countries, 6 storefronts, third-largest distribution).

### Weaknesses

1. **Role gets diluted across 4 years (lines 93–95).** "Lead/Sole Product Designer · 2022 → present · 4+ years." Did you design v1, v2, and v3 alone? Or hand off?
2. **Process collapses into "overhauls" (§02 timeline).** Three versions get 3 text blocks + a timeline visual. *Why* did you re-arch v2 vs v1? What user feedback drove v3? Reads as "here's what shipped" not "here's how we got there."
3. **Decisions lack tension (§03).** "DEC·01: Strip the publishing flow" — obvious good design, not a hard call. What did you *reject*? What was the counter-proposal?
4. **Metrics are strong but soft (§04).** "−35% time-to-first-publish" is quantified, but from what baseline? "60+ devs onboarded" is real but doesn't compare to market or target.
5. **Closure is weak (§06).** "What I'd do again / change" is honest but generic. "Don't wait for analytics view" is a lessons-learned truism. What's the *specific failure mode*?

### Recommendations

1. Retitle role or add a team line (line 94). Either "Lead Designer, solo design through v3" or add subsection: "v1 (2022): solo design; v2 (2023): +PM/Eng leads; v3 (2024+): lead with 1 peer designer joining."
2. Rewrite §02 preamble (lines 179–181). "Each version responded to a user signal. v1: dev friction during self-serve onboarding. v2: multi-store demand from partner integrations. v3: multi-org scaling as studios grew beyond founder-only."
3. Rewrite DEC·01 (lines 261–266). "I could have asked for all 40 fields upfront — faster data pipeline, slower dev friction. We chose lazy loading with smart defaults because drop-off at onboarding was killing conversion. Result: 65% of devs completed setup on first session vs 30% in the prior flow."
4. Recontextualize metrics (lines 446–463). Add a line above §04: "In the year before v3 shipped, we onboarded 8 net-new studios. In the 12 months post-launch..."
5. Expand closure with concrete examples (lines 566–574). "Ship analytics earlier — because devs couldn't measure post-launch ROI in v1, three studios had surprise margin loss on their biggest channel. One founder told me 'I shipped blind.'"

---

## FLOAT — `app/float/page.tsx`

**Hook (§00):** ✓ Excellent. "One parent. Four children. Same DNA" + lede positions you as the architect of a multi-product model.

### Weaknesses

1. **Governance is missing as a concept.** §05 lists "lightweight governance — discuss impact, ship," but the page never shows what governance *looks like* in practice. Who decides when a component gets promoted? What stopped bad decisions?
2. **Pre-Variables framing is dated (lines 376–377, 555–556).** By 2026, every designer has used Figma Variables. "We built tokens pre-Variables using a plugin" reads as historical context, not craft.
3. **Four children feel decorative (§04).** FIG. 07 shows four theme splits, but no comparison showing *how* inheritance saved work. "Float Studio took 4 weeks to scaffold. Because the parent was locked, Float Gameroom took 2 days."
4. **Adoption story buried (§07).** Lead-track move (architect → evangelist → DSO). Titled "Workshops, not walls" and sandwiched between decisions and related-work. Should be §05 or labeled as a separate arc.
5. **BluePrint section weakens the close (§08).** A 2024 side project in a 2023–present case study feels like scope creep. If BluePrint shows a lesson (native Variables migration, file-as-docs), make explicit.

### Recommendations

1. Add a governance section before §03. "The move that kept five designers using the same library: **one promotion rule** — components move to base only if a second product asks for it. Changes get a 5-minute discussion, no RFC committee. Outcome: low overhead, high adoption."
2. Tighten pre-Variables narrative to one sentence (~line 555). "Mid-2023, I tokenized ahead of Figma's native Variables (arriving June 2023) using a plugin, so the discipline was set before the tooling arrived." Move on.
3. Rewrite §04 preamble (lines 452–453). "Same parent, four children, four distinct outcomes: Float Studio spanned 4 weeks; Float Gameroom, thanks to the parent foundation being locked, took 2 days. That's the inheritance story."
4. Retitle §07 and promote it. Make it §05. Rename to "The Lead-Track Move: Architect → Evangelist → DSO." Show progression. "I didn't just design Float; I taught the team to extend it."
5. Either delete BluePrint or integrate it. If kept, reframe: "In 2024, I applied the Float approach to BlueStacks AppPlayer — this time with native Variables, proving the parent/child model portable."

---

## CROSS-CUTTING ISSUES

1. **Process is invisible.** All four pages jump from "problem" → "solutions" with minimal research, ideation, or synthesis shown. Add one research insight + one rejected idea per case study.
2. **Role ambiguity.** Each page blurs solo ownership vs collaborative work. Use consistent language: "Sole designer," "Lead of X, peer on Y," "Contributed to Z."
3. **Trade-offs are absent.** Every decision reads like the obvious choice in hindsight. Show the rejected alternative.
4. **Metrics cluster at the end.** Impact gets one section. Weave outcomes *into each era/section* so managers see cause → effect continuously.
5. **Narrative distance.** Each page is 2000+ lines of React. The opening 90-second hook is everything. Strengthen the hero with a one-sentence summary of: **Problem | Your move | Outcome.**

## TOP 5 EDITS WORTH DOING FIRST

1. Rewrite all five Role lines to be unambiguous.
2. Add one research sentence + one rejected idea to each case study.
3. Tighten pre-Variables narrative in Float to 1 sentence; expand governance.
4. Add baseline context to all metrics (baseline → result, not just delta).
5. Reframe Amway's "rolled off mid-shipping" as a strength — move it to hero-side.

**Bottom line:** Pages are well-written and visually solid, but *process-light* and *role-fuzzy*. Adding rigor to the first 90 seconds (hero + role clarity) and weaving in one research insight + one trade-off per case study tips the read from "solid contributor" to "systems thinker."
