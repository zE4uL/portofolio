"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type PressStartCTAProps = {
  href: string;
  label?: string;
  className?: string;
};

export function PressStartCTA({
  href,
  label = "Press Start",
  className,
}: PressStartCTAProps) {
  const reduce = useReducedMotion();

  return (
    <Link
      href={href}
      data-cursor="link"
      className={[
        "group relative inline-flex items-center gap-3",
        "h-12 px-6 rounded-full",
        "bg-[var(--accent-primary)] text-white font-mono text-sm",
        "hover:brightness-110 transition-[filter] duration-200",
        className ?? "",
      ]
        .join(" ")
        .trim()}
    >
      {/* Blinking controller-cue dot */}
      <motion.span
        aria-hidden="true"
        className="inline-block w-2 h-2 rounded-full bg-white flex-shrink-0"
        animate={reduce ? { opacity: 1 } : { opacity: [1, 0.4, 1] }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Label */}
      {label}

      {/* Trailing play glyph */}
      <span aria-hidden="true" className="flex-shrink-0">
        ▶
      </span>

      {/* Hover ring overlay */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-white/30 transition-[box-shadow] duration-200"
      />
    </Link>
  );
}
