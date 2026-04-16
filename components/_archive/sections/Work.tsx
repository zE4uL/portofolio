"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CaseStudy {
  id: string;
  num: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  classified?: boolean;
  gradient: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "nowstudio",
    num: "01",
    title: "now.gg Studio",
    description:
      "From internal tool to developer platform. One designer, two products, one system.",
    tags: ["Platform Design", "Developer UX", "Design System"],
    href: "/nowstudio",
    gradient:
      "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    id: "payments",
    num: "02",
    title: "BlueStacks Payments",
    description:
      "Payments UX for a gaming platform. Rewards, mystery chests, and cashback flows that felt like part of the game.",
    tags: ["UX Design", "Fintech", "Gaming"],
    gradient:
      "linear-gradient(135deg, #1a1200 0%, #2d1f00 50%, #1a0e00 100%)",
  },
  {
    id: "design-system",
    num: "03",
    title: "Multi-brand Design System",
    description:
      "One system. Two products. Built to scale without breaking either.",
    tags: ["Design System", "Tokens", "Component Library"],
    gradient: "linear-gradient(135deg, #111111 0%, #1a1a1a 100%)",
  },
  {
    id: "app-player",
    num: "04",
    title: "BlueStacks App Player",
    description:
      "Translating touch-native games to PC. The constraint was the emulator. The solution was knowing how gamers actually play.",
    tags: ["Product Design", "Gaming", "PC UX"],
    gradient: "linear-gradient(135deg, #001a0d 0%, #001205 100%)",
  },
  {
    id: "6labs",
    num: "05",
    title: "6labs.ai",
    description:
      "AI-powered game analytics for developers. Training on real player behavior.",
    tags: ["AI", "Analytics", "Game Dev"],
    classified: true,
    gradient: "linear-gradient(135deg, #1a0000 0%, #0d0000 100%)",
  },
];

// ─── HUD corner markers ────────────────────────────────────────────────────────
function HudCorners() {
  const SIZE = 14;
  const THICKNESS = 1;
  const COLOR = "rgba(255,255,255,0.3)";

  const corners = [
    { top: 0, left: 0 },
    { top: 0, right: 0 },
    { bottom: 0, left: 0 },
    { bottom: 0, right: 0 },
  ] as const;

  return (
    <>
      {corners.map((pos, i) => {
        const isRight = "right" in pos;
        const isBottom = "bottom" in pos;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              width: SIZE,
              height: SIZE,
              borderTop: !isBottom ? `${THICKNESS}px solid ${COLOR}` : undefined,
              borderBottom: isBottom ? `${THICKNESS}px solid ${COLOR}` : undefined,
              borderLeft: !isRight ? `${THICKNESS}px solid ${COLOR}` : undefined,
              borderRight: isRight ? `${THICKNESS}px solid ${COLOR}` : undefined,
            }}
          />
        );
      })}
    </>
  );
}

// ─── Visual placeholder frame ──────────────────────────────────────────────────
function VisualFrame({ study }: { study: CaseStudy }) {
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!frameRef.current) return;
    gsap.to(frameRef.current, {
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const handleMouseLeave = () => {
    if (!frameRef.current) return;
    gsap.to(frameRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={frameRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        aspectRatio: "16 / 10",
        width: "100%",
        background: study.gradient,
        overflow: "hidden",
      }}
    >
      {/* Grid dot pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          zIndex: 1,
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5) 100%)",
          zIndex: 2,
        }}
      />

      {/* Classified overlays */}
      {study.classified && (
        <>
          {/* Scanlines */}
          <div className="scanlines" style={{ zIndex: 3 }} />
          {/* Blur veil */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 4,
            }}
          />
          {/* [CLASSIFIED] badge */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.25em",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "8px 18px",
              zIndex: 5,
            }}
          >
            [CLASSIFIED]
          </div>
        </>
      )}

      {/* Inner project label */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "0.5625rem",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          zIndex: 6,
        }}
      >
        {study.id}
      </div>

      {/* HUD corners */}
      <div style={{ position: "absolute", inset: 12, zIndex: 7 }}>
        <HudCorners />
      </div>
    </div>
  );
}

