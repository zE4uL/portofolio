"use client";

import Link from "next/link";
import { useEffect, useState, useRef, ReactNode } from "react";
import CustomCursor from "@/components/cursor/CustomCursor";

type CaseStudyChromeProps = {
  context: string;
  rightSlot?: ReactNode;
};

export default function CaseStudyChrome({ context, rightSlot }: CaseStudyChromeProps) {
  const [showTop, setShowTop] = useState(false);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const logoInnerRef = useRef<HTMLSpanElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuInnerRef = useRef<HTMLDivElement | null>(null);
  const bttRef = useRef<HTMLButtonElement | null>(null);
  const bttInnerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Magnetic chrome — same spring model as home-page CTAs.
  // Single rAF loop drives every magnet; outer translate moves the
  // wrapper, inner translate creates parallax depth.
  useEffect(() => {
    type Magnet = {
      btn: HTMLElement; inner: HTMLElement | null;
      tx: number; ty: number; x: number; y: number; vx: number; vy: number;
      tix: number; tiy: number; ix: number; iy: number; ivx: number; ivy: number;
      following: boolean;
    };
    const magnets: Magnet[] = [];
    const listeners: Array<{ btn: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    const register = (btn: HTMLElement | null, inner: HTMLElement | null) => {
      if (!btn) return;
      const m: Magnet = {
        btn, inner,
        tx: 0, ty: 0, x: 0, y: 0, vx: 0, vy: 0,
        tix: 0, tiy: 0, ix: 0, iy: 0, ivx: 0, ivy: 0,
        following: false,
      };
      const move = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        m.tx = dx * 0.55; m.ty = dy * 0.85;
        m.tix = dx * 0.28; m.tiy = dy * 0.42;
        m.following = true;
      };
      const leave = () => {
        m.tx = 0; m.ty = 0; m.tix = 0; m.tiy = 0;
        m.following = false;
      };
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      magnets.push(m);
      listeners.push({ btn, move, leave });
    };

    register(logoRef.current, logoInnerRef.current);
    register(menuRef.current, menuInnerRef.current);
    register(bttRef.current, bttInnerRef.current);

    const FOLLOW_SPRING = 0.018, FOLLOW_DAMP = 0.86;
    const RETURN_SPRING = 0.006, RETURN_DAMP = 0.94;

    let raf = 0;
    const tick = () => {
      for (const m of magnets) {
        const SPRING = m.following ? FOLLOW_SPRING : RETURN_SPRING;
        const DAMP = m.following ? FOLLOW_DAMP : RETURN_DAMP;
        m.vx = (m.vx + (m.tx - m.x) * SPRING) * DAMP;
        m.vy = (m.vy + (m.ty - m.y) * SPRING) * DAMP;
        m.x += m.vx; m.y += m.vy;
        m.ivx = (m.ivx + (m.tix - m.ix) * SPRING) * DAMP;
        m.ivy = (m.ivy + (m.tiy - m.iy) * SPRING) * DAMP;
        m.ix += m.ivx; m.iy += m.ivy;
        m.btn.style.transform = `translate(${m.x.toFixed(2)}px, ${m.y.toFixed(2)}px)`;
        if (m.inner) m.inner.style.transform = `translate(${m.ix.toFixed(2)}px, ${m.iy.toFixed(2)}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      listeners.forEach(({ btn, move, leave }) => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", leave);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleTop = () => {
    // useSmoothScroll intercepts native scroll — dispatch a custom event
    // so the hook tweens smoothly. Fall back to native scrollTo on
    // pages without the smooth-scroll loop.
    const ev = new CustomEvent("smooth:scroll-to", { detail: { top: 0 } });
    window.dispatchEvent(ev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <CustomCursor />

      <div className="cs-scroll-prog" id="scrollProg" />

      <Link
        ref={logoRef}
        href="/"
        className="cs-orb-logo"
        data-magnet
        data-cursor="go"
        aria-label="Back to index"
      >
        <span ref={logoInnerRef} className="cs-orb inner" aria-hidden="true">
          <span className="cs-orb-ring" />
          <span className="cs-orb-ring cs-orb-ring-2" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 5h14L5 19h14" />
          </svg>
        </span>
      </Link>

      <div className="cs-float-context" aria-hidden="true">
        <span className="cs-float-context-dot" />
        <span>{context}</span>
      </div>

      <div ref={menuRef} className="cs-float-menu" data-magnet data-cursor="go">
        <div ref={menuInnerRef} className="cs-float-menu-inner inner">
          {rightSlot ?? (
            <Link href="/#work" data-cursor="go">
              All Work <span className="cs-float-menu-arrow">↗</span>
            </Link>
          )}
        </div>
      </div>

      <button
        ref={bttRef}
        type="button"
        className={`cs-back-to-top${showTop ? " is-visible" : ""}`}
        aria-label="Back to top"
        onClick={handleTop}
        data-magnet
        data-cursor="go"
      >
        <span className="cs-btt-ring" aria-hidden="true" />
        <span ref={bttInnerRef} className="cs-btt-inner inner">
          <span className="cs-btt-arrow" aria-hidden="true">↑</span>
          <span className="cs-btt-label">Top</span>
        </span>
      </button>
    </>
  );
}
