"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type CardDef = { id: string; label: string; story: string };

// ─── Content (LOCKED from spec §11c) ─────────────────────────────────────────

export const PICK_A_CARD_STORIES: CardDef[] = [
  {
    id: "gamer",
    label: "Gamer",
    story:
      "Hyper-competitive. 400+ hours in Valorant, Diamond 2. Still mad about that last round I should've won.",
  },
  {
    id: "athlete",
    label: "Athlete",
    story:
      "I play to win. Badminton, FIFA, pickleball — if you can track a score, I'll find a way to track it harder.",
  },
  {
    id: "traveller",
    label: "Traveller",
    story:
      "I plan trips the way I plan products — research everything, then throw the plan out by day 2.",
  },
  {
    id: "tech",
    label: "Tech nerd",
    story:
      "Unboxed a Vision Pro week one. Shipped a Claude Code skill week two. Currently installing something you haven't heard of.",
  },
  {
    id: "designer",
    label: "Designer",
    story:
      "Shipped my first real feature by turning a Figma prototype into the spec. An engineer said 'this IS the spec.' I've designed that way ever since.",
  },
];

// ─── Fan positions ────────────────────────────────────────────────────────────

const POSITIONS = [
  { rot: -8, x: -180, z: 0 },
  { rot: -4, x: -90, z: 1 },
  { rot: 0, x: 0, z: 2 },
  { rot: 4, x: 90, z: 3 },
  { rot: 8, x: 180, z: 4 },
] as const;

// ─── Suit glyphs — one per card, playing-card style ──────────────────────────

const SUITS = ["♠", "♥", "♦", "♣", "★"] as const;

// ─── Shared ease ─────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * CardFront
 * Playing-card face: corner index + suit pips top-left/bottom-right,
 * large serif initial centred.
 */
function CardFront({
  card,
  index,
  suit,
}: {
  card: CardDef;
  index: number;
  suit: string;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className="absolute inset-0 rounded-2xl flex flex-col p-5 shadow-xl"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        background: "var(--surface-raised)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Top-left corner pip */}
      <div className="flex flex-col items-start leading-none select-none">
        <span
          className="font-mono text-xs tracking-wider"
          style={{ color: "var(--accent-primary)" }}
        >
          {num}
        </span>
        <span
          className="text-sm mt-0.5"
          style={{ color: "var(--text-secondary)" }}
        >
          {suit}
        </span>
      </div>

      {/* Centre: large initial + label */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <span
          className="font-serif italic select-none"
          style={{
            fontSize: "clamp(4rem, 8vw, 5.5rem)",
            lineHeight: 1,
            color: "var(--text-primary)",
            opacity: 0.9,
          }}
        >
          {card.label.charAt(0)}
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: "var(--text-secondary)" }}
        >
          {card.label}
        </span>
      </div>

      {/* Bottom-right corner pip — rotated 180° */}
      <div
        className="flex flex-col items-end leading-none select-none"
        style={{ transform: "rotate(180deg)" }}
      >
        <span
          className="font-mono text-xs tracking-wider"
          style={{ color: "var(--accent-primary)" }}
        >
          {num}
        </span>
        <span
          className="text-sm mt-0.5"
          style={{ color: "var(--text-secondary)" }}
        >
          {suit}
        </span>
      </div>
    </div>
  );
}

/**
 * CardBack
 * Story panel. rotateY(180deg) keeps it hidden until parent flips.
 */
function CardBack({ card, suit }: { card: CardDef; suit: string }) {
  return (
    <div
      className="absolute inset-0 rounded-2xl flex flex-col p-6 shadow-xl"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        background: "var(--accent-primary)",
        color: "#fff",
      }}
    >
      {/* Header row */}
      <div className="flex items-baseline justify-between mb-4">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ opacity: 0.75 }}
        >
          {card.label}
        </span>
        <span style={{ opacity: 0.6, fontSize: "1rem" }}>{suit}</span>
      </div>

      {/* Story */}
      <p
        className="flex-1 flex items-center font-serif italic leading-relaxed"
        style={{ fontSize: "clamp(0.9rem, 2vw, 1.05rem)" }}
      >
        {card.story}
      </p>

      {/* Footer decoration */}
      <div
        className="mt-4 h-px w-full"
        style={{ background: "rgba(255,255,255,0.2)" }}
      />
      <div
        className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-right"
        style={{ opacity: 0.5 }}
      >
        pick a card
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * PickACard
 *
 * "Personality picker" moment for the About section.
 *
 * Desktop: 5 cards arranged in a fan arc. Click any card to flip it 3D
 *   and reveal the story on the back. Hover lifts the card slightly.
 *   Only one card can be flipped at a time (mutual exclusion).
 *
 * Mobile (<md): vertical accordion — tap a card row to expand its story
 *   with an AnimatePresence height reveal.
 *
 * Reduced-motion: static <dl> list with label + story, no animation.
 *
 * Keyboard: native <button> elements — Tab focuses in order,
 *   Enter / Space flips the focused card.
 *
 * Cursor: data-cursor="card" + data-cursor-label="pick a card" on every
 *   interactive card so the custom cursor enters "card" mode.
 */
