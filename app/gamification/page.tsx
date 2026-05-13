"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import CaseStudyChrome from "@/components/case-study/CaseStudyChrome";
import { HeroSlabTrail, trailFromAssets } from "@/components/case-study/HeroSlabTrail";
import { Slot } from "@/components/assets/Slot";
import { gamificationAssets } from "./assets";

const GAMI_TRAIL_IMAGES = trailFromAssets(gamificationAssets);

type Surface = {
  no: string;
  tag: string;
  name: string;
  problem: string;
  built: string;
  learned: string;
  decision: string;
  figTag: string;
  figLabel: string;
  slotId:
    | "bsxQuests"
    | "paymentsCashback"
    | "paymentsMiniGames"
    | "nowcafeBots"
    | "nowggProfile"
    | "playpalMobile"
    | "gameRoom"
    | "snakePlanet";
};

const SURFACES: Surface[] = [
  {
    no: "01",
    tag: "BLUESTACKS · QUESTS · SUNSET",
    name: "Quests — the install loop we killed on purpose.",
    problem:
      "BlueStacks ran on <b>CPI</b> deals — publishers paid for installs, and the launcher&apos;s job was to drive new title installs from existing users. Quests was the gamification answer: missions that paid out for installing partner titles, with sweepstakes holding the user across days.",
    built:
      "A <b>quest layer</b> inside the App Player — daily, weekly, and seasonal install missions, sweepstakes, and a visible reward ladder paying out in nowBux. Designed to feel native to the launcher chrome, not a feature pasted on top.",
    learned:
      "Quests <em>worked</em> for the metric it was built to serve — install attribution lifted <b>~15–20%</b> on CPI campaigns pre-sunset. But the publisher market shifted underneath us: deals stopped paying for installs and started paying for <b>ROAS</b> (return on ad spend). An install-driving loop was the wrong loop for the new metric.",
    decision:
      "Sunset Quests rather than retrofit it. The mechanics didn&apos;t map to ROAS — what mapped was return-play + IAP, which became PlayPal&apos;s spec. (See Surface 06.)",
    figTag: "FIG. 03",
    figLabel: "BlueStacks Quests — daily/weekly install ladder, sunset 2023",
    slotId: "bsxQuests",
  },
  {
    no: "02",
    tag: "PAYMENTS · RECEIPT PROMOTIONS",
    name: "Receipt promotions — turning a confirmation page into a cultural moment.",
    problem:
      "The receipt page was dead real-estate — &ldquo;your purchase is complete&rdquo; and a CTA back to game. The most engaged moment in the funnel was being wasted on a static confirmation, and flat cashback alone wasn&apos;t pulling players back to spend it.",
    built:
      "<b>Culturally-themed claim moments</b> bolted onto the receipt — <b>red-envelope</b> reveals during <b>Chinese New Year</b>, <b>egg-cracking</b> for <b>Easter</b>, region-specific events tuned to the player&apos;s market and calendar. Each promotion gated <em>extra cashback</em> behind a single tap-to-reveal interaction, on top of the standard cashback line.",
    learned:
      "Cultural framing + reveal variability did what a flat bonus couldn&apos;t. Players engaged with the receipt because the moment <em>belonged to them</em>, not the product. With these promotions running through Q2 2025, total IAP volume across the surface lifted to <b>~$800K in the quarter</b> — the highest the receipt funnel had ever measured.",
    decision:
      "Anchor receipt-page rewards to the cultural calendar, not the product roadmap. Keep the reveal mechanic; rotate the cultural shell quarterly.",
    figTag: "FIG. 04",
    figLabel: "Receipt promotions — red-envelope (CNY), Easter egg, regional variants",
    slotId: "paymentsMiniGames",
  },
  {
    no: "03",
    tag: "PAYMENTS · COMPLETION SCREEN",
    name: "Completion screen — guaranteed reward visibility for every payer.",
    problem:
      "The receipt-page promotions worked for users who lingered, but a meaningful share closed the post-purchase flow before the receipt fully rendered. There was no wallet to fall back on — if a player missed the receipt, they missed cashback visibility entirely, and visibility was the lever that drove return spend.",
    built:
      "A <b>new surface on the payment completion screen</b> — the unmissable moment between &ldquo;transaction approved&rdquo; and exit — that surfaced cashback earned and other reward states to <em>every</em> payer with certainty. <b>Engaging animations</b> on the cashback line made the moment feel like a payoff, not a confirmation. The same surface also carried <b>BlueStacks Prime</b> subscription promotion as a contextual upsell at the highest-intent moment in the funnel.",
    learned:
      "Reach beat depth. A short, animated reward moment seen by 100% of payers outperformed a richer mechanic seen by a fraction of them. The completion screen turned out to be the highest-conversion surface for Prime upsell across the product — purchase intent was already proven, the friction was zero, and the reward framing made the upsell feel earned rather than pushed.",
    decision:
      "Make the payment completion screen the canonical reward-display surface — receipt-page mechanics layer on top for engaged users, but the completion screen owns base-case visibility for all payers and anchors Prime upsell.",
    figTag: "FIG. 05",
    figLabel: "Payment completion screen — animated cashback reveal + Prime upsell",
    slotId: "paymentsCashback",
  },
  {
    no: "04",
    tag: "NOWCAFE · LINE + TELEGRAM",
    name: "nowCafe — interactive storytelling on one rail, crypto payments on the other.",
    problem:
      "nowCafe needed a way to reach users in markets where in-app push was either blocked or ignored — Japan and parts of SEA where <b>LINE</b> and <b>Telegram</b> own attention. The brief wasn&apos;t a lightweight bot; it was a full product surface lifted into the messaging app.",
    built:
      "On <b>LINE</b>, an <em>immersive cafe</em> — <b>AI agents</b> with character profiles, a <b>cafe-themed Rich Menu</b>, and interactable image messages letting users chat with characters on any topic. Agents also <em>recommended cloud games</em> and let users discover and play them inside the same immersive flow. On <b>Telegram</b>, a lighter shell — game discovery and play without the immersive graphical layer, but with deep <b>TON</b> integration (the app&apos;s in-house crypto on Telegram). Users could convert <em>nowBux ↔ TON</em> and complete payments end-to-end without leaving the chat.",
    learned:
      "One product, two messaging textures. LINE was the right rail for narrative and immersive game discovery — users showed up to spend time. Telegram was the right rail for transactional flow — short loops + native currency rail (TON) where users showed up to <em>do</em>. Forcing one experience across both would have flattened both.",
    decision:
      "Let each platform carry the role its users already came for. LINE owns the immersive AI-agent/cafe surface; Telegram owns the lighter game loop and TON-rail payments. Don&apos;t cross-port the experience.",
    figTag: "FIG. 06",
    figLabel: "nowCafe — LINE immersive cafe + avatars · Telegram bot with TON / nowBux exchange",
    slotId: "nowcafeBots",
  },
  {
    no: "05",
    tag: "NOW.GG · PROFILE REWARDS",
    name: "now.gg Profile — from nowBux ledger to the home for every reward loop.",
    problem:
      "now.gg Profile started as a flat <b>nowBux transaction history page</b> — total balance, where the currency came from, where it went. Useful, but passive: every logged-in user passed through it, and the surface didn&apos;t ask them to <em>do</em> anything with the currency sitting in their account. Profile was also the only surface that saw nowBux earned across <b>every other product</b> — BlueStacks App Player, BlueStacks Mobile, Cloud Player — wherever the user&apos;s now.gg account had touched.",
    built:
      "Reframed Profile from a passive ledger into the <b>home for everything nowBux</b>. Layered multiple gamification experiments side-by-side on top of the existing balance + ledger view: <b>PlayPal</b> tasks, <b>daily chest</b>, <b>crypto rewards</b>, and most recently a <b>casino</b> mechanic. Currency earned anywhere on the now.gg account — App Player, Mobile, Cloud — flowed in here and could be spent right back into more game time and more experiments. One surface closed the earn → view → spend → re-earn loop.",
    learned:
      "Profile became the cleanest A/B environment in the stack — multiple mechanics on the same audience, all sharing one currency. The load-bearing learning was structural: <em>collapsing the wallet view and the spend mechanics onto the same surface beat keeping them separate.</em> A passive ledger generated almost no return-spend on its own; the same balance, shown next to a live mechanic the player could act on, did. Players don&apos;t redeem currency they have to navigate to find.",
    decision:
      "Treat Profile as the canonical nowBux home — balance, history, <em>and</em> active spend mechanics — not three separate surfaces. The surface earns its weight by being the one place every reward loop converges, regardless of which mechanic happens to be active that quarter.",
    figTag: "FIG. 07",
    figLabel: "now.gg Profile — nowBux home: ledger + PlayPal, daily chest, crypto rewards, casino",
    slotId: "nowggProfile",
  },
  {
    no: "06",
    tag: "PLAYPAL · MOBILE · QUEST REPLACEMENT",
    name: "PlayPal — the loop we built when CPI stopped paying.",
    problem:
      "When publishers shifted from CPI to ROAS, BlueStacks needed a gamification loop that drove <b>return play and IAPs</b>, not installs. Quests was retired; PlayPal was the spec for what came next — pay players to keep coming back, design the rewards to surface IAP-relevant titles, ship on mobile where the new ad spend was going.",
    built:
      "A <b>task layer</b> tied to verified play sessions on partner titles — completion paid out in a mix of nowBux and real cash, with the loop tuned so the highest-paying tasks surfaced titles that monetised through IAP. Anti-fraud rails (device, account, session validation) were baked into the design, not bolted on. PlayPal&apos;s outcome metric was the one publishers now cared about: lift on D30 retention and IAP ARPDAU.",
    learned:
      "Real-money rewards changed the user — players who arrived for cash didn&apos;t convert into players who arrived for the game. Two distinct audiences. PlayPal&apos;s ROAS lift came from the cash-first cohort being directed into IAP-rich titles, not from converting them into game-first players. The BlueStacks Mobile app was running <b>~$600/day in IAP volume</b> at steady-state — the spend surface PlayPal&apos;s task layer was tuned against.",
    decision:
      "Treat cash-task players and game players as <em>two product surfaces</em> sharing one currency, not one funnel. Ship the metric publishers buy on, not the metric we wish they bought on.",
    figTag: "FIG. 08",
    figLabel: "PlayPal Mobile — verified-play task layer + payout flow (Quest replacement)",
    slotId: "playpalMobile",
  },
];