// ─── Project row ───────────────────────────────────────────────────────────────
function ProjectRow({ study, index }: { study: CaseStudy; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  const isEven = index % 2 === 1; // even index = flipped layout

  useGSAP(
    () => {
      if (!leftRef.current || !rightRef.current) return;

      // Left content animate in
      gsap.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Right visual animate in
      gsap.fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Ghost number scrubbed
      if (ghostRef.current) {
        gsap.fromTo(
          ghostRef.current,
          { opacity: 0 },
          {
            opacity: 0.035,
            scrollTrigger: {
              trigger: rowRef.current,
              start: "top 90%",
              end: "center 40%",
              scrub: true,
            },
          }
        );
      }
    },
    { scope: rowRef }
  );

  const leftContent = (
    <div
      ref={leftRef}
      style={{
        flex: "0 0 55%",
        paddingRight: isEven ? 0 : "clamp(32px, 4vw, 64px)",
        paddingLeft: isEven ? "clamp(32px, 4vw, 64px)" : 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1.25rem",
        position: "relative",
        opacity: 0,
      }}
    >
      {/* Ghost number */}
      <div
        ref={ghostRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: isEven ? "auto" : "-0.1em",
          right: isEven ? "-0.1em" : "auto",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 900,
          fontSize: "15vw",
          lineHeight: 1,
          color: "#ffffff",
          opacity: 0,
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {study.num}
      </div>

      {/* Foreground content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Small label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "1.25rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.6875rem",
              color: "#444444",
              letterSpacing: "0.2em",
            }}
          >
            {study.num}
          </span>
          <span
            style={{
              width: "1px",
              height: "12px",
              background: "rgba(255,255,255,0.12)",
              display: "inline-block",
            }}
          />
          {study.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "0.5625rem",
                color: "#444444",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 4vw, 5rem)",
            color: "#ffffff",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            marginBottom: "1.25rem",
          }}
        >
          {study.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
            color: "#666666",
            lineHeight: 1.65,
            maxWidth: "480px",
            marginBottom: "2rem",
          }}
        >
          {study.description}
        </p>

        {/* Link / classified */}
        {study.classified ? (
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.6875rem",
              color: "#444444",
              letterSpacing: "0.2em",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "8px 16px",
              display: "inline-block",
            }}
          >
            [CLASSIFIED]
          </span>
        ) : study.href ? (
          <Link
            href={study.href}
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.75rem",
              color: "#888888",
              textDecoration: "none",
              letterSpacing: "0.12em",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#ffffff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#888888")
            }
          >
            View Case Study ↗
          </Link>
        ) : (
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.75rem",
              color: "#444444",
              letterSpacing: "0.12em",
            }}
          >
            Coming Soon
          </span>
        )}

        {/* Tags row */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginTop: "2rem",
          }}
        >
          {study.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div
      ref={rightRef}
      style={{
        flex: "0 0 45%",
        display: "flex",
        alignItems: "center",
        opacity: 0,
      }}
    >
      <VisualFrame study={study} />
    </div>
  );

  return (
    <div
      ref={rowRef}
      className="project-row"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "clamp(48px, 6vw, 80px) 0",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        minHeight: "85vh",
        overflow: "hidden",
      }}
    >
      {isEven ? (
        <>
          {rightContent}
          {leftContent}
        </>
      ) : (
        <>
          {leftContent}
          {rightContent}
        </>
      )}
    </div>
  );
}

// ─── Work section ──────────────────────────────────────────────────────────────
export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        padding: "120px clamp(24px, 5vw, 80px) 80px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* Section heading */}
      <div
        style={{
          marginBottom: "4rem",
          display: "flex",
          alignItems: "baseline",
          gap: "1rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          paddingBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.6875rem",
            color: "#444444",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Selected Work
        </p>
        <span
          style={{
            width: "1px",
            height: "12px",
            background: "rgba(255,255,255,0.1)",
            display: "inline-block",
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.6875rem",
            color: "#333333",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {caseStudies.length} Projects
        </p>
      </div>

      {/* Project rows — flush, no gap */}
      <div>
        {caseStudies.map((study, index) => (
          <ProjectRow key={study.id} study={study} index={index} />
        ))}
        {/* Final bottom border */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-row {
            flex-direction: column !important;
            min-height: unset !important;
          }
          .project-row > div {
            flex: unset !important;
            width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
