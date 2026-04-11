"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const aiLines = [
  { text: "I've also restructured how I design.", size: "lg" },
  { spacer: true },
  {
    text: "The round-trip between design and code is gone.",
    size: "lg",
    muted: true,
  },
  {
    text: "Bidirectional flow between Claude Code and Figma —",
    size: "lg",
    mono: true,
    bright: true,
  },
  {
    text: "from insight to interactive prototype without the translation tax.",
    size: "lg",
    mono: true,
    bright: true,
  },
  { spacer: true },
  {
    text: "At 6labs.ai, I'm designing an AI product that turns",
    size: "md",
    muted: true,
  },
  {
    text: "game recordings into developer intelligence.",
    size: "md",
    muted: true,
  },
  {
    text: "Training on real player behavior.",
    size: "md",
    muted: true,
  },
  { spacer: true },
  {
    text: "I didn't need to be convinced AI changes the work.",
    size: "md",
    muted: true,
  },
  {
    text: "I was already building with it.",
    size: "lg",
  },
];

export default function AITeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lines = sectionRef.current?.querySelectorAll(".ai-line");

      lines?.forEach((line, i) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            delay: i * 0.02,
          }
        );
      });

      // Classified card entrance
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="ai"
      style={{
        padding: "120px 40px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* Two-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "80px",
          alignItems: "start",
        }}
      >
        {/* Left: copy */}
        <div>
          <div style={{ marginBottom: "4rem" }}>
            <p className="section-label" style={{ marginBottom: "1rem" }}>
              Human + AI
            </p>
            <h2
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              THE WORKFLOW
            </h2>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {aiLines.map((item, i) => {
              if ("spacer" in item && item.spacer) {
                return <div key={i} style={{ height: "0.5rem" }} />;
              }

              const line = item as {
                text: string;
                size?: string;
                muted?: boolean;
                mono?: boolean;
                bright?: boolean;
              };

              const fontSize =
                line.size === "lg"
                  ? "clamp(1.0625rem, 1.8vw, 1.3125rem)"
                  : "clamp(0.875rem, 1.4vw, 1.0625rem)";

              const color = line.bright
                ? "#aaaaaa"
                : line.muted
                ? "#444444"
                : "#888888";

              return (
                <p
                  key={i}
                  className="ai-line"
                  style={{
                    fontFamily: line.mono
                      ? "var(--font-jetbrains-mono)"
                      : "var(--font-inter)",
                    fontSize,
                    color,
                    lineHeight: 1.65,
                    letterSpacing: line.mono ? "-0.01em" : "0",
                    paddingLeft: line.mono ? "1rem" : 0,
                    borderLeft: line.mono
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "none",
                  }}
                >
                  {line.text}
                </p>
              );
            })}
          </div>
        </div>

        {/* Right: classified card */}
        <div
          ref={cardRef}
          style={{
            position: "sticky",
            top: "120px",
            opacity: 0,
          }}
        >
          <ClassifiedCard />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #ai > div {
            grid-template-columns: 1fr !important;
          }
          #ai > div > div:last-child {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

function ClassifiedCard() {
  return (
    <div
      style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Scanlines */}
      <div className="scanlines" />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.625rem",
            color: "#444444",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Project File
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.625rem",
            color: "#333333",
            letterSpacing: "0.2em",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "3px 8px",
          }}
        >
          [CLASSIFIED]
        </span>
      </div>

      {/* Title */}
      <div
        style={{ position: "relative", zIndex: 2, marginBottom: "1.5rem" }}
      >
        <h3
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 700,
            fontSize: "1.5rem",
            color: "#ffffff",
            letterSpacing: "-0.03em",
            marginBottom: "0.5rem",
          }}
        >
          6labs.ai
        </h3>
        <p
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.75rem",
            color: "#444444",
            lineHeight: 1.7,
          }}
        >
          AI-powered game analytics
          <br />
          for developers.
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.06)",
          marginBottom: "1.5rem",
          position: "relative",
          zIndex: 2,
        }}
      />

      {/* Teaser copy */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <p
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.6875rem",
            color: "#444444",
            lineHeight: 1.9,
          }}
        >
          Training on real player behavior.
          <br />
          Shipping soon.
        </p>

        <div style={{ marginTop: "1.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.6875rem",
              color: "#333333",
              lineHeight: 1.9,
            }}
          >
            ↗ I can&apos;t show you this yet.
            <br />
            &nbsp;&nbsp;But I can tell you it&apos;s the most
            <br />
            &nbsp;&nbsp;interesting problem I&apos;ve worked on.
          </p>
        </div>
      </div>

      {/* Blinking cursor */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.625rem",
            color: "#333333",
            letterSpacing: "0.1em",
          }}
        >
          STATUS: ACTIVE
        </span>
        <span
          className="cursor-blink"
          style={{
            display: "inline-block",
            width: "6px",
            height: "12px",
            background: "#333333",
          }}
        />
      </div>
    </div>
  );
}
