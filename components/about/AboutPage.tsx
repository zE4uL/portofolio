"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import SiteChrome from "@/components/brutalist/SiteChrome";

// ─── Types ────────────────────────────────────────────────────────────────────

type AboutCardProps = {
  title: string;
  tag?: string;
  subtitle?: string;
  body?: string;
  meta?: string;
  index?: number;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const GAMES = [
  { title: "Battlefield 6", tag: "PC", meta: "~12h this week" },
  { title: "Cyberpunk 2077", tag: "PC", meta: "Night City, again" },
  { title: "Helldivers 2", tag: "PC", meta: "For democracy" },
  { title: "Balatro", tag: "PC", meta: "One more run" },
];

const TOOLS = [
  { title: "Figma", tag: "Design" },
  { title: "Cursor", tag: "Code" },
  { title: "Claude Code", tag: "Code" },
  { title: "Linear", tag: "Plan" },
  { title: "Raycast", tag: "Launcher" },
  { title: "Arc", tag: "Browser" },
  { title: "Notion", tag: "Notes" },
  { title: "Spotify", tag: "Music" },
  { title: "Things 3", tag: "Tasks" },
];

const HOBBIES = [
  { title: "Photography", body: "Street + architecture. Phone camera is fine. The eye matters more than the gear." },
  { title: "Reading", body: "Product strategy, design history, and the occasional sci-fi binge." },
  { title: "Gym", body: "Discipline transfer: consistency in training = consistency in craft." },
  { title: "Travel", body: "New cities recalibrate your sense of scale. Always traveling somewhere." },
  { title: "Music Collecting", body: "Vinyl when possible. Soundtracks and ambient for deep work." },
  { title: "Cooking", body: "Mostly one-pot experiments. High risk, occasionally high reward." },
];

const READING = [
  { title: "The Design of Everyday Things", subtitle: "Don Norman" },
  { title: "Continuous Discovery Habits", subtitle: "Teresa Torres" },
  { title: "Shape Up", subtitle: "Ryan Singer" },
];

const LISTENING = [
  { title: "Blade Runner 2049 OST", subtitle: "Hans Zimmer & Benjamin Wallfisch" },
  { title: "Random Access Memories", subtitle: "Daft Punk" },
  { title: "Selected Ambient Works Vol. II", subtitle: "Aphex Twin" },
];

const BELIEVES = [
  "Clarity is a design decision. If someone needs a tooltip to understand it, it isn't done.",
  "The best design system is the one the team actually uses.",
  "Prototype in code when the interaction matters. A static frame lies.",
  "Constraints are a feature. Unlimited options produce mediocre outcomes.",
  "Ship, measure, iterate. The first version is a hypothesis.",
  "Speed of feedback determines speed of learning. Get it in front of people.",
  "Design is a conversation, not a deliverable.",
];

const TIMELINE = [
  { year: "2019", role: "UI/UX Designer", company: "Alpha Agency", note: "B2B + B2C web redesigns" },
  { year: "2020", role: "UI/UX Designer", company: "Ikokas Digital", note: "User-centric solutions across client projects" },
  { year: "2020", role: "Contract UI/UX", company: "Amway India", note: "Mobile app + web redesign; built the DS" },
  { year: "2021", role: "Product Designer", company: "BlueStacks / now.gg", note: "AI tooling, design systems at scale" },
  { year: "2025", role: "Lead Designer, 6labs.ai", company: "BlueStacks / now.gg", note: "AI gameplay analytics platform" },
];

// Strip / projects (matches the brutalist horizontal dark band: CATEGORY№NN / Brand+Descriptor)
const WORK = [
  { no: 25, kind: "PLATFORM", brand: "6labs.ai",       desc: "Design Systems" },
  { no: 24, kind: "STUDIO",   brand: "now Studio",     desc: "Brand · Web" },
  { no: 23, kind: "PLATFORM", brand: "BlueStacks DS",  desc: "Platform" },
  { no: 22, kind: "PAYMENTS", brand: "Tide",           desc: "Payments" },
  { no: 21, kind: "LOYALTY",  brand: "Amway India",    desc: "Loyalty" },
  { no: 20, kind: "AGENCY",   brand: "Ikokas",         desc: "Agency" },
  { no: 19, kind: "BRAND",    brand: "Alpha Agency",   desc: "Brand" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHead({ no, label }: { no: string; label: string }) {
  return (
    <div className="section-head about-sec-head">
      <span><span className="no">§{no}</span> <span className="asterisk">*</span> {label}</span>
      <span className="asterisk">/// /// ///</span>
    </div>
  );
}

function AboutCard({ title, tag, subtitle, body, meta, index = 0 }: AboutCardProps) {
  return (
    <article className="about-card" style={{ ["--i" as string]: index }}>
      <div className="about-card-rule" aria-hidden />
      <div className="about-card-body">
        {tag && <span className="about-card-tag">{tag}</span>}
        <h3 className="about-card-title">{title}</h3>
        {subtitle && <p className="about-card-sub">{subtitle}</p>}
        {body && <p className="about-card-text">{body}</p>}
        {meta && <span className="about-card-meta">→ {meta}</span>}
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const rootRef = useRef<HTMLElement | null>(null);

  // Lightweight scroll-reveal: toggles `.in` on any [data-reveal] element when it enters the viewport.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="grain" aria-hidden />
      <SiteChrome page="about" />
      <main className="about-page" ref={rootRef}>

      {/* Top ticker — brutalist marquee */}
      <div className="about-ticker" aria-hidden>
        <div className="about-ticker-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>
              ZIAUL ISLAM <span className="dot">●</span> SENIOR PRODUCT DESIGNER <span className="dot">●</span> DELHI NCR · IST +5:30 <span className="dot">●</span> OPEN TO WORK <span className="dot">●</span>{" "}
            </span>
          ))}
        </div>
      </div>

      {/* §01 — Hero */}
      <header className="about-hero" data-reveal>
        <span className="about-eyebrow">§01 — INTRODUCTION / FILE_001</span>
        <h1 className="about-h1">
          <span className="about-h1-line">Ziaul</span>
          <span className="about-h1-line"><span className="about-h1-slash">/</span>Islam</span>
        </h1>
        <p className="about-lead">
          Senior Product Designer based in Delhi NCR. I ship at scale — payments, gamification, and AI tooling for B2B and B2C audiences. Seven years in, I lead design systems that hold up across brands, prototype in code so engineers stop guessing, and vibe-code agents and Figma plugins to do my own job 10× faster. Currently designing <strong>6labs.ai</strong> at BlueStacks.
        </p>
        <div className="about-hero-meta">
          <div><span className="k">ROLE</span><span className="v">Senior Product Designer</span></div>
          <div><span className="k">BASE</span><span className="v">Delhi NCR · IST +5:30</span></div>
          <div><span className="k">YEARS</span><span className="v">07</span></div>
          <div><span className="k">STATUS</span><span className="v v-accent">● Open to roles</span></div>
        </div>
      </header>

      {/* Dark horizontal projects strip (full-bleed band) */}
      <div className="about-strip" data-reveal>
        <div className="about-strip-rule" aria-hidden />
        <ul className="about-strip-row">
          {WORK.map((w, i) => (
            <li key={`${w.no}-${w.brand}`} className="about-strip-cell" style={{ ["--i" as string]: i }}>
              <span className="about-strip-tag">
                {w.kind}<span className="about-strip-no">№{w.no}</span>
              </span>
              <span className="about-strip-brand">
                {w.brand}<span className="about-strip-desc">{w.desc}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="about-strip-pin" aria-hidden>
          <span className="dot" />
        </div>
        <div className="about-strip-rule about-strip-rule--bottom" aria-hidden />
      </div>

      {/* §02 — Currently */}
      <section data-reveal>
        <SectionHead no="02" label="CURRENTLY" />
        <div className="about-grid-dl">
          <dl>
            <dt>Role</dt>
            <dd>Product Designer, <strong>BlueStacks / now.gg</strong> — leading design on <strong>6labs.ai</strong>, an AI gameplay analytics platform.</dd>
          </dl>
          <dl>
            <dt>Status</dt>
            <dd><strong style={{ color: "var(--accent)" }}>Open to Senior / Lead Product Designer roles</strong> in Delhi NCR. Bonus points if I get to set up the design system on day one.</dd>
          </dl>
          <dl>
            <dt>Location</dt>
            <dd>Gurugram, Delhi NCR — IST +5:30</dd>
          </dl>
        </div>
      </section>

      {/* §03 — Career Timeline */}
      <section data-reveal>
        <SectionHead no="03" label="CAREER, BRIEFLY" />
        <div className="about-timeline">
          <div className="about-timeline-axis" aria-hidden />
          {TIMELINE.map((row, i) => (
            <div key={`${row.year}-${row.company}-${i}`} className="about-timeline-row" style={{ ["--i" as string]: i }}>
              <span className="yr">{row.year}</span>
              <span className="dot" aria-hidden />
              <span className="role">{row.role} <em>— {row.company}</em></span>
              <span className="note">{row.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* §04 — Now Playing (dark strip variant) */}
      <section data-reveal className="about-section-dark">
        <SectionHead no="04" label="NOW PLAYING" />
        <ul className="about-strip-row about-strip-row--inline">
          {GAMES.map((g, i) => (
            <li key={g.title} className="about-strip-cell" style={{ ["--i" as string]: i }}>
              <span className="about-strip-tag">
                {g.tag}<span className="about-strip-no">№0{i + 1}</span>
              </span>
              <span className="about-strip-brand">
                {g.title}<span className="about-strip-desc">{g.meta}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* §05 — Tools */}
      <section data-reveal>
        <SectionHead no="05" label="TOOLS I USE" />
        <ul className="about-chips">
          {TOOLS.map((t, i) => (
            <li key={t.title} className="about-chip" style={{ ["--i" as string]: i }}>
              <span className="about-chip-tag">{t.tag}</span>
              <span className="about-chip-title">{t.title}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* §06 — Interests & Hobbies */}
      <section data-reveal>
        <SectionHead no="06" label="INTERESTS & HOBBIES" />
        <ol className="about-ledger">
          {HOBBIES.map((h, i) => (
            <li key={h.title} className="about-ledger-row" style={{ ["--i" as string]: i }}>
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="ttl">{h.title}</span>
              <span className="bd">{h.body}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* §07 — On Rotation */}
      <section data-reveal>
        <SectionHead no="07" label="ON ROTATION" />
        <div className="about-rotation">
          <div>
            <p className="about-rotation-label">▸ Reading</p>
            {READING.map((r, i) => (
              <div key={r.title} className="about-rotation-item" style={{ ["--i" as string]: i }}>
                <strong className="about-rotation-title">{r.title}</strong>
                <span className="about-rotation-sub">{r.subtitle}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="about-rotation-label">▸ Listening</p>
            {LISTENING.map((l, i) => (
              <div key={l.title} className="about-rotation-item" style={{ ["--i" as string]: i }}>
                <strong className="about-rotation-title">{l.title}</strong>
                <span className="about-rotation-sub">{l.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §08 — Stuff I Believe */}
      <section data-reveal>
        <SectionHead no="08" label="STUFF I BELIEVE" />
        <ol className="about-believes">
          {BELIEVES.map((b, i) => (
            <li key={b} style={{ ["--i" as string]: i }}>
              <span className="manifest">{b}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* §09 — Get in Touch */}
      <section data-reveal>
        <SectionHead no="09" label="GET IN TOUCH" />
        <h2 className="about-cta">Let&apos;s build something <em>obvious</em>.</h2>
        <div className="about-contact">
          <a href="mailto:ziaul.islam14@gmail.com" className="about-contact-link">
            <span className="lbl">Email</span>
            <span className="val">ziaul.islam14@gmail.com</span>
            <span className="arr">↗</span>
          </a>
          <a href="https://www.linkedin.com/in/ziaulislam14/" target="_blank" rel="noopener" className="about-contact-link">
            <span className="lbl">LinkedIn</span>
            <span className="val">/in/ziaulislam14</span>
            <span className="arr">↗</span>
          </a>
          <a href="https://github.com/ziaulislam14" target="_blank" rel="noopener" className="about-contact-link">
            <span className="lbl">GitHub</span>
            <span className="val">@ziaulislam14</span>
            <span className="arr">↗</span>
          </a>
          <Link href="/" className="about-contact-link about-contact-back">
            <span className="lbl">Back</span>
            <span className="val">← Portfolio index</span>
            <span className="arr"> </span>
          </Link>
        </div>
      </section>

      <footer className="about-footer">
        <span>© ZIAUL ISLAM — {new Date().getFullYear()}</span>
        <span className="asterisk">END OF FILE / EOF</span>
      </footer>

      </main>
    </>
  );
}
