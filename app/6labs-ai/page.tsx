"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import CaseStudyChrome from "@/components/case-study/CaseStudyChrome";
import { HeroSlabTrail, trailFromAssets } from "@/components/case-study/HeroSlabTrail";
import { Slot } from "@/components/assets/Slot";
import { sixLabsAiAssets } from "./assets";

const SIXLABS_TRAIL_IMAGES = trailFromAssets(sixLabsAiAssets);

type Iteration = {
  no: string;
  tag: string;
  name: string;
  problem: string;
  built: string;
  learned: string;
  decision: string;
  figTag: string;
  figLabel: string;
  slotId: "iter1FilteredVideo" | "iter2RadiologistOracle" | "iter3Barista";
};

const ITERATIONS: Iteration[] = [
  {
    no: "01",
    tag: "POC · FILTERED VIDEO",
    name: "Cut the watching, not the proof.",
    problem:
      "Studios were burning real money to understand their own players. They'd commission playtests, then assign people to watch the recordings to find the moments that mattered. The cost was paid twice — once to run the playtest, again to extract value from it manually.",
    built:
      "An AI auto-tagged every video in our corpus across player-behaviour signatures. Devs filtered by those tags to surface the exact sessions they wanted, instead of trawling through every session. Limited dev resources, narrow scope.",
    learned:
      "Devs liked it — already faster than the playtest-then-watch loop. Feedback was consistent: “go further. We don’t want to watch better videos. We want the answer, with the videos as proof.”",
    decision:
      "Expand scope. Move from filtered playback to generated insights, with video as evidence underneath.",
    figTag: "FIG. 03",
    figLabel: "Filtered video POC — auto-tagged session library",
    slotId: "iter1FilteredVideo",
  },
  {
    no: "02",
    tag: "AI-NATIVE · TWO AGENTS",
    name: "Ask in plain language, get the answer back.",
    problem:
      "Filters surfaced sessions; they didn’t answer questions. Devs across roles asked very different things, and a static filter UI couldn’t cover that surface area.",
    built:
      "A natural-language input field, two agents behind it. <b>Radiologist</b> built on top of the filter piece — adds AI session summaries, a timeline of key events, and session metadata (region, platform, device, length). <b>Oracle</b>, experimental — answers focused dev queries across many sessions: “where did players lose the most HP and what caused it?”, “summarise rotation, drop spot, key moves, final-zone path.”",
    learned:
      "Both agents worked technically. But devs hit a learning curve we hadn’t fully predicted — even with suggested queries and hints, devs didn’t know <em>what to ask</em> a system this powerful. The capability was there; the access wasn’t.",
    decision:
      "The next move had to solve query authoring, not agent quality.",
    figTag: "FIG. 04",
    figLabel: "Radiologist + Oracle — natural-language input, two agents",
    slotId: "iter2RadiologistOracle",
  },
  {
    no: "03",
    tag: "ON-RAMP · ORCHESTRATOR",
    name: "Barista — the assistant that proposes the question.",
    problem:
      "Devs didn’t need more agents. They needed an entry point that knew which question to ask, for which role, on which signal — without making the dev the query writer.",
    built:
      "Barista — a personal assistant that proactively suggests analyses based on the dev’s role on the team (PM, game designer, LiveOps, marketer) and the data flowing in. Sits <em>above</em> Radiologist and Oracle: Barista decides which agent to invoke and frames the result in language the role understands.",
    learned:
      "Most users now land in Barista first. Radiologist and Oracle stay accessible as the depth — but the on-ramp is what unlocked them.",
    decision:
      "Barista is the default surface; the other agents are reachable through it or directly.",
    figTag: "FIG. 05",
    figLabel: "Barista — proactive suggestions, role-aware framing",
    slotId: "iter3Barista",
  },
];

