"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import GameObjects3D from "@/components/GameObjects3D";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gamerRef = useRef<HTMLSpanElement>(null);
  const firstRef = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.3 });

      // 1. "GAMER" glitch entry
      tl.fromTo(
        gamerRef.current,
        { opacity: 0, x: 0 },
        {
          opacity: 1,
          duration: 0.01,
          onComplete: () => {
            const el = gamerRef.current;
            if (!el) return;
            const glitchTl = gsap.timeline();
            glitchTl
              .to(el, { x: -8, duration: 0.05, ease: "none" })
              .to(el, { x: 6, duration: 0.05, ease: "none" })
              .to(el, { x: -4, duration: 0.04, ease: "none" })
              .to(el, { x: 3, duration: 0.04, ease: "none" })
              .to(el, { x: 0, duration: 0.06, ease: "power2.out" });
          },
        }
      )

      // 2. " FIRST." fades in
      .fromTo(
        firstRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        "+=0.3"
      )

      // 3. "DESIGNER SECOND." character stagger
      .add(() => {
        const line2 = line2Ref.current;
        if (!line2) return;
        line2.style.visibility = "visible";
        const text = "DESIGNER SECOND.";
        line2.innerHTML = text
          .split("")
          .map((ch) =>
            ch === " "
              ? `<span style="display:inline-block;opacity:0;"> </span>`
              : `<span style="display:inline-block;opacity:0;">${ch}</span>`
          )
          .join("");
        gsap.to(line2.querySelectorAll("span"), {
          opacity: 1,
          duration: 0.04,
          stagger: 0.04,
          ease: "none",
        });
      }, "+=0.2")

      // 4. Subtitle fades up
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "+=0.5"
      )

      // 5. Name line fades in
      .fromTo(
        nameRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.3"
      )

      // Scroll indicator
      .fromTo(
        scrollIndRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.2"
      );

      // Parallax on scroll
      gsap.to(containerRef.current?.querySelector(".hero-content") as Element, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 clamp(24px, 5vw, 80px)",
        paddingTop: "120px",
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* 3D background — fills section container */}
      <GameObjects3D />

      <div
        className="hero-content"
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Hero headline */}
        <div
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 900,
            fontSize: "clamp(52px, 9vw, 120px)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            color: "#ffffff",
            marginBottom: "0.15em",
          }}
        >
          {/* Line 1 */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.15em", flexWrap: "wrap" }}>
            <span
              ref={gamerRef}
              data-text="GAMER"
              style={{ opacity: 0, display: "inline-block" }}
            >
              GAMER
            </span>
            <span
              ref={firstRef}
              style={{ opacity: 0, display: "inline-block" }}
            >
              {" "}FIRST.
            </span>
          </div>

          {/* Line 2 */}
          <div
            ref={line2Ref}
            style={{
              visibility: "hidden",
              display: "block",
              color: "#333333",
            }}
          >
            DESIGNER SECOND.
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
            color: "#666666",
            marginTop: "2rem",
            opacity: 0,
            letterSpacing: "0.01em",
          }}
        >
          The order is the point.
        </p>

        {/* Name + role */}
        <p
          ref={nameRef}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(0.75rem, 1.2vw, 0.9375rem)",
            color: "#444444",
            marginTop: "1.25rem",
            opacity: 0,
            letterSpacing: "0.01em",
          }}
        >
          Ziaul Islam —{" "}
          <span style={{ color: "#555555" }}>Senior Product Designer</span>
        </p>

        {/* Scroll CTA */}
        <div
          style={{
            marginTop: "5rem",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <a
            href="#work"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.6875rem",
              color: "#333333",
              textDecoration: "none",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#666666")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#333333")
            }
          >
            <span>Scroll</span>
            <span
              style={{
                display: "inline-block",
                width: "1px",
                height: "40px",
                background: "rgba(255,255,255,0.15)",
                transformOrigin: "top",
              }}
              className="scroll-indicator"
            />
          </a>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div
        ref={scrollIndRef}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.5625rem",
            color: "#333333",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "48px",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            className="scroll-indicator"
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.5)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
