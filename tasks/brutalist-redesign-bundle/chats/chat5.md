# Now Studio Case Study

_Started 2026-04-25 10:13 UTC_

---

## User

now lets create project pages one by one, start with the now studio project - also update the title to show in the light bg in the works section they are only visible in hover state. Ask me all the question to create a proper case study that will get me hired including

## Assistant

I'll help you create a proper case study for the Now Studio project. Let me first look at what's already in the project to understand the context and aesthetic.

_[tool: list_files]_

_[tool: read_file]_

I have enough context now. Let me ask you the right questions to build a strong Now Studio case study, and also note the title-on-hover update for the works section.

Before I dive in, I want to make sure I create a case study that actually tells the story of your impact at Now Studio (now.gg) — not just pretty screens. A great case study answers: *what was the problem, what did you do, and what changed because of it?*

_[tool: questions_v2]_

## User

Questions answered:
- role_scope: Worked as a lead product or you can call as a product owner 
- company_context: nowStudio is now.gg's developer platform for publishing, monetizing, and scaling mobile games. It evolved into a **multi-store publishing system**: from one upload, a game can be published to:
- **PC** (BlueStacks app player)
- **Mac**
- **Cloud / browser** (now.gg)
- **LINE** (Japanese super-app)
- **Telegram** (NowStore — recent expansion, payments via TON)
- **Mobile** (BlueStacks mobile app)

Devs manage all channels from one interface. Includes real-time session tracking, growth analytics, test-link generation, and pre-launch feedback collection also with option to integrate our Payments SDK to save on the cut on IAPs charged by google and apple . Powered by nowSDK — described publicly as "the third largest distribution after Apple and Google."
- timeline: 2022–present
Lead designer (was given this project to lead independently after demonstrating growth).
It is a big project which evolved many times over the years
- primary_focus: nowStudio allowed games exposure to a huge user base incresing DAU on bluestacks app player and now.gg cloud with now other stores as well while also getting more revenue on IAPs through our payment SDK.
- problem: Our platform let games to test their build before launch, increase app reach letting them publish in multiple goes and in multiple stores all on 1 Sigle platform - no need to handle them separately single build published and managed from 1 dashboard. google charges a high cut on revenue earned on IAPs we charged very less on using our SDKs. Also giving devs the analytics to tracks the stats and also Have roles and permission in case of mutiple apps handle by different staff.
- constraints: making a multi store publication came with its constraints all have different regulations - had to cater them all. Mutiple goes meant localization of listing asset as per the regions. Had to make the payment SDK integeration as  simple as possible. While making this complex journey of publishing an app as simple as possible.
- process: Researched various competitors, talked to real gave devs for their pain points. Built many iterations based on feedback and data gathered, Studio had 3 big overhauls from a legacy internal tool to collect devs data for our interal team to manage on devs behalf to studio first version for test to test and publish app on now.gg cloud. 2 the Lauch on our SDKs including lauch on games on bluestacks app player and our payments sdk integerating payments on both app player and now.gg with option to manages IAPs its inventory with localized pricing, and features of creating a discord Bot to increase traffic and an analytics dashboard. 3 being the muti store publishing with the introduction of role management.
- key_decisions: the core of our product the publishing flow, iterated on it alot to finally got a flow of getting off the relevant information from the devs without increasing the cognitive load on them tto much asking them for too much information. Only what was required and giving defaults wherever possible with options to fetch assets like for eg google store to pick also uploaded listing assets, breaking a flow in a few simple steps to launch a test or live app. Also the handling of multiple test builds. 

The IAPs and role managements features - handling multiple IAPs with different local pricings for different goes ( added a template option for easy head start) and similarly management of users allowing them to only access specific flow of the studios in multiple apps.
- metrics: -35%
TIME-TO-FIRST -PUBLISH

60 +
Devs onboarded in last 1 years

23% +
revenue from Payments SDK

SUGGEST MORE 


- assets_available: Final UI screenshots (web/desktop), Design system specs / components, Just the live site — I'll point you to it, help me in creating videos for more impact
- asset_links: https://studio.now.gg/

i have the figma files or the live ui.. once  to prepare the case study guide on what type of screens to upload on the
- team_credit: PMs, Eng leads only.

- tone: Match the portfolio — same brutalist editorial voice, dry wit, mono callouts
- depth: Decide for me
- layout_vibe: i dont have a reasearch documents only figma of all the screens and componets i have build
- target_role: Started as a Individual contributor which on recognition became the design lead and the only designer working on the whole project
- title_hover_confirm: Yes — titles always visible in dark on the light bg, hover flips as it does today

## Assistant

_[tool: read_file]_

_[tool: snip]_

Let me look at the Work section's hover/title behavior more carefully so I can fix the visibility issue, then I'll plan the case study.

_[tool: grep]_

Now I understand the issue. The work section is `.inv` (light bg, dark text by default), but the section-reveal CSS sets `> *` to opacity 0 — and even after reveal, looking at line 497, color is `#0a0a0a !important` which should make titles visible. Let me actually test what's happening.

Looking again at line 497 — `color: #0a0a0a !important` is applied to `.work-item`. That should make titles visible. But on line 843 `.work-item .title` doesn't override color — it inherits. So titles SHOULD be black on the cream background. Let me check the `:not(.hero) > *` opacity rule — yes, `section[data-section]:not(.hero) > *` sets opacity 0 until `.in` is added. That's likely fine.

Let me actually screenshot to see what the user is seeing:

_[tool: show_html]_

Let me proceed — I need to verify what's wrong with the title visibility before I fix it.

_[tool: show_html]_

