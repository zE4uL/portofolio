# chkstepan.com — Inspiration Reference for Portfolio Build

> Source: https://chkstepan.com (Next.js + SCSS Modules + Framer Motion + GSAP/ScrollTrigger + Lenis).
> This document is a re-engineering breakdown for *inspiration only*. Build from scratch — do not copy code.
> Sections: 1) Hero, 2) Orbiting Sticker, 3) Stacking Cards / "What You Get / When Clarity Meets" — use this one for the **Methods** section of my portfolio.

---

## 0. Global stack & conventions

- **Next.js** App Router with **SCSS Modules** for scoped class names.
- **Framer Motion** (`motion/react`) — entrance reveals, `useInView`, `motion.span` variants, `useMotionValue` for performant text changes.
- **GSAP + ScrollTrigger** — scroll-driven parallax and pinning. Registered once: `gsap.registerPlugin(ScrollTrigger)`.
- **Lenis** — smooth scroll wrapper around the whole page (`<html class="lenis">`). Synced with ScrollTrigger via `ScrollTrigger.scrollerProxy` or via Lenis `on('scroll', ScrollTrigger.update)` + `gsap.ticker`.
- **Type & sizing**: fluid clamps everywhere — e.g. `font-size: clamp(2.375rem, -0.304rem + 13.39vw, 20.625rem)`. Don't use fixed px for headings.
- **Fonts** observed: `Thunder-LC` (heavy condensed sans, hero headlines), `Thunder-HC` (italic-leaning cut), `Dirtyline` (swashy script), `Nohemi` (UI/body).
- Colors observed: background `#212121`, fg `#FDFDFD`, accent green `#729E84`, peach/pink card backgrounds (`#B69178`, `#F27CA3`).

---

## 1. Hero Section

### 1.1 Layout (DOM)

```html
<section class="hero">
  <canvas class="wavesCanvas" />                  <!-- animated background -->
  <div class="backgroundStripes">                 <!-- faint vertical guide lines -->
    <div class="stripe" /> × N
  </div>
  <div class="container">
    <div class="content">
      <!-- Top stat row -->
      <div class="stats">
        <div class="statMask"><p><span class="countFirst">50</span>+ Projects Completed</p></div>
        <span class="line" />
        <div class="statMask"><p><span class="countSecond">5</span>+ Years of Experience</p></div>
        <span class="line" />
        <div class="statMask"><p><span class="countDecimal">98.3</span>/100 Average Performance Score</p></div>
      </div>

      <!-- Main title (split into word masks) -->
      <h1 class="mainTitle">
        <div class="body">                        <!-- flex row, space-between -->
          <div class="lineMask"><span class="word">I</span></div>
          <div class="lineMask"><span class="word">Build</span></div>
          <div class="lineMask">
            <span class="word">
              <span>Mo</span>
              <span class="fontChange">d</span>   <!-- swap font: Dirtyline swash -->
              <span>ern</span>
            </span>
          </div>
          <div class="lineMask">
            <span class="word highlight">Websites</span>  <!-- accent green, with shuffle effect -->
          </div>
        </div>
      </h1>

      <!-- Subtitle: huge, right-aligned, overlaps mainTitle baseline -->
      <h1 class="subTitle">
        <div class="subTitleBody">
          <div class="lineMask"><div class="wordWrapper"><span class="subWord">That</span></div></div>
          <div class="lineMask">
            <div class="wordWrapper">
              <span class="subWord fontChange">Work</span>
              <span class="underline" />          <!-- green bar scaling in from right -->
            </div>
          </div>
        </div>
      </h1>

      <!-- About block -->
      <div class="about">
        <p class="title">About</p>
        <div class="textBlock">
          <p class="description">I'm a web developer focused on building modern, fast…</p>
          <a class="button">Learn more ↗</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 1.2 Key CSS

```scss
// Fluid typography — match the chunky responsiveness
.word       { font-size: clamp(2.375rem, -0.304rem + 13.39vw, 20.625rem);
              line-height: clamp(2.75rem, 0.034rem + 13.58vw, 21.25rem); }
