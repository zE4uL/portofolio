"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import CaseStudyChrome from "@/components/case-study/CaseStudyChrome";
import { HeroSlabTrail, trailFromAssets } from "@/components/case-study/HeroSlabTrail";
import { Slot } from "@/components/assets/Slot";
import { aiNativeWorkflowAssets } from "./assets";

const TRAIL_IMAGES = trailFromAssets(aiNativeWorkflowAssets);

type Pillar = { tag: string; name: string; line: string };

const PILLARS: Pillar[] = [
  { tag: "01", name: "Variables", line: "No raw hex, anywhere. Every fill, stroke, radius, spacing value, and typography ramp lives as a token. Agents get deterministic anchors instead of guessing at colours." },
  { tag: "02", name: "Variants", line: "Full state matrix, per component. Every size × every state × every modifier — exposed as variants, not hidden in nested frames. The whole behaviour space, visible at once." },
  { tag: "03", name: "Code Connect", line: "Every Figma node points home. Code Connect maps each Figma component to its Storybook story. The agent's first move — does this exist already? — gets a reliable answer." },
  { tag: "04", name: "Storybook · MCP", line: "The live inventory. Storybook isn't a side artefact — it's the source of truth, exposed via MCP so the round-trip skills query it before either side writes a frame or a line of code." },
  { tag: "05", name: "JSDoc headers", line: "@figmaNode, @figmaUrl, @figmaPath at the top of every component file. Two halves of one component, one click apart, in either direction." },
  { tag: "06", name: "DS Compliance", line: "A skill that lints the system itself. Runs over every new design and flags raw values, off-token spacing, untagged variants. The system stays AI-readable because a skill keeps it AI-readable." },
];

type Tool = {
  no: string;
  name: string;
  kind: string;
  line: string;
  slotId:
    | "forgeScreenshot"
    | "landScreenshot"
    | "tetherScreenshot"
    | "parityScreenshot"
    | "glyphScreenshot"
    | "sweepScreenshot"
    | "tokenBinderScreenshot";
  figTag: string;
};

const SKILLS: Tool[] = [
  { no: "01", name: "Forge", kind: "code → figma", line: "Generates Figma frames from the Storybook component inventory. Reads the live MCP, matches against existing library components via @figmaComponent sync tags, and only creates new nodes for unmatched ones. Tokens, never hex.", slotId: "forgeScreenshot", figTag: "FIG. 03" },
  { no: "02", name: "Land", kind: "figma → code", line: "Implements production code from finalised Figma designs. Storybook is the single source of truth — Land queries the inventory before writing a line, reuses everything that already exists, generates only the genuinely new.", slotId: "landScreenshot", figTag: "FIG. 04" },
  { no: "03", name: "Tether", kind: "bidirectional", line: "Keeps every Figma component and its codebase counterpart linked. JSDoc headers on the code side; source-link in the component description on the Figma side. Two halves of one component, one click apart.", slotId: "tetherScreenshot", figTag: "FIG. 05" },
  { no: "04", name: "Parity", kind: "verification", line: "Visual QA — diffs rendered code against the Figma source. Compares actual screenshots, audits state coverage, checks icon parity, writes a report into docs/design-qa/. Token PASS isn't visual PASS.", slotId: "parityScreenshot", figTag: "FIG. 06" },
];

const PLUGINS: Tool[] = [
  { no: "01", name: "Glyph", kind: "icon library", line: "Flattens icon paths into outlined glyphs — strokes become fills. The set stays consistent across every screen and surface.", slotId: "glyphScreenshot", figTag: "FIG. 07" },
  { no: "02", name: "Sweep", kind: "library hygiene", line: "Bulk-moves components between pages without breaking instances. Library reorganisations stop being a multi-day chore and become a single click.", slotId: "sweepScreenshot", figTag: "FIG. 08" },
  { no: "03", name: "Token Binder", kind: "tokens", line: "Binds remote design-system variables to layer properties at scale. The plugin I wished existed before I built it.", slotId: "tokenBinderScreenshot", figTag: "FIG. 09" },
];