const EXTRAS: Surface[] = [
  {
    no: "07",
    tag: "NOW.GG · GAMEROOM · SOCIAL CLOUD-PLAY",
    name: "GameRoom — cloud play as a social, theatrical surface.",
    problem:
      "Cloud play was a single-player experience inside a browser tab — the player streamed a game, and friends had no surface to watch, react, or feel like they were in the room together. The engagement loop ended at close-tab. Cloud streaming already had the spectator pipe end-to-end; the social shell around it didn&apos;t exist.",
    built:
      "A <b>GameRoom</b> on now.gg Cloud where users invite friends to play together or stream gameplay live to spectators inside the same room. Spectators aren&apos;t passive — they fire <b>interactive effects</b> (funny sound bombs, visual overlays) into the room in real time, visible to <em>everyone</em> in the session. Each player&apos;s personal <b>theme</b> is driven by a <em>tokenised JSON theme system</em> — every fill, gradient, and surface a token, themes swappable mid-session per user. Personal theme stays user-specific; the shared effects layer sits on top, visible to the whole room. Built solo, collaborating with the in-house graphics + motion team for theme art and effect animations.",
    learned:
      "Cloud play wasn&apos;t a player + game; it was a <em>room</em> with the player at one position and the experience radiating outward to whoever else joined. Engagement scaled with <em>room size</em>, not player count — the more friends in a session, the longer everyone stayed. The token-driven theme system also earned its keep: graphics could ship five themes for the cost of one because every theme was a JSON swap, not a re-skin.",
    decision:
      "Treat cloud play as a <em>social</em> surface, not a single-player one. Spectator-side interaction is its own first-class layer — designed for, not garnished on top of, the player&apos;s flow. Tokenise everything visual so themes are content, not engineering work.",
    figTag: "FIG. 09",
    figLabel: "GameRoom — invite + spectator effects + tokenised JSON theme system",
    slotId: "gameRoom",
  },
  {
    no: "08",
    tag: "SNAKE PLANET · IN-HOUSE DEMO · INTEGRATION TESTBED",
    name: "Snake Planet — the demo game that became platform infrastructure.",
    problem:
      "Every gamification surface depended on integrations the platform had to ship — <b>payments</b>, currency ledger, cashback flow, ad rails, anti-fraud, session validation. Testing those integrations end-to-end required a real game in production-like conditions, and partner studios couldn&apos;t be the test bed every time we shipped a new payment rail or reward hook. Shipping breaking changes against partner builds was slow, expensive, and bad for the relationship.",
    built:
      "<b>Snake Planet</b> — a small in-house demo game built end-to-end as the smallest production-shaped surface that could exercise <em>every integration funnel</em>. Real payments, real cashback flow, real currency ledger, real ad placements, real session validation. A controlled testbed for breaking changes before they hit any partner title. Built solo, collaborating with graphics + motion for the game&apos;s art set.",
    learned:
      "Owning a first-party test surface compressed integration cycles by weeks. The cost of building Snake Planet was paid back the first time a broken payment rail was caught in-house instead of in production with a partner studio. A demo game turned out to be <em>design infrastructure</em>, not a side project.",
    decision:
      "Keep a first-party game in the integration loop indefinitely. The minute integration tests had to run against partner builds, cycle time blew up — Snake Planet was the cheapest part of the stack to maintain.",
    figTag: "FIG. 10",
    figLabel: "Snake Planet — in-house demo · payments + cashback + ad-rail testbed",
    slotId: "snakePlanet",
  },
];

