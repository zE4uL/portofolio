"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type MarqueeProps = {
  items: string[];
  speed?: number;       // px/sec, default 40
  direction?: "left" | "right";
  className?: string;
};

/* ─── Component ─────────────────────────────────────────────────────────── */

/**
 * Marquee
 *
 * Full-width infinite horizontal scrolling strip. Used as a between-section
 * divider on the homepage — renders company wordmarks and skill chips.
 *
 * Behaviour:
 *   - Items duplicated once → seamless loop via CSS keyframe translate -50%
 *   - `speed` prop controls px/sec; duration derived from total char count
 *   - Hover: entire strip pauses (animationPlayState → "paused")
 *   - prefers-reduced-motion: animation disabled, static content shown
 *   - aria-hidden="true" — purely decorative, AT skips it
 *
 * Keyframes live in app/globals.css (@layer utilities) — no inline <style>.
 */
export function Marquee({
  items,
  speed = 40,
  direction = "left",
  className,
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  // Duplicate for seamless wrap — we translate by -50% (one full set width)
  const doubled = [...items, ...items];

  // Duration: rough proxy using total characters × a per-char px constant ÷ speed
  // ~9px per char gives reasonable width estimation for mono uppercase text
  const estimatedTrackPx = items.join(" · ").length * 9;
  const durationSec = Math.max(estimatedTrackPx / speed, 6);

  const animName = `marquee-${direction}`;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={[
        "relative w-full overflow-hidden",
        "border-y border-[var(--border)]",
        "bg-[var(--surface)]",
        className ?? "",
      ]
        .join(" ")
        .trim()}
    >
      {/* Fade edges — visual polish only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16"
        style={{
          background:
            "linear-gradient(to right, var(--surface), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16"
        style={{
          background:
            "linear-gradient(to left, var(--surface), transparent)",
        }}
      />

      {/* Track */}
      <div
        className="flex whitespace-nowrap py-[18px]"
        style={
          reduce
            ? { gap: "2rem" }
            : {
                gap: "2rem",
                animation: `${animName} ${durationSec}s linear infinite`,
                animationPlayState: paused ? "paused" : "running",
              }
        }
        onMouseEnter={() => {
          if (!reduce) setPaused(true);
        }}
        onMouseLeave={() => {
          if (!reduce) setPaused(false);
        }}
      >
        {doubled.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex items-center gap-4 font-mono text-sm uppercase tracking-wider text-[var(--text-secondary)] select-none"
          >
            {label}
            {/* Separator dot — hidden from last item to avoid trailing dot, but
                since we duplicate the array, the join is always clean */}
            <span
              aria-hidden="true"
              className="opacity-40 text-[var(--text-secondary)]"
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
