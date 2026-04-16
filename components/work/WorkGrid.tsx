"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { WorkCard } from "./WorkCard";
import type { CaseStudyMeta } from "@/lib/work";

export type WorkGridProps = {
  items: CaseStudyMeta[];   // expected: SUPPORTING (4 items)
  heading?: string;         // section heading, default "More work"
  className?: string;
};

export function WorkGrid({
  items,
  heading = "More work",
  className,
}: WorkGridProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      aria-label={heading}
      className={`py-16 md:py-24 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header row: serif italic heading + mono count label */}
        <header className="mb-10 md:mb-14 flex items-baseline justify-between">
          <h2 className="font-serif italic text-4xl md:text-5xl tracking-tight">
            {heading}
          </h2>
          <span className="font-mono text-xs text-[var(--text-secondary,#888)]">
            supporting · {items.length}
          </span>
        </header>

        {/* Grid — 1-col mobile, 2-col md+ */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: reduce ? 0 : i * 0.08,
                duration: reduce ? 0 : 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <WorkCard meta={item} variant="grid" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
