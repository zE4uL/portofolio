/* Tag — sticker-style rotated pill for hero marquees and playful moments.
 * Uses Instrument Serif italic. Rotation seeded from children string when
 * no explicit `rotate` prop is passed. */

type TagColor = "accent" | "warm" | "dark" | "light";

export interface TagProps {
  color?: TagColor;
  /** Rotation in degrees. Omit for a ±6° pseudo-random tilt seeded from children. */
  rotate?: number;
  className?: string;
  children: React.ReactNode;
}

/* ─── Color map ─────────────────────────────────────────────────────────── */

const COLOR_MAP: Record<TagColor, React.CSSProperties> = {
  accent: {
    background: "var(--accent-primary)",
    color: "#ffffff",
  },
  warm: {
    background: "var(--accent-warm)",
    color: "#0A0A0B",
  },
  dark: {
    background: "#111113",
    color: "#F1F1F3",
  },
  light: {
    background: "#FAFAF7",
    color: "#111113",
  },
};

/* ─── Seeded rotation helper ─────────────────────────────────────────────── */

/**
 * Deterministic "random" ±6° tilt from an arbitrary string.
 * Uses a simple djb2-style hash so the same label always gets the same tilt.
 */
function seedRotation(seed: string): number {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) {
    h = ((h << 5) + h) ^ seed.charCodeAt(i);
    h = h >>> 0; // keep unsigned 32-bit
  }
  // Map 0–4294967295 → -6 … +6
  return ((h % 1200) / 100) - 6;
}

function childrenToString(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  return "tag";
}

/* ─── Component ─────────────────────────────────────────────────────────── */

export function Tag({
  color = "accent",
  rotate,
  className = "",
  children,
}: TagProps) {
  const deg =
    rotate !== undefined ? rotate : seedRotation(childrenToString(children));

  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 9999,
    fontFamily: "var(--font-serif, Georgia, serif)",
    fontStyle: "italic",
    fontSize: "0.9375rem", // ~15px — large enough to read at marquee speed
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1,
    whiteSpace: "nowrap",
    userSelect: "none",
    transform: `rotate(${deg}deg)`,
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.2)",
    ...COLOR_MAP[color],
  };

  return (
    <span className={className} style={style} aria-hidden="false">
      {children}
    </span>
  );
}
