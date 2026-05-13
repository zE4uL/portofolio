import type { Metadata } from "next";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Ziaul Islam — Resume",
  description: "Senior Product Designer · Design System Officer",
  robots: { index: false, follow: false },
};

export default function ResumePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.name}>Ziaul Islam</h1>
          <p className={styles.title}>Senior Product Designer · Design System Officer</p>
          <p className={styles.lede}>
            I lead AI-native products from idea to ship. Today: sole designer on 6labs.ai (12 studios live, paying users). Architect of Float, the parent/child design system behind now.gg.
          </p>
          <ul className={styles.highlights}>
            <li><strong>12 studios live</strong> · 6labs.ai AI agents</li>
            <li><strong>60+ studios · 7,000+ devs</strong> · nowStudio</li>
            <li><strong>5 designers · 4 products</strong> · Float DS</li>
          </ul>
        </div>
        <div className={styles.contact}>
          <div className={styles.contactRow}>
            <span className={styles.contactLabel}>Email</span>
            <span className={styles.contactValue}>ziaul.islam14@gmail.com</span>
          </div>
          <div className={styles.contactRow}>
            <span className={styles.contactLabel}>LinkedIn</span>
            <span className={styles.contactValue}>linkedin.com/in/ziaulislam14</span>
          </div>
          <div className={styles.contactRow}>
            <span className={styles.contactLabel}>Phone</span>
            <span className={styles.contactValue}>+91 9560377940</span>
          </div>
          <div className={styles.contactRow}>
            <span className={styles.contactLabel}>Location</span>
            <span className={styles.contactValue}>Delhi NCR · open to remote / relocation</span>
          </div>
          <div className={styles.contactRow}>
            <span className={styles.contactLabel}>Portfolio</span>
            <span className={styles.contactValue}>ziaulislam.me</span>
          </div>
        </div>
      </header>

      <main className={styles.body}>
        <section className={styles.colLeft}>
          <h2>Work experience</h2>

          <div className={styles.role}>
            <div className={styles.roleHeader}>
              <p className={styles.roleTitle}>BlueStacks / now.gg — Product Designer → Senior</p>
              <p className={styles.roleMeta}>2021 → Present</p>
              <p className={styles.roleNote}>
                Promoted to Senior, March 2024 · Recognized as Design System Officer by the Principal Designer.
              </p>
            </div>
            <ul className={styles.bullets}>
              <li>
                <strong>6labs.ai</strong> <em>(2025 → present)</em> — AI gameplay analytics: players, understood in seconds. Sole designer, idea → live product. Shipped 4 agents, held 1 back as a discipline call. <strong>12 studios in active pilot</strong> across US, Japan, and Korea — paying users.
              </li>
              <li>
                <strong>AI-native workflow</strong> <em>(2025 → present)</em> — Built <strong>4 Claude Code skills, 3 Figma plugins, 3 internal workshops</strong> to make the Figma↔code round-trip the team default. 10 people on the loop; the system is what shipped 6labs.ai.
              </li>
              <li>
                <strong>nowStudio</strong> <em>(2022 → present)</em> — Lead designer, co-led v1 with a peer, solo from v2. One upload → <strong>six stores</strong> (Cloud, BlueStacks, Huawei, Amazon, OnePlus, Xiaomi). <strong>60+ studios live, 100+ titles, 7,000+ devs</strong>. Time-to-publish: 4–5 days → a single sitting. nowSDK Payments take: 30% → 0–5%.
              </li>
              <li>
                <strong>Float design system</strong> <em>(2023 → present)</em> — Architected one parent + four child DSes consumed by <strong>5 designers across 4 products</strong>. ~100 tokens (pre-Variables, via plugin), 100+ icons, 200+ components.
              </li>
              <li>
                <strong>BlueStacks core platform</strong> <em>(2021 → 2025)</em> — Designed across <strong>10 surfaces</strong> of the world&rsquo;s most-used Android emulator (500M+ users, 200+ countries). Cloud era (BSX, Console Mode), revenue (Payments SDK, Ads), Mobile (~1M+ installs across three iterations), and the Moments work that seeded 6labs.
              </li>
              <li>
                <strong>Gamification</strong> <em>(2021 → 2024)</em> — Six behavior-loop surfaces: launcher Quests, Payments cashback, receipt mini-games, LINE/Telegram bots, now.gg Profile, PlayPal Mobile. <strong>~$300K/month</strong> in player IAP spend across the stack. Retired Quests when the publisher market pivoted CPI → ROAS — shipping discipline, not a failed feature.
              </li>
            </ul>
          </div>

          <div className={styles.role}>
            <div className={styles.roleHeader}>
              <p className={styles.roleTitle}>Amway India — Contract Product Designer</p>
              <p className={styles.roleMeta}>2020 → 2021</p>
            </div>
            <p className={styles.roleBody}>
              Redesigned Amway India&rsquo;s <strong>app and website</strong> for ABO sellers and retail buyers. DS lead on a 2-designer pod: led the design-system effort and shared app + web screens with one co-designer. Built a shared DS aligned with Amway&rsquo;s global brand guidelines so two designers could ship two surfaces without drift. Rolled off mid-rollout.
            </p>
          </div>

          <div className={styles.role}>
            <div className={styles.roleHeader}>
              <p className={styles.roleTitle}>Earlier — UI/UX Designer</p>
              <p className={styles.roleMeta}>Ikokas Digital Technologies (2020) · Alpha Agency (2019 → 2020)</p>
            </div>
            <p className={styles.roleBody}>
              Client work across B2B and B2C — SaaS products, portals, and interactive portfolio sites.
            </p>
          </div>
        </section>

        <aside className={styles.colRight}>
          <h2>Education &amp; Learning</h2>
          <div className={styles.eduItem}>
            <strong>B.Tech CSE</strong>
            <span>Galgotias University, Greater Noida</span>
          </div>
          <div className={styles.eduItem}>
            <strong>Certified Usability Analyst (HFI-CUA™)</strong>
            <span>HFI Academy, Dec 2020</span>
          </div>
          <div className={styles.eduItem}>
            <strong>UX Design Fundamentals</strong>
            <span>Coursera, Apr 2020</span>
          </div>

          <h2>Skills</h2>
          <div className={styles.skillGroup}>
            <span className={styles.skillLabel}>Domains</span>
            <span className={styles.skillValue}>AI-native product design · Design systems at scale · B2B platforms · B2C consumer products · ML/UX</span>
          </div>
          <div className={styles.skillGroup}>
            <span className={styles.skillLabel}>Methods</span>
            <span className={styles.skillValue}>UX research · Usability testing · Journey mapping · IA · Prototyping · Interaction · Visual design · A/B testing</span>
          </div>
          <div className={styles.skillGroup}>
            <span className={styles.skillLabel}>Process</span>
            <span className={styles.skillValue}>Agile · Lean · Kanban · Design tokens · Governance · HTML &amp; CSS fundamentals</span>
          </div>

          <h2>Tools</h2>
          <div className={styles.skillGroup}>
            <span className={styles.skillLabel}>Design</span>
            <span className={styles.skillValue}>Figma · Storybook · Figma Plugin API</span>
          </div>
          <div className={styles.skillGroup}>
            <span className={styles.skillLabel}>AI / IDE</span>
            <span className={styles.skillValue}>Claude Code · Cursor · Antigravity (AI-native IDE)</span>
          </div>
          <div className={styles.skillGroup}>
            <span className={styles.skillLabel}>Workflow</span>
            <span className={styles.skillValue}>Notion · MCP servers</span>
          </div>
        </aside>
      </main>
    </div>
  );
}
