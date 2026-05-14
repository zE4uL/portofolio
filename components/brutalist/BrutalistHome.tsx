"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { workPreviews } from "@/assets/work-previews";
import PlaygroundStage from "@/components/playground/PlaygroundStage";
import RotatingStamp from "@/components/brutalist/RotatingStamp";
import HeroMagneticGrid from "@/components/brutalist/HeroMagneticGrid";
import HeroCRT from "@/components/brutalist/HeroCRT";

export default function BrutalistHome() {
  const router = useRouter();
  const scrollLockRef = useRef(false);
  useSmoothScroll({ lockRef: scrollLockRef });

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMotion) document.body.classList.add("has-custom-cursor");

    // ===== CUSTOM CURSOR =====
    const dot = document.getElementById("cursorDot") as HTMLDivElement | null;
    const ring = document.getElementById("cursorRing") as HTMLDivElement | null;
    const label = document.getElementById("cursorLabel") as HTMLDivElement | null;
    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;

    let cursorRafId = 0;
    const cursorRaf = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      if (label) label.style.transform = `translate(${rx}px, ${ry + 2}px) translate(-50%,-50%)`;
      if (Math.abs(mx - rx) < 0.5 && Math.abs(my - ry) < 0.5) {
        cursorRafId = 0;
        return;
      }
      cursorRafId = requestAnimationFrame(cursorRaf);
    };
    const ensureCursorRaf = () => {
      if (!cursorRafId && !reduceMotion) cursorRafId = requestAnimationFrame(cursorRaf);
    };
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      ensureCursorRaf();
    };
    window.addEventListener("mousemove", onMouseMove);

    const cursorEls = document.querySelectorAll<HTMLElement>("[data-cursor]");
    const cursorListeners: Array<{ el: HTMLElement; enter: () => void; leave: () => void }> = [];
    cursorEls.forEach((el) => {
      const enter = () => {
        ring?.classList.add("hover");
        const mode = el.dataset.cursor || "";
        if (mode === "drag") ring?.classList.add("drag");
        if (label) label.textContent = mode.toUpperCase();
      };
      const leave = () => {
        ring?.classList.remove("hover", "drag");
      };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      cursorListeners.push({ el, enter, leave });
    });

    // ===== MAGNETIC CTAs =====
    type Magnet = {
      btn: HTMLElement;
      inner: HTMLElement | null;
      tx: number; ty: number; x: number; y: number; vx: number; vy: number;
      tix: number; tiy: number; ix: number; iy: number; ivx: number; ivy: number;
      following: boolean;
    };
    const magnets: Magnet[] = [];
    const magnetListeners: Array<{ btn: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    document.querySelectorAll<HTMLElement>("[data-magnet]").forEach((btn) => {
      const inner = btn.querySelector<HTMLElement>(".inner");
      const m: Magnet = {
        btn, inner,
        tx: 0, ty: 0, x: 0, y: 0, vx: 0, vy: 0,
        tix: 0, tiy: 0, ix: 0, iy: 0, ivx: 0, ivy: 0,
        following: false,
      };
      const move = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        m.tx = x * 0.55;
        m.ty = y * 0.85;
        m.tix = x * 0.28;
        m.tiy = y * 0.42;
        m.following = true;
        ensureMagnetRaf();
      };
      const leave = () => {
        m.tx = 0; m.ty = 0; m.tix = 0; m.tiy = 0;
        m.following = false;
        ensureMagnetRaf();
      };
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      magnets.push(m);
      magnetListeners.push({ btn, move, leave });
    });

    // Two springs: a smooth ease-in while the cursor is over the button,
    // a slow soft-bounce return when it leaves.
    const FOLLOW_SPRING = 0.018, FOLLOW_DAMP = 0.86;
    const RETURN_SPRING = 0.006, RETURN_DAMP = 0.94;
    let magnetRafId = 0;
    const magnetRaf = () => {
      let busy = false;
      for (const m of magnets) {
        const SPRING = m.following ? FOLLOW_SPRING : RETURN_SPRING;
        const DAMP   = m.following ? FOLLOW_DAMP   : RETURN_DAMP;
        m.vx = (m.vx + (m.tx - m.x) * SPRING) * DAMP;
        m.vy = (m.vy + (m.ty - m.y) * SPRING) * DAMP;
        m.x += m.vx; m.y += m.vy;
        m.ivx = (m.ivx + (m.tix - m.ix) * SPRING) * DAMP;
        m.ivy = (m.ivy + (m.tiy - m.iy) * SPRING) * DAMP;
        m.ix += m.ivx; m.iy += m.ivy;
        m.btn.style.transform = `translate(${m.x.toFixed(2)}px, ${m.y.toFixed(2)}px)`;
        if (m.inner) m.inner.style.transform = `translate(${m.ix.toFixed(2)}px, ${m.iy.toFixed(2)}px)`;
        if (m.following || Math.abs(m.x) > 0.05 || Math.abs(m.y) > 0.05 || Math.abs(m.vx) > 0.05 || Math.abs(m.vy) > 0.05) busy = true;
      }
      if (!busy) {
        magnetRafId = 0;
        return;
      }
      magnetRafId = requestAnimationFrame(magnetRaf);
    };
    const ensureMagnetRaf = () => {
      if (!magnetRafId && !reduceMotion) magnetRafId = requestAnimationFrame(magnetRaf);
    };

    // ===== STICKY ELASTIC ON CONTACT LINKS =====
    type Sticky = { el: HTMLElement; tx: number; ty: number; x: number; y: number; vx: number; vy: number };
    const stickies: Sticky[] = [];
    const stickyListeners: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];
    let stickyRafId = 0;
    const stickyRaf = () => {
      let busy = false;
      for (const s of stickies) {
        s.vx = (s.vx + (s.tx - s.x) * 0.18) * 0.7;
        s.vy = (s.vy + (s.ty - s.y) * 0.18) * 0.7;
        s.x += s.vx; s.y += s.vy;
        s.el.style.transform = `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px)`;
        if (Math.abs(s.x) > 0.05 || Math.abs(s.y) > 0.05 || Math.abs(s.vx) > 0.05 || Math.abs(s.vy) > 0.05) busy = true;
      }
      if (!busy) {
        stickyRafId = 0;
        return;
      }
      stickyRafId = requestAnimationFrame(stickyRaf);
    };
    const ensureStickyRaf = () => {
      if (!stickyRafId && !reduceMotion) stickyRafId = requestAnimationFrame(stickyRaf);
    };
    document.querySelectorAll<HTMLElement>(".contact-grid a.link").forEach((el) => {
      const s: Sticky = { el, tx: 0, ty: 0, x: 0, y: 0, vx: 0, vy: 0 };
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        s.tx = (e.clientX - (r.left + r.width / 2)) * 0.15;
        s.ty = (e.clientY - (r.top + r.height / 2)) * 0.25;
        ensureStickyRaf();
      };
      const leave = () => {
        s.tx = 0; s.ty = 0;
        ensureStickyRaf();
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      stickies.push(s);
      stickyListeners.push({ el, move, leave });
    });

    // ===== HERO REVEAL =====
    const heroTitle = document.getElementById("heroTitle");
    const heroTimeout = setTimeout(() => {
      heroTitle?.classList.add("in");
    }, 80);


    // ===== MORPHING WORD (per-character cross-fade) =====
    const morphTimers: Array<ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>> = [];
    {
      const stage = document.getElementById("morphStage");
      const sizer = document.getElementById("morphSizer");
      const wrap = document.getElementById("morphWord");
      if (stage && sizer && wrap) {
        const WORDS = [
          "payments",
          "design systems",
          "AI agents",
          "gameplay loops",
          "Figma plugins",
          "SDKs",
          "platforms",
          "analytics",
        ];

        const STAGGER = 22;
        const SWIPE_DURATION = 520;
        const HANDOFF = 320;
        const NBSP = " ";

        const makeWord = (text: string, role: "current" | "outgoing" | "incoming") => {
          const w = document.createElement("span");
          w.className = `morph-word ${role}`;
          for (let idx = 0; idx < text.length; idx++) {
            const ch = text[idx];
            const s = document.createElement("span");
            s.className = "ch";
            s.textContent = ch === " " ? NBSP : ch;
            s.style.transitionDelay = `${idx * STAGGER}ms`;
            w.appendChild(s);
          }
          return w;
        };

        let i = 0;
        let currentWord = WORDS[0];
        sizer.textContent = currentWord;
        stage.innerHTML = "";
        const initial = makeWord(currentWord, "current");
        stage.appendChild(initial);
        let currentEl: HTMLElement = initial;
        let busy = false;

        const swap = () => {
          if (busy) return;
          busy = true;
          i = (i + 1) % WORDS.length;
          const next = WORDS[i];

          sizer.textContent = next;

          const outgoing = currentEl;
          outgoing.classList.remove("current");
          outgoing.classList.add("outgoing");

          const incoming = makeWord(next, "incoming");
          stage.appendChild(incoming);

          // Force reflow so the incoming's hidden state registers before .in is added.
          void incoming.offsetHeight;

          requestAnimationFrame(() => {
            outgoing.classList.add("out");
          });

          // Sequential handoff: let outgoing clear first, THEN bring incoming in.
          // Eliminates the mid-transition overlap where both words read as
          // overlapping blurred glyphs.
          morphTimers.push(
            setTimeout(() => {
              if (outgoing.parentNode) outgoing.parentNode.removeChild(outgoing);
              requestAnimationFrame(() => incoming.classList.add("in"));
            }, HANDOFF),
          );

          const longestIdx = Math.max(next.length, currentWord.length) - 1;
          const total = HANDOFF + SWIPE_DURATION + STAGGER * Math.max(0, longestIdx) + 80;

          morphTimers.push(
            setTimeout(() => {
              incoming.classList.remove("incoming", "in");
              incoming.classList.add("current");
              currentEl = incoming;
              currentWord = next;
              busy = false;
            }, total),
          );
        };

        morphTimers.push(
          setTimeout(() => {
            swap();
            morphTimers.push(setInterval(swap, 3800));
          }, 1800),
        );
      }
    }
    // ===== ABOUT WORD REVEAL =====
    const aboutLead = document.getElementById("aboutLead") as HTMLElement | null;
    const contactTitle = document.getElementById("contactTitle") as HTMLElement | null;
    if (aboutLead && !aboutLead.dataset.revealWrapped) {
      const aboutHTML = aboutLead.innerHTML;
      const parts = aboutHTML.split(/(<em>[^<]+<\/em>|\s+)/g).filter(Boolean);
      aboutLead.innerHTML = parts
        .map((p) => (p.trim() === "" ? p : `<span class="reveal-word">${p}</span>`))
        .join("");
      aboutLead.dataset.revealWrapped = "1";
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            if (en.target === aboutLead) {
              const words = aboutLead!.querySelectorAll<HTMLElement>(".reveal-word");
              words.forEach((w, i) => {
                setTimeout(() => w.classList.add("in"), i * 30);
              });
            }
            if ((en.target as HTMLElement).id === "contactTitle") {
              (en.target as HTMLElement).classList.add("in");
            }
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (aboutLead) io.observe(aboutLead);
    if (contactTitle) io.observe(contactTitle);

    // ===== WORK PREVIEW (brutalist stamp trail) =====
    // The active preview snaps tightly to the cursor and tilts based on
    // horizontal swing velocity (like a stamp dragged across paper). As the
    // cursor moves, fading "imprints" are dropped behind, building a literal
    // ink-trail trace of where the cursor has been.
    const preview = document.getElementById("workPreview") as HTMLElement | null;
    const previewInner = document.getElementById("workPreviewInner") as HTMLElement | null;
    const previewTag = document.getElementById("workPreviewTag") as HTMLElement | null;
    let pvx = 0, pvy = 0, ptx = 0, pty = 0;
    let pvScale = 0.85, targetScale = 0.85;
    let pvRot = 0;
    let pvInitialized = false;
    // Constant-lerp follow: the preview always lags behind a moving cursor
    // and only coincides with it when the cursor stops. Lag is proportional
    // to cursor velocity (steady-state ≈ v*(1-PVLERP)/PVLERP per frame).
    // PVLERP_INTRO is a brief boost on first appearance so the preview
    // travels to the cursor quickly the first frame instead of crawling.
    const PVLERP = 0.16;
    const PVLERP_INTRO = 0.32;
    let pvLerp = PVLERP_INTRO;
    const PVLERP_DECAY = 0.88;
    // Hide debounce — keeps the preview visible while the cursor moves
    // between work-items so it slides between them instead of flickering.
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    const cancelHide = () => {
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    };

    // Eager-preload first frame of every project so first hover shows instantly.
    const preloadedFirstFrame = new Set<string>();
    Object.values(workPreviews).forEach((p) => {
      if (p.frames[0] && !preloadedFirstFrame.has(p.frames[0])) {
        preloadedFirstFrame.add(p.frames[0]);
        const img = new Image();
        img.src = p.frames[0];
      }
    });
    const lazyPreloaded = new Set<string>();

    let cycleTimer: ReturnType<typeof setInterval> | null = null;
    let imgEl: HTMLImageElement | null = null;
    const stopCycle = () => {
      if (cycleTimer) { clearInterval(cycleTimer); cycleTimer = null; }
    };

    const workListeners: Array<{ el: HTMLElement; enter: (e: MouseEvent) => void; move: (e: MouseEvent) => void; leave: () => void }> = [];
    document.querySelectorAll<HTMLElement>(".work-item").forEach((item) => {
      const enter = (e: MouseEvent) => {
        stopCycle();
        const [bg, fg, name] = (item.dataset.preview || "").split("|");
        const key = item.dataset.previewKey;
        const project = key ? workPreviews[key] : null;
        const frames = project?.frames ?? [];

        if (previewInner) {
          if (frames.length > 0) {
            previewInner.style.background = "var(--paper)";
            if (!imgEl) {
              imgEl = document.createElement("img");
              previewInner.appendChild(imgEl);
            }
            imgEl.src = frames[0];
            if (key && !lazyPreloaded.has(key)) {
              lazyPreloaded.add(key);
              frames.slice(1).forEach((src) => { const im = new Image(); im.src = src; });
            }
            if (frames.length > 1) {
              let i = 0;
              cycleTimer = setInterval(() => {
                i = (i + 1) % frames.length;
                if (imgEl) imgEl.src = frames[i];
              }, project?.intervalMs ?? 700);
            }
          } else {
            if (imgEl) { imgEl.remove(); imgEl = null; }
            previewInner.style.background = `repeating-linear-gradient(${
              Math.random() * 180
            }deg, ${bg} 0 22px, ${fg} 22px 24px), ${bg}`;
          }
        }
        if (previewTag) {
          const label = project?.label ?? name;
          previewTag.textContent = label ? `${label.toUpperCase()} · VIEW CASE ↗` : "VIEW CASE ↗";
          previewTag.style.color = frames.length > 0 ? "" : fg || "";
        }
        cancelHide();
        const wasShown = preview?.classList.contains("show");
        if (!pvInitialized) { pvx = e.clientX; pvy = e.clientY; pvInitialized = true; }
        ptx = e.clientX;
        pty = e.clientY;
        // Boost the lerp on a fresh appearance so the preview snaps in
        // quickly; between item swaps it keeps its current follow speed.
        if (!wasShown) pvLerp = PVLERP_INTRO;
        targetScale = 1;
        preview?.classList.add("show");
        ensurePreviewRaf();
      };
      const move = (e: MouseEvent) => {
        ptx = e.clientX;
        pty = e.clientY;
        ensurePreviewRaf();
      };
      const leave = () => {
        // Debounce the hide — if the cursor lands on another work-item within
        // the grace window, enter() will cancel this and the preview just
        // slides over without a fade-out / fade-in flicker.
        cancelHide();
        hideTimer = setTimeout(() => {
          stopCycle();
          targetScale = 0.85;
          preview?.classList.remove("show");
          hideTimer = null;
          ensurePreviewRaf();
        }, 140);
      };
      item.addEventListener("mouseenter", enter);
      item.addEventListener("mousemove", move);
      item.addEventListener("mouseleave", leave);
      workListeners.push({ el: item, enter, move, leave });
    });
    let previewRafId = 0;
    // Snappy lerp toward cursor + horizontal-velocity rotation. The preview
    // tilts left/right as you swing it, like a stamp held loosely between
    // fingers. ROT_GAIN converts px/frame velocity into degrees of tilt.
    const ROT_GAIN = 0.55;
    const ROT_MAX = 14;
    const ROT_LERP = 0.18;
    const previewRaf = () => {
      const dx = ptx - pvx;
      const dy = pty - pvy;
      // Decay the intro boost back toward the steady follow lerp each frame.
      pvLerp = PVLERP + (pvLerp - PVLERP) * PVLERP_DECAY;
      const newPvx = pvx + dx * pvLerp;
      const newPvy = pvy + dy * pvLerp;
      const fvx = newPvx - pvx;
      pvx = newPvx; pvy = newPvy;
      let targetRot = -fvx * ROT_GAIN;
      if (targetRot > ROT_MAX) targetRot = ROT_MAX;
      else if (targetRot < -ROT_MAX) targetRot = -ROT_MAX;
      pvRot += (targetRot - pvRot) * ROT_LERP;
      pvScale += (targetScale - pvScale) * 0.035;
      if (preview) {
        preview.style.transform = `translate(${pvx}px, ${pvy}px) translate(-50%,-50%) rotate(${pvRot.toFixed(2)}deg) scale(${pvScale.toFixed(4)})`;
      }
      const isHidden = !preview?.classList.contains("show");
      const settled =
        Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 &&
        Math.abs(targetRot - pvRot) < 0.05 &&
        Math.abs(targetScale - pvScale) < 0.001;
      if (isHidden && settled) {
        previewRafId = 0;
        return;
      }
      previewRafId = requestAnimationFrame(previewRaf);
    };
    const ensurePreviewRaf = () => {
      if (!previewRafId && !reduceMotion) previewRafId = requestAnimationFrame(previewRaf);
    };

    // ===== ZOOM-LETTER TRANSITIONS =====
    const _hex = (c: string): [number, number, number] => {
      let s = c.trim().replace("#", "");
      if (s.length === 3) s = s.split("").map((x) => x + x).join("");
      const n = parseInt(s, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };
    const mixColor = (a: string, b: string, t: number) => {
      const [r1, g1, b1] = _hex(a);
      const [r2, g2, b2] = _hex(b);
      const r = Math.round(r1 + (r2 - r1) * t);
      const g = Math.round(g1 + (g2 - g1) * t);
      const bl = Math.round(b1 + (b2 - b1) * t);
      return `rgb(${r},${g},${bl})`;
    };

    type ST = {
      el: HTMLElement;
      sticky: HTMLElement | null;
      focal: HTMLElement | null;
      word: HTMLElement | null;
      pre: HTMLElement | null;
      post: HTMLElement | null;
      sub: HTMLElement | null;
      tag: HTMLElement | null;
      ctx: HTMLElement | null;
      progress: HTMLElement | null;
      num: HTMLElement | null;
      ruleT: HTMLElement | null;
      ruleB: HTMLElement | null;
      fromBg: string; fromFg: string; toBg: string; toFg: string;
      _curBg?: string;
    };
    const STs: ST[] = [];
    document.querySelectorAll<HTMLElement>("[data-st]").forEach((st) => {
      const sticky = st.querySelector<HTMLElement>(".st-sticky");
      const focal = st.querySelector<HTMLElement>("[data-focal]");
      const fromBg = st.dataset.stFrom || "#0a0a0a";
      const fromFg = st.dataset.stFromFg || "#ffffff";
      const toBg = st.dataset.stTo || "#ffffff";
      const toFg = st.dataset.stToFg || "#0a0a0a";
      if (sticky) {
        sticky.style.backgroundColor = fromBg;
        sticky.style.color = fromFg;
      }
      if (focal) focal.style.color = toBg;
      STs.push({
        el: st,
        sticky,
        focal,
        word: st.querySelector<HTMLElement>("[data-st-word]"),
        pre: st.querySelector<HTMLElement>("[data-st-pre]"),
        post: st.querySelector<HTMLElement>("[data-st-post]"),
        sub: st.querySelector<HTMLElement>("[data-st-sub]"),
        tag: st.querySelector<HTMLElement>(".st-tag"),
        ctx: st.querySelector<HTMLElement>(".st-context"),
        progress: st.querySelector<HTMLElement>("[data-st-progress]"),
        num: st.querySelector<HTMLElement>(".st-num"),
        ruleT: st.querySelector<HTMLElement>(".st-rule.t"),
        ruleB: st.querySelector<HTMLElement>(".st-rule.b"),
        fromBg, fromFg, toBg, toFg,
      });
    });

    const computeCoverScale = (s: ST) => {
      if (!s.focal) return 40;
      const prev = s.focal.style.transform;
      const fx = s.focal.style.getPropertyValue("--fx") || "50%";
      const fy = s.focal.style.getPropertyValue("--fy") || "50%";
      s.focal.style.transform = `translate(calc(-1 * ${fx}), calc(-1 * ${fy}))`;
      const r = s.focal.getBoundingClientRect();
      s.focal.style.transform = prev;
      if (!r.width || !r.height) return 40;
      const vw = window.innerWidth, vh = window.innerHeight;
      const target = Math.max(vw, vh) * 2.2;
      const ink = Math.min(r.width, r.height) * 0.5;
      return Math.max(30, target / Math.max(1, ink));
    };
    let coverScales: number[] = [];
    const recomputeCovers = () => {
      coverScales = STs.map(computeCoverScale);
    };

    const updateSTs = () => {
      if (!coverScales.length) recomputeCovers();
      for (let i = 0; i < STs.length; i++) {
        const s = STs[i];
        const r = s.el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = Math.max(1, r.height - vh);
        const p = Math.max(0, Math.min(1, -r.top / total));

        const approach = Math.min(1, p / 0.2);
        const zoomT = Math.max(0, Math.min(1, (p - 0.2) / 0.65));
        const hold = Math.max(0, Math.min(1, (p - 0.85) / 0.15));
        const eased = zoomT * zoomT * zoomT;
        const cover = (coverScales[i] || 30) * 1.15;

        if (s.pre) {
          const op = 1 - Math.min(1, zoomT * 1.8);
          s.pre.style.transform = `translateY(-50%) translateX(${-zoomT * 35}vw)`;
          s.pre.style.opacity = Math.max(0, op).toFixed(3);
        }
        if (s.post) {
          const op = 1 - Math.min(1, zoomT * 1.8);
          s.post.style.transform = `translateY(-50%) translateX(${zoomT * 35}vw)`;
          s.post.style.opacity = Math.max(0, op).toFixed(3);
        }
        if (s.focal) {
          const fScale = 1 + eased * (cover - 1);
          const fx = s.focal.style.getPropertyValue("--fx") || "50%";
          const fy = s.focal.style.getPropertyValue("--fy") || "50%";
          s.focal.style.transform = `translate(calc(-1 * ${fx}), calc(-1 * ${fy})) scale(${fScale.toFixed(3)})`;
        }
        if (s.sub) {
          const subOp = Math.max(0, 1 - zoomT * 3) * 0.55;
          s.sub.style.opacity = subOp.toFixed(3);
          s.sub.style.transform = `translateX(-50%) translateY(${approach * 6}px)`;
        }
        if (s.tag) {
          const exitP = Math.max(0, Math.min(1, (hold - 0.55) / 0.45));
          const exitEased = exitP * exitP;
          s.tag.style.opacity = Math.max(0, 1 - exitP * 2.5).toFixed(3);
          s.tag.style.transform = `translateY(${-exitEased * 120}vh)`;
        }
        if (s.ctx) {
          const exitP = Math.max(0, Math.min(1, (hold - 0.4) / 0.4));
          s.ctx.style.opacity = Math.max(0, 1 - exitP * 2.5).toFixed(3);
          s.ctx.style.transform = `translateY(0)`;
        }
        const chromeOp = 1 - hold;
        if (s.num) s.num.style.opacity = (chromeOp * 0.55).toFixed(3);
        if (s.ruleT) s.ruleT.style.opacity = (chromeOp * 0.12).toFixed(3);
        if (s.ruleB) s.ruleB.style.opacity = (chromeOp * 0.12).toFixed(3);

        if (s.sticky) {
          const t = Math.max(0, Math.min(1, hold / 0.8));
          const k = t * t * (3 - 2 * t);
          const bg = mixColor(s.fromBg, s.toBg, k);
          const fg = mixColor(s.fromFg, s.toFg, k);
          if (s._curBg !== bg) {
            s.sticky.style.backgroundColor = bg;
            s.sticky.style.color = fg;
            s._curBg = bg;
          }
        }
        if (s.progress) s.progress.style.width = (p * 100).toFixed(2) + "%";
      }
    };
    let stRafQueued = 0;
    const scheduleUpdateSTs = () => {
      if (stRafQueued) return;
      stRafQueued = requestAnimationFrame(() => {
        stRafQueued = 0;
        updateSTs();
      });
    };
    window.addEventListener("scroll", scheduleUpdateSTs, { passive: true });
    window.addEventListener("resize", scheduleUpdateSTs);
    window.addEventListener("resize", recomputeCovers);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        recomputeCovers();
        updateSTs();
      });
    }
    const stInitTimeout = setTimeout(() => {
      recomputeCovers();
      updateSTs();
    }, 300);
    updateSTs();

    // ===== SECTION REVEALS (bidirectional: in on enter, out on leave) =====
    let lastSecScrollY = window.scrollY;
    const secIo = new IntersectionObserver(
      (entries) => {
        const dir = window.scrollY >= lastSecScrollY ? "down" : "up";
        lastSecScrollY = window.scrollY;
        entries.forEach((en) => {
          const t = en.target as HTMLElement;
          if (en.isIntersecting) {
            t.classList.add("in");
            t.classList.remove("out", "out-up", "out-down");
            t.dataset.entered = "1";
          } else if (t.dataset.entered === "1") {
            t.classList.remove("in");
            t.classList.add("out");
            t.classList.toggle("out-up", dir === "up");
            t.classList.toggle("out-down", dir === "down");
          }
        });
      },
      { threshold: [0, 0.12, 0.25] }
    );
    document.querySelectorAll("section[data-section]:not(.hero), .section-wipe").forEach((el) => {
      secIo.observe(el);
    });

    // ===== FULLSCREEN MENU =====
    const menuBtn = document.getElementById("menuBtn") as HTMLButtonElement | null;
    const menuBtnLabel = document.getElementById("menuBtnLabel") as HTMLElement | null;
    const menuEl = document.getElementById("menu") as HTMLElement | null;

    // Curtain wipe choreography (2.1s total):
    //   0-17%   (0-360ms):     scaleX 0 -> 1, origin left  (wipes IN)
    //   17-83%  (360-1740ms):  scaleX 1, fully covering — long hold for label
    //   83-100% (1740-2100ms): scaleX 1 -> 0, origin right (wipes OUT)
    // Every state change (menu open/close class flip, anchor scroll, route
    // push) happens inside the 360-1740ms full-cover window so it is never
    // visible to the user.
    const CURTAIN_COVERED_MS = 400;
    const CURTAIN_TOTAL_MS = 2100;
    const CURTAIN_PULSE_MS = 2150;
    const CURTAIN_REVEAL_MS = 1050;
    // Fast variant — used for plain menu open/close where there is no
    // section/route transition under the curtain. Same three-phase wipe,
    // shorter middle hold. CSS duration override lives on body.menu-pulse-fast.
    const CURTAIN_PULSE_FAST_MS = 1150;
    const CURTAIN_COVERED_FAST_MS = 240;
    const menuFlipTimers: Array<ReturnType<typeof setTimeout>> = [];
    const clearMenuFlipTimers = () => {
      while (menuFlipTimers.length) {
        clearTimeout(menuFlipTimers.shift()!);
      }
    };
    const pulseCurtain = (fast = false) => {
      // Restart animation: remove + force reflow + re-add
      document.body.classList.remove("menu-pulse", "menu-pulse-fast");
      void document.body.offsetWidth;
      document.body.classList.add("menu-pulse");
      if (fast) document.body.classList.add("menu-pulse-fast");
      const dur = fast ? CURTAIN_PULSE_FAST_MS : CURTAIN_PULSE_MS;
      window.setTimeout(() => {
        document.body.classList.remove("menu-pulse", "menu-pulse-fast");
      }, dur);
    };
    const openMenu = (fast = false) => {
      clearMenuFlipTimers();
      pulseCurtain(fast);
      if (menuBtnLabel) menuBtnLabel.textContent = "Close";
      scrollLockRef.current = true;
      const coveredAt = fast ? CURTAIN_COVERED_FAST_MS : CURTAIN_COVERED_MS;
      menuFlipTimers.push(setTimeout(() => {
        document.body.classList.add("menu-open");
        menuEl?.setAttribute("aria-hidden", "false");
      }, coveredAt));
    };
    const closeMenu = (fast = false) => {
      clearMenuFlipTimers();
      pulseCurtain(fast);
      if (menuBtnLabel) menuBtnLabel.textContent = "Menu";
      const coveredAt = fast ? CURTAIN_COVERED_FAST_MS : CURTAIN_COVERED_MS;
      menuFlipTimers.push(setTimeout(() => {
        document.body.classList.remove("menu-open");
        menuEl?.setAttribute("aria-hidden", "true");
        scrollLockRef.current = false;
      }, coveredAt));
    };
    const menuCurtainWordEarly = document.getElementById("menuCurtainWord") as HTMLElement | null;
    const onMenuBtnClick = () => {
      // Plain open/close has no nav target — clear any stale label so the
      // curtain wipes blank. The label is only set right before navigating.
      // Fast variant: shorter cover hold, since there's no transition to hide.
      if (menuCurtainWordEarly) menuCurtainWordEarly.textContent = "";
      if (document.body.classList.contains("menu-open")) closeMenu(true);
      else openMenu(true);
    };
    menuBtn?.addEventListener("click", onMenuBtnClick);

    // ===== MENU NAV CLICK + CURTAIN =====
    const curtain = document.getElementById("curtain") as HTMLElement | null;
    const curtainWord = document.getElementById("curtainWord") as HTMLElement | null;
    const curtainTimers: Array<ReturnType<typeof setTimeout>> = [];
    const menuItemListeners: Array<{ el: HTMLAnchorElement; fn: (e: Event) => void }> = [];

    const menuCurtainWord = document.getElementById("menuCurtainWord") as HTMLElement | null;
    document.querySelectorAll<HTMLAnchorElement>(".menu-item").forEach((a) => {
      const fn = (e: Event) => {
        e.preventDefault();
        const labelEl = a.querySelector(".label");
        const labelText = (labelEl?.textContent || "").replace(/[,.]/g, "").trim();
        if (curtainWord) curtainWord.textContent = labelText.toUpperCase();
        if (menuCurtainWord) menuCurtainWord.textContent = labelText.toUpperCase();
        closeMenu();
        if (a.dataset.target) {
          // Same-page anchor jump — let the menu-curtain horizontal wipe
          // be the entire transition. The scroll happens at CURTAIN_REVEAL_MS,
          // mid full-cover, so the user never sees the page jump. The
          // scroll lock holds until the curtain has fully wiped out, so a
          // late wheel event during wipe-out can't shift the page.
          const target = document.getElementById(a.dataset.target);
          if (!target) return;
          scrollLockRef.current = true;
          curtainTimers.push(setTimeout(() => {
            const y = target.getBoundingClientRect().top + window.scrollY - 20;
            window.scrollTo(0, y);
          }, CURTAIN_REVEAL_MS));
          curtainTimers.push(setTimeout(() => {
            scrollLockRef.current = false;
          }, CURTAIN_TOTAL_MS));
        } else {
          // Cross-route navigation — run the bottom-to-top page curtain
          // with the section label, then push the new route mid-cover.
          curtain?.classList.remove("out");
          curtain?.classList.add("in");
          const href = a.getAttribute("href");
          if (!href) return;
          curtainTimers.push(setTimeout(() => {
            router.push(href);
          }, CURTAIN_REVEAL_MS));
        }
      };
      a.addEventListener("click", fn);
      menuItemListeners.push({ el: a, fn });
    });

    // ===== CLOCK =====
    const tickClock = () => {
      const d = new Date();
      const ist = new Date(d.getTime() + (d.getTimezoneOffset() + 5 * 60 + 30) * 60000);
      const hh = String(ist.getHours()).padStart(2, "0");
      const mm = String(ist.getMinutes()).padStart(2, "0");
      const mc = document.getElementById("menuClock");
      if (mc) mc.textContent = `${hh}:${mm}`;
    };
    tickClock();
    const clockInterval = setInterval(tickClock, 1000);

    // ===== KEYBOARD =====
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) closeMenu(true);
      if (e.key === "m") menuBtn?.click();
    };
    window.addEventListener("keydown", onKeyDown);

    // ===== METHOD STACKING CARDS — darken outgoing cards =====
    const methodCards = Array.from(
      document.querySelectorAll<HTMLElement>(".method-card")
    );
    const methodIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.methodIdx ?? "-1");
          if (idx <= 0) return;
          const prev = methodCards[idx - 1];
          if (!prev) return;
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            prev.classList.add("is-covered");
          } else if (entry.boundingClientRect.top > 0) {
            prev.classList.remove("is-covered");
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    methodCards.forEach((c) => methodIo.observe(c));

    // ===== CLEANUP =====
    return () => {
      document.body.classList.remove("has-custom-cursor");
      cancelAnimationFrame(cursorRafId);
      cancelAnimationFrame(magnetRafId);
      cancelAnimationFrame(stickyRafId);
      cancelAnimationFrame(previewRafId);
      stopCycle();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", scheduleUpdateSTs);
      window.removeEventListener("resize", scheduleUpdateSTs);
      window.removeEventListener("resize", recomputeCovers);
      if (stRafQueued) cancelAnimationFrame(stRafQueued);
      window.removeEventListener("keydown", onKeyDown);
      menuBtn?.removeEventListener("click", onMenuBtnClick);
      cursorListeners.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      magnetListeners.forEach(({ btn, move, leave }) => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", leave);
      });
      stickyListeners.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
      workListeners.forEach(({ el, enter, move, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
      menuItemListeners.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      io.disconnect();
      secIo.disconnect();
      methodIo.disconnect();
      clearTimeout(heroTimeout);
      clearTimeout(stInitTimeout);
      clearInterval(clockInterval);
      morphTimers.forEach((t) => {
        clearTimeout(t as ReturnType<typeof setTimeout>);
        clearInterval(t as ReturnType<typeof setInterval>);
      });
      curtainTimers.forEach((t) => clearTimeout(t));
      menuFlipTimers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <>
      <div className="grain"></div>
      <div className="cursor-ring" id="cursorRing"></div>
      <div className="cursor-label" id="cursorLabel">VIEW</div>
      <div className="cursor-dot" id="cursorDot"></div>

      <main>
        {/* FLOATING LOGO — Twin-Orbit Caret + wordmark */}
        <a href="#hero" className="logo-mark logo-mark--orb" data-cursor="home" data-target="hero" data-magnet>
          <span className="logo-orb" aria-hidden="true">
            <span className="logo-orb-ring" />
            <span className="logo-orb-ring logo-orb-ring-2" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 5h14L5 19h14" />
            </svg>
          </span>
          <span className="logo-wordmark">
            <span className="logo-name">Ziaul Islam</span>
            <span className="logo-role">Sr. Product Designer</span>
          </span>
        </a>


        {/* HERO */}
        <section className="hero" id="hero" data-section="INDEX">
          <div className="hero-bg">
            <HeroMagneticGrid />
          </div>

          <div className="hero-split">
            <div className="hero-left">
              <div className="hero-eyebrow" id="heroEyebrow">
                <span className="eb-name">Ziaul Islam</span>
                <span className="eb-sep">/</span>
                <span className="eb-role">Senior Product Designer</span>
                <span className="eb-sep">·</span>
                <span className="eb-loc">Delhi NCR</span>
                <span className="eb-sep">·</span>
                <span className="eb-status"><span className="eb-dot" aria-hidden="true"></span>Open to Sr / Lead roles</span>
              </div>

              <h1 className="huge" id="heroTitle">
                <span className="row"><span>Designing</span></span>
                <span className="row morph-row">
                  <span className="morph" id="morphWord" aria-live="polite">
                    <span className="morph-sizer" id="morphSizer">payments</span>
                    <span className="morph-stage" id="morphStage" aria-hidden="true"></span>
                  </span>
                </span>
                <span className="row">
                  <span>
                    that <em>ship</em>.
                  </span>
                </span>
              </h1>

              <div className="hero-pitch">
                <p>Seven years, ~30 shipped products across B2B + B2C at the awkward seam where payments, gameplay, and AI coexist. Design systems that don&apos;t crumble when the third PM joins.</p>
              </div>

              {/* PROOF BAR — wordmarks as receipts. Sits at the bottom of the
                  left column under the pitch. */}
              <div className="hero-proof" aria-label="Where I've shipped">
                <span>BlueStacks</span>
                <span className="hp-sep">·</span>
                <span>now.gg</span>
                <span className="hp-sep">·</span>
                <span>Float</span>
                <span className="hp-sep">·</span>
                <span>6labs.ai</span>
                <span className="hp-sep">·</span>
                <span>~30 shipped products</span>
              </div>
            </div>

            <div className="hero-right">
              <HeroCRT />
            </div>
          </div>
          <RotatingStamp
            className="stamp-hero-corner"
            text="OPEN TO SR / LEAD ROLES ✦  DELHI NCR · 2026  ✦  "
            innerGlyph="✦"
            size={134}
            spinDuration={16}
            variant="cream"
          />
        </section>


        {/* TRANSITION → WORK */}
        <div
          className="scroll-transition"
          data-st
          data-st-from="#0a0a0a"
          data-st-from-fg="#ffffff"
          data-st-to="#ffffff"
          data-st-to-fg="#0a0a0a"
        >
          <div className="st-num">
            <span><b>02</b></span>
            <span></span>
          </div>
          <div className="st-rule t"></div>
          <div className="st-sticky">
            <div className="st-stack" data-st-word>
              <span className="st-tag">THE <span className="accent">WORK</span></span>
              <span className="focal st-glyph" data-focal style={{ "--fx": "0px", "--fy": "0px" } as any}>✦</span>
              <span className="st-context" data-st-sub>0 → 1, then more</span>
            </div>
          </div>
          <div className="st-progress" data-st-progress></div>
          <div className="st-rule b"></div>
        </div>

        {/* WORK */}
        <section id="work" className="inv" data-section="SELECTED WORK">
          <RotatingStamp
            className="stamp-work-aside"
            text="PIXELS BY HAND  ✦  DECISIONS BY ARGUMENT  ✦  "
            innerGlyph="※"
            size={150}
            spinDuration={18}
            variant="ink"
          />
          <div className="section-tag">THE <span className="accent">WORK</span></div>
          <ul className="work-list" id="workList">
            <a className="work-item" href="/6labs-ai" data-cursor="view" data-preview-key="6labs" data-preview="#7ba889|#ffffff|6labs.ai">
              <span className="no">01</span>
              <div className="title-stack">
                <span className="title">6labs.ai — AI gameplay <em>analytics, end-to-end</em></span>
                <span className="metric">Lead designer · 0→1 product · in active build</span>
              </div>
              <span className="tags"><span>ai</span><span>b2c</span><span>lead</span></span>
              <span className="year">2024 — NOW</span>
              <span className="arrow">→</span>
            </a>
            <a className="work-item" href="/ai-native-workflow" data-cursor="view" data-preview-key="ai-native" data-preview="#7ba889|#0a0a0a|AI-Native">
              <span className="no">02</span>
              <div className="title-stack">
                <span className="title">AI-Native — the round-trip <em>that actually ships</em></span>
                <span className="metric">~10× design loop speed · agents + Figma plugins</span>
              </div>
              <span className="tags"><span>workflow</span><span>ai</span><span>solo</span></span>
              <span className="year">2025 — NOW</span>
              <span className="arrow">→</span>
            </a>
            <a className="work-item" href="/nowstudio" data-cursor="view" data-preview-key="nowstudio" data-preview="#ffffff|#0a0a0a|now Studio">
              <span className="no">03</span>
              <div className="title-stack">
                <span className="title">now Studio — <em>multi-store</em> publishing for games</span>
                <span className="metric">7K+ devs · 200+ on nowSDK · ~$300K/mo IAP</span>
              </div>
              <span className="tags"><span>platform</span><span>payments</span><span>lead</span></span>
              <span className="year">2022 — NOW</span>
              <span className="arrow">→</span>
            </a>
            <a className="work-item" href="/gamification" data-cursor="view" data-preview-key="gamification" data-preview="#0a0a0a|#FFB020|Gamification">
              <span className="no">04</span>
              <div className="title-stack">
                <span className="title">Gamification — <em>six surfaces,</em> one behavior loop</span>
                <span className="metric">~$300K/mo IAP · 6 surfaces · CPI → ROAS pivot</span>
              </div>
              <span className="tags"><span>loops</span><span>economy</span><span>b2c</span></span>
              <span className="year">2020 — 24</span>
              <span className="arrow">→</span>
            </a>
            <a className="work-item" href="/float" data-cursor="view" data-preview-key="float-ds" data-preview="#0a0a0a|#7ba889|Float DS">
              <span className="no">05</span>
              <div className="title-stack">
                <span className="title">Float — <em>one parent DS,</em> four product children</span>
                <span className="metric">1 parent · 4 children · ~100 tokens · 200+ components</span>
              </div>
              <span className="tags"><span>system</span><span>tokens</span><span>lead</span></span>
              <span className="year">2023 — NOW</span>
              <span className="arrow">→</span>
            </a>
            <a className="work-item" href="/bluestacks" data-cursor="view" data-preview-key="bluestacks" data-preview="#0a0a0a|#1FA8FF|BlueStacks">
              <span className="no">06</span>
              <div className="title-stack">
                <span className="title">BlueStacks — <em>four years,</em> ten surfaces, one tenure</span>
                <span className="metric">500M+ users · 200+ countries · 10 surfaces shipped</span>
              </div>
              <span className="tags"><span>tenure</span><span>b2c</span><span>lead</span></span>
              <span className="year">2021 — 25</span>
              <span className="arrow">→</span>
            </a>
            <a className="work-item" href="/amway-india" data-cursor="view" data-preview-key="amway" data-preview="#ffffff|#7ba889|Amway India">
              <span className="no">07</span>
              <div className="title-stack">
                <span className="title">Amway India — <em>e-commerce</em> at distributor scale</span>
                <span className="metric">Contract role · stopped pre-ship</span>
              </div>
              <span className="tags"><span>contract</span><span>b2c</span></span>
              <span className="year">2020 — 21</span>
              <span className="arrow">→</span>
            </a>
          </ul>

        </section>

        {/* TRANSITION → METHOD */}
        <div
          className="scroll-transition"
          data-st
          data-st-from="#ffffff"
          data-st-from-fg="#0a0a0a"
          data-st-to="#0a0a0a"
          data-st-to-fg="#ffffff"
        >
          <div className="st-num">
            <span><b>03</b></span>
            <span></span>
          </div>
          <div className="st-rule t"></div>
          <div className="st-sticky">
            <div className="st-stack" data-st-word>
              <span className="st-tag">THE <span className="accent">METHOD</span></span>
              <span className="focal st-glyph" data-focal style={{ "--fx": "0px", "--fy": "0px" } as any}>+</span>
              <span className="st-context" data-st-sub>code is the spec</span>
            </div>
          </div>
          <div className="st-progress" data-st-progress></div>
          <div className="st-rule b"></div>
        </div>

        {/* METHOD — Stacking Cards */}
        <section className="method" id="process" data-section="PROCESS">
          <div className="method-head">
            <div className="section-tag">THE <span className="accent">METHOD</span></div>
            <p className="method-deck">
              Half the job is translating B2B revenue into B2C delight. The other half is keeping the system honest. Here&apos;s how I move from brief to ship.
            </p>
          </div>

          <div className="method-stack" id="methodStack">
            <article className="method-card method-card--01" data-method-idx="0">
              <div className="method-card-overlay" />
              <div className="method-card-inner">
                <div className="method-card-lead">
                  <span className="method-pno">P.01 — INTAKE</span>
                  <h3>Listen <em>— to the business and the user.</em></h3>
                  <p>Half my job is translating B2B revenue goals into B2C delight. I don&apos;t sketch a screen until I can name the metric it moves and the person it serves — in one sentence.</p>
                  <span className="method-card-rule" />
                  <span className="method-card-tag">USED ON · BlueStacks Payments · now.gg Studio · 6labs.ai</span>
                </div>
                <div className="method-card-display">
                  <span className="method-card-label">Listen<em>.</em></span>
                  <span className="method-card-tag">( business × user )</span>
                </div>
              </div>
            </article>

            <article className="method-card method-card--02" data-method-idx="1">
              <div className="method-card-overlay" />
              <div className="method-card-inner">
                <div className="method-card-lead">
                  <span className="method-pno">P.02 — FOUNDATION</span>
                  <h3>System <em>— before I make screens.</em></h3>
                  <p>Tokens, themes, primitives. I&apos;d rather spend a week on the design system than three months patching inconsistencies. <em>Float</em> runs four products on one parent-child architecture; <em>BlueStacks</em> keeps holding up at 500M+ users across 200+ countries.</p>
                  <span className="method-card-rule" />
                  <span className="method-card-tag">PROOF · Float DS · BlueStacks tokens · Apparatus</span>
                </div>
                <div className="method-card-display">
                  <span className="method-card-label">System<em>.</em></span>
                  <span className="method-card-tag">( tokens before screens )</span>
                </div>
              </div>
            </article>

            <article className="method-card method-card--03" data-method-idx="2">
              <div className="method-card-overlay" />
              <div className="method-card-inner">
                <div className="method-card-lead">
                  <span className="method-pno">P.03 — VELOCITY</span>
                  <h3>Prototype <em>— vibe-coded, not vibes-only.</em></h3>
                  <p>I prototype in code with AI agents and plugins as my second pair of hands. Real interactions, real tokens. The prototype <em>is</em> the spec — 6labs.ai was designed this way, end to end.</p>
                  <span className="method-card-rule" />
                  <span className="method-card-tag">STACK · Next.js · Figma plugins · custom agents</span>
                </div>
                <div className="method-card-display">
                  <span className="method-card-label">Prototype<em>.</em></span>
                  <span className="method-card-tag">( spec is the build )</span>
                </div>
              </div>
            </article>

            <article className="method-card method-card--04" data-method-idx="3">
              <div className="method-card-overlay" />
              <div className="method-card-inner">
                <div className="method-card-lead">
                  <span className="method-pno">P.04 — LOOP</span>
                  <h3>Ship, then sharpen <em>— with the data.</em></h3>
                  <p>I sit close to engineering and analytics. We ship, we measure, we cut what didn&apos;t earn its keep. The first version isn&apos;t the last good one — it&apos;s the start of the conversation.</p>
                  <span className="method-card-rule" />
                  <span className="method-card-tag">LOOP · ship → measure → cut → re-ship</span>
                </div>
                <div className="method-card-display">
                  <span className="method-card-label">Ship<em>.</em></span>
                  <span className="method-card-tag">( v1 ≠ last good one )</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* TRANSITION → HUMAN */}
        <div
          className="scroll-transition"
          data-st
          data-st-from="#0a0a0a"
          data-st-from-fg="#ffffff"
          data-st-to="#ffffff"
          data-st-to-fg="#0a0a0a"
        >
          <div className="st-num">
            <span><b>04</b></span>
            <span></span>
          </div>
          <div className="st-rule t"></div>
          <div className="st-sticky">
            <div className="st-stack" data-st-word>
              <span className="st-tag">THE <span className="accent">HUMAN</span></span>
              <span className="focal st-glyph" data-focal style={{ "--fx": "0px", "--fy": "0px" } as any}>✱</span>
              <span className="st-context" data-st-sub>on &amp; off duty</span>
            </div>
          </div>
          <div className="st-progress" data-st-progress></div>
          <div className="st-rule b"></div>
        </div>

        {/* ABOUT */}
        <section id="about" className="inv" data-section="ABOUT">
          <div className="section-tag">THE <span className="accent">HUMAN</span></div>
          <p className="about-lead" id="aboutLead">
            Senior Product Designer, <em>seven years in</em>. The other half of the day is just as <em>opinionated</em>.
          </p>

          <div className="about-duty">
            <div className="duty-col">
              <div className="duty-head">
                <span className="duty-mark">●</span>
                <h3>On duty</h3>
              </div>
              <blockquote className="duty-quote">
                Engineering background, design fluency. I&apos;d rather <em>ship something honest</em> than describe something perfect — the prototype is the spec, the metric is the brief.
              </blockquote>
              <dl>
                <dt>How I work</dt>
                <dd>Prototype-first, agent-augmented. Vibe-code the rough edges in Figma plugins, harden the parts that stick.</dd>
              </dl>
              <dl>
                <dt>Closest to</dt>
                <dd>Engineering and analytics — the seam between <b>what gets built</b> and <b>what gets measured</b>.</dd>
              </dl>
              <dl>
                <dt>Operating mode</dt>
                <dd>Solo on 0→1, lead on 1→N. Comfortable presenting to founders, mentoring juniors, and arguing with PMs in the same afternoon.</dd>
              </dl>
              <dl>
                <dt>Credentials</dt>
                <dd><b>HFI Certified Usability Analyst</b> · B.Tech, Computer Science Engineering · self-taught the rest.</dd>
              </dl>
              <dl>
                <dt>Tools</dt>
                <dd>Figma + plugins, React/Next, Claude &amp; Cursor for vibe-coding, BigQuery + Looker for the analytics half.</dd>
              </dl>
            </div>

            <div className="duty-col">
              <div className="duty-head">
                <span className="duty-mark">○</span>
                <h3>Off duty</h3>
              </div>
              <blockquote className="duty-quote">
                <em>Competitive gaming and anime fuel the creativity.</em> Best design ideas show up after a long session, not during.
              </blockquote>
              <dl>
                <dt>Gaming</dt>
                <dd><b>Battlefield 6</b> · CS2 · Rocket League · Elden Ring · Black Myth: Wukong — competitive when the squad&apos;s online, single-player when it isn&apos;t.</dd>
              </dl>
              <dl>
                <dt>Anime</dt>
                <dd>Slow stories, loud feelings — character over plot, atmosphere over arc. <em>Frieren</em>, <em>Mushishi</em>, <em>Vinland</em>.</dd>
              </dl>
              <dl>
                <dt>Sports</dt>
                <dd><b>Cricket</b> loud, <b>football</b> louder — every weekend that lines up.</dd>
              </dl>
              <dl>
                <dt>Travel</dt>
                <dd>Boarding-pass curiosity — carry-on only, plans loose, return tickets optional.</dd>
              </dl>
              <dl>
                <dt>Reading</dt>
                <dd>Long-form essays, design-engineering blogs, the occasional cricket biography. Print, mostly.</dd>
              </dl>
            </div>
          </div>

          {/* WORK TIMELINE */}
          <div className="about-timeline">
            <div className="about-timeline-head">
              <span className="about-timeline-tag">TIMELINE</span>
              <span className="about-timeline-range">2019 → NOW · 7 YEARS · ~30 SHIPPED</span>
            </div>
            <ol className="about-timeline-list">
              <li className="tl-row tl-row--now">
                <div className="tl-year">
                  <span className="tl-year-from">2024</span>
                  <span className="tl-year-to">NOW</span>
                </div>
                <div className="tl-node" aria-hidden />
                <div className="tl-content">
                  <h4 className="tl-title"><span className="tl-role">Senior Product Designer · Lead, 6labs.ai</span> · <em>BlueStacks / now.gg</em></h4>
                  <p className="tl-body">AI gameplay analytics platform — vibe-coded prototypes, Figma-plugin engineering, custom agents that do my own job 10× faster. Owning end-to-end design across data ingestion, dashboards, and the AI authoring surface.</p>
                  <ul className="tl-tags"><li>AI tooling</li><li>analytics</li><li>solo lead</li></ul>
                </div>
              </li>
              <li className="tl-row">
                <div className="tl-year">
                  <span className="tl-year-from">2022</span>
                  <span className="tl-year-to">2024</span>
                </div>
                <div className="tl-node" aria-hidden />
                <div className="tl-content">
                  <h4 className="tl-title"><span className="tl-role">Product Designer</span> · <em>BlueStacks / now.gg</em></h4>
                  <p className="tl-body">Joined a product-based company and took a more holistic approach — strategy, mentoring juniors, presenting to stakeholders, shaping roadmaps. Shipped Float DS (four products, one parent-child architecture), nowStudio (7K+ devs, 200+ SDK integrations), and BlueStacks payments + gamification at 500M+ users.</p>
                  <ul className="tl-tags"><li>design systems</li><li>payments</li><li>gamification</li><li>scale</li></ul>
                </div>
              </li>
              <li className="tl-row">
                <div className="tl-year">
                  <span className="tl-year-from">2021</span>
                  <span className="tl-year-to">2022</span>
                </div>
                <div className="tl-node" aria-hidden />
                <div className="tl-content">
                  <h4 className="tl-title"><span className="tl-role">UI/UX Designer</span> · <em>Service industry</em></h4>
                  <p className="tl-body">Diverse-sector work across <b>IT, fintech, and brand-from-scratch</b> builds. The exposure broadened my design perspective — every industry has its own constraint set, and learning to adapt fast became the unfair advantage. Earned the HFI Certified Usability Analyst credential here.</p>
                  <ul className="tl-tags"><li>IT</li><li>fintech</li><li>brand build</li><li>HFI CUA</li></ul>
                </div>
              </li>
              <li className="tl-row">
                <div className="tl-year">
                  <span className="tl-year-from">2020</span>
                  <span className="tl-year-to">2021</span>
                </div>
                <div className="tl-node" aria-hidden />
                <div className="tl-content">
                  <h4 className="tl-title"><span className="tl-role">Visual Designer</span> · <em>Agency / freelance</em></h4>
                  <p className="tl-body">Recognized as visual designer, then went deeper — explored UI patterns and self-taught UX through courses on the side. The first deliberate pivot from <em>making it pretty</em> to <em>making it work</em>.</p>
                  <ul className="tl-tags"><li>UI patterns</li><li>UX self-study</li><li>pivot</li></ul>
                </div>
              </li>
              <li className="tl-row">
                <div className="tl-year">
                  <span className="tl-year-from">2019</span>
                  <span className="tl-year-to">2020</span>
                </div>
                <div className="tl-node" aria-hidden />
                <div className="tl-content">
                  <h4 className="tl-title"><span className="tl-role">Graphic Designer</span> · <em>Emerging agency</em></h4>
                  <p className="tl-body">Started here, crafting brand identities. CS-Engineering background made the jump to UI/UX feel natural — the apprentice years that set the taste calibration that still shows up in the work.</p>
                  <ul className="tl-tags"><li>brand identity</li><li>print</li><li>foundations</li></ul>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="playground-pin" aria-label="Playground">
          <div className="playground-frame">
            <div className="playground-head">
              <div className="section-tag">THE <span className="accent">PLAYGROUND</span></div>
            </div>
            <PlaygroundStage />
          </div>
        </section>

        {/* TRANSITION → CONTACT */}
        <div
          className="scroll-transition"
          data-st
          data-st-from="#ffffff"
          data-st-from-fg="#0a0a0a"
          data-st-to="#0a0a0a"
          data-st-to-fg="#ffffff"
        >
          <div className="st-num">
            <span><b>05</b></span>
            <span></span>
          </div>
          <div className="st-rule t"></div>
          <div className="st-sticky">
            <div className="st-stack" data-st-word>
              <span className="st-tag">THE <span className="accent">END</span></span>
              <span className="focal st-glyph" data-focal style={{ "--fx": "0px", "--fy": "0px" } as any}>★</span>
              <span className="st-context" data-st-sub>or the start</span>
            </div>
          </div>
          <div className="st-progress" data-st-progress></div>
          <div className="st-rule b"></div>
        </div>

        {/* CONTACT */}
        <section className="contact" id="contact" data-section="CONTACT">
          <RotatingStamp
            className="stamp-contact-aside"
            text="SAY HELLO  ✦  LET'S BUILD  ✦  ZIAUL ISLAM  ✦  "
            innerGlyph="✺"
            size={170}
            spinDuration={14}
            variant="cream"
          />
          <h2 id="contactTitle">
            <span className="line"><span>Let&apos;s build</span></span>
            <span className="line"><span><em>something useful.</em></span></span>
          </h2>
          <div className="cta-wrap">
            <a href="mailto:ziaul.islam14@gmail.com" className="btn-magnet primary" data-magnet data-cursor="send">
              <span className="inner"><span className="dot"></span>ziaul.islam14@gmail.com<span>↗</span></span>
            </a>
            <a href="https://www.linkedin.com/in/ziaulislam14/" target="_blank" rel="noopener" className="btn-magnet" data-magnet data-cursor="book">
              <span className="inner"><span className="dot"></span>Connect on LinkedIn<span>↗</span></span>
            </a>
            <a href="/cv.pdf" target="_blank" rel="noopener" download="Ziaul-Islam-Resume-2026.pdf" className="btn-magnet" data-magnet data-cursor="link">
              <span className="inner"><span className="dot"></span>Download CV<span>↓</span></span>
            </a>
          </div>
          <div className="contact-grid">
            <div>
              <h5>Socials</h5>
              <a className="link" href="https://www.linkedin.com/in/ziaulislam14/" target="_blank" rel="noopener">
                <span>LinkedIn</span>
                <span>/in/ziaulislam14</span>
              </a>
            </div>
            <div>
              <h5>Location</h5>
              <a className="link" href="#">
                <span>Gurugram, IN</span>
                <span>28.4595°N, 77.0266°E</span>
              </a>
            </div>
            <div>
              <h5>Availability</h5>
              <a className="link" href="#">
                <span>Open — Sr / Lead</span>
                <span>Delhi NCR · 2026</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="brutalist-footer">
          <span>© ZIAUL ISLAM — 2026</span>
          <span>No cookies, no analytics, no nonsense</span>
        </footer>
      </main>

      {/* FLOATING MAGNETIC MENU BUTTON */}
      <button className="menu-btn" id="menuBtn" data-cursor="menu" data-magnet aria-label="Open navigation menu">
        <span className="menu-btn-pulse" aria-hidden />
        <span className="inner">
          <span className="icon"><i></i><i></i></span>
          <span id="menuBtnLabel">Menu</span>
          <span className="menu-btn-count" aria-hidden>/ 05</span>
        </span>
      </button>

      {/* MENU CURTAIN — symmetric red wipe on open + close */}
      <div className="menu-curtain" id="menuCurtain" aria-hidden="true">
        <span className="menu-curtain-word" id="menuCurtainWord">—</span>
      </div>

      {/* FULLSCREEN MENU */}
      <div className="menu" id="menu" aria-hidden="true">
        <div className="menu-bg"></div>
        <div className="menu-left">
          <div className="menu-items">
            <a href="#hero" className="menu-item" data-target="hero" data-cursor="go">
              <span className="num">(01)</span>
              <span className="label">Home<em>, the map</em></span>
              <span className="arrow">↗</span>
            </a>
            <a href="#work" className="menu-item" data-target="work" data-cursor="go">
              <span className="num">(02)</span>
              <span className="label">Work<em>, selected</em></span>
              <span className="arrow">↗</span>
            </a>
            <a href="#about" className="menu-item" data-target="about" data-cursor="go">
              <span className="num">(03)</span>
              <span className="label">About<em>, briefly</em></span>
              <span className="arrow">↗</span>
            </a>
            <a href="#process" className="menu-item" data-target="process" data-cursor="go">
              <span className="num">(04)</span>
              <span className="label">Process<em>, the craft</em></span>
              <span className="arrow">↗</span>
            </a>
            <a href="#contact" className="menu-item" data-target="contact" data-cursor="go">
              <span className="num">(05)</span>
              <span className="label">Contact<em>, say hello</em></span>
              <span className="arrow">↗</span>
            </a>
          </div>
          <div className="menu-foot">
            <span>© ZIAUL ISLAM — 2026</span>
            <span>GURUGRAM · IST+5:30 · <b id="menuClock">00:00</b></span>
          </div>
        </div>
        <div className="menu-right">
          <div className="menu-block">
            <h5>Currently</h5>
            <p>Designing 6labs.ai @ BlueStacks — <b style={{ color: "var(--accent)" }}>open to Sr/Lead roles in Delhi NCR</b>.</p>
          </div>
          <div className="menu-block">
            <h5>Write</h5>
            <a className="big" href="mailto:ziaul.islam14@gmail.com">ziaul.islam14@gmail.com ↗</a>
          </div>
          <div className="menu-block">
            <h5>Elsewhere</h5>
            <a href="https://www.linkedin.com/in/ziaulislam14/" target="_blank" rel="noopener">LinkedIn ↗</a>
          </div>
          <div className="menu-block">
            <h5>Resume</h5>
            <a href="/cv.pdf" target="_blank" rel="noopener" download="Ziaul-Islam-Resume-2026.pdf">Download CV ↓</a>
          </div>
        </div>
      </div>

      {/* Cursor-follow preview */}
      <div className="work-preview" id="workPreview">
        <div className="work-preview-inner" id="workPreviewInner"></div>
        <div className="work-preview-tag" id="workPreviewTag">VIEW CASE</div>
      </div>

      {/* Curtain */}
      <div className="curtain" id="curtain">
        <div className="curtain-word" id="curtainWord">—</div>
      </div>
    </>
  );
}