export default function GamificationCaseStudy() {
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
    <div className="cs-gamification">
      <div className="grain"></div>

      <CaseStudyChrome context="CASE STUDY · BEHAVIOR LOOPS · GAMIFICATION" />

      {/* HERO */}
      <section className="hero-cs">
        <div className="breadcrumb">
          <span>Case 04</span><span className="sep">/</span>
          <span>Selected Work</span><span className="sep">/</span>
          <b>Gamification</b><span className="sep">/</span>
          <span className="accent">2020 → 2024</span>
        </div>

        <div className="hero-grid">
          <h1 className="hero-title">
            <span className="row"><span>Craft.</span></span>
            <span className="row"><span><em>Interaction.</em></span></span>
            <span className="row"><span><em>Mechanics</em> that hit.</span></span>
          </h1>
          <aside className="hero-side">
            <p className="lede">
              Across four years at BlueStacks, I designed gamification systems on eight surfaces — the App Player launcher, the Payments funnel, the receipt page, two messaging bots, the now.gg Profile, PlayPal Mobile, the cloud GameRoom, and an in-house demo game built as the integration testbed. Different products, different markets, one through-line: <em>behavior loops that hold up after the novelty fades.</em>
            </p>
            <p className="lede" style={{ marginTop: 16, opacity: 0.78 }}>
              The most honest beat in the four years: we <em>killed</em> Quests — our launcher-level install loop — when the publisher market pivoted from <b>CPI</b> to <b>ROAS</b>, and replaced it with PlayPal Mobile, whose loop rewarded return play and IAP instead of installs. Same gamification toolkit, different metric to serve.
            </p>
          </aside>
        </div>

        <div className="meta-strip">
          <div>
            <h6>Role</h6>
            <p>Product Designer<br />→ Senior (2024)</p>
          </div>
          <div>
            <h6>Timeline</h6>
            <p>2020 → 2024<br /><b>~4 years</b></p>
          </div>
          <div>
            <h6>Surfaces</h6>
            <p>8 shipped<br />across 6 products</p>
          </div>
          <div>
            <h6>Stack</h6>
            <p>Loops · currencies<br />mechanics · economy</p>
          </div>
          <div>
            <h6>Outcome</h6>
            <p>Quests sunset · PlayPal scaled<br /><b>CPI → ROAS pivot</b></p>
          </div>
        </div>

        <div className="hero-role">
          <div className="hero-role-cell">
            <span className="hero-role-kicker">— What I owned</span>
            <p className="hero-role-text">Design across <b>8 surfaces</b> — launcher Quests, Payments receipt promotions, payment completion screen, nowCafe LINE/Telegram, now.gg Profile (nowBux home), PlayPal Mobile real-money tasks, cloud GameRoom, and Snake Planet (in-house demo). Loops, currencies, redemption, and the economy that tied them.</p>
          </div>
          <div className="hero-role-cell">
            <span className="hero-role-kicker">— Worked with</span>
            <p className="hero-role-text">PMs across Payments, Cloud, and Mobile. Eng leads on each surface. Growth + LiveOps for reward economy. <b>Graphics + motion team</b> on GameRoom themes/effects and Snake Planet art. <b>Anti-fraud + finance</b> partners on PlayPal&apos;s real-money payout rails.</p>
          </div>
        </div>

        <div className="hero-slab">
          <div className="slab-grid"></div>
          <HeroSlabTrail images={GAMI_TRAIL_IMAGES} />
          <div className="slab-corner tl">FIG. 01 / OVERVIEW</div>
          <div className="slab-corner tr">gamification · 8 surfaces · b2c</div>
          <div className="slab-corner bl">2020 — 2024</div>
          <div className="slab-corner br">● CPI → ROAS PIVOT</div>
          <div className="slab-label">
            <span className="big"><em>Gamification</em></span>
          </div>
        </div>
      </section>

      {/* § 00 — THE NUMBERS */}
      <section className="cs" id="stats" data-reveal>
        <div className="sec-head">
          <span className="num">§00</span>
          <span className="ttl">What it added up <em>to.</em></span>
          <span>aggregate · 2020 → 2024</span>
        </div>

        <div className="stats-grid">
          <div className="stat-block">
            <h4 className="stat-num">8</h4>
            <p className="stat-label">Surfaces shipped across 6 products</p>
            <p className="stat-sub">App Player Quests, Payments receipt promotions, payment completion screen, nowCafe LINE + Telegram, now.gg Profile (nowBux home), PlayPal Mobile, cloud GameRoom, Snake Planet (in-house demo testbed).</p>
          </div>
          <div className="stat-block">
            <h4 className="stat-num">~4 yrs</h4>
            <p className="stat-label">Active ownership across the stack</p>
            <p className="stat-sub">Wheels, scratch, chests, jackpots, missions, sweepstakes, daily chests — the mechanics were the means. The loop was the product, and the metric it served kept changing.</p>
          </div>
          <div className="stat-block">
            <h4 className="stat-num">~$300K /mo</h4>
            <p className="stat-label">Player IAP spend across the surfaces</p>
            <p className="stat-sub">Monthly IAP volume across nowSDK-integrated games — the spend surface the gamification loops were tuned against.</p>
          </div>
        </div>
      </section>

      {/* § 01 — WHY IT&apos;S ITS OWN STORY */}
      <section className="cs inv" id="setup" data-reveal>
        <div className="sec-head">
          <span className="num">§01</span>
          <span className="ttl">Why this is its <em>own</em> case study.</span>
          <span>setup</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 20 }}>
          Each of these surfaces lived inside a different product case study — App Player, Payments, nowCafe, now.gg Cloud, PlayPal Mobile, plus an in-house demo built as integration infrastructure. Looked at one at a time, they read as small features.
        </p>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 20 }}>
          Looked at <em>together</em>, they read as a four-year investigation into a single question: <b>what makes a player come back tomorrow when the game itself isn&apos;t the reason?</b>
        </p>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 32 }}>
          That question doesn&apos;t fit inside any one product page. It needed its own narrative — eight experiments stacked end-to-end, with the through-line made visible.
        </p>

        <figure className="system-map" aria-label="System map — eight surfaces grouped by product, unified by the nowBux ledger">
          <header className="system-map-head">
            <span className="system-map-tag">SYSTEM MAP</span>
            <span className="system-map-meta">8 surfaces · 6 products · 1 ledger</span>
          </header>

          <div className="system-map-grid">
            <div className="system-map-col">
              <h6 className="system-map-product">BlueStacks · App Player</h6>
              <ul>
                <li>Quests <span className="system-map-tail">— install loop, sunset 2023</span></li>
              </ul>
            </div>
            <div className="system-map-col">
              <h6 className="system-map-product">Payments</h6>
              <ul>
                <li>Receipt promotions <span className="system-map-tail">— cultural reveals (CNY, Easter, regional)</span></li>
                <li>Completion screen <span className="system-map-tail">— guaranteed-reach reward + Prime upsell</span></li>
              </ul>
            </div>
            <div className="system-map-col">
              <h6 className="system-map-product">nowCafe</h6>
              <ul>
                <li>LINE bot <span className="system-map-tail">— immersive AI-agent cafe</span></li>
                <li>Telegram bot <span className="system-map-tail">— lighter loop + TON crypto rail</span></li>
              </ul>
            </div>
            <div className="system-map-col">
              <h6 className="system-map-product">now.gg · Cloud</h6>
              <ul>
                <li>Profile <span className="system-map-tail">— nowBux home (PlayPal, daily chest, crypto, casino)</span></li>
                <li>GameRoom <span className="system-map-tail-alt">★ social cloud-play · §06 favourite</span></li>
              </ul>
            </div>
            <div className="system-map-col">
              <h6 className="system-map-product">PlayPal · Mobile</h6>
              <ul>
                <li>Real-money task layer <span className="system-map-tail">— Quest replacement, ROAS-tuned</span></li>
              </ul>
            </div>
            <div className="system-map-col">
              <h6 className="system-map-product">In-house demo</h6>
              <ul>
                <li>Snake Planet <span className="system-map-tail-alt">★ integration testbed · §06 favourite</span></li>
              </ul>
            </div>
          </div>

          <footer className="system-map-foot">
            <span className="system-map-foot-tag">SHARED LEDGER · nowBux</span>
            <p>One currency wired through every surface — earn on Quests or PlayPal, redeem on receipt promotions or Profile. The ledger is what made the surfaces a <em>system</em> instead of six unrelated features.</p>
          </footer>
        </figure>
      </section>

      {/* § 02 — THE FRAMING */}
      <section className="cs" id="framing" data-reveal>
        <div className="sec-head">
          <span className="num">§02</span>
          <span className="ttl">The three layers under <em>every</em> surface.</span>
          <span>framing</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 28 }}>
          Across the six measured experiments, the same three layers showed up every time. Whether the surface was a launcher, a receipt page, a bot, a wallet, or a payout flow, design had to answer the same three questions in order.
        </p>

        <div className="framing-grid">
          <div className="framing-block">
            <div className="framing-tag">L1 · BEHAVIOR LOOP</div>
            <h4 className="framing-head">What is the player <em>repeating?</em></h4>
            <p>The loop comes first. Daily check-in, post-purchase spin, streak save — without a loop, every mechanic is a one-time trick.</p>
          </div>
          <div className="framing-block">
            <div className="framing-tag">L2 · MECHANIC</div>
            <h4 className="framing-head">What gives the loop its <em>texture?</em></h4>
            <p>Wheels, missions, jackpots, daily chests. Mechanics make the loop feel different each time — but they don&apos;t replace the loop.</p>
          </div>
          <div className="framing-block">
            <div className="framing-tag">L3 · CURRENCY &amp; ECONOMY</div>
            <h4 className="framing-head">What does the player <em>walk away with?</em></h4>
            <p>nowBux, cashback, real cash, crypto. The reward has to be redeemable somewhere the player already wants to be — otherwise the loop doesn&apos;t close.</p>
          </div>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginTop: 36, marginBottom: 16 }}>
          Two constraints that ended up holding across all six measured surfaces:
        </p>

        <ul className="constraint-list">
          <li>
            <b>Variable-reward shapes beat flat-reward shapes</b> at the same expected value. Players return for the act of pulling the lever, not the size of the prize.
          </li>
          <li>
            <b>Visibility at the moment of action matters more than the prize itself.</b> Cashback on the receipt outperformed cashback in the wallet — same money, very different loop.
          </li>
        </ul>
      </section>

      {/* § 03 — THE SIX MEASURED SURFACES */}
      <section className="cs inv" id="surfaces" data-reveal>
        <div className="sec-head">
          <span className="num">§03</span>
          <span className="ttl">Six measured surfaces, in the order they <em>shipped.</em></span>
          <span>the experiments</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 40 }}>
          Each surface was a separate product decision with its own PM, its own deadline, and its own audience. Read together, each one inherits the lesson from the previous.
        </p>

        <div className="iter-stack">
          {SURFACES.map((s) => (
            <article key={s.no} className="iter-card">
              <header className="iter-head">
                <span className="iter-no">SURFACE {s.no}</span>
                <span className="iter-tag">{s.tag}</span>
              </header>
              <h3 className="iter-name">{s.name}</h3>
              <Slot id={s.slotId} project="gamification" entry={gamificationAssets[s.slotId]} aspect="21:9" className="placeholder-iter">
                <div className="placeholder-grid-bg"></div>
                <div className="placeholder-tag">{s.figTag}</div>
                <div className="placeholder-label">{s.figLabel}</div>
                <div className="placeholder-status">DROP IMAGE HERE</div>
              </Slot>
              <div className="iter-body">
                <div className="iter-row">
                  <div className="iter-label">The behavior gap</div>
                  <p className="iter-text" dangerouslySetInnerHTML={{ __html: s.problem }} />
                </div>
                <div className="iter-row">
                  <div className="iter-label">What we built</div>
                  <p className="iter-text" dangerouslySetInnerHTML={{ __html: s.built }} />
                </div>
                <div className="iter-row">
                  <div className="iter-label">What we learned</div>
                  <p className="iter-text" dangerouslySetInnerHTML={{ __html: s.learned }} />
                </div>
                <div className="iter-row">
                  <div className="iter-label">Decision carried forward</div>
                  <p className="iter-text iter-decision" dangerouslySetInnerHTML={{ __html: s.decision }} />
                </div>
              </div>
            </article>
          ))}
        </div>

      </section>

      {/* § 04 — THE THROUGH-LINE */}
      <section className="cs" id="through-line" data-reveal>
        <div className="sec-head">
          <span className="num">§04</span>
          <span className="ttl">What every surface had in <em>common.</em></span>
          <span>through-line</span>
        </div>

        <div className="callout">
          <p className="callout-lede">
            Across all six measured surfaces, the loops that survived a cohort had three shared traits: a daily-cadence trigger, a variable-reward shape, and a redemption surface where the player already wanted to be. Mechanics changed; the loop shape didn&apos;t.
          </p>
          <figure className="loop-diagram" role="img" aria-label="Loop diagram — trigger, variable reward, redemption — repeating across the six gamification surfaces">
            <header className="loop-header">
              <span className="loop-header-tag">FIG. 11 · LOOP SHAPE</span>
              <span className="loop-header-meta">repeating across the measured surfaces · 2020 → 2024</span>
            </header>

            <div className="loop-canvas">
              <svg className="loop-canvas-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <defs>
                  <marker id="loopArrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
                    <path d="M0,0 L12,6 L0,12 z" fill="currentColor" />
                  </marker>
                </defs>

                <circle className="loop-canvas-disk" cx="500" cy="275" r="92" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
                <text className="loop-canvas-disk-tag" x="500" y="268" textAnchor="middle">BEHAVIOR LOOP</text>
                <text className="loop-canvas-disk-meta" x="500" y="292" textAnchor="middle">repeats daily</text>

                <path d="M370,80 C260,150 195,250 190,365" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="5 6" markerEnd="url(#loopArrow)" />
                <path d="M320,447 C430,512 570,512 680,447" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="5 6" markerEnd="url(#loopArrow)" />
                <path d="M810,365 C805,250 740,150 635,80" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="5 6" markerEnd="url(#loopArrow)" />
              </svg>

              <article className="loop-card loop-card-top">
                <span className="loop-card-tag">Trigger</span>
                <h5 className="loop-card-name">Daily-cadence cue</h5>
                <p className="loop-card-text">A reason to return tomorrow that doesn&apos;t depend on the game itself.</p>
              </article>

              <article className="loop-card loop-card-bl">
                <span className="loop-card-tag">Reveal</span>
                <h5 className="loop-card-name">Variable reward</h5>
                <p className="loop-card-text">Variable shape at the same expected value beats a flat bonus.</p>
              </article>

              <article className="loop-card loop-card-br">
                <span className="loop-card-tag">Redeem</span>
                <h5 className="loop-card-name">Currency that lands</h5>
                <p className="loop-card-text">Redeemable on a surface the player already wanted to be on.</p>
              </article>
            </div>

            <ul className="loop-evidence">
              <li><b>~$300K/mo</b><span>player IAP spend across the surfaces</span></li>
              <li><b>~$800K</b><span>Q2 2025 receipt funnel · trigger × reveal at peak</span></li>
              <li><b>~15–20%</b><span>install lift on Quests · CPI-era proof of the loop shape</span></li>
              <li><b>~$600/day</b><span>Mobile app IAP volume · steady-state</span></li>
            </ul>
          </figure>
        </div>
      </section>

      {/* § 05 — WHAT SHIPPED + SIGNAL */}
      <section className="cs inv" id="shipped" data-reveal>
        <div className="sec-head">
          <span className="num">§05</span>
          <span className="ttl">What <em>shipped,</em> and what we measured.</span>
          <span>signal</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 32 }}>
          Each surface had its own ship cadence and its own measurement frame. The point of collecting them here is the pattern across them, not the individual numbers — though the numbers are listed where I&apos;m allowed to share them.
        </p>

        <div className="ship-stack">
          {([
            {
              slotId: "currencyLayer" as const,
              tag: "FIG. 12",
              label: "Shared currency layer",
              caption: "nowBux unified BlueStacks, Payments, nowCafe, and now.gg Profile under a single ledger. Players earned on one surface, redeemed on another — the closest thing to a behavioral moat the products had.",
            },
            {
              slotId: "nowggProfile" as const,
              tag: "FIG. 13",
              label: "now.gg Profile — clearest signal",
              caption: "Profile became the cleanest A/B surface in the stack — PlayPal, daily chest, crypto rewards, and casino all running side-by-side on top of the same nowBux ledger. The structural lesson: collapsing wallet view and active spend mechanics onto one surface beat keeping them separate.",
            },
            {
              slotId: "playpalMobile" as const,
              tag: "FIG. 14",
              label: "PlayPal — the audience we didn&apos;t merge",
              caption: "Real-money task players and game-first players turned out to be two distinct populations. The honest design move was to stop trying to bridge them and treat the surfaces as parallel, sharing only the currency.",
            },
          ]).map((p) => (
            <div key={p.tag} className="ship-row">
              <Slot id={p.slotId} project="gamification" entry={gamificationAssets[p.slotId]} aspect="16:9" className="placeholder-ship">
                <div className="placeholder-grid-bg"></div>
                <div className="placeholder-tag">{p.tag}</div>
                <div className="placeholder-label" dangerouslySetInnerHTML={{ __html: p.label }} />
                <div className="placeholder-status">DROP IMAGE HERE</div>
              </Slot>
              <div className="ship-meta">
                <h4 className="ship-title" dangerouslySetInnerHTML={{ __html: p.label }} />
                <p className="ship-caption" dangerouslySetInnerHTML={{ __html: p.caption }} />
              </div>
            </div>
          ))}
        </div>

        <div className="signal-grid">
          <div className="signal-block">
            <h6>The metric pivot</h6>
            <p>Quests served <b>CPI</b>; PlayPal served <b>ROAS</b>. Same toolkit, different metric — and the discipline to retire the surface that didn&apos;t fit was worth more than any individual launch.</p>
          </div>
          <div className="signal-block">
            <h6>Retention &amp; conversion</h6>
            <p>Sweepstakes carried D7+ retention; receipt-page visibility lifted second-purchase rate. The receipt funnel hit <b>~$800K in IAP volume</b> through Q2 2025 — the highest the surface had measured. Numbers per surface are listed in §03.</p>
          </div>
          <div className="signal-block">
            <h6>Audience honesty</h6>
            <p>PlayPal taught us when to stop unifying. Cash-first and game-first players are two surfaces sharing one currency — not one funnel pretending to be unified.</p>
          </div>
        </div>
      </section>

      {/* § 06 — MORE SURFACES (personal favourites) */}
      <section className="cs" id="extras" data-reveal>
        <div className="sec-head">
          <span className="num">§06</span>
          <span className="ttl">A few more I&apos;m <em>fond of.</em></span>
          <span>favourites</span>
        </div>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 20 }}>
          I worked on plenty more surfaces across these four years. Below are two personal favourites — pieces I built end-to-end that I keep coming back to for their own reasons. One reframed cloud play as a social space; the other was a tiny demo game that quietly carried the platform&apos;s integration spine.
        </p>

        <p className="ctx-lede" style={{ maxWidth: "72ch", marginBottom: 40 }}>
          Both were built solo, with art and motion contributed by the in-house graphics + motion team.
        </p>

        <div className="iter-stack">
          {EXTRAS.map((s) => (
            <article key={s.no} className="iter-card">
              <header className="iter-head">
                <span className="iter-no">SURFACE {s.no}</span>
                <span className="iter-tag">{s.tag}</span>
              </header>
              <h3 className="iter-name">{s.name}</h3>
              <Slot id={s.slotId} project="gamification" entry={gamificationAssets[s.slotId]} aspect="21:9" className="placeholder-iter">
                <div className="placeholder-grid-bg"></div>
                <div className="placeholder-tag">{s.figTag}</div>
                <div className="placeholder-label">{s.figLabel}</div>
                <div className="placeholder-status">DROP IMAGE HERE</div>
              </Slot>
              <div className="iter-body">
                <div className="iter-row">
                  <div className="iter-label">The opening</div>
                  <p className="iter-text" dangerouslySetInnerHTML={{ __html: s.problem }} />
                </div>
                <div className="iter-row">
                  <div className="iter-label">What we built</div>
                  <p className="iter-text" dangerouslySetInnerHTML={{ __html: s.built }} />
                </div>
                <div className="iter-row">
                  <div className="iter-label">What I took away</div>
                  <p className="iter-text" dangerouslySetInnerHTML={{ __html: s.learned }} />
                </div>
                <div className="iter-row">
                  <div className="iter-label">Decision carried forward</div>
                  <p className="iter-text iter-decision" dangerouslySetInnerHTML={{ __html: s.decision }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* § 07 — REFLECTION */}
      <section className="cs" id="reflection" data-reveal>
        <div className="sec-head">
          <span className="num">§07</span>
          <span className="ttl">What I&apos;d do <em>again,</em> what I&apos;d push harder on.</span>
          <span>reflection</span>
        </div>

        <p className="ctx-lede ctx-lede-intro" style={{ maxWidth: "72ch", marginBottom: 32 }}>
          Eight surfaces, four years, two metric regimes. Looking back, a handful of moves held up across surface-by-surface chaos — and a handful of misses kept showing up under different names. Listed below: the patterns I&apos;d carry into the next loop, and the ones I&apos;d catch sooner.
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
                  <h5 className="reflect-item-title">Cultural shells over generic mechanics.</h5>
                  <p className="reflect-item-text">The receipt page didn&apos;t need a richer mini-game; it needed a <em>moment that belonged to the player.</em> Red envelopes for CNY, egg-cracks for Easter, regional shells on the same reveal mechanic — anchored to the calendar, not the roadmap. <b>~$800K</b> in IAP volume across the receipt funnel in Q2 2025 was the answer to whether cultural framing earned its keep.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">02</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Reach beats depth on guaranteed-visibility surfaces.</h5>
                  <p className="reflect-item-text">The completion screen out-converted the receipt page on Prime upsell not because the mechanic was richer but because <em>everyone saw it.</em> When the lever is visibility, ship the surface that reaches 100% of payers before the surface that engages a fraction. The animated cashback reveal on completion did more for return-spend than three layered receipt promotions ever did.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">03</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Two audiences, one currency — not one funnel.</h5>
                  <p className="reflect-item-text">PlayPal taught me to stop trying to merge cash-task players and game-first players. Treat them as parallel surfaces sharing the ledger, not one funnel pretending to be unified. The honest design move was to let nowBux do the bridging quietly, while the loops stayed separate. Same instinct held on LINE vs. Telegram for nowCafe.</p>
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
                  <h5 className="reflect-item-title">Spec the loop, not the mechanic.</h5>
                  <p className="reflect-item-text">Early surfaces were specced as &ldquo;add a wheel&rdquo; or &ldquo;add missions.&rdquo; The right spec was always <em>&ldquo;design the loop, then pick a mechanic.&rdquo;</em> By the Profile rewards work, that order was reversed; everything earlier suffered for it. The mechanic is a costume — the loop is the body underneath.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">02</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Instrument the loop, not the click.</h5>
                  <p className="reflect-item-text">We measured opens, claims, and CTR per surface. We should have been measuring <em>loop-completion cohorts</em> — does this user return on day 2, 3, 7, having claimed — from day one. We caught up on this midway through Profile, but two years of mechanic-level metrics looked busier than they were.</p>
                </div>
              </li>
              <li className="reflect-item">
                <span className="reflect-no">03</span>
                <div className="reflect-item-body">
                  <h5 className="reflect-item-title">Sunset earlier when the metric moves.</h5>
                  <p className="reflect-item-text">Quests outlived the metric it was built for by at least a quarter. We were proud of the loop and its CPI numbers; that pride slowed the decision to retire it. PlayPal would have shipped sooner if we&apos;d called the pivot the moment publisher RFPs started asking for <b>ROAS</b> instead of <b>CPI</b>. The toolkit was ready; the willingness to retire was the bottleneck.</p>
                </div>
              </li>
            </ol>
          </article>
        </div>
      </section>

      {/* NEXT CASE STUDY */}
      <Link className="next-cs" href="/float">
        <div className="sub">— NEXT &nbsp; · &nbsp; <b>Case 05</b> &nbsp; — &nbsp; Selected Work · 2023 → NOW</div>
        <div className="next-title">Float &nbsp; — &nbsp; <em>one parent DS, four product children</em><span className="arrow">↗</span></div>
      </Link>

      <footer className="cs-foot">
        <span>© ZIAUL ISLAM — 2026</span>
        <span>Gamification · 2020 → 2024</span>
        <span>Sole designer · 8 surfaces</span>
        <span><Link href="/">← Index</Link></span>
      </footer>
    </div>
  );
}
