"use client";

/**
 * FooterPhysics — static sticker wall stub.
 *
 * Task 3.9: visually complete placeholder.
 * Task 6.1: replace with real matter.js physics (drag + throw).
 *
 * Stickers are absolutely positioned inside a relative container so they
 * look naturally scattered. Slight rotations and per-chip colours make the
 * wall feel alive without any JS yet.
 */

interface Sticker {
  label: string;
  /** Tailwind bg classes (kept inline so PurgeCSS sees them) */
  bg: string;
  color: string;
  /** % from left */
  left: number;
  /** % from top */
  top: number;
  /** degrees */
  rotate: number;
}

const STICKERS: Sticker[] = [
  { label: "Figma",  bg: "#FF7A3D", color: "#fff",     left: 6,  top: 12, rotate: -5  },
  { label: "AI",     bg: "#22D3EE", color: "#0a0a0b",  left: 22, top: 55, rotate: 3   },
  { label: "DS",     bg: "#F59E0B", color: "#0a0a0b",  left: 38, top: 20, rotate: -8  },
  { label: "UX",     bg: "#A855F7", color: "#fff",     left: 52, top: 62, rotate: 6   },
  { label: "❤",      bg: "#F43F5E", color: "#fff",     left: 67, top: 15, rotate: -3  },
  { label: "★",      bg: "#EAB308", color: "#0a0a0b",  left: 79, top: 50, rotate: 9   },
  { label: "Ziaul",  bg: "#6B7280", color: "#fff",     left: 14, top: 72, rotate: -6  },
  { label: "🎮",     bg: "#7C5CFF", color: "#fff",     left: 58, top: 36, rotate: 4   },
];

export function FooterPhysics() {
  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden select-none"
      data-cursor="throw"
      data-cursor-label="drag & throw"
      aria-label="Interactive sticker wall — physics coming soon"
      role="img"
    >
      {/* Subtle grid backdrop — gives the sandbox a "canvas" feel */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {STICKERS.map((s) => (
        <div
          key={s.label}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: `${s.left}%`,
            top: `${s.top}%`,
            transform: `rotate(${s.rotate}deg)`,
            background: s.bg,
            color: s.color,
            borderRadius: "999px",
            padding: "8px 18px",
            fontSize: "0.8125rem",
            fontWeight: 600,
            letterSpacing: "0.02em",
            fontFamily: "var(--font-mono, monospace)",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            /* Will-change hints matter.js replacements in Task 6.1 */
            willChange: "transform",
            userSelect: "none",
          }}
        >
          {s.label}
        </div>
      ))}

      {/* Hint text — disappears when physics land in Task 6.1 */}
      <p
        className="absolute bottom-5 right-6 text-xs text-[var(--text-secondary)] opacity-50 font-mono pointer-events-none"
        aria-hidden="true"
      >
        physics coming in v6 ↗
      </p>
    </div>
  );
}
