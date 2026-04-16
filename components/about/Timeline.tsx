"use client";

import { motion, useReducedMotion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// ─── Content (LOCKED from spec) ──────────────────────────────────────────────

export const TIMELINE_ENTRIES = [
  { year: "2019 — 2020", role: "UI/UX Designer", company: "Alpha Agency", note: "B2B + B2C web redesigns." },
  { year: "2020 — 2021", role: "UI/UX Designer", company: "Ikokas Digital", note: "User-centric solutions across client projects." },
  { year: "2020 — 2021", role: "Contract UI/UX Designer", company: "Amway India", note: "Mobile app + web redesign; built the DS." },
  { year: "2021 — now", role: "Product Designer", company: "BlueStacks / now.gg", note: "AI-centric experimentation, design systems at scale, DSO pseudo-title." },
  { year: "2025 — now", role: "Lead Designer, 6labs.ai", company: "BlueStacks / now.gg", note: "AI gameplay analytics platform + AI-native team workflow." },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function Timeline() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });

  // Scale the accent line from 0→100% as user scrolls through the section
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      aria-label="Career timeline"
      className="py-16 md:py-24 px-6"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <header className="mb-12">
          <h2 className="font-serif italic text-4xl md:text-5xl tracking-tight">
            Timeline.
          </h2>
        </header>

        {/* Timeline body — left-padded to leave room for the line + dot */}
        <div ref={containerRef} className="relative pl-12 md:pl-16">

          {/* Background rail — always visible, acts as guide */}
          <div
            aria-hidden="true"
            className="absolute left-4 md:left-6 top-0 bottom-0 w-px"
            style={{ background: "var(--border)" }}
          />

          {/* Scroll-drawn accent line — scales up from top as page scrolls */}
          <motion.div
            aria-hidden="true"
            className="absolute left-4 md:left-6 top-0 bottom-0 w-px origin-top"
            style={{
              background: "var(--accent-primary)",
              scaleY: reduce ? 1 : lineScaleY,
            }}
          />

          {/* Entry list — semantic ordered list */}
          <ol className="space-y-10 md:space-y-14">
            {TIMELINE_ENTRIES.map((entry, i) => (
              <motion.li
                key={`${entry.company}-${i}`}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: reduce ? 0 : i * 0.12,
                  duration: reduce ? 0 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* Dot marker — sits on the line */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[33px] md:-left-[42px] top-1 w-3 h-3 rounded-full ring-4"
                  style={{
                    background: "var(--accent-primary)",
                    boxShadow: "0 0 0 4px var(--canvas)",
                  }}
                />

                {/* Year / date range */}
                <div
                  className="font-mono text-xs uppercase tracking-wider mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {entry.year}
                </div>

                {/* Role */}
                <div className="font-serif italic text-2xl md:text-3xl leading-tight">
                  {entry.role}
                </div>

                {/* Company */}
                <div
                  className="text-base md:text-lg mt-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {entry.company}
                </div>

                {/* Note */}
                <p
                  className="mt-2 text-sm md:text-base max-w-2xl"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {entry.note}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
