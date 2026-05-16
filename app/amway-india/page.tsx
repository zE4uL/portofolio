"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Slot } from "@/components/assets/Slot";
import { HeroSlabTrail, trailFromAssets } from "@/components/case-study/HeroSlabTrail";
import CaseStudyChrome from "@/components/case-study/CaseStudyChrome";
import { amwayAssets } from "./assets";

const TRAIL_IMAGES = trailFromAssets(amwayAssets);

const BEHANCE_URL =
  "https://www.behance.net/gallery/121037207/E-commerce-platform-UX-case-study?utm_source=portfolio&utm_medium=case-study";

export default function AmwayIndiaCaseStudy() {
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
    <div className="cs-amway">
      <div className="grain"></div>

      <CaseStudyChrome
        context="CASE STUDY · 05 / 06"
        rightSlot={
          <>
            <a href={BEHANCE_URL} target="_blank" rel="noopener noreferrer" data-cursor="go">
              Behance <span className="cs-float-menu-arrow">↗</span>
            </a>
            <Link href="/#work" data-cursor="go">
              All Work <span className="cs-float-menu-arrow">↗</span>
            </Link>
          </>
        }
      />

      <section className="hero-cs">
        <div className="breadcrumb">
          <span>§06</span><span className="sep">/</span>
          <span>Selected Work</span><span className="sep">/</span>
          <b>Amway India</b><span className="sep">/</span>
          <span className="accent">2020 → 2021</span>
        </div>

        <div className="hero-grid">
          <h1 className="hero-title">
            <span className="row"><span>App, web,</span></span>
            <span className="row"><span>and the <em>system</em></span></span>
            <span className="row"><span>that held them <em>together.</em></span></span>
          </h1>
          <aside className="hero-side">
            <p className="lede">
              <b>Amway India</b> — the country&apos;s largest direct-selling platform — needed its <em>app and website</em> reworked under one consistent visual language. We redesigned both surfaces and built a shared <em>design system</em> so neither would drift again.
            </p>
            <p className="lede" style={{ color: "var(--ink-2)", fontSize: 14 }}>
              <b>Product designer — DS lead</b> (with 1 peer on app/web execution) — I led the design-system effort and shared app + web screens with 1 co-designer. <b>I rolled off during rollout</b> — what shipped is documented here; what continued is in the team&apos;s backlog.
            </p>
            <p className="lede" style={{ color: "var(--ink-2)", fontSize: 14 }}>
              The full long-form case study — research and personas — lives on Behance.{" "}
              <a href={BEHANCE_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                Read it there →
              </a>
            </p>
          </aside>
        </div>

        <div className="meta-strip">
          <div>
            <h6>Role</h6>
            <p>Product designer<br />DS lead + app/web</p>
          </div>
          <div>
            <h6>Timeline</h6>
            <p>2020 → 2021<br /><b>~10 months</b></p>
          </div>
          <div>
            <h6>Team</h6>
            <p>2 designers<br />+ Amway brand</p>
          </div>
          <div>
            <h6>Scope</h6>
            <p>App · Web<br />Design System</p>
          </div>
          <div>
            <h6>Type</h6>
            <p>B2C · MLM<br />Direct-selling commerce</p>
          </div>
        </div>

        <div className="hero-role">
          <div className="hero-role-cell">
            <span className="hero-role-kicker">— What I owned</span>
            <p className="hero-role-text">DS lead · app and web flows. Product designer on a <em>2-designer pod</em>.</p>
          </div>
          <div className="hero-role-cell">
            <span className="hero-role-kicker">— Worked with</span>
            <p className="hero-role-text">1 co-designer + Amway India brand team. <b>Shipped in part</b> — long-form research and personas live on Behance.</p>
          </div>
        </div>

        <div className="hero-slab">
          <div className="slab-grid"></div>
          <HeroSlabTrail images={TRAIL_IMAGES} />
          <div className="slab-corner tl">FIG. 01 / OVERVIEW</div>
          <div className="slab-corner tr">amway india · b2c</div>
          <div className="slab-corner bl">2020 — 2021</div>
          <div className="slab-corner br">● SHIPPED (in part)</div>
          <div className="slab-label">
            <span className="big"><em>Amway</em></span>
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section className="cs" id="context" data-reveal>
        <div className="sec-head">
          <span className="num">§01</span>
          <span className="ttl">The <em>brief.</em> &nbsp; What was on the table.</span>
          <span>2020 / Pre-redesign</span>
        </div>

        <div className="ctx-grid">
          <p className="ctx-lede">
            Amway India serves millions of <em>ABOs</em> (Amway Business Owners) running independent direct-sales businesses across the country. The existing app and website had grown organically — flows were inconsistent, the mobile catalog and the web catalog felt like different products, and the global Amway brand sat awkwardly on top of locally-specific user behaviour.
          </p>
          <div className="ctx-side">
            <dl><dt>Pain · 01</dt><dd>App and web evolved separately — same brand, two different visual languages.</dd></dl>
            <dl><dt>Pain · 02</dt><dd>Complex Indian-market flows (catalog, payments, regional preferences) bolted onto a global template.</dd></dl>
            <dl><dt>Pain · 03</dt><dd>No shared component library — every screen was a one-off, re-drawn from scratch.</dd></dl>
            <dl><dt>Pain · 04</dt><dd>Two surfaces, two designers — no source of truth meant constant cross-checking and rework.</dd></dl>
          </div>
        </div>

        <div className="art-block">
          <div className="art-block-head">
            <span><b>FIG. 02</b> · Research, personas, opportunity map</span>
          </div>
          <Slot id="research" project="amway-india" entry={amwayAssets.research} aspect="16:10">
            <div className="ph-grid"></div>
          </Slot>
          <div className="caption">
            <span><b>About this:</b> a slice from discovery — ABO interview verbatims (left column), the lead-persona card, competitive teardown across direct-selling and lifestyle apps, and the six-stage customer journey map (discover → engage → inquire → buy → during → after) that anchored the redesign brief.</span>
            <span className="accent">research · 2020</span>
          </div>
        </div>
      </section>

      {/* WHAT I WORKED ON */}
      <section className="cs inv" id="pillars" data-reveal>
        <div className="sec-head">
          <span className="num">§02</span>
          <span className="ttl">Three things at once. <em>App, web, system.</em></span>
          <span>The Move</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 24 }}>
          <b>From research to pillars.</b> Eight ABO interviews surfaced two recurring frustrations: app users couldn&apos;t complete returns without calling the helpline, and web users gave up at checkout because addresses didn&apos;t pre-fill from the app. Both pains traced back to disjoint information architecture — which set up <em>Pillar 02</em>: a single shared system across app and web.
        </p>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 60 }}>
          The redesign couldn&apos;t happen in series — both surfaces were live and the brand team was actively shipping. We worked in parallel and built the <em>system</em> alongside the screens, so each one could feed the next.
        </p>

        <div className="pillars pillars--3">
          <div className="pillar">
            <div className="num">01 — APP</div>
            <h4>Rework the <em>mobile</em> surface</h4>
            <p>Re-architected the home, catalog, product, and checkout flows around the way ABOs actually use the app — list-heavy, repeat-purchase, regional-preference-aware.</p>
          </div>
          <div className="pillar">
            <div className="num">02 — WEB</div>
            <h4>Re-anchor the <em>desktop</em> surface</h4>
            <p>Rebuilt the website to align with the global Amway brand while keeping the India-specific catalog and content patterns intact.</p>
          </div>
          <div className="pillar">
            <div className="num">03 — SYSTEM</div>
            <h4>Build a <em>shared</em> DS</h4>
            <p>Color, type, spacing, components, and patterns — the layer that made app and web feel like one product instead of two cousins.</p>
          </div>
        </div>
      </section>

      {/* APP */}
      <section className="cs" id="app" data-reveal>
        <div className="sec-head">
          <span className="num">§03</span>
          <span className="ttl">The <em>app.</em></span>
          <span>iOS / Android</span>
        </div>

        <div className="art-quad art-quad--2">
          <Slot id="appShot01" project="amway-india" entry={amwayAssets.appShot01} aspect="4:5">
            <div className="ph-grid"></div>
          </Slot>
          <Slot id="appShot02" project="amway-india" entry={amwayAssets.appShot02} aspect="4:5">
            <div className="ph-grid"></div>
          </Slot>
        </div>
        <div className="caption" style={{ marginTop: 16 }}>
          <span><b>About this:</b> two sides of the same app. Left — the customer flow: home, nutrition catalog, product detail, cart, address, order confirmed. Right — the ABO flow: profile completion, the orientation program, AmPoint rewards.</span>
          <span className="accent">app · ios + android</span>
        </div>
      </section>

      {/* WEB */}
      <section className="cs inv" id="web" data-reveal>
        <div className="sec-head">
          <span className="num">§04</span>
          <span className="ttl">The <em>web.</em></span>
          <span>Desktop / responsive</span>
        </div>

        <div className="art-block">
          <Slot id="webShot01" project="amway-india" entry={amwayAssets.webShot01} aspect="16:9">
            <div className="ph-grid"></div>
          </Slot>
          <div className="caption">
            <span><b>FIG. 04</b> · Web — landing / discovery</span>
            <span className="accent">desktop</span>
          </div>
        </div>

        <div className="art-block" style={{ marginTop: 40 }}>
          <Slot id="webShot02" project="amway-india" entry={amwayAssets.webShot02} aspect="16:9">
            <div className="ph-grid"></div>
          </Slot>
          <div className="caption">
            <span><b>FIG. 05</b> · Web — product detail / cart</span>
            <span className="accent">desktop</span>
          </div>
        </div>
      </section>

      {/* DS */}
      <section className="cs" id="ds" data-reveal>
        <div className="sec-head">
          <span className="num">§05</span>
          <span className="ttl">The <em>system.</em></span>
          <span>Design System · 2020</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 24 }}>
          A shared design system was built alongside the screens, in accordance with Amway&apos;s global brand guidelines — so two designers could ship app and web surfaces without the brand drifting.
        </p>

        <a className="fig-cap-cont" href={BEHANCE_URL} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", borderTop: "1px solid var(--line)", marginTop: 8 }}>
          <span>— Read the <b>full case study</b> on <span className="fig-cap-cont-link">Behance ↗</span></span>
        </a>
      </section>

      {/* WHY IT EARNS A SPOT */}
      <section className="cs inv" id="reflect" data-reveal>
        <div className="sec-head">
          <span className="num">§06</span>
          <span className="ttl">Why this <em>still earns a spot.</em></span>
          <span>Honest self-review</span>
        </div>

        <p className="ctx-lede ctx-lede-intro">
          A 2020 contract — three years before Float, my first real design-system effort. The work didn&apos;t fully ship under my hand (I rolled off mid-rollout), but the instincts it taught me show up in everything since. Listed below: what it proves, and what I&apos;d push harder on next time.
        </p>

        <div className="reflect-stack">
          <article className="reflect-card reflect-pos">
            <header className="reflect-card-head">
              <span className="reflect-mark">+</span>
              <div className="reflect-card-meta">
                <span className="reflect-eyebrow">Kept</span>
                <h3 className="reflect-card-title">What it <em>proves.</em></h3>
              </div>
            </header>
            <ol className="reflect-list">
              <li className="reflect-item">
                <span className="reflect-no">01</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">B2C anchor at mainstream scale.</h5>
                  <p className="reflect-item-text">Most of my recent work is gaming and dev-platform. Amway is the proof I can ship for mainstream Indian consumers — ABO sellers and retail buyers on app and web — under the constraints of a global enterprise brand.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">02</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Design-system thinking, year zero.</h5>
                  <p className="reflect-item-text">2020 — three years before Float. The instinct to build the system <em>alongside</em> the screens, so two designers could ship two surfaces without drift, was already there. Float later took the same instinct multi-brand.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">03</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Brand discipline under global guidelines.</h5>
                  <p className="reflect-item-text">Solving local-market flows for ABO sellers and retail buyers while staying inside Amway&apos;s global guideline frame — the same tension that shows up in every multi-region B2C project I&apos;ve worked on since.</p>
                </div>
              </li>
            </ol>
          </article>

          <article className="reflect-card reflect-neg">
            <header className="reflect-card-head">
              <span className="reflect-mark">−</span>
              <div className="reflect-card-meta">
                <span className="reflect-eyebrow">Pushed harder next time</span>
                <h3 className="reflect-card-title">What I&apos;d <em>change.</em></h3>
              </div>
            </header>
            <ol className="reflect-list">
              <li className="reflect-item">
                <span className="reflect-no">01</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Build the system sooner.</h5>
                  <p className="reflect-item-text">We started screens-first and extracted the system afterwards. Should have inverted the order — the rework was real. On Float I started with the system; the difference in pace was obvious.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">02</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Tighter ABO research loop.</h5>
                  <p className="reflect-item-text">Two designers, dozens of screens — research happened in bursts at the start of each module rather than continuously. A steady cadence would have surfaced regional and language edge-cases earlier, before they became rework.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">03</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">A stronger handover artifact.</h5>
                  <p className="reflect-item-text">I rolled off contract mid-rollout. The partial handover was awkward — a tighter system doc plus written rationale per pattern would have let the remaining designer carry it without losing the why.</p>
                </div>
              </li>
            </ol>
          </article>
        </div>
      </section>

      {/* BEHANCE CTA */}
      <a
        className="next-cs"
        href={BEHANCE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="sub">— FULL CASE STUDY &nbsp; ·  &nbsp; <b>BEHANCE</b> &nbsp; — &nbsp; Research · personas · interview methodology</div>
        <div className="next-title">Read the <em>long-form</em> on Behance<span className="arrow">↗</span></div>
      </a>

      <footer className="cs-foot">
        <span>© ZIAUL ISLAM — 2026</span>
        <span>Amway India · 2020 → 2021</span>
        <span>Contract · 2 designers</span>
        <span><Link href="/">← Index</Link></span>
      </footer>
    </div>
  );
}
