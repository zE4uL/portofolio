"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Slot } from "@/components/assets/Slot";
import { HeroSlabTrail, trailFromAssets } from "@/components/case-study/HeroSlabTrail";
import CaseStudyChrome from "@/components/case-study/CaseStudyChrome";
import { nowstudioAssets } from "./assets";

const NOWSTUDIO_TRAIL_IMAGES = trailFromAssets(nowstudioAssets);

export default function NowStudioCaseStudy() {
  useSmoothScroll();

  useEffect(() => {
    // Scroll progress bar
    const prog = document.getElementById("scrollProg");
    const updateProg = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      if (prog) prog.style.width = p + "%";
    };
    window.addEventListener("scroll", updateProg, { passive: true });
    updateProg();

    // Reveal observer
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
    <div className="cs-nowstudio">
      <div className="grain"></div>

      <CaseStudyChrome
        context="CASE STUDY · CASE 03 · NOW STUDIO"
        rightSlot={
          <>
            <a href="https://studio.now.gg/" target="_blank" rel="noopener noreferrer" data-cursor="go">
              Live <span className="cs-float-menu-arrow">↗</span>
            </a>
            <Link href="/#work" data-cursor="go">
              All Work <span className="cs-float-menu-arrow">↗</span>
            </Link>
          </>
        }
      />

      <section className="hero-cs">
        <div className="breadcrumb">
          <span>Case 03</span><span className="sep">/</span>
          <span>Selected Work</span><span className="sep">/</span>
          <b>now Studio</b><span className="sep">/</span>
          <span className="accent">2022 → NOW</span>
        </div>

        <div className="hero-grid">
          <h1 className="hero-title">
            <span className="row"><span>One <em>upload,</em></span></span>
            <span className="row"><span>six stores,</span></span>
            <span className="row"><span><em>zero</em> handoff.</span></span>
          </h1>
          <aside className="hero-side">
            <p className="lede">
              <b>now Studio</b> is the developer platform behind <em>now.gg</em>. It exists because now.gg had built cloud infra streaming Android games to millions of browser users — and needed a way to bring more games onto it without our team being the bottleneck.
            </p>
            <p className="lede lede-sub">
              I led design end-to-end across three overhauls — from a self-serve bridge onto now.gg cloud, to a 5-bucket publishing surface devs could navigate themselves, to a multi-store dashboard that hides the compliance work behind one flow.
            </p>
          </aside>
        </div>

        <div className="meta-strip">
          <div>
            <h6>Role</h6>
            <p>Lead Product Designer · 2022 → present<br />Co-led v1 with a peer · solo from v2, PM-led roadmap</p>
          </div>
          <div>
            <h6>Timeline</h6>
            <p>2022 → present<br /><b>4+ years</b></p>
          </div>
          <div>
            <h6>Team</h6>
            <p>w/ PMs, Eng leads<br />Front, Back, SDK</p>
          </div>
          <div>
            <h6>Scope</h6>
            <p>Publishing, Payments,<br />Analytics, RBAC</p>
          </div>
          <div>
            <h6>Type</h6>
            <p>B2B platform<br />SaaS · Dev tools</p>
          </div>
        </div>

        <div className="hero-role">
          <div className="hero-role-cell">
            <span className="hero-role-kicker">— What I owned</span>
            <p className="hero-role-text">End-to-end design across <b>v1 → v3</b> — co-led v1 with a peer, solo from v2 onward. IA, flows, components, RBAC model, six-store compliance spine.</p>
          </div>
          <div className="hero-role-cell">
            <span className="hero-role-kicker">— Worked with</span>
            <p className="hero-role-text">PM-led roadmap · Eng leads on <b>front, back, and SDK</b>. 1 peer designer (v1 only). Built on top of <em>Float</em> — the multi-brand DS I&apos;d already shipped.</p>
          </div>
        </div>

        <div className="hero-slab">
          <div className="slab-grid"></div>
          <HeroSlabTrail images={NOWSTUDIO_TRAIL_IMAGES} />
          <div className="slab-corner tl">FIG. 01 / OVERVIEW</div>
          <div className="slab-corner tr">studio.now.gg</div>
          <div className="slab-corner bl">DASHBOARD · v3</div>
          <div className="slab-corner br">● LIVE</div>
          <div className="slab-label">
            <span className="big">now <em>Studio</em></span>
          </div>
        </div>
      </section>

      {/* §00 — STATS */}
      <section className="cs" id="stats" data-reveal>
        <div className="sec-head">
          <span className="num">§00</span>
          <span className="ttl">Where it stands, <em>today.</em></span>
          <span>2026 · in flight</span>
        </div>

        <div className="stats-grid">
          <div className="stat-block">
            <h4 className="stat-num">6</h4>
            <p className="stat-label">Storefronts from one dashboard</p>
            <p className="stat-sub">Cloud Store · BlueStacks Store · Huawei AppGallery · Amazon Appstore · OnePlus OneStore · Xiaomi GetApps. One Studio build reaches all six.</p>
          </div>
          <div className="stat-block">
            <h4 className="stat-num">60<span className="sym">+</span></h4>
            <p className="stat-label">Studios shipping today, growing each cohort</p>
            <p className="stat-sub">Mobile game studios actively publishing through Studio — solo founders, mid-size teams, and 50-person operators all on one surface.</p>
          </div>
          <div className="stat-block">
            <h4 className="stat-num">100<span className="sym">+</span></h4>
            <p className="stat-label">Titles published through Studio</p>
            <p className="stat-sub">Directional — published mobile titles that have shipped to at least one of the six channels through Studio since v1 went live.</p>
          </div>
        </div>

        <p className="stats-foot">— 4 years &nbsp; · &nbsp; 3 overhauls &nbsp; · &nbsp; 1 designer leading from idea to live product.</p>
      </section>

      {/* §01 — THE PROBLEM */}
      <section className="cs" id="context" data-reveal>
        <div className="sec-head">
          <span className="num">§01</span>
          <span className="ttl">The <em>problem.</em> &nbsp; Why now Studio had to exist.</span>
          <span>setup · 2022</span>
        </div>

        <div className="ctx-grid">
          <p className="ctx-lede">
            now.gg had built cloud infra streaming Android games to millions of browser users — but the catalog couldn&apos;t scale on hand-holding. Devs, meanwhile, were locked into Google &amp; Apple&apos;s economics with no native way to test on cloud or reach a browser-first audience. The bet behind Studio was simple: <em>bring your game to now.gg, get cloud distribution, better unit economics, and visibility your old stores didn&apos;t give you.</em>
          </p>
          <div className="ctx-side">
            <dl><dt>Signal · 01</dt><dd>now.gg&apos;s cloud play needed games at scale — and our internal team was the bottleneck loading them one at a time.</dd></dl>
            <dl><dt>Signal · 02</dt><dd>Indie devs were paying Apple &amp; Google a <b>30% cut</b> on every IAP — with no native way to opt out.</dd></dl>
            <dl><dt>Signal · 03</dt><dd>Pre-launch testing was the dev&apos;s problem: zip the build, share over Drive, lose feedback in Discord.</dd></dl>
            <dl><dt>Signal · 04</dt><dd>Cloud was a <em>new paradigm</em> for game devs — and no existing tool helped them reach a browser-first audience.</dd></dl>
          </div>
        </div>

        <div className="pillars">
          <div className="pillar">
            <div className="num">01 — DISTRIBUTION</div>
            <h4>Cloud reach, <em>day one</em></h4>
            <p>Publish to now.gg and stream Android games to millions of browser users — no app install, no platform gatekeeping.</p>
          </div>
          <div className="pillar">
            <div className="num">02 — REVENUE</div>
            <h4>Keep <em>more</em> of every IAP</h4>
            <p>Drop in the Payments SDK and bypass the 30% storefront cut. Per-deal terms, but always meaningfully lower than Apple or Google.</p>
          </div>
          <div className="pillar">
            <div className="num">03 — VISIBILITY</div>
            <h4>Analytics devs <em>didn&apos;t</em> have</h4>
            <p>Sessions, users, IAP revenue, retention — surfaces the closed storefronts didn&apos;t give devs access to in any usable form.</p>
          </div>
          <div className="pillar">
            <div className="num">04 — TEST</div>
            <h4>Real cloud, <em>before</em> launch</h4>
            <p>Test the build on real cloud infra, generate gated test links, pull tester feedback inline — all in the same flow as publish.</p>
          </div>
        </div>
      </section>

      {/* EVOLUTION / 3 OVERHAULS */}
      <section className="cs inv" id="evolution" data-reveal>
        <div className="sec-head">
          <span className="num">§02</span>
          <span className="ttl">Three overhauls. <em>Four years.</em> &nbsp; How the product evolved.</span>
          <span>2022 → 2026</span>
        </div>

        <p className="ctx-lede ctx-lede-intro">
          Each version responded to a different signal. v1 was the bridge — turn now.gg&apos;s scaling problem into a self-serve product devs would adopt. v2 was the surface re-architecture — too many features, one dashboard, devs drowning. v3 was the compliance layer — six storefronts behind one flow, hidden complexity, operational unlocks.
        </p>

        {/* §02 — BEFORE / AFTER · v0 inherited → v3 shipped */}
        <div className="fig-evidence" data-cols="2">
          <div className="fig-evidence-head">
            <span className="fig-evidence-kicker">— Before / After</span>
            <h3 className="fig-evidence-title">From a copy-paste pipeline to <em>self-serve in a single sitting.</em></h3>
            <p className="fig-evidence-body">The inherited v0 was an internal tool — our team loaded every build by hand, 4–5 days per studio. v3 is the dashboard a dev sees today: six storefronts, one compliance flow, role-scoped, template-driven.</p>
          </div>
          <div className="fig-evidence-grid">
            <figure className="fig-evidence-cell">
              <Slot id="v0Inherited" project="nowstudio" entry={nowstudioAssets.v0Inherited} aspect="16:9">
                <div className="ph-grid"></div>
                <div className="ph-label">v0 — <b>INHERITED STUDIO</b></div>
              </Slot>
              <figcaption className="fig-evidence-cap">
                <span className="fig-evidence-tag"><b>v0 · 2021</b> · Inherited</span>
                <p className="fig-evidence-note">An internal tool. Our team published builds for studios by hand. <b>4–5 days</b> per build, every step manual.</p>
              </figcaption>
            </figure>
            <figure className="fig-evidence-cell">
              <Slot id="v3Shipped" project="nowstudio" entry={nowstudioAssets.v3Shipped} aspect="16:9">
                <div className="ph-grid"></div>
              </Slot>
              <figcaption className="fig-evidence-cap">
                <span className="fig-evidence-tag"><b>v3 · 2024</b> · Shipped</span>
                <p className="fig-evidence-note">Self-serve dashboard. Devs onboard, publish, monetize, measure — all in <b>a single sitting</b>. Six storefronts behind one flow.</p>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="iter-stack">
          {/* v1 */}
          <article className="iter-card">
            <header className="iter-head">
              <span className="iter-no">v1 · 2022</span>
              <span className="iter-tag">THE BRIDGE</span>
            </header>
            <h3 className="iter-name">A self-serve route onto <em>now.gg cloud.</em></h3>
            <p className="iter-team">Co-led with a peer designer · inherited a legacy Studio v0 · built on top of <b>Float Studio</b> and the <b>Float</b> multi-brand DS I&apos;d shipped earlier.</p>
            <div className="iter-body">
              <div className="iter-row">
                <div className="iter-label">Signal</div>
                <p className="iter-text">now.gg&apos;s cloud bet needed games at scale, but our internal team was loading every title by hand. Meanwhile, devs had Android games trapped inside Google/Apple&apos;s <b>30% economics</b> with no native cloud-test path. The bottleneck was structural.</p>
              </div>
              <div className="iter-row">
                <div className="iter-label">What we built</div>
                <p className="iter-text">A self-serve dev platform — sign up, add the build, test on real cloud infra, publish to now.gg, drop in the <b>Payments SDK</b> for IAP cut savings, manage IAPs, watch <b>session &amp; revenue analytics</b>. Onboarding kept to the basics so devs could be live in a single sitting.</p>
              </div>
              <div className="iter-row">
                <div className="iter-label">What we learned</div>
                <p className="iter-text">Devs came for the cloud distribution; they stayed for the analytics and the IAP economics. The trade — game on now.gg in exchange for visibility &amp; better unit economics — actually worked.</p>
              </div>
              <div className="iter-row">
                <div className="iter-label">Decision</div>
                <p className="iter-text iter-decision">Scale the surface. The bridge worked; the platform should be more than one channel.</p>
              </div>
            </div>
            <div className="iter-art">
              <Slot id="iterV1" project="nowstudio" entry={nowstudioAssets.iterV1} aspect="21:9">
                <div className="ph-grid"></div>
              </Slot>
            </div>
          </article>

          {/* v2 */}
          <article className="iter-card">
            <header className="iter-head">
              <span className="iter-no">v2 · 2023</span>
              <span className="iter-tag">THE BUCKETING ERA</span>
            </header>
            <h3 className="iter-name">Five buckets per app — so devs <em>stopped drowning.</em></h3>
            <p className="iter-team">Solo designer · PM-led roadmap · iterating directly with eng leads.</p>
            <div className="iter-body">
              <div className="iter-row">
                <div className="iter-label">Signal</div>
                <p className="iter-text">v1 worked — devs joined faster than planned, and features kept compounding on a flat per-app surface: BlueStacks publishing, HTML games, localised IAPs, tester management, custom Webshop, Discord bot, richer analytics. The breaking point was <b>multi-track APK testing</b> — its UI couldn&apos;t fit the existing surface without burying everything else. The structure had to change before the next feature shipped.</p>
              </div>
              <div className="iter-row">
                <div className="iter-label">What we built</div>
                <p className="iter-text">The biggest design move of v2 wasn&apos;t a feature — it was an IA reorg. Per-app surface carved into <b>5 buckets: Publish · Payments · Webshop · Traffic · Analytics.</b> Each dev type — publisher, monetizer, growth marketer — found a clear home. Onboarding got reworked to collect intent up front and route devs straight to the bucket they came for. A sample app (based on a small test game I designed) shipped alongside, so every flow had a working demo.</p>
              </div>
              <div className="iter-row">
                <div className="iter-label">What we learned</div>
                <p className="iter-text">Bucketing is what kept the product readable as it scaled. Every new feature found a home; no feature crowded out another. The mental model devs already had — publish, monetize, grow, measure — finally matched the surface.</p>
              </div>
              <div className="iter-row">
                <div className="iter-label">Decision</div>
                <p className="iter-text iter-decision">Keep adding distribution. The surface can hold it now.</p>
              </div>
            </div>
            <div className="iter-art">
              <Slot id="iterV2" project="nowstudio" entry={nowstudioAssets.iterV2} aspect="21:9">
                <div className="ph-grid"></div>
              </Slot>
            </div>
          </article>

          {/* v3 */}
          <article className="iter-card">
            <header className="iter-head">
              <span className="iter-no">v3 · 2024 → NOW</span>
              <span className="iter-tag">THE COMPLIANCE LAYER</span>
            </header>
            <h3 className="iter-name">Six storefronts, <em>one</em> compliance flow.</h3>
            <p className="iter-team">Solo designer · PM-led roadmap · added Role Management this cycle.</p>
            <div className="iter-body">
              <div className="iter-row">
                <div className="iter-label">Signal</div>
                <p className="iter-text">Each new storefront brought its own policy: listing format, asset specs, regional regulations, review cycle. Publishing to six stores meant holding <b>six compliance models in your head</b>. Repeat publishers — studios with 5+ titles — were re-doing the same setup every launch. We needed a shared spine with per-store branches, not six parallel flows.</p>
              </div>
              <div className="iter-row">
                <div className="iter-label">What we built</div>
                <p className="iter-text">Cloud Store + BlueStacks + <b>Huawei AppGallery, Amazon Appstore, OnePlus OneStore, Xiaomi GetApps</b> from one dashboard — per-store compliance hidden behind a consistent flow. Plus operational unlocks: <b>APK library</b>, <b>APK signing</b>, <b>no-code Payments</b> for studios without engineering capacity, <b>localised publishing assets</b>, <b>RBAC</b>, and <b>pricing/IAP templates</b> so a launch never starts from zero.</p>
              </div>
              <div className="iter-row">
                <div className="iter-label">What we learned</div>
                <p className="iter-text">The biggest unlock wasn&apos;t adding more stores — it was hiding their compliance differences behind one flow. Devs don&apos;t want to learn six storefronts; they want to ship a game.</p>
              </div>
              <div className="iter-row">
                <div className="iter-label">Decision</div>
                <p className="iter-text iter-decision">Keep extending compliance surface. Samsung Galaxy Store is next.</p>
              </div>
            </div>
            <div className="iter-art">
              <Slot id="iterV3" project="nowstudio" entry={nowstudioAssets.iterV3} aspect="21:9">
                <div className="ph-grid"></div>
              </Slot>
            </div>
          </article>
        </div>

        <div className="stores" style={{ marginTop: 0, borderTop: 0 }}>
          <div className="store"><div className="stno">CH 01</div><div className="stname">Cloud Store</div><div className="stsub">Powered by now.gg</div></div>
          <div className="store"><div className="stno">CH 02</div><div className="stname">BlueStacks Store</div><div className="stsub">Powered by now.gg</div></div>
          <div className="store"><div className="stno">CH 03</div><div className="stname">Huawei</div><div className="stsub">AppGallery</div></div>
          <div className="store"><div className="stno">CH 04</div><div className="stname">Amazon</div><div className="stsub">Appstore</div></div>
          <div className="store"><div className="stno">CH 05</div><div className="stname">OnePlus</div><div className="stsub">OneStore</div></div>
          <div className="store"><div className="stno">CH 06</div><div className="stname">Xiaomi</div><div className="stsub">GetApps</div></div>
        </div>

        <div className="art-block">
          <div className="art-block-head">
            <span><b>FIG. 02</b> · The publishing dashboard, v3</span>
          </div>
          <Slot id="dashboard" project="nowstudio" entry={nowstudioAssets.dashboard} aspect="auto">
            <div className="ph-grid"></div>
            <div className="art-corner tl">DASHBOARD · ALL APPS VIEW</div>
            <div className="art-corner br">PNG · 1920×1080</div>
            <div className="ph-label">FIG. 02 — <b>HOMEPAGE / DASHBOARD</b></div>
          </Slot>
          <div className="caption">
            <span><b>About this:</b> the main dashboard — list of apps with channel-status pills, primary CTA (New publish), side nav.</span>
            <span className="accent">studio.now.gg / home</span>
          </div>
        </div>
      </section>

      {/* KEY DECISIONS */}
      <section className="cs" id="decisions" data-reveal>
        <div className="sec-head">
          <span className="num">§03</span>
          <span className="ttl">Four decisions, <em>and the paths we killed.</em></span>
          <span>Craft + Tradeoffs</span>
        </div>

        <div className="decisions">
          <div className="decision">
            <div className="dno">CALL · 01</div>
            <h3>Onboard for the <em>one</em> goal a dev came for.</h3>
            <div className="dbody">
              <p className="dec-lede">Carving the surface into 5 buckets was the easy part. The trade-off was day-one onboarding — show all the doors, or pick the right one.</p>

              <div className="dec-pair">
                <div className="dec-row killed">
                  <div className="dec-row-head">
                    <span className="dec-row-tag">Considered, killed</span>
                    <span className="dec-row-name">A 6-card &ldquo;pick your job&rdquo; grid</span>
                  </div>
                  <Slot id="decOnboardingKilled" project="nowstudio" entry={nowstudioAssets.decOnboardingKilled} aspect="16:9" className="dec-row-art">
                    <div className="ph-grid"></div>
                  </Slot>
                  <p className="dec-row-body">Six tiles at sign-up: <b>Test my app · Take my app live · Add IAP products · Get more users · Add Payment SDK · Promote my app</b>. Zero gating — but <b>~90% of devs only need 2 of the 6</b>. The full grid read as &ldquo;six things to learn&rdquo;. Wrong tax in the first session.</p>
                </div>

                <div className="dec-row shipped">
                  <div className="dec-row-head">
                    <span className="dec-row-tag">Shipped</span>
                    <span className="dec-row-name">Two-step modal · goal + basics</span>
                  </div>
                  <Slot id="decOnboardingShipped" project="nowstudio" entry={nowstudioAssets.decOnboardingShipped} aspect="16:9" className="dec-row-art">
                    <div className="ph-grid"></div>
                  </Slot>
                  <p className="dec-row-body">Step 1 asks <b>app type</b> (Android · HTML5) and the <b>one thing they want first</b> — Publish, Test, or Webshop. Step 2 collects metadata they&apos;d need anyway (title, package, publisher, genre, language). The dev lands in the bucket they came for; the rest stay one click away.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="decision">
            <div className="dno">CALL · 02</div>
            <h3>Per-step pages with <em>save &amp; resume</em> — not a wizard.</h3>
            <div className="dbody">
              <p className="dec-lede">Publishing touches <b>40+ fields</b> across 6 storefronts. Whatever the flow looks like, devs would start it, get blocked, and come back hours or days later.</p>

              <div className="dec-pair">
                <div className="dec-row killed">
                  <div className="dec-row-head">
                    <span className="dec-row-tag">Considered, killed</span>
                    <span className="dec-row-name">Wizard-style quick-publish</span>
                  </div>
                  <Slot id="decFlowKilled" project="nowstudio" entry={nowstudioAssets.decFlowKilled} aspect="16:9" className="dec-row-art">
                    <div className="ph-grid"></div>
                  </Slot>
                  <p className="dec-row-body">A &ldquo;ship in 5 minutes&rdquo; wizard with smart defaults and the bare minimum upfront. Worked for one storefront. As Huawei, Amazon, OnePlus, Xiaomi and BlueStacks landed, the wizard couldn&apos;t carry <b>six policy trees</b> in a single linear flow without collapsing back into the wall it was meant to avoid.</p>
                </div>

                <div className="dec-row shipped">
                  <div className="dec-row-head">
                    <span className="dec-row-tag">Shipped</span>
                    <span className="dec-row-name">6 dedicated steps · save &amp; resume</span>
                  </div>
                  <Slot id="decFlowShipped" project="nowstudio" entry={nowstudioAssets.decFlowShipped} aspect="16:9" className="dec-row-art">
                    <div className="ph-grid"></div>
                  </Slot>
                  <p className="dec-row-body">Each step its own page with smart defaults and inline per-store policy callouts. Devs leave mid-flow and come back to the same step — no lost progress. Lower per-screen density, full per-store coverage.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="decision">
            <div className="dno">CALL · 03</div>
            <h3>Treat IAPs &amp; pricing as a <em>spreadsheet</em>, not a form.</h3>
            <div className="dbody">
              <p className="dec-lede">Devs don&apos;t have 4 IAPs — they have 40, across 30 markets. The form pattern collapses fast.</p>
              <div className="dec-row shipped">
                <div className="dec-row-head">
                  <span className="dec-row-tag">Shipped</span>
                  <span className="dec-row-name">Matrix-first pricing + reusable templates</span>
                </div>
                <p className="dec-row-body">Bulk-edit by region, copy across tiers, save price &amp; inventory <b>templates</b> for new launches. The template piece is the move I&apos;m proudest of in this section — it shaved most of the boilerplate work off every subsequent app a studio published.</p>
              </div>
            </div>
          </div>

          <div className="decision">
            <div className="dno">CALL · 04</div>
            <h3>Roles that map to <em>real teams,</em> not abstract policies.</h3>
            <div className="dbody">
              <p className="dec-lede">Generic RBAC treats permissions as a flat checklist. Game studios think in roles.</p>
              <div className="dec-row shipped">
                <div className="dec-row-head">
                  <span className="dec-row-tag">Shipped</span>
                  <span className="dec-row-name">Permission scopes around team archetypes</span>
                </div>
                <p className="dec-row-body"><b>QA, Finance, Marketing, Producer</b> — per-app, per-flow scopes, with unsafe defaults <b>impossible to choose accidentally</b>. Net effect: a 12-person studio can onboard a new QA in 2 minutes without giving them keys to the billing console.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fig-intro">
          <span className="fig-intro-kicker">— Shipped, in detail</span>
          <h3 className="fig-intro-title">The calls above, as <em>actual product surface.</em></h3>
          <p className="fig-intro-body">Below: the 6-step publishing flow (CALL&nbsp;·&nbsp;02), the IAP &amp; pricing matrix and reusable templates (CALL&nbsp;·&nbsp;03), and the role-based access model (CALL&nbsp;·&nbsp;04) — as they exist in the live product.</p>
        </div>

        <div className="fig-block">
          <div className="fig-head">
            <span><b>FIG. 03</b> · publishing flow — 6 steps</span>
            <span className="accent">drop a video on any step</span>
          </div>
          <div className="flow-stack">
            <div className="flow-step">
              <div className="flow-no">01</div>
              <div className="flow-info">
                <span className="flow-tag">Publisher · setup</span>
                <h4 className="flow-title">Publisher details</h4>
                <p className="flow-body">Email, privacy policy, terms of service, and an optional custom domain — the basics that get attached to every release.</p>
              </div>
              <Slot id="flow01" project="nowstudio" entry={nowstudioAssets.flow01} aspect="16:9" className="flow-art">
                <div className="ph-grid"></div>
              </Slot>
            </div>

            <div className="flow-step">
              <div className="flow-no">02</div>
              <div className="flow-info">
                <span className="flow-tag">Geographies</span>
                <h4 className="flow-title">Regions</h4>
                <p className="flow-body">Pick the geographies to publish in — regulations and per-region availability are surfaced inline so devs can&apos;t accidentally ship into a blocked market.</p>
              </div>
              <Slot id="flow02" project="nowstudio" entry={nowstudioAssets.flow02} aspect="16:9" className="flow-art">
                <div className="ph-grid"></div>
              </Slot>
            </div>

            <div className="flow-step">
              <div className="flow-no">03</div>
              <div className="flow-info">
                <span className="flow-tag">Store listing</span>
                <h4 className="flow-title">Listing &amp; assets</h4>
                <p className="flow-body">Provide title, description, and screenshots — or one-click import from an existing Google Play listing. This was the largest friction-reducer in v1.</p>
              </div>
              <Slot id="flow03" project="nowstudio" entry={nowstudioAssets.flow03} aspect="16:9" className="flow-art">
                <div className="ph-grid"></div>
              </Slot>
            </div>

            <div className="flow-step">
              <div className="flow-no">04</div>
              <div className="flow-info">
                <span className="flow-tag">Distribution</span>
                <h4 className="flow-title">Channels</h4>
                <p className="flow-body">Choose which stores to deploy to: Cloud Store, BlueStacks, Huawei AppGallery, Amazon Appstore, OnePlus OneStore, Xiaomi GetApps. One config; six storefronts.</p>
              </div>
              <Slot id="flow04" project="nowstudio" entry={nowstudioAssets.flow04} aspect="16:9" className="flow-art">
                <div className="ph-grid"></div>
              </Slot>
            </div>

            <div className="flow-step">
              <div className="flow-no">05</div>
              <div className="flow-info">
                <span className="flow-tag">SDK · optional</span>
                <h4 className="flow-title">Integration</h4>
                <p className="flow-body">Add the now SDK for analytics, IAP, and telemetry — or skip it and run with your own stack. The SDK is opt-in, never enforced.</p>
              </div>
              <Slot id="flow05" project="nowstudio" entry={nowstudioAssets.flow05} aspect="16:9" className="flow-art">
                <div className="ph-grid"></div>
              </Slot>
            </div>

            <div className="flow-step">
              <div className="flow-no">06</div>
              <div className="flow-info">
                <span className="flow-tag">Ship</span>
                <h4 className="flow-title">Bundle &amp; publish</h4>
                <p className="flow-body">Upload the APK or AAB, review the assembled release across every selected channel, and publish — atomically, all at once.</p>
              </div>
              <Slot id="flow06" project="nowstudio" entry={nowstudioAssets.flow06} aspect="16:9" className="flow-art">
                <div className="ph-grid"></div>
              </Slot>
            </div>
          </div>
        </div>

        <div className="fig-block">
          <div className="fig-head">
            <span><b>FIG. 04</b> · IAP &amp; pricing matrix + templates</span>
            <span className="accent">studio.now.gg / iaps</span>
          </div>
          <div className="ship-row ship-row-wide">
            <Slot id="pricingTable" project="nowstudio" entry={nowstudioAssets.pricingTable} aspect="21:9">
              <div className="ph-grid"></div>
            </Slot>
            <div className="ship-meta">
              <h4 className="ship-title">Bulk pricing across regions, saved once and reused.</h4>
              <p className="ship-caption">The IAP list with bulk pricing-by-region — devs edit a matrix, not a form. Inventory &amp; price columns save as <b>templates</b> that ride along to every subsequent launch the studio publishes.</p>
            </div>
          </div>
        </div>

        <div className="fig-block">
          <div className="fig-head">
            <span><b>FIG. 05</b> · roles &amp; permissions, per-app</span>
            <span className="accent">studio.now.gg / team</span>
          </div>
          <div className="ship-row ship-row-wide">
            <Slot id="rbac" project="nowstudio" entry={nowstudioAssets.rbac} aspect="21:9">
              <div className="ph-grid"></div>
            </Slot>
            <div className="ship-meta">
              <h4 className="ship-title">Roles that map to real game-studio teams.</h4>
              <p className="ship-caption">QA, Finance, Marketing, Producer — permission scopes built around archetypes, per-app and per-flow. Unsafe defaults are impossible to choose accidentally.</p>
            </div>
          </div>
        </div>

      </section>

      {/* §04 — OUTCOMES */}
      <section className="cs inv" id="impact" data-reveal>
        <div className="sec-head">
          <span className="num">§04</span>
          <span className="ttl"><em>Outcomes,</em> not outputs.</span>
          <span>signal · honest</span>
        </div>

        <p className="ctx-lede ctx-lede-intro">
          Three measurable shifts after the rewrite: <b>developer adoption</b>, the <b>unit economics</b> of player IAP spend running through nowSDK, and the <b>multi-storefront reach</b> Studio unlocked for now.gg. Numbers below are the last clean reads at handover.
        </p>

        <div className="outcomes-stack">
          <div className="outcome-card">
            <div className="outcome-head">
              <span className="outcome-kicker">Revenue economics</span>
            </div>
            <div className="outcome-metric">
              <span className="metric-from">30% (Apple / Google)</span>
              <span className="metric-arrow">&rarr;</span>
              <span className="metric-to"><em>0&ndash;5%</em> on nowSDK Payments</span>
            </div>
            <p className="outcome-body">
              <b>~$300K/month</b> in player IAP spend now flowing through nowSDK Payments across <b>200+ studios</b>. The platform fee sits in a <b>0&ndash;5%</b> band against the <b>30%</b> standard on Apple / Google &mdash; the line item that justifies the integration on its own.
            </p>
          </div>

          <div className="outcome-card">
            <div className="outcome-head">
              <span className="outcome-kicker">Adoption</span>
            </div>
            <div className="outcome-metric">
              <span className="metric-from">1 studio per release cycle (v0)</span>
              <span className="metric-arrow">&rarr;</span>
              <span className="metric-to"><em>7,000+</em> devs, fully self-serve</span>
            </div>
            <p className="outcome-body">
              <b>7,000+ developers</b> signed up, published, and managed their games end-to-end without a hand-off. <b>200+</b> went deep enough to ship with nowSDK Payments integrated &mdash; the slice generating the IAP volume above.
            </p>
          </div>

          <div className="outcome-card outcome-card-distribution">
            <div className="outcome-head">
              <span className="outcome-kicker">Distribution</span>
            </div>
            <div className="outcome-metrics-row">
              <div className="outcome-metric-cell">
                <span className="metric-eyebrow">Time-to-publish</span>
                <span className="metric-from">4&ndash;5 days</span>
                <span className="metric-arrow">&rarr;</span>
                <span className="metric-to"><em>a single sitting</em></span>
              </div>
              <div className="outcome-metric-cell">
                <span className="metric-eyebrow">Storefronts</span>
                <span className="metric-from">1 storefront</span>
                <span className="metric-arrow">&rarr;</span>
                <span className="metric-to"><em>6 storefronts</em></span>
              </div>
              <div className="outcome-metric-cell">
                <span className="metric-eyebrow">Platform position</span>
                <span className="metric-to"><em>&ldquo;Third largest distribution after Apple &amp; Google.&rdquo;</em></span>
              </div>
            </div>
            <p className="outcome-body">
              One Studio build now reaches <b>six storefronts</b> in a single sitting &mdash; <b>Cloud, BlueStacks, Huawei AppGallery, Amazon Appstore, OnePlus OneStore</b> and <b>Xiaomi GetApps</b>. Studios like <b>Tactile Games</b> (<em>Lily&apos;s Garden</em>) extended a single APK across PC, Mac and Cloud without rebuilding. The &ldquo;third largest distribution&rdquo; claim is now.gg&apos;s &mdash; but Studio is the on-ramp behind it.
            </p>
          </div>

        </div>
      </section>

      {/* QUOTE */}
      <div className="quote-block">
        <p className="q">A platform should make the <em>complicated</em> thing feel like the <em>obvious</em> one.</p>
        <p className="q-attr">— Studio&apos;s design north-star, taped above the Figma file</p>
      </div>

      {/* MORE SURFACE AREA */}
      <section className="cs" id="more" data-reveal>
        <div className="sec-head">
          <span className="num">§05</span>
          <span className="ttl">More <em>surface area.</em></span>
          <span>Analytics · Test links · Discord bot</span>
        </div>

        <div className="fig-block">
          <div className="fig-head">
            <span><b>FIG. 06</b> · webshop &amp; testers</span>
            <span className="accent">studio.now.gg / webshop</span>
          </div>
          <div className="ship-row">
            <Slot id="testFlow" project="nowstudio" entry={nowstudioAssets.testFlow} aspect="21:9">
              <div className="ph-grid"></div>
            </Slot>
            <div className="ship-meta">
              <h4 className="ship-title">A ready-made Webshop, built from the store listing devs already filled in.</h4>
              <p className="ship-caption">The same listing assets devs uploaded for their app — icon, screenshots, description, IAP catalogue — auto-populate a hosted <b>Webshop template</b> for their game. One config doubles as a direct-to-player storefront. Inviting <b>testers</b> uses the same surface: add emails, scope a build, ship a link.</p>
            </div>
          </div>
        </div>

        <div className="fig-block">
          <div className="fig-head">
            <span><b>FIG. 07</b> · discord bot configuration</span>
            <span className="accent">studio.now.gg / integrations</span>
          </div>
          <div className="ship-row">
            <Slot id="discordBot" project="nowstudio" entry={nowstudioAssets.discordBot} aspect="21:9">
              <div className="ph-grid"></div>
            </Slot>
            <div className="ship-meta">
              <h4 className="ship-title">Traffic acquisition without leaving the dashboard.</h4>
              <p className="ship-caption">Setup wizard — connect server, pick channel, configure auto-posts. The Discord bot turns release notes into traffic.</p>
            </div>
          </div>
        </div>

        <div className="fig-block">
          <div className="fig-head">
            <span><b>FIG. 08</b> · analytics dashboard</span>
            <span className="accent">studio.now.gg / analytics</span>
          </div>
          <div className="ship-row">
            <Slot id="analytics" project="nowstudio" entry={nowstudioAssets.analytics} aspect="21:9">
              <div className="ph-grid"></div>
            </Slot>
            <div className="ship-meta">
              <h4 className="ship-title">Real-time signal that closes the publish loop.</h4>
              <p className="ship-caption">DAU, sessions, IAP revenue and retention — time-range filter, headline cards, retention chart and per-channel breakdown.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REFLECTION */}
      <section className="cs inv" id="reflect" data-reveal>
        <div className="sec-head">
          <span className="num">§06</span>
          <span className="ttl">What I&apos;d <em>do again,</em> what I wouldn&apos;t.</span>
          <span>Honest self-review</span>
        </div>

        <p className="ctx-lede ctx-lede-intro">
          PMs took the major calls; my job was to surface the alternatives, run the testing rounds, and ship the option they chose. And v1 didn&apos;t start from zero — it sat on top of a legacy Studio v0, the <b>Float</b> multi-brand DS, and Float Studio (the platform layer I&apos;d shipped earlier). Listed below: what worked, and what I&apos;d push harder on next time.
        </p>

        <div className="reflect-stack">
          <article className="reflect-card reflect-pos">
            <header className="reflect-card-head">
              <span className="reflect-mark">+</span>
              <div className="reflect-card-meta">
                <span className="reflect-eyebrow">Kept</span>
                <h3 className="reflect-card-title">What I&apos;d <em>do again.</em></h3>
              </div>
            </header>
            <ol className="reflect-list">
              <li className="reflect-item">
                <span className="reflect-no">01</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Design the unit of work, not the screens.</h5>
                  <p className="reflect-item-text">v0&apos;s unit was <em>&ldquo;our team puts a build out for a studio.&rdquo;</em> v3&apos;s unit is <em>&ldquo;the dev publishes their own build.&rdquo;</em> That power transfer was the actual win — the 4–5 days → single sitting outcome was a side effect. Every CALL got sharper once I asked the unit-of-work question first.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">02</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Permissions scoped to responsibility, not to features.</h5>
                  <p className="reflect-item-text">CALL·04&apos;s role management let studios restrict what each teammate could actually see and touch inside Studio. A founder could let a QA lead test builds without ever opening billing; Finance saw IAP revenue without the publishing pipeline; Marketing edited listings without unlocking distribution. The unlock wasn&apos;t naming the roles — it was scoping access to map real studio responsibilities.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">03</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Templates are the compounding asset.</h5>
                  <p className="reflect-item-text">Most design output dies after one ship. CALL·03&apos;s pricing, listing and role templates survived every subsequent launch a studio published — boilerplate-killers for every app a studio added. Find the artifacts that outlive the flow.</p>
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
                  <h5 className="reflect-item-title">Elegant ≠ right.</h5>
                  <p className="reflect-item-text">CALL·02&apos;s killed wizard was the prettier UI. It worked perfectly against one storefront. It broke the moment real-world complexity — six storefronts × N policies — hit it. I should be more suspicious of clean UI in branchy domains.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">02</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Prioritize by real signal, not user-type completeness.</h5>
                  <p className="reflect-item-text">I tried too often to design a &ldquo;happy flow&rdquo; for every user type — every path getting equal weight in the UI. The honest move is to read the data, find the modal user&apos;s actual blocker, and make <em>that</em> affordance the loudest one in the flow. Other paths live as drill-down. CALL·01&apos;s 2-step modal worked because it did exactly this; I should have applied the same instinct elsewhere earlier.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">03</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Pull eng + PM in for constraints, not just review.</h5>
                  <p className="reflect-item-text">The wizard in CALL·02 got prototyped before eng surfaced how branchy the per-store policy logic actually was. Same story for a handful of v1 patterns that had to be rewritten once load-bearing tech constraints landed late. Bringing the tech reality in at the sketch stage shrinks the solution space honestly — and saves the rebuild after the prototype is already glossy.</p>
                </div>
              </li>
            </ol>
          </article>
        </div>
      </section>

      {/* NEXT */}
      <Link className="next-cs" href="/gamification">
        <div className="sub">— NEXT &nbsp; ·  &nbsp; <b>Case 04</b> &nbsp; — &nbsp; Selected Work · 2020 → 2024</div>
        <div className="next-title">Gamification &nbsp; — &nbsp; <em>six surfaces, one loop</em><span className="arrow">→</span></div>
      </Link>

      <footer className="cs-foot">
        <span>© ZIAUL ISLAM — 2026</span>
        <span>now Studio · 2022 → present</span>
        <span><a href="https://studio.now.gg/" target="_blank" rel="noopener noreferrer">studio.now.gg ↗</a></span>
        <span><Link href="/">← Index</Link></span>
      </footer>
    </div>
  );
}