export default function AiNativeWorkflowCaseStudy() {
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
    <div className="cs-workflow">
      <div className="grain"></div>

      <CaseStudyChrome context="CASE STUDY · WORKFLOW · AI-NATIVE" />

      {/* HERO */}
      <section className="hero-cs">
        <div className="breadcrumb">
          <span>Case 02</span><span className="sep">/</span>
          <span>Selected Work</span><span className="sep">/</span>
          <b>AI-Native Workflow</b><span className="sep">/</span>
          <span className="accent">2025 → NOW</span>
        </div>

        <div className="hero-grid">
          <h1 className="hero-title">
            <span className="row"><span>An AI workflow</span></span>
            <span className="row"><span><em>that actually</em></span></span>
            <span className="row"><span>works.</span></span>
          </h1>
          <aside className="hero-side">
            <p className="lede">
              Most agentic design pipelines produce <em>slop.</em> This one shipped a product, because the design system was retooled to be readable by both humans and agents, and the Figma↔code round-trip became the default — not the exception.
            </p>
            <p className="lede" style={{ marginTop: 16, opacity: 0.78 }}>
              <b>Four Claude Code skills, three Figma plugins, three workshops.</b> Built solo, taught to the team, used daily.
            </p>
          </aside>
        </div>

        <div className="meta-strip">
          <div>
            <h6>Role</h6>
            <p>Sole designer<br /><b>workflow architect</b></p>
          </div>
          <div>
            <h6>Timeline</h6>
            <p>2025 → present<br /><b>in flight</b></p>
          </div>
          <div>
            <h6>Stack</h6>
            <p>Claude Code · Figma MCP<br /><b>Storybook</b></p>
          </div>
          <div>
            <h6>Surface</h6>
            <p>4 skills · 3 plugins<br /><b>3 workshops</b></p>
          </div>
          <div>
            <h6>Audience</h6>
            <p>Design · PM · Dev · QA<br />across 6labs</p>
          </div>
        </div>

        <div className="hero-role">
          <div className="hero-role-cell">
            <span className="hero-role-kicker">— What I owned</span>
            <p className="hero-role-text"><b>4 Claude Code skills + 3 Figma plugins + 3 internal workshops</b> — built solo, end-to-end. The Figma↔code round-trip became the team default.</p>
          </div>
          <div className="hero-role-cell">
            <span className="hero-role-kicker">— Worked with</span>
            <p className="hero-role-text">6labs design + PM + dev + QA — <em>taught the loop, didn&apos;t hand it off</em>. The skills stuck because the team was in the room while they were built.</p>
          </div>
        </div>

        <div className="hero-slab">
          <div className="slab-grid"></div>
          <HeroSlabTrail images={TRAIL_IMAGES} />
          <div className="slab-corner tl">FIG. 01 / THE LOOP</div>
          <div className="slab-corner tr">figma ↔ code · round-trip</div>
          <div className="slab-corner bl">2025 — NOW</div>
          <div className="slab-corner br">● 4 SKILLS · 3 PLUGINS</div>
          <div className="slab-label">
            <span className="big"><em>round-trip.</em></span>
          </div>
        </div>
      </section>

      {/* § 00 — STATS */}
      <section className="cs" id="stats" data-reveal>
        <div className="sec-head">
          <span className="num">§00</span>
          <span className="ttl">Where it stands, <em>today.</em></span>
          <span>workflow · 2026 Q2</span>
        </div>

        <div className="stats-grid stats-4">
          <div className="stat-block">
            <h4 className="stat-num">4</h4>
            <p className="stat-label">Claude Code skills shipped</p>
            <p className="stat-sub">Forge, Land, Tether, Parity. The four named operations of the round-trip — code → figma, figma → code, the link between them, and the visual diff that verifies it.</p>
          </div>
          <div className="stat-block">
            <h4 className="stat-num">3</h4>
            <p className="stat-label">Figma plugins shipped</p>
            <p className="stat-sub">Glyph, Sweep, Token Binder. Sharp tools that solve specific repetitive work the round-trip skills don&apos;t cover. Each one I wished existed before I built it.</p>
          </div>
          <div className="stat-block">
            <h4 className="stat-num">3</h4>
            <p className="stat-label">Internal workshops run</p>
            <p className="stat-sub">Two with the design team, one with the full 6labs team — PMs, devs and QA included. Live walkthrough of the round-trip, end to end, in under ten minutes.</p>
          </div>
          <div className="stat-block">
            <h4 className="stat-num">10</h4>
            <p className="stat-label">People on the round-trip</p>
            <p className="stat-sub">Designers, PMs, devs and QA — running daily through the same Figma↔code loop. The workflow stopped being mine the moment the team had their own Claude Code setups pinned to the repo.</p>
          </div>
        </div>
      </section>

      {/* § 01 — SETUP */}
      <section className="cs inv" id="setup" data-reveal>
        <div className="sec-head">
          <span className="num">§01</span>
          <span className="ttl">AI tools were <em>everywhere.</em> The work wasn&apos;t.</span>
          <span>setup</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 20 }}>
          Mid-2024 onwards, every designer I knew &ldquo;used AI.&rdquo; Faster mocks, prettier copy, the occasional generated component. Acceleration, mostly.
        </p>
        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 20 }}>
          The bet I wanted to make was different: <b>AI as a teammate, not a tool.</b> Not faster Figma — a workflow where the design moves through real code and back, with an agent doing most of the carry.
        </p>
        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 20 }}>
          That bet only pays off if the substrate is right. A handoff-shaped workflow stays handoff-shaped no matter how clever the model is. The work had to change shape, not just speed up.
        </p>
        <p className="ctx-lede" style={{ maxWidth: "72ch" }}>
          So the design question came before the tooling: <em>what does a design system have to look like, for an agent to actually be useful inside it?</em>
        </p>
      </section>

      {/* § 02 — FRAMING */}
      <section className="cs" id="framing" data-reveal>
        <div className="sec-head">
          <span className="num">§02</span>
          <span className="ttl">The <em>substrate</em> problem.</span>
          <span>framing</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 28 }}>
          Agentic workflows produce slop almost everywhere — except where the design system itself is legible to both humans and agents. The honest sequence wasn&apos;t a master plan. It was a real-time adaptation:
        </p>

        <div className="framing-grid">
          <div className="framing-block">
            <div className="framing-tag">Q1 · THE SLOP PROBLEM</div>
            <h4 className="framing-head">Why do most AI design pipelines <em>fail?</em></h4>
            <p>Because the model is asked to read raw values, ad-hoc structure, and undocumented conventions — and produce production-grade work from that. It can&apos;t. Slop in, slop out.</p>
          </div>
          <div className="framing-block">
            <div className="framing-tag">Q2 · THE SUBSTRATE ANSWER</div>
            <h4 className="framing-head">What makes an agent <em>productive</em> inside a design system?</h4>
            <p>Tokens instead of hex. Variants instead of nested frames. A live inventory it can query. Source-of-truth links in both directions. The system has to be <em>readable</em> — by both sides.</p>
          </div>
          <div className="framing-block">
            <div className="framing-tag">Q3 · THE RETROFIT</div>
            <h4 className="framing-head">When did this <em>actually</em> become possible?</h4>
            <p>When Figma MCP shipped. The design system already existed; we rebuilt it to be agent-legible on top. Apparatus first, MCP second, the round-trip third. Not a master plan — an adaptation.</p>
          </div>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginTop: 36, marginBottom: 16 }}>
          Two principles that fell out of this framing and shaped everything that followed:
        </p>

        <ul className="constraint-list">
          <li>
            <b>Tokens are an agent&apos;s grammar.</b> Without them, the model is guessing. With them, it&apos;s composing.
          </li>
          <li>
            <b>Storybook is the source of truth — for both sides.</b> Code is canonical, Figma mirrors it. Skip that and the loop will not close.
          </li>
        </ul>
      </section>

      {/* § 03 — THE MOVES (centerpiece) */}
      <section className="cs inv" id="moves" data-reveal>
        <div className="sec-head">
          <span className="num">§03</span>
          <span className="ttl">The system, the loop, the <em>tools.</em></span>
          <span>the moves</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 56 }}>
          Three layers, built in sequence. The system was retooled first — a year of audit and rework. Then the round-trip skills sat on top. Then the plugins covered the gaps. Workshops carried it across the team.
        </p>

        {/* (a) PILLARS */}
        <div className="sub-block">
          <span className="sub-index">A · System</span>
          <h3 className="sub-head">The system, retooled <em>for agents.</em></h3>
          <p className="sub-lede">Six pillars — the prerequisites that turn raw model output into shipping work.</p>
          <div className="pillars-grid">
            {PILLARS.map((p) => (
              <div key={p.tag} className="pillar-card">
                <div className="pillar-tag">{p.tag}</div>
                <h4 className="pillar-name">{p.name}</h4>
                <p className="pillar-line">{p.line}</p>
              </div>
            ))}
          </div>
        </div>

        {/* (b) THE LOOP — INLINE SVG */}
        <div className="sub-block">
          <span className="sub-index">B · Loop</span>
          <h3 className="sub-head">The loop, <em>inside the product cycle.</em></h3>
          <p className="sub-lede">A feature flows brief → round-trip → parity → ship, and pilot feedback re-enters the next brief. The round-trip is where the design system breathes — <b>Forge</b> writes Figma from code, <b>Land</b> writes code from Figma, <b>Tether</b> keeps them linked. <b>Parity</b> is the gate before ship.</p>

          <div className="loop-diagram">
            <svg viewBox="0 0 1140 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Product cycle with round-trip embedded">
              <defs>
                <marker id="arrow-ink" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 Z" className="arrow-head-ink" />
                </marker>
                <marker id="arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 Z" className="arrow-head-accent" />
                </marker>
                <marker id="arrow-feedback" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 Z" className="arrow-head-accent" />
                </marker>
              </defs>

              {/* TITLE */}
              <text className="cycle-title" x="570" y="28" textAnchor="middle">PRODUCT CYCLE — A FEATURE&apos;S JOURNEY THROUGH THE LOOP</text>

              {/* STAGE 01 — BRIEF */}
              <rect className="cycle-stage" x="30" y="60" width="170" height="200" />
              <text className="cycle-stage-tag" x="46" y="86">STAGE · 01</text>
              <text className="cycle-stage-name" x="46" y="128">BRIEF</text>
              <text className="cycle-stage-line" x="46" y="170">leadership idea</text>
              <text className="cycle-stage-line" x="46" y="192">→ dev pain</text>
              <text className="cycle-stage-line" x="46" y="214">→ feature concept</text>

              {/* arrow BRIEF → ROUND-TRIP */}
              <line className="cycle-arrow" x1="206" y1="160" x2="232" y2="160" markerEnd="url(#arrow-ink)" />

              {/* STAGE 02 — ROUND-TRIP (wider, contains internals) */}
              <rect className="cycle-stage cycle-stage-roundtrip" x="238" y="60" width="520" height="200" />
              <text className="cycle-stage-tag" x="254" y="86">STAGE · 02 · ROUND-TRIP</text>

              {/* CODE mini-pillar */}
              <rect className="loop-pillar loop-pillar-code" x="258" y="100" width="170" height="130" />
              <text className="loop-pillar-tag loop-pillar-tag-code" x="272" y="120">PILLAR · 01</text>
              <text className="loop-pillar-name loop-pillar-name-code" x="272" y="170">CODE</text>
              <text className="loop-pillar-foot loop-pillar-foot-code" x="272" y="216">canonical</text>

              {/* FIGMA mini-pillar */}
              <rect className="loop-pillar loop-pillar-figma" x="568" y="100" width="170" height="130" />
              <text className="loop-pillar-tag loop-pillar-tag-figma" x="582" y="120">PILLAR · 02</text>
              <text className="loop-pillar-name loop-pillar-name-figma" x="582" y="170">FIGMA</text>
              <text className="loop-pillar-foot loop-pillar-foot-figma" x="582" y="216">mirror</text>

              {/* FORGE — code → figma (top) */}
              <line className="loop-arrow loop-arrow-ink" x1="428" y1="124" x2="568" y2="124" markerEnd="url(#arrow-ink)" />
              <text className="loop-arrow-label" x="498" y="116" textAnchor="middle">01 · FORGE</text>

              {/* TETHER — centered between Forge and Land */}
              <line className="loop-tether" x1="498" y1="132" x2="498" y2="155" />
              <text className="loop-tether-label" x="498" y="167" textAnchor="middle">03 · TETHER</text>
              <line className="loop-tether" x1="498" y1="173" x2="498" y2="196" />

              {/* LAND — figma → code (bottom, accent) */}
              <line className="loop-arrow loop-arrow-accent" x1="568" y1="206" x2="428" y2="206" markerEnd="url(#arrow-accent)" />
              <text className="loop-arrow-label loop-arrow-label-accent" x="498" y="222" textAnchor="middle">02 · LAND</text>

              {/* arrow ROUND-TRIP → PARITY */}
              <line className="cycle-arrow" x1="764" y1="160" x2="790" y2="160" markerEnd="url(#arrow-ink)" />

              {/* STAGE 03 — PARITY */}
              <rect className="cycle-stage" x="796" y="60" width="160" height="200" />
              <text className="cycle-stage-tag" x="812" y="86">STAGE · 03</text>
              <text className="cycle-stage-name" x="812" y="128">PARITY</text>
              <text className="cycle-stage-line" x="812" y="170">visual diff</text>
              <text className="cycle-stage-line" x="812" y="192">code vs figma</text>
              <text className="cycle-stage-line" x="812" y="214">before ship</text>

              {/* arrow PARITY → SHIP */}
              <line className="cycle-arrow" x1="962" y1="160" x2="988" y2="160" markerEnd="url(#arrow-ink)" />

              {/* STAGE 04 — SHIP */}
              <rect className="cycle-stage cycle-stage-ship" x="994" y="60" width="116" height="200" />
              <circle className="cycle-ship-pulse" cx="1096" cy="76" r="4" />
              <text className="cycle-stage-tag cycle-stage-tag-ship" x="1010" y="86">STAGE · 04</text>
              <text className="cycle-stage-name cycle-stage-name-ship" x="1010" y="128">SHIP</text>
              <text className="cycle-stage-line cycle-stage-line-ship" x="1010" y="170">live</text>
              <text className="cycle-stage-line cycle-stage-line-ship" x="1010" y="192">in pilot</text>

              {/* FEEDBACK ARC — SHIP back to BRIEF */}
              <path
                className="cycle-feedback"
                d="M 1052 260 C 1052 380, 115 380, 115 260"
                markerEnd="url(#arrow-feedback)"
              />
              <text className="cycle-feedback-label" x="570" y="408" textAnchor="middle">LEARN — pilot feedback re-enters the next brief</text>

              {/* corner tags */}
              <text className="loop-corner" x="30" y="446">FIG. 02 / PRODUCT-CYCLE LOOP</text>
              <text className="loop-corner loop-corner-right" x="1110" y="446" textAnchor="end">4 stages · 4 named operations</text>
            </svg>
          </div>
        </div>

        {/* (c) TOOL INVENTORY — 4 SKILLS */}
        <div className="sub-block">
          <span className="sub-index">C · Inventory</span>
          <h3 className="sub-head">Four skills, <em>three plugins.</em></h3>
          <p className="sub-lede">The skills run inside Claude Code; the plugins run inside Figma. Each one started as a sharp annoyance during real product work — <em>&ldquo;I keep doing this by hand&rdquo;</em> — and became a tool I reach for daily.</p>

          <div className="tool-section-tag">SKILLS · CLAUDE CODE</div>
          <div className="tool-grid tool-grid-4">
            {SKILLS.map((t) => (
              <article key={t.no} className="tool-card">
                <header className="tool-head">
                  <span className="tool-no">{t.no}</span>
                  <span className="tool-kind">{t.kind}</span>
                </header>
                <h4 className="tool-name">{t.name}</h4>
                <Slot id={t.slotId} project="ai-native-workflow" entry={aiNativeWorkflowAssets[t.slotId]} aspect="1:1" className="placeholder-tool">
                  <div className="placeholder-grid-bg"></div>
                  <div className="placeholder-tag">{t.figTag}</div>
                  <div className="placeholder-label">{t.name}</div>
                  <div className="placeholder-status">DROP IMAGE HERE</div>
                </Slot>
                <p className="tool-line">{t.line}</p>
              </article>
            ))}
          </div>

          <div className="tool-section-tag tool-section-tag-second">PLUGINS · FIGMA</div>
          <div className="tool-grid tool-grid-3">
            {PLUGINS.map((t) => (
              <article key={t.no} className="tool-card">
                <header className="tool-head">
                  <span className="tool-no">{t.no}</span>
                  <span className="tool-kind">{t.kind}</span>
                </header>
                <h4 className="tool-name">{t.name}</h4>
                <Slot id={t.slotId} project="ai-native-workflow" entry={aiNativeWorkflowAssets[t.slotId]} aspect="1:1" className="placeholder-tool">
                  <div className="placeholder-grid-bg"></div>
                  <div className="placeholder-tag">{t.figTag}</div>
                  <div className="placeholder-label">{t.name}</div>
                  <div className="placeholder-status">DROP IMAGE HERE</div>
                </Slot>
                <p className="tool-line">{t.line}</p>
              </article>
            ))}
          </div>
        </div>

        {/* (d) WORKSHOPS */}
        <div className="sub-block">
          <span className="sub-index">D · Adoption</span>
          <h3 className="sub-head">Carrying it <em>across the team.</em></h3>
          <p className="sub-lede">The skills only matter if other people use them. Three workshops, run over Google Meet, with three different audiences.</p>

          <div className="workshop-quote">
            <p>
              &ldquo;Move the artifact toward the user &mdash; and let AI carry the work that used to be handoff.&rdquo;
            </p>
            <span>&mdash; from the AI-native workflow pitch, run with PMs, devs and QA on the 6labs team.</span>
          </div>

          <div className="workshop-grid">
            <div className="workshop-block">
              <div className="workshop-tag">W1 · DESIGN TEAM</div>
              <h4 className="workshop-head">The round-trip, end to end.</h4>
              <p>Live: Forge → Land → Tether → Parity, in under ten minutes. Designers leave with a working Claude Code setup pinned to the repo and the four skills installed.</p>
            </div>
            <div className="workshop-block">
              <div className="workshop-tag">W2 · DESIGN TEAM</div>
              <h4 className="workshop-head">Building your first plugin.</h4>
              <p>Pair-build a Figma plugin from a real annoyance. Most participants leave with a first plugin idea — usually the thing they were going to do by hand tomorrow.</p>
            </div>
            <div className="workshop-block">
              <div className="workshop-tag">W3 · 6LABS · ALL FUNCTIONS</div>
              <h4 className="workshop-head">An AI-native workflow, for the whole team.</h4>
              <p>The pitch run with PMs, devs and QA: the five workflow patterns, the substrate prerequisites, the adoption roadmap. The round-trip stopped being a design-team thing.</p>
            </div>
          </div>

          <Slot id="workshopArtifact" project="ai-native-workflow" entry={aiNativeWorkflowAssets.workshopArtifact} aspect="21:9" className="placeholder-iter placeholder-workshop">
            <div className="placeholder-grid-bg"></div>
            <div className="placeholder-tag">FIG. 10</div>
            <div className="placeholder-label">Workshop pitch — &ldquo;From Figma to code, from designer to builder.&rdquo;</div>
            <div className="placeholder-status">DROP IMAGE HERE</div>
          </Slot>
        </div>
      </section>

      {/* § 04 — WHAT SHIPPED */}
      <section className="cs" id="shipped" data-reveal>
        <div className="sec-head">
          <span className="num">§04</span>
          <span className="ttl">6labs.ai, <em>built this way.</em></span>
          <span>what shipped</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 32 }}>
          The product 6labs.ai was designed and shipped through this loop. The clearest evidence is one component that travelled the full round-trip — <b>Barista,</b> the assistant that proposes the question. Concept first written as HTML, brought into Figma through Forge, then implemented into the 6labs frontend through Land.
        </p>

        <div className="roundtrip-stack">
          <div className="roundtrip-row">
            <Slot id="baristaFigmaToCode" project="ai-native-workflow" entry={aiNativeWorkflowAssets.baristaFigmaToCode} aspect="21:9" className="placeholder-ship">
              <div className="placeholder-grid-bg"></div>
              <div className="placeholder-tag">FIG. 11A</div>
              <div className="placeholder-label">HTML → Figma · Forge</div>
              <div className="placeholder-status">DROP IMAGE HERE</div>
            </Slot>
            <div className="roundtrip-meta">
              <div className="roundtrip-leg">LEG 01 · code → figma</div>
              <h4 className="roundtrip-title">Barista as HTML, lifted into Figma.</h4>
              <p className="roundtrip-caption">The first cut of Barista was written as HTML — a quick agent-assisted concept to feel the shape of the interaction. Forge then read the Storybook inventory and rebuilt it as a Figma frame using DS variables, variants and Code-Connected components.</p>
            </div>
          </div>

          <div className="roundtrip-row">
            <Slot id="baristaCodeToFrontend" project="ai-native-workflow" entry={aiNativeWorkflowAssets.baristaCodeToFrontend} aspect="21:9" className="placeholder-ship">
              <div className="placeholder-grid-bg"></div>
              <div className="placeholder-tag">FIG. 11B</div>
              <div className="placeholder-label">Figma → 6labs frontend · Land</div>
              <div className="placeholder-status">DROP IMAGE HERE</div>
            </Slot>
            <div className="roundtrip-meta">
              <div className="roundtrip-leg">LEG 02 · figma → code</div>
              <h4 className="roundtrip-title">Barista as the live 6labs surface.</h4>
              <p className="roundtrip-caption">After design refinement, Land queried the Storybook inventory, reused the components that already existed, and only wrote new code for the genuinely new pieces. What landed in the 6labs frontend was a 1:1 of the Figma source.</p>
            </div>
          </div>
        </div>

        <Link className="callout-card" href="/6labs-ai">
          <div className="callout-card-meta">
            <span className="callout-card-tag">CASE 01 · COMPANION</span>
            <h4 className="callout-card-title">6labs.ai — the product this workflow shipped.</h4>
            <p className="callout-card-line">A 4-agent AI platform for game studios. Now serving 12 studios in active pilot. <em>Read the product story →</em></p>
          </div>
        </Link>
      </section>

      {/* § 05 — OUTCOMES (synthesized from existing evidence — no fabrication) */}
      <section className="cs inv" id="outcomes" data-reveal>
        <div className="sec-head">
          <span className="num">§05</span>
          <span className="ttl">What the loop <em>actually produced.</em></span>
          <span>outcomes</span>
        </div>

        <div className="outcomes-stack">
          <article className="outcome-card">
            <div className="outcome-head">
              <span className="outcome-kicker">Product shipped through the loop</span>
            </div>
            <div className="outcome-metric">
              <span className="metric-from">a manifesto</span>
              <span className="metric-arrow">→</span>
              <span className="metric-to"><b>4 agents shipped, <em>12 studios</em> in active pilot</b></span>
            </div>
            <p className="outcome-body">
              <b>6labs.ai</b> — the 4-agent AI platform companion to this case study — was designed and shipped through the round-trip. Not a theoretical workflow; a real product, live, with paying users in <b>US, Japan, and Korea</b>. <em>The pipeline produced a product, not slop.</em>
            </p>
          </article>

          <article className="outcome-card">
            <div className="outcome-head">
              <span className="outcome-kicker">A traceable round-trip in production</span>
            </div>
            <div className="outcome-metric">
              <span className="metric-from">HTML concept</span>
              <span className="metric-arrow">→</span>
              <span className="metric-to"><b>Figma</b> <em>→</em> <b>live 6labs frontend</b></span>
            </div>
            <p className="outcome-body">
              <b>Barista</b> — the assistant that proposes the question — is the first component to travel the full loop end-to-end. HTML concept lifted into Figma via <b>Forge</b>, refined as a DS-bound component, then implemented in the 6labs frontend via <b>Land</b> with <em>1:1 visual parity</em>. The round-trip isn&apos;t a pitch deck — it&apos;s a commit history. (See <em>§04 · FIG. 11A / 11B</em>.)
            </p>
          </article>

          <article className="outcome-card">
            <div className="outcome-head">
              <span className="outcome-kicker">The team adopted the loop, daily</span>
            </div>
            <div className="outcome-metric">
              <span className="metric-from">my workflow</span>
              <span className="metric-arrow">→</span>
              <span className="metric-to"><b>10 people</b> across <em>design, PM, dev, QA</em></span>
            </div>
            <p className="outcome-body">
              Three workshops (W1–W3) landed the round-trip across functions. Designers, PMs, devs and QA now run the same Figma↔code loop daily, with their own Claude Code setups pinned to the repo. <em>The workflow stopped being mine the moment the team had the keys.</em>
            </p>
          </article>
        </div>

      </section>

      {/* § 06 — REFLECTION */}
      <section className="cs" id="reflection" data-reveal>
        <div className="sec-head">
          <span className="num">§06</span>
          <span className="ttl">What I&apos;d do <em>differently.</em></span>
          <span>reflection</span>
        </div>

        <div className="reflect-grid reflect-3">
          <div className="reflect-block">
            <span className="reflect-eyebrow">01 · Workshops, earlier</span>
            <h4>Run more workshops, with devs and QA from <em>week one.</em></h4>
            <p>The workshops happened, but later than they should have. Earlier sessions with devs and QA would have surfaced what they actually need from each skill, and let me lock a workflow where every function — design, PM, dev, QA — has a defined role and ownership in the loop. Build with the team, not for them.</p>
          </div>
          <div className="reflect-block">
            <span className="reflect-eyebrow">02 · Tokens from day one</span>
            <h4>Rebuild the design system on a 3-tier token model on <em>day one.</em></h4>
            <p>Apparatus existed before the AI-readability work. Retrofitting it into a primitive → semantic → component token model cost real time. A proper 3-tier token system from the start would have made the system agent-legible from the first frame, instead of after a year of careful rework.</p>
          </div>
          <div className="reflect-block">
            <span className="reflect-eyebrow">03 · Numbers from sprint one</span>
            <h4>Track numbers from <em>the first sprint.</em></h4>
            <p>I have the conviction that the round-trip is faster, tighter, less defect-prone. I don&apos;t have the data — round-trip cycle counts, time-to-implement deltas, QA defect rates pre/post. With those numbers in hand, the company-wide pitch becomes a much louder one.</p>
          </div>
        </div>
      </section>

      {/* NEXT CASE STUDY */}
      <Link className="next-cs" href="/nowstudio">
        <div className="sub">— NEXT &nbsp; ·  &nbsp; <b>Case 03</b> &nbsp; — &nbsp; Selected Work · 2022 → NOW</div>
        <div className="next-title">now Studio &nbsp; — &nbsp; <em>multi-store publishing for games</em><span className="arrow">↗</span></div>
      </Link>

      <footer className="cs-foot">
        <span>© ZIAUL ISLAM — 2026</span>
        <span>AI-Native Workflow · 2025 → NOW</span>
        <span>Sole designer · Workflow architect</span>
        <span><Link href="/">← Index</Link></span>
      </footer>
    </div>
  );
}
