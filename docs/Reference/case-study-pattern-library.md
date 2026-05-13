# Case Study Pattern Library

Canonical layout components for portfolio case study pages. Reference this file before adding new layout classes — promote one-offs into this library rather than re-inventing.

**Source pages audited:** `float`, `nowstudio`, `6labs-ai`, `ai-native-workflow`, `bluestacks`.

---

## Foundation rules

From `feedback_case_study_layout_pattern.md` (memory).

**Spacing**
- Section-stack gap: **96px** desktop, **56px** mobile
- Card padding: **48px 44px 56px** desktop, **32/24/36** mobile
- Multi-row body grid gap: **40–56px**, padding-top from header **~40px**
- Section → signal grid margin: **~72px**

**Type hierarchy**
1. **Eyebrow** — `--font-jetbrains`, 11px, 0.16–0.18em tracking, uppercase, accent or `--ink-2`
2. **Title** — `--font-grotesk` 500, `clamp(28px, 3.4vw, 44px)`, line-height 1.08, letter-spacing -0.025em, max-width ~24ch
3. **Body** — 15px, line-height 1.7, color `--ink-2`, max-width ~56ch
4. **Conclusion / decision row** — `--ink` color, weight 600, 16px, **2px accent left rule**, 16px padding-left

**Color discipline**
- Body: `--ink-2`
- Headings / decisions: `--ink`
- Accents / eyebrows / rules: `--accent`
- **Never** use `rgba(127,127,127,X)` or `opacity:0.X` for muted text

**Mobile (≤980px)**
- All multi-col grids → 1fr
- Disable row alternation
- Tighten gaps: stack 96→56, ship-gap 48→24, card padding 48→32

---

## Naming + scoping conventions

- **Each case study wraps its content in a `cs-{slug}` div** (e.g. `<div className="cs-float">`).
- **All custom classes are namespaced** under that wrapper in `globals.css`: `.cs-float .ds-trio { … }`.
- **Page chrome classes are global** (`.hero-cs`, `.breadcrumb`, `.meta-strip`, `.sec-head`, `.next-cs`, `.cs-foot`, `.grain`) — do not re-style these per case study.
- **Figure components are global** (`.fig-block`, `.fig-head`) — used unscoped because their styling is identical across pages.
- **Body components are namespaced** when they vary (e.g. each case study can have its own `.fig-intro` adjustments under `.cs-{slug}`).
- **HMR trigger comment** in `globals.css` MUST be bumped after every CSS edit (see `feedback_portfolio_css_hmr_trigger.md`).

---

## Tier 1 — universal components

Every case study should use these.

### Page chrome (global, do not re-style)

```jsx
<div className="cs-{slug}">
  <div className="grain"></div>
  <CaseStudyChrome context="CASE STUDY · ..." />

  {/* HERO */}
  <section className="hero-cs">
    <div className="breadcrumb">…</div>
    <div className="hero-grid">
      <h1 className="hero-title">…</h1>
      <aside className="hero-side"><p className="lede">…</p></aside>
    </div>
    <div className="meta-strip">
      <div><h6>Role</h6><p>…</p></div>
      …
    </div>
    <div className="hero-slab">…</div>
  </section>

  {/* SECTIONS */}
  <section className="cs" id="…" data-reveal>
    <div className="sec-head">
      <span className="num">§01</span>
      <span className="ttl">Title with <em>accent.</em></span>
      <span>Year range or tag</span>
    </div>
    {/* body */}
  </section>

  <Link className="next-cs" href="…">…</Link>
  <footer className="cs-foot">…</footer>
</div>
```

### `ctx-lede` (universal narrative prose)

```jsx
<p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 28 }}>
  Body text here. Color = --ink-2. Line-height 1.7. Max ~62ch.
</p>
```

Used 29+ times across the four pages. The default narrative paragraph.

### `fig-intro` + `fig-block` (the figure rhythm)

The canonical pattern for "introduce the artifact, then show it." Replaces the legacy `sub-h3 + ctx-lede + art-block + bottom-caption` pattern.

```jsx
<div className="fig-intro">
  <span className="fig-intro-kicker">— 02.A / Surface name</span>
  <h3 className="fig-intro-title">Punchy title with <em>accent</em>.</h3>
  <p className="fig-intro-body">
    The why and what — full prose explaining the figure that follows.
  </p>
</div>

<div className="fig-block">
  <div className="fig-head">
    <span><b>FIG. 03</b> · Short artifact label</span>
    <span className="accent">project · context</span>
  </div>
  <Slot id="..." project="..." entry={...} aspect="16:9">
    <div className="ph-grid"></div>
    <div className="art-corner tl">CORNER LABEL</div>
    <div className="art-corner br">SUB-LABEL</div>
    <div className="ph-label">CENTER · <b>BIG LABEL</b></div>
  </Slot>
</div>
```

