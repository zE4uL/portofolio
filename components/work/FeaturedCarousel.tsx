"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { WorkCard } from "./WorkCard";
import type { CaseStudyMeta } from "@/lib/work";

// Register once at module level — safe to call multiple times
gsap.registerPlugin(ScrollTrigger, useGSAP);

export type FeaturedCarouselProps = {
  items: CaseStudyMeta[]; // expected: FEATURED (4 items)
  className?: string;
};

// ─── Mobile detection hook ────────────────────────────────────────────────────
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mql.matches);
    // Run immediately to set initial state
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

// ─── Progress dots ────────────────────────────────────────────────────────────
function ProgressDots({
  count,
  activeIndex,
}: {
  count: number;
  activeIndex: number;
}) {
  return (
    <div
      className="flex items-center gap-[6px]"
      role="tablist"
      aria-label="Carousel progress"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          role="tab"
          aria-selected={i === activeIndex}
          aria-label={`Card ${i + 1} of ${count}`}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === activeIndex ? 20 : 6,
            height: 6,
            background:
              i === activeIndex
                ? "var(--text-primary)"
                : "rgba(255,255,255,0.25)",
          }}
        />
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function FeaturedCarousel({ items, className }: FeaturedCarouselProps) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  // Track active card index based on scroll progress for the progress dots
  const updateActiveIndex = (progress: number) => {
    const idx = Math.round(progress * (items.length - 1));
    setActiveIndex(Math.max(0, Math.min(idx, items.length - 1)));
  };

  useGSAP(
    () => {
      if (isMobile || reduce) return;
      if (!trackRef.current || !containerRef.current) return;

      const track = trackRef.current;

      // totalScroll = how many px the track needs to translate left
      // so the last card's right edge reaches the viewport right edge.
      const computeTotal = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const anim = gsap.to(track, {
        x: () => -computeTotal(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // The pin duration equals the total horizontal distance so
          // 1px of vertical scroll ≡ 1px of horizontal translation.
          end: () => `+=${computeTotal()}`,
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => updateActiveIndex(self.progress),
        },
      });

      return () => {
        anim.scrollTrigger?.kill();
        anim.kill();
      };
    },
    // Re-run when mobile state, reduced-motion, or item count changes
    { scope: containerRef, dependencies: [isMobile, reduce, items.length] }
  );

  // ── Mobile / reduced-motion path ──────────────────────────────────────────
  if (isMobile || reduce) {
    return (
      <section
        className={`py-16 md:py-24 ${className ?? ""}`}
        aria-label="Featured work"
      >
        <div className="mx-auto max-w-[1400px] px-6">
          <header className="mb-10">
            <p
              className="font-mono text-xs tracking-widest mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Selected work
            </p>
            <h2
              className="font-serif italic text-4xl md:text-5xl leading-none"
              style={{ color: "var(--text-primary)" }}
            >
              Featured work
            </h2>
          </header>
          <div className="grid gap-6">
            {items.map((item) => (
              <WorkCard key={item.slug} meta={item} variant="grid" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop pinned-scroll path ─────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      className={`relative h-screen overflow-hidden ${className ?? ""}`}
      aria-label="Featured work"
    >
      {/* ── Persistent header — stays above the scrolling track ─────────── */}
      <header
        className="absolute inset-x-0 top-0 z-20 flex items-end justify-between px-10 pt-8 pb-6 pointer-events-none"
        style={{
          // Subtle gradient so header text stays legible over any card
          background:
            "linear-gradient(to bottom, var(--canvas) 0%, transparent 100%)",
        }}
      >
        <div>
          <p
            className="font-mono text-xs tracking-widest mb-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Selected work
          </p>
          <h2
            className="font-serif italic text-3xl md:text-4xl xl:text-5xl leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            Featured work
          </h2>
        </div>

        <div className="flex items-center gap-6 pointer-events-none">
          <ProgressDots count={items.length} activeIndex={activeIndex} />
          <span
            className="font-mono text-xs select-none"
            style={{ color: "var(--text-secondary)" }}
            aria-hidden
          >
            scroll →
          </span>
        </div>
      </header>

      {/* ── Horizontal track ────────────────────────────────────────────── */}
      {/*
        - `will-change-transform` promotes the element to its own GPU layer,
          keeping the GSAP translate silky smooth.
        - Left padding (10vw) gives the first card breathing room from the
          viewport edge; gap-8 between cards. The track is full-height so
          cards can be vertically centered.
        - `px-[10vw]` also adds right padding implicitly — the last card
          gets the same 10vw gap before its right edge hits the track end.
      */}
      <div
        ref={trackRef}
        className="absolute inset-0 flex items-center gap-8 px-[10vw] will-change-transform"
        style={{ width: "max-content" }}
      >
        {items.map((item, i) => (
          <WorkCard
            key={item.slug}
            meta={item}
            variant="carousel"
            priority={i === 0}
          />
        ))}
      </div>

      {/* ── Bottom-edge vignette — blends cards into page below ─────────── */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, var(--canvas) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