Looking at the CSS more carefully — line 836: `.work-item:hover * { color: #0a0a0a !important; }`. On the inverted (light bg) section, this turns text BLACK on hover... but the hover state is supposed to flip to DARK bg with light text. The inverse rule on line 500 does set `color: var(--ink)` on `.work-item:hover .no/.title/...`, but specificity-wise both have `!important`, and line 836 (`.work-item:hover *`) is more general but inv's selector is more specific via `.inv` prefix. So inv should win.

Let me just take a screenshot to see what's actually happening:

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: snip]_

Black background — the section's not in view yet because of the scroll-transition. Let me scroll directly to it:

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: snip]_

The scroll-transition sticky panel is covering it. Let me use eval to check the actual computed styles:

_[tool: eval_js]_

Found it. `.title` color is `rgb(245, 241, 232)` (cream) on cream bg — invisible. Looking at line 847: `.work-item .title` has `color: var(--ink)` which is the cream. The `.inv` rules don't override `.title` color directly. Now I have the bug confirmed.

Now let me plan and start the case study. I'll:
1. Fix the work-item title visibility on light bg
2. Create the now Studio case study page

_[tool: update_todos]_

Let me fix the work-item title color first:

_[tool: str_replace_edit]_

Also need to override the line 836 rule (`.work-item:hover * { color: #0a0a0a !important; }`) which currently makes hover text BLACK — but we want hover to flip to cream (since hover bg is dark/cream on the dark hover overlay). Wait — the `::before` overlay is `--accent` (orange) by default and `#0a0a0a` (black) on `.inv`. So inv hover bg = black. Text should be cream/white on black hover. Line 836's `color: #0a0a0a` is wrong on inv. Let me fix:

_[tool: str_replace_edit]_

Now the now Studio case study page. Let me design a strong narrative with the brutalist aesthetic.

_[tool: write_file]_

_[tool: snip]_

Now let me link the work-list item to this case study:

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: update_todos]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

**now Studio case study is live** at `now Studio - Case Study.html`, linked from work-list item 02.

**Structure** (recruiter-friendly, brutalist editorial):
1. **Hero** — one-line thesis ("One upload, six stores, zero handoff"), role/timeline/team strip, dashboard slab
2. **Problem** — 4 pain points + 4 pillars (Reach / Revenue / Test / Control)
3. **Evolution** — your three overhauls (v1 internal → v2 SDK era → v3 multi-store) + the 6 storefront row
4. **Three key decisions** — publishing flow simplification, IAPs as a matrix, real-team RBAC
5. **Impact** — your 4 metrics in big editorial numbers + the "third largest distribution" pull-quote
6. **More surface** — analytics, test links, Discord bot artifact slots
7. **Reflection** — honest "do again / would change" lists
8. **Next case study** CTA

**Also fixed:** work-list titles are now visible by default on the light bg (dark text), and flip to cream on hover as before.

**Your homework — what to upload to make this hire-worthy:**

| Fig | Slot | What to capture |
|---|---|---|
| 01 | Hero slab | Dashboard hero shot (apps list, channel pills) |
| 02 | Dashboard | Same view, full-bleed, 1920×1080 |
| 03 | Publishing flow | **4 step screens** side-by-side — ideally a 6-10s screen recording |
| 04 | IAP matrix | Pricing table + "save as template" modal |
| 05 | RBAC | Team screen with role chips per app |
| 06 | Analytics | Charts + per-channel breakdown table |
| 07 | Test links | Link generator + feedback inbox (video preferred) |
| 08 | Discord bot | Setup wizard |

**Strong recommendation:** swap Figs 03 and 07 for short looping MP4s (no audio, 4-8s, hover-loop). Static images of multi-step flows always undersell. I can wire video tags in once you have them.

**Suggested extra metrics to add if you have data:** number of apps published total, IAPs configured, test-link sends, support-ticket reduction, any specific dev-quote testimonial.

Want me to start the next case study (BlueStacks DS or 6labs.ai), or iterate on this one first once you upload assets?

## User

Verifier agent check completed

## Assistant

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

Fixed all the inverted-section text-color bleed (timeline year numbers, h4s, store names, metric numbers, reflection lists — all now properly dark on cream).

_[tool: snip]_

_[tool: fork_verifier_agent]_

_[tool: snip]_

Fixed the inverted-section text bleed. Case study now reads cleanly across all sections.

Ready for your next move — upload screenshots into the Fig 01-08 slots, or shall I start the next case study (BlueStacks DS or 6labs.ai)?

## User

Apply 4 direct edits:
1. In now Studio - Case Study.html: set the inline style to `padding: 39px 0px 0px`. at [data-cc-id="cc-2"]
2. In now Studio - Case Study.html: set the inline style to `padding: 37px 0px 0px`. at [data-cc-id="cc-2"]
3. In now Studio - Case Study.html: set the inline style to `padding: 40px 0px 0px`. at [data-cc-id="cc-2"]
4. In now Studio - Case Study.html: set the inline style to `opacity: 0; padding: 0px`. at [data-cc-id="cc-2"]

## Assistant

_[tool: snip]_

The 4 edits all target the same element `[data-cc-id="cc-2"]` with conflicting inline styles. The final state should be `opacity: 0; padding: 0px`. Let me find what cc-2 refers to.

_[tool: eval_js_user_view]_

_[tool: snip]_

The cc-id reference is no longer in the live DOM, so I can't see what element it pointed to. The edits also conflict — they all target the same element with different padding values, ending with `opacity: 0; padding: 0px` (i.e. hiding it).

Could you tell me which element you meant? The breadcrumb, the meta-strip, the hero-side, or something else? If you re-open the page and inline-edit it again, the cc-id will resolve.