CSS scope: `fig-block` is global; `fig-intro` is shared via comma selector across `.cs-nowstudio, .cs-float, …` — when adding to a new case study, add the new namespace to those existing comma-separated rules in `globals.css` (~line 5810).

Variant: `.fig-intro--seamless` removes the top border + reduces top margin — use when fig-intro follows a `ctx-lede` directly.

### `fig-row` — two `fig-block`s side-by-side

Wrap two `fig-block` siblings in a `fig-row` to render them as a 1fr / 1fr grid (24px gap). Collapses to a single column under 720px. Use when two figures are tightly paired (same surface in two states, or a "this + that" comparison) and the page would otherwise feel column-heavy with two stacked blocks.

```jsx
<div className="fig-row">
  <div className="fig-block">
    <div className="fig-head">
      <span><b>FIG. 04</b> · Left artifact label</span>
      <span className="accent">left · context</span>
    </div>
    <Slot id="..." project="..." entry={...} aspect="16:10">
      <div className="ph-grid"></div>
    </Slot>
  </div>

  <div className="fig-block">
    <div className="fig-head">
      <span><b>FIG. 05</b> · Right artifact label</span>
      <span className="accent">right · context</span>
    </div>
    <Slot id="..." project="..." entry={...} aspect="16:10">
      <div className="ph-grid"></div>
    </Slot>
  </div>
</div>
```

CSS scope: global (lives in `globals.css` next to `.fig-block`). Spacing rules already account for `.fig-intro + .fig-row`, `.cs-pull + .fig-row`, `.fig-block + .fig-row`, `.fig-row + .fig-block`, `.fig-row + .fig-row` (all 36px top margin).

When **not** to use: if the two figures are conceptually separate (different surface, different era), keep them stacked — `fig-row` implies a pairing.

Currently used in: `cs-bluestacks` §02.A (FIG. 04 + 05).

---

## Tier 2 — specialised components (use as needed)

### `metrics` / `metric` — outcome tiles (closer of a case study)

```jsx
<div className="metrics">
  <div className="metric">
    <div className="mlbl">Designers using DS</div>
    <div className="mnum">5 <span className="sym">×</span></div>
    <div className="m-from"><b>From:</b> 5 designers, no shared library</div>
    <div className="mcap">Same team, now shipping against one source.</div>
  </div>
  …
</div>
```

CSS: global (`.metrics`, `.metric`, `.mlbl`, `.mnum`, `.mcap`). The `.m-from` row is a Float-introduced extension scoped to `.cs-float` — promote to global if reused.

Use for the `§Outcomes` block. 4-up grid, large numerals, baseline (`from`) row, caption.

### `reflect-grid` / `reflect-block` — retrospective grids

```jsx
<div className="reflect-grid">
  <div className="reflect-block">
    <h4><b>+</b> &nbsp; What I'd do again</h4>
    <ul><li>…</li></ul>
  </div>
  <div className="reflect-block">
    <h4><b>−</b> &nbsp; What I'd change</h4>
    <ul><li>…</li></ul>
  </div>
</div>
```

Currently scoped to `.cs-nowstudio`; should be promoted to global. Used in 6labs-ai, AI-workflow, Nowstudio.

### `ver-pair` / `ver-card` — before/after comparison

For migration / version-shift narratives (Float used it for plugin → native Variables).

```jsx
<div className="ver-pair">
  <article className="ver-card ver-card--before">
    <header className="ver-card-head">
      <span className="ver-card-tag">V · 01 — Before</span>
      <span className="ver-card-when">Mid-2023</span>
    </header>
    <h4 className="ver-card-title">…</h4>
    <p className="ver-card-body">…</p>
    <ul className="ver-card-meta"><li><span>Tooling</span><span>…</span></li></ul>
  </article>
  <div className="ver-pair-arrow">MIGRATED →</div>
  <article className="ver-card ver-card--after">…</article>
</div>
```

CSS: scoped to `.cs-float`. Promote when reused.

### `ds-trio` — three-card product/component family

```jsx
<div className="ds-trio">
  <article className="ds-trio-card">
    <div className="ds-trio-meta">— DS · 01</div>
    <h4 className="ds-trio-name">Name</h4>
    <p>…</p>
  </article>
  …
</div>
```

CSS: scoped to `.cs-float`. Promote when reused.

### `decisions` / `dec-pair` — design-decision blocks (Nowstudio rich pattern)

Heavy pattern with `.killed` / `.shipped` semantic states, side-by-side images. See `nowstudio/page.tsx`.

CSS: scoped to `.cs-nowstudio`. Promote selectively if other case studies need decision-history sections.

### `decision-card` — single-decision card (lighter pattern, Bluestacks-introduced)

For one-off honest-failure or design-decision callouts — leaner than the full Nowstudio `decisions` block.

