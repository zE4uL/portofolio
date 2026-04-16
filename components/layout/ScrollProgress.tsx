"use client";
import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * XP-style scroll progress bar — fixed just below the 64px nav.
 * - 2px tall, GPU-accelerated via scaleX (no layout thrash)
 * - Gradient: --accent-primary (violet) → --accent-warm (orange)
 * - Subtle leading-edge glow for the gamer XP-bar feel
 * - aria-hidden + pointer-events-none — purely decorative, never blocks interaction
 * - prefers-reduced-motion safe: bar updates directly from scroll position,
 *   no CSS animation or transition duration — nothing to disable
 */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      className="fixed top-16 inset-x-0 h-[2px] z-40 pointer-events-none bg-[var(--border)]"
    >
      {/* Fill bar */}
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-warm)] relative"
        style={{ scaleX: progress }}
        transition={{ duration: 0 }}
      >
        {/* Leading-edge glow — the XP bar "spark" */}
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-[6px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--accent-warm) 0%, transparent 70%)",
            opacity: progress > 0.01 && progress < 0.999 ? 1 : 0,
          }}
        />
      </motion.div>
    </div>
  );
}