export default function SixLabsCaseStudy() {
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
    <div className="cs-6labs">
      <div className="grain"></div>

      <CaseStudyChrome context="CASE STUDY · AI · 6LABS.AI" />

      {/* HERO */}
      <section className="hero-cs">
        <div className="breadcrumb">
          <span>Case 01</span><span className="sep">/</span>
          <span>Selected Work</span><span className="sep">/</span>
          <b>6labs.ai</b><span className="sep">/</span>
          <span className="accent">2025 → NOW</span>
        </div>

        <div className="hero-grid">
          <h1 className="hero-title">
            <span className="row"><span>Players,</span></span>
            <span className="row"><span><em>understood.</em></span></span>
            <span className="row"><span>In seconds.</span></span>
          </h1>
          <aside className="hero-side">
            <p className="lede">
              <b>6labs.ai</b> sits a layer above BlueStacks&apos; AI Highlights. Trained on millions of hours of real player sessions, it lets a game dev ask <em>&ldquo;where are players losing the most HP and what&apos;s causing it?&rdquo;</em> and get an answer in seconds, with the video as proof.
            </p>
            <p className="lede" style={{ marginTop: 16, opacity: 0.78 }}>
              I led design from a leadership whiteboard sketch to a 4-agent product (1 held back) now serving 12 studios in active pilot. Sole designer, 2 PMs, full team of devs and QA.
            </p>
          </aside>
        </div>

        <div className="meta-strip">
          <div>
            <h6>Role</h6>
            <p>Sole designer<br />Idea → live product</p>
          </div>
          <div>
            <h6>Timeline</h6>
            <p>2025 → present<br /><b>in flight</b></p>
          </div>
          <div>
            <h6>Stage</h6>
            <p>Closed pilot<br /><b>12 studios live</b></p>
          </div>
          <div>
            <h6>Surface</h6>
            <p>4 agents shipped<br /><b>1 held back</b></p>
          </div>
          <div>
            <h6>Demos</h6>
            <p>US · Japan · Korea<br />Free Fire–class title</p>
          </div>
        </div>

        <div className="hero-role">
          <div className="hero-role-cell">
            <span className="hero-role-kicker">— What I owned</span>
            <p className="hero-role-text">Design end-to-end — <em>whiteboard sketch to live pilot</em>. <b>4 agents shipped, 1 held back</b> as the Guardian decision.</p>
          </div>
          <div className="hero-role-cell">
            <span className="hero-role-kicker">— Worked with</span>
            <p className="hero-role-text">2 PMs + full dev + QA team. <b>12 studios</b> across US, Japan, and Korea in active pilot — paying users, not engagement clicks.</p>
          </div>
        </div>

        <div className="hero-slab">
          <div className="slab-grid"></div>
          <HeroSlabTrail images={SIXLABS_TRAIL_IMAGES} />
          <div className="slab-corner tl">FIG. 01 / OVERVIEW</div>
          <div className="slab-corner tr">6labs.ai · ai platform · b2b</div>
          <div className="slab-corner bl">2025 — NOW</div>
          <div className="slab-corner br">● PILOT · 12 STUDIOS</div>
          <div className="slab-label">
            <span className="big"><em>6labs.ai</em></span>
          </div>
        </div>
      </section>

      {/* § 00 — STATS */}
      <section className="cs" id="stats" data-reveal>
        <div className="sec-head">
          <span className="num">§00</span>
          <span className="ttl">Where it stands, <em>today.</em></span>
          <span>pilot · 2026 Q2</span>
        </div>

        <div className="stats-grid">
          <div className="stat-block">
            <h4 className="stat-num">12</h4>
            <p className="stat-label">Game studios signed in 30 days</p>
            <p className="stat-sub">Commercial conviction, not engagement — devs paying to use the product, not just clicking around. More joining each cohort.</p>
          </div>
          <div className="stat-block">
            <h4 className="stat-num">4</h4>
            <p className="stat-label">Agents shipped, one held back</p>
            <p className="stat-sub">Barista, Radiologist, Oracle, Forecaster live. Guardian (ad-fraud detection) held back — sensitive territory dealing with real money, needs more accuracy testing first.</p>
          </div>
          <div className="stat-block">
            <h4 className="stat-num">3</h4>
            <p className="stat-label">Iterations of the product I led</p>
            <p className="stat-sub">Filtered video POC → natural-language + 2 agents → Barista as the orchestrator. Each move driven by what we learned from the previous one.</p>
          </div>
        </div>
      </section>

      {/* § 01 — THE SETUP */}
      <section className="cs inv" id="setup" data-reveal>
        <div className="sec-head">
          <span className="num">§01</span>
          <span className="ttl">The goldmine sitting in <em>plain sight.</em></span>
          <span>setup</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 20 }}>
          BlueStacks had been capturing real gameplay video at scale through <b>AI Highlights</b> inside the App Player. A constantly growing corpus of unprompted, real-player sessions across hundreds of titles.
        </p>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 20 }}>
          Game devs&apos; status quo for understanding their own players had not changed: schedule playtests, watch hours of recordings, write notes. Slow. Biased. Small-N.
        </p>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 20 }}>
          Mid-2024 onwards, AI productivity tools were reshaping every adjacent industry. Every dev tooling roadmap had an AI line item.
        </p>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 32 }}>
          Internal read at BlueStacks: <em>we&apos;re sitting on a goldmine devs would pay for.</em> Leadership assigned the work. I was the sole designer.
        </p>

        <Slot id="aiHighlightsCorpus" project="6labs-ai" entry={sixLabsAiAssets.aiHighlightsCorpus} aspect="21:9">
          <div className="placeholder-grid-bg"></div>
          <div className="placeholder-tag">FIG. 02</div>
          <div className="placeholder-label">AI Highlights — the corpus 6labs.ai sits on</div>
          <div className="placeholder-status">DROP IMAGE HERE</div>
        </Slot>
      </section>

      {/* § 02 — THE FRAMING */}
      <section className="cs" id="framing" data-reveal>
        <div className="sec-head">
          <span className="num">§02</span>
          <span className="ttl">Making the bet a <em>real product.</em></span>
          <span>framing</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 28 }}>
          Leadership had the idea: an AI platform trained on our gameplay corpus, giving devs superpowers in player understanding. My job was to translate that into a product. Three sub-questions had to be answered before any UI got drawn.
        </p>

        <div className="framing-grid">
          <div className="framing-block">
            <div className="framing-tag">Q1 · CAPABILITY CEILING</div>
            <h4 className="framing-head">What insights can this data <em>actually</em> surface?</h4>
            <p>What can the model reliably extract from raw gameplay video — and what&apos;s a stretch?</p>
          </div>
          <div className="framing-block">
            <div className="framing-tag">Q2 · VALUE FLOOR</div>
            <h4 className="framing-head">Which of those would change a dev&apos;s <em>work?</em></h4>
            <p>An impressive insight that doesn&apos;t change a roadmap is just a parlor trick.</p>
          </div>
          <div className="framing-block">
            <div className="framing-tag">Q3 · ACCESS</div>
            <h4 className="framing-head">How does a dev <em>reach</em> those insights?</h4>
            <p>Without being a data scientist. Without writing SQL. Without learning a new craft.</p>
          </div>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginTop: 36, marginBottom: 16 }}>
          Two constraints I set early to keep the work meaningful, not just impressive:
        </p>

        <ul className="constraint-list">
          <li>
            <b>Every insight must be traceable back to real video.</b> Devs trust their eyes, not stats. Ungrounded AI summaries get ignored.
          </li>
          <li>
            <b>Devs should be able to use it day one — no training, no new craft to learn.</b> AI&apos;s job here is to remove the data-science barrier, not introduce a new one. If a dev has to study the product before it pays off, the bet has already failed.
          </li>
        </ul>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginTop: 24 }}>
          These two constraints ended up shaping every iteration that followed.
        </p>
      </section>

      {/* § 03 — THE DESIGN MOVES (3 ITERATIONS) */}
      <section className="cs inv" id="iterations" data-reveal>
        <div className="sec-head">
          <span className="num">§03</span>
          <span className="ttl">Three iterations, one held <em>back.</em></span>
          <span>the design moves</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 40 }}>
          The product evolved across three iterations, each driven by what we learned from the previous one. A fifth agent exists but didn&apos;t ship — and that decision matters as much as the ones that did.
        </p>

        <div className="iter-stack">
          {ITERATIONS.map((it) => (
            <article key={it.no} className="iter-card">
              <header className="iter-head">
                <span className="iter-no">ITERATION {it.no}</span>
                <span className="iter-tag">{it.tag}</span>
              </header>
              <h3 className="iter-name">{it.name}</h3>
              <Slot id={it.slotId} project="6labs-ai" entry={sixLabsAiAssets[it.slotId]} aspect="21:9" className="placeholder-iter">
                <div className="placeholder-grid-bg"></div>
                <div className="placeholder-tag">{it.figTag}</div>
                <div className="placeholder-label">{it.figLabel}</div>
                <div className="placeholder-status">DROP IMAGE HERE</div>
              </Slot>
              <div className="iter-body">
                <div className="iter-row">
                  <div className="iter-label">The dev problem</div>
                  <p className="iter-text">{it.problem}</p>
                </div>
                <div className="iter-row">
                  <div className="iter-label">What we built</div>
                  <p className="iter-text" dangerouslySetInnerHTML={{ __html: it.built }} />
                </div>
                <div className="iter-row">
                  <div className="iter-label">What we learned</div>
                  <p className="iter-text" dangerouslySetInnerHTML={{ __html: it.learned }} />
                </div>
                <div className="iter-row">
                  <div className="iter-label">Decision</div>
                  <p className="iter-text iter-decision">{it.decision}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* GUARDIAN — held back */}
        <article className="iter-card iter-held" id="guardian">
          <header className="iter-head">
            <span className="iter-no iter-no-held">HELD BACK</span>
            <span className="iter-tag">GUARDIAN · AD FRAUD</span>
          </header>
          <h3 className="iter-name"><em>Guardian.</em> &nbsp; The agent we chose not to ship.</h3>
          <Slot id="guardianHeldBack" project="6labs-ai" entry={sixLabsAiAssets.guardianHeldBack} aspect="21:9" className="placeholder-iter">
            <div className="placeholder-grid-bg"></div>
            <div className="placeholder-tag">FIG. 06</div>
            <div className="placeholder-label">Guardian — concept screen / red-team artifact</div>
            <div className="placeholder-status">DROP IMAGE HERE</div>
          </Slot>
          <div className="iter-body">
            <div className="iter-row">
              <div className="iter-label">What it does</div>
              <p className="iter-text">Detects ad fraud across player sessions and gathers video evidence to recover wasted UA spend.</p>
            </div>
            <div className="iter-row">
              <div className="iter-label">Why it didn&apos;t ship with the others</div>
              <p className="iter-text">Fraud detection is sensitive territory — it deals with real ad spend and real accusations against real partners. We chose to push it back, raise the accuracy bar, and run more testing before making it available. Shipping discipline mattered more than shipping count.</p>
            </div>
          </div>
        </article>
      </section>

      {/* § 04 — AI-NATIVE WORKFLOW CALLOUT */}
      <section className="cs" id="ai-native" data-reveal>
        <div className="sec-head">
          <span className="num">§04</span>
          <span className="ttl">Built in an <em>AI-native workflow.</em></span>
          <span>process</span>
        </div>

        <div className="callout">
          <p className="callout-lede">
            6labs.ai was designed in an AI-native workflow — Figma↔code round-trips through Claude Code, custom Claude Code skills built for the team, and internal AI workshops to bring the broader org along.
          </p>
          <Slot id="aiNativeRoundTrip" project="6labs-ai" entry={sixLabsAiAssets.aiNativeRoundTrip} aspect="21:9" className="placeholder-callout">
            <div className="placeholder-grid-bg"></div>
            <div className="placeholder-tag">FIG. 07</div>
            <div className="placeholder-label">Round-trip artifact — Figma ↔ code</div>
            <div className="placeholder-status">DROP IMAGE HERE</div>
          </Slot>
          <p className="callout-link">
            → Full process case study: <Link href="/ai-native-workflow"><em>An AI workflow that actually works</em></Link>
          </p>
        </div>
      </section>

      {/* § 05 — WHAT SHIPPED + EARLY SIGNAL */}
      <section className="cs inv" id="shipped" data-reveal>
        <div className="sec-head">
          <span className="num">§05</span>
          <span className="ttl">What <em>shipped,</em> and what we&apos;re hearing.</span>
          <span>signal</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 32 }}>
          Four agents (Barista, Radiologist, Oracle, Forecaster) powered by the SixthSense™ Engine — the platform&apos;s name for the gameplay-trained model layer underneath. Barista is the default landing experience; Radiologist and Oracle are reached through it or directly.
        </p>

        <div className="ship-stack">
          {([
            {
              slotId: "agentSurface4up" as const,
              tag: "FIG. 08",
              label: "The 4-agent surface",
              caption: "Barista (assistant), Radiologist (deep session inspector), Oracle (behavioural intelligence), Forecaster (predictive personas) — all powered by the SixthSense™ Engine. Barista is the default surface; Radiologist and Oracle reachable through it or directly.",
            },
            {
              slotId: "oracleQueryFlow" as const,
              tag: "FIG. 09",
              label: "Oracle — focused query flow",
              caption: "A dev asks a focused question across many sessions — “where did players lose the most HP and what caused it?” — and Oracle answers with grounded video evidence underneath. The most novel capability and the easiest to anonymise; this is the flow that demos best in pilot meetings.",
            },
            {
              slotId: "baristaSuggestionCard" as const,
              tag: "FIG. 10",
              label: "Barista — proactive suggestion card",
              caption: "Barista decides which agent to invoke and frames the result in language that fits the dev’s role on the team (PM, game designer, LiveOps, marketer). The on-ramp that solved query authoring — devs land here first.",
            },
          ]).map((p) => (
            <div key={p.tag} className="ship-row">
              <Slot id={p.slotId} project="6labs-ai" entry={sixLabsAiAssets[p.slotId]} aspect="16:9" className="placeholder-ship">
                <div className="placeholder-grid-bg"></div>
                <div className="placeholder-tag">{p.tag}</div>
                <div className="placeholder-label">{p.label}</div>
                <div className="placeholder-status">DROP IMAGE HERE</div>
              </Slot>
              <div className="ship-meta">
                <h4 className="ship-title">{p.label}</h4>
                <p className="ship-caption">{p.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="signal-grid">
          <div className="signal-block">
            <h6>Pilot tour</h6>
            <p>Demos in <b>US, Japan, and Korea</b>, including a Free Fire–class title. Responses positive across regions.</p>
          </div>
          <div className="signal-block">
            <h6>Commercial signal</h6>
            <p><b>12 studios signed in 30 days.</b> Devs paying to use the product, not engagement clicks.</p>
          </div>
          <div className="signal-block">
            <h6>How we read it</h6>
            <p>The pilot tour functioned as our usability research. Every studio meeting was a study we couldn&apos;t have run earlier with a static product.</p>
          </div>
        </div>
      </section>

      {/* § 06 — WHAT I'D DO DIFFERENTLY */}
      <section className="cs" id="reflection" data-reveal>
        <div className="sec-head">
          <span className="num">§06</span>
          <span className="ttl">What I&apos;d do <em>differently.</em></span>
          <span>reflection</span>
        </div>

        <div className="reflect-grid reflect-3">
          <div className="reflect-block">
            <span className="reflect-eyebrow">01 · AI-native, day one</span>
            <h4>Integrate the Figma↔code round-trip from <em>day one.</em></h4>
            <p>I brought my round-trip workflow in partway. Doing it from the start would have kept the design system tighter in code, and I&apos;d have used dev branches as a design exploration surface, not a downstream artifact.</p>
          </div>
          <div className="reflect-block">
            <span className="reflect-eyebrow">02 · Prototype against real test cases</span>
            <h4>Iterate on real test cases with working prototypes <em>before any infra.</em></h4>
            <p>Before Iteration 1&apos;s POC, we should have run working prototypes against the real questions devs were trying to ask — the &ldquo;what would I even ask this?&rdquo; gap that Barista eventually solved. We caught it <em>post-launch</em> of Iteration 2 — six months late.</p>
          </div>
          <div className="reflect-block">
            <span className="reflect-eyebrow">03 · Eval rubrics, week one</span>
            <h4>Co-author agent-eval rubrics with PMs from <em>week one.</em></h4>
            <p>With agents, &ldquo;looks right&rdquo; isn&apos;t a quality bar — you need pre-defined eval cases, co-authored with PMs at concept time. We&apos;re catching up on this now.</p>
          </div>
        </div>
      </section>

      {/* NEXT CASE STUDY */}
      <Link className="next-cs" href="/ai-native-workflow">
        <div className="sub">— NEXT &nbsp; ·  &nbsp; <b>Case 02</b> &nbsp; — &nbsp; Selected Work · 2025 → NOW</div>
        <div className="next-title">AI-Native Workflow &nbsp; — &nbsp; <em>that actually works</em><span className="arrow">↗</span></div>
      </Link>

      <footer className="cs-foot">
        <span>© ZIAUL ISLAM — 2026</span>
        <span>6labs.ai · 2025 → NOW</span>
        <span>Sole designer · AI Platform</span>
        <span><Link href="/">← Index</Link></span>
      </footer>
    </div>
  );
}