export function PickACard() {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState<string | null>(null);

  const toggle = (id: string) => {
    setFlipped((prev) => (prev === id ? null : id));
  };

  // ── Reduced-motion fallback ───────────────────────────────────────────────
  if (reduce) {
    return (
      <section
        className="py-16 md:py-24 px-6"
        aria-label="Pick a card — personal facts"
      >
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-serif italic text-4xl md:text-5xl mb-10">
            Pick a card.
          </h2>
          <dl className="grid gap-6 md:grid-cols-2">
            {PICK_A_CARD_STORIES.map((c) => (
              <div
                key={c.id}
                className="rounded-[var(--radius-md)] p-6"
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border)",
                }}
              >
                <dt
                  className="font-mono text-xs uppercase tracking-[0.15em] mb-2"
                  style={{ color: "var(--accent-primary)" }}
                >
                  {c.label}
                </dt>
                <dd
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {c.story}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    );
  }

  // ── Full interactive layout ───────────────────────────────────────────────
  return (
    <section
      className="py-16 md:py-24 px-6 overflow-hidden"
      aria-label="Pick a card — personal facts"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* ── Heading ────────────────────────────────────────────────────── */}
        <header className="mb-12 text-center">
          <h2 className="font-serif italic text-4xl md:text-5xl">
            Pick a card.
          </h2>
          <p
            className="mt-3 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Five sides of me.&nbsp;Click any to peek.
          </p>
        </header>

        {/* ── Desktop fan ────────────────────────────────────────────────── */}
        {/*
         * perspective is set on the container so all cards share one
         * vanishing point, making the 3D flip feel cohesive.
         *
         * min-h-[520px] reserves height so the section doesn't collapse
         * when cards lift on hover/flip.
         */}
        <div
          className="relative hidden md:flex justify-center items-center min-h-[520px]"
          style={{ perspective: "1400px" }}
          role="list"
          aria-label="Personality cards"
        >
          {PICK_A_CARD_STORIES.map((card, i) => {
            const pos = POSITIONS[i];
            const isFlipped = flipped === card.id;
            const suit = SUITS[i];

            return (
              <motion.button
                key={card.id}
                role="listitem"
                onClick={() => toggle(card.id)}
                data-cursor="card"
                data-cursor-label="pick a card"
                aria-pressed={isFlipped}
                aria-label={`${card.label} — ${isFlipped ? "click to close" : "click to reveal"}`}
                // Focus ring — custom to match project style
                className="absolute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] rounded-2xl cursor-pointer"
                style={{
                  width: "260px",
                  height: "360px",
                  transformStyle: "preserve-3d",
                }}
                initial={false}
                animate={{
                  x: pos.x,
                  rotateZ: isFlipped ? 0 : pos.rot,
                  rotateY: isFlipped ? 180 : 0,
                  y: isFlipped ? -24 : 0,
                  zIndex: isFlipped ? 10 : pos.z,
                  scale: isFlipped ? 1.04 : 1,
                }}
                whileHover={
                  isFlipped
                    ? {}
                    : {
                        y: -14,
                        rotateZ: pos.rot * 0.4,
                        scale: 1.03,
                        transition: { duration: 0.22, ease: EASE },
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 24,
                  mass: 0.8,
                }}
              >
                <CardFront card={card} index={i} suit={suit} />
                <CardBack card={card} suit={suit} />
              </motion.button>
            );
          })}
        </div>

        {/* ── Mobile accordion ───────────────────────────────────────────── */}
        {/*
         * On small screens the fan becomes a vertical list of tap-to-expand
         * rows. AnimatePresence handles the height transition so the story
         * text slides in and out smoothly.
         *
         * aria-expanded communicates open/closed state to screen readers.
         */}
        <div
          className="md:hidden grid gap-3"
          role="list"
          aria-label="Personality cards"
        >
          {PICK_A_CARD_STORIES.map((card, i) => {
            const isOpen = flipped === card.id;
            const suit = SUITS[i];

            return (
              <div
                key={card.id}
                role="listitem"
                className="rounded-[var(--radius-md)] overflow-hidden"
                style={{
                  background: isOpen
                    ? "var(--accent-primary)"
                    : "var(--surface-raised)",
                  border: "1px solid var(--border)",
                  transition: "background 0.25s ease",
                }}
              >
                <button
                  onClick={() => toggle(card.id)}
                  data-cursor="card"
                  aria-expanded={isOpen}
                  aria-label={`${card.label} — ${isOpen ? "collapse" : "expand"} story`}
                  className="w-full text-left px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-inset cursor-pointer"
                >
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-mono text-xs"
                        style={{
                          color: isOpen
                            ? "rgba(255,255,255,0.6)"
                            : "var(--text-secondary)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-serif italic text-2xl"
                        style={{ color: isOpen ? "#fff" : "var(--text-primary)" }}
                      >
                        {card.label}
                      </span>
                    </div>
                    <span
                      className="text-base"
                      style={{
                        color: isOpen
                          ? "rgba(255,255,255,0.5)"
                          : "var(--text-secondary)",
                      }}
                    >
                      {suit}
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p
                        className="px-5 pb-5 text-sm leading-relaxed font-serif italic"
                        style={{ color: "rgba(255,255,255,0.88)" }}
                      >
                        {card.story}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
