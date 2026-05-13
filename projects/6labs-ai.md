# 6labs.ai — AI Gameplay Analytics Platform

**Company:** BlueStacks / now.gg
**Years:** 2025–present
**Role:** Sole product designer (idea → live product)
**Tier:** 1 — headline case study, AI flagship

---

## Hook

BlueStacks had been capturing real gameplay video at scale through AI Highlights. Game devs were still watching sessions one at a time. 6labs.ai connects the two — an AI platform trained on millions of hours of real player sessions, where a dev asks *"where are players losing the most HP and what's causing it?"* and gets an answer in seconds. I led design from leadership's whiteboard sketch to a 4-agent product now serving 12 studios.

**Meta strip:**
Sole designer · 2 PMs · 4 agents shipped (1 held back) · 12 studios signed in 30 days · Pilot incl. Free Fire–class title · Demos US / Japan / Korea

---

## §01 — The setup

The goldmine was sitting in plain sight.

- **AI Highlights** had been running inside the BlueStacks App Player for a while — a constantly growing corpus of real, unprompted gameplay video.
- Game devs' status quo for understanding their own players was unchanged: schedule playtests, watch hours of recordings, write notes. Slow. Biased. Small-N.
- Mid-2024 onwards, AI productivity tools were reshaping every adjacent industry — every dev tooling roadmap had an AI line item.
- Internal read at BlueStacks: *we're sitting on a goldmine devs would pay for.*

Leadership assigned the work. I was the sole designer.

---

## §02 — The framing

Leadership had the idea: *an AI platform trained on our gameplay corpus, giving devs superpowers in player understanding.*

My job was to translate that into a product. Three sub-questions had to be answered before any UI got drawn:

1. **What insights can this data actually surface?** (capability ceiling)
2. **Which of those would change a dev's work?** (value floor)
3. **How does a dev reach those insights without being a data scientist?** (access)

Two constraints I set early to keep the work meaningful, not just impressive:

- **Every insight must be traceable back to real video.** Devs trust their eyes, not stats. Ungrounded AI summaries get ignored.
- **Every agent has to map to a job a dev already does.** Don't invent new dev workflows — augment the ones they have.

These two constraints ended up shaping every iteration that followed.

---

## §03 — The design moves

The product evolved across three iterations, each driven by what we learned from the previous one. A fifth agent exists but didn't ship — and that decision matters as much as the ones that did.

### Iteration 1 — Filtered video (POC)

**The dev problem we anchored on.**
Studios were burning real money to understand their own players. They'd commission playtests, then assign people to watch the recordings to find moments that mattered — fights, drop-offs, exploits, confused players. Most of the watching produced nothing usable. The cost was paid twice: once to run the playtest, again to extract value from it manually.

**What we built.**
A POC where AI auto-tagged every video in our corpus across player behaviour signatures, and devs filtered by those tags to surface the exact sessions they wanted. Limited dev resources, narrow scope.

**What we learned.**
Devs liked it — it was already faster than the playtest-then-watch loop. But the feedback was consistent: *"go further. We don't want to watch better videos. We want the answer, with the videos as proof."*

**Decision.**
Expand scope. Move from filtered playback to generated insights, with video as evidence underneath.

### Iteration 2 — Natural-language input + two agents

We made the product AI-native: a natural-language input field, and two agents behind it.

- **Radiologist** — built on top of the filter piece. Adds an AI-generated session summary, a timeline of key events, and session metadata (region, platform, device, session length). The deep-dive surface for one session at a time.
- **Oracle** — experimental, focused-query agent. Devs ask things like *"where did players lose the most HP and what caused it?"* or *"summarise rotation, drop spot, key moves, final-zone path."* Answers across many sessions at once.

**What we observed.**
Both agents worked. But devs hit a learning curve we hadn't fully predicted — even with suggested queries and hints, devs didn't know *what to ask* a system this powerful. The capability was there; the access wasn't.

### Iteration 3 — Barista, the on-ramp

**Insight.**
The gap wasn't agent quality — it was query authoring. Devs needed an assistant that *proposed* the next question, not one that waited for one.

**What we built.**
Barista — a personal assistant that proactively suggests analyses based on the dev's role on the team (PM, game designer, LiveOps lead, marketer) and the data flowing in. It sits *above* Radiologist and Oracle as the orchestrator: Barista decides which agent to invoke, and frames the result in language that fits the role.

This is the surface most users land in first now. Barista is the on-ramp; Radiologist and Oracle are the depth.

### Held back — Guardian

**What it does.**
Detects ad fraud and gathers video evidence to recover UA spend.

**Why it didn't ship with the others.**
Fraud detection is sensitive territory — it deals with real ad spend and real accusations against real partners. We chose to push it back, raise the accuracy bar, and run more testing before making it available. Shipping discipline mattered more than shipping count.

---

## §04 — Built in an AI-native workflow

6labs.ai was designed in an AI-native workflow — Figma↔code round-trips through Claude Code, custom Claude Code skills built for the team, and internal AI workshops to bring the broader org along.

→ Full process case study: *Building 6labs.ai with Claude Code* (link)

---

## §05 — What shipped + early signal

**The surface today.**
Four agents (Barista, Radiologist, Oracle, Forecaster) powered by the SixthSense™ Engine — the platform's name for the gameplay-trained model layer underneath. Barista is the default landing experience; Radiologist and Oracle are accessed through it or directly.

**Signal.**
- Pilot demo with a Free Fire–class title, presented to studios in **US, Japan, and Korea**.
- **12 studios signed in 30 days.** This is commercial conviction, not engagement — devs paying to use the product, not just clicking around.
- The pilot tour functioned as our usability research. Every studio meeting was a study we couldn't have run earlier with a static product.

---

## §06 — What I'd do differently

1. **Start the project AI-native from day one.** I integrated my Figma↔code round-trip workflow partway in. Doing it from the start would have kept the design system tighter in code, and I'd have used dev branches as a design exploration surface, not a downstream artifact.
2. **Wizard-of-Oz the agents before any infra.** Before Iteration 1's POC, we should have walked devs through fake agent responses in Figma to surface the *"what would I even ask this?"* gap that Barista eventually solved. We discovered that gap *post-launch* of Iteration 2 — six months late.
3. **Build agent-evaluation rubrics with PMs from week one.** With agents, "looks right" isn't a quality bar — you need pre-defined eval cases, co-authored with PMs at concept time. We're catching up on this now.

---

## Public references

- now.gg developer ecosystem: https://docs.now.gg/
- BlueStacks AI Highlights (the data corpus 6labs.ai is trained on): https://support.bluestacks.com/hc/en-us/articles/41490617504141-Everything-you-need-to-know-about-AI-Highlights-on-BlueStacks-5

## Open questions for the live page

- One showable flow to feature in §05 visuals — *recommend Oracle*: most novel capability, easiest to anonymize, most differentiated narrative ("HP loss" demo).
- Barista suggestion-card screenshot to support the on-ramp story.
- Whether the AI-native workflow case study link is live yet — if not, the callout reads "coming soon."