.subTitle   { font-size: clamp(1.75rem, -0.856rem + 13.03vw, 19.5rem);
              text-align: right;
              margin-top: -100px;                   // pulls subtitle up into mainTitle's baseline
              margin-right: clamp(1.625rem, -0.705rem + 11.65vw, 17.5rem); }

// Line-by-line text reveal masks
.lineMask { overflow: hidden; }
.lineMask span { display: inline-block; }           // each word translates inside its mask

// Word color / font swaps inside a line
.fontChange { font-family: Dirtyline; font-weight: 500; }   // swash "d", "W"
.highlight  { color: #729E84; }                              // muted green

// Animated underline (scales in from right)
.underline {
  position: absolute; right: 0; bottom: clamp(.125rem, …, 3.75rem);
  width: 96.2%; height: clamp(.1rem, …, .525rem);
  background: #729E84;
  transform-origin: 100% center;                    // grows from the right edge
}

// Background grid stripes — equal-spaced 1px vertical lines
.backgroundStripes {
  position: absolute; inset: 0; z-index: -2;
  display: flex; justify-content: space-evenly;
  pointer-events: none;
}
.backgroundStripes .stripe {
  width: 1px; height: 100%;
  background: rgba(253,253,253,0.25);
  will-change: transform;
}
```

### 1.3 Framer Motion entrance choreography

All variants share constants:
- `pageTransitionDelay` — gate so animations only fire after preloader unmounts.
- `defaultEase` and `maskTextEase` — cubic-beziers.

```js
// horizontal hairlines: scale in
const lineVariant  = { initial: { scaleX: 0 },
                       animate: { scaleX: 1, transition: { duration: .7, ease: defaultEase, delay: pageTransitionDelay }}};

// stats count-up mask
const statVariant  = { initial: { y: "140%" },
                       animate: { y: "0",    transition: { duration: .9, ease: defaultEase, delay: pageTransitionDelay }}};

// main title words — staggered via custom={i}
const mainWord     = { initial: { y: "100%" },
                       enter:   i => ({ y: "0", transition: { duration: .75, ease: defaultEase, delay: pageTransitionDelay + .075 * i }})};

// subtitle words — later, different ease
const subWord      = { initial: { y: "108%" },
                       animate: i => ({ y: "0", transition: { duration: .75, ease: maskTextEase, delay: pageTransitionDelay + 1.2 + .075 * i }}),
                       exit:    { y: "108%" }};

// green underline under "Work"
const underline    = { initial: { scaleX: 0 },
                       animate: { scaleX: 1, transition: { duration: .8, ease: defaultEase, delay: pageTransitionDelay + 1.5 }}};

// dropdown variant from top
const fromTop      = { initial: { y: "-100%" },
                       enter:  e => ({ y: "0", transition: { duration: .75, ease: defaultEase, delay: pageTransitionDelay + .6 + .075 * e }})};
```

Each word is rendered as a `motion.span` inside a `.lineMask`:

```jsx
<div className={s.lineMask}>
  <motion.span custom={i} variants={mainWord} initial="initial" animate={ready ? "enter" : ""}>
    {word.text}
  </motion.span>
</div>
```

`ready` comes from a `useLoaderReady()` hook (or any prop/timeout you wire up).

### 1.4 "Websites" shuffle effect

The accent green word has `useShuffle: true`:
1. Render real text first.
2. After ~2s, scramble characters with a 5s `setInterval`, writing via a `motionValue.on('change', …)` → `ref.current.textContent` (avoids React re-renders).
3. Component:

```js
const [tick, setTick]   = useState(0);
const [started, start]  = useState(false);
useEffect(() => {
  if (!ready) return;
  const t = setTimeout(() => { start(true); setTick(n => n + 1); }, 2000);
  const i = setInterval(() => setTick(n => n + 1), 5000);
  return () => { clearTimeout(t); clearInterval(i); };
}, [ready]);
```

### 1.5 Count-up stats (50+, 5+, 98.3)

- Wrap in `.statMask { overflow: hidden }` and translate child from `y:140%` → `0`.
- Number span uses `font-variant-numeric: tabular-nums` + fixed `ch` width so digits don't shift layout.
- Drive with `useMotionValue` + `.on("change", …)` writing directly to `textContent`.

### 1.6 Scroll-out parallax (GSAP)

Layered exit speeds when scrolling past the hero:

```js
ScrollTrigger.create({
  trigger: heroEl, start: "top top", end: "bottom top", scrub: true,
  onUpdate: ({ progress: s }) => {
    gsap.set(stats,    { y: -0.12 * s * 220 });
    gsap.set(title,    { y:  0.16 * s * 220 });
    gsap.set(subTitle, { y:  0.36 * s * 220 });   // moves fastest — "lifts off"
    gsap.set(about,    { y:  0.06 * s * 220 });
  }
});
```

### 1.7 Wavy background canvas

Custom 2D canvas (no library). `<canvas class="wavesCanvas">` positioned absolutely inside `.waves` (`z-index: -1`). Defaults:

```js
const defaults = {
  lineColor:     'rgba(253,253,253,0.x)',
  backgroundColor:'transparent',
  waveSpeedX:    0.0125,
  waveSpeedY:    0.005,
  waveAmpX:      32,
  waveAmpY:      16,
  xGap:          10,    // spacing between points along a line
  yGap:          32,    // spacing between lines
  friction:      0.925, // cursor inertia decay
  tension:       0.005, // pull back to center
  maxCursorMove: 100,
};
```

Per-frame algorithm (`requestAnimationFrame`):

1. Build a grid of points `lines[row][col] = { x, y, wave:{x,y}, cursor:{x,y,vx,vy} }`.
2. Smooth the mouse: `mouse.sx += (mouse.x - mouse.sx) * 0.1`. Compute velocity & angle `atan2(dy, dx)`.
3. For each point:
   - Sample 2D Perlin noise:
     `n = perlin2((x + t*speedX)*0.002, (y + t*speedY)*0.0015) * 12`
   - Wave offset: `wave.x = cos(n) * waveAmpX`, `wave.y = sin(n) * waveAmpY`
   - Cursor influence: push by `cos(angle)*d * mouse.vs * 0.00065` if near mouse.
   - Spring back: `cursor.vx += (0 - cursor.x) * tension; cursor.vx *= friction; cursor.x += 2 * cursor.vx;`
   - Clamp cursor offset to ±`maxCursorMove`.
4. Render: `clearRect`, `beginPath`, for each row `moveTo(first)` then `lineTo` along the row with point = base + wave + cursor.
5. Set `--x` / `--y` CSS vars on the wrapper for a little tracking dot.

Includes a bundled Perlin class (`new Noise(Math.random())`) so each visit looks different. Resize listener rebuilds the grid + canvas size.

### 1.8 Master timeline (T = pageTransitionDelay)

| Time            | What                                                  |
| --------------- | ----------------------------------------------------- |
| T + 0.00s       | Stats numbers + hairlines (`y: 140%→0` / `scaleX: 0→1`) |
| T + 0.00s + .075·i | Main title words mask-reveal staggered                |
| T + 0.60s + .075·i | Subtitle dropdowns from top (`y: -100%→0`)           |
| T + 1.20s + .075·i | Subtitle "That / Work" (`y: 108%→0`, `maskTextEase`) |
| T + 1.50s       | Green underline (`scaleX: 0→1` from right)            |
| T + 2.00s       | "Websites" begins shuffle loop                        |
| always          | Canvas waves (RAF, cursor-reactive)                   |
| on scroll       | Parallax exit (GSAP `scrub`)                          |

---

## 2. Orbiting Sticker ("chkstepan ✦")

### 2.1 Component summary

A circular badge that continuously rotates a ring of single-character spans around a fixed center image. Uses **Framer Motion** for rotation/scale and **trigonometry** to lay out spans (no SVG `textPath`).

- Disc: 200×200 at desktop, `border-radius: 50%`, dark gray `#494949`.
- Ring: a `motion.div` containing many absolutely-positioned `<span>`s.
- Center: 100×100 `<img>`, `pointer-events: none` so hover stays on the ring.
- Hover modes: `speedUp` (4× faster), `pause` (spring stop), `goBonkers` (20× + scale-down). Default rotation is one turn per 20s.

### 2.2 DOM

```html
<div class="circularTextContainer">
  <div class="circularText">                <!-- motion.div that spins -->
    <span class="firstFont">c</span>        <!-- Dirtyline,  14px -->
    <span class="firstFont">h</span>
    …                                       <!-- "chkstepan" -->
    <span class="separator">  ✦  </span>    <!-- green #729E84 -->
    <span class="secondFont">c</span>       <!-- Nohemi,    16px -->
    …
    <span class="separator">  ✦  </span>
    <span class="thirdFont">c</span>        <!-- Thunder-HC, 17px/600 -->
    …
    <!-- pattern repeats once more to fill the ring -->
  </div>
  <img class="centerIcon" src="/sticker-center.png" />
</div>
```

Band order: `chkstepan (firstFont) ✦ chkstepan (secondFont) ✦ chkstepan (thirdFont) ✦ chkstepan (firstFont) ✦ chkstepan (secondFont) ✦`. `flatMap` each band into individual char objects.

### 2.3 CSS

```scss
.circularTextContainer {
  width: 200px; height: 200px;
  background: #494949;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  position: relative;
  margin: 0 auto;
}

.circularText {
  position: relative;
  width: 200px; height: 200px;
  transform-origin: 50% center;
  user-select: none;

  span {
    position: absolute;
    top: 50%; left: 50%;                         // center anchor
    display: inline-block;
    color: #FDFDFD;
    transform-origin: 0 0;                       // rotate around center
    transition: 0.25s cubic-bezier(0, 0, 0, 1);  // smooth font/scale tweens
  }

  .firstFont  { font-family: Dirtyline;   font-size: 14px; }
  .secondFont { font-family: Nohemi;      font-size: 16px; }
  .thirdFont  { font-family: Thunder-HC;  font-size: 17px; font-weight: 600; }
  .separator  { color: #729E84;           font-size: 16px; }
}

.centerIcon {
  position: absolute;
  width: 100px; height: 100px;
  display: flex; align-items: center; justify-content: center;
  z-index: 10;
  pointer-events: none;
  user-select: none;
  img { width: 100%; height: 100%; object-fit: contain; }
}
```

Responsive disc/icon sizes (with plain media queries, not clamp):

| Breakpoint     | Disc | Icon |
| -------------- | ---- | ---- |
| ≥1920          | 200  | 100  |
| 1440–1919      | 190  | 95   |
| 1024–1439      | 170  | 85   |
| 768–1023       | 150  | 75   |
| 640–767        | 130  | 65   |
| 480–639        | 110  | 55   |
| <480           |  90  | 44   |

Font sizes drop 1px per step.

### 2.4 Character placement

```js
const radius = containerSize / 2;
const total  = chars.length;

chars.map((c, i) => {
  const angleDeg = (360 / total) * i;
  const angleRad = angleDeg * Math.PI / 180;
  const x =  Math.sin(angleRad) * radius;
  const y = -Math.cos(angleRad) * radius;
  return (
    <span style={{ transform: `translate(${x}px, ${y}px) rotate(${angleDeg}deg)` }}>
      {c}
    </span>
  );
});
```

Round to 2 decimals (`Math.round(n*100)/100`) and use `suppressHydrationWarning` on the spans to dodge SSR diff noise.

### 2.5 Spin animation (Framer Motion)

```js
import { motion, useAnimation, useMotionValue, useInView } from "motion/react";

const spin = (durationSec, fromAngle, repeat = true) => ({
  from: fromAngle,
  to:   fromAngle + 360,
  ease: "linear",
  duration: durationSec,
  type: "tween",
  repeat: repeat ? Infinity : 0,
});

const transitionFor = (durationSec, fromAngle) => ({
  rotate: spin(durationSec, fromAngle),
  scale:  { type: "spring", damping: 20, stiffness: 300 },
});
```

Component sketch:

```jsx
function CircularText({ spinDuration = 20, onHover = "speedUp", className = "" }) {
  const ringControls   = useAnimation();
  const centerControls = useAnimation();
  const rotation       = useMotionValue(0);

  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const started = useRef(false);

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      ringControls.start({ rotate: 360, scale: 1, transition: transitionFor(spinDuration, 0) });
    }
  }, [inView]);

  const handleHover = () => {
    const current = rotation.get();
    let trans = transitionFor(spinDuration, current);
    let ringScale = 1, iconScale = 1;

    if (onHover === "speedUp")    trans = transitionFor(spinDuration / 4,  current);
    if (onHover === "goBonkers") { trans = transitionFor(spinDuration / 20, current); ringScale = 0.8; iconScale = 0.8; }
    if (onHover === "pause")      trans = { rotate: { type: "spring", damping: 20, stiffness: 300 }, scale: { type: "spring", damping: 20, stiffness: 300 } };

    ringControls.start({ rotate: current + 360, scale: ringScale, transition: trans });
    centerControls.start({ scale: iconScale, transition: { type: "spring", damping: 20, stiffness: 300 } });
  };

  const handleLeave = () => {
    const current = rotation.get();
    ringControls.start({ rotate: current + 360, scale: 1, transition: transitionFor(spinDuration, current) });
    centerControls.start({ scale: 1, transition: { type: "spring", damping: 20, stiffness: 300 } });
  };

  /* …render the band-flatmapped chars (see §2.2/2.4)… */
}
```

Linear rotation, spring scale — never jerky.

---

## 3. Methods Section — Stacking Cards with "Reveal Title"

This is the pattern I want for my **Methods** section on my portfolio. Uses **CSS `position: sticky`** + a **CSS `mask-image`** for the title reveal, then **GSAP ScrollTrigger** to pin and stack a series of full-bleed cards.

### 3.1 The "When Clarity Meets Performance" reveal

A 300vh tall outer container holds a 100vh sticky inner. The sticky inner has a `mask-image` (an SVG of the headline text) that *cuts a hole* through a flat white panel, so as you scroll, what was hidden beneath (the dark page background plus the next section) becomes readable through the text-shaped hole. The headline text isn't a real `<h1>` — it's the *negative space* in the mask.

```html
<section class="contentWrapper">
  <div class="stickyContainer">
    <div class="stickyMask">                <!-- 100vh, position: sticky, with mask-image -->
      <div class="content">…</div>          <!-- whatever sits behind the mask -->
    </div>
  </div>

  <div class="afterMaskContent">
    <div class="horizontalLine" />
    <div class="stripesWrapper">
      <div class="backgroundStripes darkTheme">
        <div class="stripe" /> × 8
      </div>

      <div class="entranceText">
        <div class="textWrapper">
          <div class="plusLeft"><img src="/icons/PlusDark.svg" /></div>
          <div class="plusRight"><img src="/icons/PlusDark.svg" /></div>
          <div class="textLine">
            <span class="simpleFont">What</span>
            <span class="simpleFont">You</span>
            <span class="simpleFont">Get</span>
          </div>
          <div class="textLine">
            <span class="simpleFont">When</span>
            <span class="simpleFont">Clarity</span>
          </div>
          <div class="textLine">
            <span class="simpleFont">Meets</span>
          </div>
          <div class="textLine">
            <span class="italicFont">Performance</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

Key CSS:

```scss
.contentWrapper { position: relative; }

.stickyContainer { position: relative; height: 300vh; }

.stickyMask {
  position: sticky; top: 0;
  width: 100%; height: 100vh;
  background: #FDFDFD;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  mask-image: url("/images/other/ClarityPerformanceMask.svg");  // SVG of the headline shape
  mask-position: 38.08% 50.86%;                                  // fine-tuned center
  mask-size: 100%;
  mask-repeat: no-repeat;
  // -webkit-mask-* equivalents for Safari
}

.afterMaskContent {
  position: relative; z-index: 10;
  background: #FDFDFD;
  text-align: center;

  .horizontalLine {
    position: absolute; top: 0; left: 0;
    width: 100%; height: 1px;
    background: rgba(33,33,33,.2);
    transform-origin: 50% center;
    will-change: transform;
  }

  .entranceText {
    display: flex; justify-content: center; align-items: center;
    padding-top: clamp(2.375rem, 2.265rem + 0.55vw, 3.125rem);
    position: relative;
  }
  .textWrapper { display: inline-block; position: relative; }

  .plusLeft, .plusRight {
    position: absolute; top: -20px;
    width:  clamp(.5rem, .445rem + .28vw, .875rem);
    height: clamp(.5rem, .445rem + .28vw, .875rem);
  }
  .plusLeft  { left: -24px; }
  .plusRight { right: -24px; }

  .textLine {
    display: flex; justify-content: center; align-items: baseline;
    gap: clamp(.5rem, .298rem + 1.01vw, 1.875rem);
  }

  .simpleFont, .italicFont {
    color: #212121;
    text-transform: uppercase;
    font-weight: 700; margin: 0;
    font-size: clamp(2.625rem, 1.542rem + 5.41vw, 10rem);
    display: inline-block;
  }
  .simpleFont { font-family: Thunder-LC; }
  .italicFont { font-family: Thunder-HC; font-style: italic;
                font-size: clamp(2.5rem, 1.417rem + 5.41vw, 9.875rem); }
}
```

Simpler alternatives if you don't want to bother making the SVG mask:
- Just use a real `<h1>` with a `position: sticky` parent and stagger word reveals on scroll with `useScroll`/`useTransform` (Framer Motion) or a GSAP `scrub` timeline.
- Or animate `clip-path: inset(…)` on the headline as you scroll.

### 3.2 Stacking cards (this is the methods pattern)

Multiple full-width cards stack on top of each other as you scroll. Each card pins at the bottom of the viewport using `ScrollTrigger.create({ pin: true, pinSpacing: false })`, while a dark `cardOverlay` fades in on the previous card during the scrub — making it look like the new card slides over and shades the old one.

DOM per card:

```html
<div class="cards">
  <div class="card designCard">
    <div class="cardInner">
      <div class="cardOverlay" />                         <!-- darkens to opacity 1 as you scroll past -->
      <div class="flex">
        <div class="leftSide">
          <div class="head">
            <div class="numberMask"><span class="number">01</span></div>
            <span class="separator" />                    <!-- 1px vertical hairline -->
            <div class="descriptionWrapper">
              <div class="descriptionLineMask"><span class="descriptionLine">I work closely with brands…</span></div>
              <!-- one masked line per visual row of the paragraph -->
            </div>
          </div>
          <button class="button">Learn more</button>
        </div>
        <div class="rightSide">
          <div class="titleGroup">
            <a class="titleLink">
              <span class="title">DESIGN</span>
              <span class="titleUnderline" />             <!-- scales in 0→1 -->
            </a>
          </div>
          <div class="cardImage">
            <div class="cardLine" />                       <!-- horizontal divider, scaleX 0→1 -->
            <img class="image" src="…" />                  <!-- clipPath reveal: inset(100% 0 0 0) → inset(0% 0 0 0) -->
            <div class="cardImageLabelMask"><span class="cardImageLabel">( it's intention )</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- repeat: engineeringCard, strategyCard, … -->
</div>
```

Per-card color theming via modifier classes (`.designCard`, `.engineeringCard`, …): each sets its own `cardInner` background and the `cardLine` / `titleUnderline` colors so each method has its own palette (e.g. brown `#B69178`, pink `#F27CA3`).

### 3.3 Scroll choreography (GSAP)

```js
gsap.registerPlugin(ScrollTrigger);

useGSAP(() => {
  const cards = gsap.utils.toArray(`.${styles.card}`);

  cards.forEach((card, i) => {
    // ─── Reveal timeline that plays when card is roughly mid-screen ───
    const reveal = gsap.timeline({ paused: true });

    const sep     = card.querySelector(`.${styles.separator}`);
    const number  = card.querySelector(`.${styles.number}`);
    const lines   = card.querySelectorAll(`.${styles.descriptionLine}`);
    const ul      = card.querySelector(/* … */);

    // (truncated in source — extend per your own choreography)
  });
});
```

---

> **NOTE:** Source pasted by user was truncated mid-snippet at §3.3. Re-fetch the full chkstepan stacking-cards script when implementing if needed, but the pattern is clear: per-card timeline + `ScrollTrigger.create({ pin: true, pinSpacing: false })` + a dark `.cardOverlay` that fades 0→1 on scrub.
