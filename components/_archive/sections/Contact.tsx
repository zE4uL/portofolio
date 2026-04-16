"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const els = sectionRef.current?.querySelectorAll(".contact-reveal");
      els?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
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
      id="contact"
      style={{
        padding: "120px 40px 80px",
        maxWidth: "1400px",
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Heading */}
      <div className="contact-reveal" style={{ marginBottom: "3rem" }}>
        <p className="section-label" style={{ marginBottom: "1rem" }}>
          Contact
        </p>
        <h2
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 900,
            fontSize: "clamp(3rem, 7vw, 6rem)",
            color: "#ffffff",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
          }}
        >
          LET&apos;S
          <br />
          TALK
        </h2>
      </div>

      {/* Availability */}
      <p
        className="contact-reveal"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "clamp(0.875rem, 1.5vw, 1.0625rem)",
          color: "#555555",
          maxWidth: "480px",
          lineHeight: 1.7,
          marginBottom: "3rem",
        }}
      >
        Open to senior product design roles.
        <br />
        Available for select consulting.
      </p>

      {/* Links */}
      <div
        className="contact-reveal"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          marginBottom: "5rem",
        }}
      >
        {/* Email */}
        <a
          href="mailto:ziaulislam@example.com" /* TODO: replace with real email */
          data-magnetic
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 600,
            fontSize: "clamp(1.125rem, 2.5vw, 1.75rem)",
            color: "#ffffff",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            transition: "color 0.2s ease",
            width: "fit-content",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#888888")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#ffffff")
          }
        >
          ziaulislam@example.com
          <span style={{ fontSize: "0.7em", color: "#444444" }}>↗</span>
        </a>

        {/* Social links */}
        <div style={{ display: "flex", gap: "2rem", marginTop: "0.5rem" }}>
          {[
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/ziaulislam",
            },
            {
              label: "Twitter / X",
              href: "https://twitter.com/ziaulislam",
            },
            {
              label: "Dribbble",
              href: "https://dribbble.com/ziaulislam",
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.8125rem",
                color: "#444444",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#ffffff")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#444444")
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="contact-reveal"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.6875rem",
            color: "#333333",
            letterSpacing: "0.08em",
          }}
        >
          Ziaul Islam © 2025
        </p>
        <p
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.6875rem",
            color: "#2a2a2a",
            letterSpacing: "0.08em",
          }}
        >
          Designed &amp; built with Claude Code
        </p>
      </div>
    </section>
  );
}