```jsx
<article className="decision-card">
  <div className="decision-no">02.C · Decision</div>
  <h3 className="decision-title">Title with <em>accent</em>.</h3>
  <p className="decision-body">Body explaining the decision.</p>
  <p className="decision-takeaway"><b>Takeaway:</b> The lesson.</p>
</article>
```

CSS: scoped to `.cs-bluestacks`. Promote when reused.

### `workshop-grid` / `workshop-card` — process / teaching cards

```jsx
<div className="workshop-grid">
  <article className="workshop-card">
    <div className="workshop-no">Session · 01</div>
    <h4 className="workshop-title">Token workshop</h4>
    <p className="workshop-aim">What tokens are, why they matter.</p>
    <p className="workshop-body">…</p>
  </article>
  …
</div>
```

CSS: scoped to `.cs-float` (3-col grid). AI-workflow has a parallel `.workshop-block` variant — **harmonisation needed**: pick one naming convention and migrate the other.

### `flow-stack` / `flow-step` — multi-step process walkthrough (Nowstudio)

Nowstudio's 6-step publishing flow with numbered steps + image slots. Heavyweight, contextual. Adapt to reuse if needed.

### `ship-row` / `ship-meta` / `ship-caption` — alternating image+text rows

Alternating left/right text-meta column with image. Used in Nowstudio + 6labs-ai with **inconsistent scope** (Nowstudio embeds inside `fig-block`, 6labs-ai uses standalone). Unify before reusing.

### `cs-pull` — pull-quote

```jsx
<blockquote className="cs-pull">
  &ldquo;A quote that lands.&rdquo;
</blockquote>
```

CSS: scoped to `.cs-bluestacks` (Bluestacks-introduced). Promote when reused. Use sparingly — only when the quote earns its visual weight.

### `pillars` — design-principle list

Used in Nowstudio + Float. Minimal CSS. Re-use when listing principles or values.

### `signal-grid` — post-launch signal readout

Used in Nowstudio (post-launch signal section). Single-purpose layout — adapt rather than copy.

### `shipped-strip` — concrete features bar (Bluestacks)

```jsx
<div className="shipped-strip">
  <b>Shipped:</b>
  <span>Item</span>
  <span>Item</span>
</div>
```

CSS: scoped to `.cs-bluestacks`. Use under a composite figure to make the abstract concrete. Promote when reused.

---

## Tier 3 — legacy / phase-out

These appear in older Float code (Bluestacks fully migrated 2026-05-03). Replace when touching the section.

| Legacy | Replace with |
|---|---|
| `art-block` + bottom `.caption` | `fig-block` + top `.fig-head` |
| `art-quad` (1fr 1fr image grid) | `fig-block` with two `<Slot>`s, OR `ver-pair` if comparison, OR `ds-trio` if a product family |
| Inline-styled `<h3>` (clamp + marginTop) | `.fig-intro-title` inside a `.fig-intro` |
| Inline-styled `<blockquote>` | `.cs-pull` class |
| `reflect-stack` (Nowstudio variant) | `reflect-grid` (the canonical name) |
| `workshop-block` (AI-workflow variant) | `workshop-card` (the canonical name) |

---

## Application checklist (use when restructuring a case study section)

1. Wrap the page in `<div className="cs-{slug}">` if not already done.
2. Each section uses `<section className="cs" id="…" data-reveal>` + `.sec-head`.
3. For each artifact: write a `.fig-intro` (kicker + title + body) immediately followed by `.fig-block` (head + slot).
4. Replace any `art-block` / `art-quad` with the appropriate Tier 1 or Tier 2 pattern.
5. Move blockquotes to `.cs-pull`. Drop quotes that don't earn impact.
6. Add the new namespace to the comma-separated `.cs-…` selectors in `globals.css` for any Tier 1/2 components you adopt.
7. Bump the HMR trigger comment in `globals.css` after each save.
8. Verify in browser: type sizes, line-heights, breathing room match the foundation rules above.

---

## Pending consolidation work

These are debts the audit surfaced. Tackle as case study edits create the right opportunity.

1. **Promote `reflect-stack` / `reflect-card` / `reflect-list` / `reflect-item` family to global** — now used by both `.cs-nowstudio` and `.cs-bluestacks` (added 2026-05-03). Selectors are comma-separated; ready to drop the namespace prefix in the next sweep. (The older `reflect-grid` / `reflect-block` two-up pattern can be retired in the same pass.)
2. **Harmonise workshop pattern** — pick `workshop-card` OR `workshop-block`, migrate the other.
3. **Unify `ship-row` usage** — Nowstudio inline-in-`fig-block` vs. 6labs-ai standalone.
4. **Promote `decision-card` + `cs-pull` + `shipped-strip`** out of `.cs-bluestacks` scope when a second case study adopts them.
5. **Audit `ctx-lede` inline styles** — the `style={{ maxWidth: "62ch", marginBottom: 28 }}` appears throughout. Move to a class modifier.
