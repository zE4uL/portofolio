"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";

/* ─── Types ──────────────────────────────────────────────────────────────── */

export type CraftItem = {
  label: string;
  description?: string;
  asset?: string;
  accent?: string;
};

export type CraftStripProps = {
  items?: CraftItem[];
  speed?: number;
  className?: string;
};

/* ─── Default content ────────────────────────────────────────────────────── */

export const DEFAULT_CRAFT_ITEMS: CraftItem[] = [
  {
    label: "Scroll-wheel proto",
    description: "Figma conditional logic specs as engineering",
    accent: "#A3A3A3",
  },
  {
    label: "DS token grid",
    description: "Float — base + child tokens",
    accent: "#5FD6FF",
  },
  {
    label: "Payment flow",
    description: "Cross-surface checkout",
    accent: "#FFB84D",
  },
  {
    label: "Figma conditional demo",
    description: "Interactive prototypes that ship",
    accent: "#7C5CFF",
  },
  {
    label: "AI workshop slide",
    description: "Upskilling teams on AI-native workflow",
    accent: "#FF5FA3",
  },
  {
    label: "Discovery rail",
    description: "ML-personalized placements",
    accent: "#FF7A3D",
  },
  {
    label: "Multi-brand DS map",
    description: "Float → Float Studio",
    accent: "#5FD68A",
  },
  {
    label: "Moments gallery",
    description: "60s highlight capture",
    accent: "#7C5CFF",
  },
];

/* ─── CraftCard ──────────────────────────────────────────────────────────── */

function CraftCard({ item }: { item: CraftItem }) {
  return (
    <article
      className={[
        "group flex-shrink-0",
        "w-64 md:w-72",
        "h-40 md:h-52",
        "rounded-[var(--radius-md)]",
        "border border-[var(--border)]",
        "bg-[var(--surface)]",
        "overflow-hidden",
        "relative",
        "transition-transform duration-200 ease-out",
        "hover:scale-[1.02]",
        "shadow-[0_2px_12px_rgba(0,0,0,0.18)]",
        "hover:shadow-[0_6px_24px_rgba(0,0,0,0.32)]",
      ].join(" ")}
    >
      {/* Thumbnail — accent colour as placeholder */}
      <div
        className="absolute inset-x-0 top-0 h-24 md:h-32 transition-opacity duration-300"
        style={{
          background: item.accent
            ? `linear-gradient(135deg, ${item.accent}CC 0%, ${item.accent}66 100%)`
            : "var(--accent-primary)",
        }}
        aria-hidden="true"
      >
        {/* Subtle grain overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundSize: "128px 128px",
          }}
          aria-hidden="true"
        />

        {/* Top-right accent dot — depth detail */}
        <div
          className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-60"
          style={{ background: item.accent ?? "var(--accent-primary)" }}
          aria-hidden="true"
        />
      </div>

      {/* Text area */}
      <div className="absolute bottom-0 inset-x-0 p-3 md:p-4 bg-[var(--surface)]">
        {/* Thin top rule — separates thumbnail from label */}
        <div
          className="absolute top-0 inset-x-3 md:inset-x-4 h-px opacity-50"
          style={{ background: item.accent ?? "var(--border)" }}
          aria-hidden="true"
        />

        <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[var(--text-primary)] truncate leading-none mb-1">
          {item.label}
        </p>

        {item.description && (
          <p className="text-[10px] md:text-[11px] text-[var(--text-secondary)] line-clamp-1 leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}

/* ─── CraftStrip ─────────────────────────────────────────────────────────── */

/**
 * CraftStrip
 *
 * Auto-scrolling horizontal strip of small "craft moment" cards.
 * Decorative — not interactive, no links.
 *
 * Behaviour:
 *   - Items doubled → seamless CSS loop via craft-scroll keyframe (-50% translate)
 *   - `speed` is the animation duration in seconds for one full cycle
 *   - Hover pauses the entire strip
 *   - prefers-reduced-motion → static layout, no animation
 *   - aria-hidden="true" on the outer section — purely decorative
 *
 * Keyframe lives in app/globals.css alongside marquee-left / marquee-right.
 */
export function CraftStrip({
  items = DEFAULT_CRAFT_ITEMS,
  speed = 90,
  className,
}: CraftStripProps) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);

  // Duplicate for seamless wrap — translate -50% returns to exact start position
  const doubled = [...items, ...items];

  return (
    <section
      aria-hidden="true"
      className={[
        "relative w-full overflow-hidden",
        "py-8 md:py-12",
        "border-y border-[var(--border)]",
        "bg-[var(--canvas)]",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Left edge fade */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{
          background:
            "linear-gradient(to right, var(--canvas), transparent)",
        }}
        aria-hidden="true"
      />
      {/* Right edge fade */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{
          background:
            "linear-gradient(to left, var(--canvas), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Scrolling track */}
      <div
        className="flex gap-4 md:gap-6 will-change-transform pl-4 md:pl-6"
        style={{
          width: "max-content",
          animation: reduce
            ? "none"
            : `craft-scroll ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
        onMouseEnter={() => {
          if (!reduce) setPaused(true);
        }}
        onMouseLeave={() => {
          if (!reduce) setPaused(false);
        }}
      >
        {doubled.map((item, i) => (
          <CraftCard key={`${item.label}-${i}`} item={item} />
        ))}
      </div>
    </section>
  );
}
