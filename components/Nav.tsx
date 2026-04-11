"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── HUD cluster ──────────────────────────────────────────────────────────────
function HudCluster() {
  const [fps, setFps] = useState<number>(60);
  const [time, setTime] = useState<string>("");

  // FPS counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      frameCount++;
      const delta = now - lastTime;
      if (delta >= 1000) {
        setFps(Math.round((frameCount * 1000) / delta));
        frameCount = 0;
        lastTime = now;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Clock
  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      return `${hh}:${mm}:${ss}`;
    };
    setTime(formatTime());
    const id = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(id);
  }, []);

  const monoStyle: React.CSSProperties = {
    fontFamily: "var(--font-jetbrains-mono)",
    fontSize: "0.625rem",
    color: "#333333",
    letterSpacing: "0.08em",
    lineHeight: 1,
  };

  const divider = (
    <span
      style={{
        display: "inline-block",
        width: "1px",
        height: "10px",
        background: "rgba(255,255,255,0.1)",
        flexShrink: 0,
      }}
    />
  );

  return (
    <div
      className="hud-cluster"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "4px 12px",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "2px",
      }}
    >
      {/* FPS */}
      <span style={monoStyle}>{fps} FPS</span>

      {divider}

      {/* Status */}
      <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <span
          style={{
            display: "inline-block",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#22c55e",
            opacity: 0.7,
            flexShrink: 0,
          }}
        />
        <span style={monoStyle}>ONLINE</span>
      </span>

      {divider}

      {/* Time */}
      <span style={{ ...monoStyle, fontVariantNumeric: "tabular-nums" }}>
        {time}
      </span>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate nav in on mount
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    gsap.fromTo(
      nav,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      ref={navRef}
      className="glass"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9000,
        padding: scrolled ? "12px 40px" : "20px 40px",
        transition: "padding 0.4s ease",
        opacity: 0, // GSAP animates this in
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          data-magnetic
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 700,
            fontSize: "1.125rem",
            color: "#ffffff",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          ZI
        </Link>

        {/* Desktop links + HUD + CTA */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="glitch-hover"
              data-text={link.label}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.8125rem",
                color: "#666666",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffffff")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#666666")
              }
            >
              {link.label}
            </Link>
          ))}

          {/* HUD cluster (hidden on mobile via CSS) */}
          <HudCluster />

          {/* CTA */}
          <Link
            href="#contact"
            data-magnetic
            className="glitch-hover"
            data-text="Get in touch"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.8125rem",
              color: "#ffffff",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "8px 20px",
              borderRadius: "2px",
              letterSpacing: "0.02em",
              transition:
                "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLElement;
              el.style.background = "#ffffff";
              el.style.color = "#080808";
              el.style.borderColor = "#ffffff";
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement;
              el.style.background = "transparent";
              el.style.color = "#ffffff";
              el.style.borderColor = "rgba(255,255,255,0.2)";
            }}
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "none",
            padding: "4px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "1px",
                background: "#ffffff",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform:
                  menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(4px, 4px)"
                      : i === 1
                      ? "opacity: 0"
                      : "rotate(-45deg) translate(4px, -4px)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            padding: "20px 40px 30px",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "12px 20px",
              textDecoration: "none",
              display: "inline-block",
              marginTop: "8px",
              textAlign: "center",
            }}
          >
            Get in touch
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .hud-cluster { display: none !important; }
        }
      `}</style>
    </header>
  );
}
