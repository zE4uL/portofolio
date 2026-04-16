"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/primitives/Button";

/* ─── Decorative terminal blips ─────────────────────────────────────────── */

const BLIPS = [
  { text: "$ claude plan ./portfolio", top: "10%", left: "12%"  },
  { text: "[✓] figma sync complete",   bottom: "16%", right: "10%" },
  { text: "→ push to codebase",        top: "52%", right: "30%"  },
] as const;

/* ─── Component ─────────────────────────────────────────────────────────── */

export function AIWorkshopTeaser() {
  const reduce = useReducedMotion();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  /** Returns framer-motion props for a staggered fade-up */
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: {
      delay:    reduce ? 0 : delay,
      duration: reduce ? 0 : 0.6,
      ease:     [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section
      ref={ref}
      aria-label="AI-native workflows"
      className="relative py-24 md:py-32 px-6 overflow-hidden bg-[var(--surface)] border-y border-[var(--border)]"
    >
      {/* ── Faint monospace grid ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: [
            "linear-gradient(to right, var(--text-primary) 1px, transparent 1px)",
            "linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Terminal command blips ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 font-mono text-xs text-[var(--text-secondary)] opacity-[0.15] pointer-events-none select-none"
      >
        {BLIPS.map(({ text, ...pos }) => (
          <span
            key={text}
            className="absolute"
            style={pos as React.CSSProperties}
          >
            {text}
          </span>
        ))}
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-[1400px]">

        {/* Eyebrow label */}
        <motion.div {...fade(0)} className="mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent-primary)]">
            AI-native workflow
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...fade(0.1)}
          className="font-serif italic text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-4xl"
        >
          I build AI-native workflows.
        </motion.h2>

        {/* Body */}
        <motion.p
          {...fade(0.25)}
          className="mt-8 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed"
        >
          Claude Code → Figma → codebase round-trips. Custom skills + plugins
          for the design team. Workshops that actually change how people work.
          Still early — here&apos;s what I&apos;m exploring.
        </motion.p>

        {/* CTA */}
        <motion.div {...fade(0.4)} className="mt-10">
          <Button as="a" href="/playground" variant="primary" size="lg">
            See the playground →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
