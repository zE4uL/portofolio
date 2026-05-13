"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Slot } from "@/components/assets/Slot";
import { HeroSlabTrail, trailFromAssets } from "@/components/case-study/HeroSlabTrail";
import CaseStudyChrome from "@/components/case-study/CaseStudyChrome";
import { bluestacksAssets } from "./assets";

const TRAIL_IMAGES = trailFromAssets(bluestacksAssets);

export default function BluestacksCaseStudy() {
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
    <div className="cs-bluestacks">
      <div className="grain"></div>

      <CaseStudyChrome context="CASE STUDY · TENURE · BLUESTACKS" />

      {/* HERO */}
      <section className="hero-cs">
        <div className="breadcrumb">
          <span>§05</span><span className="sep">/</span>
          <span>Selected Work</span><span className="sep">/</span>
          <b>BlueStacks</b><span className="sep">/</span>
          <span className="accent">2021 → 2025</span>
        </div>

        <div className="hero-grid">
          <h1 className="hero-title">
            <span className="row"><span>Four years.</span></span>
            <span className="row"><span>Ten <em>surfaces.</em></span></span>
            <span className="row"><span>One <em>tenure.</em></span></span>
          </h1>
          <aside className="hero-side">
            <p className="lede">
              <b>BlueStacks</b> — the world&apos;s most-used Android emulator (500M+ users across 200+ countries). Joined as the second designer in 2021, promoted to Senior in March 2024, rolled off in 2025. Designed across <em>desktop, cloud, TV, mobile, web, and SDK</em> — a tenure that quietly seeded what became 6labs.
            </p>
          </aside>
        </div>

        <div className="meta-strip">
          <div>
            <h6>Role</h6>
            <p>Product Designer<br />→ Senior (Mar 2024)</p>
          </div>
          <div>
            <h6>Timeline</h6>
            <p>2021 → 2025<br /><b>~4 years</b></p>
          </div>
          <div>
            <h6>Team</h6>
            <p>2 designers + Principal<br /><b>solo from 2022</b> (Cloud Era →)</p>
          </div>
          <div>
            <h6>Scope</h6>
            <p>Desktop · Cloud · TV<br />Mobile · Web · SDK</p>
          </div>
          <div>
            <h6>Type</h6>
            <p>B2C gaming<br />+ revenue + SDK</p>
          </div>
        </div>

        <div className="hero-role">
          <div className="hero-role-cell">
            <span className="hero-role-kicker">— What I owned</span>
            <p className="hero-role-text">From <b>Cloud Era onward</b>: BSX, Console Mode, Game Browser, Payments SDK, Ads, Weapon-Switch proto, Moments, Mobile, and the design seed that became <em>6labs</em>.</p>
          </div>
          <div className="hero-role-cell">
            <span className="hero-role-kicker">— Worked with</span>
            <p className="hero-role-text">Principal Designer + 1 designer early — <b>solo from 2022</b>. Then PMs, Eng leads, and SDK team across <em>10 surfaces</em> over 4 years.</p>
          </div>
        </div>

        <div className="hero-slab">
          <div className="slab-grid"></div>
          <HeroSlabTrail images={TRAIL_IMAGES} />
          <div className="slab-corner tl">FIG. 01 / OVERVIEW</div>
          <div className="slab-corner tr">bluestacks · b2c gaming</div>
          <div className="slab-corner bl">2021 — 2025</div>
          <div className="slab-corner br">● 4 YEARS · 10 SURFACES</div>
          <div className="slab-label">
            <span className="big"><em>BlueStacks</em></span>
          </div>
        </div>
      </section>

      {/* TENURE FRAME — stats + map of the 10 surfaces */}
      <section className="cs" id="frame" data-reveal>
        <div className="sec-head">
          <span className="num">§00</span>
          <span className="ttl">Tenure, in <em>numbers.</em></span>
          <span>2021 → 2025</span>
        </div>

        <div className="tenure-stats">
          <div className="tenure-stat">
            <h4>4 YRS</h4>
            <p className="stat-label">Tenure across two role tiers</p>
            <p className="stat-sub">2021 → 2025. Promoted to Senior in March 2024.</p>
          </div>
          <div className="tenure-stat">
            <h4>500M+</h4>
            <p className="stat-label">App Player users, 200+ countries</p>
            <p className="stat-sub">The install base every shipped surface had to live inside.</p>
          </div>
          <div className="tenure-stat">
            <h4>10</h4>
            <p className="stat-label">Surfaces shipped or shaped</p>
            <p className="stat-sub">Across desktop, cloud, TV, mobile, web, and SDK — listed below.</p>
          </div>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginTop: 60 }}>
          Joined as the second designer in 2021. From the Cloud Era onward (2022 →), the surface load shifted to me solo — BSX, Console Mode, the dual-theme Payments SDK, the Moments capture-and-share canvas (which became the foundation of <Link href="/" style={{ color: "var(--accent)", textDecoration: "underline" }}>6labs</Link>), and eventually the BlueStacks Mobile app. Promoted to Senior in 2024. The tenure&apos;s shape: <em>apprenticeship → cloud systems → revenue surfaces → mobile.</em>
        </p>

        {/* The four eras at a glance */}
        <div className="era-map">
          <article className="era-card">
            <div className="era-no">§01</div>
            <div className="era-year">2021 — 2022</div>
            <h4 className="era-title"><em>Foundations</em></h4>
            <p>Apprenticeship under the Principal. Install flows, full-screen, airplane mode, plus the MSI co-brand build. Sprint cadence on the unglamorous middle, on top of a 500M+ install base.</p>
            <div className="era-tags">
              <span className="era-tag">Activation</span>
              <span className="era-tag">Retention</span>
              <span className="era-tag">Distribution</span>
            </div>
          </article>
          <article className="era-card">
            <div className="era-no">§02</div>
            <div className="era-year">2022 — 2023</div>
            <h4 className="era-title"><em>Cloud Era</em></h4>
            <p>Solo from here. BlueStacks X (Windows app store + design system), Console Mode (TV + native controller), plus one unshipped surface — Game Browser — whose pattern landed elsewhere later.</p>
            <div className="era-tags">
              <span className="era-tag">Discovery</span>
              <span className="era-tag">Activation</span>
              <span className="era-tag">Platform Expansion</span>
            </div>
          </article>
          <article className="era-card">
            <div className="era-no">§03</div>
            <div className="era-year">2023 — 2024</div>
            <h4 className="era-title"><em>Revenue &amp; Craft</em></h4>
            <p>One Payments SDK with a dual-theme system shipped to two products (BlueStacks + now.gg). Six ad placements that monetised without feeling monetised. Plus the Weapon Switch interactive prototype — pure craft.</p>
            <div className="era-tags">
              <span className="era-tag">Conversion</span>
              <span className="era-tag">Monetisation</span>
              <span className="era-tag">Cross-platform</span>
            </div>
          </article>
          <article className="era-card">
            <div className="era-no">§04</div>
            <div className="era-year">2024 — 2025</div>
            <h4 className="era-title"><em>Moments &amp; Mobile</em></h4>
            <p>Moments — a 60-second capture-and-share canvas that quietly became the seed of <Link href="/" style={{ color: "var(--accent)", textDecoration: "underline" }}>6labs</Link>. Then the solo-built BlueStacks Mobile app + partner-facing now SDK, post-promotion.</p>
            <div className="era-tags">
              <span className="era-tag">Engagement</span>
              <span className="era-tag">Virality</span>
              <span className="era-tag">User Acquisition</span>
              <span className="era-tag">Revenue</span>
            </div>
          </article>
        </div>
      </section>

      {/* § 01 FOUNDATIONS */}
      <section className="cs inv" id="era-foundations" data-reveal>
        <div className="sec-head">
          <span className="num">§01</span>
          <span className="ttl"><em>Foundations.</em> &nbsp; Sprint tickets and small features.</span>
          <span>2021 — 2022</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 24 }}>
          A product shipping to 500M people doesn&apos;t let a new designer learn on it. Foundations was the apprenticeship — you earn the right to touch load-bearing surfaces by getting the small ones right first. Year one under the Principal, learning the install funnel and the user base before changing anything that could break them.
        </p>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 24 }}>
          The work itself was sprint cadence: PM tickets, data-driven micro-fixes, install-flow optimisation, full-screen mode, airplane mode. None of it portfolio-shaped on its own. All of it the muscle that made the solo Cloud Era run possible.
        </p>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 40 }}>
          The era&apos;s most visible deliverable was the <em>MSI co-brand build</em> — App Player skinned and bundled for every MSI gaming PC, executing on a partnership that already had MSI as an investor. Lower glamour than &ldquo;design closed the deal,&rdquo; higher leverage than any single feature — every new MSI machine shipped with the App Player our team built.
        </p>

        <div className="art-block">
          <div className="art-block-head">
            <span><b>FIG. 02</b> · Year-one composite — install flow, full-screen, airplane mode, MSI co-brand</span>
          </div>
          <Slot id="foundationsComposite" project="bluestacks" entry={bluestacksAssets.foundationsComposite} aspect="16:9">
            <div className="ph-grid"></div>
          </Slot>
          <div className="caption">
            <span><b>About this:</b> two years of incremental wins stitched together — Game Booster panel, fullscreen toggles, the MSI App Player co-brand variant, the installer milestones. The unglamorous middle, where the muscle was built.</span>
            <span className="accent">2021 — 2022</span>
          </div>
        </div>

        <div className="shipped-strip">
          <b>Shipped:</b>
          <span>Install-flow v2</span>
          <span>Full-screen mode</span>
          <span>Airplane mode</span>
          <span>Game Booster panel</span>
          <span>Installer milestones</span>
          <span>MSI co-brand build</span>
        </div>
      </section>

      {/* § 02 CLOUD ERA */}
      <section className="cs" id="era-cloud" data-reveal>
        <div className="sec-head">
          <span className="num">§02</span>
          <span className="ttl"><em>Cloud Era.</em> &nbsp; BSX app, design system, three surface bets.</span>
          <span>2022 — 2023</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 40 }}>
          The AppPlayer 5 → 5.5 inflection — a million-DAU jump in 18 months — meant we couldn&apos;t keep shipping with screen-by-screen mocks. The system became the bottleneck. Cloud Era was the answer: BSX, its design system, and three surface bets that all had to share primitives.
        </p>

        {/* 2A — BSX */}
        <div className="fig-intro">
          <span className="fig-intro-kicker">— 02.A / BlueStacks X</span>
          <h3 className="fig-intro-title">A single front door for <em>two catalogues.</em></h3>
          <p className="fig-intro-body">Mobile gaming was booming, and the cloud tech we&apos;d already built made those games playable on any device — desktop, browser, TV. The App Player already had hundreds of millions of mobile-game users. BSX gave them the single front door to the combined catalogue: every mobile title running on App Player and every cloud title streaming via now.gg, in one Windows store. Browse, discovery, launch — and a design system built from scratch to hold the surface together as it scaled to TV and controller next.</p>
        </div>

        <blockquote className="cs-pull">
          &ldquo;One store, two ways to play — App Player on desktop, now.gg cloud on any device. BSX was the front and the system holding it together.&rdquo;
        </blockquote>

        <div className="fig-block">
          <Slot id="bsxHero" project="bluestacks" entry={bluestacksAssets.bsxHero} aspect="21:9">
            <div className="ph-grid"></div>
          </Slot>
          <div className="fig-cap">
            <div className="fig-cap-head">
              <span className="fig-cap-meta">2022 · BSX</span>
              <span className="fig-cap-title">Home</span>
            </div>
            <span className="fig-cap-body">A catalogue to play and discover games — for App Player on desktop and now.gg cloud in the browser. Region-based popular rails and category filters surface what&apos;s hot locally; a deals layer threads IAP discounts and premium-for-free offers through the browse, so players can access paid titles without the purchase wall.</span>
          </div>
        </div>

        <div className="fig-row">
          <div className="fig-block">
            <Slot id="bsxStreaming" project="bluestacks" entry={bluestacksAssets.bsxStreaming} aspect="16:10">
              <div className="ph-grid"></div>
            </Slot>
            <div className="fig-cap">
              <div className="fig-cap-head">
                <span className="fig-cap-meta">2022 · BSX</span>
                <span className="fig-cap-title">Premium Games</span>
              </div>
              <span className="fig-cap-body">A dedicated surface for paid titles, free to play — including locked levels across many games unlocked without purchase. The reward-orb pattern frames each game card; same DS primitives as Home, retuned for a streaming-first browsing pattern.</span>
            </div>
          </div>

          <div className="fig-block">
            <Slot id="bsxDs" project="bluestacks" entry={bluestacksAssets.bsxDs} aspect="16:10">
              <div className="ph-grid"></div>
            </Slot>
            <div className="fig-cap">
              <div className="fig-cap-head">
                <span className="fig-cap-meta">2022 · BSX</span>
                <span className="fig-cap-title">Game Detail</span>
              </div>
              <span className="fig-cap-body">One detail page, every install or play destination — App Player, browser cloud, Line, mobile. The &ldquo;play anywhere from one platform&rdquo; promise of BSX, made visible: same components on every channel, with the routing logic sitting underneath rather than in the layout.</span>
            </div>
          </div>
        </div>

        {/* 2B — Console Mode */}
        <div className="fig-intro">
          <span className="fig-intro-kicker">— 02.B / Console Mode</span>
          <h3 className="fig-intro-title">The catalogue, redesigned for <em>10-foot viewing.</em></h3>
          <p className="fig-intro-body">With the cloud tech we&apos;d built, BlueStacks could run on any device — and the next obvious market was the living room. TV-native gamers don&apos;t have a PC, but they have a controller and a screen. Console Mode was the BSX catalogue redesigned for 10-foot viewing and a controller-first interaction model. Designed end-to-end in Figma — controller mapping, HUD overlays, focus states, the works.</p>
        </div>

        <div className="fig-row">
          <div className="fig-block">
            <Slot id="consoleHero" project="bluestacks" entry={bluestacksAssets.consoleHero} aspect="16:10">
              <div className="ph-grid"></div>
            </Slot>
            <div className="fig-cap">
              <div className="fig-cap-head">
                <span className="fig-cap-meta">2022 · BSX</span>
                <span className="fig-cap-title">TV Launcher</span>
              </div>
              <span className="fig-cap-body">Focus-driven game tiles sized for a 10-foot living-room read — the same DS, retuned for distance and remote-control navigation.</span>
            </div>
          </div>

          <div className="fig-block">
            <Slot id="consoleController" project="bluestacks" entry={bluestacksAssets.consoleController} aspect="16:10">
              <div className="ph-grid"></div>
            </Slot>
            <div className="fig-cap">
              <div className="fig-cap-head">
                <span className="fig-cap-meta">2022 · BSX</span>
                <span className="fig-cap-title">Controller HUD</span>
              </div>
              <span className="fig-cap-body">Mapped button hints surfaced contextually mid-game so players never lose the &ldquo;Back + RB to home&rdquo; affordance — input-aware overlay, not a static legend.</span>
            </div>
          </div>
        </div>

        {/* 2C — Game Browser, promoted to decision card */}
        <article className="decision-card">
          <div className="decision-no">02.C · Decision</div>
          <h3 className="decision-title"><em>Game Browser</em> — the bet on a pattern, not a surface.</h3>
          <p className="decision-body">An in-product discovery surface inside the App Player. Prototyped, never shipped — the user signal was real, but the feed-based discovery pattern that captured it ended up being Moments. The Game Browser surface died; the bet underneath it survived in a different room.</p>
          <p className="decision-takeaway"><b>Takeaway:</b> Bet on the pattern, not the surface.</p>
        </article>

        <div className="fig-block">
          <Slot id="gameBrowser" project="bluestacks" entry={bluestacksAssets.gameBrowser} aspect="21:9">
            <div className="ph-grid"></div>
          </Slot>
          <div className="fig-cap">
            <div className="fig-cap-head">
              <span className="fig-cap-meta">2023 · Unshipped</span>
              <span className="fig-cap-title">Game Browser</span>
            </div>
            <span className="fig-cap-body">Onboarding and welcome flow for a discovery surface inside the App Player itself — benefits walked through with interactive animations, plus quick-access tabs with every gaming-related site pinned.</span>
          </div>
        </div>

      </section>

      {/* § 03 REVENUE & CRAFT */}
      <section className="cs inv" id="era-revenue" data-reveal>
        <div className="sec-head">
          <span className="num">§03</span>
          <span className="ttl"><em>Revenue & Craft.</em> &nbsp; Money, ads, and one favorite Figma file.</span>
          <span>2023 — 2024</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginBottom: 40 }}>
          Cloud-bandwidth costs caught up with us, and the era&apos;s job shifted from catalogue to revenue. Payments first — flows that had to convert on first attempt across two products with very different brands. Ads second — six placements that had to make money without breaking trust. Plus one craft side-quest that shipped the same day Figma did.
        </p>

        {/* 3A — Payments SDK */}
        <div className="fig-intro">
          <span className="fig-intro-kicker">— 03.A / Payments SDK</span>
          <h3 className="fig-intro-title">Two products, <em>one SDK</em> — and the user can&apos;t tell.</h3>
          <p className="fig-intro-body">BlueStacks AppPlayer (gamer-utility, deep blue) and now.gg (cloud-streaming, vivid pink) had to share an SDK because finance + compliance ruled out parallel codebases. The risk: if the flow felt borrowed in either product, users would notice the seam and conversion would crater on the first failed transaction. I proposed a dual-theme system — identical IA, identical micro-copy, identical fail/success states; theme tokens swap at the entry point. The SDK ships once; each product feels like its own.</p>
        </div>

        <blockquote className="cs-pull">
          &ldquo;One payments flow, two product themes — the user doesn&apos;t notice. That&apos;s the whole job.&rdquo;
        </blockquote>

        <div className="fig-block">
          <Slot id="paymentsFlow" project="bluestacks" entry={bluestacksAssets.paymentsFlow} aspect="21:9">
            <div className="ph-grid"></div>
          </Slot>
          <div className="fig-cap">
            <div className="fig-cap-head">
              <span className="fig-cap-meta">2023 · Payments SDK</span>
              <span className="fig-cap-title">Full-flow strip</span>
            </div>
            <span className="fig-cap-body">Entry to confirmation — the checkout journey end-to-end, the same flow rendered identically across both product themes.</span>
          </div>
        </div>

        <div className="fig-row">
          <div className="fig-block">
            <Slot id="paymentsDualTheme" project="bluestacks" entry={bluestacksAssets.paymentsDualTheme} aspect="16:9">
              <div className="ph-grid"></div>
            </Slot>
            <div className="fig-cap">
              <div className="fig-cap-head">
                <span className="fig-cap-meta">2023 · Payments SDK</span>
                <span className="fig-cap-title">Dual-theme hero</span>
              </div>
              <span className="fig-cap-body">Side-by-side: the same flow rendered in BlueStacks theme and in now.gg theme. Identical IA, identical micro-copy, identical states — only the tokens swap at the entry point.</span>
            </div>
          </div>

          <div className="fig-block">
            <Slot id="paymentsComponents" project="bluestacks" entry={bluestacksAssets.paymentsComponents} aspect="16:9">
              <div className="ph-grid"></div>
            </Slot>
            <div className="fig-cap">
              <div className="fig-cap-head">
                <span className="fig-cap-meta">2023 · Payments SDK</span>
                <span className="fig-cap-title">Variable tokens</span>
              </div>
              <span className="fig-cap-body">Themed for both BlueStacks and now.gg surfaces — the wiring under every screen. One spec, two products, no rewrite.</span>
            </div>
          </div>
        </div>

        <div className="fig-block">
          <Slot id="paymentsStates" project="bluestacks" entry={bluestacksAssets.paymentsStates} aspect="21:9">
            <div className="ph-grid"></div>
          </Slot>
          <div className="fig-cap">
            <div className="fig-cap-head">
              <span className="fig-cap-meta">2023 · Payments SDK</span>
              <span className="fig-cap-title">Cashback Rewards</span>
            </div>
            <span className="fig-cap-body">An engaging, gamified experience built natively into the SDK — capsules, gift boxes, glow loops — rewarding users for paying across our products through a mix of cashback and reward mechanisms.</span>
          </div>
        </div>

        <div className="fig-cap-cont">
          <span>Spin wheels, jackpots, red envelopes, nowBux rewards — extends into the <Link href="/gamification" className="fig-cap-cont-link">Gamification case study →</Link></span>
        </div>

        {/* 3B — Ads */}
        <div className="fig-intro">
          <span className="fig-intro-kicker">— 03.B / Ads</span>
          <h3 className="fig-intro-title">Six places to put an ad. <em>Pick the ones that don&apos;t make the user hate you.</em></h3>
          <p className="fig-intro-body">Ad surfaces threaded through the user journey — CPI ads on boot, an Ads Panel on home, video ads, fullscreen pre-rolls on game launch. The brief was monetisation; the constraint was retention. Every placement was an explicit trade between revenue per session and the probability the user closes the app and doesn&apos;t come back. The work was less about visuals and more about which six of the twenty possible slots the product could afford to use.</p>
        </div>

        <div className="fig-block">
          <Slot id="adsJourneyMap" project="bluestacks" entry={bluestacksAssets.adsJourneyMap} aspect="21:9">
            <div className="ph-grid"></div>
          </Slot>
          <div className="fig-cap">
            <div className="fig-cap-head">
              <span className="fig-cap-meta">2024 · Ads</span>
              <span className="fig-cap-title">Journey map</span>
            </div>
            <span className="fig-cap-body">Where ads sit across boot → home → game launch → in-game. Placement decisions made visible before any creative was specced.</span>
          </div>
        </div>

        <div className="fig-row">
          <div className="fig-block">
            <Slot id="adsPanelHome" project="bluestacks" entry={bluestacksAssets.adsPanelHome} aspect="16:10">
              <div className="ph-grid"></div>
            </Slot>
            <div className="fig-cap">
              <div className="fig-cap-head">
                <span className="fig-cap-meta">2024 · Ads</span>
                <span className="fig-cap-title">Home Ads Panel</span>
              </div>
              <span className="fig-cap-body">Every ad slot — sidebar, downloaded, playable, display — mapped across the gameplay screens that frame them.</span>
            </div>
          </div>

          <div className="fig-block">
            <Slot id="adsFullscreen" project="bluestacks" entry={bluestacksAssets.adsFullscreen} aspect="16:10">
              <div className="ph-grid"></div>
            </Slot>
            <div className="fig-cap">
              <div className="fig-cap-head">
                <span className="fig-cap-meta">2024 · Ads</span>
                <span className="fig-cap-title">Launch-experience ads</span>
              </div>
              <span className="fig-cap-body">Ads integrated through the product launch experience — video and static creatives on the boot loader, pre-roll on game launch (Alienware creative shown), and floating windows on home. Sized for full-bleed without breaking the surrounding chrome.</span>
            </div>
          </div>
        </div>

        {/* 3C — Weapon Switch interlude */}
        <div className="fig-intro fig-intro--seamless" style={{ marginTop: 96 }}>
          <span className="fig-intro-kicker">— Interlude / Craft side-quest</span>
          <h3 className="fig-intro-title"><em>Weapon Switch on Scroll</em> — shipped the day Figma did.</h3>
          <p className="fig-intro-body">A working interactive prototype of weapon-switching with scroll input — variables, scroll counters, conditional sets, no code. Built and shipped on the same day Figma launched Conditional Prototyping at Config 2023. Pure craft, no business case, in the case study because it&apos;s still my favourite Figma file.</p>
        </div>

        <div className="fig-block">
          <Slot id="weaponSwitchProto" project="bluestacks" entry={bluestacksAssets.weaponSwitchProto} aspect="16:10">
            <div className="ph-grid"></div>
          </Slot>
          <div className="fig-cap">
            <div className="fig-cap-head">
              <span className="fig-cap-meta">2023 · Craft side-quest</span>
              <span className="fig-cap-title">The prototype</span>
            </div>
            <span className="fig-cap-body">Scroll-up / scroll-down flips the active weapon mid-fight. Variables, scroll counters, conditional sets — built in Figma, no code.</span>
          </div>
        </div>

        <div className="fig-block">
          <Slot id="weaponSwitchLogic" project="bluestacks" entry={bluestacksAssets.weaponSwitchLogic} aspect="21:9">
            <div className="ph-grid"></div>
          </Slot>
          <div className="fig-cap">
            <div className="fig-cap-head">
              <span className="fig-cap-meta">2023 · Craft side-quest</span>
              <span className="fig-cap-title">Figma interaction logic</span>
            </div>
            <span className="fig-cap-body">Variables, scroll counters, conditional sets — every state mapped before a single line of code. Shipped the same day Figma did.</span>
          </div>
        </div>
      </section>

      {/* § 04 MOMENTS & MOBILE */}
      <section className="cs" id="era-moments" data-reveal>
        <div className="sec-head">
          <span className="num">§04</span>
          <span className="ttl"><em>Moments & Mobile.</em> &nbsp; The promotion-era stuff.</span>
          <span>2024 — 2025</span>
        </div>

        {/* 4A — Moments */}
        <div className="fig-intro">
          <span className="fig-intro-kicker">— 04.A / Moments</span>
          <h3 className="fig-intro-title">Borrowed plays. <em>Could social do for App Player what NVIDIA Highlights did for GPUs?</em></h3>
          <p className="fig-intro-body">Acquiring players through paid channels was getting expensive. NVIDIA Highlights had quietly proven the alternate route — a 60-second clip of your best play, sharing one keystroke away, creators pulling the next cohort in for free. App Player already recorded video; the capability existed, the experiment was whether the <em>behaviour</em> would. Moments was that test — capture mode (CTRL + M), a gallery, an in-browser editor sized for vertical export, and a public share page on now.gg/play. Not a researched user pain — a stakeholder bet on a validated external playbook, run on what we already had.</p>
        </div>

        <blockquote className="cs-pull">
          &ldquo;60 seconds, one shortcut, one shareable link — borrowed from NVIDIA, run on what App Player already had.&rdquo;
        </blockquote>

        <div className="fig-block">
          <Slot id="momentsCapture" project="bluestacks" entry={bluestacksAssets.momentsCapture} aspect="21:9">
            <div className="ph-grid"></div>
          </Slot>
          <div className="fig-cap">
            <div className="fig-cap-head">
              <span className="fig-cap-meta">2024 · Moments</span>
              <span className="fig-cap-title">In-game capture overlay</span>
            </div>
            <span className="fig-cap-body">The moment the experiment goes live — CTRL + M brings up the capture controls inside any running session.</span>
          </div>
        </div>

        <div className="fig-row">
          <div className="fig-block">
            <Slot id="momentsGallery" project="bluestacks" entry={bluestacksAssets.momentsGallery} aspect="16:9">
              <div className="ph-grid"></div>
            </Slot>
            <div className="fig-cap">
              <div className="fig-cap-head">
                <span className="fig-cap-meta">2024 · Moments</span>
                <span className="fig-cap-title">Gallery</span>
              </div>
              <span className="fig-cap-body">Captures, recordings, screenshots — every empty and error state covered.</span>
            </div>
          </div>

          <div className="fig-block">
            <Slot id="momentsEditor" project="bluestacks" entry={bluestacksAssets.momentsEditor} aspect="16:9">
              <div className="ph-grid"></div>
            </Slot>
            <div className="fig-cap">
              <div className="fig-cap-head">
                <span className="fig-cap-meta">2024 · Moments</span>
                <span className="fig-cap-title">Flow</span>
              </div>
              <span className="fig-cap-body">Every screen, every modal, every save / cancel branch mapped end-to-end.</span>
            </div>
          </div>
        </div>

        <div className="fig-row">
          <div className="fig-block">
            <Slot id="momentsWeb" project="bluestacks" entry={bluestacksAssets.momentsWeb} aspect="16:9">
              <div className="ph-grid"></div>
            </Slot>
            <div className="fig-cap">
              <div className="fig-cap-head">
                <span className="fig-cap-meta">2024 · Moments</span>
                <span className="fig-cap-title">now.gg/play public share</span>
              </div>
              <span className="fig-cap-body">In-browser trim and crop, sized for vertical export to TikTok and Shorts.</span>
            </div>
          </div>

          <div className="fig-block">
            <Slot id="momentsTo6labs" project="bluestacks" entry={bluestacksAssets.momentsTo6labs} aspect="16:9" hideEmpty>
              <div className="ph-grid"></div>
            </Slot>
            <div className="fig-cap">
              <div className="fig-cap-head">
                <span className="fig-cap-meta">2024 · Moments</span>
                <span className="fig-cap-title">AI Highlights</span>
              </div>
              <span className="fig-cap-body">Auto-captured highlights and the activity timeline — the seed of what became 6labs.</span>
            </div>
          </div>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginTop: 32 }}>
          <b>What it gathered.</b> The clip-capture, gallery, and share-page surfaces produced something more interesting than the engagement numbers — a dataset on what gamers actually wanted to capture, edit, and share, plus the behavioural model behind it. That dataset became the backbone of <Link href="/" style={{ color: "var(--accent)", textDecoration: "underline" }}>6labs</Link> — the analytics-grade gameplay-capture product spun up in 2024 for game studios. Moments was the experiment; 6labs is what the data justified building.
        </p>

        {/* 4B — BlueStacks Mobile */}
        <div className="fig-intro" style={{ marginTop: 96 }}>
          <span className="fig-intro-kicker">— 04.B / BlueStacks Mobile</span>
          <h3 className="fig-intro-title">Crossing devices. <em>The SDK catalogue was big enough — time to be where the players were.</em></h3>
          <p className="fig-intro-body">Three years of cloud and SDK work had produced a real Android catalogue. The bet for the mobile app: meet players on the device they already had in their pocket, and let them carry their App Player progress with them when they walked away from the desk. Two value props, one app — <em>continue your game on mobile</em> and <em>discover your next game on mobile</em>. Designed solo end-to-end across three iteration cuts, each testing a different premise.</p>
        </div>

        <blockquote className="cs-pull">
          &ldquo;Cross-device progress, on-the-go play — solo design across three iteration cuts.&rdquo;
        </blockquote>

        <div className="fig-block">
          <Slot id="mobileIterations" project="bluestacks" entry={bluestacksAssets.mobileIterations} aspect="21:9">
            <div className="ph-grid"></div>
          </Slot>
          <div className="fig-cap">
            <div className="fig-cap-head">
              <span className="fig-cap-meta">2024 · BlueStacks Mobile</span>
              <span className="fig-cap-title">Three iterations</span>
            </div>
            <span className="fig-cap-body">Alpha → public release → PlayPal-integrated. The mobile app's spine, three cuts.</span>
          </div>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginTop: 48 }}>
          <b>Iteration 1 — Alpha. The bridge.</b> Prove the cross-device promise. A list of your downloaded App Player games, a download button, shared save state with the desktop. No store, no rewards, no discovery — just: does the bridge between desktop and mobile actually work, and do players use it? It did, and they did.
        </p>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginTop: 48 }}>
          <b>Iteration 2 — First public release. The store.</b> Become a real store. Personalised feed, rewards, deals, new-game discovery, favourites — plus the full Android branding system and every asset the platform demanded (store listings, splash, notifications, system icons, the full kit). The first cut where mobile was a destination, not a companion.
        </p>

        <div className="fig-block" style={{ marginTop: 32 }}>
          <Slot id="mobileHero" project="bluestacks" entry={bluestacksAssets.mobileHero} aspect="21:9">
            <div className="ph-grid"></div>
          </Slot>
          <div className="fig-cap">
            <div className="fig-cap-head">
              <span className="fig-cap-meta">2024 · BlueStacks Mobile</span>
              <span className="fig-cap-title">Core screens</span>
            </div>
            <span className="fig-cap-body">Home with nowBux and other crypto currency linked to the same now.gg account, plus a game-offers feed driven by installed and favourited titles. A Games tab with a discover list and an installed-games library toggle. A Community tab integrating wsup.ai — the AI chat-partner child product from our company.</span>
          </div>
        </div>

        <div className="fig-block">
          <Slot id="mobileDeals" project="bluestacks" entry={bluestacksAssets.mobileDeals} aspect="21:9">
            <div className="ph-grid"></div>
          </Slot>
          <div className="fig-cap">
            <div className="fig-cap-head">
              <span className="fig-cap-meta">2024 · BlueStacks Mobile</span>
              <span className="fig-cap-title">Personalised hooks</span>
            </div>
            <span className="fig-cap-body">Game offer cards tuned to installed and recently played titles, dedicated offers and promotions slots on home and game pages, plus an app-exit hook that routes users back to discovery, rewards, and offers via illustration.</span>
          </div>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "62ch", marginTop: 48 }}>
          <b>Iteration 3 — PlayPal + App Player linkage. The monetised loop and the live bridge.</b> Two adds in one cut. PlayPal — the gamification program that pays players real cash for completing tasks, with the loop designed to drive in-app purchases — built to lift ROAS for the mobile app. Alongside it, an App Player notification feature: pair a desktop App Player instance to the mobile app and get real-time pings from your games on the phone — <em>time to collect resources in your farming game, or your shield is about to drop in your base-builder.</em> Together they pulled the app from &quot;store&quot; into &quot;live extension of your desktop play, with a payout layer.&quot; The full design of PlayPal is its own story — covered in the <Link href="/" style={{ color: "var(--accent)", textDecoration: "underline" }}>Gamification case study</Link>.
        </p>

        <div className="fig-block" style={{ marginTop: 32 }}>
          <Slot id="mobileNowBux" project="bluestacks" entry={bluestacksAssets.mobileNowBux} aspect="21:9">
            <div className="ph-grid"></div>
          </Slot>
          <div className="fig-cap">
            <div className="fig-cap-head">
              <span className="fig-cap-meta">2024 · BlueStacks Mobile</span>
              <span className="fig-cap-title">PlayPal Mobile + App Player pings</span>
            </div>
            <span className="fig-cap-body">Real-money reward gamification — full game registration, progress, and cashout from inside the app. Plus the App Player notification feature: link a desktop instance to the phone and receive live game-state alerts (farming resources ready, base-builder shield expiring, raid timers) so cross-device play stays present even when you&apos;re away from the PC.</span>
          </div>
        </div>

        <div className="tenure-stats" style={{ marginTop: 48 }}>
          <div className="tenure-stat">
            <h4>1M+</h4>
            <p className="stat-label">Total installs</p>
            <p className="stat-sub">Across the three iterations from alpha through PlayPal launch.</p>
          </div>
          <div className="tenure-stat">
            <h4>~4K</h4>
            <p className="stat-label">Daily installs at steady-state</p>
            <p className="stat-sub">After PlayPal launched and the monetised loop started lifting ROAS.</p>
          </div>
          <div className="tenure-stat">
            <h4>~$600</h4>
            <p className="stat-label">Daily IAP spend on Mobile</p>
            <p className="stat-sub">Steady-state daily IAP volume on the BlueStacks Mobile app.</p>
          </div>
        </div>
      </section>

      {/* REFLECTION */}
      <section className="cs inv" id="reflect" data-reveal>
        <div className="sec-head">
          <span className="num">§05</span>
          <span className="ttl">What four years <em>actually taught me.</em></span>
          <span>Honest closing</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 32 }}>
          Four years at BlueStacks looked like ten different jobs stacked together. The first year was install flows and full-screen toggles — <em>the kind of work no one frames on a wall.</em> By year two, I was designing the BSX app, its design system, and three new surface bets simultaneously. By year four, I was designing an Android app end-to-end and watching the data behind a feature I&apos;d shipped (Moments) become the foundation for what would become 6labs.
        </p>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 60 }}>
          The lesson nobody told me on day one: tenure isn&apos;t a line, it&apos;s a layered cake. You ship sprint tickets until you stop noticing them, then one day you&apos;ve designed for 500 million people across desktop, cloud, TV, mobile, and the web — and the work itself is the only thing that compounds.
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
                  <h5 className="reflect-item-title">Self-imposed constraints win.</h5>
                  <p className="reflect-item-text">The dual-theme requirement on the Payments SDK was the best constraint I ever proposed for myself — <em>if it works in two products at once, it works.</em> One spec, two brands, every decision tested twice before it shipped.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">02</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Craft compounds in public.</h5>
                  <p className="reflect-item-text">The Weapon Switch proto I built on the day Figma launched Conditional Prototyping is still, embarrassingly, my favourite Figma file. No business case, pure craft — and it taught me more about variables and conditional sets than any sprint ticket would.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">03</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Side projects aren&apos;t small.</h5>
                  <p className="reflect-item-text">Moments shouldn&apos;t have been a side project. We knew. The data behind it seeded 6labs — the analytics-grade product that justified spinning up a new company surface in 2024. The clip-and-share experiment was load-bearing the whole time.</p>
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
                  <h5 className="reflect-item-title">Document the unglamorous work.</h5>
                  <p className="reflect-item-text">A year of sprint tickets compounds into expertise but disappears from your portfolio. Install flows, full-screen toggles, every quiet polish pass — capture it as it happens. The case study is harder to write retroactively than to keep up.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">02</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Pitch the side project sooner.</h5>
                  <p className="reflect-item-text">Moments-as-a-product was visible from year three. The data showing what creators actually shared, edited and watched was already telling the story — I should have made the case for spinning it out a year earlier than we did. The cost of delay was a year of slower learning loops.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">03</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">The DS was the real unlock.</h5>
                  <p className="reflect-item-text">BSX shipped across three surfaces — desktop, TV, controller — because the design system held. That&apos;s leverage, not luck. I treated the DS as infrastructure-for-myself; should have framed and pitched it as company infrastructure earlier so it earned its own roadmap rather than living inside the BSX one.</p>
                </div>
              </li>
            </ol>
          </article>
        </div>
      </section>

      {/* NEXT CASE STUDY */}
      <Link className="next-cs" href="/amway-india">
        <div className="sub">— NEXT &nbsp; ·  &nbsp; <b>Case 07</b> &nbsp; — &nbsp; Selected Work · 2020 → 2021</div>
        <div className="next-title">Amway India &nbsp; — &nbsp; <em>e-commerce at distributor scale</em><span className="arrow">↗</span></div>
      </Link>

      <footer className="cs-foot">
        <span>© ZIAUL ISLAM — 2026</span>
        <span>BlueStacks · 2021 → 2025</span>
        <span>Tenure · Four eras</span>
        <span><Link href="/">← Index</Link></span>
      </footer>
    </div>
  );
}
