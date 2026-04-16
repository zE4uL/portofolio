"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TypeReveal } from "./TypeReveal";
import { ShaderField } from "./ShaderField";
import { PressStartCTA } from "./PressStartCTA";

// Shared easing — matches --ease-out token in globals.css
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Hero
 *
 * Full-viewport hero section. Composes:
 *   - ShaderField: absolute WebGL nebula (violet → black, reduced-motion → CSS gradient)
 *   - TypeReveal ×2: staggered character-by-character headline reveal
 *   - motion.p: tagline fade-in (delay 1.2 s)
 *   - PressStartCTA: gamer-style CTA (delay 1.6 s)
 *
 * Layout:
 *   - section#home — semantic landmark, relative so ShaderField absolute layers correctly
 *   - min-h-[100svh] — modern small-viewport-height unit; 1 screen on every device
 *   - overflow-hidden — shader bleeds to edges with no horizontal scrollbar
 *   - Centered column via flex-col + items-center + justify-center
 *
 * Reduced-motion:
 *   - TypeReveal internally checks useReducedMotion and skips SplitType
 *   - motion.p and PressStartCTA wrapper: initial prop set to false when reduced
 *   - All timing delays collapsed to 0
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-[calc(100svh-4rem)] px-6 overflow-hidden"
    >
      {/* ── Layer 0: WebGL shader background ─────────────────────────────── */}
      <ShaderField />

      {/* ── Layer 1: Content stack ────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl w-full text-center">

        {/* Headline block — two-line typographic statement */}
        <div className="flex flex-col items-center">
          {/*
           * Line 1 — serif italic: the craft identity.
           * TypeReveal as="h1" is the single h1 on this page.
           * Starts immediately (delay default 0).
           */}
          <TypeReveal
            as="h1"
            text="Product designer."
            className="block font-serif italic text-5xl md:text-7xl leading-[1.05] tracking-tight text-[var(--text-primary)]"
          />

          {/*
           * Line 2 — sans medium: the unexpected dimension.
           * delay={0.4} starts after line 1 has ~2/3 revealed
           * (26-char line 1 × 28 ms stagger ≈ 728 ms; 0.4 s gives a clean
           * visual seam without feeling disconnected).
           */}
          <TypeReveal
            as="span"
            text="AI-native. Also a gamer."
            delay={0.4}
            className="block font-sans text-5xl md:text-7xl font-medium mt-1 text-[var(--text-primary)]"
          />
        </div>

        {/*
         * Tagline — supporting copy beneath the headline.
         * Framer Motion fade+lift; delay 1.2 s so it appears after both
         * headline lines have finished revealing.
         * reduced-motion: initial={false} collapses the animation immediately.
         */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduce ? 0 : 1.2,
            duration: 0.6,
            ease: EASE,
          }}
          className="mt-8 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
        >
          Senior Product Designer.&nbsp;AI, design systems, platforms.
          <br className="hidden sm:block" />
          BlueStacks&nbsp;·&nbsp;now.gg&nbsp;·&nbsp;6labs.ai.
        </motion.p>

        {/*
         * PressStartCTA — gamer-coded CTA anchoring to #work.
         * Wrapper motion.div: delay 1.6 s — lands after tagline is settled.
         */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduce ? 0 : 1.6,
            duration: 0.6,
            ease: EASE,
          }}
          className="mt-10 flex justify-center"
        >
          <PressStartCTA href="#work" />
        </motion.div>
      </div>
    </section>
  );
}
