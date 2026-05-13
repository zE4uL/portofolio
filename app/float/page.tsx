"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Slot } from "@/components/assets/Slot";
import { HeroSlabTrail, trailFromAssets } from "@/components/case-study/HeroSlabTrail";
import CaseStudyChrome from "@/components/case-study/CaseStudyChrome";
import { floatAssets } from "./assets";

const FLOAT_TRAIL_IMAGES = trailFromAssets(floatAssets);

export default function FloatCaseStudy() {
  useSmoothScroll();

  useEffect(() => {
    const prog = document.getElementById("scrollProg");
    const updateProg = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      if (prog) prog.style.width = p + "%";
    };
    window.addEventListener("scroll", updateProg, { passive: true });
    updateProg();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", updateProg);
      io.disconnect();
    };
  }, []);

  return (
    <div className="cs-float">
      <div className="grain"></div>

      <CaseStudyChrome
        context="CASE STUDY · 03 / 06"
        rightSlot={
          <>
            <Link href="/nowstudio" data-cursor="go">
              now Studio <span className="cs-float-menu-arrow">↗</span>
            </Link>
            <Link href="/#work" data-cursor="go">
              All Work <span className="cs-float-menu-arrow">↗</span>
            </Link>
          </>
        }
      />

      <section className="hero-cs">
        <div className="breadcrumb">
          <span>§03</span><span className="sep">/</span>
          <span>Selected Work</span><span className="sep">/</span>
          <b>Float</b><span className="sep">/</span>
          <span className="accent">2023 → Now</span>
        </div>

        <div className="hero-grid">
          <h1 className="hero-title">
            <span className="row"><span>One <em>parent.</em></span></span>
            <span className="row"><span>Four children.</span></span>
            <span className="row"><span>Same <em>DNA.</em></span></span>
          </h1>
          <aside className="hero-side">
            <p className="lede">
              <b>Float</b> is the multi-product design system behind the <em>now.gg</em> family. One base library owns the brand — color, type, spacing, icons, atom components — and four <em>child design systems</em> inherit from it: <em>Float Studio, Float Website, Float Player, and Float Gameroom.</em>
            </p>
            <p className="lede" style={{ color: "var(--ink-2)", fontSize: 14 }}>
              I architected the parent/child model, shipped the base library and three of the children solo, and walked the team through the approach so other designers could build the rest. Earned a pseudo-title{" "}
              <b style={{ color: "var(--accent)" }}>&ldquo;Design System Officer&rdquo;</b>{" "}from my Principal Designer along the way.
            </p>
          </aside>
        </div>

        <div className="meta-strip">
          <div>
            <h6>Role</h6>
            <p>Lead / Sole<br />DS Designer</p>
          </div>
          <div>
            <h6>Timeline</h6>
            <p>2023 → present<br /><b>3+ years</b></p>
          </div>
          <div>
            <h6>Consumed by</h6>
            <p>5 designers<br />4 products</p>
          </div>
          <div>
            <h6>Scope</h6>
            <p>Tokens · Atoms<br />Docs · Governance</p>
          </div>
          <div>
            <h6>Type</h6>
            <p>Multi-product DS<br />Figma · Pre-Variables</p>
          </div>
        </div>

        <div className="hero-role">
          <div className="hero-role-cell">
            <span className="hero-role-kicker">— What I owned</span>
            <p className="hero-role-text">Parent DS architecture · base library · <b>3 of 4 child libraries</b> shipped solo · onboarding + governance walk-through for the rest of the team.</p>
          </div>
          <div className="hero-role-cell">
            <span className="hero-role-kicker">— Worked with</span>
            <p className="hero-role-text">Principal Designer + product leads on <em>call-based governance</em> (no RFC). Consumed by <b>5 designers</b> across <b>4 products</b>.</p>
          </div>
        </div>

        <div className="hero-slab">
          <div className="slab-grid"></div>
          <HeroSlabTrail images={FLOAT_TRAIL_IMAGES} />
          <div className="slab-corner tl">FIG. 01 / OVERVIEW</div>
          <div className="slab-corner tr">figma · float.library</div>
          <div className="slab-corner bl">BASE FLOAT · v1</div>
          <div className="slab-corner br">● LIVE</div>
          <div className="slab-label">
            <span className="big"><em>Float</em></span>
          </div>
        </div>
      </section>

      {/* CONTEXT / BRIEF */}
      <section className="cs" id="context" data-reveal>
        <div className="sec-head">
          <span className="num">§01</span>
          <span className="ttl">The <em>brief.</em> &nbsp; What I was handed in 2023.</span>
          <span>2023 / Pre-architecture</span>
        </div>

        <div className="ctx-grid">
          <p className="ctx-lede">
            A thin, undocumented design system existed for the now.gg website. As <em>nowStudio</em> came online in parallel — light theme, B2B-dev-aimed, totally different feel — the existing DS couldn&apos;t serve both without one of them <em>compromising the brand</em> or <em>forking the system entirely.</em>
          </p>
          <div className="ctx-side">
            <dl><dt>Pain · 01</dt><dd>Existing DS was thin: components scattered across files, no token discipline, no docs.</dd></dl>
            <dl><dt>Pain · 02</dt><dd>Two products in flight (now.gg website + nowStudio), each pulling toward different design languages.</dd></dl>
            <dl><dt>Pain · 03</dt><dd>Figma had no native Variables yet (mid-2023). Token discipline meant 3rd-party plugin tooling.</dd></dl>
            <dl><dt>Pain · 04</dt><dd>No documentation, no governance — designers were copy-pasting components between files.</dd></dl>
          </div>
        </div>

        <div className="pillars">
          <div className="pillar">
            <div className="num">01 — FOUNDATION</div>
            <h4>Cement the <em>brand</em> layer</h4>
            <p>Lock down color, typography, spacing, radius, elevation and the icon set in one shared library. Everything downstream inherits from this.</p>
          </div>
          <div className="pillar">
            <div className="num">02 — ATOMS</div>
            <h4>Ship the <em>smallest</em> base</h4>
            <p>Three atoms only — button, input field, input box — with extensive variants. Resist promoting organisms into the parent until a second product needs them.</p>
          </div>
          <div className="pillar">
            <div className="num">03 — INHERITANCE</div>
            <h4>Let products keep their <em>flavor</em></h4>
            <p>Each product gets a child DS that inherits the parent and overlays its own organisms, patterns, and typography mood without forking.</p>
          </div>
          <div className="pillar">
            <div className="num">04 — EVANGELISM</div>
            <h4>Document. Train. <em>Step back.</em></h4>
            <p>In-Figma anatomy docs, internal workshops, and lead-designer feedback rounds — so other designers can spin up child DSes themselves.</p>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="cs inv" id="architecture" data-reveal>
        <div className="sec-head">
          <span className="num">§02</span>
          <span className="ttl">One parent. <em>Four children.</em> &nbsp; The architecture.</span>
          <span>The Move</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 60 }}>
          Float doesn&apos;t try to be everything. It owns the <em>brand layer</em> — the bits that must be consistent across products. The children own their <em>personality</em> — the bits that should change because the audience changes.
        </p>

        <div className="art-block" style={{ marginTop: 0 }}>
          <div className="art-block-head">
            <span><b>FIG. 02</b> · Inheritance map · Float → 4 child design systems</span>
          </div>

          <div className="inh-map">
            {/* Parent card */}
            <div className="inh-parent">
              <div className="inh-parent-tag">PARENT · BASE LIBRARY</div>
              <div className="inh-parent-name">FLOAT</div>
              <div className="inh-parent-meta">
                <span>color</span><span>type</span><span>spacing</span><span>radius</span><span>elevation</span>
              </div>
              <div className="inh-parent-meta">
                <span>100+ icons</span><span>button</span><span>input field</span><span>input box</span>
              </div>
            </div>

            {/* Connector */}
            <div className="inh-connector" aria-hidden="true">
              <span className="inh-connector-label">INHERITS ↓</span>
              <div className="inh-trunk"></div>
              <div className="inh-bar"></div>
              <div className="inh-branches">
                <span></span><span></span><span></span><span></span>
              </div>
            </div>

            {/* Children row */}
            <div className="inh-children">
              {[
                {
                  no: "CHILD · 01",
                  name: "Float Studio",
                  flavor: "light · editorial sans",
                  product: "nowStudio · game devs",
                  owner: "by me",
                  ownerKind: "self",
                },
                {
                  no: "CHILD · 02",
                  name: "Float Website",
                  flavor: "dark · fun typeface",
                  product: "now.gg · gamers",
                  owner: "",
                  ownerKind: "team",
                },
                {
                  no: "CHILD · 03",
                  name: "Float Player",
                  flavor: "dark · cloud chrome",
                  product: "now.gg cloud player",
                  owner: "",
                  ownerKind: "team",
                },
                {
                  no: "CHILD · 04",
                  name: "Float Gameroom",
                  flavor: "experimental · agile",
                  product: "Gameroom (R&D)",
                  owner: "by me · 2-day spin-up",
                  ownerKind: "self",
                },
              ].map((c) => (
                <div key={c.name} className={`inh-child inh-child--${c.ownerKind}`}>
                  <div className="inh-child-no">{c.no}</div>
                  <div className="inh-child-name">{c.name}</div>
                  <div className="inh-child-flavor">{c.flavor}</div>
                  <div className="inh-child-product">→ {c.product}</div>
                  {c.owner && <div className="inh-child-owner">{c.owner}</div>}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="inh-legend">
              <span><i className="inh-dot inh-dot--self"></i>Built by me (3)</span>
            </div>
          </div>

          <div className="caption">
            <span><b>About this:</b> the inheritance map. Parent owns the brand DNA; each child inherits and overlays its own personality without forking.</span>
            <span className="accent">3 children built by me · 2 by others using the walkthrough</span>
          </div>
        </div>

        {/* GOVERNANCE — sub-block of §02 */}
        <div className="sub-head" id="governance">
          <span className="sub-num">§02 · b</span>
          <span className="sub-ttl"><em>Governance</em> happened on a call.</span>
          <span className="sub-meta">No RFC · No doc site</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 28 }}>
          There was no governance document. A component got pushed into base when the <b>principal designer</b> and the lead designers on the <b>other now.gg products</b> agreed it should live there — a short call, an agreement, a merge. That was the whole process.
        </p>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 0 }}>
          It worked because the group was small: five designers who already talked daily. <em>Trust + proximity</em> did the work an RFC template would have done in a bigger org — and it would not scale much beyond that. I&apos;m not pitching this as a method; I&apos;m describing what actually held the system together.
        </p>
      </section>

      {/* FOUNDATIONS */}
      <section className="cs" id="foundations" data-reveal>
        <div className="sec-head">
          <span className="num">§03</span>
          <span className="ttl">The <em>foundations.</em></span>
          <span>Tokens · Icons · Anatomy</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 28 }}>
          Three things had to be true for the parent/child bet to work: one source of truth for design + dev, an icon library that scaled across products, and documentation that lived where designers already were.
        </p>

        {/* TOKENS — two-version pair (pre-native plugin → native Variables) */}
        <div className="fig-intro">
          <span className="fig-intro-kicker">— 01 / Tokens</span>
          <h3 className="fig-intro-title">No raw values. <em>Single source of truth</em> across design and dev.</h3>
          <p className="fig-intro-body">Tokens did exactly what tokens are meant to do — kill raw hex / px values, give engineering one named contract to read against. The interesting part is how they got there in two phases, before and after the platform caught up.</p>
        </div>

        <div className="ver-pair">
          <article className="ver-card ver-card--before">
            <header className="ver-card-head">
              <span className="ver-card-tag">V · 01 — Before native</span>
              <span className="ver-card-when">Mid-2023</span>
            </header>
            <h4 className="ver-card-title">Tokenized in a <em>3rd-party plugin.</em></h4>
            <p className="ver-card-body">Months before Figma shipped native Variables, I built color, type, spacing, radius, and elevation tokens through a community plugin. Components were bound to plugin-managed token names — not raw values. The discipline was in place before the platform supported it.</p>
            <ul className="ver-card-meta">
              <li><span>Tooling</span><span>Community plugin</span></li>
              <li><span>Coverage</span><span>Color · type · spacing · radius · elevation</span></li>
              <li><span>Status</span><span>File lost in migration</span></li>
            </ul>
          </article>

          <div className="ver-pair-arrow" aria-hidden="true">MIGRATED →</div>

          <article className="ver-card ver-card--after">
            <header className="ver-card-head">
              <span className="ver-card-tag">V · 02 — After native</span>
              <span className="ver-card-when">June 2023 →</span>
            </header>
            <h4 className="ver-card-title">Lifted onto <em>Figma Variables.</em></h4>
            <p className="ver-card-body">When native Variables shipped, the team moved every plugin token onto the new system. The migration itself was an order of magnitude smaller than it would have been from raw values — every component already pointed at a named token, so the swap was largely a re-binding job, not a re-design one.</p>
            <ul className="ver-card-meta">
              <li><span>Tooling</span><span>Native Figma Variables</span></li>
              <li><span>Coverage</span><span>Same five token categories, plus mode support</span></li>
              <li><span>Status</span><span>Live across all 4 children</span></li>
            </ul>
          </article>
        </div>

        <div className="fig-block" style={{ marginTop: 48 }}>
          <div className="fig-head">
            <span><b>FIG. 03</b> · Native token sheet · post-migration</span>
            <span className="accent">figma · float / variables</span>
          </div>
          <Slot id="tokenSheet" project="float" entry={floatAssets.tokenSheet} aspect="21:9">
            <div className="ph-grid"></div>
            <div className="art-corner tl">NATIVE VARIABLES</div>
            <div className="art-corner br">COLOR · TYPE · SPACING · RADIUS · ELEVATION</div>
            <div className="ph-label">POST-MIGRATION · <b>SINGLE SOURCE</b></div>
          </Slot>
        </div>

        {/* ICONS */}
        <div className="fig-intro">
          <span className="fig-intro-kicker">— 02 / Icons</span>
          <h3 className="fig-intro-title">Hand-crafted, on demand. <em>One library, four products.</em></h3>
          <p className="fig-intro-body">Icons were drawn project-by-project as features needed them — not a 500-icon dump. The result was a shared library every child DS pulled from, sized and stroke-matched to the brand, without a third-party set fighting the typography.</p>
        </div>

        <div className="fig-block">
          <div className="fig-head">
            <span><b>FIG. 04</b> · Icon set · contact-sheet view</span>
            <span className="accent">figma · float / icons</span>
          </div>
          <Slot id="iconGrid" project="float" entry={floatAssets.iconGrid} aspect="21:9">
            <div className="ph-grid"></div>
            <div className="art-corner tl">ICON LIBRARY</div>
            <div className="art-corner br">100+ COMPONENTS · BEST-RECOLLECTION</div>
            <div className="ph-label">ALL ICONS · <b>CONTACT-SHEET GRID</b></div>
          </Slot>
        </div>

        {/* COMPONENT ANATOMY */}
        <div className="fig-intro">
          <span className="fig-intro-kicker">— 03 / Anatomy</span>
          <h3 className="fig-intro-title">Documentation lived <em>inside Figma.</em></h3>
          <p className="fig-intro-body">Every base atom got an anatomy frame next to the component itself: numbered callouts, token references, light + dark variants side by side. One artifact served both designers (how to use it) and engineering (what tokens to bind to). No external doc site to keep in sync, no second source to rot.</p>
        </div>

        <div className="fig-block">
          <div className="fig-head">
            <span><b>FIG. 05</b> · Component anatomy · callouts + token references</span>
            <span className="accent">figma · float / docs</span>
          </div>
          <Slot id="inputAnatomy" project="float" entry={floatAssets.inputAnatomy} aspect="21:9">
            <div className="ph-grid"></div>
            <div className="art-corner tl">COMPONENT ANATOMY</div>
            <div className="art-corner br">CALLOUTS · TOKENS · LIGHT + DARK</div>
            <div className="ph-label">BACKGROUND · BORDER · RADIUS · VALUE · <b>LABEL</b></div>
          </Slot>
        </div>
      </section>

      {/* FOUR FACES — brand pluralism */}
      <section className="cs inv" id="theming" data-reveal>
        <div className="sec-head">
          <span className="num">§04</span>
          <span className="ttl">Four <em>faces</em> of Float.</span>
          <span>Brand pluralism · No fork</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 28 }}>
          A gamer browsing now.gg and a game dev in nowStudio shouldn&apos;t see the same product. The architecture&apos;s job was to let those two brand expressions live without one of them compromising — and without forking the system to do it.
        </p>

        <div className="fig-intro fig-intro--seamless">
          <span className="fig-intro-kicker">— What the grid actually shows</span>
          <h3 className="fig-intro-title">One <em>real outlier.</em> One <em>shared gaming line.</em></h3>
          <p className="fig-intro-body">Studio is the genuine outlier — different audience, different typeface, different mood. Website, Player, and Gameroom share the gaming-brand flavor (dark, fun typeface) and inherit it from the same parent. Gameroom adds the strongest technical proof: <b>multiple themes via tokens</b> — same components, swap the palette.</p>
        </div>

        <div className="fig-block">
          <div className="fig-head">
            <span><b>FIG. 06</b> · The four children · brand outlier + shared line</span>
            <span className="accent">screenshots from the live products</span>
          </div>
          <div className="art-hex">
            <div className="step-cell">
              <Slot id="themeSplit01" project="float" entry={floatAssets.themeSplit01} aspect="16:9">
                <div className="ph-grid"></div>
                <div className="art-corner tl">CHILD · 01 · OUTLIER</div>
                <div className="art-corner br">FLOAT STUDIO</div>
                <div className="ph-label">LIGHT · <b>EDITORIAL SANS</b></div>
              </Slot>
              <div className="step-caption">
                <div className="num">01</div>
                <div className="text">
                  <div className="title">Float Studio</div>
                  <div className="body">The genuine flavor break. Light theme, editorial sans, calm and dense — aimed at game devs publishing through nowStudio. The reason the parent/child split exists: this product couldn&apos;t share now.gg&apos;s gamer mood without compromising one of them.</div>
                </div>
              </div>
            </div>

            <div className="step-cell">
              <Slot id="themeSplit02" project="float" entry={floatAssets.themeSplit02} aspect="16:9">
                <div className="ph-grid"></div>
                <div className="art-corner tl">CHILD · 02 · GAMING LINE</div>
                <div className="art-corner br">FLOAT WEBSITE</div>
                <div className="ph-label">DARK · <b>FUN TYPEFACE</b></div>
              </Slot>
              <div className="step-caption">
                <div className="num">02</div>
                <div className="text">
                  <div className="title">Float Website</div>
                  <div className="body">The gaming-brand baseline. Dark theme, fun typeface, gamer-first. Sets the flavor that Player and Gameroom both inherit.</div>
                </div>
              </div>
            </div>

            <div className="step-cell">
              <Slot id="themeSplit03" project="float" entry={floatAssets.themeSplit03} aspect="16:9">
                <div className="ph-grid"></div>
                <div className="art-corner tl">CHILD · 03 · INHERITS WEBSITE</div>
                <div className="art-corner br">FLOAT PLAYER</div>
                <div className="ph-label">SAME FLAVOR · <b>CLOUD PLAYER</b></div>
              </Slot>
              <div className="step-caption">
                <div className="num">03</div>
                <div className="text">
                  <div className="title">Float Player</div>
                  <div className="body">The cloud player surface. Inherits Website&apos;s flavor — same dark/fun typeface — applied to a different surface. Built by another designer using the walkthrough.</div>
                </div>
              </div>
            </div>

            <div className="step-cell">
              <Slot id="themeSplit04" project="float" entry={floatAssets.themeSplit04} aspect="16:9">
                <div className="ph-grid"></div>
                <div className="art-corner tl">CHILD · 04 · MULTI-THEME</div>
                <div className="art-corner br">FLOAT GAMEROOM</div>
                <div className="ph-label">SAME FLAVOR · <b>WHITE THEME · TOKEN-DRIVEN</b></div>
              </Slot>
              <div className="step-caption">
                <div className="num">04</div>
                <div className="text">
                  <div className="title">Float Gameroom</div>
                  <div className="body">Same gaming-brand flavor as Website, but a white default theme — and the project shipped with <b>multiple theme options</b>, all driven by token swaps. This is the architecture&apos;s strongest proof: same components, just flip the palette. Foundation reuse meant <b>~2 days</b> from zero to designable.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DECISIONS */}
      <section className="cs" id="decisions" data-reveal>
        <div className="sec-head">
          <span className="num">§05</span>
          <span className="ttl">Three decisions <em>I&apos;d make again.</em></span>
          <span>Craft + reasoning</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 0 }}>
          Three calls held the architecture up — one structural, one disciplinary, one social. None of them had a clean killed alternative actively on the table at the time; they read like trade-offs in retrospect, but the day-of, they were just the choices that felt right. I&apos;m flagging that upfront so the framing stays honest.
        </p>

        <div className="decisions" style={{ marginTop: 56 }}>
          <div className="decision">
            <div className="dno">DEC · 01 — Structural</div>
            <h3>Architect <em>parent/child</em> early — even with only one product live.</h3>
            <div className="dbody">
              <p><b>The why.</b> The temptation with one product is to build a monolithic DS and split it later when the second product comes online. The split never goes well later — by then, the first product&apos;s components have absorbed assumptions that don&apos;t generalise.</p>
              <p>Cementing the parent layer first — color, type, spacing, atoms — and treating Studio as the first <em>child</em> meant Website, Player, and Gameroom dropped in without a refactor. Gameroom went from <b>0 → designable in ~2 days</b> on the inherited foundation.</p>
              <div className="quote">&ldquo;Architect once. Inherit forever.&rdquo;</div>
            </div>
          </div>

          <div className="decision">
            <div className="dno">DEC · 02 — Disciplinary</div>
            <h3>Tokenise <em>before</em> the platform makes it easy.</h3>
            <div className="dbody">
              <p><b>The why.</b> Discipline is a design decision, not a tool decision. Waiting for native Variables would have meant 6+ months of components bound to raw values — every one of which would need to be re-bound by hand later.</p>
              <p>The plugin tokens carried that discipline forward: by the time Variables shipped, every component already pointed at a named token. The migration was a re-binding job, not a re-design one — an order of magnitude smaller than starting cold.</p>
            </div>
          </div>

          <div className="decision">
            <div className="dno">DEC · 03 — Social</div>
            <h3>Governance via call, <em>not via doc</em> — for as long as the team is small.</h3>
            <div className="dbody">
              <p><b>The why.</b> The Float team is small: ~5 designers, each individually leading design on a different now.gg product. We talk daily — and that daily contact is the substrate the governance runs on. A component got pushed into base when the principal designer and the leads on the other products agreed on a call. That was the whole process.</p>
              <p>An RFC template would have added friction without buying any quality the call wasn&apos;t already delivering. Trust + proximity did the work formal governance does in bigger orgs.</p>
              <p><b>Honest caveat.</b> This works for us at our size. Past ~15 designers — or the day individual product leads stop talking weekly — the call falls over and a written process becomes the only option. I&apos;d make this same call tomorrow at our scale; I wouldn&apos;t prescribe it to a bigger team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="cs inv" id="impact" data-reveal>
        <div className="sec-head">
          <span className="num">§06</span>
          <span className="ttl"><em>Outcomes,</em> not outputs.</span>
          <span>Three years in · before / after Float</span>
        </div>

        <div className="metrics">
          <div className="metric">
            <div className="mlbl">— DESIGNERS CONSUMING</div>
            <div className="mnum">5<span className="sym">×</span></div>
            <div className="m-from"><b>From:</b> 5 designers, no shared library — copy-paste between files</div>
            <div className="mcap"><b>Why it matters:</b> same headcount, different unit of work. Drift disappeared because there was nothing to drift from.</div>
          </div>
          <div className="metric">
            <div className="mlbl">— CHILD DESIGN SYSTEMS</div>
            <div className="mnum">4<span className="sym">+1</span></div>
            <div className="m-from"><b>From:</b> 1 thin, undocumented DS for the now.gg website</div>
            <div className="mcap"><b>Why it matters:</b> two of the four children — Website and Player — were built by other designers using the walkthrough. The parent/child model passed its hands-off test.</div>
          </div>
          <div className="metric">
            <div className="mlbl">— TOKENS · PRE-VARIABLES</div>
            <div className="mnum">~100<span className="sym">⌁</span></div>
            <div className="m-from"><b>From:</b> 0 formal tokens — raw hex / px values everywhere</div>
            <div className="mcap"><b>Why it matters:</b> when native Variables shipped, every component already pointed at a name. Migration was a re-bind, not a re-design. Best-recollection count.</div>
          </div>
          <div className="metric">
            <div className="mlbl">— CHILD-DS COMPONENTS</div>
            <div className="mnum">200<span className="sym">+</span></div>
            <div className="m-from"><b>From:</b> 0 shared — each product re-built atoms locally</div>
            <div className="mcap"><b>Why it matters:</b> child products stayed in flavor without forking the parent. New designers onboard against one library, not a stack of inconsistent files. Order of magnitude.</div>
          </div>
        </div>

        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
          <div>
            <h6 style={{ fontFamily: "var(--font-jetbrains)", fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(10,10,10,0.55)", marginBottom: 16 }}>RECOGNITION</h6>
            <p style={{ fontFamily: "var(--font-grotesk)", fontSize: 24, lineHeight: 1.3, letterSpacing: "-.02em", color: "#0a0a0a", maxWidth: "36ch" }}>
              Pseudo-titled{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 300 }}>&ldquo;Design System Officer&rdquo;</em>{" "}by my Principal Designer in recognition of the Float work.
            </p>
          </div>
          <div>
            <h6 style={{ fontFamily: "var(--font-jetbrains)", fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(10,10,10,0.55)", marginBottom: 16 }}>FOR THE TEAM</h6>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(10,10,10,0.8)", maxWidth: "48ch" }}>
              A new product surface that would normally take <b>weeks</b> to scaffold visually now lands in <b style={{ color: "var(--accent)" }}>days</b> — Gameroom proved this with a 2-day foundation phase. New designers onboard against a single library instead of a stack of inconsistent files.
            </p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <div className="quote-block">
        <p className="q">The best <em>design system</em> is the one the team actually <em>uses.</em></p>
        <p className="q-attr">— pinned in the Float file</p>
      </div>

      {/* EVANGELISM — THE LEAD-TRACK NARRATIVE */}
      <section className="cs" id="evangelism" data-reveal>
        <div className="sec-head">
          <span className="num">§07</span>
          <span className="ttl">Architect &rarr; Evangelist &rarr; <em>pseudo-DSO,</em> then onward.</span>
          <span>Adoption · Workshops · Three systems after</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 28 }}>
          Designing a system isn&apos;t shipping it — <em>adoption is.</em> Three formal workshops + lead-designer feedback rounds gating every child DS launch. The proof it worked: two of the four children — Website and Player — were built by other designers using the walkthrough, not by me.
        </p>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 0, fontSize: 14, opacity: 0.78 }}>
          <b>On the title:</b> my Principal Designer / Design Manager pseudo-titled me <em>&ldquo;Design System Officer&rdquo;</em> in recognition of the work. Not an HR title change — an internal acknowledgement. I&apos;m calling it what it was.
        </p>

        <div className="fig-intro" style={{ marginTop: 72 }}>
          <span className="fig-intro-kicker">— Three workshops</span>
          <h3 className="fig-intro-title">Each workshop existed to <em>remove me</em> from a future decision.</h3>
          <p className="fig-intro-body">Tokens so the team could add a new one without breaking anything. Documentation so every new component shipped with its anatomy frame. Child-DS creation so other designers could build the next product&apos;s system without me in the room. That&apos;s the leadership move — not running the workshops, but designing them to be unnecessary later.</p>
        </div>

        <div className="workshop-grid">
          <article className="workshop-card">
            <div className="workshop-no">Session · 01</div>
            <h4 className="workshop-title">Token workshop</h4>
            <p className="workshop-aim">What tokens are, why they matter.</p>
            <p className="workshop-body">Pre-Variables, tokens were a foreign concept to most of the team. Hands-on session covering primitives, semantic aliases, and plugin tooling — everyone left able to add a token without breaking the system.</p>
          </article>

          <article className="workshop-card">
            <div className="workshop-no">Session · 02</div>
            <h4 className="workshop-title">Documentation walkthrough</h4>
            <p className="workshop-aim">The anatomy frame as standard.</p>
            <p className="workshop-body">Walked the team through the in-Figma anatomy doc pattern: numbered callouts, token references, dual variants. From then on, every new component shipped with its anatomy frame as part of the definition of done.</p>
          </article>

          <article className="workshop-card">
            <div className="workshop-no">Session · 03</div>
            <h4 className="workshop-title">Child-DS creation</h4>
            <p className="workshop-aim">So others could build the next ones.</p>
            <p className="workshop-body">The walkthrough that mattered most. After this session, two designers built Float Website and Float Player following the model — with lead-designer feedback rounds gating each launch. The architect-to-evangelist arc earned the pseudo-DSO title.</p>
          </article>
        </div>

        <div className="fig-block">
          <div className="fig-head">
            <span><b>FIG. 07</b> · Workshop / DSO moment</span>
            <span className="accent">internal · workshop</span>
          </div>
          <Slot id="workshopShot" project="float" entry={floatAssets.workshopShot} aspect="21:9">
            <div className="ph-grid"></div>
            <div className="art-corner tl">INTERNAL · DSO</div>
            <div className="art-corner br">WORKSHOPS · FEEDBACK</div>
            <div className="ph-label">PRINCIPAL DESIGNER · <b>&ldquo;Design System Officer&rdquo;</b></div>
          </Slot>
        </div>

        <div className="fig-intro" style={{ marginTop: 120 }}>
          <span className="fig-intro-kicker">— After Float</span>
          <h3 className="fig-intro-title">Many more design systems made or contributed to. <em>Here are some of my favourites.</em></h3>
          <p className="fig-intro-body">The same parent/child inheritance idea carried into systems that came after — each rebuilt against what the tools, the team, and the industry could express by then. A few stand out for what they proved the model could do.</p>
        </div>

        <div className="ds-trio">
          <div className="ds-trio-card">
            <Slot id="bluePrintDocs" project="float" entry={floatAssets.bluePrintDocs} aspect="16:9">
              <div className="ph-grid"></div>
              <div className="ph-label">BLUEPRINT · DS FILE</div>
            </Slot>
            <div className="ds-trio-body">
              <span className="ds-trio-meta">BlueStacks AppPlayer · 2024</span>
              <span className="ds-trio-name">BluePrint</span>
              <p>Native Figma Variables from day one. Two themes — <b>Windows + macOS</b> — handled through the same token tree. Same inheritance idea, now branching on platform instead of brand.</p>
            </div>
          </div>

          <div className="ds-trio-card">
            <Slot id="apparatusShot" project="float" entry={floatAssets.apparatusShot} aspect="16:9">
              <div className="ph-grid"></div>
              <div className="ph-label">APPARATUS · AI-READABLE</div>
            </Slot>
            <div className="ds-trio-body">
              <span className="ds-trio-meta">6labs.ai · 2025</span>
              <span className="ds-trio-name">Apparatus</span>
              <p>The AI-native one. Tokens, components, and anatomy structured so an <b>LLM can read the system</b> — not just designers and engineers. The audience expanded again: agents joined the team.</p>
            </div>
          </div>
        </div>

        <div className="closer-block">
          <span className="closer-kicker">— The bet, in retrospect</span>
          <h3 className="closer-title">One foundation, <em>four real products</em> — and three tool generations later, still inheriting.</h3>
          <p className="closer-body">In 2023 the bet was that brand pluralism didn&apos;t need forking — that one parent/child model could host genuinely different products on shared primitives. Float made the bet work. BluePrint and Apparatus made the <em>model</em> portable — across orgs, across surfaces, and across a tooling shift I didn&apos;t see coming. The DS file has a shelf life. The inheritance model doesn&apos;t.</p>

          <div className="closer-caveat">
            <span className="closer-caveat-label">Two things Float taught me to do every time since</span>
            <ul className="closer-caveat-list">
              <li><b>Version every system change.</b> Float discussed impact before changes but never tagged releases — &ldquo;when did X change&rdquo; had no answer in retrospect. Every system since has shipped with dated, scoped releases so the history stays readable.</li>
              <li><b>Stand up the code-side mirror with engineering on day one.</b> Figma-only tokens have a ceiling — the source of truth needs to live in code too. Apparatus carried this through end-to-end; BluePrint started catching up halfway. Float is where I learned not to wait.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* NEXT */}
      <Link className="next-cs" href="/bluestacks">
        <div className="sub">— NEXT &nbsp; <b>04 / 06</b> &nbsp; — &nbsp; BlueStacks · four years, ten surfaces</div>
        <div className="next-title">A <em>four-year tenure</em> across ten surfaces<span className="arrow">→</span></div>
      </Link>

      <footer className="cs-foot">
        <span>© ZIAUL ISLAM — 2026</span>
        <span>Float · 2023 → present</span>
        <span>Figma library · internal</span>
        <span><Link href="/">← Index</Link></span>
      </footer>
    </div>
  );
}
