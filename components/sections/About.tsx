"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const paragraphs = [
  {
    text: "When I was designing weapon switching for BlueStacks,",
    size: "lg",
  },
  {
    text: "I already knew what was wrong —\nbecause I'd felt the same friction in every shooter I'd ever played.",
    size: "lg",
    muted: true,
  },
  {
    text: "Mouse wheel to cycle weapons is muscle memory.\nI had the answer before I had the brief.",
    size: "xl",
  },
  { divider: true },
  {
    text: "The same happened with Now Studio.",
    size: "lg",
  },
  {
    text: "A complex multi-step dev workflow — publishing, testing, SDK integration.\nYears of installing games at midnight gave me the mental model before I ran a single interview.",
    size: "md",
    muted: true,
  },
  {
    text: "That's the accelerator.",
    size: "lg",
  },
  { divider: true },
  {
    text: "But lived experience doesn't replace the fundamentals.",
    size: "lg",
    muted: true,
  },
  {
    text: "User research. Journey mapping. Competitive analysis.\nSystems thinking. Design critique. Accessibility review.",
    size: "md",
    muted: true,
  },
  {
    text: "Wireframes that don't survive testing.\nPrototypes rebuilt with better questions.",
    size: "md",
    muted: true,
  },
  {
    text: "Design systems built to outlast the team that shipped them.",
    size: "md",
    muted: true,
  },
  { divider: true },
  {
    text: "The domain knowledge sharpens the instincts.\nThe craft does the rest.",
    size: "xl",
    highlight: true,
    centered: true,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const lines = sectionRef.current?.querySelectorAll(".about-line");
      const dividers = sectionRef.current?.querySelectorAll(".about-divider");

      lines?.forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      dividers?.forEach((div) => {
        gsap.fromTo(
          div,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: div,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        padding: "120px 40px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Section heading */}
      <div style={{ marginBottom: "5rem" }}>
        <p className="section-label" style={{ marginBottom: "1rem" }}>
          The Method
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
          THE METHOD
        </h2>
      </div>

      {/* Copy blocks */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {paragraphs.map((item, i) => {
          if ("divider" in item && item.divider) {
            return (
              <div
                key={i}
                className="about-divider"
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.06)",
                  margin: "1rem 0",
                  transformOrigin: "left center",
                }}
              />
            );
          }

          const p = item as {
            text: string;
            size?: string;
            muted?: boolean;
            highlight?: boolean;
            centered?: boolean;
          };

          const fontSize =
            p.size === "xl"
              ? "clamp(1.375rem, 2.5vw, 2rem)"
              : p.size === "lg"
              ? "clamp(1.125rem, 2vw, 1.5rem)"
              : "clamp(0.9375rem, 1.5vw, 1.125rem)";

          const color = p.highlight
            ? "#ffffff"
            : p.muted
            ? "#444444"
            : "#888888";

          return (
            <p
              key={i}
              className="about-line"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize,
                color,
                lineHeight: 1.6,
                fontWeight: p.highlight ? 500 : 400,
                textAlign: p.centered ? "center" : "left",
                whiteSpace: "pre-line",
                letterSpacing: p.highlight ? "-0.01em" : "0",
              }}
            >
              {p.text}
            </p>
          );
        })}
      </div>
    </section>
  );
}
